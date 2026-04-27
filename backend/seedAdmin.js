const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Admin = require('./models/Admin');

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    // Admin details
    const adminData = {
      adminId: 'vaibhav',
      password: '32003200',
      name: 'Vaibhav'
    };

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ adminId: adminData.adminId });
    if (existingAdmin) {
      console.log('Admin user already exists. Skipping seed.');
      process.exit(0);
    }

    // Create new Admin
    // The Admin model has a pre-save hook that hashes the password automatically
    const admin = new Admin(adminData);
    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log('Admin ID: vaibhav');
    console.log('Password: 32003200');
    console.log('You can now log in to the dashboard.');

  } catch (err) {
    console.error('Error seeding admin:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin();
