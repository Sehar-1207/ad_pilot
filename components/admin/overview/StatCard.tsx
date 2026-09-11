import { LucideIcon } from 'lucide-react';

export interface StatItem {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
}

export default function StatCard({ label, value, change, isPositive, icon: Icon }: StatItem) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
      className="p-2 border rounded-xl space-y-3 transition-colors"
    >
      <div className="flex items-center justify-between">
        <span
          style={{ color: 'var(--text-secondary)' }}
          className="text-xs font-medium uppercase tracking-wider"
        >
          {label}
        </span>
        <Icon
          style={{ color: 'var(--primary)' }}
          className="w-4 h-4"
        />
      </div>

      <div
        style={{ color: 'var(--text-primary)' }}
        className="text-2xl font-bold"
      >
        {value}
      </div>

      <p
        className={`text-xs font-medium ${
          isPositive
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-rose-600 dark:text-rose-400'
        }`}
      >
        {change}
      </p>
    </div>
  );
}