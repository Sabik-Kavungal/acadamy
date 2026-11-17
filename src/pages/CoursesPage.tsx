import React, { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { CourseGrid } from '../components/courses/CourseGrid';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { LearningPathSelector } from '../components/shared/LearningPathSelector';
import { MockCheckoutModal } from '../components/shared/MockCheckoutModal';
import { useApp } from '../context/AppContext';
import type { Course, CourseCategory } from '../types';

const CATEGORY_OPTIONS: ('All' | CourseCategory)[] = [
  'All',
  'AI Engineering',
  'Mobile Engineering',
];

export function CoursesPage() {
  const { courses, isEnrolled } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCat = (searchParams.get('category') as CourseCategory | null) || 'All';
  const [selectedCategory, setSelectedCategory] = useState<'All' | CourseCategory>(
    CATEGORY_OPTIONS.includes(initialCat) ? initialCat : 'All'
  );
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [checkoutCourse, setCheckoutCourse] = useState<Course | null>(null);

  useEffect(() => {
    const paramCat = searchParams.get('category') as CourseCategory | null;
    if (paramCat && CATEGORY_OPTIONS.includes(paramCat)) {
      setSelectedCategory(paramCat);
    } else if (!paramCat) {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const availableTechs = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => c.technologies.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).sort()];
  }, [courses]);

  const handleCategoryChange = (cat: 'All' | CourseCategory) => {
    setSelectedCategory(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === 'All') {
      next.delete('category');
    } else {
      next.set('category', cat);
    }
    setSearchParams(next, { replace: true });
  };

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
      if (selectedTech !== 'All' && !c.technologies.includes(selectedTech)) return false;
      if (q) {
        const hay = `${c.title} ${c.subtitle} ${c.description} ${c.category} ${c.technologies.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [courses, query, selectedCategory, selectedTech]);

  const clearAllFilters = () => {
    setQuery('');
    setSelectedTech('All');
    handleCategoryChange('All');
  };

  const hasActiveFilters =
    query.trim() !== '' || selectedCategory !== 'All' || selectedTech !== 'All';

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Course Discovery Header & Search */}
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 border-b border-white/10 pb-7">
            <div className="space-y-2 max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
                Course Catalog
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Engineering Courses
              </h1>
              <p className="text-sm sm:text-base text-[#B8BED4]">
                Hands-on, project-based courses covering full-stack AI web systems and
                cross-platform mobile apps—taught directly by Sabik.
              </p>
            </div>

            <div className="w-full lg:w-80 relative">
              <Search className="w-4 h-4 text-[#7F87A3] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, RAG, Flutter, FastAPI..."
                aria-label="Search courses"
                className="w-full min-h-[44px] rounded-lg bg-[#131728] border border-white/15 pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
              />
            </div>
          </header>

          {/* Category & Stack Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#131728] border border-white/10 p-3.5">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Course categories">
              {CATEGORY_OPTIONS.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#A5F51F] text-[#0B0D17]'
                        : 'bg-[#0B0D17] text-[#B8BED4] border border-white/10 hover:text-white hover:border-white/25'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 ml-auto">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7F87A3]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#A5F51F]" /> Stack:
              </span>
              <select
                aria-label="Filter by technology"
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="min-h-[38px] rounded-lg bg-[#0B0D17] border border-white/15 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#A5F51F]"
              >
                {availableTechs.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All Technologies' : t}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#A5F51F] hover:underline cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" /> Reset
                </button>
              )}

              <span className="text-xs font-mono text-[#7F87A3] tabular-nums">
                {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
              </span>
            </div>
          </div>

          {/* Course Grid */}
          <CourseGrid
            courses={filteredCourses}
            isEnrolled={isEnrolled}
            onEnroll={(c) => setCheckoutCourse(c)}
            onResetFilters={clearAllFilters}
          />

          {/* Path Self-Qualification Guide */}
          <LearningPathSelector
            courses={courses}
            isEnrolled={isEnrolled}
            onEnroll={(c) => setCheckoutCourse(c)}
          />
        </div>
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
