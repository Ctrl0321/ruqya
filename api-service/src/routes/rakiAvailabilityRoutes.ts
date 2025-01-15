import express from 'express';
import {getAvailability, setAvailability} from "../controllers/availabiltyController";
import {authorizeRoles, protect} from "../middleware/authMiddleware";

const router = express.Router();

router.get('/get-availability',protect, getAvailability);
router.post('/set-availability', protect, authorizeRoles('raki'), setAvailability);

export default router;
