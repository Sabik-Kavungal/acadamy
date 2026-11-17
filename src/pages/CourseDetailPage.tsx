import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Code2, ShieldCheck } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  CourseCurriculum,
  CourseFAQ,
  CourseHeader,
  CoursePricing,
  CoursePurchaseCard,
  EnrollmentButton,
} from '../components/courses';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { InstructorProfile } from '../components/shared/InstructorProfile';
import { MockCheckoutModal } from '../components/shared/MockCheckoutModal';
import { useApp } from '../context/AppContext';
import { INITIAL_FAQS } from '../data/faqs';
import { FOUNDER_INSTRUCTOR } from '../data/instructor';
import { progressService } from '../services/progress.service';
import { getFlatLessons } from '../utils/courseFormatters';

export function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, courses, isEnrolled, getCourseAccessState, notify } = useApp();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const course = courses.find((c) => c.slug === slug);

  const flatLessons = useMemo(() => (course ? getFlatLessons(course) : []), [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full rounded-xl bg-[#131728] border border-white/10 p-8 text-center space-y-4">
            <h1 className="font-display text-2xl font-bold text-white">Course Not Found</h1>
            <p className="text-sm text-[#B8BED4]">
              We couldn&apos;t find that course. Head back to the catalog to see our available tracks.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-lg bg-[#A5F51F] px-5 py-2.5 text-xs font-bold text-[#0B0D17] hover:bg-[#B3FA38]"
            >
              Browse All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const accessState = getCourseAccessState(course.id);
  const progressRecord = user ? progressService.getCourseProgress(user.id, course.id) : null;
  const completedIds = progressRecord?.completedLessonIds ?? [];
  const resumeLessonId = progressRecord?.lastAccessedLessonId ?? flatLessons[0]?.id;

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col pb-20 lg:pb-0">
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Main Content Column: A, C, D, E, F, G, H, I */}
            <div className="lg:col-span-8 space-y-10 sm:space-y-12 min-w-0">
              {/* A. Course Introduction */}
              <div className="rounded-xl bg-[#131728]/80 border border-white/10 p-5 sm:p-8">
                <CourseHeader course={course} />
              </div>

              {/* B. Mobile Enrollment Card (inline once directly below intro) */}
              <div className="lg:hidden">
                <CoursePurchaseCard
                  course={course}
                  enrolled={enrolled}
                  resumeLessonId={resumeLessonId}
                  onEnroll={() => setCheckoutOpen(true)}
                />
              </div>

              {/* C. Learning Outcomes */}
              {course.outcomes.length > 0 && (
                <section className="rounded-xl bg-[#131728] border border-white/10 p-5 sm:p-7 space-y-4">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                    What You Will Learn
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {course.outcomes.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm text-[#B8BED4]">
                        <CheckCircle2 className="w-4 h-4 text-[#A5F51F] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* D. Course Curriculum */}
              <CourseCurriculum
                course={course}
                enrolled={enrolled}
                completedIds={completedIds}
                onEnrollClick={() => setCheckoutOpen(true)}
                onLockedSelect={() =>
                  notify(
                    'Preview Locked',
                    'Lessons marked Preview are free to watch. Enroll anytime to unlock the rest of the course.',
                    'info'
                  )
                }
              />

              {/* E. Practical Projects */}
              <section id="projects" className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#A5F51F]">
                  <Code2 className="w-4 h-4" /> REAL-WORLD PROJECTS
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {course.capstoneProject.title}
                </h2>
                <div className="rounded-xl bg-[#131728] border border-white/10 p-5 sm:p-7 space-y-5">
                  <p className="text-sm text-[#B8BED4] leading-relaxed">
                    {course.capstoneProject.description}
                  </p>

                  {course.practicalProjects && course.practicalProjects.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {course.practicalProjects.map((proj) => (
                        <div
                          key={proj.title}
                          className="rounded-lg bg-[#0B0D17]/70 border border-white/10 p-4 space-y-1.5"
                        >
                          <h3 className="font-display text-sm font-bold text-white">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-[#B8BED4] leading-relaxed">
                            {proj.description}
                          </p>
                          {proj.stack && (
                            <p className="font-mono text-[11px] text-[#A5F51F] pt-1">
                              {proj.stack}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {course.capstoneProject.deliverables.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-white/10">
                      {course.capstoneProject.deliverables.map((d) => (
                        <div key={d} className="flex items-start gap-2 text-xs sm:text-sm text-white/90">
                          <CheckCircle2 className="w-4 h-4 text-[#A5F51F] shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* F. Requirements */}
              {course.prerequisites.length > 0 && (
                <section className="space-y-3">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                    Requirements
                  </h2>
                  <div className="rounded-xl bg-[#131728] border border-white/10 p-5 sm:p-6">
                    <ul className="space-y-2.5 text-sm text-[#B8BED4]">
                      {course.prerequisites.map((req) => (
                        <li key={req} className="flex items-start gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-[#A5F51F] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* G. Course Description (Approach, Audience & Outcomes without repeating intro) */}
              {(course.whoShouldEnroll.length > 0 || course.careerBenefits.length > 0) && (
                <section className="space-y-4">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                    About This Course
                  </h2>
                  <div className="rounded-xl bg-[#131728] border border-white/10 p-5 sm:p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {course.whoShouldEnroll.length > 0 && (
                      <div className="space-y-2.5">
                        <h3 className="font-display text-sm font-bold text-white">
                          Who This Course Is For
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-[#B8BED4]">
                          {course.whoShouldEnroll.map((person) => (
                            <li key={person} className="flex items-start gap-2">
                              <span className="text-[#A5F51F] shrink-0">·</span>
                              <span>{person}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {course.careerBenefits.length > 0 && (
                      <div className="space-y-2.5">
                        <h3 className="font-display text-sm font-bold text-white">
                          After Completing This Course
                        </h3>
                        <ul className="space-y-2 text-xs sm:text-sm text-[#B8BED4]">
                          {course.careerBenefits.map((benefit) => (
                            <li key={benefit} className="flex items-start gap-2">
                              <span className="text-[#A5F51F] shrink-0">·</span>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* H. Instructor */}
              <section id="instructor" className="space-y-4">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Instructor
                </h2>
                <InstructorProfile
                  instructor={course.instructor ?? FOUNDER_INSTRUCTOR}
                  eyebrow="Course Instructor"
                  minimal
                />
              </section>

              {/* I. FAQs */}
              <CourseFAQ faqs={INITIAL_FAQS} />
            </div>

            {/* B. Single Sticky Desktop Enrollment Card */}
            <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-20 self-start">
              <CoursePurchaseCard
                course={course}
                enrolled={enrolled}
                resumeLessonId={resumeLessonId}
                onEnroll={() => setCheckoutOpen(true)}
              />
            </aside>
          </div>
        </div>
      </main>

      {/* Mobile Compact Sticky Bottom Enrollment Bar */}
      <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden bg-[#131728]/95 backdrop-blur-md border-t border-white/15 px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2.5">
        <div className="min-w-0">
          <CoursePricing
            originalPrice={course.originalPrice}
            launchPrice={course.launchPrice}
            size="sm"
          />
        </div>
        <EnrollmentButton
          course={course}
          accessState={accessState}
          resumeLessonId={resumeLessonId}
          onEnroll={() => setCheckoutOpen(true)}
          enrollLabel="Enroll Now"
          enrolledLabel="Continue"
          variant="compact"
          className="shrink-0"
        />
      </div>

      <Footer />

      <MockCheckoutModal
        course={course}
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}
