"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Mail, MapPin } from "lucide-react";
import logo from "@/public/ad-logo.png";

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/contact" },
];

const socialLinks: SocialLink[] = [
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: <FaTwitter className="w-4 h-4" />,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: <FaLinkedin className="w-4 h-4" />,
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: <FaGithub className="w-4 h-4" />,
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: <FaInstagram className="w-4 h-4" />,
  },
];

const legalItems: string[] = ["Privacy Policy", "Terms of Service", "Cookie Settings"];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--bg-surface)] border-t border-[var(--border-color)] transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 cursor-pointer w-fit group">
              <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-gradient-to-tr from-[#2DD4BF] to-[#3B82F6] shadow-sm transition-transform duration-200 group-hover:scale-105">
                <Image
                  src={logo}
                  alt="Ad Pilot Logo"
                  width={38}
                  height={38}
                  priority
                  className="object-contain w-9 h-9"
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
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-xl bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-wider uppercase">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-wider uppercase">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalItems.map((item) => (
                <li key={item}>
                  <span className="text-sm text-[var(--text-secondary)] cursor-default select-none">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p 
            className="text-xs text-[var(--text-secondary)] text-center md:text-left"
            suppressHydrationWarning
          >
            © {currentYear} Ad Pilot Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" /> Pakistan
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#2DD4BF]" /> techxenSolutions@gmail.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}