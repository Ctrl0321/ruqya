import express from 'express';
import {getAllAdmins, getAvailability, setAvailability} from "../controllers/availabiltyController";
import {authorizeRoles, protect} from "../middleware/authMiddleware";

const router = express.Router();

router.get('/rakis', getAllAdmins);
router.get('/get-availability',protect, getAvailability);
router.post('/set-availability', protect, authorizeRoles('admin'), setAvailability);

export default router;
