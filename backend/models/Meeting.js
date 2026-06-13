import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  department: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  agendaNotes: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  documents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }],
  status: { 
    type: String, 
    enum: ['Draft', 'Under Review', 'Pending Approval', 'Approved', 'Rejected', 'Published', 'Changes Requested'],
    default: 'Draft'
  },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvalTime: { type: Date },
  rejectionReason: { type: String },
  workflowHistory: [{
    action: String,
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    comments: String
  }]
}, { timestamps: true });

export default mongoose.model('Meeting', meetingSchema);
