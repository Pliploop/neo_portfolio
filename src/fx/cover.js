export function coverTransform(boxW, boxH, imgW, imgH) {
  const boxRatio = boxW / boxH;
  const imgRatio = imgW / imgH;
  if (imgRatio > boxRatio) {
    const sx = boxRatio / imgRatio;
    return { scale: [sx, 1], offset: [(1 - sx) / 2, 0] };
  }
  const sy = imgRatio / boxRatio;
  return { scale: [1, sy], offset: [0, (1 - sy) / 2] };
}
