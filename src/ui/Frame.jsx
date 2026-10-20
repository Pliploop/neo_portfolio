import React from 'react';

export default function Frame({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`border rule rounded-soft bg-paper ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
