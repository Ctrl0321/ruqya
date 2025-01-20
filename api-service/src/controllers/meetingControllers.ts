import {AuthenticatedRequest} from "../@types/express";
import {Response} from "express";
import Meeting, {MeetingStatus} from "../models/meeting";
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

export const rescheduleMeeting = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const {meetingId, newDate, timeZone = 'UTC' } = req.body;

        if (!newDate) {
            return res.status(400).json({
                message: 'New date is required for rescheduling'
            });
        }

        let validatedTimeZone: string;
        try {
            validatedTimeZone = validateAndConvertTimezone(timeZone);
        } catch (error) {
            return res.status(400).json({
                message: error instanceof Error ? error.message : 'Invalid timezone'
            });
        }

        const utcNewDate = moment.tz(newDate, validatedTimeZone).utc();

        const meeting = await Meeting.findOne({
            meetingId
        });

        if (!meeting) {
            return res.status(404).json({
                message: 'Meeting not found or you do not have permission to reschedule it'
            });
        }

        if (meeting.status === MeetingStatus.CANCELLED) {
            return res.status(400).json({
                message: 'Cannot reschedule a cancelled meeting'
            });
        }

        const dayStart = moment(utcNewDate).startOf('day');
        const dayEnd = moment(utcNewDate).endOf('day');

        const existingMeetings = await Meeting.find({
            _id: { $ne: meeting._id },
            date: {
                $gte: dayStart.toDate(),
                $lte: dayEnd.toDate()
            },
            status: { $ne: MeetingStatus.CANCELLED }
        });

        if (existingMeetings.length > 0) {
            return res.status(409).json({
                message: 'Scheduling conflict on the new date',
                conflictingMeetings: existingMeetings.map(m => ({
                    ...m.toObject(),
                    date: moment(m.date).tz(validatedTimeZone).format('YYYY-MM-DD HH:mm:ss')
                }))
            });
        }

        const updatedMeeting = await Meeting.findOneAndUpdate(
            { meetingId },
            {
                date: utcNewDate.toDate(),
                status: MeetingStatus.RESCHEDULED,
                note:'Meeting rescheduled',
                notificationSend: false
            },
            { new: true }
        );

        res.status(200).json({
            message: 'Meeting rescheduled successfully',
            meeting: {
                ...updatedMeeting?.toObject(),
                date: moment(updatedMeeting?.date).tz(validatedTimeZone).format('YYYY-MM-DD HH:mm:ss')
            }
        });

    } catch (error) {
        console.error('Error rescheduling meeting:', error);
        res.status(500).json({
            message: 'Failed to reschedule meeting',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

export const cancelMeeting = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { meetingId } = req.params;
        const { note } = req.body;

        if (!note) {
            return res.status(400).json({
                message: 'Cancellation note is required'
            });
        }

        const meeting = await Meeting.findOne({
            meetingId,
            $or: [
                { userId: userId },
                { rakiId: userId }
            ]
        });

        if (!meeting) {
            return res.status(404).json({
                message: 'Meeting not found or you do not have permission to cancel it'
            });
        }

        if (meeting.status === MeetingStatus.CANCELLED) {
            return res.status(400).json({
                message: 'Meeting is already cancelled'
            });
        }

        const updatedMeeting = await Meeting.findOneAndUpdate(
            { meetingId },
            {
                status: MeetingStatus.CANCELLED,
                note,
                notificationSend: false // Reset notification flag
            },
            { new: true }
        );

        res.status(200).json({
            message: 'Meeting cancelled successfully',
            meeting: updatedMeeting
        });

    } catch (error) {
        console.error('Error cancelling meeting:', error);
        res.status(500).json({
            message: 'Failed to cancel meeting',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};