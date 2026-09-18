"use client";

import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { Campaign } from "@/types/insights";
import {formatCurrency, formatPercent, formatRoas, getHealthClasses, getHealthLabel, getStatusClasses,} from "@/types/utils";

type Props = {
  campaign: Campaign;
  loadingInsights: boolean;
  onReAnalyze: () => void;
  onBack: () => void;
};

export default function SelectedCampaignHeader({ campaign, loadingInsights, onReAnalyze, onBack,}: Props) {
  const healthClasses = getHealthClasses(campaign.health);

  return (
    <div
      className="rounded-2xl border shadow-sm transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="flex flex-col gap-5 p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={onBack}
              className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200"
              style={{
                borderColor: "var(--border-color)",
                color: "var(--text-secondary)",
                backgroundColor: "var(--bg-surface)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-accent)"; }}
              onMouseLeave={(e) => {  e.currentTarget.style.backgroundColor = "var(--bg-surface)";}}
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

                <span
                  className="rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "var(--bg-accent)",
                    color: "var(--primary)",
                  }}
                >
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

              <h1
                className="mt-3 truncate text-xl font-bold sm:text-2xl"
                style={{
                  color: "var(--text-primary)",
                }}
              >
                {campaign.name}
              </h1>

              <p
                className="mt-1 text-sm"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                AI-powered performance analysis and recommendations for this
                campaign.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onReAnalyze}
            disabled={loadingInsights}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              backgroundColor: "var(--primary)",
            }}
            onMouseEnter={(e) => {
              if (!loadingInsights) {
                e.currentTarget.style.backgroundColor =
                  "var(--primary-hover)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--primary)";
            }}
          >
            {loadingInsights ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}

            {loadingInsights ? "Analyzing..." : "Re-analyze"}
          </button>
        </div>

        <div
          className="grid grid-cols-2 gap-3 border-t pt-5 sm:grid-cols-4"
          style={{
            borderColor: "var(--border-color)",
          }}
        >
          <div>
            <p
              className="text-xs"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Spend
            </p>

            <p
              className="mt-1 text-lg font-semibold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              {formatCurrency(campaign.spend)}
            </p>
          </div>

          <div>
            <p
              className="text-xs"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              ROAS
            </p>

            <p
              className="mt-1 text-lg font-semibold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              {formatRoas(campaign.roas)}
            </p>
          </div>

          <div>
            <p
              className="text-xs"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              Conversions
            </p>

            <p
              className="mt-1 text-lg font-semibold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              {campaign.conversions ?? 0}
            </p>
          </div>

          <div>
            <p
              className="text-xs"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              CTR
            </p>

            <p
              className="mt-1 text-lg font-semibold"
              style={{
                color: "var(--text-primary)",
              }}
            >
              {formatPercent(campaign.ctr)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}