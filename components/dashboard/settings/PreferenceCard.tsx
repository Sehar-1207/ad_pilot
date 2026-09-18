'use client';

import { Check, Monitor, Moon, Sun, } from 'lucide-react';
import { useTheme } from 'next-themes';

const themes = [
  {
    value: 'light',
    label: 'Light',
    description: 'Use the light appearance.',
    icon: Sun,
  },
  {
    value: 'dark',
    label: 'Dark',
    description: 'Use the dark appearance.',
    icon: Moon,
  },
  {
    value: 'system',
    label: 'System',
    description: 'Follow your device preference.',
    icon: Monitor,
  },
];

export default function PreferencesCard() {
  const { theme, setTheme, resolvedTheme, } = useTheme();

  const activeTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="p-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Appearance
          </h3>

          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Choose how Ad Pilot should appear on your device.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {themes.map((item) => {
            const Icon = item.icon;
            const selected = theme === item.value;

            return (
              <button key={item.value} type="button" onClick={() =>  setTheme(item.value)}
                className={`relative rounded-xl border p-4 text-left transition ${selected
                    ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                    : 'border-[var(--border-color)] bg-[var(--bg-accent)] hover:border-[var(--primary)]/50'
                  }`}
              >
                {selected && (
                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${selected
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-[var(--bg-primary)] text-[var(--text-secondary)]'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
                  {item.label}
                </p>

                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl bg-[var(--bg-accent)] p-3 text-xs text-[var(--text-secondary)]">
          Current appearance:{' '}
          <span className="font-medium text-[var(--text-primary)]">
            {activeTheme === 'dark'? 'Dark' : 'Light'}
          </span>
        </div>
      </div>
    </section>
  );
}