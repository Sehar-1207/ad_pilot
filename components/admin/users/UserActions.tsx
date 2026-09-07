'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, ArrowUpRight } from 'lucide-react';

interface UserActionsDropdownProps {
  currentPlan: string;
  onTogglePlan: () => void;
}

export default function UserActionsDropdown({
  currentPlan,
  onTogglePlan,
}: UserActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        style={{ color: 'var(--text-primary)' }}
        className="p-1.5 rounded-lg hover:bg-[var(--bg-accent)] transition-colors opacity-80 hover:opacity-100"
        aria-label="User actions menu"
        aria-expanded={isOpen}
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
          className="absolute right-0 mt-2 w-48 border rounded-xl shadow-xl z-50 py-1 transition-colors"
        >
          <div
            style={{ color: 'var(--text-primary)' }}
            className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider opacity-60"
          >
            Plan Controls
          </div>

          <div className="py-1">
            <button
              type="button"
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

              {currentPlan === 'Pro'
                ? 'Downgrade to Free'
                : 'Upgrade to Pro'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
