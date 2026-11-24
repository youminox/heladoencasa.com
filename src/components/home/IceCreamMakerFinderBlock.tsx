"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CATALOG,
  buildAmazonUrl,
  detectUserAmazonRegion,
  type AmazonStoreRegion,
  type AmazonProductRecommendation,
} from "@/lib/amazon";
import { trackClick } from "@/lib/client-constants";
import OpenChatButton from "@/components/OpenChatButton";

export type IceCreamMakerTier = {
  key: string;
  label: string;
  priceAndServings: string;
  prepAndFreezer: string;
  sparesNote: string;
  img: string;
  alt: string;
  idealFor: string;
  reviewHref: string;
  productKey: keyof typeof CATALOG;
  sparesKey: keyof typeof CATALOG;
};

export default function IceCreamMakerFinderBlock({
  options,
}: {
  options: IceCreamMakerTier[];
}) {
  const [k, setK] = useState(options[0].key);
  const [servingsCount, setServingsCount] = useState(4);
  const [region, setRegion] = useState<AmazonStoreRegion>("US");

  useEffect(() => {
    setRegion(detectUserAmazonRegion());
  }, []);

  const p = options.find((o) => o.key === k) || options[0];
  const amzProd: AmazonProductRecommendation =
    CATALOG[p.productKey] || CATALOG.NINJA_CREAMI_NC301;
  const sparesProd: AmazonProductRecommendation =
    CATALOG[p.sparesKey] || CATALOG.NINJA_PINTS_16OZ_4PACK;
  const amzUrl = buildAmazonUrl(amzProd, region);
  const sparesUrl = buildAmazonUrl(sparesProd, region);
  const storeName = region === "US" ? "Amazon.com" : "Amazon.es";

  const volumeOz = servingsCount * 5.5;
  const recommendedFormat =
    servingsCount <= 3
      ? "Pinta 16 oz (NC301)"
      : servingsCount <= 5
      ? "Pinta XL 24 oz (NC501)"
      : servingsCount <= 8
      ? "Tazón 1.5 Qt (ICE-21 / ICE-100)"
      : "Tazón 2.0–2.1 Qt (ICE-30 / Whynter)";
  const prepSuggestion =
    servingsCount <= 5
      ? "1 vaso en freezer (4.4\"×4.5\")"
      : "1 tazón 7.5\"×6.2\" o Compresor";

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="card card-static spot relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-prune/10 blur-3xl" />
        <div className="relative">
          <div
            className="inline-flex flex-wrap rounded-full bg-fxsky p-1 gap-1"
            role="tablist"
            aria-label="Selector de máquina de helado según presupuesto, porciones y espacio en freezer"
          >
            {options.map((o) => (
              <button
                key={o.key}
                role="tab"
                type="button"
                aria-selected={o.key === k}
                onClick={() => setK(o.key)}
                className={`rounded-full px-3.5 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  o.key === k
                    ? "bg-white text-prune shadow"
                    : "text-[var(--muted)] hover:text-fxink"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid items-center gap-6 sm:grid-cols-[1fr_1.15fr]">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-sm">
              <Image
                key={p.img}
                src={p.img}
                alt={p.alt}
                fill
                sizes="240px"
                className="object-cover"
                style={{ animation: "fadeup .45s ease both" }}
              />
            </div>
            <div>
              <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-900">
                {amzProd.badge}
              </span>
              <p className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-fxink leading-snug">
                {amzProd.title.split("(")[0].trim()}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
                <strong className="text-fxink">Ideal si:</strong> {p.idealFor}
              </p>
              <div className="mt-2.5 rounded-xl bg-fxsky p-2.5 text-xs space-y-0.5">
                <p className="font-bold text-fxblue">💵 {p.priceAndServings}</p>
                <p className="font-semibold text-fxink">⏱️ {p.prepAndFreezer}</p>
                <p className="font-semibold text-prune">🥣 {p.sparesNote}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href={amzUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`calc-amazon-${p.key}`, {
                  article_slug: amzProd.id,
                  article_title: amzProd.title,
                  category: "amazon",
                  target_url: amzUrl,
                })
              }
              className="btn btn-lime shine flex-1 text-xs sm:text-sm"
              data-magnetic
            >
              🍨 Ver Máquina en {storeName} ↗
            </a>
            <a
              href={sparesUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() =>
                trackClick(`calc-spares-${p.key}`, {
                  article_slug: sparesProd.id,
                  article_title: sparesProd.title,
                  category: "amazon",
                  target_url: sparesUrl,
                })
              }
              className="btn btn-buy text-xs sm:text-sm"
            >
              🥣 Ver Repuestos ↗
            </a>
            <Link href={p.reviewHref} className="btn btn-ghost text-xs sm:text-sm">
              Reseña →
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#0B1820] via-[#0d2230] to-[#230c18] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-prune/20 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FDE68A]">
          Calculadora de Porciones y Espacio en el Congelador
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
          ¿Cuántas bolas o porciones quieres servir por tanda?
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Ajusta el número de personas en casa y comprueba qué capacidad exacta
          necesitas en onzas o cuartos y qué espacio real ocupa en tu
          congelador.
        </p>
        <label
          htmlFor="servings-slider"
          className="mt-6 flex items-center justify-between text-sm font-semibold"
        >
          <span>Porciones / bolas por lote</span>
          <span className="rounded-full bg-white/10 px-3.5 py-1 font-display text-lg text-[#FDE68A]">
            {servingsCount} {servingsCount === 1 ? "porción" : "porciones"}
          </span>
        </label>
        <input
          id="servings-slider"
          type="range"
          min={1}
          max={12}
          step={1}
          value={servingsCount}
          onChange={(e) => setServingsCount(Number(e.target.value))}
          className="mt-3 w-full accent-[#F59E0B]"
        />
        <div className="mt-1 flex justify-between text-[0.7rem] text-white/45">
          <span>1–2 (Pinta 16 oz)</span>
          <span>4–5 (Deluxe 24 oz)</span>
          <span>6–8 (1.5 Qt)</span>
          <span>10–12 (2.0 Qt / Fiesta)</span>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            ["Capacidad Ideal", recommendedFormat],
            ["Volumen Base", `~${Math.round(volumeOz)} oz (${Math.round(volumeOz * 29.5)} ml)`],
            ["Espacio Freezer", prepSuggestion],
          ].map(([l, val], i) => (
            <div
              key={l}
              className={`glass flex flex-col-reverse p-3 ${
                i === 0 ? "border-[#FDE68A]/50 bg-[#FDE68A]/10" : ""
              }`}
            >
              <dt className="mt-1 text-[0.7rem] leading-tight text-white/60">
                {l}
              </dt>
              <dd
                className={`font-display font-extrabold ${
                  i === 0
                    ? "text-xs text-[#FDE68A] sm:text-sm"
                    : "text-xs sm:text-sm"
                }`}
              >
                {val}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/10 text-xs text-white/65">
          <span>
            ¿Quieres preparar 4 sabores distintos? Suma un pack de pintas extra
            o un segundo tazón congelador compatible.
          </span>
          <OpenChatButton
            label="Consultar al Asesor IA"
            prompt={`Quiero hacer helados y sorbetes para ${servingsCount} porciones por tanda y estoy viendo la opción "${p.label}". ¿Qué máquina y qué vasos o tazón extra compatibles me recomiendas en Amazon EE. UU.?`}
            className="text-[#FDE68A] font-bold hover:underline !bg-transparent !p-0"
          />
        </div>
      </div>
    </div>
  );
}
