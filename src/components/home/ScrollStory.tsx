"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    t: "Mide el espacio real libre en tu congelador",
    d: "Un vaso Ninja NC301 (4.4\" × 4.5\") entra en cualquier cajón estrecho; un tazón Cuisinart ICE-21 (7.5\" × 6.2\") requiere altura media; y una máquina con compresor (Cuisinart ICE-100) ocupa 0 cm³ en el freezer.",
  },
  {
    n: "02",
    t: "Decide porciones por lote y presupuesto en Amazon EE. UU.",
    d: "Para 2–3 bolas o porciones fit diarias elige Ninja 16 oz (~US$179) o Dash (<US$30). Para 6–10 bolas familiares de una vez elige Cuisinart ICE-21 (<US$80) o Ninja Deluxe XL 24 oz.",
  },
  {
    n: "03",
    t: "Compara tiempo previo vs preparación al instante",
    d: "Las máquinas de vaso o tazón necesitan 16–24 h en congelador antes de procesar en 2–25 min. Si quieres encender y servir gelato sin esperar 24 h, el compresor lo hace en 40–50 min.",
  },
  {
    n: "04",
    t: "Añade vasos o tazón extra compatibles desde el primer día",
    d: "Tener 4 pintas extra compatibles (NC301 vs NC501 Deluxe) o un segundo tazón ICE-21RFB te permite guardar varios sabores de helados y sorbetes listos sin esperar entre tandas.",
  },
];

export default function ScrollStory() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    let io: IntersectionObserver | null = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        if (reduce) {
          gsap.set(q(".step"), { opacity: 1 });
          gsap.set(q(".bar"), { scaleX: 1 });
          gsap.set(q(".phone-alert, .night, .sound-wave"), { opacity: 1 });
          return;
        }
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=2200",
            scrub: 0.7,
            pin: q(".pin")[0],
            anticipatePin: 1,
          },
        });
        tl.to(q(".step-0"), { opacity: 1, duration: 0.2 }, 0)
          .to(
            q(".step-0 .dot"),
            { backgroundColor: "#0284C7", color: "#fff", duration: 0.2 },
            0
          )
          .fromTo(
            q(".ice-cards"),
            { y: 0 },
            { y: -12, duration: 0.6 },
            0.1
          )
          .to(q(".step-0"), { opacity: 0.75, duration: 0.2 }, 1)
          .to(q(".step-1"), { opacity: 1, duration: 0.2 }, 1)
          .to(
            q(".step-1 .dot"),
            { backgroundColor: "#E11D48", color: "#fff", duration: 0.2 },
            1
          )
          .to(
            q(".chill-wave"),
            { rotate: -4, svgOrigin: "200 155", duration: 0.5 },
            1.15
          )
          .to(
            q(".sound-wave"),
            { opacity: 0.65, scaleX: 0.6, duration: 0.5 },
            1.25
          )
          .to(q(".step-1"), { opacity: 0.75, duration: 0.2 }, 2)
          .to(q(".step-2"), { opacity: 1, duration: 0.2 }, 2)
          .to(
            q(".step-2 .dot"),
            { backgroundColor: "#F59E0B", color: "#0b1820", duration: 0.2 },
            2
          )
          .to(
            q(".spec-bar"),
            { scale: 1.05, svgOrigin: "200 355", duration: 0.7 },
            2.05
          )
          .to(q(".sound-wave"), { opacity: 1, scaleX: 1, duration: 0.5 }, 2.1)
          .to(q(".step-2"), { opacity: 0.75, duration: 0.2 }, 3.1)
          .to(q(".step-3"), { opacity: 1, duration: 0.2 }, 3.1)
          .to(
            q(".step-3 .dot"),
            { backgroundColor: "#0284C7", color: "#fff", duration: 0.2 },
            3.1
          )
          .to(q(".night"), { opacity: 1, duration: 0.6 }, 3.1)
          .to(q(".phone-alert"), { opacity: 1, y: 0, duration: 0.5 }, 3.3)
          .to(q(".done"), { opacity: 1, y: 0, duration: 0.4 }, 3.4)
          .to(q(".bar"), { scaleX: 1, duration: 3.8 }, 0);
      }, el);
    };

    io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io?.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io?.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="ruta-helado"
      ref={root}
      className="relative bg-gradient-to-b from-[var(--fx-cream)] via-fxsky to-[var(--fx-cream)]"
    >
      <div className="pin flex min-h-[100svh] items-center overflow-hidden py-10 lg:py-14">
        <div className="wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <span className="eyebrow">
              Del Congelador a la Bola Perfecta en Casa
            </span>
            <h2 className="section-title mt-3">
              Cuatro decisiones.{" "}
              <span className="text-prune">
                Cero errores de tamaño, tiempo o vasos incompatibles.
              </span>
            </h2>
            <div className="mt-4 h-1.5 w-full max-w-sm overflow-hidden rounded bg-[var(--line)]">
              <div className="bar h-full origin-left scale-x-0 bg-gradient-to-r from-fxblue via-prune to-[#f59e0b]" />
            </div>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`step step-${i} flex gap-4`}
                  style={{ opacity: 0.78 }}
                >
                  <span className="dot grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white font-display font-extrabold text-fxink shadow-md">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-display text-lg font-bold sm:text-xl">
                      {s.t}
                    </p>
                    <p className="text-sm text-[#475569] sm:text-base">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p
              className="done mt-5 hidden text-sm text-[var(--muted)] sm:block"
              style={{ opacity: 0, transform: "translateY(10px)" }}
            >
              Clave de ahorro: una pinta artesanal comprada en tienda cuesta
              entre US$6 y US$10; prepararla en casa con Ninja o Cuisinart baja
              el costo a menos de US$1.50 por tanda.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[360px] lg:max-w-[420px]">
            <svg
              viewBox="0 0 400 440"
              className="relative w-full drop-shadow-[0_30px_50px_rgba(225,29,72,0.18)]"
              role="img"
              aria-label="Esquema animado comparando vasos Ninja CREAMi, tazón congelador Cuisinart y máquina con compresor"
            >
              <defs>
                <linearGradient id="ss-day" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fffdf9" />
                  <stop offset="1" stopColor="#eef7f5" />
                </linearGradient>
                <linearGradient id="ss-night" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0B1820" />
                  <stop offset="0.6" stopColor="#0369A1" />
                  <stop offset="1" stopColor="#BE123C" />
                </linearGradient>
                <clipPath id="ss-panel">
                  <rect x="0" y="0" width="400" height="440" rx="36" />
                </clipPath>
              </defs>
              <g clipPath="url(#ss-panel)">
                <rect width="400" height="440" fill="url(#ss-day)" />
                <rect
                  className="night"
                  width="400"
                  height="440"
                  fill="url(#ss-night)"
                  opacity="0"
                />

                <g className="chill-wave">
                  <path
                    d="M140 125 A75 75 0 0 1 260 125"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M162 140 A48 48 0 0 1 238 140"
                    fill="none"
                    stroke="#E11D48"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <text
                    x="200"
                    y="102"
                    textAnchor="middle"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="10.5"
                    fill="#0369A1"
                  >
                    CREAMERIZER 2 MIN · TAZÓN 20 MIN · COMPRESOR 0H ESPERA
                  </text>
                </g>

                <rect
                  x="95"
                  y="156"
                  width="210"
                  height="172"
                  rx="20"
                  fill="#0B1820"
                  stroke="#38BDF8"
                  strokeWidth="3.5"
                />
                <rect
                  x="118"
                  y="176"
                  width="112"
                  height="118"
                  rx="12"
                  fill="#FFF1F2"
                />
                <circle cx="174" cy="222" r="28" fill="#FB7185" />
                <circle cx="156" cy="240" r="20" fill="#FDE68A" />
                <circle cx="192" cy="242" r="20" fill="#BAE6FD" />

                <rect
                  x="240"
                  y="176"
                  width="48"
                  height="118"
                  rx="10"
                  fill="#E0F2FE"
                  stroke="#0284C7"
                  strokeWidth="2"
                />
                <rect x="240" y="176" width="48" height="18" rx="6" fill="#E11D48" />
                <text
                  x="264"
                  y="246"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="800"
                  fill="#0369A1"
                >
                  16/24
                </text>
                <text
                  x="264"
                  y="260"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="800"
                  fill="#0369A1"
                >
                  oz
                </text>

                <g className="ice-cards">
                  <rect
                    x="18"
                    y="204"
                    width="94"
                    height="48"
                    rx="10"
                    fill="#ffffff"
                    stroke="#0284C7"
                    strokeWidth="2"
                  />
                  <text
                    x="65"
                    y="224"
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="800"
                    fill="#0369A1"
                  >
                    🥣 Pintas Extra
                  </text>
                  <text
                    x="65"
                    y="240"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill="#475569"
                  >
                    16 oz vs 24 oz
                  </text>

                  <rect
                    x="288"
                    y="204"
                    width="94"
                    height="48"
                    rx="10"
                    fill="#ffffff"
                    stroke="#E11D48"
                    strokeWidth="2"
                  />
                  <text
                    x="335"
                    y="224"
                    textAnchor="middle"
                    fontSize="10.5"
                    fontWeight="800"
                    fill="#BE123C"
                  >
                    🍓 Sorbetes
                  </text>
                  <text
                    x="335"
                    y="240"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="700"
                    fill="#475569"
                  >
                    100% Fruta
                  </text>
                </g>

                <line
                  className="sound-wave"
                  x1="64"
                  y1="340"
                  x2="336"
                  y2="340"
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  opacity="0.45"
                />

                <g className="spec-bar">
                  <rect
                    x="55"
                    y="354"
                    width="290"
                    height="36"
                    rx="10"
                    fill="#0B1820"
                    stroke="#FDE68A"
                    strokeWidth="2"
                  />
                  <text
                    x="200"
                    y="376"
                    textAnchor="middle"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="10.5"
                    fill="#FDE68A"
                  >
                    PRECIO · PORCIONES · TIEMPO · ESPACIO EN FREEZER
                  </text>
                </g>

                <g
                  className="phone-alert"
                  opacity="0"
                  transform="translate(42 18)"
                >
                  <rect
                    width="316"
                    height="46"
                    rx="14"
                    fill="#ffffff"
                    stroke="#E11D48"
                    strokeWidth="2.5"
                  />
                  <circle cx="24" cy="23" r="13" fill="#E11D48" />
                  <text
                    x="24"
                    y="27"
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="800"
                    fill="#ffffff"
                  >
                    🍨
                  </text>
                  <text
                    x="44"
                    y="19"
                    fontFamily="Outfit, sans-serif"
                    fontWeight="800"
                    fontSize="11.5"
                    fill="#0B1820"
                  >
                    Textura cremosa lista sin cristales de hielo
                  </text>
                  <text
                    x="44"
                    y="34"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                    fontSize="10"
                    fill="#0369A1"
                  >
                    Compatibilidad 100% verificada · Amazon EE. UU.
                  </text>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
