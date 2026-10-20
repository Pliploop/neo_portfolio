import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTransitionNavigate } from './navigation';
import { preload } from '../routes';

function isModified(e) {
  return e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}

export default function TLink({ to, className = '', children, ...rest }) {
  const go = useTransitionNavigate();
  const { pathname } = useLocation();
  const active = pathname === to;
  const cls = typeof className === 'function' ? className({ active }) : className;
  const warm = () => { preload(to).catch(() => {}); };
  return (
    <a
      href={to}
      aria-current={active ? 'page' : undefined}
      className={cls}
      onMouseEnter={warm}
      onFocus={warm}
      onClick={(e) => {
        if (isModified(e)) return;
        e.preventDefault();
        go(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
