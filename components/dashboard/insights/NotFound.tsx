"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";

export default function CampaignNotFound({ onBack, }: { onBack: () => void; }) {
  return (
    <div
      className="flex min-h-[500px] items-center justify-center px-4"
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl border p-8 text-center shadow-sm transition-colors duration-300"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
        }}
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            backgroundColor: "var(--bg-accent)",
          }}
        >
          <AlertCircle
            className="h-6 w-6"
            style={{
              color: "var(--text-secondary)",
            }}
          />
        </div>

        <h2
          className="text-lg font-semibold"
          style={{
            color: "var(--text-primary)",
          }}
        >
          Campaign Not Found
        </h2>

        <p
          className="mt-2 text-sm"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Campaign could not be found or is no longer available.
        </p>

        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200"
          style={{
            backgroundColor: "var(--primary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--primary)";
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </button>
      </div>
    </div>
  );
}