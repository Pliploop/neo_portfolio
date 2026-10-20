import React, { useEffect, useMemo, useReducer } from 'react';
import DitherField from '../../fx/DitherField';
import AsciiField from '../../fx/AsciiField';
import DropCapHeading from '../../ui/DropCapHeading';
import TLink from '../../ui/TLink';
import ProgressBar from './ProgressBar';
import { Play, Pause, SkipBack, SkipForward, Heart } from '../../ui/icons';
import { useTransitionNavigate } from '../../ui/navigation';
import { Sparkle } from '../../ui/Doodle';
import { playerLines } from '../../data/about';
import { initialPlayerState, playerReducer, randomBetween, STEPS } from './playerState';

const round = 'dot-btn h-10 w-10';

export default function Player() {
  const [state, dispatch] = useReducer(playerReducer, playerLines.length, initialPlayerState);
  const go = useTransitionNavigate();
  const total = useMemo(() => randomBetween(180, 240), []);
  const started = state.playing || state.progress > 0;

  useEffect(() => {
    if (!state.playing) return undefined;
    const id = setInterval(() => dispatch({ type: 'tick' }), randomBetween(1200, 1800) / STEPS);
    return () => clearInterval(id);
  }, [state.playing, state.index]);

  useEffect(() => {
    if (!state.ended) return undefined;
    const id = setTimeout(() => go('/about'), 400);
    return () => clearTimeout(id);
  }, [state.ended, go]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, button, a')) return;
      if (e.key === ' ') { e.preventDefault(); dispatch({ type: 'toggle' }); }
      if (e.key === 'ArrowRight') dispatch({ type: 'next' });
      if (e.key === 'ArrowLeft') dispatch({ type: 'prev' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const liked = state.liked[state.index];

  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center px-5 py-10">
      <article aria-label="Intro player" className="w-full max-w-[340px] border rule rounded-[28px] bg-paper p-2.5">
        <div className="relative aspect-square rounded-[20px] overflow-hidden">
          <div className={`absolute inset-0 transition-opacity duration-1000 ${started ? 'opacity-0' : 'opacity-100'}`}>
            <DitherField seed={7} fg="--accent" cell={2} gain={0.8} speed={1.8} active={!started} />
            <div className="absolute inset-0">
              <AsciiField seed={7} blobs={5} fontSize={8} color="--paper" alpha={0.85} fps={14} gain={0.7} speed={1.8} active={!started} />
            </div>
          </div>
          <div className={`absolute inset-0 transition-opacity duration-1000 ${started ? 'opacity-100' : 'opacity-0'}`}>
            <AsciiField seed={7} blobs={5} fontSize={7} alpha={0.85} fps={18} active={started} />
          </div>
          <Sparkle size={16} className="absolute top-3 right-3 text-paper mix-blend-difference" />
        </div>
        <div className="px-3 pt-5 pb-3">
          <div className="flex items-baseline justify-between gap-3">
            <DropCapHeading level={1} text="Julien Guinot" caps={['zighead', 'saint']} accentWord={0} className="heading text-[1.75rem]" />
            <span className="meta text-ink/70 shrink-0">{String(state.index + 1).padStart(2, '0')}/{String(state.count).padStart(2, '0')}</span>
          </div>
          <p className="meta mt-2 min-h-[3em] text-ink/70" aria-live="polite">{playerLines[state.index]}</p>
          <ProgressBar progress={state.progress} total={total} />
          <div className="mt-5 flex items-center justify-between">
            <button type="button" aria-label="Previous line" className={round} onClick={() => dispatch({ type: 'prev' })} disabled={state.index === 0}>
              <SkipBack width={15} height={15} />
            </button>
            <button
              type="button"
              aria-label={state.playing ? 'Pause' : 'Play'}
              className="h-14 w-14 rounded-full bg-ink text-paper grid place-items-center hover:bg-accent-ink transition-colors duration-200"
              onClick={() => dispatch({ type: 'toggle' })}
            >
              {state.playing ? <Pause width={18} height={18} /> : <Play width={18} height={18} />}
            </button>
            <button type="button" aria-label="Next line" className={round} onClick={() => dispatch({ type: 'next' })} disabled={state.index === state.count - 1}>
              <SkipForward width={15} height={15} />
            </button>
            <button type="button" aria-label={liked ? 'Unlike' : 'Like'} aria-pressed={liked} className={round} onClick={() => dispatch({ type: 'like' })}>
              <Heart filled={liked} width={15} height={15} className={liked ? 'text-accent-ink' : ''} />
            </button>
          </div>
        </div>
      </article>
      <TLink to="/about" className="meta mt-8 link text-ink/70">skip intro</TLink>
    </div>
  );
}
