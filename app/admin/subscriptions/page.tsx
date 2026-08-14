'use client';

import { useState } from 'react';
import SubscriptionMetrics from '@/components/admin/subscriptions/SubscriptionMetric';
import SubscriptionFilters from '@/components/admin/subscriptions/SubscriptionFilter';
import SubscriptionsTable, { SubscriptionRecord } from '@/components/admin/subscriptions/SubscriptionTable';

const INITIAL_SUBSCRIPTIONS: SubscriptionRecord[] = [
  {
    id: 'sub_1',
    customerName: 'Sehar Ajmal',
    email: 'seharajmal452@gmail.com',
    planName: 'AdPilot Pro',
    amount: '$29.00 / mo',
    billingCycle: 'Monthly',
    status: 'Active',
    nextBillingDate: 'Sep 12, 2026',
    stripeCustomerId: 'cus_N9Xa1829z',
  },
  {
    id: 'sub_2',
    customerName: 'Alex Johnson',
    email: 'alex@growthagency.io',
    planName: 'AdPilot Pro',
    amount: '$29.00 / mo',
    billingCycle: 'Monthly',
    status: 'Active',
    nextBillingDate: 'Sep 02, 2026',
    stripeCustomerId: 'cus_M20x9183a',
  },
  {
    id: 'sub_3',
    customerName: 'David Chen',
    email: 'david@scaleads.co',
    planName: 'AdPilot Pro',
    amount: '$290.00 / yr',
    billingCycle: 'Annual',
    status: 'Past Due',
    nextBillingDate: 'Aug 10, 2026',
    stripeCustomerId: 'cus_P82x1123q',
  },
  {
    id: 'sub_4',
    customerName: 'Marcus Vance',
    email: 'marcus@vancemedia.com',
    planName: 'AdPilot Pro',
    amount: '$29.00 / mo',
    billingCycle: 'Monthly',
    status: 'Canceled',
    nextBillingDate: 'Ended',
    stripeCustomerId: 'cus_K1029381y',
  },
];

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionRecord[]>(INITIAL_SUBSCRIPTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleCancelSub = (subId: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'Canceled', nextBillingDate: 'Ended' } : s))
    );
  };

  const handleRetryPayment = (subId: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: 'Active' } : s))
    );
  };

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch =
      sub.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.stripeCustomerId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || sub.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const activeCount = subscriptions.filter((s) => s.status === 'Active').length;
  const failedCount = subscriptions.filter((s) => s.status === 'Past Due').length;
  const estimatedMRR = activeCount * 29.0;

  return (
    <div className="space-y-8">
      <div>
        <h1
          style={{ color: 'var(--text-primary)' }}
          className="text-2xl font-bold tracking-tight"
        >
          Subscriptions & Revenue
        </h1>
        <p
          style={{ color: 'var(--text-primary)' }}
          className="text-sm mt-1 opacity-70"
        >
          Monitor Stripe recurring revenue, billing status, and subscriber churn.
        </p>
      </div>

      <SubscriptionMetrics
        mrr={estimatedMRR}
        activeSubscribers={activeCount}
        churnRate={2.1}
        failedPayments={failedCount}
      />

      <SubscriptionFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />
      <SubscriptionsTable
        subscriptions={filteredSubscriptions}
        onCancelSub={handleCancelSub}
        onRetryPayment={handleRetryPayment}
      />
    </div>
  );
}