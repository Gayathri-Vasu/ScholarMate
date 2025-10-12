const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET /api/v1/courses - Get all courses with filtering and search
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      category, 
      subject, 
      level, 
      page = 1, 
      limit = 100,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;
    
    // Build filter object
    let filter = { isPublished: true };
    
    if (category && category !== 'all') {
      const Category = require('../models/Category');
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        filter.categoryId = categoryDoc._id;
      }
    }
    
    if (subject && subject !== 'all') {
      filter.subjectId = subject;
    }
    
    if (level && level !== 'all') {
      filter.level = level;
    }
    
    // Text search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const courses = await Course.find(filter)
      .populate('categoryId', 'name slug type icon')
      .populate('subjectId', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');
    
    const total = await Course.countDocuments(filter);
    
    res.json({
      success: true,
      data: courses,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/v1/courses/featured - Get featured courses
router.get('/featured', async (req, res) => {
  try {
    const { limit = 3 } = req.query;
    
    const courses = await Course.find({ isPublished: true })
      .populate('categoryId', 'name slug type icon')
      .populate('subjectId', 'name slug')
      .sort({ enrollmentCount: -1, rating: -1 })
      .limit(parseInt(limit))
      .select('-__v');
    
    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    console.error('Error fetching featured courses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured courses',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/v1/courses/:slug - Get course by slug
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ 
      slug: req.params.slug,
      isPublished: true 
    })
      .populate('categoryId', 'name slug type icon')
      .populate('subjectId', 'name slug')
      .select('-__v');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/v1/courses - Create new course (Admin only)
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    
    await course.populate('categoryId', 'name slug type icon');
    await course.populate('subjectId', 'name slug');
    
    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create course',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Bad request'
    });
  }
});

// PUT /api/v1/courses/:id - Update course (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('categoryId', 'name slug type icon')
      .populate('subjectId', 'name slug')
      .select('-__v');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course,
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update course',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Bad request'
    });
  }
});

// DELETE /api/v1/courses/:id - Delete course (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete course',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
