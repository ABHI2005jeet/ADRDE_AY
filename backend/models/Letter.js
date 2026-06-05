import mongoose from 'mongoose';

const letterSchema = new mongoose.Schema({
  letterId: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  type: { type: String, enum: ['Incoming', 'Outgoing', 'Draft'], required: true },
  senderRecipient: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Action Required', 'Resolved', 'Sent', 'Draft'], default: 'Draft' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Letter', letterSchema);
