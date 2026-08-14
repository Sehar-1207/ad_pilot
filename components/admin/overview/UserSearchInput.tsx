'use client';

import { Search } from 'lucide-react';

interface UserSearchInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserSearchInput({ value, onChange }: UserSearchInputProps) {
  return (
    <div className="relative w-full md:w-64">
      <Search
        style={{ color: 'var(--text-secondary)' }}
        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search user or email..."
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)',
        }}
        className="w-full border rounded-lg pl-9 pr-3 py-1.5 text-xs transition-colors focus:outline-none focus:border-[var(--primary)] placeholder:text-[var(--text-secondary)]"
      />
    </div>
  );
}