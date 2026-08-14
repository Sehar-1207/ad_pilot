'use client';

import { Search, Calendar, RefreshCw } from 'lucide-react';

interface CampaignFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
  healthFilter: string;
  onHealthChange: (val: string) => void;
}

export default function CampaignFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  healthFilter,
  onHealthChange,
}: CampaignFiltersProps) {
  return (
    <div
      style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
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
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className="w-full rounded-lg border bg-transparent pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          style={{
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
          className="rounded-lg border bg-transparent px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
        >
          <option value="all" className="bg-slate-900 text-white">All Statuses</option>
          <option value="active" className="bg-slate-900 text-white">Active</option>
          <option value="paused" className="bg-slate-900 text-white">Paused</option>
        </select>

        <div
          style={{ borderColor: 'var(--border-color)' }}
          className="flex items-center gap-1 rounded-lg border p-1 bg-transparent"
        >
          <button
            onClick={() => onHealthChange('all')}
            style={{
              color: 'var(--text-primary)',
              borderColor: healthFilter === 'all' ? 'var(--border-color)' : 'transparent',
            }}
            className={`rounded px-2.5 py-1 text-[11px] font-medium transition-all ${
              healthFilter === 'all' ? 'bg-white/10 border shadow-sm' : 'opacity-70 hover:opacity-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onHealthChange('Profitable')}
            className={`rounded px-2.5 py-1 text-[11px] font-medium transition-all ${
              healthFilter === 'Profitable'
                ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30 font-semibold'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={healthFilter !== 'Profitable' ? { color: 'var(--text-primary)' } : undefined}
          >
            Profitable
          </button>
          <button
            onClick={() => onHealthChange('Fatigued')}
            className={`rounded px-2.5 py-1 text-[11px] font-medium transition-all ${
              healthFilter === 'Fatigued'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30 font-semibold'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={healthFilter !== 'Fatigued' ? { color: 'var(--text-primary)' } : undefined}
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
          }}
          className="flex items-center gap-2 rounded-lg border bg-transparent px-3 py-2 text-xs shadow-sm"
        >
          <Calendar className="h-3.5 w-3.5 opacity-60" />
          <span>Last 7 Days</span>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-600 transition-colors shadow-sm">
          <RefreshCw className="h-3.5 w-3.5" />
          Sync Meta Data
        </button>
      </div>
    </div>
  );
}