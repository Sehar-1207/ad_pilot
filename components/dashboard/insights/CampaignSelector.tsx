"use client";

import { CheckCircle2 } from "lucide-react";
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
  selected: boolean;
  onClick: () => void;
};

export default function CampaignSelectorCard({
  campaign,
  selected,
  onClick,
}: Props) {
  const healthClasses = getHealthClasses(campaign.health);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border bg-white p-4 text-left transition ${
        selected
          ? "border-indigo-500 shadow-md ring-1 ring-indigo-500"
          : `${healthClasses.border} hover:border-indigo-300 hover:shadow-sm`
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {campaign.name}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] font-medium ${healthClasses.badge}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${healthClasses.dot}`}
              />
              {getHealthLabel(campaign.health)}
            </span>

            {campaign.status && (
              <span
                className={`rounded-full border px-2 py-1 text-[11px] font-medium ${getStatusClasses(
                  campaign.status
                )}`}
              >
                {campaign.status}
              </span>
            )}
          </div>
        </div>

        {selected && (
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50">
            <CheckCircle2 className="h-4 w-4 text-indigo-600" />
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-gray-400">
            Spend
          </p>
          <p className="mt-1 text-xs font-semibold text-gray-900">
            {formatCurrency(campaign.spend)}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-gray-400">
            ROAS
          </p>
          <p className="mt-1 text-xs font-semibold text-gray-900">
            {formatRoas(campaign.roas)}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-gray-400">
            CTR
          </p>
          <p className="mt-1 text-xs font-semibold text-gray-900">
            {formatPercent(campaign.ctr)}
          </p>
        </div>
      </div>
    </button>
  );
}