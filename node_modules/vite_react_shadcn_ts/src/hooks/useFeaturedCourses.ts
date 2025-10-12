import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { Course } from '@/types/course';

export function useFeaturedCourses(limit: number = 3) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedCourses();
  }, [limit]);

  async function fetchFeaturedCourses() {
    try {
      setLoading(true);
      const response = await apiService.getFeaturedCourses(limit);

      if (response.success) {
        // Transform data to match Course type
        const transformedCourses: Course[] = response.data.map((course: any) => ({
          id: course._id,
          title: course.title,
          slug: course.slug,
          description: course.description,
          categoryId: course.categoryId._id || course.categoryId,
          subjectId: course.subjectId?._id || course.subjectId,
          level: course.level,
          thumbnailUrl: course.thumbnailUrl,
          rating: course.rating,
          enrollmentCount: course.enrollmentCount,
          tags: course.tags || [],
          sections: course.sections || [],
          isPublished: course.isPublished,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt
        }));

        setCourses(transformedCourses);
      } else {
        throw new Error(response.message || 'Failed to fetch featured courses');
      }
    } catch (err) {
      console.error('Error fetching featured courses:', err);
      setError('Failed to load featured courses');
    } finally {
      setLoading(false);
    }
  }

  return { courses, loading, error };
}
