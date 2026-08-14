'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '@/public/favicon.png';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  User, 
  LogOut, 
  PanelLeftClose, 
  PanelLeftOpen,
  Menu,
  X
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Subscriptions', href: '/admin/subscriptions', icon: CreditCard },
  { label: 'Profile', href: '/admin/profile', icon: User },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);
  const toggleMobileSidebar = () => setIsMobileOpen((prev) => !prev);

  return (
    <>
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-primary)]">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-[var(--border-color)] bg-[var(--bg-accent)] flex items-center justify-center">
            <Image
              src={logo}
              alt="Ad Pilot Logo"
              width={28}
              height={28}
              priority
              className="object-contain"
            />
          </div>
          <span className="font-bold text-base tracking-tight text-[var(--text-primary)]">
            Ad Pilot
          </span>
        </Link>
        <button
          onClick={toggleMobileSidebar}
          aria-label="Toggle Navigation Menu"
          className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)] transition-colors"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)} 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed md:sticky top-0 z-50 md:z-auto h-screen border-r flex flex-col justify-between p-4 shrink-0 
          bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-primary)]
          transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-20' : 'md:w-64'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6 px-1 h-10">
            <Link
              href="/admin"
              className={`flex items-center gap-3 overflow-hidden ${
                isCollapsed ? 'md:justify-center md:w-full' : ''
              }`}
            >
              <div className="relative w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-[var(--border-color)] bg-[var(--bg-accent)] flex items-center justify-center">
                <Image
                  src={logo}
                  alt="Ad Pilot Logo"
                  width={32}
                  height={32}
                  priority
                  className="object-contain"
                />
              </div>

              <div className={`whitespace-nowrap transition-opacity duration-200 overflow-hidden ${
                isCollapsed ? 'md:hidden' : 'block'
              }`}>
                <span className="font-bold text-lg tracking-tight block text-[var(--text-primary)] truncate">
                  Ad Pilot
                </span>
                <span className="inline-block text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[rgba(59,130,246,0.12)] text-[var(--primary)]">
                  Admin Console
                </span>
              </div>
            </Link>

            <button
              onClick={toggleSidebar}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={`hidden md:flex p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)] transition-colors ${
                isCollapsed ? 'mx-auto mt-2' : ''
              }`}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-5 h-5 shrink-0" />
              ) : (
                <PanelLeftClose className="w-5 h-5 shrink-0" />
              )}
            </button>
          </div>
          <nav className="space-y-1 text-sm font-medium flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200 ${
                    isCollapsed ? 'md:justify-center' : ''
                  } ${
                    isActive
                      ? 'bg-[rgba(59,130,246,0.15)] text-[var(--primary)] border-[rgba(59,130,246,0.3)] font-semibold'
                      : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className={`whitespace-nowrap truncate ${isCollapsed ? 'md:hidden' : 'block'}`}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[var(--border-color)] shrink-0">
            <Link
              href="/dashboard"
              title={isCollapsed ? 'Logout' : undefined}
              className={`flex items-center text-xs py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)] transition-colors ${
                isCollapsed ? 'md:justify-center px-0' : 'justify-between px-2.5'
              }`}
            >
              <span className={`font-medium ${isCollapsed ? 'md:hidden' : 'block'}`}>
                Logout
              </span>
              <LogOut className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}