'use client';

import { useEffect, useState } from 'react';
import { Users, DollarSign, TrendingUp, Zap } from 'lucide-react';

import StatsGrid from '@/components/admin/overview/StatsGrid';
import UsersTable from '@/components/admin/overview/UserTable';
import { StatItem } from '@/components/admin/overview/StatCard';
import { AdminUser } from '@/components/admin/overview/UserTableRow';

import { getAdminDashboard } from '@/api/admin';

interface DashboardData {
  totalUsers: number;
  proUsers: number;
  freeUsers: number;
  metaConnectedUsers: number;
  proPercentage: number;
  mrr: number;
  recentUsers: any[];
}

export default function AdminOverviewPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getAdminDashboard();

        console.log('Admin dashboard response:', response);

        if (!response?.success) {
          throw new Error(
            response?.error || 'Failed to load admin dashboard'
          );
        }

        setDashboard(response.data);
      } catch (err: any) {
        console.error('Admin dashboard error:', err);

        setError(
          err?.response?.data?.error ||
            err?.message ||
            'Failed to load admin dashboard'
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
        className="w-full h-full min-h-0 overflow-hidden transition-colors duration-300"
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-sm opacity-70">
            Loading admin dashboard...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
        className="w-full h-full min-h-0 overflow-hidden transition-colors duration-300"
      >
        <div className="w-full h-full flex items-center justify-center px-2">
          <div className="w-full max-w-7xl rounded-xl border border-red-500/30 bg-red-500/10 p-2.5">
            <h2 className="font-semibold text-red-500">
              Failed to load dashboard
            </h2>

            <p className="text-sm mt-2 opacity-80">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  const recentUsers: AdminUser[] = (dashboard.recentUsers || []).map(
    (user: any) => ({
      id: user._id || user.id,
      name: user.name,
      email: user.email,
      plan: user.plan === 'PRO' ? 'Pro' : 'Free',
      status: user.isMetaConnected
        ? 'Active'
        : 'Pending Sync',
      adAccounts: user.metaAdAccountId ? 1 : 0,
      spend: '$0',
    })
  );

  const filteredUsers = recentUsers.filter((user) =>
    `${user.name} ${user.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const stats: StatItem[] = [
    {
      label: 'Total Managed Users',
      value: dashboard.totalUsers.toLocaleString(),
      change: `${dashboard.freeUsers} Free users`,
      isPositive: true,
      icon: Users,
    },
    {
      label: 'Monthly Recurring Revenue (MRR)',
      value: `$${Number(dashboard.mrr || 0).toLocaleString()}`,
      change: `${dashboard.proUsers} active Pro users`,
      isPositive: true,
      icon: DollarSign,
    },
    {
      label: 'Pro Plan Subscribers',
      value: dashboard.proUsers.toLocaleString(),
      change: `${Number(dashboard.proPercentage || 0).toFixed(1)}% Conv. Rate`,
      isPositive: true,
      icon: TrendingUp,
    },
    {
      label: 'Meta Connected Users',
      value: dashboard.metaConnectedUsers.toLocaleString(),
      change: `${
        dashboard.totalUsers > 0
          ? (
              (dashboard.metaConnectedUsers /
                dashboard.totalUsers) *
              100
            ).toFixed(1)
          : 0
      }% connected`,
      isPositive: true,
      icon: Zap,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
      className="w-full h-full min-h-0 overflow-hidden transition-colors duration-300 flex flex-col"
    >
      <div className="w-full h-full min-h-0 flex flex-col px-2 sm:px-3 lg:px-4">

        <div className="shrink-0 pt-2 sm:pt-3">
          <h1
            style={{ color: 'var(--text-primary)' }}
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
          >
            System Analytics & Controls
          </h1>
        </div>

        <div className="shrink-0 mt-5 sm:mt-6">
          <StatsGrid stats={stats} />
        </div>

        <div className="flex-1 min-h-0 mt-5 sm:mt-6 pb-2 overflow-hidden">
          <UsersTable
            users={filteredUsers}
            searchQuery={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}