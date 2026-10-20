import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative h-9 w-9 shrink-0 rounded-full border-2 border-ink overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1/2 bg-ink transition-transform duration-300"
        style={{ transform: isDark ? 'translateX(100%)' : 'translateX(0)' }}
      />
    </button>
  );
}
