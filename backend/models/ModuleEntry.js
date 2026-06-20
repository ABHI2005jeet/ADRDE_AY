import mongoose from 'mongoose';

const moduleEntrySchema = new mongoose.Schema({
  moduleName: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String },
  status: { type: String, enum: ['Active', 'Archived'], default: 'Active' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('ModuleEntry', moduleEntrySchema);
