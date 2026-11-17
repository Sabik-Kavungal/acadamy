import React from 'react';
import { CheckCircle2, ChevronDown, Circle, Lock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course, CourseModule } from '../../types';
import { formatMinutesLabel, getModuleDurationMinutes } from '../../utils/courseFormatters';
import { CourseProgress } from './CourseProgress';

interface LearningSidebarProps {
  course: Course;
  modules: CourseModule[];
  currentLessonId: string;
  currentModuleId?: string;
  completedIds: string[];
  enrolled: boolean;
  completionStats: { completed: number; total: number; percent: number };
  expandedModules: Record<string, boolean>;
  onToggleModule: (moduleId: string, nextOpen: boolean) => void;
}

export function LearningSidebar({
  course,
  modules,
  currentLessonId,
  currentModuleId,
  completedIds,
  enrolled,
  completionStats,
  expandedModules,
  onToggleModule,
}: LearningSidebarProps) {
  return (
    <aside className="hidden lg:flex lg:w-80 xl:w-96 shrink-0 flex-col bg-[#131728] border-l border-white/10 max-h-[calc(100vh-3.5rem)] sticky top-14">
      <div className="px-4 py-3.5 border-b border-white/10 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-sm font-bold text-white">Course Content</h2>
          <span className="font-mono text-xs text-[#A5F51F] tabular-nums">
            {completionStats.completed}/{completionStats.total}
          </span>
        </div>
        <CourseProgress
          completed={completionStats.completed}
          total={completionStats.total}
          percent={completionStats.percent}
          size="sm"
          showLabel={false}
        />
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-white/10">
        {modules.map((mod) => {
          const isCurrentMod = mod.id === currentModuleId;
          const isOpen = expandedModules[mod.id] ?? isCurrentMod;
          const modMinutes = getModuleDurationMinutes(mod);
          const doneInMod = mod.lessons.filter((l) => completedIds.includes(l.id)).length;

          return (
            <div key={mod.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => onToggleModule(mod.id, !isOpen)}
                className="w-full px-4 py-3.5 flex items-start justify-between gap-2 text-left bg-[#131728] hover:bg-[#1A1F35] transition-colors cursor-pointer"
              >
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-[#A5F51F] font-semibold">
                    {mod.code} · {doneInMod}/{mod.lessons.length} · {formatMinutesLabel(modMinutes)}
                  </p>
                  <p className="font-display text-sm font-bold text-white leading-snug mt-0.5">
                    {mod.title}
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#7F87A3] shrink-0 mt-1 transition-transform duration-150 ${
                    isOpen ? 'rotate-180 text-[#A5F51F]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="bg-[#0B0D17] divide-y divide-white/5">
                  {mod.lessons.map((les) => {
                    const active = les.id === currentLessonId;
                    const done = completedIds.includes(les.id);
                    const unlocked = enrolled || les.isFreePreview;
                    return (
                      <Link
                        key={les.id}
                        to={`/learn/${course.id}/${les.id}`}
                        className={`px-4 py-3 flex items-start gap-3 transition-colors ${
                          active
                            ? 'bg-[#1A1F35] text-white border-l-2 border-[#A5F51F]'
                            : 'text-[#B8BED4] hover:bg-white/[0.03] hover:text-white'
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
    </aside>
  );
}
