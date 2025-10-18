const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  count?: number;
  pagination?: {
    current: number;
    pages: number;
    total: number;
    limit: number;
  };
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Categories API
  async getCategories() {
    return this.request<any[]>('/categories');
  }

  async getCategoryBySlug(slug: string) {
    return this.request<any>(`/categories/${slug}`);
  }

  // Subjects API
  async getSubjects(categoryId?: string, categorySlug?: string) {
    const params = new URLSearchParams();
    if (categoryId) params.append('categoryId', categoryId);
    if (categorySlug) params.append('categorySlug', categorySlug);
    
    const queryString = params.toString();
    return this.request<any[]>(`/subjects${queryString ? `?${queryString}` : ''}`);
  }

  async getSubjectBySlug(slug: string) {
    return this.request<any>(`/subjects/${slug}`);
  }

  // Courses API
  async getCourses(filters?: {
    search?: string;
    category?: string;
    subject?: string;
    level?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.subject) params.append('subject', filters.subject);
    if (filters?.level) params.append('level', filters.level);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);
    
    const queryString = params.toString();
    return this.request<any[]>(`/courses${queryString ? `?${queryString}` : ''}`);
  }

  async getFeaturedCourses(limit: number = 3) {
    return this.request<any[]>(`/courses/featured?limit=${limit}`);
  }

  async getCourseBySlug(slug: string) {
    return this.request<any>(`/courses/${slug}`);
  }

  async getChatbotResponse(message: string) {
    return this.request<{ response: string }>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }
}

export const apiService = new ApiService(API_BASE_URL);
export default apiService;
