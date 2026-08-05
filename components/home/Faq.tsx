"use client";

import React, { useState } from "react";
import { ChevronDown, ShieldCheck, Code2, CalendarX, Sparkles, LucideIcon } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  icon: LucideIcon;
}

const faqs: FaqItem[] = [
  {
    id: "security",
    question: "How secure is my Meta Marketing API connection?",
    answer:
      "Extremely secure. We use official Meta OAuth 2.0 authentication, meaning we never store your personal Facebook password. All access tokens are encrypted at rest using AES-256 encryption. AdPilot operates on read and analytical scopes with strict permission guardrails.",
    icon: ShieldCheck,
  },
  {
    id: "coding-skills",
    question: "Do I need coding skills to set this up?",
    answer:
      "Not at all! Setting up AdPilot takes less than two minutes. Simply sign in, click 'Connect Meta Account', grant permissions, and our system automatically syncs your campaigns, metrics, and historical data.",
    icon: Code2,
  },
  {
    id: "cancellation",
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, absolutely. There are no contracts or long-term commitments. You can downgrade or cancel your subscription directly from your account settings with a single click at any time.",
    icon: CalendarX,
  },
  {
    id: "ai-analysis-speed",
    question: "How fast does Gemini AI analyze my ad account?",
    answer:
      "Instantaneously upon connection. As soon as your Meta Ads Manager is linked, our AI algorithms scan your ad creative performance, CPA trends, and target audience data to generate actionable insights within seconds.",
    icon: Sparkles,
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-14 md:py-20 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-xs uppercase font-bold tracking-widest text-[#2DD4BF]">
            Got Questions?
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Frequently Asked Questions
          </p>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Everything you need to know about security, setup, and subscription management.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                  type="button"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-2 rounded-xl bg-[var(--bg-accent)] text-[#3B82F6]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-[#3B82F6]" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100 px-6 pb-6" : "grid-rows-[0fr] opacity-0 px-6 pb-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pt-2 border-t border-[var(--border-color)]/50">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}