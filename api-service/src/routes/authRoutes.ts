import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import { protect, authorizeRoles } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
//     res.send('Admin content');
// });
// router.get('/doctor', protect, authorizeRoles('doctor'), (req, res) => {
//     res.send('Doctor content');
// });
// router.get('/user', protect, (req, res) => {
//     res.send('User content');
// });

export default router;
