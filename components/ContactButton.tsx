"use client";

import React from "react";
import Link from "next/link";
import { Headphones, ArrowRight, Sparkles } from "lucide-react";

interface ContactSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function ContactSection({
  title = "Facing any issues or need assistance?",
  description = "Our support team is available 24/7 to help you resolve connection errors, technical bugs, or account setup questions.",
  buttonText = "Contact Support",
}: ContactSectionProps) {
  return (
    <section className="relative w-full py-16 md:py-24 border-y border-[var(--border-color)] bg-[var(--bg-primary)] overflow-hidden transition-colors duration-300">
    
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#3B82F6]/10 to-[#2DD4BF]/10 blur-[100px] rounded-full" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        <div className="relative mb-6 group">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] opacity-30 blur-sm group-hover:opacity-60 transition-opacity duration-300" />
          <div className="relative w-14 h-14 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[#3B82F6] shadow-md transition-transform duration-300 group-hover:scale-105">
            <Headphones className="w-7 h-7" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4 max-w-2xl leading-tight">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mb-9 leading-relaxed">
          {description}
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] hover:opacity-95 rounded-2xl shadow-md shadow-[#3B82F6]/20 hover:shadow-xl hover:shadow-[#3B82F6]/30 hover:-translate-y-0.5 transition-all duration-200 group"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1" />
        </Link>

      </div>
    </section>
  );
}