import React, { useMemo, useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { INITIAL_FAQS } from '../data/faqs';
import type { FAQItem } from '../types';

const FAQ_CATEGORIES: Array<'All' | FAQItem['category']> = [
  'All',
  'Curriculum',
  'Pricing',
  'Careers',
  'Access & Demo',
];

export function FaqPage() {
  const [category, setCategory] = useState<'All' | FAQItem['category']>('All');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(INITIAL_FAQS[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INITIAL_FAQS.filter((f) => {
      if (category !== 'All' && f.category !== category) return false;
      if (q && !`${f.question} ${f.answer}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [category, query]);

  return (
    <div className="min-h-screen bg-[#0B0D17] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#A5F51F]">
              Help Center
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-[#B8BED4]">
              Clear answers on prerequisites, curriculum depth, pricing, and demo mode.
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#7F87A3] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions..."
                aria-label="Search FAQs"
                className="w-full rounded-lg bg-[#131728] border border-white/15 pl-10 pr-4 py-3 text-sm text-white placeholder-[#7F87A3] focus:outline-none focus:border-[#A5F51F]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    category === cat
                      ? 'bg-[#A5F51F] text-[#0B0D17]'
                      : 'bg-[#131728] text-[#B8BED4] border border-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {filtered.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                  >
                    <div>
                      <span className="font-mono text-[11px] font-semibold text-[#A5F51F]">
                        {faq.category}
                      </span>
                      <h2 className="font-display text-base font-bold text-white mt-0.5">
                        {faq.question}
                      </h2>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#B8BED4] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#A5F51F]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-4 text-sm text-[#B8BED4] leading-relaxed">{faq.answer}</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="rounded-xl bg-[#131728] border border-white/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold text-white">Still have questions?</h3>
              <p className="text-sm text-[#B8BED4]">Send us a note directly through our contact page.</p>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-lg bg-[#A5F51F] text-[#0B0D17] font-bold text-sm hover:bg-[#93E012] whitespace-nowrap text-center"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
