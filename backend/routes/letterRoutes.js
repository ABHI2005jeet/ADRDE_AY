import express from 'express';
import { getLetters, createLetter } from '../controllers/letterController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getLetters)
  .post(protect, createLetter);

export default router;
