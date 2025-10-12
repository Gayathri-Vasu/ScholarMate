import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { Course } from '@/types/course';

interface Filters {
  search?: string;
  category?: string;
  subject?: string;
  level?: string;
}

export function useCourses(filters: Filters = {}) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [filters.search, filters.category, filters.subject, filters.level]);

  async function fetchCourses() {
    try {
      setLoading(true);
      setError(null);

      // Clean filters: remove undefined or empty values
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v != null && v !== '')
      );

      const response = await apiService.getCourses(cleanedFilters);

      console.log('API Response:', response); // Debugging

      if (response.success && Array.isArray(response.data)) {
        const transformedCourses: Course[] = response.data.map((course: any) => ({
          id: course._id,
          title: course.title,
          slug: course.slug,
          description: course.description,
          categoryId: course.categoryId?._id || course.categoryId,
          subjectId: course.subjectId?._id || course.subjectId,
          level: course.level,
          thumbnailUrl: course.thumbnailUrl,
          rating: course.rating,
          enrollmentCount: course.enrollmentCount,
          tags: course.tags || [],
          sections: course.sections || [],
          isPublished: course.isPublished,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
        }));

        setCourses(transformedCourses);
      } else {
        throw new Error(response.message || 'Failed to fetch courses');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses');
      setCourses([]); // reset courses on error
    } finally {
      setLoading(false);
    }
  }

  return { courses, loading, error };
}
