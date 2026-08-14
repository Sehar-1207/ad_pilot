'use client';

import { useState } from 'react';
import UserMetrics from '@/components/admin/users/UserMetrics';
import UserFilters from '@/components/admin/users/UserFilter';
import UsersTable, { UserAccount } from '@/components/admin/users/UserTable';

const INITIAL_USERS: UserAccount[] = [
  {
    id: 'usr_1',
    name: 'Sehar Ajmal',
    email: 'seharajmal452@gmail.com',
    plan: 'Pro',
    status: 'Active',
    joinedDate: 'May 12, 2026',
    adAccountsConnected: 4,
    monthlySpend: '$24,500.00',
    geminiRequests: 1420,
  },
  {
    id: 'usr_2',
    name: 'Alex Johnson',
    email: 'alex@growthagency.io',
    plan: 'Pro',
    status: 'Active',
    joinedDate: 'Jun 02, 2026',
    adAccountsConnected: 2,
    monthlySpend: '$12,400.00',
    geminiRequests: 890,
  },
  {
    id: 'usr_3',
    name: 'Sarah Miller',
    email: 'sarah@ecombrands.com',
    plan: 'Free',
    status: 'Active',
    joinedDate: 'Jun 18, 2026',
    adAccountsConnected: 1,
    monthlySpend: '$1,200.00',
    geminiRequests: 45,
  },
  {
    id: 'usr_4',
    name: 'Emma Wilson',
    email: 'emma@wilsonstudio.com',
    plan: 'Free',
    status: 'Pending Sync',
    joinedDate: 'Jul 01, 2026',
    adAccountsConnected: 0,
    monthlySpend: '$0.00',
    geminiRequests: 12,
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('All');

  const handleUpdatePlan = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, plan: u.plan === 'Pro' ? 'Free' : 'Pro' } : u
      )
    );
  };

  const handleToggleBan = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'Suspended' ? 'Active' : 'Suspended' }
          : u
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan =
      selectedPlan === 'All' || user.plan === selectedPlan;

    return matchesSearch && matchesPlan;
  });

  const totalUsers = users.length;
  const proUsers = users.filter((u) => u.plan === 'Pro').length;
  const freeUsers = users.filter((u) => u.plan === 'Free').length;
  const pendingSync = users.filter((u) => u.status === 'Pending Sync').length;

  return (
    <div className="space-y-8">
      <div>
        <h1
          style={{ color: 'var(--text-primary)' }}
          className="text-2xl font-bold tracking-tight"
        >
          User & Plan Management
        </h1>
        <p
          style={{ color: 'var(--text-primary)' }}
          className="text-sm mt-1 opacity-70"
        >
          Inspect registered Ad Pilot users, connected Meta accounts, and subscription tiers.
        </p>
      </div>

      <UserMetrics
        totalUsers={totalUsers}
        proUsers={proUsers}
        freeUsers={freeUsers}
        pendingSync={pendingSync}
      />

      <UserFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedPlan={selectedPlan}
        onPlanChange={setSelectedPlan}
      />
      <UsersTable
        users={filteredUsers}
        onUpdatePlan={handleUpdatePlan}
        onToggleBan={handleToggleBan}
      />
    </div>
  );
}