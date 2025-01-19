import {AuthenticatedRequest} from "../@types/express";
import {Response} from "express";
import Meeting from "../models/meeting";
import {convertToTimeZone} from "../utils/timezone";


export const getAllMeetings=async(req: AuthenticatedRequest, res: Response)=>{
    try {
        const meetings = await Meeting.find();

        if (!meetings || meetings.length === 0) {
            res.status(404).json({ message: 'No meetings found' });
            return;
        }

        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const getTodayAndFutureMeetings = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const meetings = await Meeting.find({
            date: { $gte: today }
        });

        if (!meetings || meetings.length === 0) {
            res.status(404).json({ message: 'No meetings found' });
            return;
        }

        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const addMeeting = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
    try {

        const rakiId = req.user?.id;
        if (!rakiId) {
            return res.status(401).json({ message: 'User ID not found in request' });
        }

        const { meetingId, topic, date, userId, notificationSend } = req.body;

        if (!meetingId || !topic || !date  || !userId) {
            res.status(400).json({ message: 'All required fields must be provided' });
            return;
        }

        const meeting = new Meeting({
            meetingId,
            topic,
            date: new Date(date),
            rakiId,
            userId,
            notificationSend: notificationSend ?? false,
        });

        const savedMeeting = await meeting.save();

        res.status(201).json(savedMeeting);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add meeting', error });
    }
};

export const getMeetingsByUserId = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'User ID not found in request' });
        }

        const { timeZone } = req.query;

        const meetings = await Meeting.find({ userId });

        if (!meetings || meetings.length === 0) {
            res.status(404).json({ message: 'No meetings found for this user' });
            return;
        }

        const convertedMeetings = meetings.map(meeting => ({
            ...meeting.toObject(),
            date: convertToTimeZone(meeting.date, timeZone?.toString() || 'UTC'),
        }));

        res.status(200).json(convertedMeetings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch meetings', error });
    }
};

export const getMeetingsByRakiId = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
    try {
        const rakiId = req.user?.id;

        if (!rakiId) {
            return res.status(401).json({ message: 'User ID not found in request' });
        }

        const { timeZone } = req.query;

        const meetings = await Meeting.find({ rakiId });

        if (!meetings || meetings.length === 0) {
            res.status(404).json({ message: 'No meetings found for this Raki ID' });
            return;
        }

        const convertedMeetings = meetings.map(meeting => ({
            ...meeting.toObject(),
            date: convertToTimeZone(meeting.date, timeZone?.toString() || 'UTC'),
        }));

        res.status(200).json(convertedMeetings);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch meetings', error });
    }
};
