import { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { preload } from '../routes';

let latest = 0;

export function useTransitionNavigate() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  return useCallback(async (to) => {
    latest += 1;
    const token = latest;
    try {
      await preload(to.split('#')[0]);
    } catch (err) {
      console.error('[nav] failed to load route, falling back to a full page load', to, err);
      if (token === latest) window.location.assign(to);
      return;
    }
    if (token !== latest) return;
    const canAnimate = !reduced && typeof document.startViewTransition === 'function';
    if (!canAnimate) {
      navigate(to);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => navigate(to));
    });
  }, [navigate, reduced]);
}
