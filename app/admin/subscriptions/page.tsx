'use client';

import { useEffect, useMemo, useState } from 'react';

import SubscriptionMetrics from '@/components/admin/subscriptions/SubscriptionMetric';
import SubscriptionFilters from '@/components/admin/subscriptions/SubscriptionFilter';
import SubscriptionsTable, {
  SubscriptionRecord,
} from '@/components/admin/subscriptions/SubscriptionTable';

import { getAdminSubscriptions } from '@/api/admin';

interface BackendSubscription {
  userId: string;
  customer: {
    name: string;
    email: string;
  };
  plan: 'FREE' | 'PRO';
  stripe: {
    customerId: string | null;
    subscriptionId: string | null;
    priceId: string | null;
    status:
    | 'active'
    | 'trialing'
    | 'past_due'
    | 'canceled'
    | 'unpaid'
    | null;
    cancelAtPeriodEnd: boolean;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    amount: number | null;
    currency: string | null;
    billingInterval: string | null;
  };
  planEndsAt: string | null;
  createdAt: string;
}

export default function AdminSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<
    SubscriptionRecord[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);

  const LIMIT = 10;

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getAdminSubscriptions();

      if (!response?.success) {
        throw new Error(
          response?.error ||
          'Failed to load subscriptions.'
        );
      }

      const backendSubscriptions: BackendSubscription[] =
        response?.data?.subscriptions || [];

      const mappedSubscriptions: SubscriptionRecord[] =
        backendSubscriptions.map((subscription) => {
          const stripe = subscription.stripe;
          const customer = subscription.customer;

          let status: SubscriptionRecord['status'];

          switch (stripe?.status) {
            case 'active':
            case 'trialing':
              status = 'Active';
              break;

            case 'past_due':
            case 'unpaid':
              status = 'Past Due';
              break;

            case 'canceled':
            default:
              status = 'Canceled';
              break;
          }

          const amount =
            stripe?.amount !== null &&
              stripe?.amount !== undefined
              ? stripe.amount
              : null;

          const currency =
            stripe?.currency
              ? stripe.currency.toUpperCase()
              : 'USD';

          const amountText =
            amount !== null
              ? `${currency} ${amount.toFixed(2)} / mo`
              : '-';

          let nextBillingDate = '-';

          if (stripe?.currentPeriodEnd) {
            nextBillingDate = new Date(
              stripe.currentPeriodEnd
            ).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
            });
          }

          if (stripe?.status === 'canceled') {
            nextBillingDate = 'Ended';
          }

          return {
            id:
              stripe?.subscriptionId ||
              subscription.userId,

            customerName:
              customer?.name ||
              'Unknown Customer',

            email:
              customer?.email || '-',

            planName:
              subscription.plan === 'PRO'
                ? 'AdPilot Pro'
                : 'Free',

            amount: amountText,

            billingCycle: 'Monthly',

            status,

            nextBillingDate,

            stripeCustomerId:
              stripe?.customerId || '-',
          };
        });

      setSubscriptions(mappedSubscriptions);
    } catch (err: any) {
      console.error(
        'Admin subscriptions error:',
        err
      );

      setError(
        err?.response?.data?.error ||
        err?.message ||
        'Failed to load subscriptions.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, statusFilter]);

  const filteredSubscriptions = useMemo(() => {
    const search = searchQuery
      .trim()
      .toLowerCase();

    return subscriptions.filter((subscription) => {
      const matchesSearch =
        !search ||
        subscription.customerName
          .toLowerCase()
          .includes(search) ||
        subscription.email
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === 'All' ||
        subscription.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    subscriptions,
    searchQuery,
    statusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredSubscriptions.length / LIMIT
    )
  );

  const paginatedSubscriptions =
    filteredSubscriptions.slice(
      (page - 1) * LIMIT,
      page * LIMIT
    );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const stats = useMemo(() => {
    const active = subscriptions.filter(
      (subscription) =>
        subscription.status === 'Active'
    ).length;

    const pastDue = subscriptions.filter(
      (subscription) =>
        subscription.status === 'Past Due'
    ).length;

    const canceled = subscriptions.filter(
      (subscription) =>
        subscription.status === 'Canceled'
    ).length;

    const mrr = subscriptions.reduce(
      (total, subscription) => {
        if (
          subscription.status !== 'Active'
        ) {
          return total;
        }

        const amount = Number(
          subscription.amount.replace(
            /[^\d.]/g,
            ''
          )
        );

        return (
          total +
          (Number.isNaN(amount)
            ? 0
            : amount)
        );
      },
      0
    );

    const totalSubscriptions =
      subscriptions.length;

    const churnRate =
      totalSubscriptions > 0
        ? Number(
          (
            (canceled /
              totalSubscriptions) *
            100
          ).toFixed(1)
        )
        : 0;

    return {
      mrr,
      active,
      pastDue,
      canceled,
      churnRate,
    };
  }, [subscriptions]);

  return (
    <div
      style={{
        color: 'var(--text-primary)',
      }}
      className="space-y-8"
    >
      <div>
        <h1
          style={{
            color: 'var(--text-primary)',
          }}
          className="text-2xl font-bold tracking-tight"
        >
          Subscriptions & Revenue
        </h1>

        <p
          style={{
            color: 'var(--text-primary)',
          }}
          className="text-sm mt-1 opacity-70"
        >
          Monitor Stripe recurring revenue,
          billing status, and subscriber churn.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-red-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setError('')}
              className="text-xs opacity-70 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <SubscriptionMetrics
        mrr={stats.mrr}
        activeSubscribers={stats.active}
        churnRate={stats.churnRate}
        failedPayments={stats.pastDue}
      />

      <SubscriptionFilters
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-sm opacity-70"
          >
            Loading subscriptions...
          </p>
        </div>
      ) : paginatedSubscriptions.length === 0 ? (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
          className="border rounded-xl py-16 text-center"
        >
          <p
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-sm font-medium"
          >
            No subscriptions found.
          </p>

          <p
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-xs opacity-50 mt-1"
          >
            Try changing your search or billing status filter.
          </p>
        </div>
      ) : (
        <>
          <SubscriptionsTable
            subscriptions={paginatedSubscriptions}
          />

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() =>
                  setPage((current) =>
                    Math.max(
                      1,
                      current - 1
                    )
                  )
                }
                style={{
                  color: 'var(--text-primary)',
                  borderColor:
                    'var(--border-color)',
                }}
                className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 hover:bg-[var(--bg-accent)] transition-colors"
              >
                Previous
              </button>

              <span
                style={{
                  color: 'var(--text-primary)',
                }}
                className="text-sm opacity-70"
              >
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                disabled={
                  page >= totalPages
                }
                onClick={() =>
                  setPage((current) =>
                    Math.min(
                      totalPages,
                      current + 1
                    )
                  )
                }
                style={{
                  color: 'var(--text-primary)',
                  borderColor:
                    'var(--border-color)',
                }}
                className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40 hover:bg-[var(--bg-accent)] transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}