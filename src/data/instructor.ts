import type { Instructor } from '../types';

export const FOUNDER_INSTRUCTOR: Instructor = {
  name: 'Sabik',
  role: 'AI Product Engineer & Software Architect',
  tagline:
    "I build practical AI products, design dependable software systems, and help developers turn ideas into working apps.",
  bio: "Sabik is an AI Product Engineer and Software Architect with 4 years of experience designing, building, and shipping web apps, mobile apps, and AI-backed products.",
  extendedBio:
    "His work covers the whole stack—from frontend and mobile UI to backend APIs, RAG pipelines, agent workflows, and Docker cloud deployments.",
  experience: '4 Years of Software & Product Engineering Experience',
  experienceYears: 4,
  productPhilosophy:
    "Good engineering balances shipping fast with keeping the architecture clean. Solid data models, clear API contracts, and thoughtful UX turn shaky prototypes into software people can actually depend on.",
  aiEngineeringFocus:
    "Treat LLMs as one reliable piece inside real software—backed by PostgreSQL + pgvector retrieval, stateful LangGraph flows, Model Context Protocol (MCP) tools, and automated checks.",
  specialties: [
    'AI Engineering & Agents',
    'RAG & pgvector',
    'LangGraph & MCP',
    'Full-Stack & Mobile Systems',
  ],
  expertise: [
    'AI Engineering & AI Product Development',
    'AI Agents & Agentic Workflows',
    'RAG Architecture',
    'LangChain & LangGraph',
    'Model Context Protocol (MCP)',
    'Flutter & Mobile Application Development',
    'React, Next.js & TypeScript',
    'Golang & Node.js',
    'Python & FastAPI',
    'PostgreSQL & Database Architecture',
    'Docker & Cloud Deployment',
    'Software Architecture & System Design',
    'UI/UX Engineering & Product Design',
  ],
  links: {
    linkedin: 'https://linkedin.com/in/sabik-dev',
    github: 'https://github.com/sabik-dev',
    website: 'https://sabik.dev',
  },
};

export interface PhilosophyPillar {
  code: string;
  title: string;
  summary: string;
}

export interface LearningCycleStep {
  step: string;
  label: string;
  detail: string;
}

export const TEACHING_PHILOSOPHY = {
  eyebrow: 'LEARN FASTER. BUILD SMARTER.',
  headline: "You Don't Need Six Months of Tutorials to Start Building Real Products.",
  leadParagraphs: [
    "Learning software engineering shouldn't mean spending six months passively watching videos, memorizing syntax, and studying tools one by one.",
    "The truth is, AI has made writing code much faster. But knowing what to build, structuring the system, making good engineering calls, and shipping reliable software still take real understanding.",
    "That's why we teach differently at AxiomDev Academy. We bring day-to-day product engineering experience into a focused, practical workflow.",
  ],
  resultsHeadline: 'Real Experience. Focused Learning. Practical Results.',
  resultsSubtitle:
    "Learn from real product engineering work, not disconnected theory.",
  motto:
    "We don't measure your progress by how many hours of video you've watched. We measure it by what you understand, what you can build, and what you can ship.",
  closingLine: "Stop spending months just learning tools. Start learning how to build products.",
  pillars: [
    {
      code: '01',
      title: 'Learn Only What Matters',
      summary:
        "Focus on the core engineering concepts, fundamentals, and architecture decisions you'll actually use.",
    },
    {
      code: '02',
      title: 'Learn Through Real Products',
      summary:
        "Don't study frameworks in a vacuum. Learn how everything fits together while building complete apps.",
    },
    {
      code: '03',
      title: 'Build Faster with AI',
      summary:
        'Use modern AI coding tools to speed up implementation, debugging, and testing without losing control of your code.',
    },
    {
      code: '04',
      title: 'Understand Engineering Decisions',
      summary:
        "See why you'd pick a certain architecture, database, or API design when building for real users.",
    },
    {
      code: '05',
      title: 'Ship Something Real',
      summary:
        'Take an idea from a blank page to a working app—test it, deploy it, and learn how to keep improving it.',
    },
  ] as PhilosophyPillar[],
  cycle: [
    {
      step: '01',
      label: 'Problem Discovery',
      detail: 'Figure out who needs the software, what problem it solves, and what constraints matter.',
    },
    {
      step: '02',
      label: 'Product Thinking',
      detail: 'Turn rough requirements into clear user flows and a realistic scope.',
    },
    {
      step: '03',
      label: 'Engineering Fundamentals',
      detail: 'Back your design with clean data models, typed interfaces, auth, and solid API contracts.',
    },
    {
      step: '04',
      label: 'System Architecture',
      detail: 'Separate your frontend, API, database, cache, and AI layers so everything stays maintainable.',
    },
    {
      step: '05',
      label: 'AI-Assisted Development',
      detail: 'Use AI tools to move faster while reviewing, testing, and owning every line that ships.',
    },
    {
      step: '06',
      label: 'Product Development',
      detail: 'Wire up your full-stack or mobile layers, RAG/AI APIs, and business workflows end to end.',
    },
    {
      step: '07',
      label: 'Production & Ownership',
      detail: 'Deploy with Docker or app stores, watch how it behaves in production, and fix issues cleanly.',
    },
  ] as LearningCycleStep[],
} as const;
