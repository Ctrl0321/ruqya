import { Request, Response } from 'express';
import RakiAvailability ,{IRakiAvailability} from "../models/rakiAvailability";
import moment from 'moment-timezone';
import {AuthenticatedRequest} from "../@types/express";
import User from "../models/user";
import {getTimezone } from 'countries-and-timezones';
import {convertToTimeZone} from "../utils/timezone";


export const getAvailability = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const { rakiId, date,timeZone } = req.query;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Retrieve user to get their country info
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userTimeZone = timeZone || 'UTC';


        const availability = await RakiAvailability.findOne({
            rakiId,
            date,
        }).exec();

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        // Validate and convert time slots
        if (!Array.isArray(availability.timeSlots)) {
            return res.status(400).json({ message: 'Invalid time slots format' });
        }

        const convertedSlots = availability.timeSlots.map((slot) => {
            if (!slot.startTime || !slot.endTime) {
                return null;
            }

            return {
                startTime: convertToTimeZone(new Date(slot.startTime), userTimeZone.toString()),
                endTime: convertToTimeZone(new Date(slot.endTime), userTimeZone.toString()),
                isAvailable: slot.isAvailable,
            };
        }).filter(Boolean);

        res.status(200).json({
            rakiId,
            date,
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

        const { date, timeSlots, timeZone } = req.body;

        const utcTimeSlots = timeSlots.map((slot: { startTime: string; endTime: string }) => ({
            startTime: moment.tz(slot.startTime, timeZone).utc().toISOString(),
            endTime: moment.tz(slot.endTime, timeZone).utc().toISOString(),
            isAvailable: true,
        }));

        const availability = await RakiAvailability.findOneAndUpdate(
            { rakiId, date },
            { rakiId, date, timeSlots: utcTimeSlots },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Availability set successfully', availability });
    } catch (error) {
        res.status(500).json({ message: 'Error setting availability', error });
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