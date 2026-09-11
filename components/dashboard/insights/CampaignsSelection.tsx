"use client";

import CampaignSelectorCard from "./CampaignSelector";
import { Campaign } from "@/types/insights";

type Props = {
  campaigns: Campaign[];
  selectedCampaignId?: string | null;
  onSelect: (id: string) => void;
};

export default function CampaignSelector({
  campaigns,
  selectedCampaignId,
  onSelect,
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Campaign Performance
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Select a campaign to analyze it with AI.
          </p>
        </div>

        <span className="text-xs font-medium text-gray-500">
          {campaigns.length} campaigns
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignSelectorCard
            key={campaign.id}
            campaign={campaign}
            selected={campaign.id === selectedCampaignId}
            onClick={() => onSelect(campaign.id)}
          />
        ))}
      </div>
    </div>
  );
}