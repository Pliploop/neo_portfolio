import { useEffect, useMemo, useState } from 'react';
import { readCssColor } from '../fx/color';

export function useCssColors(names) {
  const key = names.join('|');
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const mo = new MutationObserver(() => setVersion((v) => v + 1));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => names.map((n) => readCssColor(n)), [key, version]);
}
