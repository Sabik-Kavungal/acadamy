import React from 'react';
import type { Course } from '../../types';
import { TechLogo } from './TechLogo';

interface CourseArtworkProps {
  variant: Course['artworkVariant'];
  title: string;
  className?: string;
}

interface PipelineStage {
  label: string;
  accent?: boolean;
  tools: Array<{ name: string; label: string }>;
}

const AI_STAGES: PipelineStage[] = [
  {
    label: 'Full-Stack UI',
    tools: [
      { name: 'React', label: 'React' },
      { name: 'Next.js', label: 'Next.js' },
      { name: 'TypeScript', label: 'TS' },
    ],
  },
  {
    label: 'API & Data',
    tools: [
      { name: 'Python', label: 'Python' },
      { name: 'FastAPI', label: 'FastAPI' },
      { name: 'PostgreSQL', label: 'Postgres' },
      { name: 'Redis', label: 'Redis' },
    ],
  },
  {
    label: 'Applied AI & Ops',
    accent: true,
    tools: [
      { name: 'Gemini', label: 'Gemini' },
      { name: 'OpenAI', label: 'OpenAI' },
      { name: 'LangGraph', label: 'RAG / MCP' },
      { name: 'Docker', label: 'Docker' },
    ],
  },
];

const MOBILE_STAGES: PipelineStage[] = [
  {
    label: 'Mobile App UI',
    accent: true,
    tools: [
      { name: 'Flutter', label: 'Flutter' },
      { name: 'Dart', label: 'Dart' },
    ],
  },
  {
    label: 'Backend & Sync',
    tools: [
      { name: 'REST APIs', label: 'REST API' },
      { name: 'PostgreSQL', label: 'Database' },
      { name: 'Firebase', label: 'Push / Auth' },
    ],
  },
  {
    label: 'Mobile AI & Store',
    tools: [
      { name: 'Gemini', label: 'Gemini AI' },
      { name: 'OpenAI', label: 'OpenAI' },
    ],
  },
];

export function CourseArtwork({ variant, title, className = 'w-full h-44' }: CourseArtworkProps) {
  const stages = variant === 'mobile' ? MOBILE_STAGES : AI_STAGES;

  return (
    <div
      role="img"
      aria-label={`${title} architecture stack`}
      className={`relative overflow-hidden bg-[#0B0D17] border-b border-white/10 select-none ${className}`}
    >
      <div className="absolute inset-0 arch-grid-bg opacity-70" />

      <div className="relative z-10 h-full w-full px-3 sm:px-4 pt-9 pb-3 flex items-center justify-center">
        <div className="w-full max-w-md grid grid-cols-3 gap-1.5 sm:gap-2 items-stretch relative">
          <div
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-1/2 -translate-y-1/2 h-px bg-[#A5F51F]/25 pointer-events-none"
          />

          {stages.map((stage) => (
            <div
              key={stage.label}
              className={`relative rounded-lg px-2 py-2 border flex flex-col justify-between gap-1.5 ${
                stage.accent
                  ? 'bg-[#161D33]/95 border-[#A5F51F]/45'
                  : 'bg-[#131728]/95 border-white/12'
              }`}
            >
              <p
                className={`font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider truncate ${
                  stage.accent ? 'text-[#A5F51F]' : 'text-[#8F98B5]'
                }`}
              >
                {stage.label}
              </p>

              <div className="grid grid-cols-2 gap-1">
                {stage.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="rounded bg-[#0B0D17]/90 border border-white/10 px-1.5 py-1 flex items-center gap-1 min-w-0"
                  >
                    <TechLogo name={tool.name} className="w-3 h-3 shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-semibold text-white/95 truncate">
                      {tool.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0B0D17]/80 to-transparent pointer-events-none"
      />
    </div>
  );
}
