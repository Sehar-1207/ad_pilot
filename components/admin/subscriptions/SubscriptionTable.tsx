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
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
      className="border rounded-xl overflow-hidden shadow-sm transition-colors"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--bg-accent)',
                borderColor: 'var(--border-color)',
              }}
              className="border-b"
            >
              <th
                style={{ color: 'var(--text-primary)' }}
                className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider opacity-60 whitespace-nowrap"
              >
                Customer
              </th>

              <th
                style={{ color: 'var(--text-primary)' }}
                className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider opacity-60 whitespace-nowrap"
              >
                Plan
              </th>

              <th
                style={{ color: 'var(--text-primary)' }}
                className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider opacity-60 whitespace-nowrap"
              >
                Amount
              </th>

              <th
                style={{ color: 'var(--text-primary)' }}
                className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider opacity-60 whitespace-nowrap"
              >
                Billing Cycle
              </th>

              <th
                style={{ color: 'var(--text-primary)' }}
                className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider opacity-60 whitespace-nowrap"
              >
                Status
              </th>

              <th
                style={{ color: 'var(--text-primary)' }}
                className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider opacity-60 whitespace-nowrap"
              >
                Next Billing
              </th>

              <th
                style={{ color: 'var(--text-primary)' }}
                className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider opacity-60 text-right"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((sub) => (
              <tr
                key={sub.id}
                style={{
                  borderColor: 'var(--border-color)',
                }}
                className="border-b last:border-b-0 hover:bg-[var(--bg-accent)] transition-colors"
              >
                {/* CUSTOMER */}
                <td className="px-5 py-4">
                  <div className="min-w-[180px]">
                    <div
                      style={{
                        color: 'var(--text-primary)',
                      }}
                      className="text-sm font-semibold"
                    >
                      {sub.customerName}
                    </div>

                    <div
                      style={{
                        color: 'var(--text-primary)',
                      }}
                      className="text-xs opacity-50 mt-0.5"
                    >
                      {sub.email}
                    </div>
                  </div>
                </td>

                {/* PLAN */}
                <td className="px-5 py-4">
                  <span
                    style={{
                      color: 'var(--text-primary)',
                    }}
                    className="text-xs font-semibold"
                  >
                    {sub.planName}
                  </span>
                </td>

                {/* AMOUNT */}
                <td className="px-5 py-4">
                  <span
                    style={{
                      color: 'var(--text-primary)',
                    }}
                    className="text-xs font-semibold whitespace-nowrap"
                  >
                    {sub.amount}
                  </span>
                </td>

                {/* BILLING CYCLE */}
                <td className="px-5 py-4">
                  <span
                    style={{
                      color: 'var(--text-primary)',
                    }}
                    className="text-xs font-medium"
                  >
                    {sub.billingCycle}
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
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

                {/* NEXT BILLING */}
                <td className="px-5 py-4">
                  <span
                    style={{
                      color: 'var(--text-primary)',
                    }}
                    className="text-xs font-medium whitespace-nowrap"
                  >
                    {sub.nextBillingDate}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-5 py-4 text-right">
                  <SubscriptionActionsDropdown
                    stripeCustomerId={sub.stripeCustomerId}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
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
