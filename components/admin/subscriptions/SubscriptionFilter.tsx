'use client';

import { Search, Filter } from 'lucide-react';

interface SubscriptionFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

export default function SubscriptionFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: SubscriptionFiltersProps) {
  const statuses = [
    'All',
    'Active',
    'Past Due',
    'Canceled',
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
      className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 border rounded-xl transition-colors shadow-sm"
    >
      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="relative flex-1 max-w-md">
        <Search
          style={{
            color: 'var(--text-primary)',
          }}
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search by customer, email, or Stripe ID..."
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
          className="w-full border rounded-lg pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors placeholder:opacity-50"
          aria-label="Search subscriptions"
        />
      </div>


      {/* =====================================================
          BILLING STATUS FILTER
      ===================================================== */}

      <div className="flex items-center gap-2">
        <span
          style={{
            color: 'var(--text-primary)',
          }}
          className="text-xs flex items-center gap-1.5 mr-1 hidden md:flex opacity-70 font-medium"
        >
          <Filter className="w-3.5 h-3.5 opacity-60" />

          Billing Status:
        </span>

        <div
          style={{
            backgroundColor:
              'var(--bg-primary)',
            borderColor:
              'var(--border-color)',
          }}
          className="flex p-1 border rounded-lg"
          role="group"
          aria-label="Billing status filter"
        >
          {statuses.map((status) => {
            const isActive =
              statusFilter === status;

            return (
              <button
                key={status}
                type="button"
                onClick={() =>
                  onStatusChange(status)
                }
                aria-pressed={isActive}
                style={
                  isActive
                    ? {
                        backgroundColor:
                          'var(--primary)',
                        color: '#ffffff',
                      }
                    : {
                        color:
                          'var(--text-primary)',
                      }
                }
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  isActive
                    ? 'shadow-sm'
                    : 'opacity-70 hover:opacity-100 hover:bg-[var(--bg-accent)]'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}