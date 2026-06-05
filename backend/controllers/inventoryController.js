import Inventory from '../models/Inventory.js';
import { io } from '../server.js';

export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createInventory = async (req, res) => {
  try {
    const item = new Inventory({
      ...req.body,
      updatedBy: req.user._id
    });
    const createdItem = await item.save();
    
    // Broadcast via socket
    io.emit('inventory_updated', { item: createdItem, action: 'created' });
    
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
