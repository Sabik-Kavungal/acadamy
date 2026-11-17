import React from 'react';
import type { Course } from '../../types';
import { EmptyState } from '../shared/StateFeedback';
import { CourseCard } from './CourseCard';

interface CourseGridProps {
  courses: Course[];
  isEnrolled: (courseId: string) => boolean;
  onEnroll?: (course: Course) => void;
  onResetFilters?: () => void;
}

export function CourseGrid({
  courses,
  isEnrolled,
  onEnroll,
  onResetFilters,
}: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <EmptyState
        title="No matching courses"
        description="Try clearing a filter or search term to see all available courses."
        action={
          onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="min-h-[42px] px-5 py-2 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-xs font-bold cursor-pointer hover:bg-[#B3FA38]"
            >
              Show All Courses
            </button>
          )
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          enrolled={isEnrolled(course.id)}
          onEnroll={onEnroll}
        />
      ))}
    </div>
  );
}
