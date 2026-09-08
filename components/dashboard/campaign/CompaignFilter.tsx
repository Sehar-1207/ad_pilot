'use client';

import { Search, Calendar, RefreshCw } from 'lucide-react';

interface CampaignFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
  healthFilter: string;
  onHealthChange: (val: string) => void;
  onSync?: () => void;
  isSyncing?: boolean;
}

export default function CampaignFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  healthFilter,
  onHealthChange,
  onSync,
  isSyncing = false,
}: CampaignFiltersProps) {
  return (
    <div
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
      }}
      className="flex flex-col gap-4 rounded-xl border p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">

        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-50"
            style={{ color: 'var(--text-primary)' }}
          />

          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--card-bg)',
            }}
            className="w-full rounded-lg border pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          style={{
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
            backgroundColor: 'var(--card-bg)',
          }}
          className="rounded-lg border px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
        >
          <option value="all">
            All Statuses
          </option>

          <option value="active">
            Active
          </option>

          <option value="paused">
            Paused
          </option>
        </select>

        <div
          style={{
            borderColor: 'var(--border-color)',
            backgroundColor: 'var(--card-bg)',
          }}
          className="flex items-center gap-1 rounded-lg border p-1"
        >
          <button
            type="button"
            onClick={() =>
              onHealthChange('all')
            }
            style={{
              color: 'var(--text-primary)',
              borderColor:
                healthFilter === 'all'
                  ? 'var(--border-color)'
                  : 'transparent',
            }}
            className={`rounded px-2.5 py-1 text-[11px] font-medium transition-all ${
              healthFilter === 'all'
                ? 'bg-[var(--bg-accent)] border shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            All
          </button>

          <button
            type="button"
            onClick={() =>
              onHealthChange('Profitable')
            }
            style={{
              color:
                healthFilter === 'Profitable'
                  ? 'var(--accent-teal)'
                  : 'var(--text-primary)',
              borderColor:
                healthFilter === 'Profitable'
                  ? 'var(--accent-teal)'
                  : 'transparent',
            }}
            className={`rounded px-2.5 py-1 text-[11px] font-medium transition-all ${
              healthFilter === 'Profitable'
                ? 'bg-[var(--accent-teal)]/10 border font-semibold'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Profitable
          </button>

          <button
            type="button"
            onClick={() =>
              onHealthChange('Fatigued')
            }
            style={{
              color:
                healthFilter === 'Fatigued'
                  ? '#f43f5e'
                  : 'var(--text-primary)',
              borderColor:
                healthFilter === 'Fatigued'
                  ? 'rgba(244, 63, 94, 0.3)'
                  : 'transparent',
            }}
            className={`rounded px-2.5 py-1 text-[11px] font-medium transition-all ${
              healthFilter === 'Fatigued'
                ? 'bg-rose-500/10 border font-semibold'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            Fatigued
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">

        <div
          style={{
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
            backgroundColor: 'var(--card-bg)',
          }}
          className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs shadow-sm"
        >
          <Calendar className="h-3.5 w-3.5 opacity-60" />

          <span>
            Last 7 Days
          </span>
        </div>

        <button
          type="button"
          onClick={onSync}
          disabled={
            isSyncing || !onSync
          }
          className="flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${
              isSyncing
                ? 'animate-spin'
                : ''
            }`}
          />

          <span>
            {isSyncing
              ? 'Syncing...'
              : 'Sync Meta Data'}
          </span>
        </button>

      </div>
    </div>
  );
}