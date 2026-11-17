import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, BrainCircuit, CheckCircle2, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course } from '../../types';
import { formatINR } from '../../utils/pricing';
import { EnrollmentButton } from '../courses/EnrollmentButton';

interface GoalOption {
  id: string;
  goal: string;
  sublabel: string;
  targetSlug: string;
  pathLabel: string;
  reason: string;
  highlights: string[];
}

const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'ai-business-products',
    goal: 'Build AI-powered business products',
    sublabel: 'Workflows, RAG knowledge systems & business APIs',
    targetSlug: 'forward-deployed-ai-engineer',
    pathLabel: 'PATH 01 · AI ENGINEERING',
    reason:
      "Forward Deployed AI Engineer walks you through turning customer problems into full-stack systems—wiring Gemini, OpenAI, and RAG into real workflows and deploying with Docker.",
    highlights: [
      'Product & System Engineering',
      'Applied AI: Gemini, OpenAI, RAG & Tool Calling',
      'Build AI Knowledge Base SaaS & Business Assistant',
    ],
  },
  {
    id: 'fullstack-ai-apps',
    goal: 'Build full-stack web apps with AI',
    sublabel: 'React, Next.js, FastAPI, PostgreSQL, Redis + AI',
    targetSlug: 'forward-deployed-ai-engineer',
    pathLabel: 'PATH 01 · AI ENGINEERING',
    reason:
      "Full-stack web and backend development is built right into Path 01—covering React, Next.js, TypeScript, Python FastAPI, PostgreSQL, Redis, auth, and cloud deployment.",
    highlights: [
      'Full-Stack Web + Backend + Database Engineering',
      'AI-Assisted Coding & Review Habits',
      'Production Docker, Monitoring & Error Handling',
    ],
  },
  {
    id: 'ai-mobile-apps',
    goal: 'Build AI-powered mobile apps',
    sublabel: 'Android & iOS with Flutter, backends & AI UX',
    targetSlug: 'ai-powered-mobile-application-developer',
    pathLabel: 'PATH 02 · MOBILE ENGINEERING',
    reason:
      "AI-Powered Mobile Application Developer takes you from mobile product thinking and Dart/Flutter architecture through backend databases, auth, AI features, and Android & iOS release.",
    highlights: [
      'Dart, Flutter & Responsive Mobile Architecture',
      'REST API, Database & Auth Integration',
      'AI Mobile Features & App Store Release',
    ],
  },
];

interface LearningPathSelectorProps {
  courses: Course[];
  isEnrolled?: (courseId: string) => boolean;
  onEnroll?: (course: Course) => void;
}

export function LearningPathSelector({
  courses,
  isEnrolled,
  onEnroll,
}: LearningPathSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>(GOAL_OPTIONS[0].id);

  const activeGoal = GOAL_OPTIONS.find((g) => g.id === selectedId) ?? GOAL_OPTIONS[0];
  const matchedCourse =
    courses.find((c) => c.slug === activeGoal.targetSlug) ?? courses[0];
  const enrolled = matchedCourse && isEnrolled ? isEnrolled(matchedCourse.id) : false;
  const firstLessonId = matchedCourse?.modules[0]?.lessons[0]?.id;
  const isMobilePath = activeGoal.targetSlug === 'ai-powered-mobile-application-developer';

  return (
    <div className="rounded-2xl bg-[#131728] border border-white/10 p-4 sm:p-8 space-y-5 sm:space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5">
        <div className="space-y-1">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
            Path Finder
          </p>
          <h3 className="font-display text-lg sm:text-2xl font-extrabold text-white">
            Not Sure Which Track Fits Best?
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#B8BED4] max-w-md">
          Both tracks stand on their own—pick what you want to build and we&apos;ll point you to the right one.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* Goal Selector Options */}
        <div
          className="lg:col-span-5 flex flex-col gap-2"
          role="radiogroup"
          aria-label="Select your engineering goal"
        >
          {GOAL_OPTIONS.map((opt) => {
            const active = opt.id === selectedId;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelectedId(opt.id)}
                className={`text-left rounded-xl p-3.5 sm:p-4 border transition-all cursor-pointer ${
                  active
                    ? 'bg-[#1A1F35] border-[#A5F51F]'
                    : 'bg-[#0B0D17]/60 border-white/10 hover:border-white/25'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className={`font-display text-sm sm:text-base font-bold ${
                        active ? 'text-[#A5F51F]' : 'text-white'
                      }`}
                    >
                      {opt.goal}
                    </p>
                    <p className="text-xs text-[#7F87A3] mt-0.5">{opt.sublabel}</p>
                  </div>
                  <span
                    className={`mt-1 w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                      active ? 'border-[#A5F51F] bg-[#A5F51F]' : 'border-white/30'
                    }`}
                  >
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#0B0D17]" />}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Recommended Path Panel */}
        {matchedCourse && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGoal.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 rounded-xl bg-[#1A1F35] border border-white/10 p-4 sm:p-6 flex flex-col justify-between gap-4 sm:gap-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-[#A5F51F]">
                    RECOMMENDED · {activeGoal.pathLabel}
                  </span>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#131728] border border-white/10 flex items-center justify-center text-[#A5F51F] shrink-0">
                    {isMobilePath ? (
                      <Smartphone className="w-4 h-4" />
                    ) : (
                      <BrainCircuit className="w-4 h-4" />
                    )}
                  </div>
                </div>

                <h4 className="font-display text-lg sm:text-xl font-extrabold text-white">
                  {matchedCourse.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#B8BED4] leading-relaxed">
                  {activeGoal.reason}
                </p>

                <ul className="space-y-1.5 pt-0.5">
                  {activeGoal.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-xs sm:text-sm text-white/95">
                      <CheckCircle2 className="w-4 h-4 text-[#A5F51F] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3.5 border-t border-white/10 space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:justify-between gap-3">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-xl font-extrabold text-white tabular-nums">
                    {formatINR(matchedCourse.launchPrice)}
                  </span>
                  {matchedCourse.originalPrice > matchedCourse.launchPrice && (
                    <span className="text-xs text-[#7F87A3] line-through tabular-nums">
                      {formatINR(matchedCourse.originalPrice)}
                    </span>
                  )}
                  <span className="font-mono text-[11px] font-bold text-[#A5F51F]">
                    {matchedCourse.offerLabel}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5">
                  <Link
                    to={`/courses/${matchedCourse.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-lg border border-white/15 bg-[#131728] px-3 sm:px-4 py-2 text-xs font-bold text-white hover:border-[#A5F51F] hover:text-[#A5F51F] transition-colors whitespace-nowrap"
                  >
                    Curriculum <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <EnrollmentButton
                    course={matchedCourse}
                    enrolled={enrolled}
                    resumeLessonId={firstLessonId}
                    onEnroll={onEnroll}
                    variant="compact"
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
