import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Meeting from './models/Meeting.js';
import Document from './models/Document.js';
import Letter from './models/Letter.js';
import Inventory from './models/Inventory.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for seeding...');

    // Get the admin user
    const adminUser = await User.findOne({ email: 'dhirendrakumar8594@gmail.com' });
    if (!adminUser) {
      console.log('Please run seedAdmin.js first.');
      process.exit(1);
    }

    // Seed Meetings
    const meetingCount = await Meeting.countDocuments();
    if (meetingCount === 0) {
      await Meeting.create([
        {
          title: 'MAC Monthly Review',
          description: 'Monthly review of the MAC agenda and outstanding tasks.',
          date: new Date(Date.now() + 86400000 * 2), // 2 days from now
          time: '10:00 AM',
          venue: 'Conference Room A',
          department: 'MAC',
          priority: 'High',
          createdBy: adminUser._id,
          status: 'Pending Approval'
        },
        {
          title: 'System Integration Sync',
          description: 'Sync regarding the new internal portal deployment.',
          date: new Date(Date.now() + 86400000 * 5),
          time: '02:00 PM',
          venue: 'Virtual',
          department: 'IT',
          priority: 'Medium',
          createdBy: adminUser._id,
          status: 'Approved'
        }
      ]);
      console.log('Seeded Meetings');
    }

    // Seed Documents
    const docCount = await Document.countDocuments();
    if (docCount === 0) {
      await Document.create([
        {
          title: 'Q2 MAC Agenda Items',
          filename: 'q2_agenda.pdf',
          path: '/uploads/q2_agenda.pdf',
          mimetype: 'application/pdf',
          size: 1024500,
          uploader: adminUser._id,
          documentType: 'Agenda',
          approvalStatus: 'Approved'
        },
        {
          title: 'Security Compliance Report',
          filename: 'sec_report.docx',
          path: '/uploads/sec_report.docx',
          mimetype: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          size: 512000,
          uploader: adminUser._id,
          documentType: 'Report',
          approvalStatus: 'Pending'
        }
      ]);
      console.log('Seeded Documents');
    }

    // Seed Letters
    const letterCount = await Letter.countDocuments();
    if (letterCount === 0) {
      await Letter.create([
        {
          letterId: 'LTR-2026-001',
          subject: 'Approval for New Server Rack',
          type: 'Outgoing',
          senderRecipient: 'Ministry of Defence',
          status: 'Sent',
          createdBy: adminUser._id
        }
      ]);
      console.log('Seeded Letters');
    }

    // Seed Inventory
    const invCount = await Inventory.countDocuments();
    if (invCount === 0) {
      await Inventory.create([
        {
          itemId: 'INV-001',
          name: 'Dell Precision Workstation',
          category: 'IT Equipment',
          quantity: 15,
          location: 'Lab 3',
          updatedBy: adminUser._id
        }
      ]);
      console.log('Seeded Inventory');
    }

    console.log('Database seeding complete!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
