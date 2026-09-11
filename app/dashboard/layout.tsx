'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import apiClient from '@/api/client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userPlan, setUserPlan] = useState<'free' | 'pro'>('free');
  const [isMetaConnected, setIsMetaConnected] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await apiClient.get('/auth/me');

        const user = response.data.user;

        setUserPlan(
          String(user?.plan || 'FREE').toLowerCase() === 'pro'
            ? 'pro'
            : 'free'
        );

        setIsMetaConnected(Boolean(user?.isMetaConnected));
      } catch (error) {
        console.error('Failed to load dashboard user:', error);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-surface)] flex">
      <Sidebar userPlan={userPlan} />

      <div className="flex-1 flex flex-col min-w-0 md:ml-64">
        <DashboardNavbar
          isMetaConnected={isMetaConnected}
        />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}