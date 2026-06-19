/**
 * Self-contained pixel-art island scene, hand-built from SVG shapes.
 * No external image assets — keeps the repo lightweight and easy to host.
 */
export function IslandScene() {
  return (
    <svg
      viewBox="0 0 400 240"
      preserveAspectRatio="xMidYMid slice"
      className="island-svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {/* sky */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1240" />
          <stop offset="55%" stopColor="#2d1b4e" />
          <stop offset="100%" stopColor="#4a2a5e" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d4e63" />
          <stop offset="100%" stopColor="#0d2a3a" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="400" height="240" fill="url(#sky)" />

      {/* stars */}
      {Array.from({ length: 28 }).map((_, i) => {
        const x = (i * 37) % 400;
        const y = (i * 53) % 110;
        const size = (i % 3 === 0) ? 2 : 1;
        return <rect key={i} x={x} y={y} width={size} height={size} fill="#f0e6ff" opacity={0.5 + (i % 5) * 0.1} />;
      })}

      {/* moon */}
      <circle cx="340" cy="40" r="18" fill="#ffd23f" opacity="0.9" />
      <circle cx="346" cy="34" r="18" fill="#1a1240" opacity="0.85" />

      {/* sea */}
      <rect x="0" y="150" width="400" height="90" fill="url(#sea)" />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect
          key={`wave-${i}`}
          x={(i * 43) % 400}
          y={160 + ((i * 17) % 70)}
          width="14"
          height="2"
          fill="#4ecdc4"
          opacity="0.35"
        />
      ))}

      {/* island ground */}
      <path
        d="M0 170 L20 158 L60 165 L100 150 L150 160 L200 148 L250 162 L300 150 L350 162 L400 155 L400 240 L0 240 Z"
        fill="#2f6e4f"
      />
      <path
        d="M0 178 L40 168 L90 176 L140 166 L190 178 L240 168 L290 178 L340 168 L400 175 L400 240 L0 240 Z"
        fill="#1f4d36"
      />

      {/* path connecting zones (dotted) */}
      <g stroke="#ffd23f" strokeWidth="2" strokeDasharray="4 5" opacity="0.55" fill="none">
        <path d="M88 150 Q160 120 272 72" />
        <path d="M88 150 Q70 170 56 200" />
        <path d="M88 150 Q220 190 320 165" />
      </g>

      {/* small bushes / decoration */}
      {[[120, 158], [180, 168], [240, 156], [305, 170], [50, 175]].map(
        ([x, y], i) => (
          <g key={`bush-${i}`}>
            <rect x={x} y={y} width="8" height="6" fill="#1f4d36" />
            <rect x={x + 2} y={y - 4} width="4" height="4" fill="#2f6e4f" />
          </g>
        )
      )}
    </svg>
  );
}
