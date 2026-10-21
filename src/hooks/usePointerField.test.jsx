import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import { usePointerField } from './usePointerField';

let pointer;
function Probe() {
  const ref = useRef(null);
  pointer = usePointerField(ref);
  return <div ref={ref} />;
}

function move(x, y) {
  window.dispatchEvent(new MouseEvent('pointermove', { clientX: x, clientY: y }));
}

test('tracks the pointer in normalised coordinates while it is over the element', () => {
  const { container } = render(<Probe />);
  container.firstChild.getBoundingClientRect = () => ({ left: 100, top: 50, width: 200, height: 100, right: 300, bottom: 150 });
  move(150, 100);
  expect(pointer.current).toMatchObject({ x: 0.25, y: 0.5, target: 1 });
  move(900, 900);
  expect(pointer.current.target).toBe(0);
});

test('pointer leaving the window releases the field', () => {
  const { container } = render(<Probe />);
  container.firstChild.getBoundingClientRect = () => ({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100 });
  move(50, 50);
  document.dispatchEvent(new MouseEvent('pointerleave'));
  window.dispatchEvent(new Event('blur'));
  expect(pointer.current.target).toBe(0);
});
