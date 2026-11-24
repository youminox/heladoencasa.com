import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEffects from "@/components/ClientEffects";
import ArticleCard from "@/components/ArticleCard";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import ReadingProgress from "@/components/ReadingProgress";
import SplitHeading from "@/components/SplitHeading";
import OpenChatButton from "@/components/OpenChatButton";
import { JsonLd } from "@/components/Breadcrumbs";
import Hero from "@/components/home/Hero";
import ScrollStory from "@/components/home/ScrollStory";
import IceCreamTechSvg from "@/components/home/IceCreamTechSvg";
import CompatibilityOrbit, {
  type OrbitItem,
} from "@/components/home/CompatibilityOrbit";
import MetricsCounters, {
  type MetricItem,
} from "@/components/home/MetricsCounters";
import FreezerVsCompressorSlider from "@/components/home/FreezerVsCompressorSlider";
import MomentsCarousel, {
  type Moment,
} from "@/components/home/MomentsCarousel";
import IceCreamMakerFinderBlock, {
  type IceCreamMakerTier,
} from "@/components/home/IceCreamMakerFinderBlock";
import { getContextualAmazonProducts } from "@/lib/amazon";
import {
  SITE_URL,
  OG_DEFAULT,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  ICE_CREAM_DISCLAIMER,
  VERIFIED_LABEL,
  ambient,
  getAllContent,
  getArticlesIn,
  getByPath,
  getCategories,
  safeHref,
  type Article,
} from "@/lib/content";

export const metadata: Metadata = {
  title:
    "HeladoEnCasa.com: Guía de Máquinas de Helado Caseras (Ninja y Cuisinart), Recetas y Repuestos en Amazon EE. UU.",
  description:
    "Guía en español para elegir máquinas de helado caseras de marcas como Ninja y Cuisinart en Amazon Estados Unidos. Compara precio, porciones, tiempo de preparación y espacio en el congelador, con recetas y vasos/tapas compatibles.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/`,
    title:
      "HeladoEnCasa.com: Comparativa Ninja y Cuisinart, Recetas y Vasos Compatibles en Amazon EE. UU.",
    description:
      "Compara máquinas de helado caseras por precio, porciones, tiempo y espacio en congelador, además de recetas de helados y sorbetes y vasos/tapas compatibles.",
    images: [
      {
        url: OG_DEFAULT(),
        width: 1200,
        height: 675,
        alt: "Máquinas de helado caseras Ninja y Cuisinart con bolas de helado y sorbete en cocina",
      },
    ],
  },
};

const FAQ = [
  {
    q: "¿Qué conviene más en casa: Ninja CREAMi o Cuisinart (ICE-21 / ICE-30BC)?",
    a: "La Ninja CREAMi (NC301 de 16 oz o NC501 Deluxe de 24 oz, ~US$179–$249) congela la mezcla sólida en vasos individuales pequeños durante 24 horas y la texturiza en 2 minutos; ocupa poquísimo espacio en el congelador y brilla con helados proteicos, keto y sorbetes de 1 ingrediente. En cambio, la Cuisinart ICE-21P1 (<US$80) o ICE-30BC (~US$99) cuesta menos de la mitad, rinde 6 a 10 porciones de una sola vez en 20 minutos, aunque requiere espacio medio-grande para pre-congelar su tazón metálico.",
  },
  {
    q: "¿Qué vasos y tapas de repuesto son compatibles con mi Ninja CREAMi?",
    a: "Fíjate siempre en el código exacto debajo de la base: los vasos de 16 oz con 4 muescas inferiores son compatibles solo con la serie NC299AMZ, NC300, NC301, CN301CO y CN305A. Si tienes una Ninja CREAMi Deluxe (NC500, NC501, CN501CO), necesitas exclusivamente vasos XL altos de 24 oz. Los modelos Breeze (NC100/NC200) y Swirl (NC701) utilizan vasos exclusivos incompatibles entre sí.",
  },
  {
    q: "¿Qué máquina elegir si mi congelador es pequeño o está siempre lleno?",
    a: "Si tienes poco espacio, tienes dos caminos claros: 1) Una Ninja CREAMi NC301 cuyos vasos individuales miden apenas 4.4\" × 4.5\" y caben en cualquier hueco, o una Dash My Pint (<US$30); o 2) Una máquina con compresor autónomo como la Cuisinart ICE-100 (~US$279) o Whynter ICM-200LS, que ocupan 0 cm³ dentro del congelador y hacen helado al instante sin pre-congelar 24 horas.",
  },
  {
    q: "¿Cuánto tiempo real toma hacer helado o sorbete casero?",
    a: "Hay que distinguir entre espera previa y tiempo activo. Con tazones congeladores (Cuisinart ICE-21/30) o pintas Ninja CREAMi, el congelador necesita de 16 a 24 horas previas a -18 °C (0 °F); luego el procesado activo toma apenas 2–3 minutos en Ninja o 20–25 minutos en Cuisinart. Con compresor (Cuisinart ICE-100 / Breville) el tiempo total desde líquido frío hasta helado listo es de 40 a 50 minutos sin esperar al día siguiente.",
  },
  {
    q: "¿Sirve una misma receta de helado o sorbete para Ninja CREAMi y para Cuisinart?",
    a: "La base de ingredientes es parecida, pero cambian las cantidades y la proporción de azúcar o estabilizante. Una pinta Ninja NC301 admite 473 ml (2 tazas) y admite mezclas sin grasa ni azúcar gracias a su cuchilla Creamerizer. En cambio, un tazón Cuisinart ICE-21 rinde 1.4 litros (~3 a 4 veces más) y necesita algo más de grasa o azúcar (o alulosa) para que no se congele en las paredes durante el batido.",
  },
  {
    q: "¿Cómo evitar que mi helado casero salga duro como piedra o con cristales?",
    a: "Asegúrate de que tu congelador enfríe a -18 °C (0 °F). En Cuisinart, guarda el sobrante en contenedores térmicos estrechos tipo Tovolo Glide-A-Scoop con papel encerado pegado a la superficie. En recetas bajas en azúcar o keto, sustituye eritritol puro por alulosa granulada y añade 1/4 cucharadita de goma guar; en Ninja CREAMi, aplana siempre la mezcla antes de procesar y usa la función Re-Spin si queda polvosa.",
  },
];

const CLAIMS = [
  "Ninja CREAMi 16 oz y 24 oz Deluxe",
  "Cuisinart ICE-21 < US$80",
  "Cuisinart ICE-100 con Compresor",
  "Vasos y Tapas 100% Compatibles",
  "Recetas de Helados y Sorbetes",
  "Espacio Real en Congelador",
  "2–25 Minutos de Preparación",
  "Precios en Amazon EE. UU.",
];

const CLAIMS_2 = [
  "4 Muescas NC299 / NC300 / NC301",
  "Vasos XL NC501 Deluxe",
  "Tazones ICE-21RFB y ICE-30RFB",
  "Gelato Italiano y Soft Serve",
  "Helado Proteico y Keto sin Cristales",
  "Sorbetes 100% Fruta Natural",
  "Alulosa, Goma Guar y Pistacho",
  "Envío Prime Amazon.com",
];

const CAT_ICONS: Record<string, string> = {
  star: "⭐",
  scale: "⚖️",
  tag: "💵",
  cup: "🥣",
  ice: "🍦",
  spoon: "🥄",
  puzzle: "🧩",
  clock: "⏱️",
  cream: "🍨",
  fruit: "🥭",
  leaf: "🥗",
  flask: "🧪",
  wrench: "🔧",
  globe: "🇺🇸",
};

export default function Home() {
  const cats = getCategories();
  const all = getAllContent();
  const amz = getContextualAmazonProducts(
    "home",
    "resenas-maquinas-de-helado",
    "Máquinas de helado Ninja y Cuisinart"
  );

  const orbit: OrbitItem[] = [
    {
      k: "nc301",
      name: "Ninja NC301 (16 oz)",
      img: null,
      icon: "🍨",
      role: "2–3 porciones · Mínimo freezer",
      d: "Congela bases en pintas de 4.4\"×4.5\" y texturiza en 2 min. La reina para helado fit, sorbetes diarios y cocinas con congelador pequeño.",
      href: safeHref(
        "/resenas-maquinas-de-helado/ninja-creami-nc301-resena-precio-porciones-espacio-freezer/"
      ),
    },
    {
      k: "nc501",
      name: "Ninja Deluxe (24 oz)",
      img: null,
      icon: "👨‍👩‍👧‍👦",
      role: "4–5 porciones · 11 programas",
      d: "Vasos XL con 50% más capacidad que NC301 y procesado dual Top/Bottom. Añade modos Slushi, Gelato, Creamiccino y Frozen Yogurt.",
      href: safeHref(
        "/resenas-maquinas-de-helado/ninja-creami-deluxe-nc501-resena-completa/"
      ),
    },
    {
      k: "ice21",
      name: "Cuisinart ICE-21",
      img: null,
      icon: "💵",
      role: "<US$80 · 6–8 bolas en 20 min",
      d: "La mejor económica familiar: tazón congelador de 1.5 Qt (7.5\"×6.2\") listo en 20 min de batido silencioso con boca ancha para mix-ins.",
      href: safeHref(
        "/resenas-maquinas-de-helado/cuisinart-ice-21p1-resena-precio-porciones-espacio/"
      ),
    },
    {
      k: "ice100",
      name: "Compresor ICE-100",
      img: null,
      icon: "⚡",
      role: "0 cm³ en freezer · 0 espera 24h",
      d: "Compresor autónomo con 2 paletas dedicadas (gelato denso e ice cream). Ideal si no quieres guardar ningún tazón ni vaso en tu congelador.",
      href: safeHref(
        "/resenas-maquinas-de-helado/cuisinart-ice-100-compresor-resena-gelato-helado-sin-freezer/"
      ),
    },
    {
      k: "vasos",
      name: "Vasos y Tapas Extra",
      img: null,
      icon: "🥣",
      role: "16 oz (NC301) vs 24 oz (NC501)",
      d: "Verifica las 4 muescas de la base antes de pedir repuestos. Nunca mezcles pintas de NC301, Deluxe NC501, Breeze o Swirl NC701.",
      href: safeHref(
        "/guia-compatibilidad-vasos-tazones-y-repuestos/guia-compatibilidad-vasos-tapas-ninja-creami-nc301-nc501-breeze-swirl/"
      ),
    },
    {
      k: "freezer",
      name: "Espacio en Freezer",
      img: null,
      icon: "❄️",
      role: "Medidas reales in / cm",
      d: "Comparamos pulgadas y centímetros exactos y te enseñamos la prueba del agitador y temperatura a -18 °C (0 °F) para que no falle el batido.",
      href: safeHref(
        "/espacio-en-congelador-tiempo-y-funcionamiento/como-elegir-maquina-helado-segun-espacio-congelador/"
      ),
    },
    {
      k: "helados",
      name: "Recetas Helados",
      img: null,
      icon: "🍦",
      role: "Cremosos, Gelato y Fit",
      d: "Vainilla Bourbon, chocolate belga, pistacho, dulce de leche y protein ice cream con gramos exactos para pinta Ninja o tazón Cuisinart.",
      href: safeHref(
        "/recetas-de-helados-cremosos-y-gelatos/receta-helado-vainilla-cremoso-ninja-cuisinart/"
      ),
    },
    {
      k: "sorbetes",
      name: "Recetas Sorbetes",
      img: null,
      icon: "🥭",
      role: "100% Fruta Sin Lácteos",
      d: "Sorbetes sedosos de mango, limón, maracuyá y fresa explicando cómo equilibrar fruta, almíbar o alulosa para cero cristales.",
      href: safeHref(
        "/recetas-de-sorbetes-y-frutas-naturales/receta-sorbete-mango-natural-cremoso-ninja-cuisinart/"
      ),
    },
  ];

  const metrics: MetricItem[] = [
    {
      v: 69,
      dec: 0,
      u: "USD",
      l: "Desde Cuisinart ICE-21",
      pct: 95,
      note: "Mejor relación precio/porciones",
    },
    {
      v: 2,
      dec: 0,
      u: "min",
      l: "Procesado Ninja CREAMi",
      pct: 92,
      note: "Tras 24 h de vaso congelado",
    },
    {
      v: 20,
      dec: 0,
      u: "min",
      l: "Batido Tazón Cuisinart",
      pct: 88,
      note: "6 a 10 bolas de una sola vez",
    },
    {
      v: 16,
      dec: 0,
      u: "oz",
      l: "Vaso Compacto NC301",
      pct: 86,
      note: "Solo 4.4\"×4.5\" en tu freezer",
    },
    {
      v: 24,
      dec: 0,
      u: "oz",
      l: "Vaso XL Deluxe NC501",
      pct: 90,
      note: "4 a 5 porciones familiares",
    },
    {
      v: 0,
      dec: 0,
      u: "cm³",
      l: "Freezer con Compresor",
      pct: 100,
      note: "ICE-100 / Whynter autónomos",
    },
  ];

  const moments: Moment[] = [
    {
      img: ambient("home-sorbete-mango"),
      t: "Sorbete de Mango",
      d: "De fruta natural a textura sedosa sin lácteos en pinta Ninja o Cuisinart.",
      href: safeHref(
        "/recetas-de-sorbetes-y-frutas-naturales/receta-sorbete-mango-natural-cremoso-ninja-cuisinart/"
      ),
      alt: "Sorbete cremoso de mango servido en copa fría junto a fruta fresca",
    },
    {
      img: ambient("home-vasos-colores"),
      t: "4 Sabores Listos",
      d: "Multiplica tu variedad con packs de vasos y tapas compatibles sin errores.",
      href: safeHref(
        "/vasos-tapas-y-recipientes-compatibles/mejores-vasos-tapas-compatibles-ninja-creami-amazon/"
      ),
      alt: "Cuatro vasos de pinta con tapas de colores organizados en cocina moderna",
    },
    {
      img: ambient("home-helado-fit"),
      t: "Helado Proteico y Keto",
      d: "35 g de proteína y cero azúcar usando alulosa para evitar bloques duros.",
      href: safeHref(
        "/helados-saludables-proteicos-keto-y-sin-lactosa/receta-helado-proteico-vainilla-chocolate-ninja-creami/"
      ),
      alt: "Vaso de helado proteico cremoso con cuchara en encimera luminosa",
    },
    {
      img: ambient("home-espacio-freezer"),
      t: "Congelador Pequeño",
      d: "Compara 4.4\" de pinta Ninja vs tazones Cuisinart vs 0 espacio con compresor.",
      href: safeHref(
        "/espacio-en-congelador-tiempo-y-funcionamiento/como-elegir-maquina-helado-segun-espacio-congelador/"
      ),
      alt: "Organización de congelador doméstico con pintas y tazón congelador",
    },
    {
      img: ambient("home-gelato-pistacho"),
      t: "Gelato de Pistacho",
      d: "Denso, con menos aire incorporado y pasta pura de pistacho italiano.",
      href: safeHref(
        "/recetas-de-helados-cremosos-y-gelatos/receta-gelato-pistacho-italiano-en-casa/"
      ),
      alt: "Gelato artesanal de pistacho servido en cuenco frío con pistachos tostados",
    },
    {
      img: ambient("home-conos-waffle"),
      t: "Tarde de Conos en Casa",
      d: "Conos waffle caseros y contenedores térmicos Tovolo para guardar sobrantes.",
      href: safeHref(
        "/ingredientes-bases-y-accesorios-heladeria/mejores-contenedores-termicos-guardar-helado-casero/"
      ),
      alt: "Conos crujientes rellenos de bolas de helado de vainilla y fresa",
    },
    {
      img: ambient("home-cuidado-limpieza"),
      t: "Sin Cristales ni Fallas",
      d: "Aprende a alisar el vaso, limpiar la junta de la tapa y usar Re-Spin.",
      href: safeHref(
        "/limpieza-cuidado-y-solucion-de-problemas/como-limpiar-tapa-exterior-eje-ninja-creami/"
      ),
      alt: "Limpieza cuidadosa de piezas desmontables de máquina de helados sobre paño",
    },
  ];

  const finderTiers: IceCreamMakerTier[] = [
    {
      key: "nc301",
      label: "🍨 Parejas / Fit (NC301)",
      priceAndServings: "~US$179–$199 · 2–3 bolas (16 oz)",
      prepAndFreezer: "24h freezer + 2 min spin · Vasos 4.4\"×4.5\"",
      sparesNote: "Usa vasos 16 oz 4 muescas (NC299/300/301)",
      img: ambient("home-ninja-creami"),
      alt: "Máquina Ninja CREAMi preparando helado cremoso en vaso de 16 oz",
      idealFor:
        "Tienes congelador pequeño, buscas helados proteicos/keto o quieres 4 sabores distintos por semana.",
      reviewHref: safeHref(
        "/resenas-maquinas-de-helado/ninja-creami-nc301-resena-precio-porciones-espacio-freezer/"
      ),
      productKey: "NINJA_CREAMI_NC301",
      sparesKey: "NINJA_PINTS_16OZ_4PACK",
    },
    {
      key: "ice21",
      label: "💵 Mejor Precio (ICE-21)",
      priceAndServings: "<US$80 · 6–8 bolas (1.5 Qt)",
      prepAndFreezer: "24h tazón + 20 min batido · Tazón 7.5\"×6.2\"",
      sparesNote: "Compatible con Tazón Extra Cuisinart ICE-21RFB",
      img: ambient("home-cuisinart-bowl"),
      alt: "Máquina clásica de tazón congelador Cuisinart batiendo mezcla cremosa",
      idealFor:
        "Quieres gastar menos de US$80 en Amazon EE. UU. y servir a toda la familia en 20 minutos.",
      reviewHref: safeHref(
        "/resenas-maquinas-de-helado/cuisinart-ice-21p1-resena-precio-porciones-espacio/"
      ),
      productKey: "CUISINART_ICE_21P1",
      sparesKey: "CUISINART_ICE_21RFB_BOWL",
    },
    {
      key: "nc501",
      label: "👨‍👩‍👧‍👦 Familiar XL (NC501)",
      priceAndServings: "~US$219–$249 · 4–5 bolas (24 oz)",
      prepAndFreezer: "24h freezer + 3 min · Pintas XL 4.7\"×5.7\"",
      sparesNote: "Exclusivo Vasos XL 24 oz (NC500/NC501)",
      img: ambient("home-vasos-colores"),
      alt: "Vasos familiares XL con tapas herméticas para sabores variados",
      idealFor:
        "Sois 3 a 5 en casa, quieres modos Slushi/Creamiccino y procesar dos sabores por vaso.",
      reviewHref: safeHref(
        "/resenas-maquinas-de-helado/ninja-creami-deluxe-nc501-resena-completa/"
      ),
      productKey: "NINJA_CREAMI_DELUXE_NC501",
      sparesKey: "NINJA_PINTS_24OZ_DELUXE_4PACK",
    },
    {
      key: "ice100",
      label: "⚡ 0 Espacio Freezer (ICE-100)",
      priceAndServings: "~US$269–$299 · 6–8 bolas continuas",
      prepAndFreezer: "0h en freezer · 45 min directo en encimera",
      sparesNote: "Combina con contenedores térmicos Tovolo 1.5 Qt",
      img: ambient("home-compresor-gelato"),
      alt: "Heladera con compresor de acero inoxidable preparando gelato al instante",
      idealFor:
        "No tienes ni un hueco en el congelador o quieres hacer 3 lotes el mismo día sin esperar 24h.",
      reviewHref: safeHref(
        "/resenas-maquinas-de-helado/cuisinart-ice-100-compresor-resena-gelato-helado-sin-freezer/"
      ),
      productKey: "CUISINART_ICE_100_COMPRESSOR",
      sparesKey: "TOVOLO_GLIDE_A_SCOOP",
    },
  ];

  const POPULAR = [
    "/comparativas-maquinas-de-helado/ninja-creami-nc301-vs-cuisinart-ice-21-comparativa-completa/",
    "/guia-compatibilidad-vasos-tazones-y-repuestos/guia-compatibilidad-vasos-tapas-ninja-creami-nc301-nc501-breeze-swirl/",
    "/resenas-maquinas-de-helado/ninja-creami-nc301-resena-precio-porciones-espacio-freezer/",
    "/resenas-maquinas-de-helado/cuisinart-ice-100-compresor-resena-gelato-helado-sin-freezer/",
    "/recetas-de-sorbetes-y-frutas-naturales/receta-sorbete-mango-natural-cremoso-ninja-cuisinart/",
    "/espacio-en-congelador-tiempo-y-funcionamiento/como-elegir-maquina-helado-segun-espacio-congelador/",
  ];
  const popular: Article[] = POPULAR.map((p) => getByPath(p)).filter(
    Boolean
  ) as Article[];
  for (const a of all) {
    if (popular.length >= 6) break;
    if (!a.isPillar && !popular.includes(a)) popular.push(a);
  }

  return (
    <>
      <ReadingProgress />
      <Header variant="dark" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${SITE_URL}/#webpage`,
              url: `${SITE_URL}/`,
              name: "HeladoEnCasa.com — Guía en Español de Máquinas de Helado Ninja y Cuisinart, Recetas y Repuestos en Amazon EE. UU.",
              inLanguage: "es",
              isPartOf: { "@id": `${SITE_URL}/#website` },
              primaryImageOfPage: `${SITE_URL}${ambient("home-hero-helados")}`,
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }}
      />
      <main>
        {/* 1–2. Hero 3D + Partículas + Buscador */}
        <Hero heroImage={ambient("home-hero-helados")} />

        {/* 3. Doble Cinta Marquee en Sentidos Opuestos */}
        <div className="relative border-b border-[var(--line)] bg-white py-5">
          <div className="marquee">
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track font-display text-lg font-bold text-fxink/85"
                aria-hidden={k === 1}
              >
                {CLAIMS.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-gradient-to-br from-prune to-fxblue" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="marquee reverse mt-3" aria-hidden>
            {[0, 1].map((k) => (
              <div
                key={k}
                className="marquee-track text-sm font-semibold uppercase tracking-[0.14em] text-fxbluedeep/75"
              >
                {CLAIMS_2.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-3 whitespace-nowrap"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Los 4 Criterios de Decisión + 4 Tarjetas Spotlight (.spot) */}
        <section id="como-elegir" className="wrap py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Guía de Compra Sin Errores en Amazon EE. UU.
              </span>
              <SplitHeading
                text="Compara cada máquina en"
                accent={{
                  text: "4 factores reales antes de comprar",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                No basta mirar el tamaño del recipiente en pulgadas cúbicas: una{" "}
                <strong className="text-fxink">Ninja CREAMi</strong>, una{" "}
                <strong className="text-fxink">Cuisinart de tazón</strong> y una
                máquina <strong className="text-fxink">con compresor</strong>{" "}
                funcionan distinto en tiempo, costo, porciones y hueco en tu
                congelador.
              </p>
              <div
                className="mt-6 rounded-2xl border border-amber-300/60 bg-amber-50/80 p-5"
                data-reveal
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
                  🥣 Regla #1 de Repuestos y Vasos Compatibles
                </p>
                <ul className="mt-2 space-y-1.5 text-[0.96rem] text-fxink">
                  {[
                    "• Ninja NC301 / NC300 / NC299AMZ: vasos 16 oz con 4 muescas inferiores.",
                    "• Ninja NC501 / NC500 Deluxe: vasos XL altos de 24 oz incompatibles con NC301.",
                    "• Cuisinart ICE-21RFB (1.5 Qt) vs ICE-30RFB (2.0 Qt): diámetros diferentes.",
                  ].map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-[#6b4f15]">
                  Comprueba el código exacto bajo la base antes de pedir pintas o
                  tazones extra en Amazon.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/comparativas-maquinas-de-helado/"
                  className="btn btn-buy shine"
                  data-magnetic
                >
                  Comparar Ninja vs Cuisinart
                </Link>
                <Link
                  href="/guia-compatibilidad-vasos-tazones-y-repuestos/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Tabla de vasos compatibles
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div
                className="relative col-span-2 aspect-[16/8] overflow-hidden rounded-3xl shadow-[0_30px_60px_-35px_rgba(11,24,32,0.55)]"
                data-reveal
              >
                <Image
                  src={ambient("home-ninja-creami")}
                  alt="Comparativa visual entre máquina de helados Ninja y tazón Cuisinart sobre encimera de cuarzo"
                  fill
                  sizes="(max-width:1024px) 100vw, 600px"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-fxink">
                  Ninja CREAMi · Cuisinart · Compresor
                </span>
              </div>
              {[
                [
                  "💵",
                  "Precio en Amazon EE. UU.",
                  "Desde <US$30 individuales y US$69 familiares hasta US$499 con compresor.",
                ],
                [
                  "🍨",
                  "Porciones reales",
                  "2–3 bolas (16 oz), 4–5 bolas (24 oz XL) o 6–12 bolas en tazón 1.5–2.1 Qt.",
                ],
                [
                  "⏱️",
                  "Tiempo de preparación",
                  "2–25 min activos tras congelar 24h, o 40–50 min directos con compresor.",
                ],
                [
                  "❄️",
                  "Espacio en congelador",
                  "Vaso 4.4\"×4.5\" frente a tazón 8.3\"×7\" o 0 cm³ con compresor autónomo.",
                ],
              ].map(([e, t, d], i) => (
                <div
                  key={t}
                  className="card spot p-5"
                  data-reveal
                  data-reveal-delay={String(i)}
                >
                  <p className="text-2xl" aria-hidden>
                    {e}
                  </p>
                  <p className="mt-2 font-display text-lg font-bold leading-tight">
                    {t}
                  </p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. ScrollStory Fijada */}
        <ScrollStory />

        {/* 6. Diagrama Técnico Animado */}
        <section className="relative isolate overflow-hidden bg-[#0B1820] py-24 text-white">
          <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-fxblue/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-prune/35 blur-3xl" />
          <div className="hero-grid opacity-50" />
          <div className="wrap relative grid items-center gap-14 lg:grid-cols-2">
            <div>
              <span className="eyebrow !text-[#FDE68A]" data-reveal>
                Ingeniería Heladera Doméstica
              </span>
              <SplitHeading
                text="Cómo logra cada máquina"
                accent={{
                  text: "helado sin cristales",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-white/75" data-reveal>
                La{" "}
                <strong className="text-white">cuchilla descendente</strong> de
                Ninja CREAMi raspa capas micrón a micrón de un bloque congelado
                (permitiendo recetas bajas en grasa y sorbetes puros). El{" "}
                <strong className="text-white">tazón refrigerante</strong>{" "}
                Cuisinart y el{" "}
                <strong className="text-white">compresor autónomo</strong>{" "}
                inyectan aire constante mientras congelan para lograr textura
                clásica de heladería en grandes lotes.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3" data-reveal>
                {[
                  ["⚙️", "Cuchilla 2 min"],
                  ["❄️", "Tazón 20 min"],
                  ["⚡", "Compresor 0h"],
                ].map(([e, t]) => (
                  <div key={t} className="glass p-4 text-center">
                    <p className="text-2xl" aria-hidden>
                      {e}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{t}</p>
                  </div>
                ))}
              </div>
              <div
                className="glass mt-6 p-5 text-sm text-white/75"
                data-reveal
              >
                <strong className="text-white">Consejo práctico:</strong> si
                buscas variedad de sabores diarios individuales en poco espacio
                del freezer, elige pintas Ninja; si sirves a 4–8 personas de
                golpe o quieres gastar menos de US$80, Cuisinart ICE-21 es
                imbatible.
              </div>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href={safeHref(
                    "/comparativas-maquinas-de-helado/ninja-creami-nc301-vs-cuisinart-ice-21-comparativa-completa/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Ninja CREAMi vs Cuisinart ICE-21
                </Link>
                <Link
                  href={safeHref(
                    "/textura-ciencia-del-helado-y-tecnicas/como-evitar-cristales-hielo-en-helado-casero/"
                  )}
                  className="btn btn-glass"
                  data-magnetic
                >
                  Ciencia de la cremosidad
                </Link>
              </div>
            </div>
            <div data-reveal>
              <IceCreamTechSvg />
            </div>
          </div>
        </section>

        {/* 7. Órbita Interactiva de 8 Nodos */}
        <section className="wrap py-24">
          <CompatibilityOrbit
            items={orbit}
            center={ambient("home-gelato-pistacho")}
          />
          <p className="mt-10 text-center text-sm text-[var(--muted)]">
            ¿Quieres revisar el cruce completo de vasos, tapas y paletas?{" "}
            <Link
              href="/vasos-tapas-y-recipientes-compatibles/"
              className="font-semibold text-fxbluedeep underline"
            >
              Explorar guía de compatibilidad y repuestos
            </Link>
          </p>
        </section>

        {/* 8. Contadores Animados + Tabla Comparativa Maestra */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0B1820] via-[#092436] to-[#2e0c1b] py-24 text-white">
          <div className="hero-aurora opacity-40" />
          <div className="wrap relative grid items-start gap-12 lg:grid-cols-[1.15fr_1.15fr]">
            <div>
              <span className="eyebrow !text-[#FDE68A]" data-reveal>
                Datos Reales de Capacidad, Tiempo y Freezer
              </span>
              <SplitHeading
                text="Cifras reales frente a"
                accent={{
                  text: "la promesa de la caja",
                  className: "text-gradient",
                }}
                className="section-title mt-3"
              />
              <p className="mt-4 max-w-xl text-white/75" data-reveal>
                Compara de un vistazo precios en Amazon Estados Unidos,
                porciones servidas, minutos reales y espacio ocupado en tu
                congelador entre las 5 máquinas de referencia.
              </p>
              <div className="mt-8">
                <MetricsCounters data={metrics} />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/maquinas-por-precio-porciones-y-espacio/"
                  className="btn btn-glass"
                  data-magnetic
                >
                  Rankings por precio y freezer
                </Link>
                <Link
                  href="/resenas-maquinas-de-helado/"
                  className="btn btn-glass"
                  data-magnetic
                >
                  Ver todas las reseñas
                </Link>
              </div>
            </div>

            <div
              className="rounded-3xl border border-white/15 bg-white/96 p-5 sm:p-6 text-fxink shadow-2xl overflow-x-auto"
              data-reveal
            >
              <p className="text-xs font-extrabold uppercase tracking-wider text-prune">
                Comparativa Maestra · Ninja vs Cuisinart (Amazon EE. UU.)
              </p>
              <table className="mt-3 w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[var(--line)] text-fxbluedeep">
                    <th className="py-2 pr-3 font-display">Modelo</th>
                    <th className="py-2 pr-3 font-display">Precio</th>
                    <th className="py-2 pr-3 font-display">Porciones</th>
                    <th className="py-2 pr-3 font-display">Tiempo</th>
                    <th className="py-2 font-display">Freezer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  <tr>
                    <td className="py-2.5 pr-3 font-bold">Ninja NC301</td>
                    <td className="py-2.5 pr-3">~US$189</td>
                    <td className="py-2.5 pr-3">2–3 (16 oz)</td>
                    <td className="py-2.5 pr-3">24h + 2m</td>
                    <td className="py-2.5">Mínimo (4.4&quot;)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-bold">Ninja Deluxe NC501</td>
                    <td className="py-2.5 pr-3">~US$229</td>
                    <td className="py-2.5 pr-3">4–5 (24 oz)</td>
                    <td className="py-2.5 pr-3">24h + 3m</td>
                    <td className="py-2.5">Bajo (4.7&quot;)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-bold">Cuisinart ICE-21</td>
                    <td className="py-2.5 pr-3 font-semibold text-emerald-700">
                      ~US$69
                    </td>
                    <td className="py-2.5 pr-3">6–8 (1.5 Qt)</td>
                    <td className="py-2.5 pr-3">24h + 20m</td>
                    <td className="py-2.5">Medio (7.5&quot;)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-bold">Cuisinart ICE-30BC</td>
                    <td className="py-2.5 pr-3">~US$99</td>
                    <td className="py-2.5 pr-3">8–10 (2 Qt)</td>
                    <td className="py-2.5 pr-3">24h + 25m</td>
                    <td className="py-2.5">Grande (8.3&quot;)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-3 font-bold">Cuisinart ICE-100</td>
                    <td className="py-2.5 pr-3">~US$289</td>
                    <td className="py-2.5 pr-3">6–8 seg.</td>
                    <td className="py-2.5 pr-3 font-semibold text-fxblue">
                      0h + 45m
                    </td>
                    <td className="py-2.5 font-semibold text-prune">0 cm³</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3 text-[11px] text-[var(--muted)]">
                Precios orientativos verificados al {VERIFIED_LABEL} en
                Amazon.com (`heladoencasa-20`).
              </p>
            </div>
          </div>
        </section>

        {/* 9. Slider Arrastrable Pre-Congelado vs Compresor */}
        <section className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Duelo de Tecnologías en tu Cocina
              </span>
              <SplitHeading
                text="Pre-congelar 24 horas o"
                accent={{
                  text: "compresor sin usar el freezer",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <p className="text-lg text-[var(--muted)]" data-reveal>
              Arrastra el control. A la izquierda priorizas{" "}
              <strong className="text-fxink">
                precio económico y versatilidad de sabores
              </strong>{" "}
              (Ninja CREAMi o Cuisinart ICE-21); a la derecha liberas{" "}
              <strong className="text-fxink">
                el 100% de tu congelador y evitas esperas
              </strong>{" "}
              con Cuisinart ICE-100 o Whynter.
            </p>
          </div>
          <div data-reveal>
            <FreezerVsCompressorSlider />
          </div>
        </section>

        {/* 10. MomentsCarousel 4:5 */}
        <section className="overflow-hidden bg-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Recetas, Repuestos y Trucos Prácticos
              </span>
              <SplitHeading
                text="Escenarios reales"
                accent={{
                  text: "de helados y sorbetes en casa",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <MomentsCarousel items={moments} />
          </div>
        </section>

        {/* 11. Recomendador Interactivo + Calculadora de Porciones */}
        <section id="recomendador" className="wrap py-24">
          <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Recomendador Rápido Amazon EE. UU.
              </span>
              <SplitHeading
                text="Elige tu máquina ideal"
                accent={{
                  text: "y sus vasos compatibles.",
                  className: "text-prune",
                }}
                className="section-title mt-3"
              />
            </div>
            <ul className="grid gap-2 text-[var(--muted)]" data-reveal>
              {[
                "Cruce verificado de vasos 16 oz, XL 24 oz y tazones 1.5–2.0 Qt",
                "Comparativa de precios en tiempo real en Amazon.com",
                "Dimensiones exactas para cajones estándar y mini-freezers",
                "Asesoría instantánea con nuestro Asesor IA en línea",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-rose-100 text-sm text-prune">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <IceCreamMakerFinderBlock options={finderTiers} />
          </div>
        </section>

        {/* 12. Bento Grid de los 14 Silos + Vitrina Amazon + Top 6 */}
        <section className="bg-gradient-to-b from-[var(--fx-cream)] to-fxsky py-24">
          <div className="wrap">
            <div className="mb-10 max-w-2xl">
              <span className="eyebrow" data-reveal>
                Biblioteca Completa: 1,534 Guías y Recetas
              </span>
              <SplitHeading
                text="Todo sobre helado en casa,"
                accent={{
                  text: "ordenado sin canibalización",
                  className: "text-fxbluedeep",
                }}
                className="section-title mt-3"
              />
            </div>
            <div className="grid auto-rows-[minmax(190px,auto)] gap-5 md:grid-cols-2 lg:grid-cols-4">
              {cats.map((c, i) => {
                const count = getArticlesIn(c.slug).length;
                const big = i === 0;
                const wide = i === 1 || i === 8 || i === 9;
                return (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}/`}
                    className={`card spot group flex flex-col p-7 ${
                      big
                        ? "spot-dark border-transparent bg-gradient-to-br from-[#0B1820] via-[#0369a1] to-[#BE123C] text-white md:col-span-2 lg:row-span-2"
                        : ""
                    } ${wide ? "lg:col-span-2" : ""}`}
                    data-reveal
                    data-reveal-delay={String(i % 4)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl ${
                          big ? "bg-white/15" : "bg-fxsky"
                        }`}
                        aria-hidden
                      >
                        {CAT_ICONS[c.icon] || "🍨"}
                      </span>
                      {count > 0 && (
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            big ? "text-[#FDE68A]" : "text-fxbluedeep"
                          }`}
                        >
                          {count} guías
                        </span>
                      )}
                    </div>
                    <h3
                      className={`mt-5 font-display font-extrabold ${
                        big ? "text-3xl sm:text-4xl" : "text-2xl"
                      }`}
                    >
                      {c.name}
                    </h3>
                    <p
                      className={`mt-2 ${
                        big ? "text-white/80" : "text-[var(--muted)]"
                      }`}
                    >
                      {c.description}
                    </p>
                    {big && (
                      <ul className="mt-6 space-y-2 text-sm text-white/85">
                        {getArticlesIn(c.slug)
                          .slice(0, 6)
                          .map((a) => (
                            <li key={a.path}>→ {a.title}</li>
                          ))}
                      </ul>
                    )}
                    <span
                      className={`mt-auto pt-5 font-semibold ${
                        big ? "text-white" : "text-fxbluedeep"
                      }`}
                    >
                      Explorar →
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-14">
              <AmazonAffiliateBox
                variant="showcase"
                sectionTitle={amz.sectionTitle}
                sectionSubtitle={amz.sectionSubtitle}
                products={amz.products}
                source="home-showcase"
              />
            </div>

            {popular.length > 0 && (
              <div className="mt-16">
                <h3
                  className="font-display text-2xl font-extrabold sm:text-3xl"
                  data-reveal
                >
                  Las 6 guías y recetas más consultadas
                </h3>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {popular.slice(0, 6).map((a) => (
                    <div key={a.path} data-reveal>
                      <ArticleCard a={a} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 13. Verificación Técnica vs Marketing + Autoridad E-E-A-T */}
        <section className="wrap py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Metodología y Transparencia Editorial
              </span>
              <SplitHeading
                text="Datos reales,"
                accent={{ text: "no marketing de caja", className: "text-prune" }}
                className="section-title mt-3"
              />
              <p className="mt-5 text-lg text-[var(--muted)]" data-reveal>
                Muchos anuncios prometen &quot;helado en 2 minutos&quot;
                omitiendo las 24 horas previas en el congelador o venden vasos
                que no encajan en tu modelo exacto. En HeladoEnCasa.com —
                dirigido por <strong>{LEGAL_OWNER}</strong> ({LEGAL_LOCATION} ·{" "}
                {LEGAL_EMAIL}) — verificamos especificaciones reales y
                compatibilidad antes de recomendar en Amazon.
              </p>
              <div className="mt-7 flex flex-wrap gap-3" data-reveal>
                <Link
                  href="/sobre-nosotros/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Sobre HeladoEnCasa.com
                </Link>
                <Link
                  href="/politica-editorial/"
                  className="btn btn-ghost"
                  data-magnetic
                >
                  Cómo evaluamos máquinas
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card spot p-6" data-reveal>
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">
                  ✓ Lo que verificamos
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Volumen real frente a porciones útiles servidas</li>
                  <li>• Tiempo total (pre-congelado + ciclo activo)</li>
                  <li>• Medidas de tazón y pinta en pulgadas y cm</li>
                  <li>• Código exacto y muescas de vasos y tapas</li>
                </ul>
              </div>
              <div
                className="card spot p-6"
                data-reveal
                data-reveal-delay="1"
              >
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  ⚠️ Lo que evitamos que compres mal
                </span>
                <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                  <li>• Pintas 16 oz (NC301) compradas para Deluxe 24 oz</li>
                  <li>• Tazones Cuisinart que no entran en mini-freezers</li>
                  <li>• Recetas keto con eritritol que quedan como piedra</li>
                  <li>• Equipos de 120V sin advertir uso en redes 220V</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-8 text-xs text-[var(--muted)]">
            Transparencia: {LEGAL_OWNER} ({LEGAL_LOCATION} · {LEGAL_EMAIL}). En
            este portal {ICE_CREAM_DISCLAIMER}.
          </p>
        </section>

        {/* 14. FAQ + OpenChatButton */}
        <section className="wrap pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <span className="eyebrow" data-reveal>
                Preguntas frecuentes
              </span>
              <SplitHeading
                text="Respuestas rápidas"
                className="section-title mt-3"
              />
              <p className="mt-4 text-[var(--muted)]" data-reveal>
                ¿No sabes si elegir Ninja CREAMi, Cuisinart o qué vasos extra
                necesitas? Nuestro Asesor IA responde al instante.
              </p>
              <div className="mt-6 flex flex-wrap gap-3" data-reveal>
                <OpenChatButton
                  label="Preguntar al Asesor IA"
                  className="btn btn-buy shine"
                />
                <Link
                  href="/guia-compatibilidad-vasos-tazones-y-repuestos/"
                  className="btn btn-ghost"
                >
                  Compatibilidad de vasos
                </Link>
              </div>
            </div>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="card card-static group p-5 open:shadow-lg"
                  data-reveal
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                    {f.q}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-fxsky text-fxbluedeep transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[var(--muted)]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 15. CTA Final Aurora */}
        <section className="wrap pb-6">
          <div className="relative isolate overflow-hidden rounded-[36px] bg-gradient-to-br from-[#0B1820] via-[#0369a1] to-[#BE123C] px-6 py-14 text-white sm:px-14 sm:py-20">
            <Image
              src={ambient("home-hero-helados")}
              alt=""
              fill
              sizes="1200px"
              className="-z-[2] object-cover opacity-20 mix-blend-luminosity"
            />
            <div className="hero-grid opacity-60" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-prune/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-10 h-80 w-80 rounded-full bg-[#F59E0B]/30 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div className="text-center lg:text-left">
                <SplitHeading
                  text="Helado y sorbete casero,"
                  accent={{
                    text: "a tu gusto y con los repuestos exactos",
                    className: "text-[#FDE68A]",
                  }}
                  className="text-4xl font-extrabold sm:text-5xl"
                />
                <p className="mt-4 text-lg text-white/85">
                  Compara máquinas Ninja y Cuisinart en Amazon EE. UU. según
                  precio, porciones, tiempo de preparación y espacio real en tu
                  congelador.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                  <Link
                    href="/resenas-maquinas-de-helado/"
                    className="btn btn-lime shine text-base"
                    data-magnetic
                  >
                    Ver Máquinas en Amazon
                  </Link>
                  <OpenChatButton
                    label="Consultar al Asesor IA"
                    className="btn btn-glass text-base"
                    magnetic
                  />
                </div>
              </div>
              <div className="relative mx-auto w-full max-w-[360px]">
                <div className="absolute inset-[12%] rounded-full bg-white/20 blur-3xl" />
                <Image
                  src={ambient("home-vasos-colores")}
                  alt="Vasos de pintas compatibles para helado casero con tapas de colores"
                  width={400}
                  height={225}
                  sizes="360px"
                  className="float-y relative h-auto w-full rounded-3xl border border-white/25 drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ClientEffects stickySource="home-sticky" />
    </>
  );
}
