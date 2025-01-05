import express from 'express';
import {changePassword, updateUser, updateUserRole} from '../controllers/userController';
import {authorizeRoles, protect} from "../middleware/authMiddleware";

const router = express.Router();

router.post('/update',protect, updateUser);
router.post('/change-password', protect, changePassword);
router.post('/update-role', protect, authorizeRoles('admin'), updateUserRole);


export default router;
