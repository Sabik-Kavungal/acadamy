import type { Assignment } from '../types';

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-01',
    courseId: 'course-fdai-01',
    moduleCode: 'MODULE 02',
    title: 'Structured Support Ticket Triage API',
    difficulty: 'Beginner',
    estimatedHours: 2,
    description:
      'Build a typed backend endpoint that takes messy customer bug reports and returns strictly validated JSON (severity, component, reproduction steps, and suggested owner) using Gemini structured outputs.',
    instructions: [
      'Define a Zod or Pydantic schema with strict enum values for priority and module category.',
      'Add retry and fallback validation logic for when model APIs rate-limit or hiccup.',
      'Write at least 5 unit tests to verify your schema holds up on messy real-world inputs.',
    ],
    deliverables: [
      'Clean GitHub repo with clear setup steps in the README',
      'Schema definition file and API route implementation',
      'Test output screenshot or automated test script',
    ],
    starterRepoLabel: 'axiomdev/fdai-m2-structured-triage',
  },
  {
    id: 'asg-02',
    courseId: 'course-fdai-01',
    moduleCode: 'MODULE 03',
    title: 'Hybrid pgvector RAG Service with Citations',
    difficulty: 'Intermediate',
    estimatedHours: 4,
    description:
      'Build a document ingestion and search pipeline with PostgreSQL + pgvector that combines vector similarity with full-text keyword search and returns verifiable inline citations.',
    instructions: [
      'Write a Markdown/PDF chunker that keeps section headers and metadata intact.',
      'Set up a PostgreSQL table with an HNSW vector index and a GIN tsvector index.',
      'Wire up Reciprocal Rank Fusion (RRF) and enforce tenant_id isolation right in SQL.',
    ],
    deliverables: [
      'SQL migration scripts for the pgvector schema and indexes',
      'Ingestion and hybrid search query module',
      'Sample grounded response output showing chunk citations',
    ],
    starterRepoLabel: 'axiomdev/fdai-m3-hybrid-rag',
  },
  {
    id: 'asg-03',
    courseId: 'course-fdai-01',
    moduleCode: 'MODULE 04',
    title: 'LangGraph + MCP Operational Triage Agent',
    difficulty: 'Intermediate',
    estimatedHours: 4,
    description:
      'Build a stateful LangGraph workflow connected to a custom MCP tool server that inspects operational alerts, suggests fixes, and pauses for human approval before changing anything.',
    instructions: [
      'Expose 2 read-only tools and 1 state-changing tool through an MCP server.',
      'Set a max-step budget and add a human-in-the-loop pause node in LangGraph.',
      'Log every tool call along with its latency and input/output arguments.',
    ],
    deliverables: [
      'MCP server source code with typed tool schemas',
      'LangGraph state machine definition and approval flow',
      'Recorded trace or log of an approved run',
    ],
    starterRepoLabel: 'axiomdev/fdai-m4-langgraph-mcp',
  },
  {
    id: 'asg-04',
    courseId: 'course-fdai-01',
    moduleCode: 'MODULE 06',
    title: 'Capstone: OpsCopilot AI Business Application',
    difficulty: 'Advanced',
    estimatedHours: 6,
    description:
      'Ship the containerized OpsCopilot app bringing together auth, document search, agent tool calling, Docker Compose, and an automated evaluation script.',
    instructions: [
      'Connect authenticated API routes between your frontend and backend AI services.',
      'Containerize the whole stack (web, API, PostgreSQL + pgvector) with Docker Compose.',
      'Include a 15-case evaluation script tracking retrieval hit-rate and output schema pass rate.',
    ],
    deliverables: [
      'Complete GitHub repo with docker-compose.yml',
      'Evaluation script output report',
      'Short architecture overview in README.md',
    ],
    starterRepoLabel: 'axiomdev/fdai-m6-opscopilot-capstone',
  },
  {
    id: 'asg-05',
    courseId: 'course-mobile-02',
    moduleCode: 'MODULE 02',
    title: 'Offline-First Flutter Task & Sync Client',
    difficulty: 'Intermediate',
    estimatedHours: 3,
    description:
      'Build a responsive Flutter app with Riverpod state management, encrypted local storage, and background sync against a typed REST backend.',
    instructions: [
      'Keep UI widgets cleanly separated from state providers and repository services.',
      'Save pending changes locally and sync them cleanly once the network comes back.',
      'Handle token refresh plus loading and error states smoothly on both Android and iOS.',
    ],
    deliverables: [
      'GitHub repo with a clean lib/ folder structure and README',
      'Unit tests for your state and local cache logic',
      'Short screen recording showing offline-to-online sync working',
    ],
    starterRepoLabel: 'axiomdev/mobile-m2-offline-sync',
  },
  {
    id: 'asg-06',
    courseId: 'course-mobile-02',
    moduleCode: 'MODULE 05',
    title: 'Capstone: AI-Powered Mobile Companion App',
    difficulty: 'Advanced',
    estimatedHours: 5,
    description:
      'Ship a complete AI-assisted mobile app connecting Flutter to an authenticated backend proxy for streaming AI summaries, voice/text capture, and structured storage.',
    instructions: [
      'Route all Gemini/OpenAI calls through your backend API—never ship API keys inside the mobile app.',
      'Add push notification hooks and strict request validation on your backend endpoints.',
      'Set up signed release builds and walk through the Play Store / App Store release checklist.',
    ],
    deliverables: [
      'Full-stack mobile + backend GitHub repo',
      'API contract notes and release checklist',
      'Demo video showing the full AI workflow running on a device or emulator',
    ],
    starterRepoLabel: 'axiomdev/mobile-m5-ai-companion',
  },
];
