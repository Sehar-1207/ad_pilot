'use client';

import {
  DollarSign,
  TrendingUp,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';

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
      value: `$${mrr.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      subtext: 'Current Stripe MRR',
      icon: DollarSign,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Active Pro Subscriptions',
      value: activeSubscribers.toLocaleString(),
      subtext: 'Monthly billing',
      icon: TrendingUp,
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      label: 'Monthly Churn Rate',
      value: `${churnRate.toFixed(1)}%`,
      subtext: 'Target: < 3.0%',
      icon: RefreshCw,
      iconColor:
        churnRate > 3
          ? 'text-amber-600 dark:text-amber-400'
          : 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Payment Delinquencies',
      value: failedPayments.toLocaleString(),
      subtext:
        failedPayments > 0
          ? 'Failed or overdue payments'
          : 'No failed payments',
      icon: AlertCircle,
      iconColor:
        failedPayments > 0
          ? 'text-amber-600 dark:text-amber-400'
          : 'opacity-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;

        return (
          <div
            key={index}
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
                {metric.label}
              </span>

              <Icon className={`w-4 h-4 ${metric.iconColor}`} />
            </div>

            <div
              style={{ color: 'var(--text-primary)' }}
              className="text-2xl font-bold"
            >
              {metric.value}
            </div>

            <p
              style={{ color: 'var(--text-primary)' }}
              className="text-xs font-medium opacity-50"
            >
              {metric.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}