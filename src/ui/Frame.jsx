import React from 'react';

export default function Frame({ as: Tag = 'div', thick = false, className = '', children, ...rest }) {
  return (
    <Tag className={`${thick ? 'brut-thick' : 'brut'} rounded-card bg-paper ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
