import express from 'express';
import {getAllAdmins, getAvailability, removeAvailability, setAvailability} from "../controllers/availabiltyController";
import {authorizeRoles, protect} from "../middleware/authMiddleware";

const router = express.Router();

router.get('/rakis', getAllAdmins);
router.get('/get-availability',protect, getAvailability);
router.post('/set-availability', protect, authorizeRoles('admin','super-admin'), setAvailability);
router.post('/remove-availability', protect, authorizeRoles('admin','super-admin'), removeAvailability);

export default router;
