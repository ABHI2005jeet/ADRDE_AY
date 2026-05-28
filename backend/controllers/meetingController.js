import Meeting from '../models/Meeting.js';
import Notification from '../models/Notification.js';
import { io } from '../server.js';

export const createMeeting = async (req, res) => {
  try {
    const meeting = new Meeting({
      ...req.body,
      createdBy: req.user._id,
      workflowHistory: [{
        action: 'Created',
        actor: req.user._id,
        comments: 'Meeting drafted.'
      }]
    });
    
    // According to rules, staff creates meeting. It starts as 'Draft' or 'Under Review'.
    if (req.user.role === 'Staff') {
      meeting.status = 'Under Review';
    } else {
      meeting.status = 'Approved'; // Admins/Heads can direct approve
    }
    
    const createdMeeting = await meeting.save();
    
    io.emit('meeting_updated', { meeting: createdMeeting, action: 'created' });
    
    res.status(201).json(createdMeeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({})
      .populate('createdBy', 'name email role')
      .populate('participants', 'name email role')
      .sort({ date: 1 });
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMeetingStatus = async (req, res) => {
  try {
    const { status, comments } = req.body;
    const meeting = await Meeting.findById(req.params.id);
    
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
    
    meeting.status = status;
    meeting.workflowHistory.push({
      action: `Status changed to ${status}`,
      actor: req.user._id,
      comments: comments || ''
    });
    
    const updatedMeeting = await meeting.save();
    
    io.emit('meeting_updated', { meeting: updatedMeeting, action: 'status_changed' });
    
    res.json(updatedMeeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
