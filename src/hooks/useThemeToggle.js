import { useState } from 'react';
import { getTheme, setTheme } from '../utils/storage';

export const useThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => getTheme() === 'dark');

  const toggle = () => {
    const element = document.body;
    if (getTheme() === 'light') {
      element.classList.add('dark');
      setTheme('dark');
      setIsDark(true);
    } else {
      element.classList.remove('dark');
      setTheme('light');
      setIsDark(false);
    }
  };

  return { isDark, toggle };
};
