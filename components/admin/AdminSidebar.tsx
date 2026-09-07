'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
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
  X,
} from 'lucide-react';

import { logoutUser } from '@/api/auth';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    label: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    label: 'Subscriptions',
    href: '/admin/subscriptions',
    icon: CreditCard,
  },
  {
    label: 'Profile',
    href: '/admin/profile',
    icon: User,
  },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      await logoutUser();

      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);

      // Redirect anyway because the local session should
      // not keep the user inside the admin panel.
      router.replace('/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-primary)] shadow-sm">
        <Link
          href="/admin"
          className="flex items-center gap-2.5"
        >
          <div className="relative leading-none rounded-lg overflow-hidden shrink-0 border border-[var(--border-color)] bg-[var(--bg-accent)] flex items-center justify-center p-0">
            <Image
              src={logo}
              alt="Ad Pilot Logo"
              width={32}
              height={32}
              priority
              className="object-cover block w-8 h-8"
            />
          </div>

          <span className="font-bold text-base tracking-tight text-[var(--text-primary)]">
            Ad Pilot
          </span>
        </Link>

        <button
          type="button"
          onClick={toggleMobileSidebar}
          aria-label="Toggle Navigation Menu"
          aria-expanded={isMobileOpen}
          className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)] transition-colors focus:outline-none"
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        aria-label="Admin Navigation Sidebar"
        className={`fixed md:sticky top-0 z-50 md:z-auto h-screen border-r flex flex-col justify-between py-4 shrink-0
          bg-[var(--bg-surface)] border-[var(--border-color)] text-[var(--text-primary)]
          transition-all duration-300 ease-in-out box-border
          ${
            isMobileOpen
              ? 'translate-x-0 w-64 shadow-2xl px-4'
              : '-translate-x-full md:translate-x-0'
          }
          ${
            isCollapsed
              ? 'md:w-16 md:px-2'
              : 'md:w-64 md:px-4'
          }
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">

          {/* Logo */}
          <div
            className={`flex items-center mb-6 h-10 shrink-0 w-full ${
              isCollapsed
                ? 'md:flex-col md:h-auto md:gap-3 md:justify-center'
                : 'justify-between'
            }`}
          >
            <Link
              href="/admin"
              className={`flex items-center gap-3 overflow-hidden ${
                isCollapsed ? 'md:justify-center' : ''
              }`}
            >
              <div className="relative leading-none rounded-lg overflow-hidden shrink-0 border border-[var(--border-color)] bg-[var(--bg-accent)] flex items-center justify-center p-0">
                <Image
                  src={logo}
                  alt="Ad Pilot Logo"
                  width={32}
                  height={32}
                  priority
                  className="object-cover block w-8 h-8"
                />
              </div>

              {!isCollapsed && (
                <div className="whitespace-nowrap transition-opacity duration-200 overflow-hidden min-w-0">
                  <span className="font-bold text-base tracking-tight block text-[var(--text-primary)] truncate">
                    Ad Pilot
                  </span>

                  <span className="inline-block text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-[rgba(59,130,246,0.12)] text-[var(--primary)]">
                    Admin Console
                  </span>
                </div>
              )}
            </Link>

            {/* Collapse Button */}
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label={
                isCollapsed
                  ? 'Expand sidebar'
                  : 'Collapse sidebar'
              }
              className="hidden md:flex p-1.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)] transition-colors focus:outline-none shrink-0"
              title={
                isCollapsed
                  ? 'Expand sidebar'
                  : 'Collapse sidebar'
              }
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-5 h-5 shrink-0" />
              ) : (
                <PanelLeftClose className="w-5 h-5 shrink-0" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1.5 text-sm font-medium flex-1 overflow-y-auto overflow-x-hidden">
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
                  title={
                    isCollapsed
                      ? item.label
                      : undefined
                  }
                  className={`flex items-center gap-3 py-2.5 rounded-lg border transition-all duration-200 ${
                    isCollapsed
                      ? 'md:justify-center md:px-0'
                      : 'px-3'
                  } ${
                    isActive
                      ? 'bg-[rgba(59,130,246,0.15)] text-[var(--primary)] border-[rgba(59,130,246,0.3)] font-semibold'
                      : 'text-[var(--text-secondary)] border-transparent hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />

                  {!isCollapsed && (
                    <span className="whitespace-nowrap truncate">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="pt-4 mt-auto border-t border-[var(--border-color)] shrink-0 w-full">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              title={
                isCollapsed
                  ? 'Logout'
                  : undefined
              }
              className={`w-full flex items-center text-xs py-2.5 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                isCollapsed
                  ? 'md:justify-center md:px-0'
                  : 'justify-between px-3'
              }`}
            >
              {!isCollapsed && (
                <span className="font-medium truncate">
                  {isLoggingOut
                    ? 'Logging out...'
                    : 'Logout'}
                </span>
              )}

              <LogOut className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
