"use client";
import React from "react";
import Link from "next/link";
import { Headphones, ArrowRight } from "lucide-react";

interface ContactSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Facing any issues or need assistance?",
  description = "Our support team is available 24/7 to help you resolve connection errors, technical bugs, or account setup questions.",
  buttonText = "Contact Support",
}) => {
  return (
    <section className="w-full py-16 md:py-20 border-y border-[var(--border-color)] transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        <div className="w-12 h-12 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[#3B82F6] mb-5 shadow-sm">
          <Headphones className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mb-3 max-w-2xl">
          {title}
        </h2>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mb-8 leading-relaxed">
          {description}
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] hover:opacity-95 rounded-2xl shadow-md shadow-[#3B82F6]/20 hover:shadow-lg hover:shadow-[#3B82F6]/30 hover:-translate-y-0.5 transition-all duration-200 group"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1" />
        </Link>

      </div>
    </section>
  );
};

export default ContactSection;