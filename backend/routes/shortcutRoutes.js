import express from 'express';
import { getShortcuts, createShortcut } from '../controllers/shortcutController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getShortcuts)
  .post(protect, adminOnly, createShortcut);

export default router;
