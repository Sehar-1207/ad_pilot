
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MoreVertical,
  ExternalLink,
} from 'lucide-react';

interface SubscriptionActionsDropdownProps {
  stripeCustomerId: string;
}

export default function SubscriptionActionsDropdown({
  stripeCustomerId,
}: SubscriptionActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  const hasStripeCustomer =
    Boolean(stripeCustomerId) &&
    stripeCustomerId !== '-';

  return (
    <div
      className="relative inline-block text-left"
      ref={dropdownRef}
    >
      {/* ACTION BUTTON */}
      <button
        type="button"
        onClick={() =>
          setIsOpen((current) => !current)
        }
        style={{
          color: 'var(--text-primary)',
        }}
        className="p-1.5 hover:bg-[var(--bg-accent)] rounded-lg opacity-70 hover:opacity-100 transition-colors"
        aria-label="Subscription actions menu"
        aria-expanded={isOpen}
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
          className="absolute right-0 mt-2 w-56 border rounded-xl shadow-xl z-50 py-1 transition-colors"
        >
          {/* HEADER */}
          <div
            style={{
              color: 'var(--text-primary)',
            }}
            className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider opacity-50"
          >
            Stripe Controls
          </div>

          {/* VIEW IN STRIPE */}
          {hasStripeCustomer ? (
            <div className="py-1">
              <a
                href={`https://dashboard.stripe.com/customers/${stripeCustomerId}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                style={{
                  color: 'var(--text-primary)',
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-[var(--bg-accent)] transition-colors font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />

                View in Stripe
              </a>
            </div>
          ) : (
            <div className="px-3 py-2">
              <p
                style={{
                  color: 'var(--text-primary)',
                }}
                className="text-[11px] opacity-50"
              >
                No Stripe customer connected
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

