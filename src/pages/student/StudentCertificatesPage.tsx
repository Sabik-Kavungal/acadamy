import React, { useState } from 'react';
import { Award, Lock, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { SITE_CONFIG } from '../../config/site';
import { useApp } from '../../context/AppContext';
import { FOUNDER_INSTRUCTOR } from '../../data/instructor';
import { progressService } from '../../services/progress.service';

export function StudentCertificatesPage() {
  const { user, courses, isEnrolled } = useApp();
  const enrolledCourses = courses.filter((c) => isEnrolled(c.id));
  const defaultCourse = enrolledCourses[0] ?? courses.find((c) => c.featured) ?? courses[0];

  const [selectedCourseId, setSelectedCourseId] = useState<string>(defaultCourse?.id ?? '');
  const activeCourse = courses.find((c) => c.id === selectedCourseId) ?? defaultCourse;

  const stats =
    user && activeCourse
      ? progressService.getCompletionPercentage(user.id, activeCourse)
      : { completed: 0, total: 0, percent: 0 };

  const unlocked = Boolean(activeCourse && isEnrolled(activeCourse.id) && stats.percent === 100);

  return (
    <DashboardLayout title="Certificates">
      <div className="space-y-6">
        <p className="text-sm text-[#B8BED4]">
          Complete 100% of lessons in an enrolled course to unlock your demo completion certificate.
        </p>

        {courses.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            {courses.map((course) => {
              const active = course.id === activeCourse?.id;
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => setSelectedCourseId(course.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#A5F51F] text-[#0B0D17]'
                      : 'bg-[#131728] text-[#B8BED4] border border-white/10 hover:text-white'
                  }`}
                >
                  {course.title}
                </button>
              );
            })}
          </div>
        )}

        {activeCourse && (
          <div className="rounded-2xl bg-[#1A1F35] border border-white/15 p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#0B0D17] border border-[#A5F51F]/40 flex items-center justify-center text-[#A5F51F]">
                  {unlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-white">{activeCourse.title}</h2>
                  <p className="text-xs text-[#B8BED4] tabular-nums">
                    Progress: {stats.completed} / {stats.total} lessons ({stats.percent}%)
                  </p>
                </div>
              </div>

              {unlocked ? (
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-xs font-bold hover:bg-[#93E012] cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Certificate
                </button>
              ) : (
                <Link
                  to="/dashboard/progress"
                  className="px-4 py-2.5 rounded-lg border border-white/20 text-xs font-semibold text-white hover:bg-white/5 self-start"
                >
                  View Remaining Lessons
                </Link>
              )}
            </div>

            {/* Certificate Preview Surface */}
            <div className="rounded-xl bg-[#0B0D17] border border-white/10 p-6 sm:p-10 text-center space-y-4">
              <p className="font-mono text-xs tracking-widest uppercase text-[#A5F51F]">
                {SITE_CONFIG.brandFullName} · Certificate Preview (Demo)
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {user?.fullName}
              </h3>
              <p className="text-sm text-[#B8BED4] max-w-lg mx-auto">
                {unlocked
                  ? `Has completed all modules of the ${activeCourse.title} intensive program.`
                  : `Complete all ${stats.total} lessons to activate this completion credential.`}
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#7F87A3]">
                <span>
                  Instructed by{' '}
                  <strong className="text-white">
                    {activeCourse.instructor?.name ?? FOUNDER_INSTRUCTOR.name}
                  </strong>{' '}
                  · {activeCourse.instructor?.role ?? FOUNDER_INSTRUCTOR.role}
                </span>
                <span aria-hidden="true">·</span>
                <span>Track: {activeCourse.category}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
