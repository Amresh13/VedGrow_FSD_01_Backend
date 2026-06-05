import mongoose from 'mongoose';
import env from '../config/env.js';
import Category from '../models/Category.js';

const categories = [
  { name: 'Technology', description: 'Articles about tech, software, and gadgets' },
  { name: 'Design', description: 'UI/UX design, graphic design, and creative work' },
  { name: 'Programming', description: 'Coding tutorials, tips, and best practices' },
  { name: 'Web Development', description: 'Frontend, backend, and full-stack development' },
  { name: 'Career', description: 'Career advice, interviews, and professional growth' },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected for seeding categories...');

    const existing = await Category.countDocuments();
    if (existing > 0) {
      console.log(`Categories already exist (${existing}), skipping seed.`);
      await mongoose.disconnect();
      process.exit(0);
    }

    await Category.create(categories);
    console.log(`Seeded ${categories.length} categories.`);
    await mongoose.disconnect();
    console.log('Seed complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedCategories();
