/** Diagrama SVG animado comparando los 3 sistemas de helado casero: Cuchilla Creamerizer Ninja vs Tazón Congelador Cuisinart vs Compresor Autónomo. */
export default function IceCreamTechSvg() {
  const drops = Array.from({ length: 12 }).map((_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return {
      x: 200 + Math.cos(a) * 46,
      y: 210 + Math.sin(a) * 46,
      dx: `${Math.cos(a) * 150}px`,
      dy: `${Math.sin(a) * 150}px`,
      d: `${(i % 6) * 0.65}s`,
      r: 7 + (i % 3) * 2,
    };
  });
  const strands = Array.from({ length: 7 }).map((_, i) => {
    const a = (i / 7) * Math.PI * 2 + 0.3;
    const x1 = 200 + Math.cos(a) * 30,
      y1 = 210 + Math.sin(a) * 30;
    const x2 = 200 + Math.cos(a) * 120,
      y2 = 210 + Math.sin(a) * 120;
    const mx = 200 + Math.cos(a + 0.5) * 80,
      my = 210 + Math.sin(a + 0.5) * 80;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  });
  return (
    <div className="gel-scene relative mx-auto aspect-square w-full max-w-[460px]">
      <svg
        viewBox="0 0 400 420"
        className="h-full w-full"
        role="img"
        aria-label="Diagrama animado de las 3 tecnologías de máquinas de helado caseras: cuchilla CREAMi, tazón Cuisinart y compresor"
      >
        <defs>
          <filter id="fg-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b" />
            <feColorMatrix
              in="b"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            />
          </filter>
          <radialGradient id="fg-gel" cx="45%" cy="40%" r="60%">
            <stop offset="0" stopColor="#FDE68A" />
            <stop offset="0.55" stopColor="#E11D48" />
            <stop offset="1" stopColor="#0284C7" />
          </radialGradient>
          <radialGradient id="fg-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#E11D48" stopOpacity="0.35" />
            <stop offset="1" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="210" r="190" fill="url(#fg-halo)" />
        <circle
          cx="200"
          cy="210"
          r="150"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeDasharray="3 7"
        />
        <circle
          cx="200"
          cy="210"
          r="105"
          fill="none"
          stroke="rgba(253,230,138,0.42)"
          strokeDasharray="5 5"
        />
        {strands.map((d, i) => (
          <path
            key={i}
            d={d}
            className="fiber-strand"
            fill="none"
            stroke="#38BDF8"
            strokeOpacity="0.78"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        <g filter="url(#fg-goo)">
          <circle
            className="gel-blob"
            cx="200"
            cy="210"
            r="46"
            fill="url(#fg-gel)"
          />
          <circle
            className="gel-blob"
            cx="178"
            cy="196"
            r="26"
            fill="#FB7185"
            style={{ animationDelay: "0.4s" }}
          />
          <circle
            className="gel-blob"
            cx="224"
            cy="226"
            r="24"
            fill="#38BDF8"
            style={{ animationDelay: "0.9s" }}
          />
          {drops.map((p, i) => (
            <circle
              key={i}
              className="drop"
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="#FDE68A"
              style={{
                ["--dx" as string]: p.dx,
                ["--dy" as string]: p.dy,
                animationDelay: p.d,
              }}
            />
          ))}
        </g>
        <g fontFamily="Inter, sans-serif" fontSize="11" fontWeight="700">
          <g transform="translate(8 38)">
            <rect
              width="184"
              height="26"
              rx="13"
              fill="rgba(225,29,72,0.28)"
              stroke="rgba(253,164,175,0.65)"
            />
            <text x="92" y="17" textAnchor="middle" fill="#FFE4E6">
              Cuchilla Ninja CREAMi (2 min)
            </text>
          </g>
          <g transform="translate(206 54)">
            <rect
              width="186"
              height="26"
              rx="13"
              fill="rgba(2,132,199,0.28)"
              stroke="rgba(56,189,248,0.65)"
            />
            <text x="93" y="17" textAnchor="middle" fill="#E0F2FE">
              Tazón Cuisinart 1.5–2.0 Qt
            </text>
          </g>
          <g transform="translate(56 372)">
            <rect
              width="288"
              height="26"
              rx="13"
              fill="rgba(245,158,11,0.24)"
              stroke="rgba(253,230,138,0.65)"
            />
            <text x="144" y="17" textAnchor="middle" fill="#FEF08A">
              Compresor ICE-100 / Whynter · 0 cm³ en Freezer
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
