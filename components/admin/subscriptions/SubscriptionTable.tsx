'use client';

import SubscriptionActionsDropdown from './SubscriptionAction';

export interface SubscriptionRecord {
  id: string;
  customerName: string;
  email: string;
  planName: string;
  amount: string;
  billingCycle: 'Monthly' | 'Annual';
  status: 'Active' | 'Past Due' | 'Canceled';
  nextBillingDate: string;
  stripeCustomerId: string;
}

interface SubscriptionsTableProps {
  subscriptions: SubscriptionRecord[];
  onCancelSub: (id: string) => void;
  onRetryPayment: (id: string) => void;
}

export default function SubscriptionsTable({
  subscriptions,
  onCancelSub,
  onRetryPayment,
}: SubscriptionsTableProps) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
      className="border rounded-xl overflow-hidden transition-colors shadow-sm"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className="border-b uppercase tracking-wider font-semibold opacity-70"
          >
            <tr>
              <th className="px-6 py-3.5">Customer</th>
              <th className="px-6 py-3.5">Plan Tier</th>
              <th className="px-6 py-3.5">Billing Interval</th>
              <th className="px-6 py-3.5">Recurring Price</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Next Renewal</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody
            style={{ color: 'var(--text-primary)' }}
            className="divide-y divide-[var(--border-color)]"
          >
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center opacity-50">
                  No subscription records found.
                </td>
              </tr>
            ) : (
              subscriptions.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-[var(--bg-accent)] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold">{sub.customerName}</div>
                    <div className="opacity-60 text-[11px] font-mono">{sub.email}</div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderColor: 'rgba(59, 130, 246, 0.3)',
                      }}
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border text-blue-600 dark:text-blue-400"
                    >
                      {sub.planName}
                    </span>
                  </td>

                  <td className="px-6 py-4 opacity-70">{sub.billingCycle}</td>

                  <td className="px-6 py-4 font-mono font-medium">{sub.amount}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                        sub.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          : sub.status === 'Past Due'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          sub.status === 'Active'
                            ? 'bg-emerald-500'
                            : sub.status === 'Past Due'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      {sub.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 opacity-70">{sub.nextBillingDate}</td>

                  <td className="px-6 py-4 text-right">
                    <SubscriptionActionsDropdown
                      status={sub.status}
                      stripeCustomerId={sub.stripeCustomerId}
                      onCancelSub={() => onCancelSub(sub.id)}
                      onRetryPayment={() => onRetryPayment(sub.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}