import React from 'react';
import TLink from './TLink';

const VARIANTS = { solid: 'pill pill-solid', outline: 'pill', accent: 'pill pill-solid' };

export default function Button({ to, href, external = false, variant = 'solid', className = '', children, ...rest }) {
  const cls = `${VARIANTS[variant]} ${className}`;
  if (to) return <TLink to={to} className={cls} {...rest}>{children}</TLink>;
  if (href) {
    const ext = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return <a href={href} className={cls} {...ext} {...rest}>{children}</a>;
  }
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
