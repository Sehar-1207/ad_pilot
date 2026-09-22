"use client";

import {
  Activity,
  BarChart3,
  CheckCircle2,
  CircleAlert,
  Clock,
  DollarSign,
  Eye,
  MousePointerClick,
  TrendingUp,
} from "lucide-react";
import { Campaign } from "@/types/insights";

type Props = {
  campaign: Campaign;
  selected: boolean;
  onClick: () => void;
};

export default function CampaignSelectorCard({
  campaign,
  selected,
  onClick,
}: Props) {
  const health = campaign.health?.toUpperCase();

  const getHealthStyles = () => {
    switch (health) {
      case "PROFITABLE":
        return {
          color: "var(--accent-teal)",
          background:
            "color-mix(in srgb, var(--accent-teal) 12%, transparent)",
          border:
            "color-mix(in srgb, var(--accent-teal) 25%, transparent)",
        };

      case "NEEDS_ATTENTION":
        return {
          color: "var(--accent-cyan)",
          background:
            "color-mix(in srgb, var(--accent-cyan) 12%, transparent)",
          border:
            "color-mix(in srgb, var(--accent-cyan) 25%, transparent)",
        };

      case "FATIGUED":
        return {
          color: "var(--primary)",
          background:
            "color-mix(in srgb, var(--primary) 12%, transparent)",
          border:
            "color-mix(in srgb, var(--primary) 25%, transparent)",
        };

      default:
        return {
          color: "var(--text-secondary)",
          background: "var(--bg-accent)",
          border: "var(--border-color)",
        };
    }
  };

  const formatCurrency = (value?: number) => {
    if (value === undefined || value === null) {
      return "$0.00";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (value?: number) => {
    if (value === undefined || value === null) {
      return "0";
    }

    return new Intl.NumberFormat("en-US").format(value);
  };

  const healthStyles = getHealthStyles();

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: selected
          ? "var(--primary)"
          : "var(--border-color)",
        boxShadow: selected
          ? "0 0 0 1px var(--primary)"
          : undefined,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: "var(--bg-accent)",
            }}
          >
            <BarChart3
              className="h-5 w-5"
              style={{
                color: selected
                  ? "var(--primary)"
                  : "var(--text-secondary)",
              }}
            />
          </div>

          <div className="min-w-0">
            <h3
              className="truncate text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {campaign.name}
            </h3>

            {campaign.adAccountName && (
              <p
                className="mt-0.5 truncate text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                {campaign.adAccountName}
              </p>
            )}
          </div>
        </div>

        {selected && (
          <CheckCircle2
            className="h-5 w-5 shrink-0"
            style={{ color: "var(--primary)" }}
          />
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
          style={{
            color: healthStyles.color,
            backgroundColor: healthStyles.background,
            borderColor: healthStyles.border,
          }}
        >
          {health === "PROFITABLE" ? (
            <TrendingUp className="h-3 w-3" />
          ) : health === "FATIGUED" ||
            health === "NEEDS_ATTENTION" ? (
            <CircleAlert className="h-3 w-3" />
          ) : (
            <Activity className="h-3 w-3" />
          )}

          {campaign.health || "NORMAL"}
        </span>

        <span
          className="text-[11px]"
          style={{ color: "var(--text-secondary)" }}
        >
          {campaign.status}
        </span>
      </div>

      <div
        className="my-4 h-px"
        style={{ backgroundColor: "var(--border-color)" }}
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <DollarSign
              className="h-3.5 w-3.5"
              style={{ color: "var(--text-secondary)" }}
            />

            <span
              className="text-[11px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Spend
            </span>
          </div>

          <p
            className="mt-1 text-sm font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {formatCurrency(campaign.spend)}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <TrendingUp
              className="h-3.5 w-3.5"
              style={{ color: "var(--text-secondary)" }}
            />

            <span
              className="text-[11px]"
              style={{ color: "var(--text-secondary)" }}
            >
              ROAS
            </span>
          </div>

          <p
            className="mt-1 text-sm font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {campaign.roas !== undefined
              ? `${campaign.roas.toFixed(2)}x`
              : "—"}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <Eye
              className="h-3.5 w-3.5"
              style={{ color: "var(--text-secondary)" }}
            />

            <span
              className="text-[11px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Impressions
            </span>
          </div>

          <p
            className="mt-1 text-sm font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {formatNumber(campaign.impressions)}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <MousePointerClick
              className="h-3.5 w-3.5"
              style={{ color: "var(--text-secondary)" }}
            />

            <span
              className="text-[11px]"
              style={{ color: "var(--text-secondary)" }}
            >
              Clicks
            </span>
          </div>

          <p
            className="mt-1 text-sm font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {formatNumber(campaign.clicks)}
          </p>
        </div>
      </div>

      {campaign.lastSyncedAt && (
        <div
          className="mt-4 flex items-center gap-1.5 text-[10px]"
          style={{ color: "var(--text-secondary)" }}
        >
          <Clock className="h-3 w-3" />
          Last synced{" "}
          {new Date(campaign.lastSyncedAt).toLocaleDateString()}
        </div>
      )}
    </button>
  );
}