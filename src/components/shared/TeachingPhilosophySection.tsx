import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { TEACHING_PHILOSOPHY } from '../../data/instructor';

interface TeachingPhilosophySectionProps {
  showCycle?: boolean;
}

export function TeachingPhilosophySection({ showCycle = true }: TeachingPhilosophySectionProps) {
  return (
    <div className="space-y-5 sm:space-y-7">
      {/* Header & Our Philosophy Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
        <div className="lg:col-span-7 space-y-2.5 sm:space-y-3">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
            {TEACHING_PHILOSOPHY.eyebrow}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white text-balance">
            {TEACHING_PHILOSOPHY.headline}
          </h2>
          <div className="space-y-2 text-xs sm:text-base text-[#B8BED4] leading-relaxed">
            {TEACHING_PHILOSOPHY.leadParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-xl bg-[#1A1F35] border border-[#A5F51F]/30 p-4 sm:p-6 space-y-2.5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#A5F51F]">
            Our Philosophy
          </p>
          <p className="font-display text-sm sm:text-lg font-bold text-white leading-snug">
            “{TEACHING_PHILOSOPHY.motto}”
          </p>
          <p className="text-xs sm:text-sm font-semibold text-[#A5F51F] pt-2 border-t border-white/10">
            {TEACHING_PHILOSOPHY.closingLine}
          </p>
        </div>
      </div>

      {/* 5 Focused Learning Pillars (Swipeable on mobile to cut vertical scroll; 5-col grid on desktop) */}
      <div className="space-y-1.5">
        <p className="sm:hidden font-mono text-[10px] uppercase tracking-wider text-[#7F87A3]">
          Swipe pillars →
        </p>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-5 sm:gap-4 no-scrollbar">
          {TEACHING_PHILOSOPHY.pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.code}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.3, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="min-w-[235px] snap-start sm:min-w-0 rounded-xl bg-[#131728] border border-white/10 p-4 sm:p-5 space-y-1.5 sm:space-y-2 shrink-0"
            >
              <span className="font-mono text-xs font-bold text-[#A5F51F]">{pillar.code}</span>
              <h3 className="font-display text-sm sm:text-base font-bold text-white">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#B8BED4] leading-relaxed">{pillar.summary}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Real Experience Banner + Engineering Cycle */}
      {showCycle && (
        <div className="rounded-2xl bg-[#131728] border border-white/10 p-5 sm:p-7 space-y-5">
          <div className="space-y-1">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#A5F51F]">
              {TEACHING_PHILOSOPHY.resultsHeadline}
            </p>
            <h3 className="font-display text-lg sm:text-xl font-bold text-white">
              {TEACHING_PHILOSOPHY.resultsSubtitle}
            </h3>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-1 -mx-1 px-1 sm:mx-0 sm:px-0 sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-7 no-scrollbar">
            {TEACHING_PHILOSOPHY.cycle.map((item, idx) => (
              <div
                key={item.step}
                className="min-w-[190px] snap-start sm:min-w-0 relative rounded-xl bg-[#1A1F35] border border-white/10 p-3.5 flex flex-col justify-between gap-2 shrink-0"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#A5F51F]">{item.step}</span>
                  {idx < TEACHING_PHILOSOPHY.cycle.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-[#7F87A3] hidden lg:block" />
                  )}
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-white">{item.label}</p>
                  <p className="text-[11px] text-[#B8BED4] mt-0.5 leading-snug">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
