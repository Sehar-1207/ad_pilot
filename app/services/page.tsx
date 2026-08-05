"use client";

import React, { useState } from "react";
import {
  Bot,
  BarChart3,
  Sliders,
  Bell,
  ShieldCheck,
  Workflow,
  ChevronDown,
} from "lucide-react";

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
}

interface FAQItem {
  question: string;
  answer: string;
}

const services: ServiceItem[] = [
  {
    id: "ai-audits",
    icon: <Bot className="w-6 h-6 text-[#3B82F6]" />,
    title: "Gemini AI Ad Audits",
    tagline: "Automated Diagnostic Engine",
    description:
      "Deep-dive into your Meta campaign setup using real-time generative intelligence to pinpoint audience fatigue, creative burnout, and wasted ad spend instantly.",
    benefits: [
      "Creative decay detection",
      "Audience overlap analysis",
      "AI recommendation engine",
    ],
  },
  {
    id: "roas-analytics",
    icon: <BarChart3 className="w-6 h-6 text-[#2DD4BF]" />,
    title: "Unified ROAS Analytics",
    tagline: "Real-Time Tracking Dashboard",
    description:
      "Eliminate attribution latency. Consolidate your spend, click-through rates, and true conversion performance into an actionable real-time portal.",
    benefits: [
      "Zero-latency metrics",
      "Cross-account tracking",
      "Custom attribution windows",
    ],
  },
  {
    id: "smart-pacing",
    icon: <Sliders className="w-6 h-6 text-[#3B82F6]" />,
    title: "Smart Budget Pacing",
    tagline: "Automated Capital Guardrails",
    description:
      "Set rule-based budget thresholds that scale top-performing ad sets automatically during peak converting hours while pausing poor performers.",
    benefits: [
      "Automated scaling rules",
      "Off-peak spend suppression",
      "Risk-free budget caps",
    ],
  },
  {
    id: "instant-alerts",
    icon: <Bell className="w-6 h-6 text-[#2DD4BF]" />,
    title: "Custom CPA & CTR Alerts",
    tagline: "Proactive Risk Shield",
    description:
      "Get notified immediately via Slack or email when your cost-per-acquisition spikes or click-through rates drop below your safety threshold.",
    benefits: [
      "Instant Slack & Email alerts",
      "Customizable threshold triggers",
      "24/7 campaign monitoring",
    ],
  },
  {
    id: "security",
    icon: <ShieldCheck className="w-6 h-6 text-[#3B82F6]" />,
    title: "Enterprise Ad Protection",
    tagline: "Secure Meta API Integration",
    description:
      "Connect your ad accounts securely with official Meta OAuth 2.0 protocols. We read performance data without requiring direct access to your payment methods.",
    benefits: [
      "Meta Business Partner standards",
      "Read-only access modes",
      "SOC-2 level encryption",
    ],
  },
  {
    id: "workflows",
    icon: <Workflow className="w-6 h-6 text-[#2DD4BF]" />,
    title: "Automated Optimization Workflows",
    tagline: "Hands-Free Optimization",
    description:
      "Connect your campaign ecosystem directly with automated actions, letting AI optimize bid strategies based on your specific target ROAS margins.",
    benefits: [
      "Dynamic bid adjustments",
      "Trigger-based automation",
      "Multi-campaign sync",
    ],
  },
];

const faqs: FAQItem[] = [
  {
    question: "How long does it take to connect my Meta Ad Account?",
    answer:
      "Integration takes less than 2 minutes. You simply log in via Meta OAuth, select the ad accounts you wish to sync, and our Gemini engine begins analyzing historical data immediately.",
  },
  {
    question:
      "Will your automated pacing change my campaigns without approval?",
    answer:
      "No. You have full control. You can choose 'Suggestion Mode' where AI suggests adjustments for your approval, or 'Autonomous Mode' with strict, pre-configured safety guardrails.",
  },
  {
    question: "Is there a limit on how many ad accounts I can connect?",
    answer:
      "The Starter plan includes 1 connected Meta Ad Account, while the Pro Pilot plan allows up to 5. For enterprise agencies needing unlimited connections, contact our team.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="w-full py-9 md:py-14 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-accent)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]">
            <Bot className="w-4 h-4 text-[#3B82F6]" />
            <span>AI-Powered Ad Management</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Comprehensive tools to{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] bg-clip-text text-transparent">
              maximize your ROAS.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Everything you need to automate, monitor, and scale your Meta
            marketing campaigns with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 items-stretch">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-3xl p-8 bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm transition-all duration-300 hover:border-[#3B82F6]/50 hover:shadow-xl hover:shadow-[#3B82F6]/10 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-2xl bg-[var(--bg-accent)] border border-[var(--border-color)] shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <span className="text-xs font-semibold text-[#2DD4BF] uppercase tracking-wider">
                    {service.tagline}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-8 border-t border-[var(--border-color)] pt-4">
                  {service.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="text-xs font-medium text-[var(--text-primary)] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] transition-colors duration-200 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[var(--text-secondary)] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#3B82F6]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)]/50 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}