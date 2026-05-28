import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const adminExists = await User.findOne({ email: 'abhijeet@adrde.gov.in' });
    
    if (adminExists) {
      console.log('Admin already seeded.');
      process.exit();
    }
    
    const adminUser = await User.create({
      name: 'Abhijeet Kumar',
      employeeId: 'ADMIN-001',
      email: 'abhijeet@adrde.gov.in',
      password: 'password123', // Force change on actual prod
      role: 'Admin',
      department: 'Headquarters'
    });
    
    console.log('Admin user seeded:', adminUser);
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedAdmin();
