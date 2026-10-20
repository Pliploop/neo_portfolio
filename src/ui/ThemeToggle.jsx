import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="dot-btn h-8 w-8 shrink-0"
    >
      <span aria-hidden="true" className="relative block h-3.5 w-3.5 rounded-full border border-ink overflow-hidden">
        <span
          className="absolute inset-y-0 left-0 w-1/2 bg-ink transition-transform duration-500"
          style={{ transform: isDark ? 'translateX(100%)' : 'translateX(0)' }}
        />
      </span>
    </button>
  );
}
