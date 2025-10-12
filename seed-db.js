#!/usr/bin/env node

/**
 * Database Seeding Script for Tamil Nadu Learning Hub
 * 
 * This script will populate your MongoDB database with sample data including:
 * - 4 Categories (TN Board, TNPSC, Engineering, IT Placement)
 * - 20+ Subjects across all categories
 * - 15+ Comprehensive courses with detailed sections
 * 
 * Usage:
 *   node seed-db.js
 * 
 * Make sure to set your MONGODB_URI environment variable or it will use the default local MongoDB.
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🌱 Starting Tamil Nadu Learning Hub Database Seeding...\n');

try {
  // Check if we're in the right directory
  const backendPath = path.join(__dirname, 'backend');
  
  console.log('📁 Running seed script from backend directory...');
  
  // Change to backend directory and run the seed script
  process.chdir(backendPath);
  
  // Run the seed script
  execSync('node scripts/seedDatabase.js', { stdio: 'inherit' });
  
  console.log('\n✅ Database seeding completed successfully!');
  console.log('\n📊 Summary of seeded data:');
  console.log('   • 4 Categories (TN Board, TNPSC, Engineering, IT Placement)');
  console.log('   • 20+ Subjects across all categories');
  console.log('   • 15+ Comprehensive courses with detailed sections');
  console.log('   • Realistic enrollment counts and ratings');
  console.log('\n🚀 Your Tamil Nadu Learning Hub is ready to use!');
  
} catch (error) {
  console.error('❌ Error running database seed script:', error.message);
  console.log('\n💡 Make sure:');
  console.log('   1. MongoDB is running on your system');
  console.log('   2. You have the correct MONGODB_URI in your root .env file');
  console.log('   3. All dependencies are installed (run: npm run install:all)');
  process.exit(1);
}
