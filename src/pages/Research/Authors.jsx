import React from 'react';
import { isOwner } from '../../data/paperUtils';

export default function Authors({ authors }) {
  return (
    <p className="meta text-ink/70">
      {authors.map((a, i) => (
        <React.Fragment key={a}>
          <span className={isOwner(a) ? 'text-ink font-semibold' : ''}>{a}</span>
          {i < authors.length - 1 ? ', ' : ''}
        </React.Fragment>
      ))}
    </p>
  );
}
