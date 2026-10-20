export const STEPS = 100;

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function initialPlayerState(count) {
  return { index: 0, count, playing: false, progress: 0, ended: false, liked: Array(count).fill(false) };
}

export function playerReducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return state.ended ? state : { ...state, playing: !state.playing };
    case 'next':
      return { ...state, index: Math.min(state.count - 1, state.index + 1), playing: false, progress: 0 };
    case 'prev':
      return { ...state, index: Math.max(0, state.index - 1), playing: false, progress: 0 };
    case 'like':
      return { ...state, liked: state.liked.map((v, i) => (i === state.index ? !v : v)) };
    case 'tick': {
      if (!state.playing) return state;
      const progress = Math.min(STEPS, state.progress + 1);
      return { ...state, progress, ended: progress >= STEPS, playing: progress < STEPS };
    }
    default:
      return state;
  }
}

export function formatTime(seconds) {
  const s = Math.max(0, Math.round(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
