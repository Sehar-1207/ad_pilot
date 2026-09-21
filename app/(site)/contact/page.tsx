"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { sendContactMessage } from "@/api/contact";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const phoneNo = "+92 2000222789";
const email = "techxenSolution@gmail.com";
const address = "Faisalabad, Pakistan";

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await sendContactMessage(formData);

      if (response?.success) {
        setIsSubmitted(true);

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setError(
          response?.message ||
            response?.error ||
            "Failed to send your message. Please try again.",
        );
      }
    } catch (err: any) {
      console.error("Contact form error:", err);

      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-9 md:py-14 bg-[var(--bg-primary)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-accent)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)]">
            <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
            <span>We're Here to Help</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Get in touch with{" "}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] bg-clip-text text-transparent">
              our team.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Have questions about our AI campaign optimization or custom
            enterprise setup? Send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-3xl p-8 bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Contact Information
              </h2>

              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Reach out directly or fill out the form. Our support and
                onboarding specialists respond within 24 hours.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[var(--bg-accent)] border border-[var(--border-color)] text-[#3B82F6] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--text-secondary)] font-medium">
                      Email Us
                    </p>

                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-[var(--text-primary)] hover:underline"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[var(--bg-accent)] border border-[var(--border-color)] text-[#2DD4BF] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--text-secondary)] font-medium">
                      Call Us
                    </p>

                    <a
                      href={`tel:${phoneNo.replace(/\s+/g, "")}`}
                      className="text-sm font-semibold text-[var(--text-primary)] hover:underline"
                    >
                      {phoneNo}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[var(--bg-accent)] border border-[var(--border-color)] text-[#3B82F6] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>

                  <div>
                    <p className="text-xs text-[var(--text-secondary)] font-medium">
                      Headquarters
                    </p>

                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-[var(--bg-accent)] border border-[var(--border-color)] text-[#2DD4BF] shrink-0">
                <Clock className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Priority Support Hours
                </h3>

                <p className="text-xs text-[var(--text-secondary)]">
                  Mon - Fri: 24 Hours | Sat - Sun: 9am - 5pm EST
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl p-8 bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#2DD4BF]/15 text-[#2DD4BF] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-[var(--text-primary)]">
                  Message Sent!
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
                  Thank you for reaching out. A representative from our team
                  will get back to you shortly.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setError("");
                  }}
                  className="mt-4 px-6 py-2.5 rounded-2xl text-xs font-semibold bg-[var(--bg-accent)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--border-color)] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-[var(--text-primary)]"
                    >
                      Your Name
                    </label>

                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-accent)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-[var(--text-primary)]"
                    >
                      Email Address
                    </label>

                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-accent)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold text-[var(--text-primary)]"
                  >
                    Subject
                  </label>

                  <input
                    required
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Question about Pro Pilot plan"
                    className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-accent)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-[#3B82F6] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-[var(--text-primary)]"
                  >
                    Message
                  </label>

                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your team and how we can help..."
                    className="w-full px-4 py-3 rounded-2xl bg-[var(--bg-accent)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)]/50 focus:outline-none focus:border-[#3B82F6] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] hover:opacity-95 shadow-md shadow-[#3B82F6]/20 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
