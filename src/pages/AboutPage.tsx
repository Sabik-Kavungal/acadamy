import React from 'react';
import { ArrowRight, Code2, Cpu, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { InstructorProfile } from '../components/shared/InstructorProfile';
import { TeachingPhilosophySection } from '../components/shared/TeachingPhilosophySection';
import { SITE_CONFIG } from '../config/site';
import { FOUNDER_INSTRUCTOR } from '../data/instructor';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
          <section className="space-y-4 max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
              About {SITE_CONFIG.brandFullName} · {SITE_CONFIG.tagline}
            </p>
            <h1 className="font-display font-extrabold text-white text-balance text-[clamp(1.85rem,4vw,3.1rem)] leading-[1.1]">
              Built for Engineers Who Want to Build Real Products, Not Just Write Code.
            </h1>
            <p className="text-base text-[#B8BED4] leading-relaxed">
              {SITE_CONFIG.centralPhilosophy} {SITE_CONFIG.brandFullName} teaches product thinking,
              system architecture, full-stack and mobile engineering, applied AI integration, and
              production deployment discipline.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-xl bg-[#131728] border border-white/10 p-6 space-y-3">
              <Cpu className="w-5 h-5 text-[#A5F51F]" />
              <h2 className="font-display text-lg font-bold text-white">Systems-First AI</h2>
              <p className="text-sm text-[#B8BED4] leading-relaxed">
                Treat LLMs as one component inside resilient software: typed contracts, retries,
                access control, and clear observability.
              </p>
            </div>
            <div className="rounded-xl bg-[#131728] border border-white/10 p-6 space-y-3">
              <Code2 className="w-5 h-5 text-[#A5F51F]" />
              <h2 className="font-display text-lg font-bold text-white">Code You Can Ship</h2>
              <p className="text-sm text-[#B8BED4] leading-relaxed">
                Every module includes structured repositories, SQL migrations, and assignment specs
                that mirror real engineering tickets.
              </p>
            </div>
            <div className="rounded-xl bg-[#131728] border border-white/10 p-6 space-y-3">
              <ShieldCheck className="w-5 h-5 text-[#A5F51F]" />
              <h2 className="font-display text-lg font-bold text-white">Honest Expectations</h2>
              <p className="text-sm text-[#B8BED4] leading-relaxed">
                We never promise overnight job guarantees. Real growth comes from writing code,
                debugging edge cases, and building complete projects.
              </p>
            </div>
          </section>

          {/* Founder & Technical Architect Section */}
          <section className="space-y-6 pt-4 border-t border-white/10">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
                Founder &amp; Unified Course Instructor
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
                {FOUNDER_INSTRUCTOR.name} — {FOUNDER_INSTRUCTOR.role}
              </h2>
            </div>
            <InstructorProfile instructor={FOUNDER_INSTRUCTOR} eyebrow="Founder & Lead Instructor" />
          </section>

          {/* Teaching Philosophy Section */}
          <section className="pt-6 border-t border-white/10">
            <TeachingPhilosophySection />
          </section>

          <section className="rounded-2xl bg-[#131728] border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                {SITE_CONFIG.closingBrandMessage}
              </h2>
              <p className="text-sm text-[#B8BED4] mt-1">
                Explore Path 01 (Forward Deployed AI Engineer) or Path 02 (AI-Powered Mobile
                Application Developer) taught directly by {FOUNDER_INSTRUCTOR.name}.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-lg bg-[#A5F51F] px-5 py-3 text-sm font-bold text-[#0B0D17] hover:bg-[#93E012] whitespace-nowrap self-start sm:self-auto"
            >
              Explore Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
