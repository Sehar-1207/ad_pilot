"use client";

import { Campaign } from "@/types/insights";
import CampaignSelectorCard from "./CampaignSelector";

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
    <div
      className="rounded-2xl border p-5 shadow-sm"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2
            className="text-base font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Campaign Performance
          </h2>

          <p
            className="mt-1 text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            Select a campaign to analyze it with AI.
          </p>
        </div>

        <span
          className="text-xs font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""}
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