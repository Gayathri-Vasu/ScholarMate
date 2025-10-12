const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  type: {
    type: String,
    required: true,
    enum: ['TNBOARD', 'TNPSC', 'ENGINEERING', 'PLACEMENT', 'CBSE', 'NEET']
  },
  icon: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  sortOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
// Note: slug already has unique: true which creates an index
categorySchema.index({ type: 1 });
categorySchema.index({ sortOrder: 1 });

module.exports = mongoose.model('Category', categorySchema);
