"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Slider arrastrable Antes ↔ Después (estilo DayNightSlider de prunex1.com): Sistema Pre-Congelar 24h Económico/Compacto (Ninja CREAMi / Cuisinart ICE-21) vs Sistema con Compresor Autónomo 0h Espera y 0 Espacio en Freezer (Cuisinart ICE-100 / Whynter). */
export default function FreezerVsCompressorSlider() {
  const [v, setV] = useState(25);
  const [touched, setTouched] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const t = v / 100;
  const mid = clamp(1 - Math.abs(t - 0.5) * 2.4);
  const comp = clamp((t - 0.45) / 0.45);
  const fullComp = clamp((t - 0.55) / 0.4);

  const phase =
    t < 0.35
      ? "Modo A · Pre-Congelar 24 h (Compacto & Económico · Ninja / Cuisinart ICE-21)"
      : t < 0.68
      ? "Punto Medio · Evalúa Espacio en tu Freezer vs Presupuesto en Amazon"
      : "Modo B · Compresor Autónomo (0 h de Espera y 0 Espacio en Congelador)";

  const capacityReading =
    t < 0.45
      ? "US$69–$239 · 16 oz a 2.0 Qt"
      : "US$269–$499 · Lotes Seguidos Sin Freezer";

  const fromPointer = useCallback((clientX: number) => {
    const el = scene.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setV(Math.round(clamp((clientX - r.left) / r.width) * 100));
    setTouched(true);
  }, []);

  return (
    <div className="daynight bg-[#0B1820] shadow-[0_40px_80px_-40px_rgba(225,29,72,0.45)]">
      <div
        ref={scene}
        className="relative aspect-[4/5] cursor-ew-resize select-none sm:aspect-[16/9]"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse") e.preventDefault();
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 || e.pointerType === "touch") {
            if (
              (e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)
            )
              fromPointer(e.clientX);
          }
        }}
      >
        <svg
          viewBox="0 0 800 450"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="dn-day" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFDF9" />
              <stop offset="1" stopColor="#EEF7F5" />
            </linearGradient>
            <linearGradient id="dn-dusk" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0284C7" />
              <stop offset="0.55" stopColor="#BE123C" />
              <stop offset="1" stopColor="#FDE68A" />
            </linearGradient>
            <linearGradient id="dn-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#07111a" />
              <stop offset="0.65" stopColor="#0B1820" />
              <stop offset="1" stopColor="#1e1b4b" />
            </linearGradient>
            <radialGradient id="dn-lamp" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#F59E0B" stopOpacity="0.36" />
              <stop offset="1" stopColor="#0284C7" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="450" fill="url(#dn-day)" />
          <rect width="800" height="450" fill="url(#dn-dusk)" opacity={mid} />
          <rect width="800" height="450" fill="url(#dn-night)" opacity={comp} />

          <circle
            cx="400"
            cy="230"
            r="240"
            fill="url(#dn-lamp)"
            opacity={comp}
          />

          <rect
            x="0"
            y="365"
            width="800"
            height="85"
            fill={comp > 0.5 ? "#0b1726" : "#d9e8e4"}
          />

          {comp < 0.5 ? (
            <g>
              <rect
                x="210"
                y="145"
                width="380"
                height="195"
                rx="18"
                fill="#0B1820"
                stroke="#E11D48"
                strokeWidth="4"
              />
              <rect
                x="228"
                y="162"
                width="344"
                height="161"
                rx="8"
                fill="#ffffff"
              />
              <rect
                x="244"
                y="174"
                width="148"
                height="136"
                rx="6"
                fill="#FFF1F2"
              />
              <text
                x="318"
                y="230"
                textAnchor="middle"
                fontSize="13.5"
                fontWeight="800"
                fill="#BE123C"
              >
                Ninja CREAMi 16/24 oz
              </text>
              <text
                x="318"
                y="252"
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill="#0B1820"
              >
                Vaso en freezer · 2 min spin
              </text>
              <rect
                x="408"
                y="174"
                width="148"
                height="136"
                rx="6"
                fill="#E0F2FE"
              />
              <text
                x="482"
                y="230"
                textAnchor="middle"
                fontSize="13.5"
                fontWeight="800"
                fill="#0369A1"
              >
                Cuisinart ICE-21 1.5 Qt
              </text>
              <text
                x="482"
                y="252"
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill="#0B1820"
              >
                &lt;US$80 · Tazón 20 min
              </text>
              <text
                x="400"
                y="128"
                textAnchor="middle"
                fontFamily="Outfit, sans-serif"
                fontWeight="800"
                fontSize="15.5"
                fill="#0369A1"
              >
                ❄️ Pre-Congelar 24 h: Máxima Calidad-Precio y Tamaño Compacto
              </text>
            </g>
          ) : (
            <g opacity={fullComp}>
              <rect
                x="200"
                y="140"
                width="400"
                height="205"
                rx="18"
                fill="#0B1820"
                stroke="#FDE68A"
                strokeWidth="4"
              />
              <rect
                x="218"
                y="156"
                width="364"
                height="173"
                rx="8"
                fill="#0369A1"
              />
              <text
                x="400"
                y="214"
                textAnchor="middle"
                fontSize="16"
                fontWeight="800"
                fill="#FDE68A"
              >
                ⚡ Compresor Autónomo: 0 cm³ en tu Congelador
              </text>
              <text
                x="400"
                y="246"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill="#ffffff"
              >
                Cuisinart ICE-100 · Whynter ICM-200LS · Breville Smart Scoop
              </text>
              <text
                x="400"
                y="276"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="#FFE4E6"
              >
                ✓ Helado o gelato en 40–50 min al instante · Lotes seguidos sin
                espera
              </text>
            </g>
          )}

          <rect
            x="115"
            y="352"
            width="570"
            height="34"
            rx="10"
            fill="#0B1820"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          <text
            x="400"
            y="374"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="800"
            fontSize="12"
            fill="#FDE68A"
          >
            {comp > 0.5
              ? "Con compresor: ocupa más encimera pero libera 100% tu congelador y permite tandas infinitas"
              : "Con tazón o vaso: inversión inicial menor en Amazon y puedes preparar 4 sabores pre-congelados"}
          </text>
        </svg>

        <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/30 bg-black/55 px-4 py-2 text-white backdrop-blur-md sm:left-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/75">
            {phase}
          </p>
          <p className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums">
            {capacityReading}
          </p>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 max-w-[54%] rounded-2xl border border-white/30 bg-black/55 px-4 py-3 text-right text-white backdrop-blur-md sm:right-6 sm:top-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#FDE68A]">
            {comp > 0.5
              ? "Ganadoras Sin Usar el Freezer"
              : "Ganadoras Pre-Congelado"}
          </p>
          <p className="font-display text-sm font-bold leading-snug sm:text-lg">
            {comp > 0.5
              ? "Cuisinart ICE-100 y Whynter ICM-200LS"
              : "Ninja CREAMi NC301, Deluxe NC501 y Cuisinart ICE-21"}
          </p>
        </div>
        {!touched && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse whitespace-nowrap rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-fxink shadow-lg sm:bottom-5 sm:px-4 sm:py-2 sm:text-sm">
            ← Arrastra para comparar Pre-Congelado 24h vs Compresor 0h →
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 bg-[#0B1820] px-5 py-4 text-white sm:px-7">
        <span className="text-xs font-bold whitespace-nowrap">
          ❄️ Pre-Congelado (US$69–$239)
        </span>
        <label className="sr-only" htmlFor="dn-range">
          Comparador entre máquinas de pre-congelado y compresor autónomo
        </label>
        <input
          id="dn-range"
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => {
            setV(Number(e.target.value));
            setTouched(true);
          }}
          aria-valuetext={`${phase}, ${capacityReading}`}
        />
        <span className="text-xs font-bold whitespace-nowrap text-[#FDE68A]">
          ⚡ Compresor (0 cm³ Freezer)
        </span>
      </div>
    </div>
  );
}
