import { Request, Response } from 'express';
import RakiAvailability ,{IRakiAvailability} from "../models/rakiAvailability";
import moment from 'moment-timezone';
import {AuthenticatedRequest} from "../@types/express";
import User from "../models/user";
import {getTimezone } from 'countries-and-timezones';
import {validateAndConvertTimezone} from "../utils/timezone";


export const getAvailability = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { rakiId, date, timeZone = 'UTC' } = req.query;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Validate timezone
        let validatedTimeZone: string;
        try {
            validatedTimeZone = validateAndConvertTimezone(timeZone.toString());
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Invalid timezone'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const availability = await RakiAvailability.findOne({
            rakiId,
            date,
        }).exec();

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        // Convert stored UTC times to requested timezone
        const convertedSlots = availability.timeSlots.map((slot) => {
            if (!slot.startTime || !slot.endTime) {
                return null;
            }

            return {
                startTime: moment(slot.startTime)
                    .tz(validatedTimeZone)
                    .format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment(slot.endTime)
                    .tz(validatedTimeZone)
                    .format('YYYY-MM-DD HH:mm:ss'),
                isAvailable: slot.isAvailable,
            };
        }).filter(Boolean);

        res.status(200).json({
            rakiId,
            date,
            timeZone: validatedTimeZone,
            timeSlots: convertedSlots,
        });
    } catch (error) {
        console.error("Error fetching availability:", error);
        res.status(500).json({ message: 'Error fetching availability', error });
    }
};

export const setAvailability = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const rakiId = req.user?.id;
        if (!rakiId) {
            return res.status(401).json({ message: 'User ID not found in request' });
        }

        const { date, timeSlots, timeZone } = req.body

        console.log(timeSlots,date,timeZone)

        // Validate input
        if (!Array.isArray(timeSlots) || !timeZone || !date) {
            return res.status(400).json({
                message: 'Invalid input. Required: date, timeSlots array, and timeZone'
            });
        }

        // Validate timezone
        let validatedTimeZone: string;
        try {
            validatedTimeZone = validateAndConvertTimezone(timeZone);
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Invalid timezone'
            });
        }

        const utcTimeSlots = timeSlots.map((slot) => ({
            startTime: moment.tz(slot.startTime, validatedTimeZone).utc().toISOString(),
            endTime: moment.tz(slot.endTime, validatedTimeZone).utc().toISOString(),
            isAvailable: true,
        }));

        // Validate converted times
        const isValidTimes = utcTimeSlots.every(slot =>
            moment(slot.startTime).isValid() &&
            moment(slot.endTime).isValid() &&
            moment(slot.startTime).isBefore(moment(slot.endTime))
        );

        if (!isValidTimes) {
            return res.status(400).json({
                message: 'Invalid time format or start time is after end time'
            });
        }

        const availability = await RakiAvailability.findOneAndUpdate(
            { rakiId, date },
            {
                rakiId,
                date,
                timeSlots: utcTimeSlots,
                sourceTimeZone: validatedTimeZone // Store original timezone for reference
            },
            { new: true, upsert: true }
        );

        res.status(200).json({
            message: 'Availability set successfully',
            availability
        });
    } catch (error) {
        console.error("Error setting availability:", error);
        res.status(500).json({
            message: 'Error setting availability',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};


export const getAllAdmins = async (req: Request, res: Response): Promise<void> => {
    try {
        const admins = await User.find({ role: 'admin' });

        if (!admins || admins.length === 0) {
            res.status(404).json({ message: 'No admins found' });
            return;
        }

        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const removeAvailability = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const rakiId = req.user?.id;
        const { date, startTime } = req.body;

        if (!rakiId || !date || !startTime) {
            return res.status(400).json({ message: 'Invalid input. Required: date and startTime' });
        }

        const availability = await RakiAvailability.findOne({ rakiId, date }).exec();

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        // Remove the time slot with the matching startTime
        const updatedTimeSlots = availability.timeSlots.filter(
            (slot) => moment(slot.startTime).toISOString() !== moment(startTime).toISOString()
        );

        if (updatedTimeSlots.length === availability.timeSlots.length) {
            return res.status(404).json({ message: 'Time slot not found' });
        }

        // Update the availability with the remaining time slots
        availability.timeSlots = updatedTimeSlots;
        await availability.save();

        res.status(200).json({
            message: 'Time slot removed successfully',
            availability,
        });
    } catch (error) {
        console.error("Error removing availability:", error);
        res.status(500).json({ message: 'Error removing availability', error });
    }
};
