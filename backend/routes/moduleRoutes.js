import express from 'express';
import { getEntries, createEntry } from '../controllers/moduleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:moduleName', protect, getEntries);
router.post('/:moduleName', protect, createEntry);

export default router;
