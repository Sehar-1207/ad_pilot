"use client";

import { RefreshCw } from "lucide-react";

type Props = { onRefresh: () => void; loading?: boolean };

export default function CampaignInsightsHeader({ onRefresh, loading = false }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Campaign Insights</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          Select a campaign to view its AI analysis and recommendations.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors duration-200 disabled:opacity-60"
        style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg-surface)", color: "var(--text-primary)" }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "var(--bg-accent)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-surface)"; }}
      >
        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        Refresh
      </button>
    </div>
  );
}