'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {  LayoutDashboard,  Target,  Sparkles,  Settings,  User,  Zap,  Menu,  X,  LogOut } from 'lucide-react';
import logo from '@/public/ad-logo.png';

interface SidebarProps {
  userPlan?: 'free' | 'pro';
}

export default function Sidebar({ userPlan = 'free' }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Campaigns', href: '/dashboard/campaigns', icon: Target },
    { 
      label: 'AI Insights', 
      href: '/dashboard/insights', 
      icon: Sparkles, 
      isProFeature: true 
    },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
  ];

  return (
    <>
      {!isOpen && (
        <div className="md:hidden fixed top-3 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-lg border border-[var(--border-color)] focus:outline-none shadow-sm"
            aria-label="Open Dashboard Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[var(--bg-surface)] text-[var(--text-primary)] flex flex-col justify-between border-r border-[var(--border-color)] transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between px-6 h-16 border-b border-[var(--border-color)]">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center p-1 rounded-xl bg-gradient-to-tr from-[#2DD4BF] to-[#3B82F6] shadow-sm">
                <Image 
                  src={logo}
                  alt="Ad Pilot Logo" 
                  width={28} 
                  height={28} 
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-black text-[var(--text-primary)] tracking-tight">
                Ad <span className="bg-gradient-to-r from-[#3B82F6] via-[#2DD4BF] to-[#3B82F6] bg-clip-text text-transparent">Pilot</span>
              </span>
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-accent)] rounded-lg transition-colors"
              aria-label="Close Dashboard Menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mt-6 px-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isLocked = item.isProFeature && userPlan === 'free';

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] text-white shadow-md shadow-[#3B82F6]/20'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? 'stroke-[2.5]' : ''} />
                    <span>{item.label}</span>
                  </div>

                  {item.isProFeature && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isLocked
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30'
                          : isActive 
                            ? 'bg-white/20 text-white' 
                            : 'bg-[#2DD4BF]/15 text-[#2DD4BF]'
                      }`}
                    >
                      PRO
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-[var(--border-color)] space-y-3">
          {userPlan === 'free' ? (
            <div className="p-3.5 bg-[var(--bg-accent)] rounded-xl border border-[var(--border-color)]">
              <div className="flex items-center gap-2 text-[var(--text-primary)] font-extrabold text-xs">
                <Zap size={14} className="text-[#2DD4BF] fill-[#2DD4BF]" />
                <span>Free Plan</span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
                Unlock AI Insights & real-time sync.
              </p>
              <Link
                href="/pricing"
                className="mt-3 block text-center w-full py-2 bg-gradient-to-r from-[#3B82F6] to-[#2DD4BF] hover:opacity-95 text-white font-extrabold text-xs rounded-lg transition-all shadow-md shadow-[#3B82F6]/20"
              >
                Upgrade ($29/mo)
              </Link>
            </div>
          ) : (
            <div className="p-3 bg-[var(--bg-accent)] rounded-xl border border-[#2DD4BF]/30 flex items-center gap-2.5">
              <Zap size={16} className="text-[#2DD4BF] fill-[#2DD4BF]" />
              <div>
                <p className="text-xs font-black text-[var(--text-primary)]">Pro Subscriber</p>
                <p className="text-[10px] text-[#2DD4BF] font-semibold">Unlimited AI Features</p>
              </div>
            </div>
          )}

          <button className="flex items-center gap-3 w-full px-4 py-2 text-xs font-bold text-[var(--text-secondary)] hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors">
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}