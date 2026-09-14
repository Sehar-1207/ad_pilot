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

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await getAdminProfile();

        if (!response?.success) {
          throw new Error(
            response?.message ||
              response?.error ||
              'Failed to load admin profile'
          );
        }

        const profile = response?.admin || response?.data;

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

      if (!response?.success) {
        throw new Error(
          response?.message ||
            response?.error ||
            'Failed to update profile'
        );
      }

      const admin = response?.admin;

      if (admin) {
        setFormData((prev) => ({
          ...prev,
          name: admin.name ?? prev.name,
          email: admin.email ?? prev.email,
          avatarUrl: admin.avatarUrl ?? prev.avatarUrl,
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

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
        }}
        className="w-full min-w-0 border rounded-xl p-4 shadow-sm"
      >
        <p
          style={{
            color: 'var(--text-primary)',
          }}
          className="text-xs opacity-70"
        >
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
      className="w-full min-w-0 border rounded-xl p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h2
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-sm font-bold"
          >
            Personal Information
          </h2>

          <p
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-[10px] opacity-60 mt-0.5"
          >
            Manage your profile and administrative contact.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-accent)',
            color: 'var(--primary)',
          }}
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        >
          <User className="w-4 h-4" />
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

      <form onSubmit={handleSubmit} className="space-y-3">

        <div
          style={{
            borderColor: 'var(--border-color)',
          }}
          className="flex items-center gap-3 pb-3 border-b"
        >
          <div
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
            }}
            className="w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center shrink-0"
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

          <div className="min-w-0">
            <h3
              style={{
                color: 'var(--text-primary)',
              }}
              className="text-xs font-semibold truncate"
            >
              {formData.name || 'Administrator'}
            </h3>

            <p
              style={{
                color: 'var(--text-primary)',
              }}
              className="text-[10px] opacity-60"
            >
              {formData.role}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <label
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-[10px] font-semibold flex items-center gap-1.5 opacity-80"
          >
            <User className="w-3 h-3 opacity-50" />
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
            className="w-full h-8 border rounded-lg px-3 text-[11px] font-medium focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div className="space-y-1">
          <label
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-[10px] font-semibold flex items-center gap-1.5 opacity-80"
          >
            <Mail className="w-3 h-3 opacity-50" />
            Email Address
          </label>

          <input
            type="email"
            disabled
            value={formData.email}
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            className="w-full h-8 border rounded-lg px-3 text-[11px] font-medium opacity-60 cursor-not-allowed"
          />
        </div>

        <div className="space-y-1">
          <label
            style={{
              color: 'var(--text-primary)',
            }}
            className="text-[10px] font-semibold flex items-center gap-1.5 opacity-80"
          >
            <Shield className="w-3 h-3 opacity-50" />
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
            className="w-full h-8 border rounded-lg px-3 text-[11px] font-medium opacity-60 cursor-not-allowed"
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={saving}
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
            }}
            className="h-8 px-3 flex items-center gap-1.5 rounded-lg text-[10px] font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {saved && (
              <Check className="w-3.5 h-3.5" />
            )}

            {saving
              ? 'Saving...'
              : saved
                ? 'Saved'
                : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}