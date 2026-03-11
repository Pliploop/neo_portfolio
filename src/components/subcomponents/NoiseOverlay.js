// Noise overlay using SVG feTurbulence composited over a WebGL gradient.
// mix-blend-mode acts as a lens: color-burn darkens along noise contours,
// overlay boosts local contrast, soft-light is gentler.
const NoiseOverlay = ({
  opacity = 0.09,
  blendMode = 'color-burn',
  baseFrequency = '0.72',
  numOctaves = 4,
  size = 256,
}) => {
  const svg = `<svg viewBox='0 0 ${size} ${size}' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${numOctaves}' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,${svg}")`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        mixBlendMode: blendMode,
      }}
    />
  );
};

export default NoiseOverlay;
