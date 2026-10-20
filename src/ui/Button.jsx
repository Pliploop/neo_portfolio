import React from 'react';
import TLink from './TLink';

const VARIANTS = {
  solid: 'bg-ink text-paper',
  outline: 'bg-paper text-ink',
  accent: 'bg-accent text-on-accent',
};

export default function Button({ to, href, external = false, variant = 'solid', className = '', children, ...rest }) {
  const cls = `brut brut-press inline-flex items-center gap-2 rounded-full h-11 px-5 font-semibold ${VARIANTS[variant]} ${className}`;
  if (to) return <TLink to={to} className={cls} {...rest}>{children}</TLink>;
  const target = href;
  if (target) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return <a href={target} className={cls} {...ext} {...rest}>{children}</a>;
  }
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
