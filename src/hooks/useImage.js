import { useEffect, useState } from 'react';

export function useImage(src) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (!src) return undefined;
    let alive = true;
    const el = new Image();
    el.decoding = 'async';
    el.onload = () => { if (alive) setImg(el); };
    el.onerror = () => { if (alive) setImg(null); };
    el.src = src;
    return () => { alive = false; };
  }, [src]);
  return img;
}
