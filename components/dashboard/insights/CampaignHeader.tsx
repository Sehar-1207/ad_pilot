"use client";

import { RefreshCw } from "lucide-react";

type Props = {
  onRefresh: () => void;
  loading?: boolean;
};

export default function CampaignInsightsHeader({
  onRefresh,
  loading = false,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Campaign Insights
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Select a campaign to view its AI analysis and recommendations.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
      >
        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        Refresh
      </button>
    </div>
  );
}