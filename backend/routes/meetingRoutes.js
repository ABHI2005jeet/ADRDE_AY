import express from 'express';
import { createMeeting, getMeetings, updateMeetingStatus } from '../controllers/meetingController.js';
import { protect, paraHeadOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getMeetings)
  .post(protect, createMeeting);

router.route('/:id/status')
  .put(protect, updateMeetingStatus); // Should add more strict role checks later

export default router;
