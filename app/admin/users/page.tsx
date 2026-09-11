'use client';

import { useEffect, useState } from 'react';

import UserMetrics from '@/components/admin/users/UserMetrics';
import UserFilters from '@/components/admin/users/UserFilter';
import UsersTable, {
  UserAccount,
} from '@/components/admin/users/UserTable';

import { getAdminUsers, updateAdminUser } from '@/api/admin';

interface AdminUsersResponse {
  success: boolean;
  data: {
    users: any[];
    statistics: {
      total: number;
      proUsers: number;
      freeUsers: number;
      pendingSync: number;
    };
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  error?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserAccount[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('All');

  const [total, setTotal] = useState(0);
  const [proUsers, setProUsers] = useState(0);
  const [freeUsers, setFreeUsers] = useState(0);
  const [pendingSync, setPendingSync] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 10;

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');

      const response: AdminUsersResponse = await getAdminUsers({
        page,
        limit: LIMIT,
        search: searchQuery.trim() || undefined,
      });

      if (!response?.success) {
        throw new Error(
          response?.error || 'Failed to load users'
        );
      }

      const backendUsers = response.data?.users || [];

      const filteredUsers =
        selectedPlan === 'All'
          ? backendUsers
          : backendUsers.filter(
              (user: any) =>
                user.plan === selectedPlan.toUpperCase()
            );

      const mappedUsers: UserAccount[] =
        filteredUsers.map((user: any) => ({
          id: user._id || user.id,

          name: user.name || 'Unknown User',

          email: user.email || '-',

          plan:
            user.plan === 'PRO'
              ? 'Pro'
              : 'Free',

          status: user.isMetaConnected
            ? 'Active'
            : 'Pending Sync',

          joinedDate: user.createdAt
            ? new Date(
                user.createdAt
              ).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })
            : '-',

          adAccountsConnected:
            user.metaAdAccountId ? 1 : 0,

          monthlySpend: '$0.00',

          geminiRequests: 0,
        }));

      setUsers(mappedUsers);

      setTotalPages(
        response.data?.pagination?.totalPages || 1
      );

      setTotal(
        response.data?.statistics?.total || 0
      );

      setProUsers(
        response.data?.statistics?.proUsers || 0
      );

      setFreeUsers(
        response.data?.statistics?.freeUsers || 0
      );

      setPendingSync(
        response.data?.statistics?.pendingSync || 0
      );
    } catch (err: any) {
      console.error(
        'Failed to load admin users:',
        err
      );

      setError(
        err?.response?.data?.error ||
          err?.message ||
          'Failed to load users'
      );

      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, searchQuery, selectedPlan]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedPlan]);

  const handleUpdatePlan = async (
    userId: string
  ) => {
    try {
      setError('');

      const user = users.find(
        (currentUser) =>
          currentUser.id === userId
      );

      if (!user) {
        return;
      }

      const newPlan =
        user.plan === 'Pro'
          ? 'FREE'
          : 'PRO';

      await updateAdminUser(userId, {
        plan: newPlan,
      });

      await loadUsers();
    } catch (err: any) {
      console.error(
        'Failed to update user plan:',
        err
      );

      setError(
        err?.response?.data?.error ||
          err?.message ||
          'Failed to update user plan'
      );
    }
  };

  return (
    <div
      style={{
        color: 'var(--text-primary)',
      }}
      className="h-full space-y-8 overflow-hidden"
    >
      <div>
        <h1
          style={{
            color: 'var(--text-primary)',
          }}
          className="text-2xl font-bold tracking-tight"
        >
          User & Plan Management
        </h1>

        <p
          style={{
            color: 'var(--text-primary)',
          }}
          className="text-sm mt-1 opacity-70"
        >
          Inspect registered Ad Pilot users,
          connected Meta accounts, and subscription
          tiers.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-sm text-red-500">
            {error}
          </p>

          <button
            type="button"
            onClick={loadUsers}
            className="mt-2 text-sm font-medium underline"
          >
            Try again
          </button>
        </div>
      )}

      <UserMetrics
        totalUsers={total}
        proUsers={proUsers}
        freeUsers={freeUsers}
        pendingSync={pendingSync}
      />

      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setPage(1);
        }}
        selectedPlan={selectedPlan}
        onPlanChange={(value) => {
          setSelectedPlan(value);
          setPage(1);
        }}
      />

      {loading ? (
        <div
          className="flex items-center justify-center py-20"
          style={{
            color: 'var(--text-primary)',
          }}
        >
          <p className="text-sm opacity-70">
            Loading users...
          </p>
        </div>
      ) : (
        <>
          <UsersTable
            users={users}
            onUpdatePlan={handleUpdatePlan}
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
                className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm opacity-70">
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((current) =>
                    Math.min(
                      totalPages,
                      current + 1
                    )
                  )
                }
                className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
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