import { Users, DollarSign, TrendingUp, Zap } from 'lucide-react';
import StatsGrid from '@/components/admin/overview/StatsGrid';
import UsersTable from '@/components/admin/overview/UserTable';
import { StatItem } from '@/components/admin/overview/StatCard';
import { AdminUser } from '@/components/admin/overview/UserTableRow';

const STATS_DATA: StatItem[] = [
  { label: 'Total Managed Users', value: '1,284', change: '+18.2% this mo', isPositive: true, icon: Users },
  { label: 'Monthly Recurring Revenue (MRR)', value: '$14,210', change: '+12.4% vs last mo', isPositive: true, icon: DollarSign },
  { label: 'Pro Plan Subscribers', value: '490', change: '38.1% Conv. Rate', isPositive: true, icon: TrendingUp },
  { label: 'Gemini AI Tokens Used', value: '1.4M', change: 'Avg 2.8k/req', isPositive: true, icon: Zap },
];

const RECENT_USERS: AdminUser[] = [
  { id: 1, name: 'Alex Johnson', email: 'alex@growthagency.io', plan: 'Pro', status: 'Active', adAccounts: 3, spend: '$12,400' },
  { id: 2, name: 'Sarah Miller', email: 'sarah@ecombrands.com', plan: 'Free', status: 'Active', adAccounts: 1, spend: '$1,200' },
  { id: 3, name: 'David Chen', email: 'david@scaleads.co', plan: 'Pro', status: 'Active', adAccounts: 5, spend: '$45,800' },
  { id: 4, name: 'Emma Wilson', email: 'emma@wilsonstudio.com', plan: 'Free', status: 'Pending Sync', adAccounts: 0, spend: '$0' },
];

export default function AdminOverviewPage() {
  return (
    <div 
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
      className="w-full min-h-full transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-10">
        <div>
          <h1 
            style={{ color: 'var(--text-primary)' }}
            className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight"
          >
            System Analytics & Controls
          </h1>
          <p 
            style={{ color: 'var(--text-primary)' }}
            className="text-xs sm:text-sm mt-1 opacity-80 font-normal"
          >
            Monitor global Ad Pilot usage, user accounts, and Pro tier upgrades.
          </p>
        </div>

        <StatsGrid stats={STATS_DATA} />
        <UsersTable users={RECENT_USERS} />
      </div>
    </div>
  );
}