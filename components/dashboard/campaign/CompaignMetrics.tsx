'use client';

import {
  Layers,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Lock,
} from "lucide-react";

interface CampaignMetricsProps {
  activeCount: number;
  totalSpend: number;
  avgRoas: string;
  fatiguedCount: number;
  isPro: boolean;
}

export default function CampaignMetrics({
  activeCount,
  totalSpend,
  avgRoas,
  fatiguedCount,
  isPro,
}: CampaignMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        className="rounded-xl border p-4 shadow-sm"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Total Active Campaigns
          </span>

          <Layers
            className="h-4 w-4"
            style={{ color: "var(--accent-teal)" }}
          />
        </div>

        <div
          className="mt-2 text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {activeCount}
        </div>
      </div>

      <div
        className="rounded-xl border p-4 shadow-sm"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Total Ad Spend
          </span>

          <DollarSign
            className="h-4 w-4"
            style={{ color: "var(--accent-teal)" }}
          />
        </div>

        <div
          className="mt-2 text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          $
          {totalSpend.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-xl border p-4 shadow-sm"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Average ROAS
          </span>

          <TrendingUp
            className="h-4 w-4"
            style={{ color: "var(--accent-teal)" }}
          />
        </div>

        {isPro ? (
          <div
            className="mt-2 text-2xl font-bold"
            style={{ color: "var(--accent-teal)" }}
          >
            {avgRoas}x
          </div>
        ) : (
          <>
            <div
              className="mt-2 select-none text-2xl font-bold opacity-30 blur-sm"
              style={{ color: "var(--text-primary)" }}
            >
              0.0x
            </div>

            <span
              className="absolute bottom-2 right-3 flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-bold"
              style={{
                color: "var(--primary)",
                backgroundColor:
                  "color-mix(in srgb, var(--primary) 10%, transparent)",
                borderColor:
                  "color-mix(in srgb, var(--primary) 30%, transparent)",
              }}
            >
              <Lock className="h-2.5 w-2.5" />
              PRO
            </span>
          </>
        )}
      </div>

      <div
        className="rounded-xl border p-4 shadow-sm"
        style={{
          backgroundColor: "var(--bg-surface)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-medium"
            style={{ color: "var(--text-secondary)" }}
          >
            Needs Attention
          </span>

          <AlertTriangle
            className="h-4 w-4"
            style={{ color: "#F43F5E" }}
          />
        </div>

        <div className="mt-2 text-2xl font-bold text-rose-400">
          {fatiguedCount} Fatigued
        </div>
      </div>
    </div>
  );
}