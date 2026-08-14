'use client';

import UserActionsDropdown from './UserActions';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  plan: 'Pro' | 'Free';
  status: 'Active' | 'Pending Sync' | 'Suspended';
  joinedDate: string;
  adAccountsConnected: number;
  monthlySpend: string;
  geminiRequests: number;
}

interface UsersTableProps {
  users: UserAccount[];
  onUpdatePlan: (userId: string) => void;
  onToggleBan: (userId: string) => void;
}

export default function UsersTable({ users, onUpdatePlan, onToggleBan }: UsersTableProps) {
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
              <th className="px-6 py-3.5">User Details</th>
              <th className="px-6 py-3.5">Subscription Plan</th>
              <th className="px-6 py-3.5">Meta Ads Integration</th>
              <th className="px-6 py-3.5">Monthly Ad Spend</th>
              <th className="px-6 py-3.5">AI Insights Used</th>
              <th className="px-6 py-3.5">Joined</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody
            style={{ color: 'var(--text-primary)' }}
            className="divide-y divide-[var(--border-color)]"
          >
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center opacity-50">
                  No users matched your filter criteria.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-[var(--bg-accent)] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          borderColor: 'var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                        className="w-8 h-8 rounded-full border font-bold flex items-center justify-center shrink-0"
                      >
                        {u.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold flex items-center gap-2">
                          {u.name}
                          {u.status === 'Suspended' && (
                            <span className="text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded font-mono">
                              Suspended
                            </span>
                          )}
                        </div>
                        <div className="opacity-60 text-[11px]">{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      style={
                        u.plan === 'Pro'
                          ? {
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              borderColor: 'rgba(59, 130, 246, 0.3)',
                            }
                          : {
                              backgroundColor: 'var(--bg-primary)',
                              borderColor: 'var(--border-color)',
                            }
                      }
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide border ${
                        u.plan === 'Pro'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'opacity-70'
                      }`}
                    >
                      {u.plan} Tier
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          u.status === 'Active'
                            ? 'bg-emerald-500'
                            : u.status === 'Pending Sync'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      <span>
                        {u.adAccountsConnected > 0
                          ? `${u.adAccountsConnected} Meta ${
                              u.adAccountsConnected === 1 ? 'Account' : 'Accounts'
                            }`
                          : 'Not Connected'}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-mono font-medium">{u.monthlySpend}</td>

                  <td className="px-6 py-4 font-mono opacity-70">
                    {u.geminiRequests.toLocaleString()} reqs
                  </td>

                  <td className="px-6 py-4 opacity-70">{u.joinedDate}</td>

                  <td className="px-6 py-4 text-right">
                    <UserActionsDropdown
                      currentPlan={u.plan}
                      isBanned={u.status === 'Suspended'}
                      onTogglePlan={() => onUpdatePlan(u.id)}
                      onToggleBan={() => onToggleBan(u.id)}
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