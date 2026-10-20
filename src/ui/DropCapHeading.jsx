import React from 'react';

export default function DropCapHeading({ level = 2, text, caps = ['zighead'], accentWord = -1, stack = false, className = '' }) {
  const Tag = `h${level}`;
  const words = text.split(' ');
  return (
    <Tag className={`display ${className}`}>
      {words.map((word, i) => {
        const cap = caps[i];
        const tone = i === accentWord ? 'text-accent-ink' : '';
        return (
          <React.Fragment key={`${word}-${i}`}>
            <span className={stack ? 'block' : 'inline'}>
              {cap ? <span className={`dropcap font-${cap} ${tone}`}>{word[0]}</span> : word[0]}
              {word.slice(1)}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </Tag>
  );
}
