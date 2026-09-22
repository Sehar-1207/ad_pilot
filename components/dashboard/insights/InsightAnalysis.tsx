"use client";

import { Sparkles, TrendingUp } from "lucide-react";
import { Campaign } from "@/types/insights";
import { getHealthClasses, getHealthLabel } from "@/types/utils";

type Props = { campaign: Campaign; answer: string; generatedAt?: string };

export default function AIAnalysisCard({ campaign, answer, generatedAt }: Props) {
  const healthClasses = getHealthClasses(campaign.health);

  return (
    <div className="rounded-2xl border shadow-sm" style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}>
      <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "var(--bg-accent)" }}>
            <Sparkles className="h-5 w-5" style={{ color: "var(--primary)" }} />
          </div>
          <div>
            <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>AI Performance Analysis</h2>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>Analysis for {campaign.name}</p>
          </div>
        </div>

        <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${healthClasses.badge}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${healthClasses.dot}`} />
          {getHealthLabel(campaign.health)}
        </span>
      </div>

      <div className="p-5">
        <div className="whitespace-pre-wrap text-sm leading-7" style={{ color: "var(--text-primary)" }}>{answer}</div>

        {generatedAt && (
          <div className="mt-5 flex items-center gap-2 border-t pt-4 text-xs" style={{ borderColor: "var(--border-color)", color: "var(--text-secondary)" }}>
            <TrendingUp className="h-3.5 w-3.5" />
            Generated {new Date(generatedAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
          </div>
        )}
      </div>
    </div>
  );
}