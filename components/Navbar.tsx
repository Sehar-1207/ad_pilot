"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sun,
  Moon,
  Menu,
  X,
  Home,
  Briefcase,
  Tag,
  Mail,
  LogIn,
} from "lucide-react";
import Image from "next/image";
import logo from "@/public/ad-logo.png";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Briefcase },
    { name: "Pricing", href: "/pricing", icon: Tag },
    { name: "Contact Us", href: "/contact", icon: Mail },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--bg-surface)]/80 border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-gradient-to-tr from-[#2DD4BF] to-[#3B82F6] shadow-sm">
              <Image
                src={logo}
                alt="Ad Pilot Logo"
                width={28}
                height={28}
                priority
                style={{ width: "auto", height: "auto" }}
                className="object-contain"
              />
            </div>

            <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              Ad Pilot
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--text-primary)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] rounded-full transition-all duration-300 ${
                      isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl bg-[var(--bg-accent)] text-[var(--text-primary)] hover:opacity-80 transition-all duration-200"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>

            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] hover:opacity-90 rounded-xl shadow-sm transition-all duration-200 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Log in
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg bg-[var(--bg-accent)] text-[var(--text-primary)]"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--bg-accent)] focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-4 pt-2 pb-6 space-y-3 transition-all duration-300">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? "text-[var(--text-primary)] bg-[var(--bg-accent)] border-l-4 border-[#3B82F6]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-accent)]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[var(--border-color)] flex flex-col space-y-2">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-center text-sm font-medium text-white bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] rounded-xl"
            >
              <LogIn className="w-4 h-4" />
              Log in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
