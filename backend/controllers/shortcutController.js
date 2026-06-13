import Shortcut from '../models/Shortcut.js';

export const getShortcuts = async (req, res) => {
  try {
    const shortcuts = await Shortcut.find({ isActive: true }).sort({ order: 1 });
    res.json(shortcuts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createShortcut = async (req, res) => {
  try {
    const shortcut = new Shortcut(req.body);
    const created = await shortcut.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
