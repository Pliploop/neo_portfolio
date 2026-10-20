import React, { useEffect, useMemo, useReducer } from 'react';
import DitherField from '../../fx/DitherField';
import AsciiField from '../../fx/AsciiField';
import DropCapHeading from '../../ui/DropCapHeading';
import TLink from '../../ui/TLink';
import ProgressBar from './ProgressBar';
import { Play, Pause, SkipBack, SkipForward, Heart } from '../../ui/icons';
import { useTransitionNavigate } from '../../ui/navigation';
import { playerLines } from '../../data/about';
import { initialPlayerState, playerReducer, randomBetween, STEPS } from './playerState';

const square = 'brut brut-press h-12 w-12 rounded-2xl bg-paper grid place-items-center';

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
    <div className="min-h-[100svh] flex flex-col items-center justify-center px-4 py-10">
      <article aria-label="Intro player" className="w-full max-w-[380px] brut-thick rounded-card bg-paper overflow-hidden">
        <div className="relative aspect-square border-b-[3px] border-ink">
          <div className={`absolute inset-0 transition-opacity duration-700 ${started ? 'opacity-0' : 'opacity-100'}`}>
            <DitherField seed={7} fg="--accent" cell={4} active={!started} />
          </div>
          <div className={`absolute inset-0 transition-opacity duration-700 ${started ? 'opacity-100' : 'opacity-0'}`}>
            <AsciiField seed={7} blobs={5} fontSize={11} fps={18} active={started} />
          </div>
        </div>
        <div className="p-5">
          <DropCapHeading level={1} text="Julien Guinot" caps={['zighead', 'saint']} accentWord={0} className="text-[2.6rem]" />
          <p className="meta mt-2 min-h-[3em] text-ink/70" aria-live="polite">{playerLines[state.index]}</p>
          <ProgressBar progress={state.progress} total={total} />
          <div className="mt-5 flex items-center justify-between">
            <button type="button" aria-label="Previous line" className={square} onClick={() => dispatch({ type: 'prev' })} disabled={state.index === 0}>
              <SkipBack />
            </button>
            <button
              type="button"
              aria-label={state.playing ? 'Pause' : 'Play'}
              className="brut brut-press h-16 w-16 rounded-full bg-accent text-on-accent grid place-items-center"
              onClick={() => dispatch({ type: 'toggle' })}
            >
              {state.playing ? <Pause width={24} height={24} /> : <Play width={24} height={24} />}
            </button>
            <button type="button" aria-label="Next line" className={square} onClick={() => dispatch({ type: 'next' })} disabled={state.index === state.count - 1}>
              <SkipForward />
            </button>
            <button type="button" aria-label={liked ? 'Unlike' : 'Like'} aria-pressed={liked} className={square} onClick={() => dispatch({ type: 'like' })}>
              <Heart filled={liked} className={liked ? 'text-accent-ink' : ''} />
            </button>
          </div>
        </div>
      </article>
      <TLink to="/about" className="meta mt-6 link">skip →</TLink>
    </div>
  );
}
