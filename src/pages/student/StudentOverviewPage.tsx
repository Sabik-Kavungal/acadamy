import React from 'react';
import { CheckCircle2, Play, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CourseProgress } from '../../components/courses/CourseProgress';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { CourseArtwork } from '../../components/shared/CourseArtwork';
import { useApp } from '../../context/AppContext';
import { progressService } from '../../services/progress.service';
import { getFlatLessons } from '../../utils/courseFormatters';

export function StudentOverviewPage() {
  const { user, courses, isEnrolled } = useApp();

  const enrolledCourses = courses.filter((c) => isEnrolled(c.id));

  const courseSummaries = enrolledCourses.map((course) => {
    const stats = user
      ? progressService.getCompletionPercentage(user.id, course)
      : { completed: 0, total: 0, percent: 0 };
    const record = user ? progressService.getCourseProgress(user.id, course.id) : null;
    const flatLessons = getFlatLessons(course);
    const resumeLesson =
      flatLessons.find((l) => l.id === record?.lastAccessedLessonId) ?? flatLessons[0];
    return { course, stats, record, resumeLesson };
  });

  const completedCourses = courseSummaries.filter(
    (s) => s.stats.total > 0 && s.stats.completed >= s.stats.total
  );
  const activeCourseSummary =
    courseSummaries.find((s) => s.stats.completed < s.stats.total) ?? courseSummaries[0];

  const recentlyAccessedLessons = enrolledCourses.flatMap((course) => {
    const rec = user ? progressService.getCourseProgress(user.id, course.id) : null;
    if (!rec) return [];
    const lessons = getFlatLessons(course);
    return lessons
      .filter((l) => {
        const pos = rec.playbackPositions[l.id] ?? 0;
        const isCompleted = rec.completedLessonIds.includes(l.id);
        return pos > 0 || isCompleted || l.id === rec.lastAccessedLessonId;
      })
      .map((lesson) => ({
        courseId: course.id,
        courseTitle: course.title,
        lesson,
        completed: rec.completedLessonIds.includes(lesson.id),
      }));
  });

  return (
    <DashboardLayout title="My Learning">
      <div className="space-y-6">
        {/* Welcome / Student Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="min-w-0">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white truncate">
              Welcome back, {user?.fullName}
            </h2>
            <p className="text-xs sm:text-sm text-[#B8BED4]">
              {user?.title} · {enrolledCourses.length}{' '}
              {enrolledCourses.length === 1 ? 'enrolled course' : 'enrolled courses'}
            </p>
          </div>
          <Link
            to="/courses"
            className="text-xs font-semibold text-[#A5F51F] hover:underline self-start sm:self-auto whitespace-nowrap"
          >
            Browse Course Catalog →
          </Link>
        </section>

        {/* Continue Learning */}
        {activeCourseSummary ? (
          <section className="rounded-xl bg-[#131728] border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-4">
              <CourseArtwork
                variant={activeCourseSummary.course.artworkVariant}
                title={activeCourseSummary.course.title}
                className="h-36 md:h-full"
              />
            </div>
            <div className="md:col-span-8 p-5 sm:p-6 flex flex-col justify-between gap-4 min-w-0">
              <div className="space-y-2 min-w-0">
                <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#A5F51F]">
                  Continue Learning
                </p>
                <h3 className="font-display text-lg sm:text-2xl font-extrabold text-white leading-snug">
                  {activeCourseSummary.course.title}
                </h3>
                {activeCourseSummary.resumeLesson && (
                  <p className="text-xs sm:text-sm text-[#B8BED4] truncate">
                    Current lesson:{' '}
                    <span className="text-white font-medium">
                      {activeCourseSummary.resumeLesson.title}
                    </span>
                  </p>
                )}
                <div className="pt-1">
                  <CourseProgress
                    completed={activeCourseSummary.stats.completed}
                    total={activeCourseSummary.stats.total}
                    percent={activeCourseSummary.stats.percent}
                  />
                </div>
              </div>

              {activeCourseSummary.resumeLesson && (
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to={`/learn/${activeCourseSummary.course.id}/${activeCourseSummary.resumeLesson.id}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] rounded-lg bg-[#A5F51F] px-5 py-2.5 text-sm font-bold text-[#0B0D17] hover:bg-[#B3FA38] whitespace-nowrap"
                  >
                    <Play className="w-4 h-4 fill-current shrink-0" />
                    {activeCourseSummary.stats.completed > 0 ||
                    Boolean(activeCourseSummary.record?.lastAccessedLessonId)
                      ? 'Continue Learning'
                      : 'Start Learning'}
                  </Link>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="rounded-xl bg-[#131728] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-display text-xl font-bold text-white">
                Start Your First Course
              </h3>
              <p className="text-sm text-[#B8BED4]">
                Explore available engineering courses and enroll to begin tracking your progress.
              </p>
            </div>
            <Link
              to="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-sm font-bold hover:bg-[#B3FA38] whitespace-nowrap"
            >
              Browse Courses
            </Link>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* My Courses & Completed Courses */}
          <div className="lg:col-span-7 space-y-6 min-w-0">
            <section className="rounded-xl bg-[#131728] border border-white/10 p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-white">
                  My Courses ({courseSummaries.length})
                </h3>
                <Link
                  to="/dashboard/courses"
                  className="text-xs font-semibold text-[#A5F51F] hover:underline whitespace-nowrap"
                >
                  View All →
                </Link>
              </div>

              {courseSummaries.length === 0 ? (
                <p className="text-sm text-[#7F87A3]">No enrolled courses yet.</p>
              ) : (
                <div className="space-y-3">
                  {courseSummaries.map(({ course, stats, record, resumeLesson }) => {
                    const isDone = stats.total > 0 && stats.completed >= stats.total;
                    return (
                      <article
                        key={course.id}
                        className="rounded-xl bg-[#1A1F35] border border-white/10 overflow-hidden flex flex-col sm:flex-row"
                      >
                        <div className="sm:w-36 shrink-0">
                          <CourseArtwork
                            variant={course.artworkVariant}
                            title={course.title}
                            className="h-28 sm:h-full"
                          />
                        </div>
                        <div className="flex-1 p-4 space-y-2.5 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                            <div className="min-w-0">
                              <p className="font-mono text-[11px] text-[#A5F51F]">{course.category}</p>
                              <h4 className="font-display text-base font-bold text-white leading-snug">
                                {course.title}
                              </h4>
                              {resumeLesson && (
                                <p className="text-xs text-[#B8BED4] truncate mt-0.5">
                                  Current: <span className="text-white">{resumeLesson.title}</span>
                                </p>
                              )}
                            </div>
                            {resumeLesson && (
                              <Link
                                to={`/learn/${course.id}/${resumeLesson.id}`}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-xs font-bold hover:bg-[#B3FA38] whitespace-nowrap shrink-0"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                {isDone
                                  ? 'Review'
                                  : stats.completed > 0 || Boolean(record?.lastAccessedLessonId)
                                  ? 'Continue Learning'
                                  : 'Start'}
                              </Link>
                            )}
                          </div>

                          <CourseProgress
                            completed={stats.completed}
                            total={stats.total}
                            percent={stats.percent}
                            size="sm"
                          />
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Completed Courses */}
            <section className="rounded-xl bg-[#131728] border border-white/10 p-4 sm:p-6 space-y-3">
              <h3 className="font-display text-lg font-bold text-white">
                Completed Courses ({completedCourses.length})
              </h3>
              {completedCourses.length === 0 ? (
                <p className="text-xs sm:text-sm text-[#7F87A3]">
                  Complete all lessons in an enrolled course to see it listed here.
                </p>
              ) : (
                <div className="space-y-2.5">
                  {completedCourses.map(({ course }) => (
                    <div
                      key={course.id}
                      className="rounded-lg bg-[#1A1F35] border border-white/10 px-4 py-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-[#A5F51F] shrink-0" />
                        <span className="text-sm font-semibold text-white truncate">
                          {course.title}
                        </span>
                      </div>
                      <Link
                        to="/dashboard/certificates"
                        className="text-xs font-semibold text-[#A5F51F] hover:underline shrink-0"
                      >
                        Certificate
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Last Accessed Lessons & Account Information */}
          <div className="lg:col-span-5 space-y-6 min-w-0">
            <section className="rounded-xl bg-[#131728] border border-white/10 p-4 sm:p-6 space-y-3">
              <h3 className="font-display text-lg font-bold text-white">
                Last Accessed Lessons
              </h3>
              {recentlyAccessedLessons.length === 0 ? (
                <p className="text-xs text-[#7F87A3]">
                  Lessons you open or complete will appear here for quick access.
                </p>
              ) : (
                <div className="divide-y divide-white/10">
                  {recentlyAccessedLessons.slice(0, 5).map((item) => (
                    <Link
                      key={`${item.courseId}-${item.lesson.id}`}
                      to={`/learn/${item.courseId}/${item.lesson.id}`}
                      className="py-3 flex items-center justify-between gap-3 hover:text-[#A5F51F] transition-colors min-h-[44px]"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">
                          {item.lesson.title}
                        </p>
                        <p className="text-[11px] text-[#7F87A3] truncate">{item.courseTitle}</p>
                      </div>
                      <span className="font-mono text-[11px] text-[#A5F51F] shrink-0">
                        {item.completed ? 'Done' : item.lesson.durationLabel}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-xl bg-[#131728] border border-white/10 p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#A5F51F] shrink-0" /> Account Information
                </h3>
                <Link
                  to="/dashboard/profile"
                  className="text-xs font-semibold text-[#A5F51F] hover:underline whitespace-nowrap"
                >
                  Edit Profile
                </Link>
              </div>
              <dl className="text-xs text-[#B8BED4] space-y-2">
                <div className="flex justify-between gap-3">
                  <dt className="text-[#7F87A3] shrink-0">Name</dt>
                  <dd className="text-white font-medium text-right truncate">{user?.fullName}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#7F87A3] shrink-0">Email</dt>
                  <dd className="text-white font-medium text-right truncate">{user?.email}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#7F87A3] shrink-0">Role</dt>
                  <dd className="text-white font-medium text-right truncate">{user?.title}</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
