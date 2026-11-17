import React from 'react';
import { ChevronRight, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FOUNDER_INSTRUCTOR } from '../../data/instructor';
import type { Course } from '../../types';
import { TechLogo } from '../shared/TechLogo';
import { CourseMetadata } from './CourseMetadata';

interface CourseHeaderProps {
  course: Course;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  const instructor = course.instructor ?? FOUNDER_INSTRUCTOR;

  return (
    <header className="space-y-4">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-[#B8BED4]">
        <Link to="/courses" className="hover:text-white transition-colors">
          Courses
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#7F87A3]" />
        <Link
          to={`/courses?category=${encodeURIComponent(course.category)}`}
          className="text-[#A5F51F] font-semibold hover:underline"
        >
          {course.category}
        </Link>
        {course.featured && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-[#7F87A3]" />
            <span className="rounded bg-[#A5F51F]/15 border border-[#A5F51F]/35 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#A5F51F]">
              Flagship Program
            </span>
          </>
        )}
      </nav>

      {/* Title, Subtitle & Overview */}
      <div className="space-y-2.5">
        <h1 className="font-display font-extrabold text-white tracking-tight text-balance text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.12]">
          {course.title}
        </h1>
        <p className="text-base sm:text-lg text-[#A5F51F] font-semibold leading-snug">
          {course.subtitle}
        </p>
        <p className="text-sm sm:text-base text-[#B8BED4] leading-relaxed max-w-3xl">
          {course.description}
        </p>
      </div>

      {/* Instructor Attribution */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-[#B8BED4]">
        <UserCheck className="w-4 h-4 text-[#A5F51F] shrink-0" />
        <span>
          Taught by{' '}
          <a href="#instructor" className="text-white font-semibold hover:text-[#A5F51F] underline decoration-white/25 underline-offset-4">
            {instructor.name}
          </a>
          {' '}· {instructor.role}
        </span>
      </div>

      {/* Metadata Strip (Level, Duration, Updated Date, Language) */}
      <CourseMetadata course={course} />

      {/* Core Tech Stack */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {course.technologies.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center gap-1.5 rounded-md bg-[#1A1F35] border border-white/10 px-2.5 py-1 text-xs font-medium text-white"
          >
            <TechLogo name={tech} className="w-3.5 h-3.5 shrink-0" />
            <span>{tech}</span>
          </span>
        ))}
      </div>
    </header>
  );
}
