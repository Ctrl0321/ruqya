import express from "express";
import {
    addMeeting, cancelMeeting,
    getAllMeetings, getMeetingsByRakiId,
    getMeetingsByUserId,
    getTodayAndFutureMeetings, rescheduleMeeting
} from "../controllers/meetingControllers";
import {authorizeRoles, protect} from "../middleware/authMiddleware";

const router = express.Router();

router.get('/get-meetings', protect, authorizeRoles('super-admin'), getAllMeetings);
router.get('/get-today-meetings', protect, authorizeRoles('super-admin'), getTodayAndFutureMeetings);
router.post('/add-meetings', protect, authorizeRoles('admin'), addMeeting);
router.get('/get-meetings/user/', protect, authorizeRoles('user'), getMeetingsByUserId);
router.get('/get-meetings/raki/', protect, authorizeRoles('admin', 'super-admin'), getMeetingsByRakiId);
router.post('/reschedule/', protect, authorizeRoles('admin','super-admin'), rescheduleMeeting);
router.post('/cancel/', protect, authorizeRoles('admin', 'super-admin'), cancelMeeting);

export default router