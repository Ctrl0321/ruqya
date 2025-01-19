import express from 'express';
import {
    changePassword,
    getAllUsers,
    getUserById, getUserProfile,
    updateUser,
    updateUserRole
} from '../controllers/userController';
import {authorizeRoles, protect} from "../middleware/authMiddleware";

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/user-profile',protect, getUserProfile);
router.post('/update',protect, updateUser);
router.post('/change-password', protect, changePassword);
router.post('/update-role', protect, authorizeRoles('super-admin'), updateUserRole);
router.get('/:id', getUserById);



export default router;
