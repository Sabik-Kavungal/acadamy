import React, { useState } from 'react';
import { ArrowRight, ExternalLink, Github, Globe, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { CourseCard } from '../components/courses/CourseCard';
import { HeroEditorialStage } from '../components/shared/HeroEditorialStage';
import { InstructorPortrait } from '../components/shared/InstructorPortrait';
import { MockCheckoutModal } from '../components/shared/MockCheckoutModal';
import { useApp } from '../context/AppContext';
import { FOUNDER_INSTRUCTOR } from '../data/instructor';
import type { Course } from '../types';

const TEACHING_PILLARS = [
  {
    number: '01',
    title: 'Start with a real problem',
    body: "Before opening an editor, you'll nail down who the app is for, what workflow it handles, and how the data should fit together.",
  },
  {
    number: '02',
    title: 'Learn fundamentals while building',
    body: "Instead of memorizing syntax out of context, you'll learn APIs, databases, auth, and state management inside complete apps.",
  },
  {
    number: '03',
    title: 'Use AI tools without skipping thinking',
    body: "Use modern AI coding tools to move faster, while knowing how to review generated code, catch bugs, and own the architecture.",
  },
  {
    number: '04',
    title: 'Ship working software',
    body: "Every course wraps up with real apps you can run, test, and deploy—with clean code and documentation in your portfolio.",
  },
];

export function HomePage() {
  const { courses, isEnrolled } = useApp();
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);
  const flagship = courses.find((c) => c.featured) ?? courses[0];
  const enrolledInFlagship = flagship ? isEnrolled(flagship.id) : false;
  const firstLessonId = flagship?.modules[0]?.lessons[0]?.id;

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* SECTION 1 — PROTECTED HERO SECTION (READ-ONLY) */}
        <HeroEditorialStage
          flagship={flagship}
          enrolledInFlagship={enrolledInFlagship}
          firstLessonId={firstLessonId}
        />

        {/* SECTION 2 — TWO INDEPENDENT COURSES (UDEMY-INSPIRED DISCOVERY) */}
        <section className="py-8 sm:py-12 bg-[#0B0D17] border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-7">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div className="space-y-1.5 max-w-2xl">
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
                  Courses
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Two Independent Engineering Tracks
                </h2>
                <p className="text-sm sm:text-base text-[#B8BED4] leading-relaxed">
                  Pick the track that fits what you want to build—full-stack AI web apps or
                  cross-platform mobile apps. Each course stands on its own.
                </p>
              </div>

              <Link
                to="/courses"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#A5F51F] hover:underline self-start md:self-auto whitespace-nowrap"
              >
                Browse all courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={(c) => setCheckoutCourse(c)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — LEARNING PHILOSOPHY (CONCISE PRODUCT-FIRST APPROACH) */}
        <section className="py-10 sm:py-14 bg-[#131728]/55 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-7">
            <div className="max-w-2xl space-y-2">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
                How We Teach
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Learn to Build Real Products, Not Just Watch Tutorials
              </h2>
              <p className="text-sm sm:text-base text-[#B8BED4] leading-relaxed">
                AI tools make writing code way faster today, sure—but figuring out what to build,
                structuring the system, and making it hold up in production still takes real
                engineering judgment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {TEACHING_PILLARS.map((pillar) => (
                <div
                  key={pillar.number}
                  className="rounded-xl bg-[#131728] border border-white/10 p-5 space-y-2"
                >
                  <span className="font-mono text-xs font-bold text-[#A5F51F]">
                    {pillar.number}
                  </span>
                  <h3 className="font-display text-base font-bold text-white">{pillar.title}</h3>
                  <p className="text-sm text-[#B8BED4] leading-relaxed">{pillar.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — CREDIBLE INSTRUCTOR INTRODUCTION */}
        <section className="py-10 sm:py-14 bg-[#0B0D17] border-b border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#131728] border border-white/10 p-5 sm:p-8 flex flex-col md:flex-row items-start gap-6 sm:gap-8">
              <InstructorPortrait size="md" className="shrink-0" />

              <div className="flex-1 min-w-0 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
                      Your Instructor
                    </p>
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                      {FOUNDER_INSTRUCTOR.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-medium text-[#B8BED4]">
                      {FOUNDER_INSTRUCTOR.role} · {FOUNDER_INSTRUCTOR.experienceYears} years of
                      engineering experience
                    </p>
                  </div>

                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#A5F51F] hover:underline self-start sm:self-auto whitespace-nowrap"
                  >
                    Read full background <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <p className="text-sm sm:text-base text-[#B8BED4] leading-relaxed max-w-3xl">
                  I&apos;ve spent the last four years designing, building, and shipping full-stack
                  web apps, mobile apps, and AI-backed tools. I started AxiomDev Academy to teach
                  software engineering the way real product teams actually work—focused on clear
                  architecture, practical debugging, and shipping code that holds up in production.
                </p>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <a
                    href={FOUNDER_INSTRUCTOR.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A1F35] border border-white/10 px-3 py-2 text-xs font-semibold text-white hover:border-[#A5F51F]/60 hover:text-[#A5F51F] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                  <a
                    href={FOUNDER_INSTRUCTOR.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A1F35] border border-white/10 px-3 py-2 text-xs font-semibold text-white hover:border-[#A5F51F]/60 hover:text-[#A5F51F] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                  <a
                    href={FOUNDER_INSTRUCTOR.links.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A1F35] border border-white/10 px-3 py-2 text-xs font-semibold text-white hover:border-[#A5F51F]/60 hover:text-[#A5F51F] transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" /> Website <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — SINGLE CLEAR FINAL CTA */}
        <section className="py-10 sm:py-14 bg-[#131728]/60">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#1A1F35] border border-white/15 p-6 sm:p-10 text-center space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Ready to Start Building?
              </h2>
              <p className="text-sm sm:text-base text-[#B8BED4] max-w-xl mx-auto leading-relaxed">
                Check out the full curriculum, watch the free preview lessons, and pick the track
                that fits what you want to build.
              </p>
              <div className="pt-1">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[46px] rounded-lg bg-[#A5F51F] px-7 py-3 text-sm font-extrabold text-[#0B0D17] hover:bg-[#B3FA38] transition-colors"
                >
                  Explore Courses <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {checkoutCourse && (
        <MockCheckoutModal
          course={checkoutCourse}
          open={Boolean(checkoutCourse)}
          onClose={() => setCheckoutCourse(null)}
        />
      )}
    </div>
  );
}
