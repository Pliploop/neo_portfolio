import React from 'react';

const VARIANTS = {
  solid: 'bg-ink text-paper',
  outline: 'bg-paper text-ink',
  accent: 'bg-accent text-on-accent',
};

export default function Button({ to, href, external = false, variant = 'solid', className = '', children, ...rest }) {
  const cls = `brut brut-press inline-flex items-center gap-2 rounded-full h-11 px-5 font-semibold ${VARIANTS[variant]} ${className}`;
  const target = to ?? href;
  if (target) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return <a href={target} className={cls} {...ext} {...rest}>{children}</a>;
  }
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
