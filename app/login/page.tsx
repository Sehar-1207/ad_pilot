"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, User, Eye, EyeOff, X } from "lucide-react";
import logo from "@/public/ad-logo.png";

import { loginUser, registerUser } from "@/api/auth";

type AuthMode = "login" | "signup";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        const response = await loginUser(
          formData.email.trim(),
          formData.password
        );

        console.log("Login response:", response);
        console.log("Logged-in user:", response?.user);
        console.log("User role:", response?.user?.role);

        if (!response?.success || !response?.user) {
          throw new Error(
            response?.error || "Login failed. Please try again."
          );
        }

        if (response.user.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      } else {
        const response = await registerUser(
          formData.name.trim(),
          formData.email.trim(),
          formData.password
        );

        console.log("Registration response:", response);
        console.log("Registered user:", response?.user);
        console.log("Registered user role:", response?.user?.role);

        if (!response?.success || !response?.user) {
          throw new Error(
            response?.error ||
              "Registration failed. Please try again."
          );
        }

        if (response.user.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);

      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="relative w-full max-w-md p-6 sm:p-9 rounded-[28px] bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl flex flex-col items-center text-center backdrop-blur-sm">
        <Link
          href="/"
          className="absolute top-5 right-5 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-accent)] transition-all duration-200"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </Link>

        <div className="relative mb-4 mt-1">
          <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-gradient-to-tr from-[#2DD4BF] to-[#3B82F6] shadow-sm transition-transform duration-200">
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
          {mode === "login"
            ? "Sign in with email"
            : "Create an account"}
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-3.5">
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
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {error && (
            <div className="text-xs text-red-500 text-left px-1">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] hover:opacity-95 shadow-md shadow-[#3B82F6]/20 active:scale-[0.99] transition-all duration-200 disabled:opacity-70"
          >
            {loading
              ? mode === "login"
                ? "Signing in..."
                : "Creating Account..."
              : mode === "login"
                ? "Get Started"
                : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-xs text-[var(--text-secondary)]">
          {mode === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("signup")}
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
                onClick={() => switchMode("login")}
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