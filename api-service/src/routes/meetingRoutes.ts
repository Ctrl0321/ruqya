import express from "express";
import {
    addMeeting,
    getAllMeetings, getMeetingsByRakiId,
    getMeetingsByUserId,
    getTodayAndFutureMeetings
} from "../controllers/meetingControllers";
import {authorizeRoles, protect} from "../middleware/authMiddleware";

const router = express.Router();

router.get('/get-meetings', protect, authorizeRoles('super-admin'), getAllMeetings);
router.get('/get-today-meetings', protect, authorizeRoles('super-admin'), getTodayAndFutureMeetings);
router.post('/add-meetings', protect, authorizeRoles('admin'), addMeeting);
router.get('/get-meetings/user/', protect, authorizeRoles('user'), getMeetingsByUserId);
router.get('/get-meetings/raki/', protect, authorizeRoles('admin', 'super-admin'), getMeetingsByRakiId);