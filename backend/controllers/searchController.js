import User from '../models/User.js';
import Meeting from '../models/Meeting.js';
import Document from '../models/Document.js';
import Letter from '../models/Letter.js';
import Inventory from '../models/Inventory.js';

export const globalSearch = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.json({ results: [] });
    }

    // Perform case-insensitive regex search
    const searchRegex = new RegExp(query, 'i');

    const [users, meetings, documents, letters, inventory] = await Promise.all([
      User.find({ 
        $or: [{ name: searchRegex }, { employeeId: searchRegex }, { email: searchRegex }] 
      }).select('name employeeId email role').limit(5),
      
      Meeting.find({ 
        $or: [{ title: searchRegex }, { description: searchRegex }] 
      }).select('title date status priority').limit(5),
      
      Document.find({ 
        title: searchRegex 
      }).select('title documentType approvalStatus').limit(5),

      Letter.find({
        $or: [{ subject: searchRegex }, { letterId: searchRegex }]
      }).select('subject letterId type status').limit(5),

      Inventory.find({
        $or: [{ name: searchRegex }, { itemId: searchRegex }]
      }).select('name itemId category status quantity').limit(5)
    ]);

    res.json({
      query,
      results: {
        users,
        meetings,
        documents,
        letters,
        inventory
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
