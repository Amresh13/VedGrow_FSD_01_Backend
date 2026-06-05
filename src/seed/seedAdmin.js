import mongoose from 'mongoose';
import env from '../config/env.js';
import User from '../models/User.js';

const seedAdmin = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected for seeding...');

    const existing = await User.findOne({ email: env.adminEmail });
    if (existing) {
      console.log('Admin user already exists, skipping seed.');
      await mongoose.disconnect();
      return;
    }

    await User.create({
      name: env.adminName,
      email: env.adminEmail,
      password: env.adminPassword,
      isVerified: true,
    });

    console.log(`Admin user created: ${env.adminEmail} / ${env.adminPassword}`);
    await mongoose.disconnect();
    console.log('Seed complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();
