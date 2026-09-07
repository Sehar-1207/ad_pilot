
import { MoreVertical } from 'lucide-react';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: 'Pro' | 'Free' | string;
  status: 'Active' | 'Pending Sync' | string;
  adAccounts: number;
  spend: string;
}

interface UserTableRowProps {
  user: AdminUser;
}

export default function UserTableRow({ user }: UserTableRowProps) {
  return (
    <tr className="hover:bg-[var(--bg-accent)] transition-colors">
      <td className="px-6 py-4">
        <div
          style={{ color: 'var(--text-primary)' }}
          className="font-bold text-xs sm:text-sm"
        >
          {user.name}
        </div>

        <div
          style={{ color: 'var(--text-secondary)' }}
          className="text-xs font-medium mt-0.5"
        >
          {user.email}
        </div>
      </td>

      <td className="px-6 py-4">
        <span
          style={
            user.plan === 'Pro'
              ? {
                  backgroundColor: 'rgba(59, 130, 246, 0.12)',
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                  color: 'var(--primary)',
                }
              : {
                  backgroundColor: 'var(--bg-accent)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)',
                }
          }
          className="inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-bold"
        >
          {user.plan}
        </span>
      </td>

      <td className="px-6 py-4">
        <span
          style={{ color: 'var(--text-primary)' }}
          className="flex items-center gap-2 text-xs font-medium"
        >
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              user.status === 'Active'
                ? 'bg-emerald-500'
                : 'bg-amber-500'
            }`}
          />

          {user.adAccounts > 0
            ? `${user.adAccounts} Ad Accounts`
            : 'Not Connected'}
        </span>
      </td>

      <td
        style={{ color: 'var(--text-primary)' }}
        className="px-6 py-4 font-mono font-bold text-xs"
      >
        {user.spend}
      </td>

      <td className="px-6 py-4 text-right">
        <button
          type="button"
          style={{ color: 'var(--text-primary)' }}
          className="p-1.5 rounded-lg hover:bg-[var(--bg-accent)] transition-colors opacity-80 hover:opacity-100"
          aria-label={`Actions for ${user.name}`}
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
