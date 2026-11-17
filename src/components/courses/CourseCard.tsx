import React from 'react';
import { ArrowRight, BrainCircuit, Clock, FolderGit2, Play, Signal, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FOUNDER_INSTRUCTOR } from '../../data/instructor';
import { progressService } from '../../services/progress.service';
import type { Course } from '../../types';
import { getCourseDurationSummary } from '../../utils/courseFormatters';
import { formatINR, getCoursePricingMeta } from '../../utils/pricing';

interface CourseCardProps {
  course: Course;
  enrolled?: boolean;
  onEnroll?: (course: Course) => void;
}

function getRelevantCardTechs(course: Course): string[] {
  if (course.id === 'course-fdai-01') {
    const preferred = ['React', 'FastAPI', 'PostgreSQL', 'Gemini'];
    const matched = preferred.filter((t) => course.technologies.includes(t));
    if (matched.length >= 3) return matched;
  }
  if (course.id === 'course-mobile-02') {
    const preferred = ['Flutter', 'Dart', 'REST APIs', 'Gemini'];
    const matched = preferred.filter((t) => course.technologies.includes(t));
    if (matched.length >= 3) return matched;
  }
  return course.technologies.slice(0, 4);
}

export function CourseCard({ course, enrolled: enrolledProp, onEnroll }: CourseCardProps) {
  const { user, enrollments } = useApp();

  // Only show Continue Learning when the user actually holds an enrollment record
  const hasStudentEnrollment = Boolean(
    user && enrollments.some((e) => e.courseId === course.id)
  );
  const enrolled =
    enrolledProp !== undefined
      ? enrolledProp && hasStudentEnrollment
      : hasStudentEnrollment;

  const { moduleCount, lessonCount, formattedTotal } = getCourseDurationSummary(course);
  const { hasDiscount, discountPercent } = getCoursePricingMeta(
    course.originalPrice,
    course.launchPrice
  );

  const previewTools = getRelevantCardTechs(course);
  const firstLessonId = course.modules[0]?.lessons[0]?.id;
  const resumeLessonId =
    enrolled && user
      ? progressService.getCourseProgress(user.id, course.id).lastAccessedLessonId ?? firstLessonId
      : firstLessonId;

  const projectOutcome =
    course.practicalProjects && course.practicalProjects.length > 0
      ? course.practicalProjects.map((p) => p.title).join(' & ')
      : course.capstoneProject.title;
  const isMobileTrack = course.artworkVariant === 'mobile';
  const instructorName = course.instructor?.name ?? FOUNDER_INSTRUCTOR.name;

  return (
    <article className="group rounded-xl bg-[#131728] border border-white/10 hover:border-[#A5F51F]/50 transition-colors duration-200 overflow-hidden flex flex-col h-full">
      {/* 1. Compact Header Banner (No empty vertical gap) */}
      <Link
        to={`/courses/${course.slug}`}
        className="block relative bg-[#0E1220] border-b border-white/10 px-4 sm:px-5 py-3.5 sm:py-4 overflow-hidden"
      >
        <div className="absolute inset-0 arch-grid-bg opacity-45" />
        <div className="relative z-10 space-y-2.5">
          <div className="flex items-center justify-between gap-2 min-h-[22px]">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#A5F51F]">
              Path {course.pathNumber} · {course.category}
            </span>
            {course.featured ? (
              <span className="rounded bg-[#A5F51F] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#0B0D17]">
                Flagship
              </span>
            ) : (
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#7F87A3]">
                Independent Track
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1A1F35] border border-white/15 flex items-center justify-center text-[#A5F51F] shrink-0">
              {isMobileTrack ? (
                <Smartphone className="w-5 h-5" />
              ) : (
                <BrainCircuit className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-[#B8BED4] truncate">
                {isMobileTrack ? 'Android & iOS Cross-Platform' : 'Full-Stack Web + Applied AI'}
              </p>
              <p className="text-sm font-display font-bold text-white tabular-nums truncate">
                {moduleCount} modules · {lessonCount} lessons · {formattedTotal}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* 2. Card Body — Aligned Hierarchy Across Both Tracks */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
        <div className="space-y-2">
          <Link to={`/courses/${course.slug}`} className="block md:min-h-[3.25rem] flex items-start">
            <h3 className="font-display text-lg sm:text-xl font-extrabold text-white group-hover:text-[#A5F51F] transition-colors leading-snug">
              {course.title}
            </h3>
          </Link>

          <p className="text-sm text-[#B8BED4] leading-relaxed line-clamp-2 md:min-h-[2.85rem]">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#B8BED4] pt-0.5">
            <span>
              By <strong className="font-semibold text-white">{instructorName}</strong>
            </span>
            <span aria-hidden="true" className="text-white/25">·</span>
            <span className="inline-flex items-center gap-1">
              <Signal className="w-3.5 h-3.5 text-[#A5F51F]" />
              {course.difficulty}
            </span>
            <span aria-hidden="true" className="text-white/25">·</span>
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Clock className="w-3.5 h-3.5 text-[#A5F51F]" />
              {formattedTotal}
            </span>
          </div>
        </div>

        {/* Bottom-Aligned Project Outcome & Relevant Tech Tags */}
        <div className="mt-auto pt-1.5 space-y-3">
          <div className="rounded-lg bg-[#0B0D17]/80 border border-white/10 px-3 py-2.5 md:min-h-[4.25rem] flex flex-col justify-center gap-0.5">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#A5F51F]">
              <FolderGit2 className="w-3.5 h-3.5 shrink-0" />
              <span>Project You&apos;ll Build</span>
            </div>
            <p className="text-xs sm:text-[13px] font-semibold text-white leading-snug">
              {projectOutcome}
            </p>
          </div>

          {previewTools.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {previewTools.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-[#0B0D17]/80 border border-white/10 px-2.5 py-1 text-xs font-medium text-[#E2E8F0]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Pricing & Clear Enrollment CTAs */}
      <div className="px-4 sm:px-5 py-3.5 sm:py-4 bg-[#0B0D17]/70 border-t border-white/10 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl sm:text-2xl font-extrabold text-white tabular-nums">
              {formatINR(course.launchPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs sm:text-sm text-[#7F87A3] line-through tabular-nums">
                {formatINR(course.originalPrice)}
              </span>
            )}
          </div>

          {enrolled ? (
            <span className="rounded bg-[#A5F51F]/15 border border-[#A5F51F]/40 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#A5F51F]">
              Enrolled
            </span>
          ) : (
            hasDiscount && (
              <span className="rounded bg-[#A5F51F]/15 border border-[#A5F51F]/35 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#A5F51F]">
                {course.offerLabel} · {discountPercent}% OFF
              </span>
            )
          )}
        </div>

        {enrolled && resumeLessonId ? (
          <Link
            to={`/learn/${course.id}/${resumeLessonId}`}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] rounded-lg bg-[#A5F51F] px-4 py-2.5 text-sm font-bold text-[#0B0D17] hover:bg-[#B3FA38] transition-colors whitespace-nowrap"
          >
            <Play className="w-3.5 h-3.5 fill-current shrink-0" />
            Continue Learning
          </Link>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              to={`/courses/${course.slug}`}
              className="inline-flex items-center justify-center min-h-[44px] rounded-lg border border-white/15 bg-[#131728] px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:border-[#A5F51F]/60 hover:text-[#A5F51F] transition-colors whitespace-nowrap"
            >
              View Course
            </Link>
            {onEnroll ? (
              <button
                type="button"
                onClick={() => onEnroll(course)}
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-lg bg-[#A5F51F] px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-[#0B0D17] hover:bg-[#B3FA38] transition-colors cursor-pointer whitespace-nowrap"
              >
                Enroll Now <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </button>
            ) : (
              <Link
                to={`/courses/${course.slug}`}
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-lg bg-[#A5F51F] px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-[#0B0D17] hover:bg-[#B3FA38] transition-colors whitespace-nowrap"
              >
                Enroll Now <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
