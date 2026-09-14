'use client';

import SubscriptionActionsDropdown from './SubscriptionAction';

export interface SubscriptionRecord {
  id: string;
  customerName: string;
  email: string;
  planName: string;
  amount: string;
  billingCycle: 'Monthly';
  status: 'Active' | 'Past Due' | 'Canceled';
  nextBillingDate: string;
  stripeCustomerId: string;
}

interface SubscriptionsTableProps {
  subscriptions: SubscriptionRecord[];
}

export default function SubscriptionsTable({
  subscriptions,
}: SubscriptionsTableProps) {
  return (
    <div
      style={{
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--bg-surface)',
      }}
      className="w-full border rounded-xl shadow-sm overflow-hidden"
    >
      <div className="w-full overflow-x-auto md:overflow-x-auto md:max-h-[420px] md:overflow-y-auto">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)',
              }}
              className="border-b"
            >
              <th
                style={{
                  color: 'var(--text-primary)',
                }}
                className="sticky top-0 z-20 bg-[var(--bg-surface)] px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
              >
                Customer
              </th>

              <th
                style={{
                  color: 'var(--text-primary)',
                }}
                className="sticky top-0 z-20 bg-[var(--bg-surface)] px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
              >
                Plan
              </th>

              <th
                style={{
                  color: 'var(--text-primary)',
                }}
                className="sticky top-0 z-20 bg-[var(--bg-surface)] px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
              >
                Amount
              </th>

              <th
                style={{
                  color: 'var(--text-primary)',
                }}
                className="sticky top-0 z-20 bg-[var(--bg-surface)] px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
              >
                Billing Cycle
              </th>

              <th
                style={{
                  color: 'var(--text-primary)',
                }}
                className="sticky top-0 z-20 bg-[var(--bg-surface)] px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
              >
                Status
              </th>

              <th
                style={{
                  color: 'var(--text-primary)',
                }}
                className="sticky top-0 z-20 bg-[var(--bg-surface)] px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap"
              >
                Next Billing
              </th>

              <th
                style={{
                  color: 'var(--text-primary)',
                }}
                className="sticky top-0 z-20 bg-[var(--bg-surface)] px-4 sm:px-5 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-right whitespace-nowrap"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border-color)]">
            {subscriptions.map((sub) => (
              <tr
                key={sub.id}
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }}
                className="border-b hover:bg-[var(--bg-accent)] transition-colors"
              >
                <td className="px-4 sm:px-5 py-3.5 sm:py-4">
                  <div className="min-w-[180px]">
                    <div className="text-xs sm:text-sm font-semibold truncate">
                      {sub.customerName}
                    </div>

                    <div className="text-[11px] sm:text-xs opacity-50 mt-0.5 truncate">
                      {sub.email}
                    </div>
                  </div>
                </td>

                <td className="px-4 sm:px-5 py-3.5 sm:py-4 whitespace-nowrap">
                  <span className="text-xs font-semibold">
                    {sub.planName}
                  </span>
                </td>

                <td className="px-4 sm:px-5 py-3.5 sm:py-4 whitespace-nowrap">
                  <span className="text-xs font-semibold">
                    {sub.amount}
                  </span>
                </td>

                <td className="px-4 sm:px-5 py-3.5 sm:py-4 whitespace-nowrap">
                  <span className="text-xs font-medium">
                    {sub.billingCycle}
                  </span>
                </td>

                <td className="px-4 sm:px-5 py-3.5 sm:py-4">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        sub.status === 'Active'
                          ? 'bg-emerald-500'
                          : sub.status === 'Past Due'
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      }`}
                    />

                    <span
                      className={`text-xs font-semibold ${
                        sub.status === 'Active'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : sub.status === 'Past Due'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>
                </td>

                <td className="px-4 sm:px-5 py-3.5 sm:py-4 whitespace-nowrap">
                  <span className="text-xs font-medium">
                    {sub.nextBillingDate}
                  </span>
                </td>

                <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-right whitespace-nowrap">
                  <SubscriptionActionsDropdown
                    stripeCustomerId={sub.stripeCustomerId}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {subscriptions.length === 0 && (
        <div className="py-12 text-center">
          <p
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-sm opacity-60"
          >
            No subscriptions found.
          </p>
        </div>
      )}
    </div>
  );
}