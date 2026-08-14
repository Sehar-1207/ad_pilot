'use client';

import { Search, Filter } from 'lucide-react';

interface UserFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPlan: string;
  onPlanChange: (plan: string) => void;
}

export default function UserFilters({
  searchQuery,
  onSearchChange,
  selectedPlan,
  onPlanChange,
}: UserFiltersProps) {
  const plans = ['All', 'Pro', 'Free'];

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
      className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 border rounded-xl transition-colors"
    >
      <div className="relative flex-1 max-w-md">
        <Search
          style={{ color: 'var(--text-primary)' }}
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, email, or Meta account..."
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
          className="w-full border rounded-lg pl-9 pr-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors placeholder:opacity-50"
        />
      </div>

      <div className="flex items-center gap-2">
        <span
          style={{ color: 'var(--text-primary)' }}
          className="text-xs font-medium flex items-center gap-1.5 mr-1 hidden md:flex opacity-70"
        >
          <Filter className="w-3.5 h-3.5" /> Filter Plan:
        </span>
        <div
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border-color)',
          }}
          className="flex p-1 border rounded-lg transition-colors"
        >
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan;
            return (
              <button
                key={plan}
                onClick={() => onPlanChange(plan)}
                style={
                  isSelected
                    ? {
                        backgroundColor: 'var(--primary)',
                        color: '#ffffff',
                      }
                    : {
                        color: 'var(--text-primary)',
                      }
                }
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  !isSelected ? 'opacity-70 hover:opacity-100 hover:bg-[var(--bg-accent)]' : 'shadow-sm'
                }`}
              >
                {plan}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}