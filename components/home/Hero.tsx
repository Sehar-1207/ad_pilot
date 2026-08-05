"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { FaFacebook, FaInstagram, FaMeta } from "react-icons/fa6";

interface FeatureBadge {
  id: string;
  text: string;
  icon: React.ReactNode;
}

interface PlatformBadge {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const features: FeatureBadge[] = [
  {
    id: "no-card",
    text: "No credit card required",
    icon: <CheckCircle2 className="w-4 h-4 text-[#2DD4BF]" />,
  },
  {
    id: "meta-api",
    text: "Connects with Meta Marketing API",
    icon: <FaMeta className="w-4 h-4 text-[#3B82F6]" />,
  },
];

const platforms: PlatformBadge[] = [
  {
    id: "facebook",
    name: "Facebook Ads",
    icon: <FaFacebook className="w-5 h-5 text-[#1877F2]" />,
  },
  {
    id: "instagram",
    name: "Instagram Ads",
    icon: <FaInstagram className="w-5 h-5 text-[#E4405F]" />,
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 md:pt-12 md:pb-16 bg-[var(--bg-primary)]">
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] h-[200px] sm:h-[300px] bg-gradient-to-tr from-[#3B82F6]/20 to-[#2DD4BF]/20 blur-[60px] sm:blur-[120px] pointer-events-none rounded-full" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-accent)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
            <span>Next-Gen Meta Ad Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] max-w-4xl leading-[1.2] sm:leading-[1.15]">
            Optimize Your Meta Ads with{" "}
            <span className="inline-block bg-gradient-to-r from-[#3B82F6] via-[#2DD4BF] to-[#3B82F6] bg-clip-text text-transparent">
              AI Precision.
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed px-2">
            Connect your Facebook & Instagram ad accounts in minutes. Track performance, maximize ROAS, and get real-time recommendations powered by AI.
          </p>

          <div className="flex flex-col items-center gap-4 pt-2 w-full sm:w-auto">
            <Link
              href="/login"
              className="w-full sm:w-auto justify-center px-8 py-3.5 sm:py-4 text-base font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] hover:opacity-95 rounded-2xl shadow-lg shadow-[#3B82F6]/20 hover:shadow-xl hover:shadow-[#3B82F6]/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3 group"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-[var(--text-secondary)] pt-1">
              {features.map((feature, index) => (
                <React.Fragment key={feature.id}>
                  <span className="flex items-center gap-1.5">
                    {feature.icon}
                    {feature.text}
                  </span>
                  {index < features.length - 1 && (
                    <span className="hidden sm:inline text-[var(--border-color)]">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4 text-[var(--text-secondary)] opacity-80">
            {platforms.map((platform) => (
              <div key={platform.id} className="flex items-center gap-2 text-sm font-medium">
                {platform.icon}
                <span>{platform.name}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}