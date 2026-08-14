'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, ArrowUpRight, Ban } from 'lucide-react';

interface UserActionsDropdownProps {
  currentPlan: string;
  isBanned?: boolean;
  onTogglePlan: () => void;
  onToggleBan: () => void;
}

export default function UserActionsDropdown({
  currentPlan,
  isBanned = false,
  onTogglePlan,
  onToggleBan,
}: UserActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ color: 'var(--text-primary)' }}
        className="p-1.5 rounded-lg hover:bg-[var(--bg-accent)] transition-colors opacity-80 hover:opacity-100"
        aria-label="User actions menu"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
          className="absolute right-0 mt-2 w-48 border rounded-xl shadow-xl z-50 py-1 divide-y divide-[var(--border-color)] transition-colors"
        >
          <div
            style={{ color: 'var(--text-primary)' }}
            className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider opacity-60"
          >
            Plan Controls
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                onTogglePlan();
                setIsOpen(false);
              }}
              style={{ color: 'var(--text-primary)' }}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-[var(--bg-accent)] transition-colors"
            >
              <ArrowUpRight
                style={{ color: 'var(--primary)' }}
                className="w-3.5 h-3.5"
              />
              {currentPlan === 'Pro' ? 'Downgrade to Free' : 'Upgrade to Pro'}
            </button>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                onToggleBan();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors ${
                isBanned
                  ? 'text-emerald-600 dark:text-emerald-400 hover:bg-[var(--bg-accent)]'
                  : 'text-rose-600 dark:text-rose-400 hover:bg-rose-500/10'
              }`}
            >
              <Ban className="w-3.5 h-3.5" />
              {isBanned ? 'Unban Account' : 'Suspend Account'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}