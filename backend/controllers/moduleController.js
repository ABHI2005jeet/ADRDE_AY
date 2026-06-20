import ModuleEntry from '../models/ModuleEntry.js';
import { io } from '../server.js';

export const getEntries = async (req, res) => {
  try {
    const entries = await ModuleEntry.find({ moduleName: req.params.moduleName })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createEntry = async (req, res) => {
  try {
    const entry = new ModuleEntry({
      ...req.body,
      moduleName: req.params.moduleName,
      createdBy: req.user._id
    });
    
    const savedEntry = await entry.save();
    
    // Broadcast
    io.emit('module_entry_added', { moduleName: req.params.moduleName, entry: savedEntry });
    
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
