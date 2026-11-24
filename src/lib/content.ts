import fs from "node:fs";
import path from "node:path";
import categories from "@/data/categories.json";
import keywordMap from "@/data/keyword_map.json";

export const SITE_URL = "https://heladoencasa.com";
export const SITE_NAME = "HeladoEnCasa.com";
export const LEGAL_OWNER = "CARLOS LINGAN BORJA";
export const LEGAL_LOCATION = "Lima, Perú";
export const LEGAL_EMAIL = "info@charlielingan.com";
export const LEGAL_LINE =
  "Titular del sitio web: CARLOS LINGAN BORJA, domiciliado en Lima, Perú · Correo electrónico: info@charlielingan.com";
export const ICE_CREAM_DISCLAIMER =
  "las marcas comerciales mencionadas (Amazon, Ninja, Ninja CREAMi, Cuisinart, Whynter, Breville, KitchenAid, Dash, Hamilton Beach, Tovolo, Zeroll, entre otras) pertenecen a sus respectivos propietarios; este portal ofrece guías independientes en español para elegir máquinas de helado caseras según precio, porciones, tiempo de preparación y espacio en el congelador, junto a recetas de helados y sorbetes y tablas de compatibilidad de vasos, tapas y recipientes de repuesto, y participa en el Programa de Afiliados de Amazon";
export const PUBLISHED = "2026-11-24";
export const VERIFIED_LABEL = "24/11/2026";
export const CHAT_ENDPOINT =
  "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/heladoencasa-chat";

export type Block =
  | { type: "p" | "h2" | "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | {
      type: "callout";
      variant: "etiqueta" | "fabricante" | "aviso" | "tip";
      title?: string;
      text: string;
    }
  | { type: "steps"; items: { name: string; text: string }[] }
  | { type: "cta"; text: string };

export type Article = {
  slug: string;
  pillar: string;
  path: string;
  isPillar: boolean;
  isTransactional?: boolean;
  primaryKeyword: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  quickAnswer: string;
  readingMinutes: number;
  image: { prompt: string; alt: string };
  blocks: Block[];
  faqs: { q: string; a: string }[];
  sources?: { label: string; url: string }[];
  related: string[];
  datePublished: string;
  dateModified: string;
  imageUrl: string | null;
};

export type Category = (typeof categories)[number];

const DIR = path.join(process.cwd(), "src/content/articles");
const PUBLIC = path.join(process.cwd(), "public");
let cache: Article[] | null = null;

function isValidArticle(a: Partial<Article>): a is Article {
  return Boolean(
    a && a.slug && a.pillar && a.path && a.title && Array.isArray(a.blocks)
  );
}

const PILLAR_SCENE_POOLS: Record<string, string[]> = {
  "resenas-maquinas-de-helado": [
    "cat-resenas-maquinas-de-helado",
    "scene-resenas-2",
    "scene-resenas-3",
    "home-ninja-creami",
    "home-cuisinart-bowl",
    "home-compresor-gelato",
  ],
  "comparativas-maquinas-de-helado": [
    "cat-comparativas-maquinas-de-helado",
    "scene-comparativas-2",
    "scene-comparativas-3",
    "home-espacio-freezer",
    "og-default",
  ],
  "maquinas-por-precio-porciones-y-espacio": [
    "cat-maquinas-por-precio-porciones-y-espacio",
    "scene-precio-2",
    "scene-precio-3",
    "home-espacio-freezer",
    "home-cuisinart-bowl",
  ],
  "vasos-tapas-y-recipientes-compatibles": [
    "cat-vasos-tapas-y-recipientes-compatibles",
    "scene-vasos-2",
    "scene-vasos-3",
    "home-vasos-colores",
    "home-espacio-freezer",
  ],
  "maquinas-para-gelato-sorbete-y-soft-serve": [
    "cat-maquinas-para-gelato-sorbete-y-soft-serve",
    "scene-gelato-2",
    "scene-gelato-3",
    "home-compresor-gelato",
    "home-sorbete-mango",
  ],
  "ingredientes-bases-y-accesorios-heladeria": [
    "cat-ingredientes-bases-y-accesorios-heladeria",
    "scene-insumos-2",
    "scene-insumos-3",
    "home-conos-waffle",
  ],
  "guia-compatibilidad-vasos-tazones-y-repuestos": [
    "cat-guia-compatibilidad-vasos-tazones-y-repuestos",
    "scene-compatibilidad-2",
    "scene-compatibilidad-3",
    "home-vasos-colores",
  ],
  "espacio-en-congelador-tiempo-y-funcionamiento": [
    "cat-espacio-en-congelador-tiempo-y-funcionamiento",
    "scene-freezer-2",
    "scene-freezer-3",
    "home-espacio-freezer",
  ],
  "recetas-de-helados-cremosos-y-gelatos": [
    "cat-recetas-de-helados-cremosos-y-gelatos",
    "scene-helados-2",
    "scene-helados-3",
    "home-gelato-pistacho",
    "home-conos-waffle",
  ],
  "recetas-de-sorbetes-y-frutas-naturales": [
    "cat-recetas-de-sorbetes-y-frutas-naturales",
    "scene-sorbetes-2",
    "scene-sorbetes-3",
    "home-sorbete-mango",
  ],
  "helados-saludables-proteicos-keto-y-sin-lactosa": [
    "cat-helados-saludables-proteicos-keto-y-sin-lactosa",
    "scene-keto-2",
    "scene-keto-3",
    "home-helado-fit",
  ],
  "textura-ciencia-del-helado-y-tecnicas": [
    "cat-textura-ciencia-del-helado-y-tecnicas",
    "scene-textura-2",
    "scene-textura-3",
    "home-ninja-creami",
  ],
  "limpieza-cuidado-y-solucion-de-problemas": [
    "cat-limpieza-cuidado-y-solucion-de-problemas",
    "scene-limpieza-2",
    "scene-limpieza-3",
    "home-cuidado-limpieza",
  ],
  "guia-de-compra-envio-y-voltaje-amazon-usa": [
    "cat-guia-de-compra-envio-y-voltaje-amazon-usa",
    "scene-compra-2",
    "scene-compra-3",
    "home-hero-helados",
  ],
};

function resolveArticleImage(
  a: Article,
  pillarCountMap: Map<string, number>
): string {
  const imgArt = path.join(PUBLIC, "img/articulos", `${a.slug}.webp`);
  if (fs.existsSync(imgArt)) {
    return `/img/articulos/${a.slug}.webp`;
  }
  if (a.isPillar) {
    const imgCat = path.join(PUBLIC, "img/ambiente", `cat-${a.pillar}.webp`);
    if (fs.existsSync(imgCat)) return `/img/ambiente/cat-${a.pillar}.webp`;
  }
  const idx = pillarCountMap.get(a.pillar) || 0;
  pillarCountMap.set(a.pillar, idx + 1);
  const pool = PILLAR_SCENE_POOLS[a.pillar] || ["home-hero-helados"];
  const candidate = pool[idx % pool.length];
  const candidatePath = path.join(PUBLIC, "img/ambiente", `${candidate}.webp`);
  if (fs.existsSync(candidatePath)) {
    return `/img/ambiente/${candidate}.webp`;
  }
  const imgAmb = path.join(PUBLIC, "img/ambiente", `cat-${a.pillar}.webp`);
  return fs.existsSync(imgAmb)
    ? `/img/ambiente/cat-${a.pillar}.webp`
    : `/img/ambiente/home-hero-helados.webp`;
}

export function getAllContent(): Article[] {
  if (cache) return cache;
  const order = (keywordMap as { path: string }[]).map((k) => k.path);
  const files = fs.existsSync(DIR)
    ? fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
    : [];
  const list: Article[] = [];
  const seen = new Set<string>();
  const pillarCountMap = new Map<string, number>();
  for (const f of files) {
    try {
      const a = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      if (!isValidArticle(a) || seen.has(a.path)) continue;
      seen.add(a.path);
      const imageUrl = resolveArticleImage(a, pillarCountMap);
      list.push({
        ...a,
        isPillar: Boolean(a.isPillar),
        isTransactional: Boolean(a.isTransactional),
        image:
          a.image && a.image.alt ? a.image : { prompt: "", alt: a.title },
        faqs: Array.isArray(a.faqs) ? a.faqs : [],
        related: Array.isArray(a.related) ? a.related : [],
        quickAnswer: a.quickAnswer || a.excerpt || "",
        excerpt: a.excerpt || a.metaDescription || "",
        seoTitle: a.seoTitle || a.title,
        metaDescription: a.metaDescription || a.excerpt || "",
        datePublished: a.datePublished || PUBLISHED,
        dateModified: a.dateModified || PUBLISHED,
        imageUrl,
      });
    } catch {
      // ignore invalid json
    }
  }
  list.sort((x, y) => {
    const ix = order.indexOf(x.path);
    const iy = order.indexOf(y.path);
    if (ix === -1 && iy === -1) return x.path.localeCompare(y.path);
    if (ix === -1) return 1;
    if (iy === -1) return -1;
    return ix - iy;
  });
  cache = list;
  return list;
}

export const getCategories = (): Category[] => categories;
export const getCategory = (slug: string) =>
  categories.find((c) => c.slug === slug);
export const getPillar = (slug: string) =>
  getAllContent().find((a) => a.isPillar && a.pillar === slug);
export const getArticle = (pillar: string, slug: string) =>
  getAllContent().find(
    (a) => !a.isPillar && a.pillar === pillar && a.slug === slug
  );
export const getArticlesIn = (pillar: string) =>
  getAllContent().filter((a) => !a.isPillar && a.pillar === pillar);
export const getByPath = (p: string) =>
  getAllContent().find((a) => a.path === p);

export function safeHref(p: string): string {
  if (getByPath(p)) return p;
  const pillar = p.split("/").filter(Boolean)[0];
  if (pillar && getCategory(pillar)) return `/${pillar}/`;
  return "/";
}

export function ambient(
  name: string,
  fallback = "/img/ambiente/home-hero-helados.webp"
): string {
  const rel = `/img/ambiente/${name}.webp`;
  return fs.existsSync(path.join(PUBLIC, rel)) ? rel : fallback;
}

export const hasAmbient = (name: string) =>
  fs.existsSync(path.join(PUBLIC, `/img/ambiente/${name}.webp`));

export const OG_DEFAULT = () =>
  ambient("og-default", "/img/ambiente/home-hero-helados.webp");

export function absolute(url: string) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function trimTitle(t: string) {
  return t.replace(/\s*\|\s*HeladoEnCasa(?:\.com)?\s*$/i, "");
}

export const organizationLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#org`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.svg`,
  founder: { "@id": `${SITE_URL}/#carlos` },
  email: LEGAL_EMAIL,
  description:
    "Guía en español para elegir máquinas de helado caseras Ninja y Cuisinart en Amazon Estados Unidos comparando precio, porciones, tiempo y espacio en congelador, con recetas y compatibilidad de vasos y tapas.",
};

export const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#carlos`,
  name: LEGAL_OWNER,
  email: LEGAL_EMAIL,
  jobTitle: "Fundador & Editor Jefe de HeladoEnCasa.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  url: `${SITE_URL}/sobre-nosotros/`,
};
