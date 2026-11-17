import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FOUNDER_INSTRUCTOR } from '../../data/instructor';
import type { Instructor } from '../../types';
import { InstructorPortrait } from './InstructorPortrait';

interface InstructorCardProps {
  instructor?: Instructor;
  variant?: 'compact' | 'inline' | 'featured';
  labelPrefix?: string;
  className?: string;
}

export function InstructorCard({
  instructor = FOUNDER_INSTRUCTOR,
  variant = 'inline',
  labelPrefix,
  className = '',
}: InstructorCardProps) {
  if (variant === 'compact') {
    return (
      <div
        className={`rounded-xl bg-[#131728] border border-white/10 px-4 py-3 flex items-center justify-between gap-3 ${className}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <InstructorPortrait size="xs" />
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-white truncate">
              {labelPrefix ?? 'Your Instructor:'}{' '}
              <span className="text-[#A5F51F]">{instructor.name}</span>
            </p>
            <p className="text-[11px] text-[#7F87A3] truncate">
              {instructor.role} · {instructor.experienceYears} Years Experience
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 shrink-0 text-[11px] text-[#B8BED4]">
          <a
            href={instructor.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#A5F51F] transition-colors"
          >
            GitHub <ExternalLink className="w-3 h-3" />
          </a>
          <span aria-hidden="true" className="text-white/20">·</span>
          <a
            href={instructor.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-[#A5F51F] transition-colors"
          >
            LinkedIn <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div
        className={`rounded-xl bg-[#0B0D17]/75 border border-white/10 p-4 flex items-start gap-3.5 ${className}`}
      >
        <InstructorPortrait size="sm" />
        <div className="min-w-0 space-y-1">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#A5F51F]">
            {labelPrefix ?? 'Course Instructor'}
          </p>
          <p className="font-display text-sm sm:text-base font-bold text-white">
            {instructor.name}{' '}
            <span className="font-normal text-xs text-[#B8BED4]">
              — {instructor.role}
            </span>
          </p>
          <p className="text-xs text-[#7F87A3]">
            {instructor.experience}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <InstructorPortrait size="xs" />
      <div className="min-w-0">
        <p className="text-xs font-semibold text-white truncate">
          {labelPrefix ? `${labelPrefix} ` : 'Instructed by '}
          <span className="text-[#A5F51F]">{instructor.name}</span>
        </p>
        <p className="text-[11px] text-[#7F87A3] truncate">{instructor.role}</p>
      </div>
    </div>
  );
}
