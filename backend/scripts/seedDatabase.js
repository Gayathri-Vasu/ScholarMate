const mongoose = require('mongoose');
require('dotenv').config({ path: '../../.env' });

// Import models
const Category = require('../models/Category');
const Subject = require('../models/Subject');
const Course = require('../models/Course');

// Sample data
const categoriesData = [
  {
    name: 'TN State Board',
    slug: 'tnboard',
    type: 'TNBOARD',
    icon: '📚',
    description: 'Tamil Nadu State Board curriculum for classes 9-12',
    sortOrder: 1
  },
  {
    name: 'TNPSC',
    slug: 'tnpsc',
    type: 'TNPSC',
    icon: '🎓',
    description: 'Tamil Nadu Public Service Commission exam preparation',
    sortOrder: 2
  },
  {
    name: 'Engineering',
    slug: 'engineering',
    type: 'ENGINEERING',
    icon: '⚙️',
    description: 'All engineering branches study materials',
    sortOrder: 3
  },
  {
    name: 'IT Placement',
    slug: 'placement',
    type: 'PLACEMENT',
    icon: '💼',
    description: 'IT placement preparation with aptitude and programming',
    sortOrder: 4
  },
  {
    name: 'CBSE Syllabus',
    slug: 'cbse',
    type: 'CBSE',
    icon: '📖',
    description: 'Central Board of Secondary Education materials for classes 9–12',
    sortOrder: 6
  },
  {
    name: 'NEET Syllabus',
    slug: 'NEET',
    type: 'NEET',
    icon: '📖',
    description: 'Central Board of Secondary Education materials for classes 9–12',
    sortOrder: 7
  }
];

const subjectsData = [
  // TN State Board subjects
  { categorySlug: 'tnboard', name: 'Mathematics', slug: 'mathematics', description: 'Core mathematical concepts and problem solving', sortOrder: 1 },
  { categorySlug: 'tnboard', name: 'Physics', slug: 'physics', description: 'Understanding physical phenomena and laws', sortOrder: 2 },
  { categorySlug: 'tnboard', name: 'Chemistry', slug: 'chemistry', description: 'Chemical reactions and molecular structures', sortOrder: 3 },
  { categorySlug: 'tnboard', name: 'Biology', slug: 'biology', description: 'Life sciences and living organisms', sortOrder: 4 },
  { categorySlug: 'tnboard', name: 'Computer Science', slug: 'computer-science', description: 'Programming and computational thinking', sortOrder: 5 },
  { categorySlug: 'tnboard', name: 'Tamil', slug: 'tamil', description: 'Tamil language and literature', sortOrder: 6 },
  { categorySlug: 'tnboard', name: 'English', slug: 'english', description: 'English language and communication', sortOrder: 7 },
  { categorySlug: 'tnboard', name: 'Social Science', slug: 'social-science', description: 'History, Geography, Civics and Economics', sortOrder: 8 },
  
  // TNPSC subjects
  { categorySlug: 'tnpsc', name: 'Group I', slug: 'group-1', description: 'TNPSC Group I examination preparation', sortOrder: 1 },
  { categorySlug: 'tnpsc', name: 'Group II', slug: 'group-2', description: 'TNPSC Group II examination preparation', sortOrder: 2 },
  { categorySlug: 'tnpsc', name: 'Group IV', slug: 'group-4', description: 'TNPSC Group IV examination preparation', sortOrder: 3 },
  { categorySlug: 'tnpsc', name: 'VAO', slug: 'vao', description: 'Village Administrative Officer preparation', sortOrder: 4 },
  { categorySlug: 'tnpsc', name: 'TET', slug: 'tet', description: 'Teacher Eligibility Test preparation', sortOrder: 5 },
  
  // Engineering subjects
  { categorySlug: 'engineering', name: 'Computer Science', slug: 'cse', description: 'Computer Science Engineering', sortOrder: 1 },
  { categorySlug: 'engineering', name: 'Information Technology', slug: 'it', description: 'Information Technology Engineering', sortOrder: 2 },
  { categorySlug: 'engineering', name: 'Electrical', slug: 'electrical', description: 'Electrical Engineering', sortOrder: 3 },
  { categorySlug: 'engineering', name: 'Mechanical', slug: 'mechanical', description: 'Mechanical Engineering', sortOrder: 4 },
  { categorySlug: 'engineering', name: 'Civil', slug: 'civil', description: 'Civil Engineering', sortOrder: 5 },
  { categorySlug: 'engineering', name: 'Electronics', slug: 'electronics', description: 'Electronics and Communication Engineering', sortOrder: 6 },
  
  // IT Placement subjects
  { categorySlug: 'placement', name: 'Aptitude', slug: 'aptitude', description: 'Quantitative and logical aptitude', sortOrder: 1 },
  { categorySlug: 'placement', name: 'Programming', slug: 'programming', description: 'Programming languages and concepts', sortOrder: 2 },
  { categorySlug: 'placement', name: 'GenAI & Prompting', slug: 'genai', description: 'Generative AI and prompt engineering', sortOrder: 3 },
  { categorySlug: 'placement', name: 'System Design', slug: 'system-design', description: 'System design and architecture', sortOrder: 4 },
  { categorySlug: 'placement', name: 'Database', slug: 'database', description: 'Database design and management', sortOrder: 5 },
  { categorySlug: 'placement', name: 'Soft Skills', slug: 'soft-skills', description: 'Communication and interpersonal skills', sortOrder: 6 },

  // CBSE subjects
  { categorySlug: 'cbse', name: 'Mathematics', slug: 'cbse-mathematics', description: 'CBSE Mathematics classes 9–12', sortOrder: 1 },
  { categorySlug: 'cbse', name: 'Physics', slug: 'cbse-physics', description: 'CBSE Physics classes 9–12', sortOrder: 2 },
  { categorySlug: 'cbse', name: 'Chemistry', slug: 'cbse-chemistry', description: 'CBSE Chemistry classes 9–12', sortOrder: 3 },
  { categorySlug: 'cbse', name: 'Biology', slug: 'cbse-biology', description: 'CBSE Biology classes 11–12 and Science 9–10', sortOrder: 4 },
  { categorySlug: 'cbse', name: 'English', slug: 'cbse-english', description: 'CBSE English Language & Literature', sortOrder: 5 },
  { categorySlug: 'cbse', name: 'Computer Science', slug: 'cbse-computer-science', description: 'CBSE CS/IP syllabus', sortOrder: 6 },

  // NEET subjects
  { categorySlug: 'cbse', name: 'Mathematics', slug: 'cbse-mathematics', description: 'CBSE Mathematics classes 9–12', sortOrder: 1 },
  { categorySlug: 'cbse', name: 'Physics', slug: 'cbse-physics', description: 'CBSE Physics classes 9–12', sortOrder: 2 },
  { categorySlug: 'cbse', name: 'Chemistry', slug: 'cbse-chemistry', description: 'CBSE Chemistry classes 9–12', sortOrder: 3 },
  { categorySlug: 'cbse', name: 'Biology', slug: 'cbse-biology', description: 'CBSE Biology classes 11–12 and Science 9–10', sortOrder: 4 },
  { categorySlug: 'cbse', name: 'English', slug: 'cbse-english', description: 'CBSE English Language & Literature', sortOrder: 5 },
  { categorySlug: 'cbse', name: 'Computer Science', slug: 'cbse-computer-science', description: 'CBSE CS/IP syllabus', sortOrder: 6 }
];

const coursesData = [
  // TN State Board - Class 9 Courses
  {
    title: 'TN 9th Mathematics - Number System & Algebra',
    slug: 'tn-9-maths-number-system-algebra',
    description: 'Complete coverage of number systems, real numbers, and basic algebraic concepts for TN 9th standard students.',
    categorySlug: 'tnboard',
    subjectSlug: 'mathematics',
    level: '9',
    tags: ['mathematics', 'class9', 'tnboard', 'numbers', 'algebra'],
    sections: [
      {
        title: 'Real Numbers',
        order: 1,
        items: [
          { type: 'PDF', title: 'Real Numbers Theory', refId: 'pdf_9math_1' },
          { type: 'VIDEO', title: 'Understanding Real Numbers', refId: 'vid_9math_1', duration: '18:30' },
          { type: 'TEST', title: 'Real Numbers Quiz', refId: 'test_9math_1' }
        ]
      },
      {
        title: 'Polynomials',
        order: 2,
        items: [
          { type: 'PDF', title: 'Polynomials Complete Guide', refId: 'pdf_9math_2' },
          { type: 'VIDEO', title: 'Polynomial Operations', refId: 'vid_9math_2', duration: '22:15' }
        ]
      }
    ],
    thumbnailUrl: '/D:\tamilnadu-learn-spark-main\frontend\public\course-thumbnails\OIP.jpg',
    isPublished: true,
    enrollmentCount: 2150,
    rating: 4.7
  },
  {
    title: 'TN 9th Tamil - இலக்கியம் மற்றும் இலக்கணம்',
    slug: 'tn-9-tamil-literature-grammar',
    description: 'தமிழ் இலக்கியம், இலக்கணம் மற்றும் கவிதை பகுப்பாய்வு - 9ம் வகுப்பு மாணவர்களுக்கு',
    categorySlug: 'tnboard',
    subjectSlug: 'tamil',
    level: '9',
    tags: ['tamil', 'class9', 'tnboard', 'literature', 'grammar'],
    sections: [
      {
        title: 'தமிழ் இலக்கிய வரலாறு',
        order: 1,
        items: [
          { type: 'PDF', title: 'சங்க இலக்கியம்', refId: 'pdf_9tamil_1' },
          { type: 'VIDEO', title: 'தமிழ் இலக்கிய வளர்ச்சி', refId: 'vid_9tamil_1', duration: '25:00' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 1890,
    rating: 4.6
  },

  // TN State Board - Class 10 Courses
  {
    title: 'TN 10th Mathematics - Algebra & Geometry',
    slug: 'tn-10-maths-algebra-geometry',
    description: 'Master algebraic concepts and geometry with comprehensive lessons aligned to TN State Board 10th standard syllabus.',
    categorySlug: 'tnboard',
    subjectSlug: 'mathematics',
    level: '10',
    tags: ['mathematics', 'class10', 'tnboard', 'algebra', 'geometry'],
    sections: [
      {
        title: 'Sets and Functions',
        order: 1,
        items: [
          { type: 'PDF', title: 'Sets Theory Notes', refId: 'pdf_10math_1' },
          { type: 'VIDEO', title: 'Introduction to Sets', refId: 'vid_10math_1', duration: '15:30' },
          { type: 'TEST', title: 'Sets Practice Test', refId: 'test_10math_1' }
        ]
      },
      {
        title: 'Trigonometry',
        order: 2,
        items: [
          { type: 'PDF', title: 'Trigonometry Complete Guide', refId: 'pdf_10math_2' },
          { type: 'VIDEO', title: 'Trigonometric Ratios', refId: 'vid_10math_2', duration: '20:45' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 3250,
    rating: 4.8
  },
  {
    title: 'TN 10th Physics - Light & Sound',
    slug: 'tn-10-physics-light-sound',
    description: 'Complete understanding of light and sound phenomena with practical examples and numerical problems.',
    categorySlug: 'tnboard',
    subjectSlug: 'physics',
    level: '10',
    tags: ['physics', 'class10', 'tnboard', 'light', 'sound'],
    sections: [
      {
        title: 'Light - Reflection and Refraction',
        order: 1,
        items: [
          { type: 'PDF', title: 'Light Laws and Principles', refId: 'pdf_10phy_1' },
          { type: 'VIDEO', title: 'Mirror and Lens Problems', refId: 'vid_10phy_1', duration: '28:00' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 2780,
    rating: 4.7
  },

  // TN State Board - Class 12 Courses
  {
    title: 'TN 12th Physics - Electrostatics & Magnetism',
    slug: 'tn-12-physics-electrostatics-magnetism',
    description: 'Complete coverage of electrostatics and magnetism for TN 12th standard with derivations and numerical problems.',
    categorySlug: 'tnboard',
    subjectSlug: 'physics',
    level: '12',
    tags: ['physics', 'class12', 'tnboard', 'electrostatics', 'magnetism'],
    sections: [
      {
        title: 'Electric Charges and Fields',
        order: 1,
        items: [
          { type: 'PDF', title: 'Coulomb\'s Law and Electric Field', refId: 'pdf_12phy_1' },
          { type: 'VIDEO', title: 'Electric Field Concepts', refId: 'vid_12phy_1', duration: '25:00' },
          { type: 'TEST', title: 'Electrostatics Test', refId: 'test_12phy_1' }
        ]
      },
      {
        title: 'Magnetic Effects of Current',
        order: 2,
        items: [
          { type: 'PDF', title: 'Magnetism Theory', refId: 'pdf_12phy_2' },
          { type: 'VIDEO', title: 'Magnetic Field Problems', refId: 'vid_12phy_2', duration: '30:15' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-12-physics-electrostatics.svg',
    isPublished: true,
    enrollmentCount: 1890,
    rating: 4.7
  },
  {
    title: 'TN 12th Chemistry - Organic Chemistry',
    slug: 'tn-12-chemistry-organic',
    description: 'Master organic chemistry reactions, mechanisms, and synthesis for TN 12th standard students.',
    categorySlug: 'tnboard',
    subjectSlug: 'chemistry',
    level: '12',
    tags: ['chemistry', 'class12', 'tnboard', 'organic', 'reactions'],
    sections: [
      {
        title: 'Hydrocarbons',
        order: 1,
        items: [
          { type: 'PDF', title: 'Alkanes, Alkenes, Alkynes', refId: 'pdf_12chem_1' },
          { type: 'VIDEO', title: 'Hydrocarbon Reactions', refId: 'vid_12chem_1', duration: '35:20' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 1650,
    rating: 4.6
  },

  // TNPSC Courses
  {
    title: 'TNPSC Group-I Prelims Complete Course',
    slug: 'tnpsc-group-1-prelims-complete',
    description: 'Comprehensive preparation for TNPSC Group-I preliminary exam covering all subjects with current affairs and previous papers.',
    categorySlug: 'tnpsc',
    subjectSlug: 'group-1',
    level: 'TNPSC',
    tags: ['tnpsc', 'group1', 'prelims', 'competitive', 'tamilnadu'],
    sections: [
      {
        title: 'General Studies',
        order: 1,
        items: [
          { type: 'PDF', title: 'Indian History Complete Notes', refId: 'pdf_tnpsc_1' },
          { type: 'PDF', title: 'Geography of Tamil Nadu', refId: 'pdf_tnpsc_2' },
          { type: 'VIDEO', title: 'Indian Polity Overview', refId: 'vid_tnpsc_1', duration: '45:00' },
          { type: 'TEST', title: 'General Studies Mock Test', refId: 'test_tnpsc_1' }
        ]
      },
      {
        title: 'Current Affairs',
        order: 2,
        items: [
          { type: 'PDF', title: 'Monthly Current Affairs', refId: 'pdf_tnpsc_3' },
          { type: 'VIDEO', title: 'Tamil Nadu Current Affairs', refId: 'vid_tnpsc_2', duration: '30:00' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tnpsc-group-1-prelims.svg',
    isPublished: true,
    enrollmentCount: 5450,
    rating: 4.9
  },
  {
    title: 'TNPSC Group-II Complete Preparation',
    slug: 'tnpsc-group-2-complete',
    description: 'Complete preparation for TNPSC Group-II examination with detailed study materials and practice tests.',
    categorySlug: 'tnpsc',
    subjectSlug: 'group-2',
    level: 'TNPSC',
    tags: ['tnpsc', 'group2', 'competitive', 'tamilnadu'],
    sections: [
      {
        title: 'General English',
        order: 1,
        items: [
          { type: 'PDF', title: 'Grammar and Vocabulary', refId: 'pdf_tnpsc_4' },
          { type: 'VIDEO', title: 'English Comprehension', refId: 'vid_tnpsc_3', duration: '40:00' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 4200,
    rating: 4.8
  },
  {
    title: 'TNPSC VAO Complete Course',
    slug: 'tnpsc-vao-complete',
    description: 'Village Administrative Officer preparation with focus on rural development and administration.',
    categorySlug: 'tnpsc',
    subjectSlug: 'vao',
    level: 'TNPSC',
    tags: ['tnpsc', 'vao', 'village', 'administration'],
    sections: [
      {
        title: 'Rural Development',
        order: 1,
        items: [
          { type: 'PDF', title: 'Rural Development Schemes', refId: 'pdf_tnpsc_5' },
          { type: 'VIDEO', title: 'Panchayat System', refId: 'vid_tnpsc_4', duration: '25:30' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 3200,
    rating: 4.7
  },

  // Engineering Courses
  {
    title: 'Data Structures & Algorithms in C++',
    slug: 'dsa-cpp-complete-course',
    description: 'Master DSA concepts for placement preparation. Covers arrays, linked lists, trees, graphs with implementation in C++.',
    categorySlug: 'engineering',
    subjectSlug: 'cse',
    level: 'ENGG',
    tags: ['dsa', 'cpp', 'engineering', 'programming', 'placement'],
    sections: [
      {
        title: 'Arrays and Strings',
        order: 1,
        items: [
          { type: 'PDF', title: 'Array Problems & Solutions', refId: 'pdf_dsa_1' },
          { type: 'VIDEO', title: 'Two Pointer Technique', refId: 'vid_dsa_1', duration: '18:30' },
          { type: 'TEST', title: 'Arrays Practice Test', refId: 'test_dsa_1' }
        ]
      },
      {
        title: 'Linked Lists',
        order: 2,
        items: [
          { type: 'PDF', title: 'Linked List Operations', refId: 'pdf_dsa_2' },
          { type: 'VIDEO', title: 'Reversing Linked Lists', refId: 'vid_dsa_2', duration: '22:15' }
        ]
      },
      {
        title: 'Trees and Graphs',
        order: 3,
        items: [
          { type: 'PDF', title: 'Tree Traversals', refId: 'pdf_dsa_3' },
          { type: 'VIDEO', title: 'Graph Algorithms', refId: 'vid_dsa_3', duration: '35:00' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/dsa-cpp-complete.svg',
    isPublished: true,
    enrollmentCount: 7670,
    rating: 4.9
  },
  {
    title: 'Database Management Systems',
    slug: 'dbms-complete-course',
    description: 'Complete DBMS course covering SQL, normalization, transactions, and database design principles.',
    categorySlug: 'engineering',
    subjectSlug: 'cse',
    level: 'ENGG',
    tags: ['dbms', 'sql', 'database', 'engineering'],
    sections: [
      {
        title: 'SQL Fundamentals',
        order: 1,
        items: [
          { type: 'PDF', title: 'SQL Complete Reference', refId: 'pdf_dbms_1' },
          { type: 'VIDEO', title: 'SQL Queries and Joins', refId: 'vid_dbms_1', duration: '32:00' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 4200,
    rating: 4.8
  },
  {
    title: 'Electrical Circuits and Networks',
    slug: 'electrical-circuits-networks',
    description: 'Fundamentals of electrical circuits, network analysis, and AC/DC circuit theory for electrical engineering students.',
    categorySlug: 'engineering',
    subjectSlug: 'electrical',
    level: 'ENGG',
    tags: ['electrical', 'circuits', 'networks', 'engineering'],
    sections: [
      {
        title: 'DC Circuit Analysis',
        order: 1,
        items: [
          { type: 'PDF', title: 'Ohm\'s Law and Kirchhoff\'s Laws', refId: 'pdf_elec_1' },
          { type: 'VIDEO', title: 'Circuit Analysis Methods', refId: 'vid_elec_1', duration: '28:45' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 2100,
    rating: 4.6
  },

  // IT Placement Courses
  {
    title: 'Quantitative Aptitude Mastery',
    slug: 'aptitude-complete-course',
    description: 'Complete aptitude preparation covering percentages, profit-loss, time-work, probability for placement exams.',
    categorySlug: 'placement',
    subjectSlug: 'aptitude',
    level: 'PLACEMENT',
    tags: ['aptitude', 'placement', 'quant', 'logical', 'reasoning'],
    sections: [
      {
        title: 'Number System',
        order: 1,
        items: [
          { type: 'PDF', title: 'Number Theory Basics', refId: 'pdf_apt_1' },
          { type: 'VIDEO', title: 'HCF & LCM Tricks', refId: 'vid_apt_1', duration: '12:45' },
          { type: 'TEST', title: 'Number System Test', refId: 'test_apt_1' }
        ]
      },
      {
        title: 'Percentage and Profit-Loss',
        order: 2,
        items: [
          { type: 'PDF', title: 'Percentage Formulas', refId: 'pdf_apt_2' },
          { type: 'VIDEO', title: 'Profit-Loss Shortcuts', refId: 'vid_apt_2', duration: '20:30' }
        ]
      },
      {
        title: 'Time, Speed and Distance',
        order: 3,
        items: [
          { type: 'PDF', title: 'TSD Problems', refId: 'pdf_apt_3' },
          { type: 'VIDEO', title: 'TSD Shortcuts', refId: 'vid_apt_3', duration: '25:15' }
        ]
      }
    ],
    thumbnailUrl: '/D:\tamilnadu-learn-spark-main\frontend\public\course-thumbnails\quantitative aptitude.jpg',
    isPublished: true,
    enrollmentCount: 6320,
    rating: 4.8
  },
  
  // CBSE Courses (sample)
  {
    title: 'CBSE Class 10 Mathematics - Algebra & Trigonometry',
    slug: 'cbse-10-maths-algebra-trigonometry',
    description: 'Aligned to CBSE Class 10 syllabus with chapter-wise notes, videos, and practice tests.',
    categorySlug: 'cbse',
    subjectSlug: 'cbse-mathematics',
    level: '10',
    tags: ['cbse', 'class10', 'mathematics', 'algebra', 'trigonometry'],
    sections: [
      {
        title: 'Polynomials',
        order: 1,
        items: [
          { type: 'PDF', title: 'Polynomials Notes', refId: 'pdf_cbse10math_1' },
          { type: 'VIDEO', title: 'Polynomials Concepts', refId: 'vid_cbse10math_1', duration: '20:00' },
          { type: 'TEST', title: 'Polynomials Practice', refId: 'test_cbse10math_1' }
        ]
      },
      {
        title: 'Introduction to Trigonometry',
        order: 2,
        items: [
          { type: 'PDF', title: 'Trig Identities Sheet', refId: 'pdf_cbse10math_2' },
          { type: 'VIDEO', title: 'Basics of Trigonometry', refId: 'vid_cbse10math_2', duration: '24:30' }
        ]
      }
    ],
    thumbnailUrl: '/frontend\public\course-thumbnails\quantitative aptitude.svg',
    isPublished: true,
    enrollmentCount: 2400,
    rating: 4.7
  },
  {
    title: 'CBSE Class 12 Physics - Electrostatics & Current Electricity',
    slug: 'cbse-12-physics-electrostatics-current',
    description: 'NCERT-aligned coverage with derivations, numericals, and PYQ style questions.',
    categorySlug: 'cbse',
    subjectSlug: 'cbse-physics',
    level: '12',
    tags: ['cbse', 'class12', 'physics', 'electrostatics', 'current-electricity'],
    sections: [
      {
        title: 'Electrostatics',
        order: 1,
        items: [
          { type: 'PDF', title: 'Coulomb’s Law & E-Field', refId: 'pdf_cbse12phy_1' },
          { type: 'VIDEO', title: 'Electrostatics Numericals', refId: 'vid_cbse12phy_1', duration: '26:15' },
          { type: 'TEST', title: 'Electrostatics Quiz', refId: 'test_cbse12phy_1' }
        ]
      },
      {
        title: 'Current Electricity',
        order: 2,
        items: [
          { type: 'PDF', title: 'Ohm’s Law & Circuits', refId: 'pdf_cbse12phy_2' },
          { type: 'VIDEO', title: 'Kirchhoff’s Laws Problems', refId: 'vid_cbse12phy_2', duration: '29:40' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 1850,
    rating: 4.8
  },
  {
    title: 'CBSE Class 10 Science - Life Processes',
    slug: 'cbse-10-science-life-processes',
    description: 'Detailed coverage of nutrition, respiration, transport and excretion in plants and animals.',
    categorySlug: 'cbse',
    subjectSlug: 'cbse-biology',
    level: '10',
    tags: ['cbse', 'class10', 'science', 'biology', 'life-processes'],
    sections: [
      {
        title: 'Nutrition & Respiration',
        order: 1,
        items: [
          { type: 'PDF', title: 'Life Processes Notes', refId: 'pdf_cbse10sci_1' },
          { type: 'VIDEO', title: 'Respiration Explained', refId: 'vid_cbse10sci_1', duration: '21:10' },
          { type: 'TEST', title: 'Life Processes MCQ', refId: 'test_cbse10sci_1' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 2600,
    rating: 4.7
  },
  {
    title: 'CBSE Class 9 Mathematics - Number Systems & Polynomials',
    slug: 'cbse-9-maths-number-systems-polynomials',
    description: 'Foundations of number systems and polynomials aligned to CBSE Class 9.',
    categorySlug: 'cbse',
    subjectSlug: 'cbse-mathematics',
    level: '9',
    tags: ['cbse', 'class9', 'mathematics', 'number-systems', 'polynomials'],
    sections: [
      {
        title: 'Number Systems',
        order: 1,
        items: [
          { type: 'PDF', title: 'Rational & Irrational Numbers', refId: 'pdf_cbse9math_1' },
          { type: 'VIDEO', title: 'Real Numbers Explained', refId: 'vid_cbse9math_1', duration: '19:20' },
          { type: 'TEST', title: 'Number Systems Quiz', refId: 'test_cbse9math_1' }
        ]
      },
      {
        title: 'Polynomials',
        order: 2,
        items: [
          { type: 'PDF', title: 'Zeros of a Polynomial', refId: 'pdf_cbse9math_2' },
          { type: 'VIDEO', title: 'Factor Theorem & Applications', refId: 'vid_cbse9math_2', duration: '23:10' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 2100,
    rating: 4.6
  },
  {
    title: 'CBSE Class 9 Science - Motion & Force',
    slug: 'cbse-9-science-motion-force',
    description: 'Kinematics and Newton’s laws with examples and numericals for Class 9.',
    categorySlug: 'cbse',
    subjectSlug: 'cbse-biology',
    level: '9',
    tags: ['cbse', 'class9', 'science', 'physics', 'motion', 'force'],
    sections: [
      {
        title: 'Motion',
        order: 1,
        items: [
          { type: 'PDF', title: 'Distance, Displacement & Velocity', refId: 'pdf_cbse9sci_1' },
          { type: 'VIDEO', title: 'Speed-Time Graphs', refId: 'vid_cbse9sci_1', duration: '18:45' }
        ]
      },
      {
        title: 'Force & Laws of Motion',
        order: 2,
        items: [
          { type: 'PDF', title: 'Newton’s Laws', refId: 'pdf_cbse9sci_2' },
          { type: 'TEST', title: 'Concept Check', refId: 'test_cbse9sci_1' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 1750,
    rating: 4.6
  },
  {
    title: 'CBSE Class 10 English - First Flight & Footprints',
    slug: 'cbse-10-english-first-flight-footprints',
    description: 'Prose and poetry from First Flight with supplementary reader Footprints Without Feet.',
    categorySlug: 'cbse',
    subjectSlug: 'cbse-english',
    level: '10',
    tags: ['cbse', 'class10', 'english', 'literature', 'language'],
    sections: [
      {
        title: 'Prose Selections',
        order: 1,
        items: [
          { type: 'PDF', title: 'Summary & Notes', refId: 'pdf_cbse10eng_1' },
          { type: 'VIDEO', title: 'Theme & Characters', refId: 'vid_cbse10eng_1', duration: '16:30' }
        ]
      },
      {
        title: 'Poetry',
        order: 2,
        items: [
          { type: 'PDF', title: 'Poetic Devices', refId: 'pdf_cbse10eng_2' },
          { type: 'TEST', title: 'Literary Devices MCQ', refId: 'test_cbse10eng_1' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 2300,
    rating: 4.6
  },
  {
    title: 'CBSE Class 11 Chemistry - Organic Chemistry Basics',
    slug: 'cbse-11-chemistry-organic-basics',
    description: 'General organic chemistry concepts: nomenclature, isomerism, and reaction mechanisms.',
    categorySlug: 'cbse',
    subjectSlug: 'cbse-chemistry',
    level: '11',
    tags: ['cbse', 'class11', 'chemistry', 'organic', 'goc'],
    sections: [
      {
        title: 'GOC & Nomenclature',
        order: 1,
        items: [
          { type: 'PDF', title: 'Nomenclature Handbook', refId: 'pdf_cbse11chem_1' },
          { type: 'VIDEO', title: 'Isomerism Overview', refId: 'vid_cbse11chem_1', duration: '27:00' }
        ]
      },
      {
        title: 'Reaction Mechanisms',
        order: 2,
        items: [
          { type: 'PDF', title: 'SN1, SN2, E1, E2', refId: 'pdf_cbse11chem_2' },
          { type: 'TEST', title: 'Mechanisms Quiz', refId: 'test_cbse11chem_1' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 1600,
    rating: 4.7
  },
  {
    title: 'CBSE Class 12 Biology - Reproduction & Genetics',
    slug: 'cbse-12-biology-reproduction-genetics',
    description: 'CBSE Class 12 Biology units on reproduction, genetics, and evolution.',
    categorySlug: 'cbse',
    subjectSlug: 'cbse-biology',
    level: '12',
    tags: ['cbse', 'class12', 'biology', 'reproduction', 'genetics'],
    sections: [
      {
        title: 'Reproduction',
        order: 1,
        items: [
          { type: 'PDF', title: 'Human Reproduction Notes', refId: 'pdf_cbse12bio_1' },
          { type: 'VIDEO', title: 'Reproductive Health', refId: 'vid_cbse12bio_1', duration: '24:10' }
        ]
      },
      {
        title: 'Genetics & Evolution',
        order: 2,
        items: [
          { type: 'PDF', title: 'Mendelian Genetics', refId: 'pdf_cbse12bio_2' },
          { type: 'TEST', title: 'Genetics Practice', refId: 'test_cbse12bio_1' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 1900,
    rating: 4.8
  },
  {
    title: 'CBSE Class 11 Computer Science - Python Programming',
    slug: 'cbse-11-cs-python-programming',
    description: 'Python basics, data handling, and control flow as per CBSE Class 11 CS/IP.',
    categorySlug: 'cbse',
    subjectSlug: 'cbse-computer-science',
    level: '11',
    tags: ['cbse', 'class11', 'computer-science', 'python', 'programming'],
    sections: [
      {
        title: 'Python Basics',
        order: 1,
        items: [
          { type: 'PDF', title: 'Syntax & Data Types', refId: 'pdf_cbse11cs_1' },
          { type: 'VIDEO', title: 'Control Structures', refId: 'vid_cbse11cs_1', duration: '26:40' }
        ]
      },
      {
        title: 'Data Handling',
        order: 2,
        items: [
          { type: 'PDF', title: 'Lists & Dictionaries', refId: 'pdf_cbse11cs_2' },
          { type: 'TEST', title: 'Python Basics Quiz', refId: 'test_cbse11cs_1' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 1550,
    rating: 4.7
  },
  {
    title: 'CBSE Class 12 Mathematics - Calculus & Vectors',
    slug: 'cbse-12-maths-calculus-vectors',
    description: 'Differentiation, integration, and vectors tailored to CBSE Class 12 syllabus.',
    categorySlug: 'cbse',
    subjectSlug: 'cbse-mathematics',
    level: '12',
    tags: ['cbse', 'class12', 'mathematics', 'calculus', 'vectors'],
    sections: [
      {
        title: 'Differentiation & Applications',
        order: 1,
        items: [
          { type: 'PDF', title: 'Derivatives Formula Sheet', refId: 'pdf_cbse12math_1' },
          { type: 'VIDEO', title: 'Maxima & Minima', refId: 'vid_cbse12math_1', duration: '22:55' }
        ]
      },
      {
        title: 'Integration & Vectors',
        order: 2,
        items: [
          { type: 'PDF', title: 'Integration Techniques', refId: 'pdf_cbse12math_2' },
          { type: 'TEST', title: 'Integration Practice', refId: 'test_cbse12math_1' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 2050,
    rating: 4.8
  },
  {
    title: 'JavaScript Complete Course',
    slug: 'javascript-complete-course',
    description: 'Master JavaScript from basics to advanced concepts including ES6+, DOM manipulation, and modern frameworks.',
    categorySlug: 'placement',
    subjectSlug: 'programming',
    level: 'PLACEMENT',
    tags: ['javascript', 'programming', 'placement', 'web', 'frontend'],
    sections: [
      {
        title: 'JavaScript Fundamentals',
        order: 1,
        items: [
          { type: 'PDF', title: 'JS Basics and Syntax', refId: 'pdf_js_1' },
          { type: 'VIDEO', title: 'Variables and Functions', refId: 'vid_js_1', duration: '30:00' }
        ]
      },
      {
        title: 'ES6+ Features',
        order: 2,
        items: [
          { type: 'PDF', title: 'ES6 Complete Guide', refId: 'pdf_js_2' },
          { type: 'VIDEO', title: 'Arrow Functions and Destructuring', refId: 'vid_js_2', duration: '25:45' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 4890,
    rating: 4.7
  },
  {
    title: 'System Design Fundamentals',
    slug: 'system-design-fundamentals',
    description: 'Learn system design principles, scalability patterns, and architecture for large-scale applications.',
    categorySlug: 'placement',
    subjectSlug: 'system-design',
    level: 'PLACEMENT',
    tags: ['system-design', 'architecture', 'scalability', 'placement'],
    sections: [
      {
        title: 'Design Principles',
        order: 1,
        items: [
          { type: 'PDF', title: 'System Design Basics', refId: 'pdf_sd_1' },
          { type: 'VIDEO', title: 'Scalability Patterns', refId: 'vid_sd_1', duration: '40:00' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 3200,
    rating: 4.8
  },
  {
    title: 'Prompt Engineering & GenAI Fundamentals',
    slug: 'genai-prompt-engineering',
    description: 'Learn the art of prompt engineering for ChatGPT, Claude, and other AI models. Includes practical exercises and real-world applications.',
    categorySlug: 'placement',
    subjectSlug: 'genai',
    level: 'PLACEMENT',
    tags: ['genai', 'prompting', 'ai', 'chatgpt', 'placement', 'future'],
    sections: [
      {
        title: 'Introduction to GenAI',
        order: 1,
        items: [
          { type: 'PDF', title: 'Understanding LLMs', refId: 'pdf_genai_1' },
          { type: 'VIDEO', title: 'ChatGPT Best Practices', refId: 'vid_genai_1', duration: '28:00' },
          { type: 'TEST', title: 'GenAI Basics Quiz', refId: 'test_genai_1' }
        ]
      },
      {
        title: 'Advanced Prompting Techniques',
        order: 2,
        items: [
          { type: 'PDF', title: 'Chain of Thought Prompting', refId: 'pdf_genai_2' },
          { type: 'VIDEO', title: 'Few-Shot Learning', refId: 'vid_genai_2', duration: '22:30' }
        ]
      },
      {
        title: 'Real-world Applications',
        order: 3,
        items: [
          { type: 'PDF', title: 'Business Use Cases', refId: 'pdf_genai_3' },
          { type: 'VIDEO', title: 'Code Generation with AI', refId: 'vid_genai_3', duration: '35:15' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/genai-prompt-engineering.svg',
    isPublished: true,
    enrollmentCount: 4890,
    rating: 4.9
  },
  {
    title: 'Soft Skills for IT Professionals',
    slug: 'soft-skills-it-professionals',
    description: 'Develop essential soft skills including communication, teamwork, leadership, and presentation skills for IT career success.',
    categorySlug: 'placement',
    subjectSlug: 'soft-skills',
    level: 'PLACEMENT',
    tags: ['soft-skills', 'communication', 'leadership', 'placement', 'career'],
    sections: [
      {
        title: 'Communication Skills',
        order: 1,
        items: [
          { type: 'PDF', title: 'Effective Communication', refId: 'pdf_soft_1' },
          { type: 'VIDEO', title: 'Presentation Skills', refId: 'vid_soft_1', duration: '25:00' }
        ]
      },
      {
        title: 'Teamwork and Leadership',
        order: 2,
        items: [
          { type: 'PDF', title: 'Team Dynamics', refId: 'pdf_soft_2' },
          { type: 'VIDEO', title: 'Leadership Principles', refId: 'vid_soft_2', duration: '30:45' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 2800,
    rating: 4.6
  },
  {
    title: 'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu',
    slug: 'soft-skills-it-professionals',
    description: ' essential soft skills including communication, teamwork, leadership, and presentation skills for IT career success.',
    categorySlug: 'placement',
    subjectSlug: 'soft-skills',
    level: 'PLACEMENT',
    tags: ['soft-skills', 'communication', 'leadership', 'placement', 'career'],
    sections: [
      {
        title: 'Communication Skills',
        order: 1,
        items: [
          { type: 'PDF', title: 'Effective Communication', refId: 'pdf_soft_1' },
          { type: 'VIDEO', title: 'Presentation Skills', refId: 'vid_soft_1', duration: '25:00' }
        ]
      },
      {
        title: 'Teamwork and Leadership',
        order: 2,
        items: [
          { type: 'PDF', title: 'Team Dynamics', refId: 'pdf_soft_2' },
          { type: 'VIDEO', title: 'Leadership Principles', refId: 'vid_soft_2', duration: '30:45' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 2800,
    rating: 4.6
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tn-learning-hub', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data
    await Category.deleteMany({});
    await Subject.deleteMany({});
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing data');
    
    // Seed categories
    const categories = await Category.insertMany(categoriesData);
    console.log(`✅ Created ${categories.length} categories`);
    
    // Create a map of category slugs to IDs
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });
    
    // Seed subjects
    const subjects = [];
    for (const subjectData of subjectsData) {
      const categoryId = categoryMap[subjectData.categorySlug];
      if (categoryId) {
        const subject = await Subject.create({
          ...subjectData,
          categoryId,
          categorySlug: undefined // Remove this field as it's not part of the schema
        });
        subjects.push(subject);
      }
    }
    console.log(`✅ Created ${subjects.length} subjects`);
    
    // Create a map of subject slugs to IDs
    const subjectMap = {};
    subjects.forEach(subj => {
      subjectMap[subj.slug] = subj._id;
    });
    
    // Seed courses
    const courses = [];
    for (const courseData of coursesData) {
      const categoryId = categoryMap[courseData.categorySlug];
      const subjectId = subjectMap[courseData.subjectSlug];
      
      if (categoryId) {
        const course = await Course.create({
          ...courseData,
          categoryId,
          subjectId,
          categorySlug: undefined, // Remove these fields as they're not part of the schema
          subjectSlug: undefined
        });
        courses.push(course);
      }
    }
    console.log(`✅ Created ${courses.length} courses`);
    
    console.log('🎉 Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📝 Database connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
