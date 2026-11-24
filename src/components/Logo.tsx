import { useId } from "react";

/** Logotipo de HeladoEnCasa.com: Bola Artesanal + Cono + Destello */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B1820" />
          <stop offset="0.55" stopColor="#0284C7" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>
        <linearGradient id={`${id}scoop`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFDF9" />
          <stop offset="1" stopColor="#FBCFE8" />
        </linearGradient>
        <linearGradient id={`${id}cone`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill={`url(#${id}bg)`} />
      <circle cx="32" cy="24" r="13" fill={`url(#${id}scoop)`} />
      <circle cx="24" cy="27" r="6" fill="#FFE4E6" />
      <circle cx="40" cy="27" r="6" fill="#BAE6FD" />
      <polygon
        points="21,31 43,31 32,54"
        fill={`url(#${id}cone)`}
        stroke="#FFFDF9"
        strokeWidth="1.4"
      />
      <circle cx="47" cy="14" r="3" fill="#F59E0B" />
    </svg>
  );
}

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight">
      <LogoMark />
      <span>
        HeladoEn
        <span className={dark ? "text-[#FDE68A]" : "text-prune"}>Casa</span>
        <span
          className={`ml-1.5 hidden text-[10px] font-bold uppercase tracking-[0.18em] sm:inline ${
            dark ? "text-white/60" : "text-[var(--muted)]"
          }`}
        >
          .com
        </span>
      </span>
    </span>
  );
}
