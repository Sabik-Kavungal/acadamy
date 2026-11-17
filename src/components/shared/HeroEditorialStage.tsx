import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Cpu,
  Layers,
  Network,
  Play,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FOUNDER_INSTRUCTOR } from '../../data/instructor';
import type { Course } from '../../types';
import { InstructorPortrait } from './InstructorPortrait';

interface HeroEditorialStageProps {
  flagship?: Course;
  enrolledInFlagship?: boolean;
  firstLessonId?: string;
}

export function HeroEditorialStage({
  flagship,
  enrolledInFlagship = false,
  firstLessonId = 'les-01-01',
}: HeroEditorialStageProps) {
  const totalLessons = flagship
    ? flagship.modules.reduce((acc, m) => acc + m.lessons.length, 0)
    : 18;
  const totalModules = flagship?.modules.length ?? 6;
  const launchPrice = flagship?.launchPrice ?? 2999;

  return (
    <section
      aria-label="AxiomDev Academy Hero"
      className="relative overflow-hidden bg-[#0E111D] border-b border-white/10 pt-5 sm:pt-7 lg:pt-7 pb-0 lg:h-[calc(100vh-4rem)] lg:min-h-[600px] lg:max-h-[860px] lg:flex lg:flex-col"
    >
      {/* Ambient Radial Atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 48% at 50% 68%, rgba(165, 245, 31, 0.08) 0%, rgba(14, 17, 29, 0) 70%), radial-gradient(45% 45% at 82% 22%, rgba(99, 102, 241, 0.14) 0%, rgba(14, 17, 29, 0) 70%), radial-gradient(40% 40% at 18% 35%, rgba(56, 189, 248, 0.06) 0%, rgba(14, 17, 29, 0) 70%)',
        }}
      />

      {/* Decorative Starburst Polygons (matching reference upper-right & lower-left) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none hidden md:block absolute top-10 right-[20%] w-24 h-24 text-white/[0.04]"
        fill="currentColor"
      >
        <polygon points="60,4 72,38 108,24 84,54 116,74 78,78 90,114 60,88 30,114 42,78 4,74 36,54 12,24 48,38" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        className="pointer-events-none hidden md:block absolute bottom-10 left-[21%] w-28 h-28 text-white/[0.04]"
        fill="currentColor"
      >
        <polygon points="60,4 72,38 108,24 84,54 116,74 78,78 90,114 60,88 30,114 42,78 4,74 36,54 12,24 48,38" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-between">
        {/* TOP CENTERED HERO HEADLINE & DUAL CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto space-y-3 sm:space-y-3.5 shrink-0"
        >
          <p className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#A5F51F]">
            AxiomDev Academy · Applied AI &amp; Software Engineering
          </p>

          <h1 className="font-display font-extrabold uppercase tracking-tight text-white text-balance text-[clamp(1.95rem,4.4vw,3.55rem)] leading-[1.03]">
            GROW YOUR AI SKILL
            <br />
            BUILD REAL SYSTEMS
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 pt-0.5">
            {enrolledInFlagship && flagship ? (
              <Link
                to={`/learn/${flagship.id}/${firstLessonId}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A5F51F] px-6 sm:px-7 py-3 text-sm font-extrabold text-[#0B0D17] shadow-[0_0_26px_rgba(165,245,31,0.28)] hover:bg-[#B3FA38] active:scale-[0.98] transition-all whitespace-nowrap"
              >
                Continue Learning <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to={flagship ? `/courses/${flagship.slug}` : '/courses'}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A5F51F] px-6 sm:px-7 py-3 text-sm font-extrabold text-[#0B0D17] shadow-[0_0_26px_rgba(165,245,31,0.28)] hover:bg-[#B3FA38] active:scale-[0.98] transition-all whitespace-nowrap"
              >
                Get Started
              </Link>
            )}

            <Link
              to={flagship ? `/learn/${flagship.id}/${firstLessonId}` : '/courses'}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4 decoration-white/60 hover:text-[#A5F51F] hover:decoration-[#A5F51F] transition-colors whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#A5F51F]" />
              Try free preview
            </Link>
          </div>
        </motion.div>

        {/* ASYMMETRIC 3-COLUMN STAGE BELOW HEADLINE (FITS SCREEN HEIGHT) */}
        <div className="mt-4 sm:mt-5 lg:mt-2 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-end min-h-0">
          {/* LEFT EDITORIAL COLUMN (Desktop Left, Mobile Order 2) */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 lg:col-span-4 pb-6 lg:pb-8 space-y-4 lg:space-y-5"
          >
            {/* Animated Hand-drawn Lightbulb + Floating AI Spark */}
            <div className="hidden lg:flex items-center gap-3 pl-2">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg
                  viewBox="0 0 96 96"
                  className="w-13 h-13 text-white/55 drop-shadow-[0_0_12px_rgba(165,245,31,0.18)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <g transform="rotate(-16 48 48)">
                    <path d="M36 58c-6-5-10-12-10-20a22 22 0 1 1 44 0c0 8-4 15-10 20l-2 9H38l-2-9Z" />
                    <path d="M40 72h16M42 78h12" />
                    <path d="M44 58V44l-5-5m13 19V44l5-5" stroke="#A5F51F" />
                    <path d="M48 8V2M22 18l-5-5M74 18l5-5M12 40H6M90 40h-6" stroke="#A5F51F" />
                  </g>
                </svg>
              </motion.div>
            </div>

            {/* Lime Square Badge + Real Program Metric */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#A5F51F] text-[#0B0D17] flex items-center justify-center shadow-[0_0_20px_rgba(165,245,31,0.22)] shrink-0">
                <Layers className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-extrabold text-white leading-none tabular-nums">
                  {totalModules} Modules
                </p>
                <p className="text-xs sm:text-sm text-[#B8BED4] mt-1">
                  Production AI Engineering
                </p>
              </div>
            </div>

            {/* Editorial Quote + Underlined Action Link */}
            <div className="space-y-2.5 max-w-xs">
              <p className="text-sm text-white/90 leading-relaxed font-medium">
                “{FOUNDER_INSTRUCTOR.tagline}”
              </p>
              <Link
                to={flagship ? `/courses/${flagship.slug}` : '/courses'}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white underline underline-offset-4 decoration-white/50 hover:text-[#A5F51F] hover:decoration-[#A5F51F] transition-colors"
              >
                LET&apos;S BUILD <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Bottom-Left Founder / Instructor Signature */}
            <div className="pt-0.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/25 bg-[#131728] shrink-0">
                <InstructorPortrait size="xs" className="w-full h-full rounded-full border-0" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-white">{FOUNDER_INSTRUCTOR.name}</p>
                <p className="text-xs text-[#B8BED4]">{FOUNDER_INSTRUCTOR.role}</p>
              </div>
            </div>
          </motion.div>

          {/* CENTER MONOCHROME EDITORIAL PORTRAIT + ANIMATED AI ICONS (Mobile Order 1) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 lg:col-span-4 relative flex flex-col items-center justify-end h-full min-h-[290px] sm:min-h-[340px] lg:min-h-0"
          >
            {/* Radial-Masked Square Grid Behind Portrait */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-2 top-0 mx-auto max-w-[310px] sm:max-w-[350px] arch-grid-bg opacity-85"
              style={{
                maskImage: 'radial-gradient(ellipse 68% 68% at 50% 54%, black 38%, transparent 82%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 68% 68% at 50% 54%, black 38%, transparent 82%)',
              }}
            />

            {/* Soft Lime Halo Behind Head/Shoulders */}
            <div
              aria-hidden="true"
              className="absolute bottom-16 w-48 h-48 rounded-full bg-[#A5F51F]/10 blur-3xl pointer-events-none"
            />

            {/* ANIMATED FLOATING AI ICONS AROUND STAGE */}
            <motion.div
              aria-hidden="true"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-3 left-3 sm:left-4 z-20 w-10 h-10 rounded-xl bg-[#131728]/90 border border-[#A5F51F]/35 flex items-center justify-center text-[#A5F51F] shadow-lg"
              title="AI Reasoning & Neural Workflows"
            >
              <BrainCircuit className="w-5 h-5" />
            </motion.div>

            <motion.div
              aria-hidden="true"
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="hidden lg:flex absolute top-6 right-4 z-20 w-10 h-10 rounded-xl bg-[#131728]/90 border border-white/20 items-center justify-center text-[#A5F51F] shadow-lg"
              title="Autonomous AI Agents"
            >
              <Bot className="w-5 h-5" />
            </motion.div>

            <motion.div
              aria-hidden="true"
              animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
              className="hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-lg bg-[#131728]/90 border border-white/15 items-center justify-center text-sky-300 shadow-lg"
            >
              <Cpu className="w-4 h-4" />
            </motion.div>

            {/* Mobile-only Floating Rotating Get-In-Touch Badge */}
            <Link
              to="/contact"
              aria-label="Get in touch with AxiomDev Academy"
              className="lg:hidden absolute top-1 right-1 z-20 group"
            >
              <div className="relative w-20 h-20 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-full h-full animate-[spin_20s_linear_infinite]">
                  <defs>
                    <path
                      id="mobileStampPath"
                      d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                    />
                  </defs>
                  <circle cx="60" cy="60" r="30" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <text fill="#E2E8F0" fontSize="9.5" fontWeight="600" letterSpacing="2.4">
                    <textPath href="#mobileStampPath">GET IN TOUCH · GET IN TOUCH ·</textPath>
                  </text>
                </svg>
                <span className="absolute w-9 h-9 rounded-full bg-[#131728]/90 border border-white/20 flex items-center justify-center text-[#A5F51F] group-hover:scale-105 transition-transform">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Bespoke Monochrome Studio Portrait Scaled Cleanly to Viewport Height */}
            <div className="relative z-10 flex items-end justify-center w-full">
              <svg
                viewBox="0 0 400 440"
                className="w-[260px] sm:w-[300px] lg:w-auto lg:h-[clamp(290px,46vh,435px)] h-auto block drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Editorial Monochrome Portrait of Engineer"
              >
                <defs>
                  <linearGradient id="monoSkin" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F1F3F7" />
                    <stop offset="55%" stopColor="#CBD2E1" />
                    <stop offset="100%" stopColor="#7C849B" />
                  </linearGradient>
                  <linearGradient id="monoHair" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2B3042" />
                    <stop offset="100%" stopColor="#0E111B" />
                  </linearGradient>
                  <linearGradient id="monoShirt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#353B4E" />
                    <stop offset="45%" stopColor="#212636" />
                    <stop offset="100%" stopColor="#121521" />
                  </linearGradient>
                  <linearGradient id="monoNeck" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8E96AD" />
                    <stop offset="50%" stopColor="#D7DCE8" />
                    <stop offset="100%" stopColor="#7A8299" />
                  </linearGradient>
                  <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="72%" stopColor="#0E111D" stopOpacity="0" />
                    <stop offset="100%" stopColor="#0E111D" stopOpacity="0.92" />
                  </linearGradient>
                </defs>

                {/* Shoulders & Dark Tee */}
                <path
                  d="M44 440 C50 356 82 320 144 306 L172 342 L200 355 L228 342 L256 306 C318 320 350 356 356 440 Z"
                  fill="url(#monoShirt)"
                  stroke="#FFFFFF"
                  strokeOpacity="0.14"
                  strokeWidth="1.2"
                />
                {/* V-Neck Collar Ribbing */}
                <path
                  d="M142 306 L200 364 L258 306"
                  fill="none"
                  stroke="#687089"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Backpack / Jacket Straps */}
                <path
                  d="M114 316 C104 358 102 400 104 440 L132 440 C130 398 132 356 140 310 Z"
                  fill="#434A61"
                  stroke="#FFFFFF"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                />
                <path
                  d="M286 316 C296 358 298 400 296 440 L268 440 C270 398 268 356 260 310 Z"
                  fill="#434A61"
                  stroke="#FFFFFF"
                  strokeOpacity="0.14"
                  strokeWidth="1"
                />
                <path d="M118 332v96M282 332v96" stroke="#181C29" strokeWidth="2" strokeDasharray="5 4" />

                {/* Neck & Clavicle */}
                <path
                  d="M168 240 L168 314 C180 340 220 340 232 314 L232 240 Z"
                  fill="url(#monoNeck)"
                />
                <path d="M168 250 Q200 278 232 250 L232 268 Q200 288 168 268 Z" fill="#5A6178" opacity="0.45" />

                {/* Ears */}
                <ellipse cx="140" cy="186" rx="10" ry="18" fill="#B5BDCE" />
                <ellipse cx="260" cy="186" rx="10" ry="18" fill="#929AB0" />

                {/* Face */}
                <path
                  d="M142 152 C142 110 166 94 200 94 C234 94 258 110 258 152 C258 196 244 234 222 252 C210 262 190 262 178 252 C156 234 142 196 142 152 Z"
                  fill="url(#monoSkin)"
                />
                <path
                  d="M236 160 C244 196 230 232 204 254 C224 246 250 218 255 174 Z"
                  fill="#6E768E"
                  opacity="0.35"
                />

                {/* Textured Hair Crown */}
                <g fill="url(#monoHair)">
                  <circle cx="152" cy="126" r="24" />
                  <circle cx="174" cy="100" r="28" />
                  <circle cx="204" cy="92" r="30" />
                  <circle cx="234" cy="104" r="27" />
                  <circle cx="252" cy="130" r="22" />
                  <circle cx="140" cy="152" r="18" />
                  <circle cx="260" cy="154" r="17" />
                  <circle cx="164" cy="82" r="18" />
                  <circle cx="194" cy="72" r="22" />
                  <circle cx="226" cy="78" r="20" />
                  <circle cx="185" cy="115" r="22" />
                  <circle cx="218" cy="116" r="22" />
                  <circle cx="146" cy="104" r="16" />
                  <circle cx="248" cy="106" r="16" />
                </g>
                <path
                  d="M164 80 C180 68 214 68 234 84"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeOpacity="0.22"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Brows & Eyes */}
                <path d="M160 163 Q174 157 188 162" fill="none" stroke="#1F2433" strokeWidth="4.2" strokeLinecap="round" />
                <path d="M212 162 Q226 157 240 163" fill="none" stroke="#1F2433" strokeWidth="4.2" strokeLinecap="round" />

                <ellipse cx="175" cy="176" rx="10" ry="5.5" fill="#F8FAFC" />
                <circle cx="176" cy="176" r="4.2" fill="#171B26" />
                <circle cx="177.5" cy="174.5" r="1.3" fill="#FFFFFF" />

                <ellipse cx="225" cy="176" rx="10" ry="5.5" fill="#F8FAFC" />
                <circle cx="224" cy="176" r="4.2" fill="#171B26" />
                <circle cx="225.5" cy="174.5" r="1.3" fill="#FFFFFF" />

                {/* Nose & Expression */}
                <path d="M200 168 L196 204 Q200 209 207 204" fill="none" stroke="#7A8299" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M191 206 Q200 212 209 206" fill="none" stroke="#4D546B" strokeWidth="2" strokeLinecap="round" />
                <path d="M182 224 Q200 231 218 224" fill="none" stroke="#2D3347" strokeWidth="3" strokeLinecap="round" />
                <path d="M189 230 Q200 235 211 230" fill="none" stroke="#8088A0" strokeWidth="1.5" strokeLinecap="round" />

                {/* Lime Edge Rim Light */}
                <path
                  d="M256 146 C259 188 245 228 222 250"
                  fill="none"
                  stroke="#A5F51F"
                  strokeOpacity="0.45"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <rect x="0" y="340" width="400" height="100" fill="url(#bottomFade)" />
              </svg>

              {/* Animated Floating AI Stack Callout Cards */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:flex items-center gap-2 rounded-lg bg-[#131728]/90 backdrop-blur-md border border-white/15 px-3 py-2 shadow-xl absolute left-0 bottom-14 lg:bottom-16"
              >
                <Terminal className="w-3.5 h-3.5 text-[#A5F51F] shrink-0" />
                <span className="font-mono text-[11px] font-semibold text-white">
                  RAG + pgvector
                </span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="hidden sm:flex items-center gap-2 rounded-lg bg-[#131728]/90 backdrop-blur-md border border-white/15 px-3 py-2 shadow-xl absolute right-0 bottom-24 lg:bottom-28"
              >
                <Network className="w-3.5 h-3.5 text-[#A5F51F] shrink-0" />
                <span className="font-mono text-[11px] font-semibold text-white">
                  LangGraph · MCP
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT EDITORIAL COLUMN (Desktop Right, Mobile Order 3) */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="order-3 lg:col-span-4 pb-8 lg:pb-8 flex flex-col items-start lg:items-end text-left lg:text-right justify-between gap-5"
          >
            {/* Circular Rotating "GET IN TOUCH" Stamp with Diagonal Arrow (Desktop) */}
            <Link
              to="/contact"
              aria-label="Get in touch with AxiomDev Academy"
              className="hidden lg:inline-flex group relative self-end"
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg viewBox="0 0 120 120" className="w-full h-full animate-[spin_22s_linear_infinite]">
                  <defs>
                    <path
                      id="desktopStampPath"
                      d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                    />
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r="31"
                    fill="none"
                    stroke="rgba(255,255,255,0.22)"
                    strokeWidth="1"
                  />
                  <text fill="#E2E8F0" fontSize="9.2" fontWeight="600" letterSpacing="2.6">
                    <textPath href="#desktopStampPath">GET IN TOUCH · GET IN TOUCH ·</textPath>
                  </text>
                </svg>
                <span className="absolute w-10 h-10 rounded-full bg-[#131728] border border-white/20 flex items-center justify-center text-white group-hover:border-[#A5F51F] group-hover:text-[#A5F51F] group-hover:scale-105 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* 5-Layer Engineering Stack Block with Animated AI Spark Icons */}
            <div className="w-full lg:w-auto flex flex-col items-start lg:items-end space-y-1">
              <p className="font-display text-base sm:text-lg font-bold text-white">
                5-Layer AI Curriculum
              </p>
              <p className="text-xs text-[#B8BED4]">
                LLMs · Structured APIs · RAG · Agents · Docker
              </p>
              <div className="flex items-center gap-1.5 pt-1" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.18, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      delay: i * 0.22,
                      ease: 'easeInOut',
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-[#A5F51F] fill-[#A5F51F]" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right-Aligned Stacked Bold Figures (Real Flagship Metrics) */}
            <div className="w-full grid grid-cols-2 lg:grid-cols-1 gap-4 pt-2 border-t border-white/10 lg:border-t-0 lg:pt-0">
              <div className="lg:text-right">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums leading-none">
                  {totalLessons}
                </p>
                <p className="text-xs text-[#B8BED4] mt-1">Hands-on Video Lessons</p>
              </div>

              <div className="lg:text-right">
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-white tabular-nums leading-none">
                  ₹{launchPrice.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-[#B8BED4] mt-1">
                  Launch Offer · 6+ Hrs
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
