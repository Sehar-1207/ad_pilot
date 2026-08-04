"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Mail, MapPin } from "lucide-react";
import logo from "@/public/ad-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--bg-surface)] border-t border-[var(--border-color)] transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 cursor-pointer w-fit">
              <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-gradient-to-tr from-[#2DD4BF] to-[#3B82F6] shadow-sm">
                <Image
                  src={logo}
                  alt="Ad Pilot Logo"
                  width={38}
                  height={38}
                  priority
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                Ad Pilot
              </span>
            </Link>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Empower your marketing strategy with our AI-assisted ad analytical platform. Real-time data, predictive insights, and effortless growth.
            </p>

            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="p-2.5 rounded-xl bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-xl bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-xl bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2.5 rounded-xl bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-wider uppercase">
              Legal
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">
                  Cookie Settings
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-2">
          <p 
            className="text-xs text-[var(--text-secondary)] text-center md:text-left"
            suppressHydrationWarning
          >
            © {currentYear} Ad Pilot Inc. All rights reserved.
          </p>

          <div className="flex items-center space-x-6 text-xs text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Pakistan
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> techxenSolutions@gmail.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;