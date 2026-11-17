import React from 'react';
import { FolderOpen, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CourseProgress } from '../../components/courses/CourseProgress';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { CourseArtwork } from '../../components/shared/CourseArtwork';
import { EmptyState } from '../../components/shared/StateFeedback';
import { useApp } from '../../context/AppContext';
import { progressService } from '../../services/progress.service';
import { getFlatLessons } from '../../utils/courseFormatters';

export function StudentCoursesPage() {
  const { user, courses, isEnrolled } = useApp();
  const enrolledCourses = courses.filter((c) => isEnrolled(c.id));

  return (
    <DashboardLayout title="My Courses">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-[#B8BED4]">
            Continue from your last accessed lesson, track completion, and access course files.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-lg border border-white/15 text-xs font-semibold text-white hover:bg-white/5 self-start whitespace-nowrap"
          >
            Browse Catalog
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <EmptyState
            title="No Enrolled Courses Yet"
            description="Browse available courses and complete checkout to unlock full curriculum access."
            action={
              <Link
                to="/courses"
                className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#B3FA38]"
              >
                Explore Courses
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {enrolledCourses.map((course) => {
              const pct = user
                ? progressService.getCompletionPercentage(user.id, course)
                : { completed: 0, total: 0, percent: 0 };
              const record = user ? progressService.getCourseProgress(user.id, course.id) : null;
              const flatLessons = getFlatLessons(course);
              const currentLesson =
                flatLessons.find((l) => l.id === record?.lastAccessedLessonId) ?? flatLessons[0];
              const isCompleted = pct.total > 0 && pct.completed >= pct.total;

              return (
                <article
                  key={course.id}
                  className="rounded-xl bg-[#131728] border border-white/10 overflow-hidden flex flex-col"
                >
                  <CourseArtwork
                    variant={course.artworkVariant}
                    title={course.title}
                    className="h-36 sm:h-40"
                  />
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2.5 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] font-semibold text-[#A5F51F]">
                          {course.category}
                        </span>
                        {isCompleted && (
                          <span className="rounded bg-[#A5F51F]/15 border border-[#A5F51F]/35 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-[#A5F51F]">
                            Completed
                          </span>
                        )}
                      </div>

                      <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                        {course.title}
                      </h2>

                      {currentLesson && (
                        <p className="text-xs text-[#B8BED4] truncate">
                          Current lesson:{' '}
                          <span className="text-white font-medium">{currentLesson.title}</span>
                        </p>
                      )}

                      <CourseProgress
                        completed={pct.completed}
                        total={pct.total}
                        percent={pct.percent}
                        size="sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 min-[380px]:flex items-center gap-2.5 pt-3 border-t border-white/10">
                      {currentLesson && (
                        <Link
                          to={`/learn/${course.id}/${currentLesson.id}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 px-4 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-xs font-bold hover:bg-[#B3FA38] whitespace-nowrap"
                        >
                          <Play className="w-3.5 h-3.5 fill-current shrink-0" />
                          {isCompleted
                            ? 'Review Course'
                            : pct.completed > 0 || Boolean(record?.lastAccessedLessonId)
                            ? 'Continue Learning'
                            : 'Start Course'}
                        </Link>
                      )}
                      <Link
                        to={`/learn/${course.id}/resources`}
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 px-4 rounded-lg border border-white/15 text-xs font-semibold text-white hover:bg-white/5 whitespace-nowrap"
                      >
                        <FolderOpen className="w-3.5 h-3.5 shrink-0" /> Resources
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
