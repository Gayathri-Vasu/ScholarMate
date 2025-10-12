import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Star, Users } from 'lucide-react';
import { Course } from '@/types/course';
import { useCategories } from '@/hooks/useCategories';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { categories } = useCategories();
  const category = categories.find(c => c.id === course.categoryId);
  const sectionCount = course.sections?.length || 0;
  const lessonCount = course.sections?.reduce((acc, section) => acc + (section.items?.length || 0), 0) || 0;

  return (
    <Card className="group h-full flex flex-col hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="aspect-video w-full bg-gradient-subtle rounded-md mb-4 overflow-hidden">
          <img
            src={course.thumbnailUrl || '/placeholder.svg'}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {category?.name}
          </Badge>
          <Badge variant="outline" className="text-xs bg-gradient-gold">
            {course.level}
          </Badge>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {course.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{sectionCount} sections</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{lessonCount} lessons</span>
          </div>
        </div>

        {course.rating && course.enrollmentCount && (
          <div className="flex items-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="font-medium">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{course.enrollmentCount.toLocaleString()} enrolled</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1 mt-3">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild className="w-full group-hover:shadow-md" variant="default">
          <Link to={`/courses/${course.slug}`}>
            View Course
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}