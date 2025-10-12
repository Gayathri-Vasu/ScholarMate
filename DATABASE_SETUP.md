# Database Setup Guide

This guide will help you set up and populate your Tamil Nadu Learning Hub database with comprehensive sample data.

## Prerequisites

1. **MongoDB**: Make sure MongoDB is installed and running on your system
2. **Node.js**: Ensure Node.js (v18+) is installed
3. **Dependencies**: Install all project dependencies

## Quick Setup

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Set Up Environment Variables
```bash
# Copy the example environment file
cp .env

# Edit the .env file with your MongoDB connection string
# Default: mongodb://localhost:27017/tn-learning-hub
```

### 3. Seed the Database
```bash
# Option 1: Use the workspace script (recommended)
npm run seed

# Option 2: Run directly from backend directory
npm run seed:backend

# Option 3: Run the script directly
node seed-db.js
```

## What Gets Seeded

### Categories (4)
- **TN State Board** 📚 - Tamil Nadu State Board curriculum for classes 9-12
- **TNPSC** 🎓 - Tamil Nadu Public Service Commission exam preparation
- **Engineering** ⚙️ - All engineering branches study materials
- **IT Placement** 💼 - IT placement preparation with aptitude and programming

### Subjects (20+)
- **TN Board**: Mathematics, Physics, Chemistry, Biology, Computer Science, Tamil, English, Social Science
- **TNPSC**: Group I, Group II, Group IV, VAO, TET
- **Engineering**: CSE, IT, Electrical, Mechanical, Civil, Electronics
- **IT Placement**: Aptitude, Programming, GenAI & Prompting, System Design, Database, Soft Skills

### Courses (15+)
Comprehensive courses covering:

#### TN State Board Courses
- Class 9: Mathematics, Tamil Literature
- Class 10: Mathematics, Physics
- Class 12: Physics, Chemistry

#### TNPSC Courses
- Group I Prelims Complete Course
- Group II Complete Preparation
- VAO Complete Course

#### Engineering Courses
- Data Structures & Algorithms in C++
- Database Management Systems
- Electrical Circuits and Networks

#### IT Placement Courses
- Quantitative Aptitude Mastery
- JavaScript Complete Course
- System Design Fundamentals
- Prompt Engineering & GenAI Fundamentals
- Soft Skills for IT Professionals

## Course Structure

Each course includes:
- **Detailed descriptions** and learning objectives
- **Multiple sections** with organized content
- **Mixed content types**: PDFs, Videos, Tests
- **Realistic metadata**: enrollment counts, ratings, tags
- **Tamil Nadu specific content** where applicable

## Sample Data Features

- **Realistic enrollment counts** (1,000 - 7,000+ students)
- **High-quality ratings** (4.6 - 4.9 stars)
- **Comprehensive tags** for better searchability
- **Tamil language content** for local relevance
- **Progressive difficulty levels** across all categories

## Database Schema

### Categories
- Name, slug, type, icon, description, sort order

### Subjects
- Name, slug, description, category reference, sort order

### Courses
- Title, slug, description, category/subject references
- Level (9, 10, 11, 12, TNPSC, ENGG, PLACEMENT)
- Thumbnail, rating, enrollment count, tags
- Sections with items (PDF, VIDEO, TEST)
- Publication status and timestamps

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```
   Error: connect ECONNREFUSED 127.0.0.1:27017
   ```
   - Ensure MongoDB is running: `mongod`
   - Check your MONGODB_URI in backend/.env

2. **Permission Denied**
   ```
   Error: EACCES: permission denied
   ```
   - Make sure you have write permissions to the database
   - Check MongoDB user permissions

3. **Module Not Found**
   ```
   Error: Cannot find module 'mongoose'
   ```
   - Run `npm run install:all` to install all dependencies

### Reset Database
To clear and reseed the database:
```bash
# The seed script automatically clears existing data
npm run seed
```

## Customization

You can modify the seed data by editing:
- `backend/scripts/seedDatabase.js` - Main seed script
- Add your own courses, subjects, or categories
- Modify enrollment counts, ratings, or content structure

## Production Considerations

- **Never run seed scripts in production** without careful review
- **Backup your database** before seeding
- **Customize content** to match your specific requirements
- **Review and update** sample data regularly

## Support

If you encounter issues:
1. Check the console output for specific error messages
2. Verify MongoDB is running and accessible
3. Ensure all environment variables are set correctly
4. Check the project's GitHub issues for common solutions

---

**Happy Learning! 🎓**
