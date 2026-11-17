import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useApp } from '../../context/AppContext';
import { progressService } from '../../services/progress.service';

export function StudentProgressPage() {
  const { user, courses, isEnrolled } = useApp();
  const enrolledCourses = courses.filter((c) => isEnrolled(c.id));
  const defaultCourse = enrolledCourses[0] ?? courses.find((c) => c.featured) ?? courses[0];

  const [selectedCourseId, setSelectedCourseId] = useState<string>(defaultCourse?.id ?? '');
  const activeCourse = courses.find((c) => c.id === selectedCourseId) ?? defaultCourse;

  const record =
    user && activeCourse ? progressService.getCourseProgress(user.id, activeCourse.id) : null;
  const completedIds = record?.completedLessonIds ?? [];

  const moduleChartData =
    activeCourse?.modules.map((mod) => {
      const done = mod.lessons.filter((l) => completedIds.includes(l.id)).length;
      return {
        name: mod.code.replace('MODULE ', 'M'),
        completed: done,
        remaining: Math.max(0, mod.lessons.length - done),
      };
    }) ?? [];

  return (
    <DashboardLayout title="Learning Progress">
      <div className="space-y-8">
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
          <>
            <section className="rounded-xl bg-[#1A1F35] border border-white/10 p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#A5F51F]">Module Completion Chart</p>
                <h2 className="font-display text-xl font-bold text-white mt-0.5">
                  {activeCourse.title}
                </h2>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moduleChartData} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="name" stroke="#7F87A3" fontSize={12} />
                    <YAxis stroke="#7F87A3" fontSize={12} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0B0D17',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '8px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="completed" name="Completed Lessons" fill="#A5F51F" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="remaining" name="Remaining Lessons" fill="#373754" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="font-display text-lg font-bold text-white">Module-by-Module Checklist</h3>
              <div className="space-y-4">
                {activeCourse.modules.map((mod) => {
                  const doneCount = mod.lessons.filter((l) => completedIds.includes(l.id)).length;
                  return (
                    <div
                      key={mod.id}
                      className="rounded-xl bg-[#1A1F35] border border-white/10 p-5 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-xs text-[#A5F51F]">{mod.code}</span>
                          <h4 className="font-display text-base font-bold text-white">
                            {mod.title}
                          </h4>
                        </div>
                        <span className="font-mono text-xs text-[#B8BED4] tabular-nums">
                          {doneCount} / {mod.lessons.length} completed
                        </span>
                      </div>

                      <div className="divide-y divide-white/5">
                        {mod.lessons.map((lesson) => {
                          const done = completedIds.includes(lesson.id);
                          return (
                            <div
                              key={lesson.id}
                              className="py-2.5 flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                {done ? (
                                  <CheckCircle2 className="w-4 h-4 text-[#A5F51F] shrink-0" />
                                ) : (
                                  <Circle className="w-4 h-4 text-[#7F87A3] shrink-0" />
                                )}
                                <span
                                  className={`text-sm truncate ${
                                    done ? 'text-white' : 'text-[#B8BED4]'
                                  }`}
                                >
                                  {lesson.title}
                                </span>
                              </div>
                              <Link
                                to={`/learn/${activeCourse.id}/${lesson.id}`}
                                className="text-xs font-semibold text-[#A5F51F] hover:underline shrink-0"
                              >
                                {done ? 'Review' : 'Start'}
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
