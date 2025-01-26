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

        let validatedTimeZone: string;
        try {
            validatedTimeZone = validateAndConvertTimezone(timeZone.toString());
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Invalid timezone',
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const availability = await RakiAvailability.findOne({ rakiId, date }).exec();

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        const convertedSlots = availability.timeSlots.map((slot) => {
            const startDateTimeUTC = moment.tz(`${date}T${slot.startTime}`, 'YYYY-MM-DDTHH:mm', 'UTC');
            const endDateTimeUTC = moment.tz(`${date}T${slot.endTime}`, 'YYYY-MM-DDTHH:mm', 'UTC');

            // Convert to the requested timezone
            const startTimeInTimeZone = startDateTimeUTC.tz(validatedTimeZone).format('HH:mm');
            const endTimeInTimeZone = endDateTimeUTC.tz(validatedTimeZone).format('HH:mm');


            return {
                startTime: startTimeInTimeZone,
                endTime: endTimeInTimeZone,
                isAvailable: slot.isAvailable,
            };
        });

        res.status(200).json({
            rakiId,
            date,
            timeZone: validatedTimeZone,
            timeSlots: convertedSlots,
        });
    } catch (error) {
        console.error('Error fetching availability:', error);
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

        console.log("Body", req.body);

        if (!Array.isArray(timeSlots) || !timeZone || !date) {
            return res.status(400).json({
                message: 'Invalid input. Required: date, timeSlots array, and timeZone',
            });
        }

        let validatedTimeZone: string;
        try {
            validatedTimeZone = validateAndConvertTimezone(timeZone);
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Invalid timezone',
            });
        }

        const utcTimeSlots: { startTime: string; endTime: string; }[] = [];
        const nextDayTimeSlots: { startTime: string; endTime: string; }[] = [];
        const currentDate = moment(date, 'YYYY-MM-DD');
        const nextDate = currentDate.clone().add(1, 'day').format('YYYY-MM-DD');

        timeSlots.forEach((slot) => {
            console.log("Processing slot:", slot);

            const startDateTime = moment.tz(`${date}T${slot.startTime}`, 'YYYY-MM-DDTHH:mm', validatedTimeZone).utc();
            const endDateTime = moment.tz(`${date}T${slot.endTime}`, 'YYYY-MM-DDTHH:mm', validatedTimeZone).utc();

            console.log("startDateTime:", startDateTime.format(), "endDateTime:", endDateTime.format());

            if (endDateTime.isBefore(startDateTime)) {
                // Slot spans into the next day (e.g., 23:00-00:30)
                console.log("++++++++++++++++++++++++++++++++++++++++++","startDateTime:", startDateTime.format(), "endDateTime:", endDateTime.format())

                utcTimeSlots.push({
                    startTime: startDateTime.format('HH:mm'),
                    endTime: '23:59',
                });

                nextDayTimeSlots.push({
                    startTime: '00:00', // Start from midnight on the next day
                    endTime: endDateTime.format('HH:mm') // Convert end time to the next day
                });
            }
            // if (endDateTime.isAfter(startDateTime)){
            //     console.log("=====================================","startDateTime:", startDateTime.format(), "endDateTime:", endDateTime.format())
            // }
            else {
                // Slot is within the same day
                utcTimeSlots.push({
                    startTime: startDateTime.format('HH:mm'),
                    endTime: endDateTime.format('HH:mm'),
                });
            }
        });

        // Debugging log to check the times before validation
        console.log("UTC TimeSlots:", utcTimeSlots);
        console.log("Next Day TimeSlots:", nextDayTimeSlots);

        // Validate times again with updated logic
        const isValidTimes = utcTimeSlots.concat(nextDayTimeSlots).every(
            (slot) => {
                // Convert times back to a moment object before validating
                const startTimeMoment = moment(slot.startTime, 'HH:mm');
                const endTimeMoment = moment(slot.endTime, 'HH:mm');

                return startTimeMoment.isValid() &&
                    endTimeMoment.isValid() &&
                    startTimeMoment.isBefore(endTimeMoment);
            }
        );

        if (!isValidTimes) {
            return res.status(400).json({
                message: 'Invalid time format or start time is after end time',
            });
        }

        // Save current day availability
        const currentDayAvailability = await RakiAvailability.findOneAndUpdate(
            { rakiId, date },
            {
                rakiId,
                date,
                timeSlots: utcTimeSlots,
                sourceTimeZone: validatedTimeZone,
            },
            { new: true, upsert: true }
        );

        let nextDayAvailability = null;
        if (nextDayTimeSlots.length > 0) {
            // Save next day availability
            nextDayAvailability = await RakiAvailability.findOneAndUpdate(
                { rakiId, date: nextDate },
                {
                    rakiId,
                    date: nextDate,
                    timeSlots: nextDayTimeSlots,
                    sourceTimeZone: validatedTimeZone,
                },
                { new: true, upsert: true }
            );
        }

        res.status(200).json({
            message: 'Availability set successfully',
            currentDayAvailability,
            nextDayAvailability,
        });
    } catch (error) {
        console.error("Error setting availability:", error);
        res.status(500).json({
            message: 'Error setting availability',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const removeAvailability = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const rakiId = req.user?.id;
        const { date, startTime, timeZone = 'UTC' } = req.body;

        if (!rakiId || !date || !startTime) {
            return res.status(400).json({ message: 'Invalid input. Required: date, startTime, and timeZone' });
        }

        // Validate timezone
        let validatedTimeZone: string;
        try {
            validatedTimeZone = validateAndConvertTimezone(timeZone);
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Invalid timezone',
            });
        }

        const availability = await RakiAvailability.findOne({ rakiId, date }).exec();

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        // Convert provided startTime to UTC for comparison
        const startDateTimeUTC = moment
            .tz(`${date}T${startTime}`, 'YYYY-MM-DDTHH:mm', validatedTimeZone)
            .utc()
            .format('HH:mm');

        // Remove the time slot with the matching startTime
        const updatedTimeSlots = availability.timeSlots.filter(
            (slot) => slot.startTime !== startDateTimeUTC
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
        console.error('Error removing availability:', error);
        res.status(500).json({ message: 'Error removing availability', error });
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
