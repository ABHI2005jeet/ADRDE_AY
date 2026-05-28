import multer from 'multer';
import path from 'path';
import Document from '../models/Document.js';
import { io } from '../server.js';

// Multer Config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // 10MB limit
}).single('file');

export const uploadDocument = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const doc = new Document({
        title: req.body.title || req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
        uploader: req.user._id,
        department: req.body.department || req.user.department,
        documentType: req.body.documentType || 'Other'
      });
      
      const createdDoc = await doc.save();
      
      io.emit('document_uploaded', { document: createdDoc });
      
      res.status(201).json(createdDoc);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({})
      .populate('uploader', 'name email role')
      .sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
