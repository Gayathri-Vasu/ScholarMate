import { Category, Course, Subject } from '@/types/course';

export const categories: Category[] = [
  {
    id: '1',
    name: 'TN State Board',
    slug: 'tnboard',
    type: 'TNBOARD',
    order: 1,
    icon: '📚',
    description: 'Tamil Nadu State Board curriculum for classes 9-12'
  },
  {
    id: '2',
    name: 'TNPSC',
    slug: 'tnpsc',
    type: 'TNPSC',
    order: 2,
    icon: '🎓',
    description: 'Tamil Nadu Public Service Commission exam preparation'
  },
  {
    id: '3',
    name: 'Engineering',
    slug: 'engineering',
    type: 'ENGINEERING',
    order: 3,
    icon: '⚙️',
    description: 'All engineering branches study materials'
  },
  {
    id: '4',
    name: 'IT Placement',
    slug: 'placement',
    type: 'PLACEMENT',
    order: 4,
    icon: '💼',
    description: 'IT placement preparation with aptitude and programming'
  }
];

export const subjects: Subject[] = [
  { id: '1', categoryId: '1', name: 'Mathematics', slug: 'mathematics', order: 1 },
  { id: '2', categoryId: '1', name: 'Physics', slug: 'physics', order: 2 },
  { id: '3', categoryId: '1', name: 'Chemistry', slug: 'chemistry', order: 3 },
  { id: '4', categoryId: '1', name: 'Biology', slug: 'biology', order: 4 },
  { id: '5', categoryId: '1', name: 'Computer Science', slug: 'computer-science', order: 5 },
  { id: '6', categoryId: '2', name: 'Group I', slug: 'group-1', order: 1 },
  { id: '7', categoryId: '2', name: 'Group II', slug: 'group-2', order: 2 },
  { id: '8', categoryId: '2', name: 'Group IV', slug: 'group-4', order: 3 },
  { id: '9', categoryId: '3', name: 'Computer Science', slug: 'cse', order: 1 },
  { id: '10', categoryId: '3', name: 'Electrical', slug: 'electrical', order: 2 },
  { id: '11', categoryId: '3', name: 'Mechanical', slug: 'mechanical', order: 3 },
  { id: '12', categoryId: '4', name: 'Aptitude', slug: 'aptitude', order: 1 },
  { id: '13', categoryId: '4', name: 'Programming', slug: 'programming', order: 2 },
  { id: '14', categoryId: '4', name: 'GenAI & Prompting', slug: 'genai', order: 3 },
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'TN 10th Mathematics - Algebra Basics',
    slug: 'tn-10-maths-algebra-basics',
    description: 'Master algebraic concepts with comprehensive lessons aligned to TN State Board 10th standard syllabus. Includes solved examples and practice problems.',
    categoryId: '1',
    subjectId: '1',
    tags: ['algebra', 'tnboard', 'class10', 'mathematics'],
    level: '10',
    sections: [
      {
        id: 's1',
        title: 'Chapter 1: Sets',
        order: 1,
        items: [
          { id: 'i1', type: 'PDF', title: 'Sets Theory Notes', refId: 'pdf1' },
          { id: 'i2', type: 'VIDEO', title: 'Introduction to Sets', refId: 'vid1', duration: '15:30' },
          { id: 'i3', type: 'TEST', title: 'Sets Practice Test', refId: 'test1' }
        ]
      },
      {
        id: 's2',
        title: 'Chapter 2: Functions',
        order: 2,
        items: [
          { id: 'i4', type: 'PDF', title: 'Functions Complete Guide', refId: 'pdf2' },
          { id: 'i5', type: 'VIDEO', title: 'Understanding Functions', refId: 'vid2', duration: '20:45' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-10-maths-algebra.svg',
    isPublished: true,
    enrollmentCount: 1250,
    rating: 4.8,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    title: 'TN 12th Physics - Electrostatics',
    slug: 'tn-12-physics-electrostatics',
    description: 'Complete coverage of electrostatics chapter for TN 12th standard. Includes derivations, numerical problems, and previous year questions.',
    categoryId: '1',
    subjectId: '2',
    tags: ['physics', 'electrostatics', 'class12', 'tnboard'],
    level: '12',
    sections: [
      {
        id: 's3',
        title: 'Electric Charges and Fields',
        order: 1,
        items: [
          { id: 'i6', type: 'PDF', title: 'Coulomb\'s Law Notes', refId: 'pdf3' },
          { id: 'i7', type: 'VIDEO', title: 'Electric Field Concepts', refId: 'vid3', duration: '25:00' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tn-12-physics-electrostatics.svg',
    isPublished: true,
    enrollmentCount: 890,
    rating: 4.7,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    title: 'TNPSC Group-I Prelims Complete Course',
    slug: 'tnpsc-group-1-prelims',
    description: 'Comprehensive preparation for TNPSC Group-I preliminary exam covering all subjects with current affairs and previous papers.',
    categoryId: '2',
    subjectId: '6',
    tags: ['tnpsc', 'group1', 'prelims', 'competitive'],
    level: 'TNPSC',
    sections: [
      {
        id: 's4',
        title: 'General Studies',
        order: 1,
        items: [
          { id: 'i8', type: 'PDF', title: 'Indian History Notes', refId: 'pdf4' },
          { id: 'i9', type: 'PDF', title: 'Geography of Tamil Nadu', refId: 'pdf5' },
          { id: 'i10', type: 'VIDEO', title: 'Indian Polity Overview', refId: 'vid4', duration: '45:00' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/tnpsc-group-1-prelims.svg',
    isPublished: true,
    enrollmentCount: 3450,
    rating: 4.9,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-25'
  },
  {
    id: '4',
    title: 'Data Structures & Algorithms in C++',
    slug: 'dsa-cpp-complete',
    description: 'Master DSA concepts for placement preparation. Covers arrays, linked lists, trees, graphs with implementation in C++.',
    categoryId: '4',
    subjectId: '13',
    tags: ['dsa', 'cpp', 'placement', 'programming'],
    level: 'PLACEMENT',
    sections: [
      {
        id: 's5',
        title: 'Arrays and Strings',
        order: 1,
        items: [
          { id: 'i11', type: 'PDF', title: 'Array Problems & Solutions', refId: 'pdf6' },
          { id: 'i12', type: 'VIDEO', title: 'Two Pointer Technique', refId: 'vid5', duration: '18:30' },
          { id: 'i13', type: 'TEST', title: 'Arrays Practice Test', refId: 'test2' }
        ]
      },
      {
        id: 's6',
        title: 'Linked Lists',
        order: 2,
        items: [
          { id: 'i14', type: 'PDF', title: 'Linked List Operations', refId: 'pdf7' },
          { id: 'i15', type: 'VIDEO', title: 'Reversing Linked Lists', refId: 'vid6', duration: '22:15' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/dsa-cpp-complete.svg',
    isPublished: true,
    enrollmentCount: 5670,
    rating: 4.9,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-22'
  },
  {
    id: '5',
    title: 'Quantitative Aptitude Mastery',
    slug: 'aptitude-complete-course',
    description: 'Complete aptitude preparation covering percentages, profit-loss, time-work, probability for placement exams.',
    categoryId: '4',
    subjectId: '12',
    tags: ['aptitude', 'placement', 'quant', 'logical'],
    level: 'PLACEMENT',
    sections: [
      {
        id: 's7',
        title: 'Number System',
        order: 1,
        items: [
          { id: 'i16', type: 'PDF', title: 'Number Theory Basics', refId: 'pdf8' },
          { id: 'i17', type: 'VIDEO', title: 'HCF & LCM Tricks', refId: 'vid7', duration: '12:45' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/aptitude-complete-course.svg',
    isPublished: true,
    enrollmentCount: 4320,
    rating: 4.8,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-20'
  },
  {
    id: '6',
    title: 'Prompt Engineering & GenAI Fundamentals',
    slug: 'genai-prompt-engineering',
    description: 'Learn the art of prompt engineering for ChatGPT, Claude, and other AI models. Includes practical exercises and real-world applications.',
    categoryId: '4',
    subjectId: '14',
    tags: ['genai', 'prompting', 'ai', 'chatgpt', 'placement'],
    level: 'PLACEMENT',
    sections: [
      {
        id: 's8',
        title: 'Introduction to GenAI',
        order: 1,
        items: [
          { id: 'i18', type: 'PDF', title: 'Understanding LLMs', refId: 'pdf9' },
          { id: 'i19', type: 'VIDEO', title: 'ChatGPT Best Practices', refId: 'vid8', duration: '28:00' }
        ]
      },
      {
        id: 's9',
        title: 'Advanced Prompting',
        order: 2,
        items: [
          { id: 'i20', type: 'PDF', title: 'Chain of Thought Prompting', refId: 'pdf10' },
          { id: 'i21', type: 'TEST', title: 'Prompting Skills Test', refId: 'test3' }
        ]
      }
    ],
    thumbnailUrl: '/course-thumbnails/genai-prompt-engineering.svg',
    isPublished: true,
    enrollmentCount: 2890,
    rating: 4.9,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-26'
  }
];