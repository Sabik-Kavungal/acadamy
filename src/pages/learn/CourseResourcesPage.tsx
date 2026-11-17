import React from 'react';
import { ArrowLeft, Download, ExternalLink, FileCode2, FileText } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer';
import { Navbar } from '../../components/layout/Navbar';
import { InstructorCard } from '../../components/shared/InstructorCard';
import { useApp } from '../../context/AppContext';
import { FOUNDER_INSTRUCTOR } from '../../data/instructor';

export function CourseResourcesPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { courses, notify } = useApp();

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-2xl bg-[#131728] border border-white/10 p-8 text-center space-y-4">
            <h1 className="font-display text-2xl font-bold">Course Resources Not Found</h1>
            <p className="text-sm text-[#B8BED4]">
              The requested course resources could not be found.
            </p>
            <Link
              to="/courses"
              className="inline-block px-5 py-2.5 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-xs font-bold"
            >
              Browse Courses
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const firstLessonId = course.modules[0]?.lessons[0]?.id;

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <Link
                to={firstLessonId ? `/learn/${course.id}/${firstLessonId}` : '/dashboard/courses'}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A5F51F] hover:underline mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Video Player
              </Link>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {course.title} — Course Resources
              </h1>
              <p className="text-sm text-[#B8BED4] mt-1">
                Centralized starter repositories, architecture slides, SQL schemas, and study guides.
              </p>
            </div>
            <InstructorCard
              instructor={course.instructor ?? FOUNDER_INSTRUCTOR}
              variant="inline"
              labelPrefix="Instructed by"
            />
          </div>

          <div className="space-y-6">
            {course.modules.map((mod) => {
              const modResources = mod.lessons.flatMap((l) =>
                l.resources.map((r) => ({ ...r, lessonTitle: l.title }))
              );
              return (
                <section
                  key={mod.id}
                  className="rounded-xl bg-[#1A1F35] border border-white/10 p-6 space-y-4"
                >
                  <div>
                    <p className="font-mono text-xs text-[#A5F51F]">{mod.code}</p>
                    <h2 className="font-display text-lg font-bold text-white">{mod.title}</h2>
                  </div>

                  {modResources.length === 0 ? (
                    <p className="text-xs text-[#7F87A3]">No files attached to this module.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {modResources.map((res) => (
                        <a
                          key={res.id}
                          href={res.url}
                          target={res.url.startsWith('http') ? '_blank' : undefined}
                          rel={res.url.startsWith('http') ? 'noreferrer' : undefined}
                          onClick={(e) => {
                            if (res.url.startsWith('#')) {
                              e.preventDefault();
                              notify(
                                'Demo Resource Download',
                                `${res.title} (${res.sizeOrNote}) ready.`,
                                'info'
                              );
                            }
                          }}
                          className="rounded-lg bg-[#131728] border border-white/10 p-4 flex items-center justify-between gap-3 hover:border-[#A5F51F]/50 transition-colors"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            {res.type === 'github' ? (
                              <FileCode2 className="w-5 h-5 text-[#A5F51F] shrink-0 mt-0.5" />
                            ) : (
                              <FileText className="w-5 h-5 text-[#A5F51F] shrink-0 mt-0.5" />
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-white truncate">{res.title}</p>
                              <p className="text-xs text-[#7F87A3] truncate">{res.lessonTitle}</p>
                              <p className="text-[11px] font-mono text-[#B8BED4] mt-1">
                                {res.sizeOrNote}
                              </p>
                            </div>
                          </div>
                          {res.type === 'github' ? (
                            <ExternalLink className="w-4 h-4 text-[#B8BED4] shrink-0" />
                          ) : (
                            <Download className="w-4 h-4 text-[#B8BED4] shrink-0" />
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
