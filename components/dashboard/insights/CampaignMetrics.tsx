"use client";

import { Campaign } from "@/types/insights";
import {
  formatCurrency,
  formatNumber,
  formatRoas,
} from "@/types/utils";

type Props = {
  campaign: Campaign;
};

export default function CampaignMetrics({ campaign }: Props) {
  const metrics = [
    {
      label: "Impressions",
      value: formatNumber(campaign.impressions),
    },
    {
      label: "Reach",
      value: formatNumber(campaign.reach),
    },
    {
      label: "Clicks",
      value: formatNumber(campaign.clicks),
    },
    {
      label: "CPC",
      value: formatCurrency(campaign.cpc),
    },
    {
      label: "CPM",
      value: formatCurrency(campaign.cpm),
    },
    {
      label: "Revenue",
      value: formatCurrency(campaign.revenue),
    },
    {
      label: "Cost / Conversion",
      value: formatCurrency(campaign.costPerConversion),
    },
    {
      label: "ROAS",
      value: formatRoas(campaign.roas),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <p className="text-xs text-gray-500">{metric.label}</p>

          <p className="mt-2 text-lg font-semibold text-gray-900">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}