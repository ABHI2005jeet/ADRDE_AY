import express from 'express';
import { uploadDocument, getDocuments } from '../controllers/documentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getDocuments)
  .post(protect, uploadDocument);

export default router;
