import { Request, Response } from 'express';
import RakiAvailability ,{IRakiAvailability} from "../models/rakiAvailability";
import moment from 'moment-timezone';
import {AuthenticatedRequest} from "../@types/express";

export const getAvailability = async (req: Request, res: Response) => {
    try {
        const { doctorId, date, timeZone } = req.query;

        const availability = await RakiAvailability.findOne({
            doctorId,
            date,
        }).exec();

        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }

        const convertedSlots = availability.timeSlots.map((slot) => {
            return {
                startTime: moment.utc(slot.startTime).tz(timeZone as string).format('YYYY-MM-DD hh:mm A'),
                endTime: moment.utc(slot.endTime).tz(timeZone as string).format('YYYY-MM-DD hh:mm A'),
                isAvailable: slot.isAvailable,
            };
        });

        res.status(200).json({
            doctorId,
            date,
            timeSlots: convertedSlots,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching availability', error });
    }
};

export const setAvailability = async (req: AuthenticatedRequest, res: Response) => {
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
