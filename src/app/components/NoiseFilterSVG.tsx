export default function NoiseFilterSVG() {
  return (
    <svg className="hidden">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.6"
          stitchTiles="stitch"
        ></feTurbulence>
        <feColorMatrix
          in="colorNoise"
          type="matrix"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
        ></feColorMatrix>
        <feComposite
          operator="in"
          in2="SourceGraphic"
          result="monoNoise"
        ></feComposite>
        <feBlend in="SourceGraphic" in2="monoNoise" mode="screen"></feBlend>
      </filter>
    </svg>
  );
}
