import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course, Lesson } from '../../types';
import { getCourseDurationSummary, getFlatLessons, getSortedModules } from '../../utils/courseFormatters';
import { VideoPlayer } from '../player/VideoPlayer';
import { CurriculumModule } from './CurriculumModule';
import { EnrollmentButton } from './EnrollmentButton';

interface CourseCurriculumProps {
  course: Course;
  enrolled: boolean;
  completedIds: string[];
  onEnrollClick?: () => void;
  onLockedSelect?: (lesson: Lesson) => void;
}

export function CourseCurriculum({
  course,
  enrolled,
  completedIds,
  onEnrollClick,
  onLockedSelect,
}: CourseCurriculumProps) {
  const sortedModules = useMemo(() => getSortedModules(course), [course]);
  const flatLessons = useMemo(() => getFlatLessons(course), [course]);
  const summary = useMemo(() => getCourseDurationSummary(course), [course]);

  const [openModules, setOpenModules] = useState<Record<string, boolean>>(() => {
    const firstId = sortedModules[0]?.id;
    return firstId ? { [firstId]: true } : {};
  });
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
    () => flatLessons[0] ?? null
  );

  const activeLesson =
    flatLessons.find((l) => l.id === selectedLesson?.id) ?? flatLessons[0] ?? null;
  const activeIdx = activeLesson ? flatLessons.findIndex((l) => l.id === activeLesson.id) : -1;
  const prevLesson = activeIdx > 0 ? flatLessons[activeIdx - 1] : null;
  const nextLesson =
    activeIdx >= 0 && activeIdx < flatLessons.length - 1 ? flatLessons[activeIdx + 1] : null;
  const canPlaySelected = Boolean(enrolled || activeLesson?.isFreePreview);

  const allExpanded =
    sortedModules.length > 0 && sortedModules.every((m) => Boolean(openModules[m.id]));

  const toggleAll = () => {
    if (allExpanded) {
      setOpenModules({});
    } else {
      const next: Record<string, boolean> = {};
      sortedModules.forEach((m) => {
        next[m.id] = true;
      });
      setOpenModules(next);
    }
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setOpenModules((prev) => ({ ...prev, [lesson.moduleId]: true }));
    if (!enrolled && !lesson.isFreePreview) {
      onLockedSelect?.(lesson);
    }
  };

  return (
    <section id="curriculum" className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold text-white">Course Curriculum</h2>
          <p className="text-xs sm:text-sm text-[#B8BED4] mt-1 tabular-nums">
            {summary.moduleCount} modules · {summary.lessonCount} lessons · {summary.formattedTotal} total length
          </p>
        </div>

        <button
          type="button"
          onClick={toggleAll}
          className="text-xs font-semibold text-[#A5F51F] hover:underline self-start sm:self-auto cursor-pointer"
        >
          {allExpanded ? 'Collapse all modules' : 'Expand all modules'}
        </button>
      </div>

      {/* Inline Lesson Preview Stage */}
      {activeLesson && (
        <div className="rounded-xl bg-[#131728] border border-white/10 p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-mono text-[11px] text-[#A5F51F]">
                {activeLesson.isFreePreview && !enrolled ? 'FREE PREVIEW · ' : 'SELECTED LESSON · '}
                {activeLesson.durationLabel}
              </p>
              <h3 className="font-display text-base sm:text-lg font-bold text-white truncate">
                {activeLesson.title}
              </h3>
            </div>
            {(enrolled || activeLesson.isFreePreview) && (
              <Link
                to={`/learn/${course.id}/${activeLesson.id}`}
                className="text-xs font-semibold text-[#A5F51F] hover:underline whitespace-nowrap shrink-0"
              >
                Open Course Player →
              </Link>
            )}
          </div>

          {canPlaySelected ? (
            <VideoPlayer
              src={activeLesson.videoUrl}
              title={activeLesson.title}
              lessonKey={activeLesson.id}
            />
          ) : (
            <div className="aspect-video rounded-xl bg-[#0B0D17] border border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <Lock className="w-6 h-6 text-[#A5F51F]" />
              <p className="font-display text-base sm:text-lg font-bold text-white">
                Enroll to Watch This Lesson
              </p>
              <p className="text-xs text-[#B8BED4] max-w-sm">
                Lessons marked Preview are free to watch anytime. Enroll to unlock all{' '}
                {flatLessons.length} lessons.
              </p>
              {onEnrollClick && (
                <EnrollmentButton
                  course={course}
                  enrolled={enrolled}
                  onEnroll={onEnrollClick}
                  variant="compact"
                />
              )}
            </div>
          )}

          <p className="text-xs sm:text-sm text-[#B8BED4]">{activeLesson.description}</p>

          <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
            <button
              type="button"
              disabled={!prevLesson}
              onClick={() => prevLesson && handleSelectLesson(prevLesson)}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-lg border border-white/15 text-xs font-semibold text-white hover:bg-white/5 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Previous
            </button>
            <span className="font-mono text-[11px] text-[#7F87A3] tabular-nums">
              {activeIdx + 1} / {flatLessons.length}
            </span>
            <button
              type="button"
              disabled={!nextLesson}
              onClick={() => nextLesson && handleSelectLesson(nextLesson)}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-lg bg-[#1A1F35] border border-white/15 text-xs font-semibold text-white hover:border-[#A5F51F] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              Next <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Expandable Modules */}
      <div className="space-y-3">
        {sortedModules.map((mod) => (
          <CurriculumModule
            key={mod.id}
            module={mod}
            isOpen={Boolean(openModules[mod.id])}
            onToggle={() =>
              setOpenModules((prev) => ({ ...prev, [mod.id]: !prev[mod.id] }))
            }
            selectedLessonId={activeLesson?.id}
            completedIds={completedIds}
            enrolled={enrolled}
            onSelectLesson={handleSelectLesson}
          />
        ))}
      </div>
    </section>
  );
}
