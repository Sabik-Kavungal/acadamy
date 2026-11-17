import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/site';
import { useApp } from '../../context/AppContext';
import { FOUNDER_INSTRUCTOR } from '../../data/instructor';

export function Footer() {
  const { settings } = useApp();
  const displayBrand = settings.brandName.replace(/\.$/, '');

  return (
    <footer className="bg-[#080A12] border-t border-white/10 text-[#B8BED4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="inline-flex items-center gap-2 text-white">
              <span className="font-display text-lg font-extrabold tracking-tight">
                {displayBrand}
                <span className="text-[#A5F51F] font-semibold">.</span>{' '}
                <span className="text-[#A5F51F] font-semibold">{SITE_CONFIG.brandSuffix}</span>
              </span>
            </Link>
            <p className="text-sm text-[#7F87A3] leading-relaxed max-w-xs">
              Practical software and AI engineering courses taught by {FOUNDER_INSTRUCTOR.name}.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-white mb-3">Courses</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/courses" className="text-[#A5F51F] hover:underline">
                  All Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/forward-deployed-ai-engineer"
                  className="hover:text-white transition-colors"
                >
                  Forward Deployed AI Engineer
                </Link>
              </li>
              <li>
                <Link
                  to="/courses/ai-powered-mobile-application-developer"
                  className="hover:text-white transition-colors"
                >
                  AI-Powered Mobile App Developer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-white mb-3">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/dashboard/courses" className="hover:text-white transition-colors">
                  My Learning
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About &amp; Instructor
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold text-white mb-3">Account &amp; Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${settings.supportEmail}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {settings.supportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#7F87A3]">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.brandFullName}.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href={FOUNDER_INSTRUCTOR.links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={FOUNDER_INSTRUCTOR.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={FOUNDER_INSTRUCTOR.links.website}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
