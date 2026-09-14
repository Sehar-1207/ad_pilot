import UserSearchInput from './UserSearchInput';
import UserTableRow, { AdminUser } from './UserTableRow';

interface UsersTableProps {
  users: AdminUser[];
  searchQuery: string;
  onSearchChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function UsersTable({
  users,
  searchQuery,
  onSearchChange,
}: UsersTableProps) {
  return (
    <div
      style={{
        backgroundColor: 'transparent',
        borderColor: 'var(--border-color)',
      }}
      className="w-full md:h-full md:min-h-0 border rounded-xl overflow-hidden shadow-sm transition-colors flex flex-col bg-transparent"
    >
      <div
        style={{
          borderColor: 'var(--border-color)',
        }}
        className="shrink-0 p-4 sm:p-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-3 bg-transparent"
      >
        <div>
          <h2
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-base font-bold tracking-tight"
          >
            Recent Registrations
          </h2>
        </div>

        <UserSearchInput
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      <div className="flex-1 min-h-0 md:overflow-y-auto overflow-x-auto overflow-y-visible">
        <table className="w-full min-w-[700px] text-left text-xs bg-transparent">
          <thead
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-primary)',
            }}
            className="border-b uppercase tracking-wider text-[12px] font-bold md:sticky md:top-0 md:z-10"
          >
            <tr>
              <th className="px-6 py-4">
                User
              </th>

              <th className="px-6 py-4">
                Current Plan
              </th>

              <th className="px-6 py-4">
                Meta Sync
              </th>

              <th className="px-6 py-4">
                Connected Spend
              </th>

              <th className="px-6 py-4 text-right align-middle">
                Actions
              </th>
            </tr>
          </thead>

          <tbody
            style={{
              color: 'var(--text-primary)',
            }}
            className="divide-y divide-[var(--border-color)] font-medium bg-transparent"
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