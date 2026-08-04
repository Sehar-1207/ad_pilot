"use client";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { FaFacebook, FaInstagram, FaMeta } from "react-icons/fa6";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-10 md:pt-10 md:pb-16 bg-[var(--bg-primary)]">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-[#3B82F6]/20 to-[#2DD4BF]/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-accent)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] shadow-sm">
            <Sparkles className="w-4 h-4 text-[#2DD4BF]" />
            <span>Next-Gen Meta Ad Analytics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] max-w-4xl leading-[1.15]">
            Optimize Your Meta Ads with{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#2DD4BF] to-[#3B82F6] bg-clip-text text-transparent">
              AI Precision.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Connect your Facebook & Instagram ad accounts in minutes. Track performance, maximize ROAS, and get real-time recommendations powered by AI.
          </p>
          <div className="flex flex-col items-center gap-4 pt-2">
            <Link
              href="/login"
              className="px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] hover:opacity-95 rounded-2xl shadow-lg shadow-[#3B82F6]/20 hover:shadow-xl hover:shadow-[#3B82F6]/30 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-3 group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-[var(--text-secondary)] pt-1">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2DD4BF]" />
                No credit card required
              </span>
              <span className="hidden sm:inline text-[var(--border-color)]">•</span>
              <span className="flex items-center gap-1.5">
                <FaMeta className="w-4 h-4 text-[#3B82F6]" />
                Connects with Meta Marketing API
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6 pt-4 text-[var(--text-secondary)] opacity-80">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FaFacebook className="w-5 h-5 text-[#1877F2]" /> Facebook Ads
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <FaInstagram className="w-5 h-5 text-[#E4405F]" /> Instagram Ads
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;