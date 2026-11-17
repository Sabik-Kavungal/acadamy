import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/site';
import { useApp } from '../../context/AppContext';

const COURSE_CATEGORIES_NAV = [
  { label: 'All Engineering Paths', to: '/courses' },
  { label: '01 · Forward Deployed AI Engineer', to: '/courses/forward-deployed-ai-engineer' },
  {
    label: '02 · AI-Powered Mobile App Developer',
    to: '/courses/ai-powered-mobile-application-developer',
  },
];

export function Navbar() {
  const { user, settings } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const displayBrand = settings.brandName.replace(/\.$/, '');

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#0B0D17]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-[#0B0D17]/85 backdrop-blur-sm border-b border-white/[0.06]'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#A5F51F] rounded"
          >
            <svg viewBox="0 0 28 28" className="w-7 h-7 shrink-0" fill="none" aria-hidden="true">
              <circle cx="14" cy="14" r="10.5" stroke="#FFFFFF" strokeWidth="3.2" />
              <circle cx="14" cy="14" r="3" fill="#A5F51F" />
            </svg>
            <span className="font-display text-lg font-extrabold tracking-tight">
              {displayBrand}
              <span className="text-[#A5F51F] font-semibold">.</span>
              <span className="text-[#B8BED4] font-medium text-sm ml-1.5 hidden sm:inline">
                {SITE_CONFIG.brandSuffix}
              </span>
            </span>
          </Link>

          {/* Zone 2: Clean Single-line Nav Links + Courses Dropdown */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  isActive
                    ? 'text-white border-[#A5F51F]'
                    : 'text-[#B8BED4] border-transparent hover:text-white hover:border-white/30'
                }`
              }
            >
              Home
            </NavLink>

            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                aria-expanded={dropdownOpen}
                className={`inline-flex items-center gap-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 cursor-pointer ${
                  location.pathname.startsWith('/courses')
                    ? 'text-white border-[#A5F51F]'
                    : 'text-[#B8BED4] border-transparent hover:text-white hover:border-white/30'
                }`}
              >
                Courses
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180 text-[#A5F51F]' : ''}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-64 z-50">
                  <div className="rounded-xl bg-[#131728] border border-white/15 shadow-2xl p-2 space-y-0.5">
                    {COURSE_CATEGORIES_NAV.map((cat) => (
                      <Link
                        key={cat.label}
                        to={cat.to}
                        onClick={() => setDropdownOpen(false)}
                        className="block rounded-lg px-3 py-2 text-xs font-medium text-[#B8BED4] hover:bg-[#1A1F35] hover:text-[#A5F51F] transition-colors"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  isActive
                    ? 'text-white border-[#A5F51F]'
                    : 'text-[#B8BED4] border-transparent hover:text-white hover:border-white/30'
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/dashboard/courses"
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  isActive
                    ? 'text-white border-[#A5F51F]'
                    : 'text-[#B8BED4] border-transparent hover:text-white hover:border-white/30'
                }`
              }
            >
              My Learning
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-sm font-medium whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  isActive
                    ? 'text-white border-[#A5F51F]'
                    : 'text-[#B8BED4] border-transparent hover:text-white hover:border-white/30'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Zone 3: Log In / Dashboard + Primary Pill CTA */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            {user ? (
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="text-sm font-medium text-[#B8BED4] hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-[#B8BED4] hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                Log In
              </Link>
            )}
            <Link
              to="/courses"
              className="inline-flex items-center justify-center rounded-full bg-[#A5F51F] px-5 py-2.5 text-sm font-bold text-[#0B0D17] hover:bg-[#B3FA38] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(165,245,31,0.18)]"
            >
              Explore Courses
            </Link>
          </div>

          {/* Mobile / Tablet Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className="lg:hidden bg-[#131728] border-t border-white/10 px-4 py-5 space-y-4 max-h-[80vh] overflow-y-auto"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
              <Link
                to="/"
                className="px-3.5 py-2.5 rounded-lg text-sm font-medium text-white hover:bg-white/5"
              >
                Home
              </Link>
              <Link
                to="/courses"
                className="px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#A5F51F] hover:bg-white/5"
              >
                All Courses
              </Link>
              {COURSE_CATEGORIES_NAV.slice(1).map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.to}
                  className="px-6 py-2 rounded-lg text-xs font-medium text-[#B8BED4] hover:bg-white/5 hover:text-white"
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                to="/dashboard/courses"
                className="px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#B8BED4] hover:bg-white/5 hover:text-white"
              >
                My Learning
              </Link>
              <Link
                to="/about"
                className="px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#B8BED4] hover:bg-white/5 hover:text-white"
              >
                About &amp; Founder
              </Link>
              <Link
                to="/contact"
                className="px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#B8BED4] hover:bg-white/5 hover:text-white"
              >
                Contact
              </Link>
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              {user ? (
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="w-full text-center py-3 px-4 rounded-lg border border-white/15 text-sm font-semibold text-white hover:bg-white/5"
                >
                  {user.role === 'admin' ? 'Admin Panel' : 'Student Dashboard'}
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    to="/login"
                    className="text-center py-2.5 px-4 rounded-lg border border-white/15 text-sm font-semibold text-white hover:bg-white/5"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="text-center py-2.5 px-4 rounded-lg border border-white/15 text-sm font-semibold text-white hover:bg-white/5"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              <Link
                to="/courses"
                className="w-full text-center py-3 px-4 rounded-full bg-[#A5F51F] text-sm font-bold text-[#0B0D17] hover:bg-[#B3FA38]"
              >
                Explore Courses
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
