import { useCallback } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { preload } from '../routes';

export function useTransitionNavigate() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  return useCallback(async (to) => {
    try {
      await preload(to.split('#')[0]);
    } catch (err) {
      console.error('[nav] failed to preload route', to, err);
    }
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
