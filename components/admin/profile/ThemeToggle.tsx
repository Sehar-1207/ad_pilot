'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{ backgroundColor: 'var(--bg-accent)' }}
        className="h-10 w-48 animate-pulse rounded-lg"
      />
    );
  }

  const themes = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-color)',
      }}
      className="flex items-center gap-1 p-1 border rounded-lg w-fit transition-colors"
    >
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.id;

        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            style={
              isActive
                ? {
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff',
                  }
                : {
                    color: 'var(--text-primary)',
                  }
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              !isActive
                ? 'opacity-70 hover:opacity-100 hover:bg-[var(--bg-accent)]'
                : 'shadow-sm'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}