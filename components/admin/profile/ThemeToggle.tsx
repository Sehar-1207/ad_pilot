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
        style={{
          backgroundColor: 'var(--bg-accent)',
        }}
        className="h-8 w-36 animate-pulse rounded-lg"
      />
    );
  }

  const themes = [
    {
      id: 'light',
      label: 'Light',
      icon: Sun,
    },
    {
      id: 'dark',
      label: 'Dark',
      icon: Moon,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderColor: 'var(--border-color)',
      }}
      className="flex items-center gap-1 p-1 border rounded-lg w-fit"
    >
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.id;

        return (
          <button
            key={t.id}
            type="button"
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
            className={`h-7 flex items-center gap-1.5 px-3 rounded-md text-[10px] font-semibold transition-all ${
              !isActive
                ? 'opacity-70 hover:opacity-100 hover:bg-[var(--bg-accent)]'
                : 'shadow-sm'
            }`}
          >
            <Icon className="w-3 h-3" />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}