
import UserSearchInput from './UserSearchInput';
import UserTableRow, { AdminUser } from './UserTableRow';

interface UsersTableProps {
  users: AdminUser[];
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UsersTable({
  users,
  searchQuery,
  onSearchChange,
}: UsersTableProps) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
      className="border rounded-xl overflow-hidden shadow-sm transition-colors"
    >
      <div
        style={{ borderColor: 'var(--border-color)' }}
        className="p-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2
            style={{ color: 'var(--text-primary)' }}
            className="text-base font-bold tracking-tight"
          >
            Recent Registrations
          </h2>

          <p
            style={{ color: 'var(--text-primary)' }}
            className="text-xs mt-0.5 opacity-80 font-normal"
          >
            Manage access levels and inspect user syncing status.
          </p>
        </div>

        <UserSearchInput
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className="border-b uppercase tracking-wider text-[11px] font-bold opacity-90"
          >
            <tr>
              <th className="px-6 py-3.5">User</th>
              <th className="px-6 py-3.5">Current Plan</th>
              <th className="px-6 py-3.5">Meta Sync</th>
              <th className="px-6 py-3.5">Connected Spend</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody
            style={{ color: 'var(--text-primary)' }}
            className="divide-y divide-[var(--border-color)] font-medium"
          >
            {users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

