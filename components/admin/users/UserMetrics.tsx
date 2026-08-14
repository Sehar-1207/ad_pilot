import { Users, UserCheck, Zap, ShieldAlert } from 'lucide-react';

interface UserMetricsProps {
  totalUsers: number;
  proUsers: number;
  freeUsers: number;
  pendingSync: number;
}

export default function UserMetrics({
  totalUsers,
  proUsers,
  freeUsers,
  pendingSync,
}: UserMetricsProps) {
  const metrics = [
    { label: 'Total Accounts', value: totalUsers, icon: Users, iconClass: 'text-slate-500 dark:text-slate-400' },
    { label: 'Pro Tier Subscribers', value: proUsers, icon: Zap, iconClass: 'text-blue-600 dark:text-blue-400' },
    { label: 'Free Tier Users', value: freeUsers, icon: UserCheck, iconClass: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Pending Meta Sync', value: pendingSync, icon: ShieldAlert, iconClass: 'text-amber-600 dark:text-amber-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-color)',
            }}
            className="p-5 border rounded-xl space-y-2 shadow-sm transition-colors"
          >
            <div className="flex items-center justify-between">
              <span
                style={{ color: 'var(--text-primary)' }}
                className="text-xs font-bold uppercase tracking-wider opacity-70"
              >
                {m.label}
              </span>
              <Icon className={`w-4 h-4 ${m.iconClass}`} />
            </div>
            <div
              style={{ color: 'var(--text-primary)' }}
              className="text-2xl font-bold tracking-tight"
            >
              {m.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}