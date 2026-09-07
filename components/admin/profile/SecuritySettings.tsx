'use client';

import { useState } from 'react';
import { KeyRound, Check } from 'lucide-react';

import { changePassword } from '@/api/profile';

export default function SecuritySettings() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [passSaved, setPassSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setPassSaved(false);
      setError('');

      if (!formData.currentPassword || !formData.newPassword) {
        setError('Please enter both your current and new password.');
        return;
      }

      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters long.');
        return;
      }

      const response = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (!response?.success) {
        throw new Error(
          response?.message ||
            response?.error ||
            'Failed to update password'
        );
      }

      setFormData({
        currentPassword: '',
        newPassword: '',
      });

      setPassSaved(true);

      setTimeout(() => {
        setPassSaved(false);
      }, 3000);
    } catch (err: any) {
      console.error('Password update error:', err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          'Failed to update password'
      );
    } finally {
      setSaving(false);
    }
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

      {error && (
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
            color: 'var(--text-primary)',
          }}
          className="border rounded-lg px-4 py-3 text-xs"
        >
          {error}
        </div>
      )}

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
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentPassword: e.target.value,
                })
              }
              placeholder="••••••••••••"
              autoComplete="current-password"
              required
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
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newPassword: e.target.value,
                })
              }
              placeholder="••••••••••••"
              autoComplete="new-password"
              required
              minLength={6}
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
            disabled={saving}
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
            }}
            className="flex items-center gap-2 px-4 py-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-semibold transition-all shadow-sm"
          >
            {passSaved ? (
              <Check className="w-4 h-4" />
            ) : (
              <KeyRound className="w-3.5 h-3.5" />
            )}

            {saving
              ? 'Updating...'
              : passSaved
                ? 'Password Updated'
                : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}
