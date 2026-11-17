import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { SITE_CONFIG } from '../config/site';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 border-b border-white/10 pb-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
              Legal &amp; Privacy
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-[#7F87A3]">Last updated: November 2026</p>
          </div>

          <div className="space-y-6 text-sm text-[#B8BED4] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white">1. Information We Collect</h2>
              <p>
                {SITE_CONFIG.brandFullName} collects account registration details (name, email,
                phone number, and optional developer links) along with course enrollment records,
                lesson progress, and assignment submissions required to operate your learning
                workspace.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white">2. How Data Is Stored</h2>
              <p>
                In this interactive demo environment, user preferences, enrollments, and progress
                are persisted locally in your browser storage without transmitting sensitive
                credentials to third-party trackers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white">3. Contact</h2>
              <p>
                For privacy or account inquiries, reach out to{' '}
                <a
                  href={`mailto:${SITE_CONFIG.supportEmail}`}
                  className="text-[#A5F51F] hover:underline"
                >
                  {SITE_CONFIG.supportEmail}
                </a>{' '}
                or visit our{' '}
                <Link to="/contact" className="text-[#A5F51F] hover:underline">
                  Contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
