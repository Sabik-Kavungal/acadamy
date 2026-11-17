import React from 'react';
import { Calendar, Clock, Globe, Layers, Signal } from 'lucide-react';
import type { Course } from '../../types';
import { formatCourseDate, getCourseDurationSummary } from '../../utils/courseFormatters';

interface CourseMetadataProps {
  course: Course;
  compact?: boolean;
  className?: string;
}

export function CourseMetadata({ course, compact = false, className = '' }: CourseMetadataProps) {
  const { moduleCount, lessonCount, formattedTotal } = getCourseDurationSummary(course);
  const language = course.language ?? 'English';
  const hasUpdatedAt = Boolean(course.updatedAt);

  if (compact) {
    return (
      <div
        className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#B8BED4] font-mono tabular-nums ${className}`}
      >
        <span className="inline-flex items-center gap-1">
          <Signal className="w-3.5 h-3.5 text-[#A5F51F]" /> {course.difficulty}
        </span>
        <span aria-hidden="true" className="text-white/25">·</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-[#A5F51F]" /> {formattedTotal}
        </span>
        <span aria-hidden="true" className="text-white/25">·</span>
        <span>{lessonCount} lessons</span>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#B8BED4] ${className}`}
    >
      <span className="inline-flex items-center gap-1.5">
        <Signal className="w-4 h-4 text-[#A5F51F] shrink-0" />
        <span>
          Level: <strong className="text-white font-semibold">{course.difficulty}</strong>
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-[#A5F51F] shrink-0" />
        <span>
          <strong className="text-white font-semibold tabular-nums">{formattedTotal}</strong>
          {' '}({moduleCount} modules · {lessonCount} lessons)
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Layers className="w-4 h-4 text-[#A5F51F] shrink-0" />
        <span>{course.category}</span>
      </span>
      {hasUpdatedAt && (
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-[#A5F51F] shrink-0" />
          <span>
            Updated <strong className="text-white font-semibold">{formatCourseDate(course.updatedAt)}</strong>
          </span>
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <Globe className="w-4 h-4 text-[#A5F51F] shrink-0" />
        <span>{language}</span>
      </span>
    </div>
  );
}
