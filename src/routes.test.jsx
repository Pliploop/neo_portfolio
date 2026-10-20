import { makePreloader } from './routes';

test('a failed load is not cached, so a retry loads again', async () => {
  const load = vi.fn()
    .mockRejectedValueOnce(new Error('chunk 404'))
    .mockResolvedValueOnce({ default: () => null });
  const { preload, loaded } = makePreloader([{ path: '/x', load }]);
  await expect(preload('/x')).rejects.toThrow('chunk 404');
  await expect(preload('/x')).resolves.toBeTruthy();
  expect(load).toHaveBeenCalledTimes(2);
  expect(loaded.has('/x')).toBe(true);
});

test('unknown paths resolve immediately', async () => {
  const { preload } = makePreloader([]);
  await expect(preload('/nope')).resolves.toBeUndefined();
});
