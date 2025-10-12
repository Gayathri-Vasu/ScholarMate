const mongoose = require('mongoose');
const Course = require('../models/Course');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tamilnadu-learn-spark');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const checkCourses = async () => {
  try {
    await connectDB();
    
    console.log('Checking existing courses...');
    
    const courses = await Course.find({}).select('title slug thumbnailUrl');
    console.log(`Found ${courses.length} courses in database:`);
    
    courses.forEach(course => {
      console.log(`- ${course.title} (${course.slug}): ${course.thumbnailUrl || 'No thumbnail'}`);
    });
    
    if (courses.length === 0) {
      console.log('\nNo courses found in database. You may need to seed the database first.');
    }
    
  } catch (error) {
    console.error('Error checking courses:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the script
checkCourses();

