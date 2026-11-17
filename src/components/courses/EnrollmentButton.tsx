import React from 'react';
import { AlertCircle, ArrowRight, Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp, type CourseAccessState } from '../../context/AppContext';
import type { Course } from '../../types';

interface EnrollmentButtonProps {
  course: Course;
  enrolled?: boolean;
  accessState?: CourseAccessState;
  resumeLessonId?: string;
  onEnroll?: (course: Course) => void;
  enrollLabel?: string;
  enrolledLabel?: string;
  variant?: 'primary' | 'compact';
  className?: string;
}

export function EnrollmentButton({
  course,
  enrolled,
  accessState,
  resumeLessonId,
  onEnroll,
  enrollLabel = 'Enroll Now',
  enrolledLabel = 'Continue Learning',
  variant = 'primary',
  className = '',
}: EnrollmentButtonProps) {
  const { getCourseAccessState } = useApp();
  const resolvedState: CourseAccessState =
    accessState ?? (enrolled === true ? 'enrolled' : getCourseAccessState(course.id));

  const targetLessonId = resumeLessonId ?? course.modules[0]?.lessons[0]?.id;
  const sizeClass =
    variant === 'compact'
      ? 'min-h-[44px] px-3 sm:px-4 py-2.5 text-xs sm:text-sm'
      : 'min-h-[46px] px-5 py-3 text-sm';

  if (resolvedState === 'enrolled' && targetLessonId) {
    return (
      <Link
        to={`/learn/${course.id}/${targetLessonId}`}
        className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold hover:bg-[#B3FA38] transition-colors whitespace-nowrap ${sizeClass} ${className}`}
      >
        <Play className="w-3.5 h-3.5 fill-current shrink-0" />
        <span>{enrolledLabel}</span>
      </Link>
    );
  }

  if (course.status !== 'available') {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-lg border border-white/15 bg-[#1A1F35] text-[#7F87A3] font-semibold cursor-not-allowed whitespace-nowrap ${sizeClass} ${className}`}
      >
        Coming Soon
      </span>
    );
  }

  const labelByState =
    resolvedState === 'unauthenticated'
      ? variant === 'compact'
        ? 'Sign In / Enroll'
        : 'Sign In to Enroll'
      : resolvedState === 'pending'
      ? 'Payment Pending'
      : resolvedState === 'failed'
      ? 'Retry Payment'
      : enrollLabel;

  const styleByState =
    resolvedState === 'failed'
      ? 'bg-amber-400 text-[#0B0D17] hover:bg-amber-300'
      : resolvedState === 'pending'
      ? 'bg-[#1A1F35] text-[#A5F51F] border border-[#A5F51F]/50 hover:bg-[#A5F51F]/10'
      : 'bg-[#A5F51F] text-[#0B0D17] hover:bg-[#B3FA38]';

  if (!onEnroll) {
    return (
      <Link
        to={`/courses/${course.slug}`}
        className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-bold transition-colors whitespace-nowrap ${styleByState} ${sizeClass} ${className}`}
      >
        <span>{labelByState}</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onEnroll(course)}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-bold transition-colors cursor-pointer whitespace-nowrap ${styleByState} ${sizeClass} ${className}`}
    >
      {resolvedState === 'pending' && <Clock className="w-4 h-4 shrink-0" />}
      {resolvedState === 'failed' && <AlertCircle className="w-4 h-4 shrink-0" />}
      <span>{labelByState}</span>
    </button>
  );
}
