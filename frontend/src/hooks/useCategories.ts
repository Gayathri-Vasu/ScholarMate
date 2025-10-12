import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { Category } from '@/types/course';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      const response = await apiService.getCategories();

      if (response.success) {
        const transformedCategories: Category[] = response.data.map((cat: any) => ({
          id: cat._id,
          name: cat.name,
          slug: cat.slug,
          type: cat.type,
          icon: cat.icon,
          description: cat.description,
          order: cat.sortOrder
        }));

        setCategories(transformedCategories);
      } else {
        throw new Error(response.message || 'Failed to fetch categories');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  }

  return { categories, loading, error };
}