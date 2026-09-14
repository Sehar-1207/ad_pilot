'use client';

import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

import ThemeToggle from '@/components/admin/profile/ThemeToggle';
import PersonalInfoForm from '@/components/admin/profile/PersonalInfoForm';
import SecuritySettings from '@/components/admin/profile/SecuritySettings';

import { getAdminProfile } from '@/api/admin';

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getAdminProfile();

      if (!response?.success) {
        throw new Error(
          response?.error ||
            response?.message ||
            'Failed to load admin profile.'
        );
      }

      const admin = response?.admin || response?.data;

      if (admin) {
        setProfile({
          id: admin.id || '',
          name: admin.name || '',
          email: admin.email || '',
          role: admin.role || 'ADMIN',
        });
      }
    } catch (err: any) {
      console.error('Admin profile error:', err);

      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          err?.message ||
          'Failed to load admin profile.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: 'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
        className="w-full h-full min-h-0 flex items-center justify-center"
      >
        <p className="text-xs opacity-70">
          Loading admin profile...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
      className="w-full h-full min-h-0 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto h-full min-h-0 px-4 sm:px-5 lg:px-6 py-4 flex flex-col">

        <div className="shrink-0 text-center mb-3">
          <h1
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-xl sm:text-2xl font-bold tracking-tight"
          >
            Admin Profile Settings
          </h1>

          <p
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-[11px] sm:text-xs mt-1 opacity-70"
          >
            Manage your account preferences, theme appearance,
            and security credentials.
          </p>
        </div>

        {error && (
          <div className="shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 mb-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] text-red-500">
                {error}
              </p>

              <button
                type="button"
                onClick={loadProfile}
                className="shrink-0 text-[11px] font-semibold text-red-500 hover:underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
          className="shrink-0 border rounded-xl px-4 py-3 mb-3 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="min-w-0">
            <h2
              style={{
                color: 'var(--text-primary)',
              }}
              className="text-sm font-bold"
            >
              Appearance Theme
            </h2>

            <p
              style={{
                color: 'var(--text-primary)',
              }}
              className="text-[10px] mt-0.5 opacity-60"
            >
              Select your preferred visual style for the
              Ad Pilot console.
            </p>
          </div>

          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>

        <div
          className="
            flex-1
            min-h-0
            overflow-y-auto
            lg:overflow-hidden
            overscroll-contain
            pr-1
            lg:pr-0
          "
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 items-stretch">
            <PersonalInfoForm />
            <SecuritySettings />
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-accent)',
              borderColor: 'var(--border-color)',
            }}
            className="mt-3 lg:mt-4 mb-2 p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between text-[10px] gap-2"
          >
            <div
              style={{
                color: 'var(--primary)',
              }}
              className="flex items-center gap-2 font-bold"
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />

              <span>
                Root Administrator Session Active
              </span>
            </div>

            <span
              style={{
                color: 'var(--text-primary)',
              }}
              className="opacity-70 font-medium"
            >
              {profile?.role
                ? `Role: ${profile.role}`
                : 'Administrator'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}