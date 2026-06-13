import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, resetPassword, forgotPassword } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resettoken', resetPassword);
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

export default router;
