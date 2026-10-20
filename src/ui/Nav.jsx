import React from 'react';
import TLink from './TLink';
import ThemeToggle from './ThemeToggle';
import { routes } from '../routes';

const items = routes.filter((r) => r.label);

export default function Nav() {
  return (
    <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <nav aria-label="Main" className="pointer-events-auto brut rounded-full bg-paper h-12 w-full max-w-3xl flex items-center gap-1 pl-4 pr-1.5">
        <TLink to="/" className="meta mr-auto whitespace-nowrap hover:text-accent-ink">
          <span className="hidden sm:inline">julien guinot</span>
          <span className="sm:hidden">jg</span>
        </TLink>
        <ul className="flex items-center gap-0.5 sm:gap-1">
          {items.map((item) => (
            <li key={item.path}>
              <TLink
                to={item.path}
                className={({ active }) => `inline-flex items-center h-9 px-3 sm:px-4 rounded-full text-[15px] font-semibold transition-colors ${
                  active ? 'bg-accent text-on-accent' : 'hover:bg-ink hover:text-paper'
                }`}
              >
                {item.label}
              </TLink>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
