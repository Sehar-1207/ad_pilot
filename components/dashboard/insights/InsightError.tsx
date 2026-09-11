"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

type Props = {
  message: string;
  onRetry: () => void;
};

export default function InsightsError({ message, onRetry }: Props) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

        <div>
          <p className="text-sm font-medium text-red-800">
            AI analysis failed
          </p>

          <p className="mt-1 text-sm text-red-700">{message}</p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Re-analyze
          </button>
        </div>
      </div>
    </div>
  );
}