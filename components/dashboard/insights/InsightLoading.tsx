"use client";

import { Loader2, Sparkles } from "lucide-react";

export default function InsightsLoading({
  campaignName,
}: {
  campaignName?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
          <Sparkles className="h-6 w-6 text-indigo-600" />
        </div>

        <h2 className="mt-4 text-base font-semibold text-gray-900">
          Analyzing {campaignName || "campaign"}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Gemini is analyzing this campaign&apos;s performance.
        </p>

        <Loader2 className="mt-5 h-5 w-5 animate-spin text-indigo-600" />
      </div>
    </div>
  );
}