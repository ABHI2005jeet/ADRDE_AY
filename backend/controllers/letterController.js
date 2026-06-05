import Letter from '../models/Letter.js';
import { io } from '../server.js';

export const getLetters = async (req, res) => {
  try {
    const letters = await Letter.find({}).sort({ createdAt: -1 });
    res.json(letters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLetter = async (req, res) => {
  try {
    const letter = new Letter({
      ...req.body,
      createdBy: req.user._id
    });
    const createdLetter = await letter.save();
    
    // Broadcast via socket
    io.emit('letter_updated', { letter: createdLetter, action: 'created' });
    
    res.status(201).json(createdLetter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
