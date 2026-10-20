import { subscribe, __resetLoop } from './fxLoop';

let frames;
beforeEach(() => {
  __resetLoop();
  frames = [];
  vi.stubGlobal('requestAnimationFrame', (cb) => { frames.push(cb); return frames.length; });
  vi.stubGlobal('cancelAnimationFrame', () => {});
});
afterEach(() => vi.unstubAllGlobals());

function flush(now) {
  const pending = frames; frames = [];
  pending.forEach((cb) => cb(now));
}

test('calls subscribers at most at their fps', () => {
  const fn = vi.fn();
  subscribe(fn, 10);
  flush(0); flush(50); flush(100); flush(210);
  expect(fn).toHaveBeenCalledTimes(3);
  expect(fn).toHaveBeenLastCalledWith(0.21);
});

test('stops scheduling when the last subscriber leaves', () => {
  const off = subscribe(() => {}, 30);
  expect(frames).toHaveLength(1);
  off();
  flush(16);
  expect(frames).toHaveLength(0);
});
