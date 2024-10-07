import express from 'express';
import { register, login, logout, getProfile, updateProfile, getOwnProfile, updateOwnProfile } from '../controller/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/profiles/:id', getProfile);
router.put('/profiles/:id', authenticate, updateProfile);

router.get('/profile', authenticate, getOwnProfile);
router.put('/profile', authenticate, updateOwnProfile);

export default router;
