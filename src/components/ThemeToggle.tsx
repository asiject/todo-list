'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-4 right-4 z-[100] p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 hover:bg-gray-200 dark:hover:bg-gray-700 shadow border border-gray-200 dark:border-gray-700 transition-colors"
      aria-label="테마 전환"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
} 