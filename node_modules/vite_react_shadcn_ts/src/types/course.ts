export interface Category {
  id: string;
  name: string;
  slug: string;
  type: 'TNBOARD' | 'TNPSC' | 'ENGINEERING' | 'PLACEMENT' | 'CBSE';
  order: number;
  icon?: string;
  description?: string;
}

export interface Subject {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  categoryId: string;
  subjectId?: string;
  tags: string[];
  level: string; // Changed to string to match database enum
  sections: CourseSection[];
  thumbnailUrl?: string;
  isPublished: boolean;
  enrollmentCount?: number;
  rating?: number;
  createdAt: string;
  updatedAt: string;

  // 👇 Add these for downloadable/video resources
  pdfUrl?: string;        // For Complete Notes PDF
  prevYearPdf?: string;   // For Previous Year Questions
  videoUrl?: string;      // For Lecture Video
}


export interface CourseSection {
  id: string;
  title: string;
  order: number;
  items: CourseSectionItem[];
}

export interface CourseSectionItem {
  id: string;
  type: 'PDF' | 'VIDEO' | 'TEST';
  title: string;
  refId: string;
  duration?: string;
}

export interface PdfAsset {
  id: string;
  courseId: string;
  title: string;
  filePath: string;
  originalName: string;
  size: number;
  pages?: number;
}

export interface VideoAsset {
  id: string;
  courseId: string;
  title: string;
  filePath?: string;
  videoUrl?: string;
  durationSec?: number;
  thumbnail?: string;
}

export interface Test {
  id: string;
  courseId: string;
  title: string;
  questions: TestQuestion[];
  durationMin: number;
  totalMarks: number;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
  marks?: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: Record<string, number>;
  completedLessons: string[];
  testScores: Record<string, number>;
  createdAt: string;
}