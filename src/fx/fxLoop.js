const subs = new Set();
let rafId = null;

function tick(now) {
  subs.forEach((sub) => {
    if (now - sub.last >= sub.interval) {
      sub.last = now;
      sub.fn(now / 1000);
    }
  });
  rafId = subs.size ? requestAnimationFrame(tick) : null;
}

export function subscribe(fn, fps) {
  const sub = { fn, interval: 1000 / fps - 1, last: -Infinity };
  subs.add(sub);
  if (rafId === null) rafId = requestAnimationFrame(tick);
  return () => {
    subs.delete(sub);
    if (!subs.size && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}

export function __resetLoop() {
  subs.clear();
  rafId = null;
}
