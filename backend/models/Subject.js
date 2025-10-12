const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
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
  description: {
    type: String,
    default: null
  },
  sortOrder: {
    type: Number,
    default: 0
  },

  // ✅ NEW RESOURCE FIELDS
  pdfUrl: {
    type: String,
    default: null
  },
  prevYearPdf: {
    type: String,
    default: null
  },
  videoUrl: {
    type: String,
    default: null
  }

}, {
  timestamps: true
});

// Index for better query performance
subjectSchema.index({ categoryId: 1 });
subjectSchema.index({ sortOrder: 1 });

module.exports = mongoose.model('Subject', subjectSchema);
