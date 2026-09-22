"use client";

import { Loader2, Sparkles } from "lucide-react";

interface InsightsLoadingProps {
  campaignName?: string;
}

export default function InsightsLoading({
  campaignName,
}: InsightsLoadingProps) {
  return (
    <div
      className="rounded-2xl border p-10 shadow-sm"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--bg-accent)" }}
        >
          <Sparkles className="h-6 w-6" style={{ color: "var(--primary)" }} />
        </div>

        <h2 className="mt-4 text-base font-semibold" style={{ color: "var(--text-primary)" }}>
          Analyzing {campaignName || "campaign"}
        </h2>

        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          Gemini is analyzing this campaign&apos;s performance.
        </p>

        <Loader2 className="mt-5 h-5 w-5 animate-spin" style={{ color: "var(--primary)" }} />
      </div>
    </div>
  );
}