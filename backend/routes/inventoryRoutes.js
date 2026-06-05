import express from 'express';
import { getInventory, createInventory } from '../controllers/inventoryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getInventory)
  .post(protect, createInventory);

export default router;
