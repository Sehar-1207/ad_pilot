"use client";

import React from "react";
import { Activity, Wallet, Bot, BellRing, LucideIcon } from "lucide-react";

interface FeatureItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

const problemsSolves: FeatureItem[] = [
  {
    id: "real-time-performance",
    icon: Activity,
    title: "Real-time Performance",
    description:
      "Aggregate Spend, Clicks, CPC, and ROAS into one unified dashboard without constantly refreshing Meta.",
    gradient: "from-[#3B82F6] to-[#60A5FA]",
  },
  {
    id: "smart-budget-pacing",
    icon: Wallet,
    title: "Smart Budget Pacing",
    description:
      "Prevent overspending on underperforming ad sets with automated rules and intelligent budget guardrails.",
    gradient: "from-[#2DD4BF] to-[#14B8A6]",
  },
  {
    id: "gemini-ai-audits",
    icon: Bot,
    title: "Gemini AI Audits",
    description:
      "Get instant AI suggestions to optimize ad creatives, refine copy, and sharpen target audience parameters.",
    gradient: "from-[#6366F1] to-[#8B5CF6]",
  },
  {
    id: "custom-alerts",
    icon: BellRing,
    title: "Custom Alerts",
    description:
      "Receive instant notifications right when CPA spikes or CTR fluctuates drastically across campaigns.",
    gradient: "from-[#EC4899] to-[#F43F5E]",
  },
];

export default function Features() {
  return (
    <section className="w-full py-12 md:py-20 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <h2 className="text-xs uppercase font-bold tracking-widest text-[#2DD4BF]">
            Why AdPilot
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Start optimizing your ad campaigns with data-driven precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {problemsSolves.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[#3B82F6]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-white mb-5 shadow-sm group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div 
                  aria-hidden="true" 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#2DD4BF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}