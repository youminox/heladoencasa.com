export const AMAZON_TAG_US = "heladoencasa-20";
export const AMAZON_TAG_ES = "heladoencasa-21";

export type AmazonStoreRegion = "US" | "ES";

export interface AmazonProductRecommendation {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  features: string[];
  categoryType:
    | "ninja"
    | "cuisinart-bowl"
    | "compressor"
    | "spares"
    | "recipe-gear";
  specs?: {
    priceAndServings: string;
    prepTime: string;
    freezerSpace: string;
    compatibleSpares: string;
  };
  queryUS: string;
  queryES: string;
  ctaLabel: string;
}

export function buildAmazonUrl(
  product: AmazonProductRecommendation,
  region: AmazonStoreRegion
): string {
  if (region === "ES") {
    const q = encodeURIComponent(product.queryES);
    return `https://www.amazon.es/s?k=${q}&tag=${AMAZON_TAG_ES}`;
  }
  const q = encodeURIComponent(product.queryUS);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG_US}`;
}

export function detectUserAmazonRegion(): AmazonStoreRegion {
  if (typeof window === "undefined") {
    return "US";
  }
  try {
    const saved = window.localStorage.getItem("hlc_amazon_region");
    if (saved === "US" || saved === "ES") return saved;

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();
    if (
      tz === "Europe/Madrid" ||
      tz === "Atlantic/Canary" ||
      tz === "Europe/Ceuta" ||
      tz.startsWith("Europe/") ||
      lang === "es-es"
    ) {
      return "ES";
    }
    return "US";
  } catch {
    return "US";
  }
}

export const CATALOG = {
  NINJA_CREAMI_NC301: {
    id: "ninja-creami-nc301",
    badge: "🏆 #1 Más Vendida · Pintas 16 oz",
    title:
      "Ninja CREAMi NC301 7-in-1 Ice Cream, Gelato & Sorbet Maker (2 Pintas)",
    subtitle:
      "Convierte bases congeladas en helado cremoso, sorbete o lite ice cream en solo 2–3 minutos con mínima ocupación en el freezer.",
    features: [
      "7 programas: Ice Cream, Lite Ice Cream, Sorbet, Gelato, Milkshake, Smoothie Bowl y Mix-in",
      "Rinde 2 a 3 porciones por pinta (16 oz / 473 ml) e incluye 2 vasos + tapas",
      "Ideal para helados proteicos, keto y sorbetes 100% fruta sin leche",
    ],
    categoryType: "ninja",
    specs: {
      priceAndServings: "precio variable en Amazon · 2–3 porciones/vaso (16 oz)",
      prepTime: "24 h congelación base + 2–3 min centrifugado",
      freezerSpace: "Mínimo: 4.4\" × 4.5\" por vaso individual",
      compatibleSpares: "Vasos 16 oz (4 muescas) NC299 / NC300 / NC301",
    },
    queryUS: "Ninja CREAMi NC301 Ice Cream Maker 7 One-Touch Programs",
    queryES: "Ninja CREAMi NC300EU heladera 3 tarrinas",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  NINJA_CREAMI_NC300: {
    id: "ninja-creami-nc300",
    badge: "🍨 Clásica 5 en 1 · Serie 16 oz",
    title:
      "Ninja CREAMi NC300 5-in-1 Ice Cream & Sorbet Maker (2 Pintas 16 oz)",
    subtitle:
      "Mismo motor y vasos que la NC301 con 5 programas esenciales (Ice Cream, Sorbet, Gelato, Milkshake, Lite) a menor precio en ofertas.",
    features: [
      "Compatible al 100% con los mismos vasos 16 oz de la serie NC299/NC301",
      "Diseño compacto en encimera (12\" × 6.5\" × 15.9\")",
      "Cuchilla Creamerizer de doble filo y tapa exterior lavable en lavavajillas",
    ],
    categoryType: "ninja",
    specs: {
      priceAndServings: "precio variable en Amazon · 2–3 porciones/vaso (16 oz)",
      prepTime: "24 h congelación base + 2–3 min procesado",
      freezerSpace: "Mínimo: 4.4\" × 4.5\" por pinta",
      compatibleSpares: "Vasos 16 oz NC299AMZ / NC300 / NC301",
    },
    queryUS: "Ninja CREAMi NC300 5-in-1 Ice Cream Maker",
    queryES: "Ninja CREAMi heladera 5 programas",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  NINJA_CREAMI_NC299AMZ: {
    id: "ninja-creami-nc299amz",
    badge: "🛒 Edición Especial Amazon EE. UU.",
    title:
      "Ninja CREAMi NC299AMZ Ice Cream Maker (7 Programas · 1 Pinta 16 oz)",
    subtitle:
      "Versión exclusiva de Amazon con idéntica potencia (800 W) y compatibilidad total de vasos de 16 oz que la NC301, más económica para empezar.",
    features: [
      "7 programas automáticos idénticos a la NC301 (incluye Smoothie Bowl y Mix-In)",
      "Incluye 1 vaso original 16 oz; puedes ampliarlo con packs de 4 vasos",
      "Compacta y fácil de guardar bajo alacenas de cocina estándar",
    ],
    categoryType: "ninja",
    specs: {
      priceAndServings: "precio variable en Amazon · 2–3 porciones/vaso (16 oz)",
      prepTime: "24 h congelación + 2 min texturizado",
      freezerSpace: "4.4\" × 4.5\" por vaso (cabe en mini-freezers)",
      compatibleSpares: "Vasos 16 oz serie NC299 / NC300 / NC301",
    },
    queryUS: "Ninja CREAMi NC299AMZ Ice Cream Maker",
    queryES: "Ninja CREAMi NC300EU heladera",
    ctaLabel: "Consultar oferta en Amazon",
  } satisfies AmazonProductRecommendation,

  NINJA_CREAMI_DELUXE_NC501: {
    id: "ninja-creami-deluxe-nc501",
    badge: "👨‍👩‍👧‍👦 Mejor Familiar XL · 11 en 1 · 24 oz",
    title:
      "Ninja CREAMi Deluxe NC501 11-in-1 XL Ice Cream & Frozen Treat Maker",
    subtitle:
      "50% más capacidad por vaso (24 oz / 709 ml), 4 nuevos modos helados/granizados y función Dual-Processing para procesar solo la mitad superior.",
    features: [
      "11 programas: suma Slushi, Creamiccino, Frozen Yogurt, Frozen Drink e Italian Ice",
      "Procesado dual Top/Bottom: prepara dos sabores o mitades distintas en un mismo vaso",
      "Rinde 4–5 porciones generosas por pinta XL (2 pintas incluidas)",
    ],
    categoryType: "ninja",
    specs: {
      priceAndServings: "precio variable en Amazon · 4–5 porciones/vaso (24 oz XL)",
      prepTime: "24 h congelación + 2–4 min procesado",
      freezerSpace: "Bajo: 4.7\" × 5.7\" por pinta XL (709 ml)",
      compatibleSpares: "Exclusivo Vasos XL 24 oz NC500 / NC501 / CN501CO",
    },
    queryUS: "Ninja CREAMi Deluxe NC501 11-in-1 XL Ice Cream Maker",
    queryES: "Ninja CREAMi Deluxe NC501EU heladera XL",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  NINJA_CREAMI_BREEZE_NC201: {
    id: "ninja-creami-breeze-nc201",
    badge: "💨 Diseño Todo en Uno sin Tapa Exterior",
    title:
      "Ninja CREAMi Breeze NC201 / NC101 7-in-1 Compact (Vasos Translúcidos)",
    subtitle:
      "Introduce el vaso directamente en la cubierta integrada sin desmontar tapa exterior; aún más compacta en altura para encimeras pequeñas.",
    features: [
      "Sistema simplificado: acopla la pinta directo al cabezal superior",
      "7 programas con botón Re-Spin y Mix-In",
      "Ojo compatibilidad: usa vasos exclusivos Breeze (no los de NC301)",
    ],
    categoryType: "ninja",
    specs: {
      priceAndServings: "precio variable en Amazon · 2–3 porciones (16 oz Breeze)",
      prepTime: "24 h congelación + 2 min procesado",
      freezerSpace: "4.5\" × 4.6\" por vaso Breeze",
      compatibleSpares: "Exclusivo Vasos Ninja Breeze NC100 / NC200 / NC201",
    },
    queryUS: "Ninja CREAMi Breeze 7-in-1 Ice Cream Maker NC201",
    queryES: "Ninja CREAMi compacta heladera",
    ctaLabel: "Ver disponibilidad en Amazon",
  } satisfies AmazonProductRecommendation,

  NINJA_SWIRL_NC701: {
    id: "ninja-swirl-nc701",
    badge: "🍦 Novedad Cono Soft-Serve + Bola Clásica",
    title:
      "Ninja Swirl by CREAMi NC701 Ice Cream & Soft Serve Maker (13 en 1)",
    subtitle:
      "Combina el centrifugado CREAMi en tarrina con un dispensador real de palanca lateral para servir conos estilo soft-serve cremoso en casa.",
    features: [
      "13 programas: 6 modos de cuchara clásica + 6 modos Soft Serve + Fruit Whip",
      "Incluye palanca dosificadora para servir en cono waffle o copa",
      "Usa vasos especiales con boquilla inferior compatibles solo con NC701",
    ],
    categoryType: "ninja",
    specs: {
      priceAndServings: "precio variable en Amazon · 3–4 porciones (16 oz Swirl)",
      prepTime: "24 h congelación + 3 min extrusión Soft Serve",
      freezerSpace: "Medio-Bajo: 4.5\" × 5.8\" (altura del vaso con tapa)",
      compatibleSpares: "Vasos exclusivos Ninja Swirl NC700 / NC701",
    },
    queryUS: "Ninja Swirl by CREAMi Soft Serve Ice Cream Maker NC701",
    queryES: "Ninja heladera soft serve conos",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  NINJA_SLUSHI_FS301: {
    id: "ninja-slushi-fs301",
    badge: "🥤 Granizados y Frappés Sin Pre-Congelar",
    title:
      "Ninja SLUSHi FS301 Professional Frozen Drink Maker (88 oz · Compresor)",
    subtitle:
      "Tecnología RapidChill de compresor que transforma jugos, café o refrescos en granizado y frappé en 15–45 minutos sin hielo ni esperar 24h.",
    features: [
      "Capacidad gigante de 88 oz (6–8 bebidas por tanda para reuniones)",
      "Mantiene las bebidas a temperatura granizada hasta 12 horas",
      "Cero espacio ocupado en el congelador",
    ],
    categoryType: "compressor",
    specs: {
      priceAndServings: "precio variable en Amazon · 6–8 vasos/reuniones (88 oz)",
      prepTime: "15–45 min al instante (sin pre-congelar)",
      freezerSpace: "0 cm³ en congelador (enfriado autónomo)",
      compatibleSpares: "Vasos térmicos y pajillas reutilizables de acero",
    },
    queryUS: "Ninja SLUSHi FS301 Professional Frozen Drink Maker",
    queryES: "Ninja SLUSHi FS301EU granizadora",
    ctaLabel: "Ver disponibilidad en Amazon",
  } satisfies AmazonProductRecommendation,

  CUISINART_ICE_21P1: {
    id: "cuisinart-ice-21p1",
    badge: "💵 Mejor Económica precio variable en Amazon · 6–8 Porciones",
    title:
      "Cuisinart ICE-21P1 1.5-Quart Frozen Yogurt, Ice Cream & Sorbet Maker",
    subtitle:
      "La máquina clásica número 1 de Amazon EE. UU.: mezcla y airea 1.4 litros de helado o sorbete cremoso en solo 20 minutos a precio imbatible.",
    features: [
      "Boca ancha superior para agregar trozos de chocolate, nueces o fruta en marcha",
      "Rinde 6 a 8 bolas en un solo ciclo de 20 minutos (ideal familias)",
      "Motor silencioso y fácil limpieza con solo 3 piezas desmontables",
    ],
    categoryType: "cuisinart-bowl",
    specs: {
      priceAndServings: "precio variable en Amazon · 6–8 porciones (1.5 Quart / 1.4 L)",
      prepTime: "16–24 h tazón en freezer + 20 min batido",
      freezerSpace: "Medio: tazón cilíndrico de 7.5\" diámetro × 6.2\" alto",
      compatibleSpares: "Tazón extra ICE-21RFB + paleta Cuisinart 1.5 Qt",
    },
    queryUS: "Cuisinart ICE-21P1 1.5 Quart Ice Cream Maker",
    queryES: "Cuisinart ICE-21 heladera 1.4 litros",
    ctaLabel: "Ver oferta en Amazon",
  } satisfies AmazonProductRecommendation,

  CUISINART_ICE_30BC: {
    id: "cuisinart-ice-30bc",
    badge: "🍨 Mejor Familiar 2.0 Qt Acero Inoxidable",
    title:
      "Cuisinart ICE-30BC Pure Indulgence 2-Quart Automatic Ice Cream Maker",
    subtitle:
      "Carcasa de acero cepillado y tazón de 2 litros que entrega hasta 10 bolas cremosas por tanda para familias o visitas en casa.",
    features: [
      "Capacidad de 2.0 Quart (~1.9 L): 33% más helado por ciclo que la ICE-21",
      "Motor de alto torque preparado para bases densas de crema o dulce de leche",
      "Incluye enrollador de cable integrado bajo la base",
    ],
    categoryType: "cuisinart-bowl",
    specs: {
      priceAndServings: "precio variable en Amazon · 8–10 porciones (2.0 Quart / 1.9 L)",
      prepTime: "24 h tazón en freezer + 25 min batido",
      freezerSpace: "Grande: tazón de 8.3\" diámetro × 7.0\" alto",
      compatibleSpares: "Tazón de repuesto Cuisinart ICE-30RFB (2.0 Qt)",
    },
    queryUS: "Cuisinart ICE-30BC Pure Indulgence 2-Quart Ice Cream Maker",
    queryES: "Cuisinart ICE-30BCE heladera acero inoxidable 2L",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  CUISINART_ICE_70P1: {
    id: "cuisinart-ice-70p1",
    badge: "🎛️ Digital LCD 3 Velocidades · 2.0 Qt",
    title:
      "Cuisinart ICE-70P1 Electronic Ice Cream Maker (LCD · 3 Modos Específicos)",
    subtitle:
      "Ajusta automáticamente la velocidad de giro y el tiempo exacto según selecciones Ice Cream, Gelato o Sorbet en su pantalla LCD.",
    features: [
      "Temporizador digital con apagado automático al terminar la textura",
      "Velocidad más lenta dedicada al Gelato para incorporar menos aire",
      "Tazón de 2.0 Quart compatible con el repuesto ICE-30RFB / ICE-70RFB",
    ],
    categoryType: "cuisinart-bowl",
    specs: {
      priceAndServings: "precio variable en Amazon · 8–10 porciones (2.0 Quart)",
      prepTime: "24 h tazón en freezer + 20–30 min programados",
      freezerSpace: "Grande: tazón de 8.3\" × 7.0\" en el congelador",
      compatibleSpares: "Tazón ICE-70RFB / ICE-30RFB + Contenedores Tovolo",
    },
    queryUS: "Cuisinart ICE-70P1 Electronic Ice Cream Maker 2-Quart",
    queryES: "Cuisinart ICE-70 heladera digital 2 litros",
    ctaLabel: "Ver disponibilidad en Amazon",
  } satisfies AmazonProductRecommendation,

  CUISINART_ICE_100_COMPRESSOR: {
    id: "cuisinart-ice-100-compressor",
    badge: "⚡ 0 Espacio en Freezer · Compresor Gelato & Helado",
    title:
      "Cuisinart ICE-100 Compressor Ice Cream & Gelato Maker (1.5 Qt · 2 Paletas)",
    subtitle:
      "Olvida congelar tazones 24 horas: su compresor integrado congela mientras bate, logrando tandas seguidas y gelato artesanal denso.",
    features: [
      "Incluye 2 paletas dedicadas: una de Gelato (bajo aire) y otra de Ice Cream",
      "Mantiene el frío hasta 10 minutos extra tras terminar el ciclo",
      "No ocupa absolutamente nada de espacio en tu congelador",
    ],
    categoryType: "compressor",
    specs: {
      priceAndServings: "precio variable en Amazon · 6–8 porciones continuas (1.5 Qt)",
      prepTime: "0 h pre-congelado + 40–50 min ciclo completo",
      freezerSpace: "0 cm³ en congelador (compresor integrado)",
      compatibleSpares: "Cubeta extra ICE-100BC + Contenedores Tovolo 1.5 Qt",
    },
    queryUS: "Cuisinart ICE-100 Compressor Ice Cream and Gelato Maker",
    queryES: "Cuisinart ICE100E heladera compresor gelato",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  CUISINART_ICE_45P1_SOFTSERVE: {
    id: "cuisinart-ice-45p1-softserve",
    badge: "🍦 Soft Serve Conos + 3 Dispensadores Toppings",
    title:
      "Cuisinart ICE-45P1 / ICE-48 Mix It In Soft Serve Ice Cream Maker (1.5 Qt)",
    subtitle:
      "Prepara helado suave estilo heladería de cono con 3 compartimentos integrados para chispas de chocolate, almendras y grageas al servir.",
    features: [
      "Palanca dispensadora directa para llenar conos waffle en 20 minutos",
      "Calentador lateral opcional en modelos ICE-48 para salsa de fudge/caramelo",
      "Portaconos plegable lateral y base de tazón 1.5 Qt",
    ],
    categoryType: "cuisinart-bowl",
    specs: {
      priceAndServings: "precio variable en Amazon · 6–8 conos soft serve (1.5 Qt)",
      prepTime: "24 h tazón en freezer + 20–25 min batido",
      freezerSpace: "Medio: tazón de 7.5\" × 6.2\" en congelador",
      compatibleSpares: "Tazón repuesto Cuisinart 1.5 Qt + Plancha Conos",
    },
    queryUS: "Cuisinart ICE-45P1 Mix It In Soft Serve Ice Cream Maker",
    queryES: "Cuisinart ICE-48 heladera soft serve",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  CUISINART_ICE_60W_COOLCREATIONS: {
    id: "cuisinart-ice-60w-coolcreations",
    badge: "🍧 3 Modos Pre-Programados · 2.0 Qt",
    title:
      "Cuisinart ICE-60W Cool Creations 2-Quart Ice Cream, Gelato & Sorbet Maker",
    subtitle:
      "Paleta renovada que raspa mejor las paredes y acelera la congelación para sorbetes de fruta y gelatos densos en 20 minutos.",
    features: [
      "Botones directos para Ice Cream, Gelato y Sorbet con apagado automático",
      "Boquilla dosificadora de ingredientes con taza medidora integrada",
      "Capacidad de 2 litros ideal para familias de 4 a 6 personas",
    ],
    categoryType: "cuisinart-bowl",
    specs: {
      priceAndServings: "precio variable en Amazon · 8–10 porciones (2.0 Qt)",
      prepTime: "24 h tazón en freezer + 20–25 min batido",
      freezerSpace: "Grande: 8.3\" × 7.0\" en el congelador",
      compatibleSpares: "Tazón extra Cuisinart 2.0 Qt + Contenedores Tovolo",
    },
    queryUS: "Cuisinart ICE-60W Cool Creations 2-Quart Ice Cream Maker",
    queryES: "Cuisinart ICE-60 heladera 2 litros",
    ctaLabel: "Ver oferta en Amazon",
  } satisfies AmazonProductRecommendation,

  CUISINART_FASTFREEZE_INDIVIDUAL: {
    id: "cuisinart-fastfreeze-individual",
    badge: "❄️ Ultra Rápida 18 Min · Porción Personal 16 oz",
    title:
      "Cuisinart Fast-Freeze Ice Cream Maker (16 oz / 1 Pinta Compacta)",
    subtitle:
      "Alternativa económica y liviana para 1 o 2 personas cuando buscas batido tradicional sin ocupar un tazón gigante en el congelador.",
    features: [
      "Tazón compacto de 16 oz que entra en cualquier cajón pequeño de freezer",
      "Tanda lista en menos de 20 minutos para disfrutar en el momento",
      "Tapa transparente con abertura para agregar toppings al final",
    ],
    categoryType: "cuisinart-bowl",
    specs: {
      priceAndServings: "precio variable en Amazon · 2–3 porciones (16 oz)",
      prepTime: "12–16 h congelación + 18 min batido",
      freezerSpace: "Pequeño: tazón compacto de 1 pinta",
      compatibleSpares: "Cuchara Zeroll + Bolsas/Botes 16 oz herméticos",
    },
    queryUS: "Cuisinart Fast Freeze Ice Cream Maker ICE-M10",
    queryES: "Cuisinart heladera compacta 0.5L",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  WHYNTER_ICM_200LS: {
    id: "whynter-icm-200ls-compressor",
    badge: "🏢 Mejor Compresor Alta Capacidad (2.1 Qt)",
    title:
      "Whynter ICM-200LS 2.1-Quart Stainless Steel Compressor Ice Cream Maker",
    subtitle:
      "Máquina profesional doméstica con compresor potente y cubeta extraíble de acero inoxidable para hacer varios lotes seguidos en casa.",
    features: [
      "Cero pre-congelación: compresor de 180W alcanza temperaturas bajo cero en minutos",
      "Gran capacidad de 2.1 Qt (8–12 bolas por lote) con temporizador LCD",
      "Función de enfriamiento extendido para evitar que se derrita tras terminar",
    ],
    categoryType: "compressor",
    specs: {
      priceAndServings: "precio variable en Amazon · 8–12 porciones continuas (2.1 Qt)",
      prepTime: "0 h espera en freezer + 45–55 min batido",
      freezerSpace: "0 cm³ en congelador (enfriado autónomo)",
      compatibleSpares: "Cubeta extra Whynter 2.1 Qt + Contenedor Tovolo",
    },
    queryUS: "Whynter ICM-200LS 2.1 Quart Ice Cream Maker Stainless Steel",
    queryES: "Whynter ICM-200LS heladera compresor 2L",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  WHYNTER_ICM_201SB: {
    id: "whynter-icm-201sb-vertical",
    badge: "📏 Compresor Vertical Estrecho para Encimera",
    title:
      "Whynter ICM-201SB 2.1-Quart Upright Compressor Ice Cream Maker",
    subtitle:
      "La ventaja del compresor sin pre-congelado en formato vertical estrecho que ahorra espacio lateral en encimeras de departamentos.",
    features: [
      "Ocupa un 35% menos de ancho de encimera que la ICM-200LS horizontal",
      "2.1 Qt con cubeta y paleta de acero inoxidable desmontables",
      "Perfecta para hacer tandas consecutivas de helado y sorbete el mismo día",
    ],
    categoryType: "compressor",
    specs: {
      priceAndServings: "precio variable en Amazon · 8–12 porciones (2.1 Qt)",
      prepTime: "0 h en freezer + 45–55 min ciclo activo",
      freezerSpace: "0 cm³ en congelador",
      compatibleSpares: "Contenedores SUMO 1 Qt + Termómetro digital",
    },
    queryUS: "Whynter ICM-201SB 2.1 Quart Upright Ice Cream Maker",
    queryES: "heladera compresor vertical acero inoxidable",
    ctaLabel: "Ver disponibilidad en Amazon",
  } satisfies AmazonProductRecommendation,

  BREVILLE_BCI600XL_SMART_SCOOP: {
    id: "breville-bci600xl-smart-scoop",
    badge: "👑 Gama Gourmet Inteligente · 12 Durezas",
    title:
      "Breville BCI600XL Smart Scoop Automatic Compressor Ice Cream Maker",
    subtitle:
      "Detecta automáticamente la densidad del helado y ofrece 12 niveles desde sorbete suave hasta gelato firme con pre-enfriado a -30 °C.",
    features: [
      "12 ajustes automáticos de dureza (Sorbet, Frozen Yogurt, Gelato, Ice Cream)",
      "Pre-cool lleva la cubeta a -30 °C antes de añadir tu base + Keep Cool 3 horas",
      "Avisa con sonido cuando añadir chispas de chocolate, fruta o nueces",
    ],
    categoryType: "compressor",
    specs: {
      priceAndServings: "precio variable en Amazon · 6 porciones gourmet (1.5 Qt)",
      prepTime: "0 h freezer (5 min pre-cool + 40 min batido)",
      freezerSpace: "0 cm³ en congelador (compresor autónomo)",
      compatibleSpares: "Cubeta Breville 1.5 Qt + Pasta Pistacho Siciliano",
    },
    queryUS: "Breville BCI600XL Smart Scoop Ice Cream Maker",
    queryES: "Sage Breville Smart Scoop heladera compresor",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  KITCHENAID_KSMICM_ATTACHMENT: {
    id: "kitchenaid-ksmicm-attachment",
    badge: "🍰 Accesorio Oficial Batidora KitchenAid (2.0 Qt)",
    title:
      "KitchenAid KSMICM 2-Quart Ice Cream Maker Attachment (Compatible Stand Mixers)",
    subtitle:
      "Si ya tienes una batidora KitchenAid de pie (4.5 Qt en adelante), convierte su motor en una heladera de 2 litros ocupando cero espacio extra en encimera.",
    features: [
      "Compatible con batidoras Tilt-Head 4.5/5 Qt y Bowl-Lift (excepto 3.5 Qt Mini)",
      "Tazón congelador de 2 Qt que bate bases espesas en 20–30 minutos",
      "Ahorra espacio en la cocina al usar el motor de tu batidora actual",
    ],
    categoryType: "cuisinart-bowl",
    specs: {
      priceAndServings: "precio variable en Amazon · 8–10 porciones (2.0 Qt)",
      prepTime: "16–24 h tazón en freezer + 25 min batido",
      freezerSpace: "Grande: tazón de 8.5\" diámetro × 7.0\" alto",
      compatibleSpares: "Adaptador impulsor KitchenAid + Contenedores Tovolo",
    },
    queryUS: "KitchenAid KSMICM Ice Cream Maker Attachment 2 Quart",
    queryES: "KitchenAid accesorio heladera 1.9L batidora",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  DASH_MY_PINT_COMPACT: {
    id: "dash-my-pint-compact",
    badge: "💎 Ultra Económica precio variable en Amazon · Porción Individual",
    title:
      "Dash My Pint Electric Ice Cream Maker (1.6 Tazas · Para Mini-Freezer)",
    subtitle:
      "Pequeñísima, divertida y muy barata: prepara una porción individual en menos de 30 minutos con taza congeladora del tamaño de un tazón de desayuno.",
    features: [
      "Ocupa poquísimo espacio en congeladores de apartamentos o mini-fridges",
      "Precio mínimo en Amazon EE. UU. para probar helado y sorbete casero",
      "Tazón de 1.6 tazas desmontable con cuchara incluida",
    ],
    categoryType: "cuisinart-bowl",
    specs: {
      priceAndServings: "precio variable en Amazon · 1–2 porciones (1.6 tazas / 380 ml)",
      prepTime: "12–24 h taza en freezer + 20–25 min batido",
      freezerSpace: "Mínimo: 5.5\" × 5.0\" en el congelador",
      compatibleSpares: "Cuchara Zeroll + Tazas medidoras de cocina",
    },
    queryUS: "Dash My Pint Electric Ice Cream Maker Machine",
    queryES: "Dash heladera individual compacta",
    ctaLabel: "Ver oferta en Amazon",
  } satisfies AmazonProductRecommendation,

  HAMILTON_BEACH_4QT: {
    id: "hamilton-beach-4qt",
    badge: "🎉 Máxima Capacidad 4.0 Qt para Fiestas y Reuniones",
    title:
      "Hamilton Beach 4-Quart Electric Ice Cream Maker (Cubo con Hielo y Sal)",
    subtitle:
      "Rinde hasta 16–20 bolas en una sola tanda usando hielo picado y sal gruesa en el cubo exterior: cero espacio ocupado en tu congelador.",
    features: [
      "Capacidad masiva de 4 Quarts (3.8 litros) para fiestas y barbacoas",
      "No pre-congela el tazón en el freezer: usa hielo de supermercado + sal",
      "Incluye tapa hermética para guardar el sobrante directo en el congelador",
    ],
    categoryType: "cuisinart-bowl",
    specs: {
      priceAndServings: "precio variable en Amazon · 16–20 porciones (4.0 Quart / 3.8 L)",
      prepTime: "0 h pre-congelado + 30–40 min con hielo y sal",
      freezerSpace: "0 cm³ previos en freezer (solo bolsa hielo externo)",
      compatibleSpares: "Sal gruesa para heladera + Contenedores SUMO",
    },
    queryUS: "Hamilton Beach 4-Quart Electric Ice Cream Maker 68330N",
    queryES: "heladera tradicional cubo 4 litros electrica",
    ctaLabel: "Ver precio en Amazon",
  } satisfies AmazonProductRecommendation,

  NINJA_PINTS_16OZ_4PACK: {
    id: "ninja-pints-16oz-4pack",
    badge: "🥣 Repuesto Compatible Serie NC299 / NC300 / NC301",
    title:
      "Pack 4 Vasos y Tapas 16 oz (473 ml) Compatibles Ninja CREAMi NC301 / NC300",
    subtitle:
      "Multiplica tus sabores en el congelador con 4 pintas BPA-Free de 4 muescas en la base y tapas de colores herméticas a prueba de escarcha.",
    features: [
      "Compatibilidad garantizada con NC299AMZ, NC300, NC301, CN301CO y CN305A",
      "NO compatibles con NC501 Deluxe (24 oz) ni con serie Breeze",
      "Aptos para congelador hasta -30 °C y rejilla superior de lavavajillas",
    ],
    categoryType: "spares",
    specs: {
      priceAndServings: "precio variable en Amazon (4 vasos) · 2–3 porciones c/u (16 oz)",
      prepTime: "Ten 4 sabores pre-congelados siempre listos",
      freezerSpace: "4.4\" diámetro × 4.5\" alto por vaso",
      compatibleSpares: "Serie Ninja NC299 / NC300 / NC301 / CN301CO",
    },
    queryUS: "Ninja CREAMi Pints and Lids 4 Pack 16 oz NC301 NC300 NC299",
    queryES: "vasos y tapas repuesto Ninja CREAMi NC300EU 4 pack",
    ctaLabel: "Ver pack en Amazon",
  } satisfies AmazonProductRecommendation,

  NINJA_PINTS_24OZ_DELUXE_4PACK: {
    id: "ninja-pints-24oz-deluxe-4pack",
    badge: "🥣 Repuesto XL Exclusivo NC500 / NC501 Deluxe",
    title:
      "Pack 4 Vasos XL 24 oz (709 ml) y Tapas para Ninja CREAMi Deluxe NC501",
    subtitle:
      "Recipientes altos XL con base reforzada y tapas herméticas de colores diseñados exclusivamente para los modelos Deluxe de 11 funciones.",
    features: [
      "Compatibilidad exclusiva con NC500, NC501, NC501C y CN501CO Deluxe",
      "50% más capacidad (24 oz / 709 ml) frente a los vasos estándar de 16 oz",
      "Incluye tapas selladas que previenen quemaduras por frío en el congelador",
    ],
    categoryType: "spares",
    specs: {
      priceAndServings: "precio variable en Amazon (4 vasos XL) · 4–5 porciones c/u (24 oz)",
      prepTime: "Prepara varios lotes XL a la vez para toda la semana",
      freezerSpace: "4.7\" diámetro × 5.7\" alto por vaso XL",
      compatibleSpares: "Exclusivo Ninja CREAMi Deluxe NC500 / NC501",
    },
    queryUS: "Ninja CREAMi Deluxe XL 24 oz Pints and Lids 4 Pack NC501",
    queryES: "vasos repuesto Ninja CREAMi Deluxe NC501EU 709ml",
    ctaLabel: "Ver pack XL en Amazon",
  } satisfies AmazonProductRecommendation,

  NINJA_BREEZE_PINTS_4PACK: {
    id: "ninja-breeze-pints-4pack",
    badge: "🥣 Repuesto Exclusivo Ninja Breeze NC100 / NC200",
    title:
      "Pack 4 Vasos y Tapas 16 oz Compatibles con Ninja CREAMi Breeze NC101 / NC201",
    subtitle:
      "Recipientes diseñados específicamente para la serie Breeze (la máquina sin tapa exterior): encajan directo en el cabezal de sujeción.",
    features: [
      "Exclusivos para NC100, NC101, NC200, NC201 y NC205 Breeze",
      "Incluye 4 tapas de colores identificables y marcas de llenado MAX",
      "Plástico libre de BPA resistente a bajas temperaturas y golpes térmicos",
    ],
    categoryType: "spares",
    specs: {
      priceAndServings: "precio variable en Amazon (4 vasos) · 2–3 porciones c/u",
      prepTime: "Rotación continua de sabores en freezer",
      freezerSpace: "4.5\" × 4.6\" por vaso Breeze",
      compatibleSpares: "Exclusivo Ninja Breeze NC100 / NC101 / NC201",
    },
    queryUS: "Ninja CREAMi Breeze Pints and Lids 4 Pack NC101 NC201",
    queryES: "vasos repuesto Ninja CREAMi Breeze 4 pack",
    ctaLabel: "Ver repuestos en Amazon",
  } satisfies AmazonProductRecommendation,

  NINJA_SWIRL_PINTS_4PACK: {
    id: "ninja-swirl-pints-4pack",
    badge: "🍦 Repuesto Exclusivo Ninja Swirl NC701 Soft Serve",
    title:
      "Pack Vasos con Boquilla Dosificadora Compatibles Ninja Swirl NC701 (16 oz)",
    subtitle:
      "Vasos oficiales y compatibles con tapa dispensadora inferior para servir conos suaves directo desde tu Ninja Swirl NC701.",
    features: [
      "Diseño con válvula inferior para el sistema de extrusión Soft Serve",
      "Compatibilidad exclusiva con la serie Ninja Swirl NC700 / NC701",
      "Tapas herméticas superiores para congelación vertical segura",
    ],
    categoryType: "spares",
    specs: {
      priceAndServings: "precio variable en Amazon · 3–4 conos/porciones c/u",
      prepTime: "Listos para dispensar tras 24h en freezer",
      freezerSpace: "4.5\" × 5.8\" (requiere estante vertical libre)",
      compatibleSpares: "Exclusivo Ninja Swirl NC700 / NC701",
    },
    queryUS: "Ninja Swirl by CREAMi Swirl Pints and Lids Replacement NC701",
    queryES: "vasos repuesto Ninja Swirl NC701",
    ctaLabel: "Ver vasos Swirl en Amazon",
  } satisfies AmazonProductRecommendation,

  NINJA_CREAMERIZER_BLADE: {
    id: "ninja-creamerizer-blade",
    badge: "⚙️ Repuesto Cuchilla & Tapa Exterior Ninja",
    title:
      "Cuchilla Creamerizer y Tapa Exterior de Repuesto Compatible Ninja NC301 / NC501",
    subtitle:
      "Reemplaza la cuchilla desgastada o el ensamblaje de tapa exterior si notas vibración, holgura en el eje o pérdida de estanqueidad.",
    features: [
      "Acero inoxidable templado de doble filo (verifica si tu modelo es NC301 o NC501)",
      "Soluciona errores por junta rota, caída de cuchilla o ruidos anormales",
      "Instalación magnética sin herramientas en 5 segundos",
    ],
    categoryType: "spares",
    specs: {
      priceAndServings: "precio variable en Amazon · Repuesto de seguridad mecánico",
      prepTime: "Reemplazo instantáneo sin desarmar motor",
      freezerSpace: "0 cm³ (pieza de cabezal exterior)",
      compatibleSpares: "Seleccionar variante exacta: NC301 (16 oz) o NC501 (24 oz)",
    },
    queryUS: "Replacement Creamerizer Paddle Blade Outer Bowl Lid Ninja CREAMi",
    queryES: "cuchilla repuesto Ninja CREAMi tapa exterior",
    ctaLabel: "Ver repuesto en Amazon",
  } satisfies AmazonProductRecommendation,

  NEOPRENE_PINT_SLEEVES: {
    id: "neoprene-pint-sleeves",
    badge: "🧤 Fundas Térmicas Anti-Humedad para Pintas 16 oz / 24 oz",
    title:
      "Pack 4 Fundas de Neopreno Térmicas para Vasos Ninja CREAMi (Evitan Derrames y Frío)",
    subtitle:
      "Aíslan el vaso recién salido del congelador para sujetarlo cómodo con las manos y reducir el derretimiento en los bordes.",
    features: [
      "Neopreno elástico de 4 mm antideslizante y lavable",
      "Disponibles en talla 16 oz (NC301) y 24 oz XL (NC501 Deluxe)",
      "Evita charcos de condensación en la mesa mientras comes directo del vaso",
    ],
    categoryType: "spares",
    specs: {
      priceAndServings: "precio variable en Amazon (pack de 4 fundas de colores)",
      prepTime: "Se colocan en 2 segundos tras procesar el vaso",
      freezerSpace: "No ocupan congelador (se guardan fuera)",
      compatibleSpares: "Ajuste para vasos Ninja 16 oz y 24 oz",
    },
    queryUS: "Neoprene Pint Sleeves for Ninja CREAMi 16 oz 24 oz 4 Pack",
    queryES: "fundas neopreno vasos Ninja CREAMi",
    ctaLabel: "Ver colores en Amazon",
  } satisfies AmazonProductRecommendation,

  CUISINART_ICE_21RFB_BOWL: {
    id: "cuisinart-ice-21rfb-bowl",
    badge: "❄️ Tazón Extra Compatible Cuisinart 1.5 Qt",
    title:
      "Tazón Congelador de Repuesto Oficial Cuisinart ICE-21RFB (1.5 Quart)",
    subtitle:
      "Prepara dos sabores distintos el mismo día sin esperar 24 horas entre lotes: congela ambos tazones al mismo tiempo.",
    features: [
      "Compatible exactamente con Cuisinart ICE-21, ICE-21P1, ICE-21R e ICE-20",
      "Doble pared rellena de líquido refrigerante hermético de grado alimentario",
      "Imprescindible si preparas helado + sorbete el mismo fin de semana",
    ],
    categoryType: "spares",
    specs: {
      priceAndServings: "precio variable en Amazon · 1.5 Quart extra (6–8 porciones más)",
      prepTime: "Ten 2 lotes listos seguidos en 40 min",
      freezerSpace: "7.5\" diámetro × 6.2\" alto en el congelador",
      compatibleSpares: "Serie Cuisinart 1.5 Qt (ICE-21 / ICE-21P1)",
    },
    queryUS: "Cuisinart ICE-21RFB 1.5 Quart Replacement Freezer Bowl",
    queryES: "Cuisinart bol congelador repuesto 1.5 litros",
    ctaLabel: "Ver tazón en Amazon",
  } satisfies AmazonProductRecommendation,

  CUISINART_ICE_30RFB_BOWL: {
    id: "cuisinart-ice-30rfb-bowl",
    badge: "❄️ Tazón Extra Compatible Cuisinart 2.0 Qt",
    title:
      "Tazón Congelador de Repuesto Oficial Cuisinart ICE-30RFB (2.0 Quart)",
    subtitle:
      "Recambio original de aluminio anodizado cepillado compatible con las series Pure Indulgence ICE-30BC, Cool Creations ICE-60W e ICE-70.",
    features: [
      "Compatible con ICE-30BC, ICE-30RF, ICE-60W e ICE-70P1 (no sirve en ICE-21)",
      "Doble pared sellada de congelación rápida y uniforme",
      "Permite reemplazar un tazón dañado en lavavajillas o duplicar la producción",
    ],
    categoryType: "spares",
    specs: {
      priceAndServings: "precio variable en Amazon · 2.0 Quart extra (8–10 porciones)",
      prepTime: "Duplica tu capacidad en fiestas y reuniones",
      freezerSpace: "8.3\" diámetro × 7.0\" alto en congelador",
      compatibleSpares: "Serie Cuisinart 2.0 Qt (ICE-30BC / ICE-60W / ICE-70)",
    },
    queryUS: "Cuisinart ICE-30RFB 2-Quart Replacement Freezer Bowl",
    queryES: "Cuisinart bol repuesto 2 litros ICE-30",
    ctaLabel: "Ver tazón 2 Qt en Amazon",
  } satisfies AmazonProductRecommendation,

  TOVOLO_GLIDE_A_SCOOP: {
    id: "tovolo-glide-a-scoop",
    badge: "🧊 Contenedor Térmico Antiescarcha #1 en Amazon",
    title:
      "Tovolo Glide-A-Scoop Insulated Ice Cream Tub (1.5 Quart · Tapa Hermética)",
    subtitle:
      "Recipiente alargado de doble pared diseñado para guardar helado recién batido en Cuisinart o compresor manteniendo la textura suave.",
    features: [
      "Doble pared aislante y base antideslizante que facilita sacar bolas perfectas",
      "Tapa de silicona hermética que impide cristales y olores del congelador",
      "Su forma estrecha y larga cabe en cualquier estante lateral del freezer",
    ],
    categoryType: "spares",
    specs: {
      priceAndServings: "precio variable en Amazon · Capacidad exacta 1.5 Qt (1.4 L)",
      prepTime: "Transfiere el helado batido y conserva semanas",
      freezerSpace: "Perfil estrecho: 4.5\" × 11\" × 3.8\" (ahorra altura)",
      compatibleSpares: "Ideal tras usar Cuisinart ICE-21 / ICE-100 / Whynter",
    },
    queryUS: "Tovolo Glide-A-Scoop 1.5 Quart Insulated Ice Cream Tub",
    queryES: "Tovolo recipiente termico para guardar helado casero",
    ctaLabel: "Ver contenedor en Amazon",
  } satisfies AmazonProductRecommendation,

  SUMO_ICE_CREAM_CONTAINERS: {
    id: "sumo-ice-cream-containers",
    badge: "📦 Pack 2 Botes Térmicos 1.0 Qt / 1.5 Qt",
    title:
      "SUMO Homemade Ice Cream Storage Containers (Pack 2 · Doble Pared Sin BPA)",
    subtitle:
      "Perfectos para dividir un lote de 2 Qt de Cuisinart ICE-30BC en dos sabores o regalar pintas caseras sin quemaduras por frío.",
    features: [
      "Tapa con doble labio sellador para mantener la cremosidad en el freezer",
      "Aptos para lavavajillas y apilables dentro del congelador",
      "Disponibles en 1 Quart (0.95 L) y 1.5 Quart (1.4 L)",
    ],
    categoryType: "spares",
    specs: {
      priceAndServings: "precio variable en Amazon (2 botes térmicos)",
      prepTime: "Almacenaje inmediato tras el batido",
      freezerSpace: "Diseño apilable estrecho para puerta o cajón",
      compatibleSpares: "Compatible con lotes Cuisinart 2 Qt / Whynter / Breville",
    },
    queryUS: "SUMO Homemade Ice Cream Storage Containers 1.5 Quart 2 Pack",
    queryES: "recipientes guardar helado casero doble pared",
    ctaLabel: "Ver pack en Amazon",
  } satisfies AmazonProductRecommendation,

  ZEROLL_THERMAL_SCOOP: {
    id: "zeroll-thermal-scoop",
    badge: "🥄 Cuchara Profesional Térmica de Aluminio",
    title:
      "Zeroll Original Ice Cream Scoop (#1020 · Líquido Conductivo en Mango)",
    subtitle:
      "Utiliza el calor natural de tu mano para deslizar y formar bolas redondas de helado duro sin doblar la muñeca ni sumergirla en agua caliente.",
    features: [
      "Aleación de aluminio aeroespacial con fluido termoconductor sellado",
      "Evita compresión excesiva del helado artesanal y rinde hasta 20% más bolas",
      "La cuchara clásica usada en heladerías desde 1935",
    ],
    categoryType: "recipe-gear",
    specs: {
      priceAndServings: "precio variable en Amazon · Porciona bolas perfectas de 2 oz",
      prepTime: "Sirve al instante directo del congelador",
      freezerSpace: "0 cm³ (utensilio de cajón)",
      compatibleSpares: "Combinar con contenedores Tovolo o vasos Ninja",
    },
    queryUS: "Zeroll Original Ice Cream Scoop 1020 Aluminum",
    queryES: "Zeroll cuchara helado aluminio termica original",
    ctaLabel: "Ver cuchara en Amazon",
  } satisfies AmazonProductRecommendation,

  ALLULOSE_PURE_SWEETENER: {
    id: "allulose-pure-sweetener",
    badge: "🍯 Secreto Keto & Fit · Helado Sin Azúcar Suave",
    title:
      "Alulosa Pura Granulada Sin Azúcar (Allulose · 0 Calorías Netas)",
    subtitle:
      "A diferencia del eritritol o stevia sola, la alulosa reduce el punto de congelación igual que el azúcar real: tu helado keto queda cremoso y no piedra.",
    features: [
      "Evita helados duros como roca en Ninja CREAMi y Cuisinart",
      "Sin regusto amargo ni enfriamiento bucal mentolado",
      "Apta para recetas keto, diabéticas, proteicas y sorbetes ligeros",
    ],
    categoryType: "recipe-gear",
    specs: {
      priceAndServings: "precio variable en Amazon (bolsa 1–2 lb para +25 pintas)",
      prepTime: "Se disuelve al instante en bases frías o tibias",
      freezerSpace: "0 cm³ (despensa seca)",
      compatibleSpares: "Complemento ideal de goma guar y vasos 16 oz",
    },
    queryUS: "Pure Allulose Granulated Sweetener Zero Sugar Keto Baking",
    queryES: "alulosa pura polvo edulcorante helados keto",
    ctaLabel: "Ver alulosa en Amazon",
  } satisfies AmazonProductRecommendation,

  GUAR_GUM_STABILIZER: {
    id: "guar-gum-stabilizer",
    badge: "🧪 Textura de Heladería · Elimina Cristales",
    title:
      "Goma Guar Alimentaria Pura (Guar Gum) — Estabilizante Natural para Helados",
    subtitle:
      "Solo 1/4 de cucharadita por pinta Ninja o 1/2 en tazón Cuisinart atrapa el agua libre y transforma bases ligeras en helado sedoso.",
    features: [
      "Imprescindible en helados con leche de almendras, proteicos y sorbetes",
      "Sin gluten, vegana y soluble en frío sin necesidad de calentar",
      "Un envase de 8–16 oz rinde para más de 200 tandas caseras",
    ],
    categoryType: "recipe-gear",
    specs: {
      priceAndServings: "precio variable en Amazon · Rinde +200 pintas o 100 litros",
      prepTime: "Batir 15 segundos con la base antes de congelar",
      freezerSpace: "0 cm³ (despensa seca)",
      compatibleSpares: "Universal para Ninja CREAMi, Cuisinart y compresor",
    },
    queryUS: "Food Grade Guar Gum Powder Thickener Ice Cream",
    queryES: "goma guar alimentaria polvo helados",
    ctaLabel: "Ver estabilizante en Amazon",
  } satisfies AmazonProductRecommendation,

  PISTACHIO_PASTE_ARTISAN: {
    id: "pistachio-paste-artisan",
    badge: "🇮🇹 Ingrediente Gourmet Gelato Italiano Real",
    title:
      "Pasta Pura de Pistacho Tostado (100% Natural Sin Colorantes · Gelato)",
    subtitle:
      "El ingrediente secreto para conseguir auténtico gelato de pistacho con color verde oliva natural y aroma intenso sin esencias artificiales.",
    features: [
      "100% pistacho tostado molido fino (sin azúcares ocultos ni aceites de palma)",
      "Dosis recomendada: 45–60 g por pinta Ninja o 110 g en tazón Cuisinart",
      "También sirve para cremas, tiramisú y cobertura sobre el cono",
    ],
    categoryType: "recipe-gear",
    specs: {
      priceAndServings: "precio variable en Amazon · Rinde 6–10 tandas de gelato artesanal",
      prepTime: "Mezclar directamente en base tibia de leche y nata",
      freezerSpace: "0 cm³ (despensa fresca)",
      compatibleSpares: "Ideal con Cuisinart ICE-100 / Ninja CREAMi Gelato",
    },
    queryUS: "100% Pure Sicilian Pistachio Paste Cream for Gelato",
    queryES: "pasta pura de pistacho 100% para helado gelato",
    ctaLabel: "Ver pasta en Amazon",
  } satisfies AmazonProductRecommendation,

  WAFFLE_CONE_MAKER: {
    id: "waffle-cone-maker",
    badge: "🧇 Plancha Eléctrica de Conos y Barquillos Caseros",
    title:
      "Plancha Antiadherente para Conos de Helado y Tulipas Caseros (Chef'sChoice / CucinaPro)",
    subtitle:
      "Hornea barquillos crujientes de vainilla o canela en 60–90 segundos e incluye cono moldeador para enrollarlos calientes en casa.",
    features: [
      "Control de tostado variable y placas antiadherentes fáciles de limpiar",
      "Incluye molde cónico para formar barquillos clásicos en segundos",
      "Eleva cualquier tarde de helados y reuniones familiares en casa",
    ],
    categoryType: "recipe-gear",
    specs: {
      priceAndServings: "precio variable en Amazon · Hace conos frescos en 90 segundos",
      prepTime: "1.5 min por barquillo crujiente",
      freezerSpace: "0 cm³ (almacenaje vertical en alacena)",
      compatibleSpares: "Combinar con Cuisinart ICE-21 / Ninja Swirl NC701",
    },
    queryUS: "Electric Waffle Cone Maker Machine with Shaper",
    queryES: "maquina para hacer cucuruchos barquillos helado",
    ctaLabel: "Ver plancha en Amazon",
  } satisfies AmazonProductRecommendation,

  DIGITAL_SCALE_THERMOMETER: {
    id: "digital-scale-thermometer",
    badge: "⚖️ Precisión 0.1 g + Termómetro de Freezer",
    title:
      "Báscula Digital de Precisión 0.1 g + Termómetro de Congelador Digital",
    subtitle:
      "Dos herramientas baratas pero esenciales: pesa exacto estabilizantes como goma guar (0.5 g) y verifica que tu congelador esté a -18 °C (0 °F).",
    features: [
      "Verifica si tu congelador enfría lo suficiente para que el tazón Cuisinart y las pintas Ninja funcionen",
      "Precisión de 0.1 g ideal para dosis pequeñas de goma guar, xantana o sal",
      "Pantalla retroiluminada y calibración tara con 1 botón",
    ],
    categoryType: "recipe-gear",
    specs: {
      priceAndServings: "precio variable en Amazon · Precisión 0.1 g + lectura -25 °C",
      prepTime: "Medición instantánea antes de congelar o batir",
      freezerSpace: "Termómetro compacto con gancho para estante",
      compatibleSpares: "Universal para todas las máquinas y recetas",
    },
    queryUS: "Digital Kitchen Scale 0.1g Precision and Freezer Thermometer",
    queryES: "bascula precision 0.1g y termometro congelador",
    ctaLabel: "Ver pack precisión en Amazon",
  } satisfies AmazonProductRecommendation,
} as const;

export function getContextualAmazonProducts(
  slug: string,
  pillar: string,
  title: string
): {
  sectionTitle: string;
  sectionSubtitle: string;
  products: [
    AmazonProductRecommendation,
    AmazonProductRecommendation,
    AmazonProductRecommendation,
  ];
  vsCompetitor?: AmazonProductRecommendation;
} {
  const s = `${slug} ${pillar} ${title}`.toLowerCase();

  if (s.includes("nc501") || s.includes("deluxe") || s.includes("24 oz") || s.includes("24-oz")) {
    return {
      sectionTitle: "Ninja CREAMi Deluxe NC501 y Vasos XL 24 oz en Amazon",
      sectionSubtitle:
        "Compara precio, 4–5 porciones por vaso, tiempo de preparación, espacio en congelador y repuestos XL compatibles.",
      products: [
        CATALOG.NINJA_CREAMI_DELUXE_NC501,
        CATALOG.NINJA_PINTS_24OZ_DELUXE_4PACK,
        CATALOG.NEOPRENE_PINT_SLEEVES,
      ],
      vsCompetitor: CATALOG.NINJA_CREAMI_NC301,
    };
  }

  if (s.includes("swirl") || s.includes("nc701") || s.includes("soft-serve") || s.includes("soft serve")) {
    return {
      sectionTitle: "Máquinas Soft Serve (Ninja Swirl y Cuisinart) en Amazon",
      sectionSubtitle:
        "Prepara conos cremosos en casa: compara capacidad, vasos con boquilla compatibles y planchas de barquillos.",
      products: [
        CATALOG.NINJA_SWIRL_NC701,
        CATALOG.CUISINART_ICE_45P1_SOFTSERVE,
        CATALOG.WAFFLE_CONE_MAKER,
      ],
      vsCompetitor: CATALOG.CUISINART_ICE_45P1_SOFTSERVE,
    };
  }

  if (s.includes("breeze") || s.includes("nc201") || s.includes("nc101")) {
    return {
      sectionTitle: "Ninja CREAMi Breeze y Vasos Compatibles en Amazon",
      sectionSubtitle:
        "Verifica antes de comprar: la serie Breeze utiliza pintas exclusivas diferentes de la NC301.",
      products: [
        CATALOG.NINJA_CREAMI_BREEZE_NC201,
        CATALOG.NINJA_BREEZE_PINTS_4PACK,
        CATALOG.NINJA_CREAMI_NC301,
      ],
      vsCompetitor: CATALOG.NINJA_CREAMI_NC301,
    };
  }

  if (s.includes("slushi") || s.includes("fs301") || s.includes("graniz")) {
    return {
      sectionTitle: "Máquinas de Granizados y Bebidas Heladas sin Pre-Congelar",
      sectionSubtitle:
        "Cero espacio en el congelador: tecnología de compresor rápido para granizados y reuniones.",
      products: [
        CATALOG.NINJA_SLUSHI_FS301,
        CATALOG.NINJA_CREAMI_DELUXE_NC501,
        CATALOG.WHYNTER_ICM_200LS,
      ],
      vsCompetitor: CATALOG.NINJA_CREAMI_DELUXE_NC501,
    };
  }

  if (
    s.includes("compresor") ||
    s.includes("ice-100") ||
    s.includes("whynter") ||
    s.includes("breville") ||
    s.includes("0-espacio") ||
    s.includes("sin-precongelar")
  ) {
    return {
      sectionTitle: "Máquinas de Helado con Compresor (0 Espacio en Freezer)",
      sectionSubtitle:
        "Prepara helado o gelato auténtico al instante sin esperar 24 horas ni ocupar espacio en tu congelador.",
      products: [
        CATALOG.CUISINART_ICE_100_COMPRESSOR,
        CATALOG.WHYNTER_ICM_200LS,
        CATALOG.BREVILLE_BCI600XL_SMART_SCOOP,
      ],
      vsCompetitor: CATALOG.WHYNTER_ICM_200LS,
    };
  }

  if (s.includes("kitchenaid") || s.includes("ksmicm")) {
    return {
      sectionTitle: "Accesorio Heladera KitchenAid y Alternativas de Tazón",
      sectionSubtitle:
        "Compara porciones, compatibilidad de batidora, tazones de repuesto y almacenamiento térmico.",
      products: [
        CATALOG.KITCHENAID_KSMICM_ATTACHMENT,
        CATALOG.CUISINART_ICE_30BC,
        CATALOG.TOVOLO_GLIDE_A_SCOOP,
      ],
      vsCompetitor: CATALOG.CUISINART_ICE_30BC,
    };
  }

  if (s.includes("ice-30") || s.includes("ice-70") || s.includes("ice-60") || s.includes("2-quart") || s.includes("2-litros")) {
    return {
      sectionTitle: "Cuisinart 2.0 Quart y Tazones Compatibles en Amazon EE. UU.",
      sectionSubtitle:
        "8 a 10 porciones por tanda en acero cepillado o digital LCD, junto a tazones extra ICE-30RFB.",
      products: [
        CATALOG.CUISINART_ICE_30BC,
        CATALOG.CUISINART_ICE_30RFB_BOWL,
        CATALOG.SUMO_ICE_CREAM_CONTAINERS,
      ],
      vsCompetitor: CATALOG.CUISINART_ICE_70P1,
    };
  }

  if (s.includes("ice-21") || s.includes("ice21") || s.includes("cuisinart") || s.includes("economica") || s.includes("menos-de-80")) {
    return {
      sectionTitle: "Cuisinart ICE-21 y Repuestos Compatibles en Amazon EE. UU.",
      sectionSubtitle:
        "La favorita por debajo de precio variable en Amazon: rinde 6–8 bolas en 20 minutos y permite duplicar sabores con un tazón extra.",
      products: [
        CATALOG.CUISINART_ICE_21P1,
        CATALOG.CUISINART_ICE_21RFB_BOWL,
        CATALOG.TOVOLO_GLIDE_A_SCOOP,
      ],
      vsCompetitor: CATALOG.NINJA_CREAMI_NC301,
    };
  }

  if (
    s.includes("vasos") ||
    s.includes("tapas") ||
    s.includes("pintas") ||
    s.includes("repuesto") ||
    s.includes("compatib") ||
    s.includes("muescas") ||
    s.includes("cuchilla")
  ) {
    return {
      sectionTitle: "Vasos, Tapas y Tazones Compatibles Verificados en Amazon",
      sectionSubtitle:
        "Evita devoluciones: compara pintas 16 oz (NC301), pintas XL 24 oz (NC501 Deluxe) y tazones extra Cuisinart.",
      products: [
        CATALOG.NINJA_PINTS_16OZ_4PACK,
        CATALOG.NINJA_PINTS_24OZ_DELUXE_4PACK,
        CATALOG.CUISINART_ICE_21RFB_BOWL,
      ],
      vsCompetitor: CATALOG.NINJA_PINTS_24OZ_DELUXE_4PACK,
    };
  }

  if (
    s.includes("keto") ||
    s.includes("proteic") ||
    s.includes("sin-azucar") ||
    s.includes("saludable") ||
    s.includes("alulosa") ||
    s.includes("vegano")
  ) {
    return {
      sectionTitle: "Pack Ideal para Helados Proteicos, Keto y Bajos en Azúcar",
      sectionSubtitle:
        "Consigue textura suave sin cristales de hielo combinando Ninja CREAMi con alulosa pura y goma guar.",
      products: [
        CATALOG.NINJA_CREAMI_NC301,
        CATALOG.ALLULOSE_PURE_SWEETENER,
        CATALOG.GUAR_GUM_STABILIZER,
      ],
      vsCompetitor: CATALOG.NINJA_CREAMI_DELUXE_NC501,
    };
  }

  if (
    s.includes("sorbet") ||
    s.includes("mango") ||
    s.includes("fruta") ||
    s.includes("receta") ||
    s.includes("gelato") ||
    s.includes("pistacho") ||
    s.includes("chocolate")
  ) {
    return {
      sectionTitle: "Equipos e Insumos Recomendados para Esta Receta en Casa",
      sectionSubtitle:
        "Prepara la base exacta en pintas de 16 oz o tazón de 1.5 Qt y conserva el sobrante sin cristales de hielo.",
      products: [
        CATALOG.NINJA_CREAMI_NC301,
        CATALOG.CUISINART_ICE_21P1,
        s.includes("pistacho") || s.includes("gelato")
          ? CATALOG.PISTACHIO_PASTE_ARTISAN
          : CATALOG.GUAR_GUM_STABILIZER,
      ],
      vsCompetitor: CATALOG.CUISINART_ICE_100_COMPRESSOR,
    };
  }

  if (s.includes("dash") || s.includes("mini") || s.includes("pequeno") || s.includes("individual")) {
    return {
      sectionTitle: "Máquinas Compactas para Congeladores Pequeños en Amazon",
      sectionSubtitle:
        "Soluciones de 1 pinta o 1.6 tazas que caben en cualquier cajón o mini-fridge sin saturar tu congelador.",
      products: [
        CATALOG.NINJA_CREAMI_NC299AMZ,
        CATALOG.DASH_MY_PINT_COMPACT,
        CATALOG.CUISINART_FASTFREEZE_INDIVIDUAL,
      ],
      vsCompetitor: CATALOG.DASH_MY_PINT_COMPACT,
    };
  }

  if (s.includes("congelador") || s.includes("conservar") || s.includes("escarcha") || s.includes("falla") || s.includes("limpieza")) {
    return {
      sectionTitle: "Repuestos, Conservación Térmica y Precisión en Congelador",
      sectionSubtitle:
        "Protege tus recetas de la escarcha, verifica la temperatura a -18 °C y ten repuestos compatibles a mano.",
      products: [
        CATALOG.TOVOLO_GLIDE_A_SCOOP,
        CATALOG.NINJA_CREAMERIZER_BLADE,
        CATALOG.DIGITAL_SCALE_THERMOMETER,
      ],
      vsCompetitor: CATALOG.SUMO_ICE_CREAM_CONTAINERS,
    };
  }

  return {
    sectionTitle: "Top 3 Máquinas de Helado Más Recomendadas en Amazon EE. UU.",
    sectionSubtitle:
      "Comparamos las opciones líderes de Ninja y Cuisinart según precio, porciones reales, tiempo y espacio en el congelador.",
    products: [
      CATALOG.NINJA_CREAMI_NC301,
      CATALOG.CUISINART_ICE_21P1,
      CATALOG.NINJA_CREAMI_DELUXE_NC501,
    ],
    vsCompetitor: CATALOG.CUISINART_ICE_21P1,
  };
}
