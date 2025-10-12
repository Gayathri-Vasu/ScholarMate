/*
 * One-off cleanup script to remove CBSE category and its related data
 * Usage: node scripts/revertCbse.js
 */

require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Subject = require('../models/Subject');
const Course = require('../models/Course');

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tn-learning-hub';

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    const category = await Category.findOne({ slug: 'cbse' });
    if (!category) {
      console.log('CBSE category not found. Nothing to delete.');
      return;
    }

    const categoryId = category._id;

    const subjResult = await Subject.deleteMany({ categoryId });
    const courseResult = await Course.deleteMany({ categoryId });
    const catResult = await Category.deleteOne({ _id: categoryId });

    console.log('Deleted documents:');
    console.log(`  Subjects: ${subjResult.deletedCount}`);
    console.log(`  Courses:  ${courseResult.deletedCount}`);
    console.log(`  Category: ${catResult.deletedCount}`);
  } catch (err) {
    console.error('Error reverting CBSE data:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

run();


















