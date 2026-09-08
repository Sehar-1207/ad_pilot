"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Zap, RefreshCw } from "lucide-react";
import { getPlans } from "@/api/plan";
import apiClient from "@/api/client";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface BackendPlan {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  billingPeriod: string;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  sortOrder: number;
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
  buttonVariant: "primary" | "secondary";
  features: PlanFeature[];
  slug: string;
}

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPlans();

      const backendPlans: BackendPlan[] = response.plans || [];

      const mappedPlans: PricingPlan[] = backendPlans.map((plan) => {
        const isPro = plan.slug.toLowerCase() === "pro";

        return {
          id: plan._id,
          name: plan.name,
          monthlyPrice: plan.price,
          period: `/${plan.billingPeriod || "month"}`,
          description: plan.description,
          popular: plan.isPopular,
          badge: plan.isPopular ? "Most Popular" : undefined,
          buttonText: isPro ? "Buy Pro" : "Get Started Free",
          buttonVariant: isPro ? "primary" : "secondary",
          slug: plan.slug,
          features: plan.features.map((feature) => ({
            text: feature,
            included: true,
          })),
        };
      });

      setPlans(mappedPlans);
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Unable to load pricing plans."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePlanClick = async (plan: PricingPlan) => {
    if (plan.slug.toLowerCase() !== "pro") {
      window.location.href = "/login";
      return;
    }

    try {
      setCheckoutLoading(plan.id);
      setError("");

      const response = await apiClient.post("/subscriptions/checkout");

      const checkoutUrl =
        response.data?.checkoutUrl ||
        response.data?.url ||
        response.data?.data?.checkoutUrl ||
        response.data?.data?.url;

      if (!checkoutUrl) {
        throw new Error("Stripe checkout URL was not returned.");
      }

      window.location.href = checkoutUrl;
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          "Unable to start Stripe checkout."
      );

      setCheckoutLoading(null);
    }
  };

  if (loading) {
    return (
      <section className="w-full py-9 md:py-14 bg-[var(--bg-primary)] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-[500px] flex items-center justify-center">
            <RefreshCw className="w-6 h-6 animate-spin text-[var(--primary)]" />
          </div>
        </div>
      </section>
    );
  }

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
        </div>

        {error && (
          <div className="max-w-4xl mx-auto mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-4 items-stretch">
          {plans.map((plan) => {
            const isPro = plan.slug.toLowerCase() === "pro";
            const isCheckingOut = checkoutLoading === plan.id;

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
                      ${plan.monthlyPrice}
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
                      <div
                        key={`${plan.id}-${fIdx}`}
                        className="flex items-start gap-3 text-sm"
                      >
                        <div className="mt-0.5 p-0.5 rounded-full shrink-0 transition-colors bg-[#2DD4BF]/15 text-[#2DD4BF]">
                          <Check className="w-3.5 h-3.5" />
                        </div>

                        <span className="text-[var(--text-primary)] font-medium">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {isPro ? (
                  <button
                    type="button"
                    onClick={() => handlePlanClick(plan)}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 px-6 rounded-2xl text-sm font-semibold text-center transition-all duration-200 block bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] text-white hover:opacity-95 shadow-md shadow-[#3B82F6]/20 group-hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Redirecting to Stripe...
                      </span>
                    ) : (
                      plan.buttonText
                    )}
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="w-full py-3.5 px-6 rounded-2xl text-sm font-semibold text-center transition-all duration-200 block bg-[var(--bg-accent)] text-[var(--text-primary)] hover:bg-[var(--border-color)] border border-[var(--border-color)]"
                  >
                    {plan.buttonText}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}