import React from 'react';
import TLink from './TLink';
import ThemeToggle from './ThemeToggle';
import { routes } from '../routes';

const items = routes.filter((r) => r.label);

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-paper/95">
      <nav aria-label="Main" className="mx-auto max-w-6xl h-14 px-5 sm:px-8 flex items-center gap-3 sm:gap-4">
        <TLink to="/" className="meta mr-auto whitespace-nowrap hover:text-accent-ink transition-colors">
          <span className="hidden sm:inline">Julien Guinot</span>
          <span className="sm:hidden">JG</span>
        </TLink>
        <ul className="flex items-center gap-4 sm:gap-7 pl-2">
          {items.map((item) => (
            <li key={item.path}>
              <TLink
                to={item.path}
                className={({ active }) => `relative text-[14px] tracking-[-0.01em] transition-colors ${
                  active ? 'text-ink' : 'text-ink/60 hover:text-ink'
                }`}
              >
                {({ active }) => (
                  <>
                    {active ? <span aria-hidden="true" className="absolute -left-2.5 top-1/2 -translate-y-1/2 h-1 w-1 rounded-full bg-accent" /> : null}
                    {item.label}
                  </>
                )}
              </TLink>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
      <div className="border-b rule" />
    </header>
  );
}
