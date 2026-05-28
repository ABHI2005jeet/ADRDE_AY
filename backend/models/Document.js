import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: String },
  meetingRelation: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting' },
  documentType: { type: String, enum: ['Agenda', 'Report', 'Notes', 'Other'], default: 'Other' },
  approvalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Document', documentSchema);
