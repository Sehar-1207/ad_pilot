"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

type Props = { message: string; onRetry: () => void };

export default function InsightsError({ message, onRetry }: Props) {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
        <div>
          <p className="text-sm font-medium text-red-400">AI analysis failed</p>
          <p className="mt-1 text-sm text-red-400/80">{message}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-red-500/20 border border-red-500/30 px-3 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/30"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Re-analyze
          </button>
        </div>
      </div>
    </div>
  );
}