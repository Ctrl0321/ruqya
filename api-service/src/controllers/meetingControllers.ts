import {AuthenticatedRequest} from "../@types/express";
import {Response} from "express";
import Meeting from "../models/meeting";
import {validateAndConvertTimezone} from "../utils/timezone";
import moment from "moment-timezone";



const convertMeetingDates = (meetings: any[], timeZone: string): any[] => {
    return meetings.map(meeting => ({
        ...meeting.toObject(),
        date: moment(meeting.date).tz(timeZone).format('YYYY-MM-DD HH:mm:ss'),
        originalTimezone: timeZone
    }));
};

export const getAllMeetings = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
    try {
        const { timeZone = 'UTC' } = req.query;

        let validatedTimeZone: string;
        try {
            validatedTimeZone = validateAndConvertTimezone(timeZone.toString());
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Invalid timezone'
            });
        }

        const meetings = await Meeting.find();

        if (!meetings || meetings.length === 0) {
            return res.status(404).json({ message: 'No meetings found' });
        }

        const convertedMeetings = convertMeetingDates(meetings, validatedTimeZone);
        res.status(200).json(convertedMeetings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getTodayAndFutureMeetings = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
    try {
        const { timeZone = 'UTC' } = req.query;

        let validatedTimeZone: string;
        try {
            validatedTimeZone = validateAndConvertTimezone(timeZone.toString());
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Invalid timezone'
            });
        }

        const today = moment.tz(validatedTimeZone).startOf('day');

        const meetings = await Meeting.find({
            date: { $gte: today.toDate() }
        });

        if (!meetings || meetings.length === 0) {
            return res.status(404).json({ message: 'No meetings found' });
        }

        const convertedMeetings = convertMeetingDates(meetings, validatedTimeZone);
        res.status(200).json(convertedMeetings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const addMeeting = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const rakiId = req.user?.id;
        if (!rakiId) {
            return res.status(401).json({ message: 'User ID not found in request' });
        }

        const { meetingId, topic, date, userId, notificationSend=false, timeZone = 'UTC' } = req.body;

        if (!meetingId || !topic || !date || !userId) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }

        let validatedTimeZone: string;
        try {
            validatedTimeZone = validateAndConvertTimezone(timeZone);
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Invalid timezone'
            });
        }

        const utcDate = moment.tz(date, validatedTimeZone).utc().toDate();
        const dayStart = moment(utcDate).startOf('day');
        const dayEnd = moment(utcDate).endOf('day');



        const existingMeetings = await Meeting.find({
            $or: [
                { rakiId: rakiId },
                { userId: userId }
            ],
            date: {
                $gte: dayStart.toDate(),
                $lte: dayEnd.toDate()
            }
        });

        if (existingMeetings.length > 0) {
            // Check which party has the conflict
            const rakiConflict = existingMeetings.some(meeting => meeting.rakiId === rakiId);
            const userConflict = existingMeetings.some(meeting => meeting.userId === userId);

            let conflictMessage = '';
            if (rakiConflict && userConflict) {
                conflictMessage = 'Both Raki and User already have meetings scheduled for this date';
            } else if (rakiConflict) {
                conflictMessage = 'Raki already has a meeting scheduled for this date';
            } else {
                conflictMessage = 'User already has a meeting scheduled for this date';
            }

            return res.status(409).json({
                message: 'Meeting scheduling conflict',
                detail: conflictMessage,
                conflictingMeetings: existingMeetings.map(meeting => ({
                    ...meeting.toObject(),
                    date: moment(meeting.date).tz(validatedTimeZone).format('YYYY-MM-DD HH:mm:ss')
                }))
            });
        }

        const meeting = new Meeting({
            meetingId,
            topic,
            date: utcDate,
            rakiId,
            userId,
            notificationSend: notificationSend ?? false,
        });

        const savedMeeting = await meeting.save();

        const convertedMeeting = {
            ...savedMeeting.toObject(),
            date: moment(savedMeeting.date).tz(validatedTimeZone).format('YYYY-MM-DD HH:mm:ss')
        };

        res.status(201).json(convertedMeeting);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add meeting', error });
    }
};

export const getMeetingsByUserId = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'User ID not found in request' });
        }

        const { timeZone = 'UTC' } = req.query;

        // Validate timezone
        let validatedTimeZone: string;
        try {
            validatedTimeZone = validateAndConvertTimezone(timeZone.toString());
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Invalid timezone'
            });
        }

        const meetings = await Meeting.find({ userId });

        if (!meetings || meetings.length === 0) {
            return res.status(404).json({ message: 'No meetings found for this user' });
        }

        const convertedMeetings = convertMeetingDates(meetings, validatedTimeZone);
        res.status(200).json(convertedMeetings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch meetings', error });
    }
};

export const getMeetingsByRakiId = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const rakiId = req.user?.id;
        if (!rakiId) {
            return res.status(401).json({ message: 'User ID not found in request' });
        }

        const { timeZone = 'UTC' } = req.query;

        // Validate timezone
        let validatedTimeZone: string;
        try {
            validatedTimeZone = validateAndConvertTimezone(timeZone.toString());
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Invalid timezone'
            });
        }

        const meetings = await Meeting.find({ rakiId });

        if (!meetings || meetings.length === 0) {
            return res.status(404).json({ message: 'No meetings found for this Raki ID' });
        }

        const convertedMeetings = convertMeetingDates(meetings, validatedTimeZone);
        res.status(200).json(convertedMeetings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch meetings', error });
    }
};