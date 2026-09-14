'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa6';
import { connectMeta, getMetaStatus } from '@/api/meta';
import apiClient from '@/api/client';

interface DashboardNavbarProps {
  isMetaConnected?: boolean;
}

interface ProfileResponse {
  success: boolean;
  data?: {
    name?: string;
    email?: string;
    role?: string;
    plan?: string;
    avatar?: string;
    profilePicture?: string;
  };
  message?: string;
}

interface MetaStatusResponse {
  success: boolean;
  connected: boolean;
  metaUserId?: string | null;
  adAccountId?: string | null;
  tokenExpiresAt?: string | null;
}

export default function DashboardNavbar({
  isMetaConnected = false,
}: DashboardNavbarProps) {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [metaConnected, setMetaConnected] =
    useState(isMetaConnected);

  useEffect(() => {
    setMetaConnected(isMetaConnected);
  }, [isMetaConnected]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response =
          await apiClient.get<ProfileResponse>(
            '/dashboard/profile'
          );

        const profile = response.data?.data;

        if (profile) {
          setUserName(
            profile.name ||
              profile.email ||
              'User'
          );

          setUserRole(
            profile.role
              ? profile.role.charAt(0).toUpperCase() +
                  profile.role.slice(1).toLowerCase()
              : 'User'
          );
        }
      } catch (error) {
        console.error(
          'Failed to load dashboard profile:',
          error
        );

        setUserName('User');
        setUserRole('User');
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const loadMetaStatus = async () => {
      try {
        const response =
          await getMetaStatus();

        if (response?.success) {
          setMetaConnected(
            response.connected === true
          );
        } else {
          setMetaConnected(false);
        }
      } catch (error) {
        console.error(
          'Failed to load Meta status:',
          error
        );

        setMetaConnected(false);
      }
    };

    loadMetaStatus();
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      getMetaStatus()
        .then((response) => {
          if (response?.success) {
            setMetaConnected(
              response.connected === true
            );
          }
        })
        .catch((error) => {
          console.error(
            'Failed to refresh Meta status:',
            error
          );
        });
    };

    window.addEventListener(
      'focus',
      handleFocus
    );

    return () => {
      window.removeEventListener(
        'focus',
        handleFocus
      );
    };
  }, []);

  const displayName =
    loadingProfile
      ? 'Loading...'
      : userName || 'User';

  const displayRole =
    loadingProfile
      ? ''
      : userRole || 'User';

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="h-16 bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-4 sm:px-6 flex items-center justify-end sticky top-0 z-30 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={
            !metaConnected
              ? connectMeta
              : undefined
          }
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
            metaConnected
              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
              : 'bg-[#3B82F6] text-white border-transparent hover:bg-[#2563EB] shadow-md shadow-[#3B82F6]/20 active:scale-[0.98]'
          }`}
        >
          {metaConnected ? (
            <>
              <CheckCircle2
                size={15}
                className="text-emerald-500"
              />
              <span>Meta Connected</span>
            </>
          ) : (
            <>
              <FaFacebook
                size={15}
                className="text-white"
              />
              <span>Connect Meta Ads</span>
            </>
          )}
        </button>

        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2.5 pl-3 border-l border-[var(--border-color)] hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-xs font-black shadow-sm ring-2 ring-[var(--border-color)]">
            {initials || 'U'}
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-xs font-black text-[var(--text-primary)] tracking-wide leading-tight">
              {displayName}
            </p>

            <p className="text-[11px] text-[var(--text-secondary)] font-medium">
              {displayRole}
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}