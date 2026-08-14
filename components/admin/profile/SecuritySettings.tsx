'use client';

import { useState } from 'react';
import { KeyRound, Check } from 'lucide-react';

export default function SecuritySettings() {
  const [passSaved, setPassSaved] = useState(false);

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPassSaved(true);
    setTimeout(() => setPassSaved(false), 3000);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
      className="border rounded-xl p-6 space-y-6 transition-colors shadow-sm"
    >
      <div>
        <h2
          style={{ color: 'var(--text-primary)' }}
          className="text-base font-bold"
        >
          Security & Credentials
        </h2>
        <p
          style={{ color: 'var(--text-primary)' }}
          className="text-xs opacity-60 mt-0.5"
        >
          Manage your password and dual-factor authentication options.
        </p>
      </div>

      <form onSubmit={handlePasswordUpdate} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              style={{ color: 'var(--text-primary)' }}
              className="text-xs font-semibold opacity-80 block"
            >
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              className="w-full border rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors placeholder:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <label
              style={{ color: 'var(--text-primary)' }}
              className="text-xs font-semibold opacity-80 block"
            >
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              className="w-full border rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors placeholder:opacity-50"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
            }}
            className="flex items-center gap-2 px-4 py-2 hover:opacity-90 rounded-lg text-xs font-semibold transition-all shadow-sm"
          >
            {passSaved ? <Check className="w-4 h-4" /> : <KeyRound className="w-3.5 h-3.5" />}
            {passSaved ? 'Password Updated' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}