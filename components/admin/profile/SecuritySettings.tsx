'use client';

import { useState } from 'react';
import { KeyRound, Check, ShieldCheck } from 'lucide-react';

import { changePassword } from '@/api/profile';

export default function SecuritySettings() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [passSaved, setPassSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);
      setPassSaved(false);
      setError('');

      if (
        !formData.currentPassword ||
        !formData.newPassword
      ) {
        setError(
          'Please enter both your current and new password.'
        );
        return;
      }

      if (formData.newPassword.length < 6) {
        setError(
          'New password must be at least 6 characters long.'
        );
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
      className="w-full min-w-0 h-full border rounded-xl p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h2
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-sm font-bold"
          >
            Security & Credentials
          </h2>

          <p
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-[10px] opacity-60 mt-0.5"
          >
            Manage your administrator password securely.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-accent)',
            color: 'var(--primary)',
          }}
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        >
          <ShieldCheck className="w-4 h-4" />
        </div>
      </div>

      {error && (
        <div
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
            color: 'var(--text-primary)',
          }}
          className="border rounded-lg px-3 py-2 mb-3 text-[10px]"
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handlePasswordUpdate}
        className="space-y-3"
      >
        <div className="space-y-1">
          <label
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-[10px] font-semibold opacity-80 block"
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
            placeholder="••••••••"
            autoComplete="current-password"
            required
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className="w-full h-8 border rounded-lg px-3 text-[11px] font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)] placeholder:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <label
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-[10px] font-semibold opacity-80 block"
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
            placeholder="••••••••"
            autoComplete="new-password"
            required
            minLength={6}
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className="w-full h-8 border rounded-lg px-3 text-[11px] font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)] placeholder:opacity-50"
          />
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div
            style={{
              color: 'var(--text-primary)',
            }}
            className="flex items-center gap-1.5 text-[9px] opacity-60"
          >
            <KeyRound className="w-3 h-3 shrink-0" />
            Minimum 6 characters
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
            }}
            className="h-8 px-3 flex items-center gap-1.5 rounded-lg text-[10px] font-semibold hover:opacity-90 disabled:opacity-50 shrink-0"
          >
            {passSaved ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <KeyRound className="w-3 h-3" />
            )}

            {saving
              ? 'Updating...'
              : passSaved
                ? 'Updated'
                : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}