const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// GET /api/v1/subjects - Get all subjects with optional category filter
router.get('/', async (req, res) => {
  try {
    const { categoryId, categorySlug } = req.query;
    let filter = {};
    
    if (categoryId) {
      filter.categoryId = categoryId;
    } else if (categorySlug) {
      // If categorySlug is provided, we need to find the category first
      const Category = require('../models/Category');
      const category = await Category.findOne({ slug: categorySlug });
      if (category) {
        filter.categoryId = category._id;
      } else {
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
    }
    
    const subjects = await Subject.find(filter)
      .populate('categoryId', 'name slug type')
      .sort({ sortOrder: 1, name: 1 })
      .select('-__v');
    
    res.json({
      success: true,
      data: subjects,
      count: subjects.length
    });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subjects',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET /api/v1/subjects/:slug - Get subject by slug
router.get('/:slug', async (req, res) => {
  try {
    const subject = await Subject.findOne({ slug: req.params.slug })
      .populate('categoryId', 'name slug type')
      .select('-__v');
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    res.json({
      success: true,
      data: subject
    });
  } catch (error) {
    console.error('Error fetching subject:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subject',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST /api/v1/subjects - Create new subject (Admin only)
router.post('/', async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    
    await subject.populate('categoryId', 'name slug type');
    
    res.status(201).json({
      success: true,
      data: subject,
      message: 'Subject created successfully'
    });
  } catch (error) {
    console.error('Error creating subject:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to create subject',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Bad request'
    });
  }
});

// PUT /api/v1/subjects/:id - Update subject (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('categoryId', 'name slug type').select('-__v');
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    res.json({
      success: true,
      data: subject,
      message: 'Subject updated successfully'
    });
  } catch (error) {
    console.error('Error updating subject:', error);
    res.status(400).json({
      success: false,
      message: 'Failed to update subject',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Bad request'
    });
  }
});

// DELETE /api/v1/subjects/:id - Delete subject (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Subject deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting subject:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete subject',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = router;
