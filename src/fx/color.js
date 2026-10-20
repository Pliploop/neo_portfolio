export function parseRgbVar(str) {
  const nums = (str || '').match(/\d+(\.\d+)?/g);
  if (!nums || nums.length < 3) return [0, 0, 0];
  return nums.slice(0, 3).map((n) => Math.round(Number(n)));
}

export function readCssColor(name, el = document.documentElement) {
  return parseRgbVar(getComputedStyle(el).getPropertyValue(name));
}
