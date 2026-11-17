import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, Circle, Lock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course, CourseModule, Lesson } from '../../types';
import { formatMinutesLabel, getModuleDurationMinutes } from '../../utils/courseFormatters';
import { CourseProgress } from './CourseProgress';

interface MobileCourseNavigationProps {
  course: Course;
  modules: CourseModule[];
  currentLesson: Lesson;
  currentModuleId?: string;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  isCompleted: boolean;
  completedIds: string[];
  enrolled: boolean;
  completionStats: { completed: number; total: number; percent: number };
  onToggleComplete: () => void;
  onNavigateLesson: (lessonId: string) => void;
}

export function MobileCourseNavigation({
  course,
  modules,
  currentLesson,
  currentModuleId,
  prevLesson,
  nextLesson,
  isCompleted,
  completedIds,
  enrolled,
  completionStats,
  onToggleComplete,
  onNavigateLesson,
}: MobileCourseNavigationProps) {
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-4">
      {/* Visible Mobile Course Progress */}
      <div className="sm:hidden rounded-xl bg-[#131728] border border-white/10 px-4 py-3">
        <CourseProgress
          completed={completionStats.completed}
          total={completionStats.total}
          percent={completionStats.percent}
          size="sm"
        />
      </div>

      {/* Primary Lesson Actions (Desktop & Mobile unified bar with 44px touch targets) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        {enrolled ? (
          <button
            type="button"
            onClick={onToggleComplete}
            className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-[#A5F51F]/15 text-[#A5F51F] border border-[#A5F51F]/40'
                : 'bg-[#A5F51F] text-[#0B0D17] hover:bg-[#B3FA38]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>
        ) : (
          <span className="inline-flex items-center gap-2 text-xs text-[#B8BED4]">
            <Lock className="w-3.5 h-3.5 text-[#A5F51F] shrink-0" />
            Enroll to unlock all lessons and save completion progress.
          </span>
        )}

        <div className="grid grid-cols-2 sm:flex items-center gap-2.5">
          <button
            type="button"
            disabled={!prevLesson}
            onClick={() => prevLesson && onNavigateLesson(prevLesson.id)}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 sm:px-4 py-2.5 rounded-lg border border-white/15 text-xs sm:text-sm font-semibold text-white hover:bg-white/5 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" /> Previous
          </button>
          <button
            type="button"
            disabled={!nextLesson}
            onClick={() => nextLesson && onNavigateLesson(nextLesson.id)}
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 sm:px-4 py-2.5 rounded-lg bg-[#1A1F35] border border-white/15 text-xs sm:text-sm font-semibold text-white hover:border-[#A5F51F] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            Next Lesson <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* Mobile Expandable Curriculum Panel */}
      <div className="lg:hidden rounded-xl bg-[#131728] border border-white/10 overflow-hidden">
        <button
          type="button"
          aria-expanded={curriculumOpen}
          onClick={() => setCurriculumOpen((o) => !o)}
          className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between gap-3 text-left text-sm font-bold text-white cursor-pointer"
        >
          <span>
            Course Content ({completionStats.completed}/{completionStats.total} · {completionStats.percent}%)
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#B8BED4] shrink-0 transition-transform duration-150 ${
              curriculumOpen ? 'rotate-180 text-[#A5F51F]' : ''
            }`}
          />
        </button>

        {curriculumOpen && (
          <div className="border-t border-white/10 divide-y divide-white/10">
            {modules.map((mod) => {
              const isOpen = expandedModules[mod.id] ?? mod.id === currentModuleId;
              const modMins = getModuleDurationMinutes(mod);

              return (
                <div key={mod.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setExpandedModules((prev) => ({ ...prev, [mod.id]: !isOpen }))
                    }
                    className="w-full px-4 py-3 flex items-center justify-between gap-2 text-left bg-[#131728] hover:bg-[#1A1F35] cursor-pointer"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-[11px] text-[#A5F51F] font-semibold">
                        {mod.code} · {mod.lessons.length} lessons · {formatMinutesLabel(modMins)}
                      </p>
                      <p className="font-display text-sm font-bold text-white truncate">
                        {mod.title}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#7F87A3] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#A5F51F]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="bg-[#0B0D17] divide-y divide-white/5">
                      {mod.lessons.map((les) => {
                        const active = les.id === currentLesson.id;
                        const done = completedIds.includes(les.id);
                        const unlocked = enrolled || les.isFreePreview;
                        return (
                          <Link
                            key={les.id}
                            to={`/learn/${course.id}/${les.id}`}
                            onClick={() => setCurriculumOpen(false)}
                            className={`px-4 py-3 flex items-start gap-3 min-h-[44px] ${
                              active
                                ? 'bg-[#1A1F35] text-white'
                                : 'text-[#B8BED4] hover:text-white'
                            }`}
                          >
                            <span className="mt-0.5 shrink-0">
                              {done ? (
                                <CheckCircle2 className="w-4 h-4 text-[#A5F51F]" />
                              ) : unlocked ? (
                                active ? (
                                  <Play className="w-4 h-4 text-[#A5F51F] fill-current" />
                                ) : (
                                  <Circle className="w-4 h-4 text-[#7F87A3]" />
                                )
                              ) : (
                                <Lock className="w-4 h-4 text-[#7F87A3]" />
                              )}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium leading-snug">{les.title}</p>
                              <p className="font-mono text-[11px] text-[#7F87A3] mt-0.5 tabular-nums">
                                {les.durationLabel}
                                {les.isFreePreview && !enrolled ? ' · Preview' : ''}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
