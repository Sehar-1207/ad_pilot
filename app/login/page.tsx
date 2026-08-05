"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, X } from "lucide-react";
import { FaFacebook, FaMeta } from "react-icons/fa6";
import logo from "@/public/ad-logo.png";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="relative w-full max-w-[380px] p-6 sm:p-7 rounded-[28px] bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl flex flex-col items-center text-center backdrop-blur-sm">
        
        <Link
          href="/"
          className="absolute top-5 right-5 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-accent)] transition-all duration-200"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </Link>

        <div className="relative mb-4 mt-1">
          <div  className="relative flex items-center justify-center p-1.5 rounded-xl bg-gradient-to-tr from-[#2DD4BF] to-[#3B82F6] shadow-sm transition-transform duration-200 ">
            <Image
              src={logo}
              alt="Ad Pilot Logo"
              width={32}
              height={32}
              priority
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <h1 className="text-xl font-extrabold text-[var(--text-primary)] tracking-tight mb-5">
          {mode === "login" ? "Sign in with email" : "Create an account"}
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-3">
          {mode === "signup" && (
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-[var(--text-secondary)] pointer-events-none" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-[var(--bg-primary)] border border-transparent focus:border-[#3B82F6] text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 outline-none transition-all duration-200"
              />
            </div>
          )}

          <div className="relative flex items-center">
            <Mail className="absolute left-3.5 w-4 h-4 text-[var(--text-secondary)] pointer-events-none" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-[var(--bg-primary)] border border-transparent focus:border-[#3B82F6] text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 outline-none transition-all duration-200"
            />
          </div>

          <div className="relative flex items-center">
            <Lock className="absolute left-3.5 w-4 h-4 text-[var(--text-secondary)] pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-[var(--bg-primary)] border border-transparent focus:border-[#3B82F6] text-[var(--text-primary)] placeholder-[var(--text-secondary)]/60 outline-none transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {mode === "login" && (
            <div className="flex justify-end pt-0.5">
              <button
                type="button"
                className="text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-1 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] hover:opacity-95 shadow-md shadow-[#3B82F6]/20 active:scale-[0.99] transition-all duration-200"
          >
            {mode === "login" ? "Get Started" : "Create Account"}
          </button>
        </form>

        <div className="relative w-full flex items-center justify-center my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border-color)]/60 border-dashed" />
          </div>
          <span className="relative px-3 text-[10px] font-medium text-[var(--text-secondary)] bg-[var(--bg-surface)]">
            Or {mode === "login" ? "sign in" : "sign up"} with
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 w-full">
          <button
            type="button"
            className="flex items-center justify-center h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-accent)] transition-all duration-200 group"
          >
            <FaFacebook className="w-4 h-4 text-[#1877F2] group-hover:scale-110 transition-transform duration-200" />
          </button>

          <button
            type="button"
            className="flex items-center justify-center h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-accent)] transition-all duration-200 group"
          >
            <FaMeta className="w-4 h-4 text-[#3B82F6] group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>

        <div className="mt-5 text-xs text-[var(--text-secondary)]">
          {mode === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="font-semibold text-[#3B82F6] hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-semibold text-[#3B82F6] hover:underline"
              >
                Log in
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}