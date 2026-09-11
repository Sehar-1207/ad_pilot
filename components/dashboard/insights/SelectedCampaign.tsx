"use client";

import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { Campaign } from "@/types/insights";
import {
  formatCurrency,
  formatPercent,
  formatRoas,
  getHealthClasses,
  getHealthLabel,
  getStatusClasses,
} from "@/types/utils";

type Props = {
  campaign: Campaign;
  loadingInsights: boolean;
  onReAnalyze: () => void;
  onBack: () => void;
};

export default function SelectedCampaignHeader({
  campaign,
  loadingInsights,
  onReAnalyze,
  onBack,
}: Props) {
  const healthClasses = getHealthClasses(campaign.health);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={onBack}
              className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${healthClasses.badge}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${healthClasses.dot}`}
                  />
                  {getHealthLabel(campaign.health)}
                </span>

                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                  PRO
                </span>

                {campaign.status && (
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                      campaign.status
                    )}`}
                  >
                    {campaign.status}
                  </span>
                )}
              </div>

              <h1 className="mt-3 truncate text-xl font-bold text-gray-900 sm:text-2xl">
                {campaign.name}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                AI-powered performance analysis and recommendations for this
                campaign.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onReAnalyze}
            disabled={loadingInsights}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingInsights ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}

            {loadingInsights ? "Analyzing..." : "Re-analyze"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-5 sm:grid-cols-4">
          <div>
            <p className="text-xs text-gray-500">Spend</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {formatCurrency(campaign.spend)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">ROAS</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {formatRoas(campaign.roas)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Conversions</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {campaign.conversions ?? 0}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">CTR</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {formatPercent(campaign.ctr)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}