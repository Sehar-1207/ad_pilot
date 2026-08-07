'use client';

import Link from 'next/link';
import { Bell, CheckCircle2 } from 'lucide-react';
import { FaFacebook } from 'react-icons/fa6';

interface DashboardNavbarProps {
  isMetaConnected?: boolean;
  userName?: string;
  userRole?: 'User' | 'Admin';
}

export default function DashboardNavbar({
  isMetaConnected = false,
  userName = "Sehar Ajmal",
  userRole = "User"
}: DashboardNavbarProps) {
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <header className="h-16 bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-4 sm:px-6 flex items-center justify-end sticky top-0 z-30 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-3 sm:gap-4">
        
        <button
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
            isMetaConnected
              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
              : 'bg-[#3B82F6] text-white border-transparent hover:bg-[#2563EB] shadow-md shadow-[#3B82F6]/20 active:scale-[0.98]'
          }`}
        >
          {isMetaConnected ? (
            <>
              <CheckCircle2 size={15} className="text-emerald-500" />
              <span>Meta Connected</span>
            </>
          ) : (
            <>
              <FaFacebook size={15} className="text-white" />
              <span>Connect Meta Ads</span>
            </>
          )}
        </button>

        <button
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-accent)] rounded-xl transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#2DD4BF] rounded-full ring-2 ring-[var(--bg-surface)]" />
        </button>

        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2.5 pl-3 border-l border-[var(--border-color)] hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-xs font-black shadow-sm ring-2 ring-[var(--border-color)]">
            {initials}
          </div>
          
          <div className="hidden sm:block text-left">
            <p className="text-xs font-black text-[var(--text-primary)] tracking-wide leading-tight">
              {userName}
            </p>
            <p className="text-[11px] text-[var(--text-secondary)] font-medium">
              {userRole}
            </p>
          </div>
        </Link>

      </div>
    </header>
  );
}