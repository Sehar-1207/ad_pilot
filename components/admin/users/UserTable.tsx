'use client';

import UserActionsDropdown from './UserActions';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  plan: 'Pro' | 'Free';
  status: 'Active' | 'Pending Sync';
  joinedDate: string;
  adAccountsConnected: number;
  monthlySpend: string;
  geminiRequests: number;
}

interface UsersTableProps {
  users: UserAccount[];
  onUpdatePlan: (userId: string) => void;
}

export default function UsersTable({
  users,
  onUpdatePlan,
}: UsersTableProps) {
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
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center opacity-50"
                >
                  No users matched your filter criteria.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-[var(--bg-accent)] transition-colors"
                >
                  {/* User Details */}
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
                        {user.name.slice(0, 2).toUpperCase()}
                      </div>

                      <div>
                        <div className="font-semibold">
                          {user.name}
                        </div>

                        <div className="opacity-60 text-[11px]">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Subscription Plan */}
                  <td className="px-6 py-4">
                    <span
                      style={
                        user.plan === 'Pro'
                          ? {
                              backgroundColor:
                                'rgba(59, 130, 246, 0.1)',
                              borderColor:
                                'rgba(59, 130, 246, 0.3)',
                            }
                          : {
                              backgroundColor:
                                'var(--bg-primary)',
                              borderColor:
                                'var(--border-color)',
                            }
                      }
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide border ${
                        user.plan === 'Pro'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'opacity-70'
                      }`}
                    >
                      {user.plan} Tier
                    </span>
                  </td>

                  {/* Meta Ads Integration */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          user.status === 'Active'
                            ? 'bg-emerald-500'
                            : 'bg-amber-500'
                        }`}
                      />

                      <span>
                        {user.adAccountsConnected > 0
                          ? `${user.adAccountsConnected} Meta ${
                              user.adAccountsConnected === 1
                                ? 'Account'
                                : 'Accounts'
                            }`
                          : 'Not Connected'}
                      </span>
                    </div>
                  </td>

                  {/* Monthly Spend */}
                  <td className="px-6 py-4 font-mono font-medium">
                    {user.monthlySpend}
                  </td>

                  {/* Gemini Requests */}
                  <td className="px-6 py-4 font-mono opacity-70">
                    {user.geminiRequests.toLocaleString()} reqs
                  </td>

                  {/* Joined Date */}
                  <td className="px-6 py-4 opacity-70">
                    {user.joinedDate}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <UserActionsDropdown
                      currentPlan={user.plan}
                      onTogglePlan={() => onUpdatePlan(user.id)}
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
