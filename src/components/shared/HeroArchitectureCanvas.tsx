import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Braces, Cpu, Database, GitBranch, Layers, ShieldCheck, Terminal } from 'lucide-react';

type ArchTabKey = 'structured' | 'rag' | 'agent';

interface ArchTab {
  key: ArchTabKey;
  label: string;
  title: string;
  summary: string;
  nodes: Array<{ id: string; label: string; sub: string; accent?: boolean }>;
  codeTitle: string;
  codeSnippet: string;
}

const ARCH_TABS: ArchTab[] = [
  {
    key: 'structured',
    label: '01. Structured API',
    title: 'Schema-Enforced Model Gateway',
    summary: 'Proxy Gemini calls behind authenticated routes with strict Zod/Pydantic response contracts.',
    nodes: [
      { id: 'n1', label: 'Client Request', sub: 'REST / Auth Guard' },
      { id: 'n2', label: 'Gemini SDK', sub: 'JSON Schema Mode', accent: true },
      { id: 'n3', label: 'Zod Validator', sub: 'Typed DB Commit' },
    ],
    codeTitle: 'triage.schema.ts',
    codeSnippet: `const TriageOutput = z.object({
  severity: z.enum(["low", "high", "critical"]),
  service: z.string(),
  nextAction: z.string(),
});`,
  },
  {
    key: 'rag',
    label: '02. Hybrid RAG',
    title: 'PostgreSQL + pgvector Retrieval',
    summary: 'Combine HNSW vector similarity with SQL full-text ranking and strict tenant isolation.',
    nodes: [
      { id: 'n1', label: 'Chunker + Embed', sub: 'Section-Aware' },
      { id: 'n2', label: 'pgvector HNSW', sub: 'Hybrid RRF Query', accent: true },
      { id: 'n3', label: 'Grounded Answer', sub: 'Inline Citations' },
    ],
    codeTitle: 'hybrid_search.sql',
    codeSnippet: `SELECT id, content, 1 - (embedding <=> $1) AS score
FROM doc_chunks
WHERE tenant_id = $2
ORDER BY embedding <=> $1 LIMIT 8;`,
  },
  {
    key: 'agent',
    label: '03. LangGraph + MCP',
    title: 'Bounded Stateful Tool Agent',
    summary: 'Orchestrate multi-step tool calls via MCP servers with checkpointed human approvals.',
    nodes: [
      { id: 'n1', label: 'LangGraph State', sub: 'Max Step Guard' },
      { id: 'n2', label: 'MCP Tool Server', sub: 'Typed Read/Write', accent: true },
      { id: 'n3', label: 'Human Approval', sub: 'Audit Trace Log' },
    ],
    codeTitle: 'agent_graph.py',
    codeSnippet: `graph.add_conditional_edges(
  "planner",
  route_tool_or_finish,
  {"mcp_tool": "approval_gate", "end": END}
)`,
  },
];

export function HeroArchitectureCanvas() {
  const [activeKey, setActiveKey] = useState<ArchTabKey>('agent');
  const active = ARCH_TABS.find((t) => t.key === activeKey) ?? ARCH_TABS[0];

  return (
    <div className="relative rounded-2xl bg-[#131728] border border-white/10 overflow-hidden shadow-2xl">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 arch-grid-bg opacity-80 pointer-events-none" />

      {/* Top Workbench Header & Interactive Mode Switcher */}
      <div className="relative z-10 border-b border-white/10 bg-[#0B0D17]/80 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#B8BED4]">
          <Terminal className="w-3.5 h-3.5 text-[#A5F51F] shrink-0" />
          <span className="truncate">AI Systems Architecture Blueprint</span>
        </div>

        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Architecture patterns">
          {ARCH_TABS.map((tab) => {
            const isSelected = tab.key === activeKey;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveKey(tab.key)}
                className={`px-2.5 py-1.5 rounded-md text-[11px] font-mono font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#A5F51F] text-[#0B0D17] font-bold'
                    : 'bg-[#1A1F35] text-[#B8BED4] hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Architecture Stage */}
      <div className="relative z-10 p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-base sm:text-lg font-bold text-white">
              {active.title}
            </h2>
            <p className="text-xs text-[#B8BED4] mt-0.5">{active.summary}</p>
          </div>
          <span className="font-mono text-[11px] text-[#A5F51F] shrink-0">
            Production Pattern
          </span>
        </div>

        {/* 3-Node Animated Pipeline Diagram */}
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative"
        >
          {active.nodes.map((node, idx) => {
            const Icon =
              idx === 0 ? Layers : idx === 1 ? (active.key === 'rag' ? Database : Cpu) : ShieldCheck;
            return (
              <div
                key={node.id}
                className={`relative rounded-xl p-3.5 border transition-colors ${
                  node.accent
                    ? 'bg-[#1A1F35] border-[#A5F51F]/45'
                    : 'bg-[#0B0D17]/75 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Icon
                    className={`w-4 h-4 ${node.accent ? 'text-[#A5F51F]' : 'text-[#B8BED4]'}`}
                  />
                  <span className="font-mono text-[10px] text-[#7F87A3]">STEP 0{idx + 1}</span>
                </div>
                <p className="font-display text-sm font-bold text-white">{node.label}</p>
                <p className="font-mono text-[11px] text-[#B8BED4] mt-0.5">{node.sub}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Code Contract Preview */}
        <div className="rounded-xl bg-[#0B0D17] border border-white/10 overflow-hidden">
          <div className="px-3.5 py-2 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-[#7F87A3]">
            <span className="inline-flex items-center gap-1.5 text-[#B8BED4]">
              <Braces className="w-3.5 h-3.5 text-[#A5F51F]" />
              {active.codeTitle}
            </span>
            <span className="inline-flex items-center gap-1">
              <GitBranch className="w-3 h-3" /> main
            </span>
          </div>
          <pre className="p-3.5 text-[11px] sm:text-xs font-mono text-[#E2E8F0] overflow-x-auto leading-relaxed">
            <code>{active.codeSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
