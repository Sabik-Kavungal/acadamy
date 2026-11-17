import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Award, CheckCircle2, ExternalLink, FileText, FolderOpen, Lock } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CoursePricing,
  CourseProgress,
  EnrollmentButton,
  LearningSidebar,
  MobileCourseNavigation,
} from '../../components/courses';
import { VideoPlayer } from '../../components/player/VideoPlayer';
import { InstructorCard } from '../../components/shared/InstructorCard';
import { MockCheckoutModal } from '../../components/shared/MockCheckoutModal';
import { SITE_CONFIG } from '../../config/site';
import { useApp } from '../../context/AppContext';
import { FOUNDER_INSTRUCTOR } from '../../data/instructor';
import { progressService } from '../../services/progress.service';
import { getFlatLessons, getSortedModules } from '../../utils/courseFormatters';

export function LearnLessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const {
    user,
    settings,
    courses,
    isEnrolled,
    recordLessonAccess,
    toggleLessonComplete,
    notify,
    quickDemoLogin,
  } = useApp();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === courseId);
  const notesRef = useRef<HTMLElement>(null);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const sortedModules = useMemo(() => (course ? getSortedModules(course) : []), [course]);
  const flatLessons = useMemo(() => (course ? getFlatLessons(course) : []), [course]);

  const currentIdx = flatLessons.findIndex((l) => l.id === lessonId);
  const currentLesson = currentIdx >= 0 ? flatLessons[currentIdx] : undefined;
  const prevLesson = currentIdx > 0 ? flatLessons[currentIdx - 1] : null;
  const nextLesson =
    currentIdx >= 0 && currentIdx < flatLessons.length - 1 ? flatLessons[currentIdx + 1] : null;

  const currentModule = sortedModules.find((m) => m.id === currentLesson?.moduleId);

  const enrolled = course ? isEnrolled(course.id) : false;
  const canWatch = Boolean(enrolled || currentLesson?.isFreePreview);

  const progressRecord =
    user && course ? progressService.getCourseProgress(user.id, course.id) : null;
  const completedIds = progressRecord?.completedLessonIds ?? [];
  const isCompleted = currentLesson ? completedIds.includes(currentLesson.id) : false;
  const savedTime =
    user && course && currentLesson
      ? progressService.getPlaybackPosition(user.id, course.id, currentLesson.id)
      : 0;

  const completionStats =
    user && course
      ? progressService.getCompletionPercentage(user.id, course)
      : { completed: 0, total: flatLessons.length, percent: 0 };

  useEffect(() => {
    if (user && course && currentLesson && enrolled) {
      recordLessonAccess(course.id, currentLesson.id);
    }
  }, [user, course, currentLesson, enrolled, recordLessonAccess]);

  const handleSavePosition = useCallback(
    (seconds: number) => {
      if (user && course && currentLesson && enrolled) {
        progressService.savePlaybackPosition(user.id, course.id, currentLesson.id, seconds);
      }
    },
    [user, course, currentLesson, enrolled]
  );

  const handleToggleComplete = () => {
    if (!user) {
      notify('Sign in required', 'Sign in with Demo Student to save lesson progress.', 'info');
      return;
    }
    if (!enrolled) {
      notify('Enrollment required', 'Enroll in this course to track lesson completion.', 'info');
      setCheckoutOpen(true);
      return;
    }
    if (course && currentLesson) {
      toggleLessonComplete(course.id, currentLesson.id, currentLesson.title);
      notify(
        isCompleted ? 'Lesson marked incomplete' : 'Lesson completed',
        currentLesson.title,
        isCompleted ? 'info' : 'success'
      );
    }
  };

  if (!course || !currentLesson) {
    return (
      <div className="min-h-screen bg-[#0B0D17] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-xl bg-[#131728] border border-white/10 p-8 text-center space-y-4">
          <h1 className="font-display text-2xl font-bold">
            {!course ? 'Course Not Found' : 'Lesson Not Found'}
          </h1>
          <p className="text-sm text-[#B8BED4]">
            The requested lesson could not be found in this course.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {course && flatLessons[0] && (
              <Link
                to={`/learn/${course.id}/${flatLessons[0].id}`}
                className="px-4 py-2 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-xs font-bold"
              >
                Open First Lesson
              </Link>
            )}
            <Link
              to="/courses"
              className="px-4 py-2 rounded-lg border border-white/15 text-xs font-semibold text-white hover:bg-white/5"
            >
              Return to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayBrand = settings.brandName.replace(/\.$/, '');
  const freePreviewNumbers = flatLessons
    .map((l, idx) => (l.isFreePreview ? String(idx + 1).padStart(2, '0') : null))
    .filter(Boolean) as string[];
  const previewHintText =
    freePreviewNumbers.length > 0
      ? `Free preview available on Lesson${freePreviewNumbers.length > 1 ? 's' : ''} ${freePreviewNumbers.join(', ')}.`
      : 'Complete enrollment to unlock all lessons.';

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      {/* Top LMS Bar */}
      <header className="h-14 bg-[#131728] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/dashboard/courses"
            className="p-1.5 rounded-lg text-[#B8BED4] hover:text-white hover:bg-white/5 shrink-0"
            aria-label="Back to My Courses"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="hidden md:inline-flex items-center text-sm font-display font-extrabold text-white shrink-0 pr-3 border-r border-white/15"
          >
            {displayBrand}
            <span className="text-[#A5F51F] font-semibold ml-1">{SITE_CONFIG.brandSuffix}</span>
          </Link>
          <div className="min-w-0">
            <Link
              to={`/courses/${course.slug}`}
              className="text-[11px] text-[#A5F51F] font-semibold truncate block hover:underline"
            >
              {course.title}
            </Link>
            <p className="text-xs sm:text-sm font-bold text-white truncate">
              {currentLesson.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:block w-36">
            <CourseProgress
              completed={completionStats.completed}
              total={completionStats.total}
              percent={completionStats.percent}
              size="sm"
              showLabel={false}
            />
            <p className="font-mono text-[10px] text-[#B8BED4] mt-1 tabular-nums text-right">
              {completionStats.completed}/{completionStats.total} ({completionStats.percent}%)
            </p>
          </div>

          <Link
            to={`/learn/${course.id}/resources`}
            className="inline-flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-lg border border-white/15 text-xs font-semibold text-white hover:bg-white/5 whitespace-nowrap"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#A5F51F]" />
            <span className="hidden sm:inline">Resources</span>
          </Link>
        </div>
      </header>

      {/* Main Learning Stage + Right Desktop Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row">
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
          {/* Video Player or Lock Gate (Always First on Mobile & Desktop) */}
          {canWatch ? (
            <VideoPlayer
              src={currentLesson.videoUrl}
              title={currentLesson.title}
              lessonKey={currentLesson.id}
              initialTime={enrolled ? savedTime : 0}
              onSavePosition={enrolled ? handleSavePosition : undefined}
              onEnded={() => {
                if (user && enrolled && !isCompleted) {
                  toggleLessonComplete(course.id, currentLesson.id, currentLesson.title);
                }
              }}
              onFallbackAction={() => notesRef.current?.scrollIntoView({ behavior: 'smooth' })}
            />
          ) : (
            <div className="aspect-video rounded-xl bg-[#131728] border border-white/15 flex items-center justify-center p-6 text-center">
              <div className="max-w-md space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#0B0D17] border border-white/15 flex items-center justify-center text-[#A5F51F]">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="font-display text-xl font-bold text-white">
                  Enroll to Unlock Full Curriculum
                </h2>
                <p className="text-sm text-[#B8BED4]">
                  {previewHintText} Enroll or sign in as Demo Student to watch all lessons.
                </p>
                <div className="flex justify-center">
                  <CoursePricing
                    originalPrice={course.originalPrice}
                    launchPrice={course.launchPrice}
                    offerLabel={course.offerLabel}
                    size="sm"
                  />
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <EnrollmentButton
                    course={course}
                    onEnroll={() => setCheckoutOpen(true)}
                    variant="compact"
                  />
                  {!user && (
                    <button
                      type="button"
                      onClick={() => quickDemoLogin('student')}
                      className="min-h-[44px] px-4 py-2.5 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/5 cursor-pointer"
                    >
                      Use Demo Student
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Clear Lesson Header */}
          <section className="space-y-2">
            <p className="font-mono text-xs text-[#A5F51F]">
              {currentModule?.code} · {currentModule?.title} · {currentLesson.durationLabel}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {currentLesson.title}
            </h1>
            <p className="text-sm sm:text-base text-[#B8BED4] leading-relaxed">
              {currentLesson.description}
            </p>
          </section>

          {/* Lesson Controls + Mobile Expandable Curriculum */}
          <MobileCourseNavigation
            course={course}
            modules={sortedModules}
            currentLesson={currentLesson}
            currentModuleId={currentModule?.id}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
            isCompleted={isCompleted}
            completedIds={completedIds}
            enrolled={enrolled}
            completionStats={completionStats}
            onToggleComplete={handleToggleComplete}
            onNavigateLesson={(id) => navigate(`/learn/${course.id}/${id}`)}
          />

          {enrolled && completionStats.total > 0 && completionStats.completed >= completionStats.total && (
            <div className="rounded-xl bg-[#131728] border border-[#A5F51F]/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A5F51F] shrink-0" />
                <div>
                  <p className="font-display text-sm font-bold text-white">
                    Course Completed ({completionStats.completed}/{completionStats.total} lessons)
                  </p>
                  <p className="text-xs text-[#B8BED4]">
                    All lessons in {course.title} are marked complete.
                  </p>
                </div>
              </div>
              <Link
                to="/dashboard/certificates"
                className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-4 py-2 rounded-lg bg-[#A5F51F] text-[#0B0D17] text-xs font-bold hover:bg-[#B3FA38] whitespace-nowrap self-start sm:self-auto"
              >
                <Award className="w-4 h-4" /> View Certificate
              </Link>
            </div>
          )}

          {/* Engineering Notes */}
          {currentLesson.notes.length > 0 && (
            <section
              ref={notesRef}
              className="rounded-xl bg-[#131728] border border-white/10 p-5 sm:p-6 space-y-3"
            >
              <h2 className="font-display text-base font-bold text-white">Lesson Notes</h2>
              <ul className="space-y-2 text-sm text-[#B8BED4]">
                {currentLesson.notes.map((note) => (
                  <li key={note} className="flex items-start gap-2.5">
                    <span className="text-[#A5F51F] font-bold">·</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Lesson Resources */}
          <section className="rounded-xl bg-[#131728] border border-white/10 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-base font-bold text-white">
                Lesson Resources &amp; Files
              </h2>
              <Link
                to={`/learn/${course.id}/resources`}
                className="text-xs font-semibold text-[#A5F51F] hover:underline"
              >
                All Course Resources →
              </Link>
            </div>

            {currentLesson.resources.length === 0 ? (
              <p className="text-xs text-[#7F87A3]">No downloadable files attached to this lesson.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentLesson.resources.map((res) => (
                  <a
                    key={res.id}
                    href={res.url}
                    target={res.url.startsWith('http') ? '_blank' : undefined}
                    rel={res.url.startsWith('http') ? 'noreferrer' : undefined}
                    onClick={(e) => {
                      if (res.url.startsWith('#')) {
                        e.preventDefault();
                        notify(
                          'Demo Resource',
                          `Prepared ${res.title} (${res.sizeOrNote}) for download.`,
                          'info'
                        );
                      }
                    }}
                    className="rounded-lg bg-[#1A1F35] border border-white/10 p-3.5 flex items-center justify-between gap-3 hover:border-[#A5F51F]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-4 h-4 text-[#A5F51F] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{res.title}</p>
                        <p className="text-[11px] text-[#7F87A3]">{res.sizeOrNote}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#B8BED4] shrink-0" />
                  </a>
                ))}
              </div>
            )}
          </section>

          <InstructorCard
            instructor={course.instructor ?? FOUNDER_INSTRUCTOR}
            variant="compact"
            labelPrefix="Instructor:"
          />
        </main>

        {/* Desktop Curriculum Sidebar */}
        <LearningSidebar
          course={course}
          modules={sortedModules}
          currentLessonId={currentLesson.id}
          currentModuleId={currentModule?.id}
          completedIds={completedIds}
          enrolled={enrolled}
          completionStats={completionStats}
          expandedModules={expandedModules}
          onToggleModule={(modId, nextOpen) =>
            setExpandedModules((prev) => ({ ...prev, [modId]: nextOpen }))
          }
        />
      </div>

      <MockCheckoutModal
        course={course}
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </div>
  );
}
