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

// Course thumbnail mappings
const courseThumbnails = {
  'tn-10-maths-algebra-basics': '/course-thumbnails/tn-10-maths-algebra.svg',
  'tn-12-physics-electrostatics': '/course-thumbnails/tn-12-physics-electrostatics.svg',
  'tnpsc-group-1-prelims': '/course-thumbnails/tnpsc-group-1-prelims.svg',
  'dsa-cpp-complete': '/course-thumbnails/dsa-cpp-complete.svg',
  'aptitude-complete-course': '/course-thumbnails/aptitude-complete-course.svg',
  'genai-prompt-engineering': '/course-thumbnails/prompt.svg'
};

const updateCourseThumbnails = async () => {
  try {
    await connectDB();
    
    console.log('Updating course thumbnails...');
    
    for (const [slug, thumbnailUrl] of Object.entries(courseThumbnails)) {
      const result = await Course.updateOne(
        { slug: slug },
        { $set: { thumbnailUrl: thumbnailUrl } }
      );
      
      if (result.matchedCount > 0) {
        console.log(`✅ Updated thumbnail for course: ${slug}`);
      } else {
        console.log(`❌ Course not found: ${slug}`);
      }
    }
    
    console.log('Course thumbnail update completed!');
    
    // Verify updates
    console.log('\nVerifying updates...');
    const courses = await Course.find({}).select('title slug thumbnailUrl');
    courses.forEach(course => {
      console.log(`${course.title}: ${course.thumbnailUrl || 'No thumbnail'}`);
    });
    
  } catch (error) {
    console.error('Error updating course thumbnails:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Run the script
updateCourseThumbnails();

