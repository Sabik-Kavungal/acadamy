import React, { useState } from 'react';
import { ChevronDown, Code2, Cpu, ExternalLink, Github, Globe, Linkedin } from 'lucide-react';
import { FOUNDER_INSTRUCTOR } from '../../data/instructor';
import type { Instructor } from '../../types';
import { InstructorPortrait } from './InstructorPortrait';

interface InstructorProfileProps {
  instructor?: Instructor;
  eyebrow?: string;
  compactExpertise?: boolean;
  minimal?: boolean;
}

export function InstructorProfile({
  instructor = FOUNDER_INSTRUCTOR,
  eyebrow = 'Founder & Technical Architect',
  compactExpertise = false,
  minimal = false,
}: InstructorProfileProps) {
  const [showAllExpertise, setShowAllExpertise] = useState(false);

  if (minimal) {
    return (
      <div className="rounded-xl bg-[#131728] border border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-5">
        <InstructorPortrait size="md" className="shrink-0" />
        <div className="flex-1 min-w-0 space-y-3">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#A5F51F]">
              {eyebrow}
            </p>
            <h3 className="font-display text-xl font-extrabold text-white mt-0.5">
              {instructor.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-[#B8BED4]">
              {instructor.role} · {instructor.experienceYears} Years Experience
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#B8BED4] leading-relaxed">{instructor.bio}</p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href={instructor.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A1F35] border border-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:border-[#A5F51F]/60 hover:text-[#A5F51F] transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> GitHub <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a
              href={instructor.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A1F35] border border-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:border-[#A5F51F]/60 hover:text-[#A5F51F] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a
              href={instructor.links.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A1F35] border border-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:border-[#A5F51F]/60 hover:text-[#A5F51F] transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> Website <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-[#131728] border border-white/10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Portrait & Links Column */}
        <div className="lg:col-span-4 bg-[#0B0D17]/80 border-b lg:border-b-0 lg:border-r border-white/10 p-5 sm:p-8 flex flex-col items-center lg:items-start justify-between gap-4 sm:gap-6">
          <div className="w-full flex flex-col items-center lg:items-start gap-3 sm:gap-4">
            <InstructorPortrait size="lg" />
            <div className="text-center lg:text-left space-y-1 w-full">
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
                {eyebrow}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {instructor.name}
              </h3>
              <p className="text-sm font-semibold text-[#B8BED4]">{instructor.role}</p>
              <p className="text-xs font-mono text-[#7F87A3] pt-0.5">{instructor.experience}</p>
            </div>
          </div>

          <div className="w-full pt-3 sm:pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <a
              href={instructor.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A1F35] border border-white/10 px-3 py-2 text-xs font-semibold text-white hover:border-[#A5F51F]/60 hover:text-[#A5F51F] transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> GitHub <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a
              href={instructor.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A1F35] border border-white/10 px-3 py-2 text-xs font-semibold text-white hover:border-[#A5F51F]/60 hover:text-[#A5F51F] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
            <a
              href={instructor.links.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A1F35] border border-white/10 px-3 py-2 text-xs font-semibold text-white hover:border-[#A5F51F]/60 hover:text-[#A5F51F] transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> Website <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Right Narrative, Philosophy & Technical Expertise */}
        <div className="lg:col-span-8 p-5 sm:p-8 lg:p-10 space-y-5 sm:space-y-7">
          <blockquote className="text-base sm:text-xl font-display font-bold text-white leading-snug border-b border-white/10 pb-4 sm:pb-5">
            “{instructor.tagline}”
          </blockquote>

          <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-base text-[#B8BED4] leading-relaxed">
            <p>{instructor.bio}</p>
            <p className="hidden sm:block">{instructor.extendedBio}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-xl bg-[#1A1F35] border border-white/10 p-4 sm:p-5 space-y-1.5 sm:space-y-2">
              <p className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-semibold text-[#A5F51F]">
                <Code2 className="w-4 h-4" /> PRODUCT ENGINEERING PHILOSOPHY
              </p>
              <p className="text-xs sm:text-sm text-[#B8BED4] leading-relaxed">
                {instructor.productPhilosophy}
              </p>
            </div>
            <div className="rounded-xl bg-[#1A1F35] border border-white/10 p-4 sm:p-5 space-y-1.5 sm:space-y-2">
              <p className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-semibold text-[#A5F51F]">
                <Cpu className="w-4 h-4" /> AI ENGINEERING FOCUS
              </p>
              <p className="text-xs sm:text-sm text-[#B8BED4] leading-relaxed">
                {instructor.aiEngineeringFocus}
              </p>
            </div>
          </div>

          {/* Core Technical Expertise Grid (Compact collapsible on mobile; full ledger on desktop) */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                Core Technical Expertise
              </p>
              <span className="font-mono text-[11px] text-[#7F87A3] tabular-nums">
                {instructor.expertise.length} Domains
              </span>
            </div>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                compactExpertise ? '' : 'xl:grid-cols-3'
              } gap-x-6 gap-y-1.5 sm:gap-y-2 border-t border-white/10 pt-3`}
            >
              {instructor.expertise.map((skill, idx) => (
                <div
                  key={skill}
                  className={`${
                    !showAllExpertise && idx >= 4 ? 'hidden sm:flex' : 'flex'
                  } items-baseline gap-2.5 py-0.5 sm:py-1 text-xs sm:text-sm`}
                >
                  <span className="font-mono text-[11px] text-[#A5F51F] shrink-0 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#B8BED4]">{skill}</span>
                </div>
              ))}
            </div>
            {instructor.expertise.length > 4 && (
              <button
                type="button"
                onClick={() => setShowAllExpertise((prev) => !prev)}
                className="sm:hidden inline-flex items-center gap-1.5 text-xs font-semibold text-[#A5F51F] hover:underline cursor-pointer pt-1"
              >
                <span>
                  {showAllExpertise
                    ? 'Show fewer domains'
                    : `Show all ${instructor.expertise.length} expertise domains`}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    showAllExpertise ? 'rotate-180' : ''
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
