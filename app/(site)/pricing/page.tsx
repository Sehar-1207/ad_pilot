"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Zap } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  period: string;
  description: string;
  popular?: boolean;
  badge?: string;
  buttonText: string;
  buttonHref: string;
  buttonVariant: "primary" | "secondary";
  features: PlanFeature[];
}

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    monthlyPrice: 0,
    period: "/month",
    description: "Ideal for individual creators and marketers exploring AI ad optimization.",
    buttonText: "Get Started Free",
    buttonHref: "/login",
    buttonVariant: "secondary",
    features: [
      { text: "1 Meta Ad Account link", included: true },
      { text: "Real-time spend & ROAS tracking", included: true },
      { text: "Basic campaign performance metrics", included: true },
      { text: "Gemini AI diagnostic audits (3/mo)", included: true },
      { text: "Smart Budget pacing & rules", included: false },
      { text: "Instant CPA & CTR alerts", included: false },
      { text: "Priority email support", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro Pilot",
    monthlyPrice: 15,
    period: "/month",
    description: "Designed for scaling brands and agencies seeking maximum ROAS with AI.",
    popular: true,
    badge: "Most Popular",
    buttonText: "Start 14-Day Free Trial",
    buttonHref: "/login?plan=pro",
    buttonVariant: "primary",
    features: [
      { text: "Up to 5 Meta Ad Accounts", included: true },
      { text: "Real-time spend, Clicks, CPC & ROAS", included: true },
      { text: "Advanced campaign metrics & analytics", included: true },
      { text: "Unlimited Gemini AI audits & recommendations", included: true },
      { text: "Automated Smart Budget pacing guardrails", included: true },
      { text: "Custom real-time CPA & CTR alerts", included: true },
      { text: "24/7 Priority support & onboarding", included: true },
    ],
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  return (
    <section className="w-full py-9 md:py-14 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-accent)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]">
            <Zap className="w-4 h-4 text-[#3B82F6]" />
            <span>Simple, Transparent Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Predictable plans for{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] bg-clip-text text-transparent">
              every stage.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Start for free, upgrade when you’re ready to scale your campaigns.
          </p>

          <div className="pt-4 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-medium transition-colors cursor-pointer ${
                !isAnnual ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </span>

            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              aria-label="Toggle annual billing"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6.5 rounded-full bg-[var(--bg-accent)] border border-[var(--border-color)] p-0.5 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
            >
              <div
                className={`w-5 h-5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] transition-transform duration-200 shadow-sm ${
                  isAnnual ? "translate-x-5.5" : "translate-x-0"
                }`}
              />
            </button>

            <span
              className={`text-sm font-medium transition-colors cursor-pointer ${
                isAnnual ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual <span className="text-xs text-[#2DD4BF] font-semibold">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-4 items-stretch">
          {plans.map((plan) => {
            const price =
              isAnnual && plan.monthlyPrice > 0
                ? Math.round(plan.monthlyPrice * 0.8)
                : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 bg-[var(--bg-surface)] border transition-all duration-300 flex flex-col justify-between group ${
                  plan.popular
                    ? "border-[#3B82F6] shadow-xl shadow-[#3B82F6]/10 hover:shadow-2xl hover:shadow-[#3B82F6]/20 hover:-translate-y-1.5"
                    : "border-[var(--border-color)] shadow-sm hover:border-[#3B82F6]/50 hover:shadow-md hover:-translate-y-1.5"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] text-white text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md z-10">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed min-h-[40px]">
                      {plan.description}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[var(--border-color)]">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
                      ${price}
                    </span>
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                      {plan.period}
                    </span>
                  </div>

                  <div className="space-y-3.5 mb-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-4">
                      What's Included:
                    </p>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-sm">
                        <div
                          className={`mt-0.5 p-0.5 rounded-full shrink-0 transition-colors ${
                            feature.included
                              ? "bg-[#2DD4BF]/15 text-[#2DD4BF]"
                              : "bg-[var(--bg-accent)] text-[var(--text-secondary)] opacity-40"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span
                          className={
                            feature.included
                              ? "text-[var(--text-primary)] font-medium"
                              : "text-[var(--text-secondary)] line-through opacity-50"
                          }
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={plan.buttonHref}
                  className={`w-full py-3.5 px-6 rounded-2xl text-sm font-semibold text-center transition-all duration-200 block ${
                    plan.buttonVariant === "primary"
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] text-white hover:opacity-95 shadow-md shadow-[#3B82F6]/20 group-hover:shadow-lg"
                      : "bg-[var(--bg-accent)] text-[var(--text-primary)] hover:bg-[var(--border-color)] border border-[var(--border-color)]"
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}