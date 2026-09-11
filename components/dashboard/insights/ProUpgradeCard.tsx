"use client";

import { AlertCircle, ArrowLeft } from "lucide-react";

export default function CampaignNotFound({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex min-h-[500px] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <AlertCircle className="h-6 w-6 text-gray-500" />
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          Campaign Not Found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          The selected campaign could not be found or is no longer available.
        </p>

        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </button>
      </div>
    </div>
  );
}