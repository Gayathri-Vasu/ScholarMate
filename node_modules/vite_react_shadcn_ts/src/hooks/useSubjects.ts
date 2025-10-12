import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { Subject } from '@/types/course';

export function useSubjects(categorySlug?: string) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (categorySlug && categorySlug !== 'all') {
      fetchSubjects();
    } else {
      setSubjects([]);
      setLoading(false);
    }
  }, [categorySlug]);

  async function fetchSubjects() {
    try {
      setLoading(true);
      // Pass categorySlug instead of categoryId
      const response = await apiService.getSubjects(undefined, categorySlug);

      if (response.success) {
        const transformedSubjects: Subject[] = response.data.map((sub: any) => ({
          id: sub._id,
          categoryId: sub.categoryId._id || sub.categoryId,
          name: sub.name,
          slug: sub.slug,
          order: sub.sortOrder
        }));

        setSubjects(transformedSubjects);
      } else {
        throw new Error(response.message || 'Failed to fetch subjects');
      }
    } catch (err) {
      console.error('Error fetching subjects:', err);
      setError('Failed to load subjects');
    } finally {
      setLoading(false);
    }
  }

  return { subjects, loading, error };
}