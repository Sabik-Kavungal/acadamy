import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { SITE_CONFIG } from '../config/site';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2 border-b border-white/10 pb-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
              Platform Terms
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs font-mono text-[#7F87A3]">Last updated: November 2026</p>
          </div>

          <div className="space-y-6 text-sm text-[#B8BED4] leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white">1. Course Access &amp; Use</h2>
              <p>
                Enrollment grants an individual, non-transferable license to access video lessons,
                starter repositories, and engineering assignments for personal and career skill
                development.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white">2. Learning Outcomes</h2>
              <p>
                {SITE_CONFIG.brandFullName} delivers practical engineering training. Individual
                outcomes depend on hands-on practice, project execution, and continued study; we do
                not offer job guarantees or overnight mastery promises.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-display text-lg font-bold text-white">3. Questions</h2>
              <p>
                If you have questions about curriculum licensing or team access, please{' '}
                <Link to="/contact" className="text-[#A5F51F] hover:underline">
                  contact us
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
