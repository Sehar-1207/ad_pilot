
'use client';

import { useEffect, useState } from 'react';
import { User, Mail, Shield, Check } from 'lucide-react';

import {
  getAdminProfile,
  updateAdminProfile,
} from '@/api/admin';

interface AdminProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export default function PersonalInfoForm() {
  const [formData, setFormData] = useState<AdminProfile>({
    name: '',
    email: '',
    role: 'Super Administrator',
    avatarUrl: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  // =========================
  // LOAD ADMIN PROFILE
  // =========================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getAdminProfile();

        console.log('Admin profile response:', response);

        if (!response?.success) {
          throw new Error(
            response?.message ||
              response?.error ||
              'Failed to load admin profile'
          );
        }

        const profile = response?.admin;

        if (!profile) {
          throw new Error('Admin profile data not found');
        }

        setFormData({
          name: profile.name || '',
          email: profile.email || '',
          role:
            profile.role === 'ADMIN'
              ? 'Super Administrator'
              : profile.role || 'Administrator',
          avatarUrl: profile.avatarUrl || '',
        });
      } catch (err: any) {
        console.error('Admin profile error:', err);

        setError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            'Failed to load profile'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // =========================
  // HANDLE FORM SUBMIT
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setSaved(false);
      setError('');

      const response = await updateAdminProfile({
        name: formData.name,
        email: formData.email,
      });

      console.log('Updated admin profile response:', response);

      if (!response?.success) {
        throw new Error(
          response?.message ||
            response?.error ||
            'Failed to update profile'
        );
      }

      if (response?.admin) {
        setFormData((prev) => ({
          ...prev,
          name: response.admin.name ?? prev.name,
          email: response.admin.email ?? prev.email,
          avatarUrl:
            response.admin.avatarUrl ?? prev.avatarUrl,
        }));
      }

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (err: any) {
      console.error('Update admin profile error:', err);

      setError(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          'Failed to update profile'
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)',
        }}
        className="border rounded-xl p-6 shadow-sm"
      >
        <p className="text-sm opacity-70">
          Loading profile...
        </p>
      </div>
    );
  }

  // =========================
  // PROFILE FORM
  // =========================
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
      className="border rounded-xl p-6 space-y-6 transition-colors shadow-sm"
    >
      {/* HEADER */}
      <div>
        <h2
          style={{ color: 'var(--text-primary)' }}
          className="text-base font-bold"
        >
          Personal Information
        </h2>

        <p
          style={{ color: 'var(--text-primary)' }}
          className="text-xs opacity-60 mt-0.5"
        >
          Update your public profile details and administrative
          contact.
        </p>
      </div>

      {/* ERROR MESSAGE */}
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ADMIN AVATAR / BASIC INFO */}
        <div
          style={{
            borderColor: 'var(--border-color)',
          }}
          className="flex items-center gap-4 pb-4 border-b"
        >
          {/* AVATAR */}
          <div
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
            }}
            className="w-16 h-16 rounded-full font-bold text-xl flex items-center justify-center shrink-0 border-2 border-white/20 shadow-sm"
          >
            {formData.name
              ? formData.name
                  .split(' ')
                  .filter(Boolean)
                  .map((word) => word[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              : 'AD'}
          </div>

          {/* NAME / ROLE */}
          <div className="space-y-1">
            <h3
              style={{ color: 'var(--text-primary)' }}
              className="text-sm font-semibold"
            >
              {formData.name || 'Administrator'}
            </h3>

            <p
              style={{ color: 'var(--text-primary)' }}
              className="text-xs opacity-60"
            >
              {formData.role}
            </p>

            <button
              type="button"
              disabled
              style={{
                color: 'var(--primary)',
              }}
              className="text-xs font-semibold opacity-50 cursor-not-allowed"
            >
              Change Avatar
            </button>
          </div>
        </div>

        {/* NAME + EMAIL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* FULL NAME */}
          <div className="space-y-1.5">
            <label
              style={{
                color: 'var(--text-primary)',
              }}
              className="text-xs font-semibold flex items-center gap-1.5 opacity-80"
            >
              <User className="w-3.5 h-3.5 opacity-50" />

              Full Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              required
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              className="w-full border rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-1.5">
            <label
              style={{
                color: 'var(--text-primary)',
              }}
              className="text-xs font-semibold flex items-center gap-1.5 opacity-80"
            >
              <Mail className="w-3.5 h-3.5 opacity-50" />

              Email Address
            </label>

            <input
              type="email"
              disabled
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              required
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
              className="w-full border rounded-lg px-3 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
            />
          </div>
        </div>

        {/* ADMIN ROLE */}
        <div className="space-y-1.5">
          <label
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-xs font-semibold flex items-center gap-1.5 opacity-80"
          >
            <Shield className="w-3.5 h-3.5 opacity-50" />

            Administrative Role
          </label>

          <input
            type="text"
            disabled
            value={formData.role}
            style={{
              backgroundColor: 'var(--bg-accent)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className="w-full border rounded-lg px-3 py-2 text-xs font-medium opacity-50 cursor-not-allowed"
          />
        </div>

        {/* SAVE BUTTON */}
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
            {saved && <Check className="w-4 h-4" />}

            {saving
              ? 'Saving...'
              : saved
                ? 'Changes Saved'
                : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}
