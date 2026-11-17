import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { CourseModule, Lesson } from '../../types';
import { formatMinutesLabel, getModuleDurationMinutes } from '../../utils/courseFormatters';
import { LessonItem } from './LessonItem';

interface CurriculumModuleProps {
  module: CourseModule;
  isOpen: boolean;
  onToggle: () => void;
  selectedLessonId?: string;
  completedIds: string[];
  enrolled: boolean;
  onSelectLesson: (lesson: Lesson) => void;
}

export function CurriculumModule({
  module,
  isOpen,
  onToggle,
  selectedLessonId,
  completedIds,
  enrolled,
  onSelectLesson,
}: CurriculumModuleProps) {
  const totalMinutes = getModuleDurationMinutes(module);
  const durationLabel = formatMinutesLabel(totalMinutes);
  const sortedLessons = [...module.lessons].sort((a, b) => a.order - b.order);

  return (
    <div className="rounded-xl bg-[#131728] border border-white/10 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full px-4 sm:px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
      >
        <div className="min-w-0">
          <p className="font-mono text-[11px] text-[#A5F51F] font-semibold">{module.code}</p>
          <h3 className="font-display text-sm sm:text-base font-bold text-white mt-0.5">
            {module.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono text-xs text-[#7F87A3] tabular-nums whitespace-nowrap">
            {sortedLessons.length} {sortedLessons.length === 1 ? 'lesson' : 'lessons'} · {durationLabel}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#B8BED4] transition-transform duration-150 ${
              isOpen ? 'rotate-180 text-[#A5F51F]' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-white/10 divide-y divide-white/5 bg-[#0B0D17]/50">
          {module.summary && (
            <p className="px-4 sm:px-5 py-3 text-xs text-[#B8BED4] leading-relaxed">
              {module.summary}
            </p>
          )}
          {sortedLessons.map((lesson, idx) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              index={idx}
              isSelected={selectedLessonId === lesson.id}
              isCompleted={completedIds.includes(lesson.id)}
              enrolled={enrolled}
              onSelect={onSelectLesson}
            />
          ))}
        </div>
      )}
    </div>
  );
}
