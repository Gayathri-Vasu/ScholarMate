import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseCard } from '@/components/CourseCard';
import { Input } from '@/components/ui/input';
import { ArrowRight, BookOpen, Trophy, Users, Target, Brain, Video, FileText, MessageSquare, Search, ChevronRight, Loader2 } from 'lucide-react';
import { useCategories } from '@/hooks/useCategories';
import { useFeaturedCourses } from '@/hooks/useFeaturedCourses';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { categories, loading: categoriesLoading } = useCategories();
  const { courses: featuredCourses, loading: coursesLoading } = useFeaturedCourses(3);
  
  const loading = categoriesLoading || coursesLoading;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const stats = [
    { icon: BookOpen, label: 'Courses', value: '500+' },
    { icon: Users, label: 'Students', value: '50,000+' },
    { icon: Trophy, label: 'Success Rate', value: '95%' },
    { icon: Target, label: 'Placements', value: '10,000+' },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Get personalized assistance with our AI chatbot trained on Tamil Nadu curriculum'
    },
    {
      icon: Video,
      title: 'Video Lessons',
      description: 'High-quality video content from expert educators across all subjects'
    },
    {
      icon: FileText,
      title: 'Comprehensive PDFs',
      description: 'Download study materials, notes, and previous year question papers'
    },
    {
      icon: MessageSquare,
      title: '24/7 Support',
      description: 'Get instant answers to your questions with our AI assistant'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your Gateway to{' '}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Tamil Nadu Education
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Access comprehensive study materials for TN State Board, TNPSC, Engineering, and IT Placement preparation
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Search for courses, topics, or skills..."
                  className="pr-12 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="absolute right-1 top-1 h-10 w-10"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="shadow-elegant">
                <Link to="/courses">
                  Browse Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/register">
                  Start Learning Free
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our diverse range of educational categories tailored for Tamil Nadu students
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader>
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <CardTitle className="group-hover:text-primary transition-colors">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" className="w-full">
                      <Link to={`/courses?category=${category.slug}`}>
                        Explore <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Question Papers Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Question Papers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse previous year question papers by exam type
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'TNPSC', label: 'TNPSC Question Paper', emoji: '🎓', href: '/qp/tnpsc' },
              { key: 'NEET', label: 'NEET Question Paper', emoji: '🧪', href: '/qp/neet' },
              { key: 'STATE_BOARD', label: 'TN State Board Question Paper', emoji: '🏫', href: '/qp/state-board' },
              { key: 'CBSE', label: 'CBSE Question Paper', emoji: '📖', href: '/qp/cbse' },
              { key: 'PLACEMENT', label: 'IT Placement Question Paper', emoji: '💼', href: '/qp/placement' },
              { key: 'ENGINEERING', label: 'Engineering Question Paper', emoji: '⚙️', href: '/qp/engineering' }
            ].map((item) => (
              <Card key={item.key} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="text-4xl mb-4" aria-hidden>{item.emoji}</div>
                  <CardTitle className="transition-colors">{item.label}</CardTitle>
                  <CardDescription>Previous year papers and practice sets</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to={item.href} className="font-semibold">SEE ME 🤪🚀✨</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Scholar mate?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive learning solutions tailored specifically for Tamil Nadu students
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-elegant transition-shadow">
                  <CardHeader>
                    <Icon className="mx-auto h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start your learning journey with our most popular courses
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Button asChild size="lg" variant="outline">
              <Link to="/courses">
                View All Courses <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div> 
      </section>
    </div>
  );
};

export default Index;