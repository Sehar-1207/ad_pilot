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
  const [profile, setProfile] =
    useState<AdminProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const response =
        await getAdminProfile();

      if (!response?.success) {
        throw new Error(
          response?.error ||
            'Failed to load admin profile.'
        );
      }

      setProfile(response.data);
    } catch (err: any) {
      console.error(
        'Admin profile error:',
        err
      );

      setError(
        err?.response?.data?.error ||
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
          backgroundColor:
            'var(--bg-primary)',
          color: 'var(--text-primary)',
        }}
        className="w-full min-h-screen flex items-center justify-center"
      >
        <p className="text-sm opacity-70">
          Loading admin profile...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor:
          'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
      className="w-full min-h-screen px-4 py-8 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        <div className="text-center">
          <h1
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-2xl font-bold tracking-tight"
          >
            Admin Profile Settings
          </h1>

          <p
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-sm mt-1 opacity-80 font-normal"
          >
            Manage your account preferences,
            theme appearance, and security
            credentials.
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-red-500">
                {error}
              </p>

              <button
                type="button"
                onClick={loadProfile}
                className="text-xs font-medium text-red-500 hover:underline"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            backgroundColor:
              'var(--bg-surface)',
            borderColor:
              'var(--border-color)',
          }}
          className="border rounded-xl p-6 space-y-4 text-center flex flex-col items-center justify-center shadow-sm transition-colors"
        >
          <div>
            <h2
              style={{
                color: 'var(--text-primary)',
              }}
              className="text-base font-bold"
            >
              Appearance Theme
            </h2>

            <p
              style={{
                color: 'var(--text-primary)',
              }}
              className="text-xs mt-0.5 opacity-80 font-medium"
            >
              Select your preferred visual
              style for the Ad Pilot console
              interface.
            </p>
          </div>

          <div className="flex justify-center w-full">
            <ThemeToggle />
          </div>
        </div>

        <PersonalInfoForm />

        <SecuritySettings />

        <div
          style={{
            backgroundColor:
              'var(--bg-accent)',
            borderColor:
              'var(--border-color)',
          }}
          className="p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between text-xs gap-3"
        >
          <div
            style={{
              color: 'var(--primary)',
            }}
            className="flex items-center gap-2 font-bold"
          >
            <ShieldCheck className="w-4 h-4 shrink-0" />

            <span>
              Root Administrator Session Active
            </span>
          </div>

          <span
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-[11px] opacity-80 font-medium"
          >
            {profile?.role
              ? `Role: ${profile.role}`
              : 'Administrator'}
          </span>
        </div>
      </div>
    </div>
  );
}
