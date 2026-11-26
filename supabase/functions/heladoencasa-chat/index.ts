import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-sync-key",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const SITE = "https://heladoencasa.com";
const ALLOWED_MODELS = ["gpt-4o-mini", "gpt-4o"];
const AMAZON_TAG_US = "heladoencasa-20";
const AMAZON_TAG_ES = "heladoencasa-21";

export interface ArticleRow {
  slug: string;
  title: string;
  category: string;
  category_name: string;
  excerpt: string | null;
  featured_image: string | null;
  read_time: string | null;
  search_text: string | null;
}

export interface ArticleCard {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  url: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface AmazonProductCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  rating: string;
  reviewsCount: string;
  urlUS: string;
  urlES: string;
}

const AMAZON_PRODUCTS: Record<string, AmazonProductCard> = {
  "ninja-creami-nc301": {
    id: "ninja-creami-nc301",
    badge: "🏆 #1 Más Vendida · 7 en 1 · Vasos 16 oz",
    title:
      "Ninja CREAMi NC301 Ice Cream, Gelato & Sorbet Maker (7 Programas · 2 Pintas 16 oz)",
    subtitle:
      "2–3 porciones por pinta, texturiza en 2–3 min tras congelar 24h. Ocupa poco espacio en el freezer (4.4\"×4.5\" por vaso) e incluye 2 vasos compatibles NC299/NC300/NC301.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Ninja CREAMi NC301 Ice Cream Maker 7 One-Touch Programs")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Ninja CREAMi NC300EU heladera vasos 473ml")}&tag=${AMAZON_TAG_ES}`,
  },
  "ninja-creami-deluxe-nc501": {
    id: "ninja-creami-deluxe-nc501",
    badge: "👨‍👩‍👧‍👦 Mejor Familiar XL · 11 en 1 · Vasos 24 oz",
    title:
      "Ninja CREAMi Deluxe NC501 11-in-1 XL Ice Cream & Frozen Treat Maker (2 Pintas XL 24 oz)",
    subtitle:
      "4–5 porciones por vaso (50% más capacidad que NC301), procesa mitad superior/inferior por separado y prepara gelato, sorbete, slushi, creamiFIT y yogur helado.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Ninja CREAMi Deluxe NC501 11-in-1 XL Ice Cream Maker")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Ninja CREAMi Deluxe NC501EU heladera XL 709ml")}&tag=${AMAZON_TAG_ES}`,
  },
  "ninja-pints-16oz-4pack": {
    id: "ninja-pints-16oz-4pack",
    badge: "🥣 Repuesto Compatible Serie NC299 / NC300 / NC301",
    title:
      "Pack 4 Vasos y Tapas Herméticas 16 oz (473 ml) Compatibles con Ninja CREAMi NC301 / NC300",
    subtitle:
      "Base exacta con 4 muescas de bloqueo y diámetro 4.4\"×4.5\". NO compatibles con serie NC501 Deluxe (24 oz) ni NC100/200 Breeze.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Ninja CREAMi Pints and Lids 4 Pack 16 oz NC301 NC300 NC299")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("vasos y tapas repuesto Ninja CREAMi NC300EU 4 pack")}&tag=${AMAZON_TAG_ES}`,
  },
  "ninja-pints-24oz-deluxe-4pack": {
    id: "ninja-pints-24oz-deluxe-4pack",
    badge: "🥣 Repuesto XL Compatible Exclusivo NC500 / NC501 Deluxe",
    title:
      "Pack 4 Vasos XL 24 oz (709 ml) y Tapas Compatibles con Ninja CREAMi Deluxe NC501 / NC500",
    subtitle:
      "Recipientes altos de 4.7\"×5.7\" BPA-Free aptos para congelador hasta -22 °C. Exclusivos para serie Deluxe NC500/NC501/CN501CO.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Ninja CREAMi Deluxe XL 24 oz Pints and Lids 4 Pack NC501")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("vasos repuesto Ninja CREAMi Deluxe NC501EU 709ml")}&tag=${AMAZON_TAG_ES}`,
  },
  "cuisinart-ice-21p1": {
    id: "cuisinart-ice-21p1",
    badge: "💵 Mejor Calidad-Precio < US$80 · 6–8 Porciones",
    title:
      "Cuisinart ICE-21P1 1.5-Quart Frozen Yogurt, Ice Cream & Sorbet Maker",
    subtitle:
      "Prepara hasta 1.4 litros (6–8 bolas) en 20 minutos tras pre-congelar su tazón de doble pared (7.5\"×6.2\"). Económica, simple y silenciosa.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Cuisinart ICE-21P1 1.5 Quart Ice Cream Maker")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Cuisinart ICE-21 heladera 1.4 litros")}&tag=${AMAZON_TAG_ES}`,
  },
  "cuisinart-ice-21rfb-bowl": {
    id: "cuisinart-ice-21rfb-bowl",
    badge: "❄️ Tazón Extra Compatible Cuisinart 1.5 Qt",
    title:
      "Tazón Congelador de Repuesto Oficial Cuisinart ICE-21RFB (1.5 Quart Doble Pared)",
    subtitle:
      "Permite hacer dos sabores seguidos (ej. helado de vainilla y sorbete de mango) sin esperar otras 24 horas. Compatible con ICE-21, ICE-21P1 y ICE-20.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Cuisinart ICE-21RFB 1.5 Quart Replacement Freezer Bowl")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Cuisinart bol congelador repuesto heladera 1.5L")}&tag=${AMAZON_TAG_ES}`,
  },
  "cuisinart-ice-30bc": {
    id: "cuisinart-ice-30bc",
    badge: "🍨 Mejor Familiar 2.0 Qt Acero Cepillado",
    title:
      "Cuisinart ICE-30BC Pure Indulgence 2-Quart Automatic Ice Cream, Sorbet & Frozen Yogurt Maker",
    subtitle:
      "Rinde 8–10 porciones en 25 min con motor potente y tazón grande (8.3\"×7\"). Ideal si tienes congelador mediano/grande y buscas tandas generosas.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Cuisinart ICE-30BC Pure Indulgence 2-Quart Ice Cream Maker")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Cuisinart ICE-30BCE heladera acero inoxidable 2 litros")}&tag=${AMAZON_TAG_ES}`,
  },
  "cuisinart-ice-100-compressor": {
    id: "cuisinart-ice-100-compressor",
    badge: "⚡ 0 Espacio en Congelador · Compresor Autónomo",
    title:
      "Cuisinart ICE-100 Compressor Ice Cream & Gelato Maker (1.5 Qt · 2 Paletas)",
    subtitle:
      "No ocupa espacio en tu freezer ni requiere pre-congelar 24h: enciende y logra helado o gelato auténtico en 40–50 min con paleta especial para gelato denso.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Cuisinart ICE-100 Compressor Ice Cream and Gelato Maker")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("Cuisinart ICE100E heladera con compresor gelato")}&tag=${AMAZON_TAG_ES}`,
  },
  "whynter-icm-200ls-compressor": {
    id: "whynter-icm-200ls-compressor",
    badge: "🏢 Alta Capacidad Compresor 2.1 Qt · Lotes Continuos",
    title:
      "Whynter ICM-200LS 2.1-Quart Stainless Steel Automatic Compressor Ice Cream Maker",
    subtitle:
      "8–12 porciones sin pre-congelar ni ocupar el freezer. Cubeta extraíble de acero inoxidable y temporizador digital para reuniones y entusiastas.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Whynter ICM-200LS 2.1 Quart Ice Cream Maker Stainless Steel")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("heladera con compresor acero inoxidable 2 litros")}&tag=${AMAZON_TAG_ES}`,
  },
  "tovolo-glide-scoop-allulose": {
    id: "tovolo-glide-scoop-allulose",
    badge: "🍓 Esencial Para Recetas, Conservación y Textura Cremosa",
    title:
      "Contenedor Térmico Tovolo Glide-A-Scoop 1.5 Qt + Alulosa Pura para Helados Sin Cristales",
    subtitle:
      "Conserva helados y sorbetes recién batidos en Cuisinart sin quemadura por frío y endulza versiones keto/fit manteniéndolas suaves como heladería.",
    urlUS: `https://www.amazon.com/s?k=${encodeURIComponent("Tovolo Glide-A-Scoop 1.5 Quart Insulated Ice Cream Tub")}&tag=${AMAZON_TAG_US}`,
    urlES: `https://www.amazon.es/s?k=${encodeURIComponent("recipiente termico guardar helado casero tapa hermetica")}&tag=${AMAZON_TAG_ES}`,
  },
};

function calculateCostUsd(
  model: string,
  promptTokens: number,
  completionTokens: number
): number {
  if (model.includes("mini")) {
    return Number(
      (promptTokens * 0.00000015 + completionTokens * 0.0000006).toFixed(6)
    );
  }
  return Number(
    (promptTokens * 0.0000025 + completionTokens * 0.00001).toFixed(6)
  );
}

const norm = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOPWORDS = new Set([
  "como",
  "cual",
  "cuales",
  "que",
  "quien",
  "donde",
  "cuando",
  "por",
  "para",
  "con",
  "sin",
  "una",
  "uno",
  "los",
  "las",
  "del",
  "al",
  "hola",
  "quiero",
  "puedo",
  "recomienda",
  "mejor",
  "mejores",
  "sobre",
  "mas",
  "muy",
  "tiene",
  "tengo",
  "maquina",
  "maquinas",
  "helado",
  "helados",
  "casero",
  "casa",
]);

function extractTokens(text: string): string[] {
  return norm(text)
    .split(" ")
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
}

let catalogCache: {
  at: number;
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
} | null = null;

async function loadCatalog(): Promise<{
  rows: ArticleRow[];
  bySlug: Map<string, ArticleRow>;
}> {
  if (
    catalogCache &&
    Date.now() - catalogCache.at < 10 * 60 * 1000 &&
    catalogCache.rows.length > 0
  ) {
    return catalogCache;
  }
  const [batch1, batch2] = await Promise.all([
    supabase
      .from("heladoencasa_articles")
      .select(
        "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
      )
      .eq("active", true)
      .range(0, 999),
    supabase
      .from("heladoencasa_articles")
      .select(
        "slug, title, category, category_name, excerpt, featured_image, read_time, search_text"
      )
      .eq("active", true)
      .range(1000, 1999),
  ]);

  const rows: ArticleRow[] = [];
  const bySlug = new Map<string, ArticleRow>();
  for (const data of [batch1.data, batch2.data]) {
    if (Array.isArray(data)) {
      for (const r of data as ArticleRow[]) {
        if (!bySlug.has(r.slug)) {
          bySlug.set(r.slug, r);
          rows.push(r);
        }
      }
    }
  }
  catalogCache = { at: Date.now(), rows, bySlug };
  return catalogCache;
}

function toArticleCard(r: ArticleRow): ArticleCard {
  const img = r.featured_image || "/img/ambiente/home-hero-helados.webp";
  const url =
    r.slug === r.category
      ? `${SITE}/${r.category}/`
      : `${SITE}/${r.category}/${r.slug}/`;
  return {
    slug: r.slug,
    title: r.title,
    category: r.category,
    categoryName: r.category_name,
    url,
    image: img.startsWith("http") ? img : `${SITE}${img}`,
    readTime: r.read_time || "7 min",
    excerpt: (r.excerpt || "").slice(0, 145),
  };
}

function searchArticles(
  rows: ArticleRow[],
  userMessage: string,
  historyText: string,
  limit = 14
): ArticleRow[] {
  const primaryTokens = extractTokens(userMessage);
  const contextTokens = extractTokens(historyText).filter(
    (t) => !primaryTokens.includes(t)
  );
  const fullPhrase = norm(userMessage);

  const starterSlugs = [
    "ninja-creami-nc301-vs-cuisinart-ice-21-comparativa-completa",
    "ninja-creami-nc301-resena-precio-porciones-espacio-freezer",
    "cuisinart-ice-100-compresor-resena-gelato-helado-sin-freezer",
    "guia-compatibilidad-vasos-tapas-ninja-creami-nc301-nc501-breeze-swirl",
    "como-elegir-maquina-helado-segun-espacio-congelador",
    "receta-sorbete-mango-natural-cremoso-ninja-cuisinart",
  ];

  if (primaryTokens.length === 0 && contextTokens.length === 0) {
    const picked: ArticleRow[] = [];
    for (const s of starterSlugs) {
      const f = rows.find((r) => r.slug === s);
      if (f) picked.push(f);
    }
    return picked.length > 0 ? picked : rows.slice(0, 8);
  }

  const scored: Array<{ r: ArticleRow; score: number }> = [];
  for (const r of rows) {
    const titleNorm = norm(r.title);
    const catNorm = norm(`${r.category_name} ${r.category}`);
    const bodyNorm =
      r.search_text || `${titleNorm} ${catNorm} ${norm(r.excerpt || "")}`;

    let score = 0;
    if (fullPhrase.length >= 5 && titleNorm.includes(fullPhrase)) score += 45;

    let matchedPrimary = 0;
    for (const tok of primaryTokens) {
      if (titleNorm.includes(tok)) {
        score += 16;
        matchedPrimary++;
      } else if (catNorm.includes(tok)) {
        score += 9;
        matchedPrimary++;
      } else if (bodyNorm.includes(tok)) {
        score += 5;
        matchedPrimary++;
      }
    }
    if (matchedPrimary >= 2) score += matchedPrimary * 8;
    if (starterSlugs.includes(r.slug)) score += 5;

    for (const cTok of contextTokens.slice(-5)) {
      if (titleNorm.includes(cTok)) score += 3;
    }

    if (score > 0) scored.push({ r, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body =
      req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const mode = body.mode || (req.method === "GET" ? "config" : "chat");

    // 0. Seed / Sync articles endpoint
    if (mode === "seed_articles") {
      const syncKey = req.headers.get("x-sync-key") || "";
      if (syncKey !== "heladoencasa-sync-2026") {
        return json({ error: "No autorizado" }, 401);
      }
      const rows = Array.isArray(body.articles) ? body.articles : [];
      if (rows.length === 0) return json({ error: "Sin artículos" }, 400);
      const { error } = await supabase
        .from("heladoencasa_articles")
        .upsert(rows, { onConflict: "slug" });
      if (error) return json({ error: error.message }, 500);
      catalogCache = null;
      return json({ success: true, count: rows.length });
    }

    // 1. Load live config (Default: gpt-4o-mini)
    const { data: configRow } = await supabase
      .from("heladoencasa_chat_config")
      .select("*")
      .eq("id", "default")
      .maybeSingle();

    const config = configRow || {
      is_enabled: true,
      ai_model: "gpt-4o-mini",
      temperature: 0.35,
      max_messages_per_session: 30,
      daily_budget_usd: 5.0,
      welcome_message:
        "¡Hola! 🍨✨ Soy tu Asesor de Máquinas de Helado IA de HeladoEnCasa.com (modelo mini rápido). Cuéntame tu presupuesto, cuántas porciones necesitas, si tienes espacio en el congelador o si buscas vasos/tapas compatibles para Ninja CREAMi o Cuisinart y recetas de helados o sorbetes, y te recomendaré la mejor opción en Amazon Estados Unidos.",
      custom_instructions: "",
    };

    const activeModel = ALLOWED_MODELS.includes(config.ai_model)
      ? config.ai_model
      : "gpt-4o-mini";

    if (mode === "config" || req.method === "GET") {
      return json({
        is_enabled: config.is_enabled,
        welcome_message: config.welcome_message,
        ai_model: activeModel,
        max_messages_per_session: config.max_messages_per_session,
      });
    }

    // 2. Track click on an article or Amazon product
    if (mode === "track_click") {
      const {
        session_id,
        visitor_id,
        article_slug,
        article_title,
        category,
        target_url,
        page_url,
      } = body;
      if (target_url) {
        await supabase.from("heladoencasa_chat_clicks").insert({
          session_id: session_id || null,
          visitor_id: String(visitor_id || "anon").slice(0, 80),
          article_slug: article_slug
            ? String(article_slug).slice(0, 180)
            : null,
          article_title: article_title
            ? String(article_title).slice(0, 240)
            : null,
          category: category ? String(category).slice(0, 80) : null,
          target_url: String(target_url).slice(0, 500),
          page_url: page_url ? String(page_url).slice(0, 500) : null,
        });

        if (session_id) {
          const { data: sess } = await supabase
            .from("heladoencasa_chat_sessions")
            .select("clicks_count, clicked_urls")
            .eq("id", session_id)
            .maybeSingle();
          if (sess) {
            const urls = Array.isArray(sess.clicked_urls)
              ? sess.clicked_urls
              : [];
            if (!urls.includes(target_url)) urls.push(target_url);
            await supabase
              .from("heladoencasa_chat_sessions")
              .update({
                clicks_count: (sess.clicks_count || 0) + 1,
                clicked_urls: urls,
              })
              .eq("id", session_id);
          }
        }
      }
      return json({ success: true });
    }

    // 3. Chat Completion
    if (!config.is_enabled) {
      return json({
        reply: `En este momento el Asesor de Máquinas de Helado IA está en mantenimiento breve. Puedes ver nuestras comparativas de Ninja y Cuisinart en [HeladoEnCasa.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: [
          "Ninja CREAMi NC301 vs Cuisinart ICE-21",
          "Vasos y tapas compatibles Ninja CREAMi",
        ],
        disabled: true,
      });
    }

    const userMessage = String(body.message || "").trim().slice(0, 1000);
    if (!userMessage) return json({ error: "Mensaje vacío" }, 400);

    const visitorId = String(
      body.visitor_id || "hlc-" + crypto.randomUUID().slice(0, 8)
    ).slice(0, 80);
    const region = body.region === "ES" ? "ES" : "US";
    const storeName = region === "ES" ? "Amazon.es" : "Amazon.com";
    const pageUrl = String(body.page_url || SITE + "/").slice(0, 500);
    const userAgent = String(
      body.user_agent || req.headers.get("user-agent") || ""
    ).slice(0, 300);
    const history = Array.isArray(body.history) ? body.history.slice(-8) : [];
    let sessionId: string | null = body.session_id || null;

    let existingSession: any = null;
    if (sessionId) {
      const { data: s } = await supabase
        .from("heladoencasa_chat_sessions")
        .select("*")
        .eq("id", sessionId)
        .maybeSingle();
      existingSession = s;
    }

    if (!existingSession) {
      const { data: created, error: createErr } = await supabase
        .from("heladoencasa_chat_sessions")
        .insert({
          visitor_id: visitorId,
          page_url: pageUrl,
          user_agent: userAgent,
          first_user_message: userMessage.slice(0, 250),
          last_user_message: userMessage.slice(0, 250),
          messages_count: 1,
          model_used: activeModel,
        })
        .select("*")
        .single();

      if (!createErr && created) {
        existingSession = created;
        sessionId = created.id;
      }
    }

    if (sessionId) {
      await supabase.from("heladoencasa_chat_messages").insert({
        session_id: sessionId,
        role: "user",
        content: userMessage,
      });
    }

    const catalog = await loadCatalog();
    const recentHistoryText = history
      .slice(-3)
      .map((h: any) => h?.content || "")
      .join(" ");
    const candidateRows = searchArticles(
      catalog.rows,
      userMessage,
      recentHistoryText,
      14
    );

    const candidatesPrompt =
      candidateRows.length > 0
        ? candidateRows
            .map((r) => {
              const u =
                r.slug === r.category
                  ? `${SITE}/${r.category}/`
                  : `${SITE}/${r.category}/${r.slug}/`;
              return `- SLUG: "${r.slug}" | TÍTULO: "${r.title}" | CATEGORÍA: ${r.category_name} | URL: ${u} | RESUMEN: ${(r.excerpt || "").slice(0, 140)}`;
            })
            .join("\n")
        : "No se encontraron artículos exactos con esos términos.";

    const amazonCatalogPrompt = Object.values(AMAZON_PRODUCTS)
      .map(
        (p) =>
          `- PRODUCT_ID: "${p.id}" | ${p.badge} | NOMBRE: "${p.title}" | DETALLE: ${p.subtitle} | URL_${region}: ${region === "ES" ? p.urlES : p.urlUS}`
      )
      .join("\n");

    const extraInstructions = config.custom_instructions
      ? `\nINSTRUCCIONES ADICIONALES DEL ADMIN:\n${config.custom_instructions}\n`
      : "";

    const systemPrompt = `Eres el Asesor Oficial de Máquinas de Helado Caseras y Recetas IA de HeladoEnCasa.com (${SITE}), la guía líder en español con más de 1,500 artículos para elegir máquinas de helado Ninja y Cuisinart en Amazon Estados Unidos (fundado por Carlos Lingan Borja, info@charlielingan.com).

Tu doble misión es:
1. RESPONDER CON PRECISIÓN TÉCNICA Y CERCANÍA TODAS LAS DUDAS DEL USUARIO:
   - COMPARATIVA POR 4 EJES CLAVE:
     * PRECIO EN USD: Económicas de tazón congelador <US$80 (Cuisinart ICE-21P1), gama media ~US$99–$130 (Cuisinart ICE-30BC / ICE-70P1), sistema de cuchilla vertical ~US$179–$250 (Ninja CREAMi NC301 / NC501 Deluxe), y máquinas con compresor autónomo ~US$269–$349 (Cuisinart ICE-100 / Whynter ICM-200LS).
     * PORCIONES QUE RINDEN: Ninja NC301 (16 oz = 2–3 bolas), Ninja NC501 Deluxe (24 oz = 4–5 bolas), Cuisinart ICE-21 / ICE-100 (1.5 Qt = 6–8 bolas), Cuisinart ICE-30BC / Whynter (2.0–2.1 Qt = 8–12 bolas).
     * TIEMPO DE PREPARACIÓN: Ninja CREAMi / Cuisinart de tazón requieren pre-congelar 24h la base o el tazón antes de procesar en 2–20 min; Cuisinart ICE-100 / Whynter con compresor hacen helado al instante en 40–50 min sin espera previa de 24h.
     * ESPACIO EN EL CONGELADOR: Vaso Ninja 16 oz (4.4"×4.5"), Vaso Deluxe 24 oz (4.7"×5.7"), Tazón Cuisinart ICE-21 (7.5"×6.2"), Tazón ICE-30BC (8.3"×7"), o 0 cm³ en freezer con compresor ICE-100/Whynter.
   - COMPATIBILIDAD EXACTA DE VASOS, TAPAS Y RECIPIENTES:
     * Vasos 16 oz (4 muescas en la base) son compatibles SOLO con Ninja NC299AMZ, NC300, NC301, CN301CO y CN305A.
     * Vasos XL 24 oz son exclusivos de Ninja CREAMi Deluxe NC500 / NC501 / CN501CO (NO caben en NC301).
     * Ninja Breeze (NC100/NC200) y Ninja Swirl (NC701) usan vasos exclusivos incompatibles entre sí.
     * Cuisinart ICE-21RFB (1.5 Qt) sirve en ICE-21/ICE-20; ICE-30RFB (2.0 Qt) sirve en ICE-30BC/ICE-70.
   - RECETAS DE HELADOS Y SORBETES: Da medidas exactas en gramos/tazas adaptadas tanto para pinta Ninja CREAMi como para tazón batidor Cuisinart, y explica trucos como alisar la mezcla antes de procesar o usar alulosa para evitar cristales.
   - Enlaza en tu respuesta entre 1 y 3 guías de nuestro listado inferior usando Markdown exacto: [Título](${SITE}/categoria/slug/) e incluye sus slugs en "recommended_slugs".
2. AYUDAR ACTIVAMENTE A QUE COMPREN EN AMAZON (${storeName}):
   - Recomienda siempre 1 o 2 productos exactos de nuestro CATÁLOGO AMAZON OFICIAL (por ejemplo, la máquina ideal + sus vasos o tazón extra compatible o recipiente térmico).
   - Incluye en tu texto un enlace Markdown directo al producto en ${storeName} usando su URL_${region} exacta y añade entre 1 y 2 IDs en "recommended_product_ids".${extraInstructions}

CATÁLOGO AMAZON OFICIAL (${storeName}):
${amazonCatalogPrompt}

ARTÍCULOS ENCONTRADOS EN HELADOENCASA.COM:
${candidatesPrompt}

Responde ÚNICAMENTE con un objeto JSON válido con estas 4 llaves exactas:
{
  "reply": "Tu respuesta clara y experta en español comparando precio, porciones, tiempo, espacio en congelador, compatibilidad o recetas, con enlaces Markdown a nuestras guías y al producto en ${storeName}",
  "recommended_slugs": ["slug-1", "slug-2"],
  "recommended_product_ids": ["ninja-creami-nc301", "ninja-pints-16oz-4pack"],
  "suggested_options": ["Opción 1", "Opción 2", "Opción 3"]
}`;

    const chatMessages: any[] = [{ role: "system", content: systemPrompt }];
    for (const h of history) {
      if (
        h &&
        (h.role === "user" || h.role === "assistant") &&
        typeof h.content === "string"
      ) {
        chatMessages.push({ role: h.role, content: h.content.slice(0, 1200) });
      }
    }
    chatMessages.push({ role: "user", content: userMessage });

    const openaiRes = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: activeModel,
          messages: chatMessages,
          temperature: Number(config.temperature) || 0.35,
          max_tokens: 900,
          response_format: { type: "json_object" },
        }),
      }
    );

    if (!openaiRes.ok) {
      throw new Error("OpenAI status " + openaiRes.status);
    }

    const openaiData = await openaiRes.json();
    const rawContent = openaiData.choices?.[0]?.message?.content || "{}";
    let parsed: any = {};
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      parsed = {
        reply: rawContent,
        recommended_slugs: candidateRows.slice(0, 2).map((r) => r.slug),
        recommended_product_ids: ["ninja-creami-nc301"],
        suggested_options: [
          "¿Ninja CREAMi NC301 o Cuisinart ICE-21?",
          "¿Qué vasos extra son compatibles con mi Ninja?",
          "Receta de sorbete de mango sin cristales",
        ],
      };
    }

    const slugs: string[] = Array.isArray(parsed.recommended_slugs)
      ? parsed.recommended_slugs.slice(0, 3)
      : [];
    const recommendedArticles: ArticleCard[] = slugs
      .map((s) => catalog.bySlug.get(s))
      .filter((r): r is ArticleRow => Boolean(r))
      .map(toArticleCard);

    const productIds: string[] = Array.isArray(parsed.recommended_product_ids)
      ? parsed.recommended_product_ids.slice(0, 2)
      : ["ninja-creami-nc301"];
    const recommendedProducts: AmazonProductCard[] = productIds
      .map((id) => AMAZON_PRODUCTS[id])
      .filter((p): p is AmazonProductCard => Boolean(p));

    const suggestedOptions: string[] = Array.isArray(parsed.suggested_options)
      ? parsed.suggested_options
          .slice(0, 3)
          .map((s: unknown) => String(s).slice(0, 72))
      : [];

    const replyText: string =
      parsed.reply ||
      `Te recomiendo revisar nuestra comparativa de [Ninja CREAMi NC301 vs Cuisinart ICE-21](${SITE}/comparativas-maquinas-de-helado/ninja-creami-nc301-vs-cuisinart-ice-21-comparativa-completa/).`;

    const promptTokens = openaiData.usage?.prompt_tokens || 0;
    const completionTokens = openaiData.usage?.completion_tokens || 0;
    const totalTokens =
      openaiData.usage?.total_tokens || promptTokens + completionTokens;
    const costUsd = calculateCostUsd(
      activeModel,
      promptTokens,
      completionTokens
    );

    if (sessionId && existingSession) {
      await supabase.from("heladoencasa_chat_messages").insert({
        session_id: sessionId,
        role: "assistant",
        content: replyText,
        recommended_articles: recommendedArticles,
        suggested_options: suggestedOptions,
        model: activeModel,
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        cost_usd: costUsd,
      });

      const prevRecs: string[] = Array.isArray(
        existingSession.recommended_articles
      )
        ? existingSession.recommended_articles
        : [];
      for (const ra of recommendedArticles) {
        if (!prevRecs.includes(ra.title)) prevRecs.push(ra.title);
      }
      for (const rp of recommendedProducts) {
        const label = `[Amazon] ${rp.title}`;
        if (!prevRecs.includes(label)) prevRecs.push(label);
      }

      await supabase
        .from("heladoencasa_chat_sessions")
        .update({
          last_user_message: userMessage.slice(0, 250),
          messages_count: (existingSession.messages_count || 1) + 2,
          recommended_articles: prevRecs.slice(0, 30),
          prompt_tokens: (existingSession.prompt_tokens || 0) + promptTokens,
          completion_tokens:
            (existingSession.completion_tokens || 0) + completionTokens,
          total_tokens: (existingSession.total_tokens || 0) + totalTokens,
          estimated_cost_usd: Number(
            (Number(existingSession.estimated_cost_usd || 0) + costUsd).toFixed(
              6
            )
          ),
          model_used: activeModel,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);
    }

    await supabase.from("token_usage").insert({
      source: "heladoencasa.com",
      content_type: "ai_chat",
      model: activeModel,
      prompt_tokens: promptTokens,
      completion_tokens: completionTokens,
      total_tokens: totalTokens,
      images_generated: 0,
      estimated_cost_usd: costUsd,
      slug: sessionId || visitorId,
    });

    return json({
      session_id: sessionId,
      reply: replyText,
      recommended_articles: recommendedArticles,
      recommended_products: recommendedProducts,
      suggested_options: suggestedOptions,
      model: activeModel,
    });
  } catch (err: any) {
    return json(
      {
        error: err.message || "Error interno",
        reply: `Puedes explorar nuestras más de 1,500 guías de máquinas de helado Ninja y Cuisinart en [HeladoEnCasa.com](${SITE}/).`,
        recommended_articles: [],
        recommended_products: [],
        suggested_options: ["Intentar de nuevo"],
      },
      500
    );
  }
});
