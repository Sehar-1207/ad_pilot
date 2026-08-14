'use client';

import { DollarSign, TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';

interface SubscriptionMetricsProps {
  mrr: number;
  activeSubscribers: number;
  churnRate: number;
  failedPayments: number;
}

export default function SubscriptionMetrics({
  mrr,
  activeSubscribers,
  churnRate,
  failedPayments,
}: SubscriptionMetricsProps) {
  const metrics = [
    {
      label: 'Monthly Recurring Revenue',
      value: `$${mrr.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      subtext: `+$${(mrr * 0.12).toFixed(2)} vs last mo`,
      icon: DollarSign,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Active Pro Subscriptions',
      value: activeSubscribers.toLocaleString(),
      subtext: '$29.00 / month per user',
      icon: TrendingUp,
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Monthly Churn Rate',
      value: `${churnRate}%`,
      subtext: 'Target: < 3.0%',
      icon: RefreshCw,
      iconColor: 'opacity-50',
    },
    {
      label: 'Payment Delinquencies',
      value: failedPayments,
      subtext: 'Failed card charges',
      icon: AlertCircle,
      iconColor: failedPayments > 0 ? 'text-amber-600 dark:text-amber-400' : 'opacity-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-color)',
            }}
            className="p-5 border rounded-xl space-y-2 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span
                style={{ color: 'var(--text-primary)' }}
                className="text-xs font-semibold uppercase tracking-wider opacity-60"
              >
                {m.label}
              </span>
              <Icon className={`w-4 h-4 ${m.iconColor}`} />
            </div>
            <div
              style={{ color: 'var(--text-primary)' }}
              className="text-2xl font-bold"
            >
              {m.value}
            </div>
            <p
              style={{ color: 'var(--text-primary)' }}
              className="text-xs font-medium opacity-50"
            >
              {m.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}