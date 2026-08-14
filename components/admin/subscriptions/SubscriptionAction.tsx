'use client';

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, RotateCcw, XCircle, ExternalLink } from 'lucide-react';

interface SubscriptionActionsDropdownProps {
  status: string;
  stripeCustomerId: string;
  onCancelSub: () => void;
  onRetryPayment: () => void;
}

export default function SubscriptionActionsDropdown({
  status,
  stripeCustomerId,
  onCancelSub,
  onRetryPayment,
}: SubscriptionActionsDropdownProps) {
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
        className="p-1.5 hover:bg-[var(--bg-accent)] rounded-lg opacity-70 hover:opacity-100 transition-colors"
        aria-label="Subscription actions menu"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
          className="absolute right-0 mt-2 w-52 border rounded-xl shadow-xl z-50 py-1 divide-y divide-[var(--border-color)] transition-colors"
        >
          <div
            style={{ color: 'var(--text-primary)' }}
            className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider opacity-50"
          >
            Stripe Controls
          </div>

          <div className="py-1">
            <a
              href={`https://dashboard.stripe.com/customers/${stripeCustomerId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-primary)' }}
              className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-[var(--bg-accent)] transition-colors font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              View in Stripe
            </a>
          </div>

          {status === 'Past Due' && (
            <div className="py-1">
              <button
                onClick={() => {
                  onRetryPayment();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retry Failed Charge
              </button>
            </div>
          )}

          {status === 'Active' && (
            <div className="py-1">
              <button
                onClick={() => {
                  onCancelSub();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 font-medium transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                Cancel Subscription
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}