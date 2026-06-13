import Message from '../models/Message.js';
import User from '../models/User.js';
import { io } from '../server.js';

export const getConversations = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }]
    })
      .populate('sender', 'name role profileImage')
      .populate('receiver', 'name role profileImage')
      .sort({ createdAt: -1 });

    // Group by conversation partner
    const conversations = {};
    messages.forEach(msg => {
      const partnerId = msg.sender._id.toString() === req.user._id.toString() ? msg.receiver._id : msg.sender._id;
      if (!conversations[partnerId]) {
        conversations[partnerId] = {
          partner: msg.sender._id.toString() === req.user._id.toString() ? msg.receiver : msg.sender,
          lastMessage: msg,
          unreadCount: msg.receiver._id.toString() === req.user._id.toString() && !msg.read ? 1 : 0
        };
      } else {
        if (msg.receiver._id.toString() === req.user._id.toString() && !msg.read) {
          conversations[partnerId].unreadCount += 1;
        }
      }
    });

    res.json(Object.values(conversations));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user._id }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    
    const message = new Message({
      sender: req.user._id,
      receiver: receiverId,
      content
    });

    await message.save();

    // Broadcast message via socket
    io.emit(`new_message_${receiverId}`, message);

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    await Message.updateMany(
      { sender: req.params.userId, receiver: req.user._id, read: false },
      { $set: { read: true } }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
