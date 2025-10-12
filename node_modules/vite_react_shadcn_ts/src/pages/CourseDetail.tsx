import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Clock, Users, Star, FileText, Video, 
  TestTube, Download, Play, ArrowLeft, Loader2 
} from 'lucide-react';
import { apiService } from '@/services/api';
import { Course } from '@/types/course';

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  async function fetchCourse() {
    try {
      setLoading(true);
      const response = await apiService.getCourseBySlug(slug!);

      if (response.success) {
        // Transform data to match Course type
        const transformedCourse: Course = {
          id: response.data._id,
          title: response.data.title,
          slug: response.data.slug,
          description: response.data.description,
          categoryId: response.data.categoryId._id || response.data.categoryId,
          subjectId: response.data.subjectId?._id || response.data.subjectId,
          level: response.data.level,
          thumbnailUrl: response.data.thumbnailUrl,
          rating: response.data.rating,
          enrollmentCount: response.data.enrollmentCount,
          tags: response.data.tags || [],
          sections: response.data.sections || [],
          isPublished: response.data.isPublished,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          pdfUrl: response.data.pdfUrl,
          videoUrl: response.data.videoUrl
        };

        setCourse(transformedCourse);
      } else {
        throw new Error(response.message || 'Failed to fetch course');
      }
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to load course');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-lg text-muted-foreground">Loading course...</p>
        </Card>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">
            {error || "The course you're looking for doesn't exist."}
          </p>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </Card>
      </div>
    );
  }

  // Placeholder category and subject data
  const category = { name: 'Category', icon: '📚' };
  const subject = course.subjectId ? { name: 'Subject' } : null;
  const totalLessons = course.sections.reduce((acc, section) => acc + section.items.length, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/courses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{category?.name}</Badge>
                {subject && <Badge variant="outline">{subject.name}</Badge>}
                <Badge className="bg-primary text-primary-foreground">{course.level}</Badge>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>{course.sections.length} Sections</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{totalLessons} Lessons</span>
                </div>
                {course.enrollmentCount && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{course.enrollmentCount.toLocaleString()} Students</span>
                  </div>
                )}
                {course.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span>{course.rating} Rating</span>
                  </div>
                )}
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="resources" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="resources" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Downloadable Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Complete Notes PDF</p>
                            <p className="text-sm text-muted-foreground">All chapters combined</p>
                          </div>
                        </div>
                        <a href={course.pdfUrl || "/pdf/General_Tamil_QP_2025.pdf"} download>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </a>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
                        <div className="flex items-center gap-3">
                          <Video className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Lecture Video</p>
                            <p className="text-sm text-muted-foreground">Watch the key lectures</p>
                          </div>
                        </div>
                        <a
                          href={course.videoUrl || "https://www.youtube.com/watch?v=FDSxAHU-Qac&list=PLxwWG1rvYm9NVKwznP5rEDga-IsfwMDRw"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-2" />
                            View Video
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                            ))}
                          </div>
                          <span className="font-medium">Priya S.</span>
                          <span className="text-sm text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-sm">
                          Excellent course! The explanations are clear and the practice problems really helped me understand the concepts.
                        </p>
                      </div>
                      <div className="border-b pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4].map((i) => (
                              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                            ))}
                            <Star className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <span className="font-medium">Karthik R.</span>
                          <span className="text-sm text-muted-foreground">1 week ago</span>
                        </div>
                        <p className="text-sm">
                          Very comprehensive coverage of the syllabus. The video lessons are particularly helpful.
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                            ))}
                          </div>
                          <span className="font-medium">Anitha M.</span>
                          <span className="text-sm text-muted-foreground">2 weeks ago</span>
                        </div>
                        <p className="text-sm">
                          This course helped me crack my exam! The mock tests were exactly like the real exam pattern.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="aspect-video w-full bg-muted rounded-lg mb-4 overflow-hidden">
                  <img
                    src={course.thumbnailUrl || '/placeholder.svg'}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle>Enroll in This Course</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-2xl font-bold">Free</p>
                  <p className="text-sm text-muted-foreground">Full lifetime access</p>
                </div>

                <Button className="w-full" size="lg">
                  Enroll Now
                </Button>

                <div className="space-y-3 pt-4 border-t">
                  <div className="text-sm">
                    <p className="font-medium mb-1">This course includes:</p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Video lessons
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Downloadable PDFs
                      </li>
                      <li className="flex items-center gap-2">
                        <TestTube className="h-4 w-4" />
                        Practice tests
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Lifetime access
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
