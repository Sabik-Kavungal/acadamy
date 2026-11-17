import React from 'react';
import { BookOpen, CheckCircle2, Clock, FolderGit2, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { Course } from '../../types';
import { getCourseDurationSummary } from '../../utils/courseFormatters';
import { CourseArtwork } from '../shared/CourseArtwork';
import { CoursePricing } from './CoursePricing';
import { EnrollmentButton } from './EnrollmentButton';

interface CoursePurchaseCardProps {
  course: Course;
  enrolled: boolean;
  resumeLessonId?: string;
  onEnroll: (course: Course) => void;
}

export function CoursePurchaseCard({
  course,
  enrolled,
  resumeLessonId,
  onEnroll,
}: CoursePurchaseCardProps) {
  const { getCourseAccessState } = useApp();
  const accessState = enrolled ? 'enrolled' : getCourseAccessState(course.id);
  const { moduleCount, lessonCount, formattedTotal } = getCourseDurationSummary(course);

  return (
    <div className="rounded-xl bg-[#131728] border border-white/15 overflow-hidden shadow-xl">
      <CourseArtwork
        variant={course.artworkVariant}
        title={course.title}
        className="h-44"
      />

      <div className="p-5 sm:p-6 space-y-5">
        <CoursePricing
          originalPrice={course.originalPrice}
          launchPrice={course.launchPrice}
          offerLabel={course.offerLabel}
          size="lg"
          showSavings
        />

        {accessState === 'pending' && (
          <p className="rounded-lg bg-[#0B0D17] border border-[#A5F51F]/35 px-3 py-2 text-xs text-[#A5F51F]">
            Your payment is still pending. Finish checkout to unlock the course.
          </p>
        )}

        {accessState === 'failed' && (
          <p className="rounded-lg bg-rose-500/10 border border-rose-500/30 px-3 py-2 text-xs text-rose-300">
            Your last payment didn&apos;t go through. Try checking out again to unlock access.
          </p>
        )}

        <EnrollmentButton
          course={course}
          accessState={accessState}
          resumeLessonId={resumeLessonId}
          onEnroll={onEnroll}
          enrollLabel="Enroll Now"
          enrolledLabel="Continue Learning"
          className="w-full"
        />

        <div className="space-y-2.5 pt-3 border-t border-white/10">
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-white">
            What&apos;s included
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-[#B8BED4]">
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#A5F51F] shrink-0" />
              <span>{formattedTotal} of on-demand video lessons</span>
            </li>
            <li className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#A5F51F] shrink-0" />
              <span>
                {moduleCount} modules · {lessonCount} hands-on lessons
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <FolderGit2 className="w-4 h-4 text-[#A5F51F] shrink-0" />
              <span>Real project builds, notes &amp; starter repos</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#A5F51F] shrink-0" />
              <span>Self-paced lifetime access &amp; completion certificate</span>
            </li>
          </ul>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-[#0B0D17]/80 border border-white/10 px-3 py-2.5 text-xs text-[#B8BED4]">
          <ShieldCheck className="w-4 h-4 text-[#A5F51F] shrink-0 mt-0.5" />
          <span>
            Demo Checkout Mode — checks the simulated payment before unlocking access. No real card is charged.
          </span>
        </div>
      </div>
    </div>
  );
}
