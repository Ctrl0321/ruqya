import express from "express";
import {
    addMeeting, cancelMeeting,
    getAllMeetings, getCallDetails, getCallToken, getMeetingsByRakiId,
    getMeetingsByUserId, getMeetingStatistics,
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
router.get('/get-meeting-statistics/', protect, authorizeRoles( 'super-admin'), getMeetingStatistics);
router.get('/getCallDetails/:meetingId', getCallDetails);
router.post('/getCallToken/', getCallToken);


export default router