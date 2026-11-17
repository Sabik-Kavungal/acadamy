import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../../types';

interface CourseFAQProps {
  faqs: FAQItem[];
}

export function CourseFAQ({ faqs }: CourseFAQProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-bold text-white">Frequently Asked Questions</h2>
      <div className="divide-y divide-white/10 border-t border-b border-white/10">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <span className="font-display text-sm sm:text-base font-bold text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#B8BED4] shrink-0 transition-transform duration-150 ${
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
    </section>
  );
}
