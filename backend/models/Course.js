const mongoose = require('mongoose');

const courseSectionItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['PDF', 'VIDEO', 'TEST']
  },
  title: {
    type: String,
    required: true
  },
  refId: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    default: null
  }
}, { _id: true });

const courseSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  items: [courseSectionItemSchema]
}, { _id: true });

const courseSchema = new mongoose.Schema({
  title: {
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
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    default: null
  },
  level: {
    type: String,
    required: true,
    enum: ['9', '10', '11', '12', 'TNPSC', 'ENGG', 'PLACEMENT']
  },
  thumbnailUrl: {
    type: String,
    default: null
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  enrollmentCount: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  sections: [courseSectionSchema],
  isPublished: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  // ✅ NEW FIELDS (for downloadable & video resources)
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
courseSchema.index({ categoryId: 1 });
courseSchema.index({ subjectId: 1 });
courseSchema.index({ level: 1 });
courseSchema.index({ isPublished: 1 });
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Course', courseSchema);
