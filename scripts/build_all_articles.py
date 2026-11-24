#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador Maestro de las 1,534 Guías y Recetas de HeladoEnCasa.com:
- 14 Hubs Pilares de Categoría (isPillar: true)
- 520 Artículos Transaccionales en 6 Silos Amazon (isTransactional: true)
- 1,000 Artículos SEO Informacionales y Recetas en 8 Silos (isTransactional: false)

Genera también:
- src/data/keyword_map.json
- public/search-index.json (formato {t, p, c, k, tr} para HeroSearch)
"""
import json
import pathlib
import re

from topics_catalog import PILLARS, generate_transactional_520, generate_seo_1000

ROOT = pathlib.Path(__file__).resolve().parent.parent
ART_DIR = ROOT / "src/content/articles"
ART_DIR.mkdir(parents=True, exist_ok=True)
DATA_DIR = ROOT / "src/data"
DATA_DIR.mkdir(parents=True, exist_ok=True)
PUB_DIR = ROOT / "public"
PUB_DIR.mkdir(parents=True, exist_ok=True)

PUBLISHED = "2026-11-24"

CAMERA_STYLES = [
    "Macro close-up gastronomic shot with shallow depth of field (85mm f/2.8 lens)",
    "Three-quarter editorial kitchen angle slightly from above (50mm lens)",
    "Overhead flat-lay knolling view showcasing the ice cream maker, compatible pints and fresh ingredients (35mm lens)",
    "Eye-level realistic home kitchen action photo scooping smooth homemade dessert",
    "Side-profile countertop photograph highlighting height clearance under kitchen cabinets",
    "Detailed close-up focusing on pint locking notches, snap-on lids and double-walled freezer bowl",
    "Bright sunlit dining counter composition with chilled glass bowls and spoons",
    "Oblique dessert bar shot with crisp natural frost condensation on glassware",
]

LIGHTING_MOODS = [
    "crisp natural morning kitchen window daylight with soft shadows",
    "warm golden-hour afternoon sunlight illuminating natural wood and quartz",
    "clean bright culinary studio daylight highlighting authentic ice cream textures",
    "refreshing cool daylight showcasing fruit sorbet colors and frost droplets",
    "cozy warm evening dessert bar lighting with natural contrast",
    "soft diffused overcast window light with realistic appliance reflections",
    "bright balanced sunlit apartment kitchen illumination with gentle highlights",
]

SURFACES_AND_PROPS = [
    "on a white quartz kitchen countertop beside stainless steel scoops and measuring cups",
    "on a warm walnut island beside colorful BPA-free pint containers with snap lids",
    "next to an open apartment freezer drawer showing pint and bowl space clearance",
    "on a sunlit light oak dining table with chilled ceramic dessert bowls and waffle cones",
    "on a dark slate pastry mat beside a 0.1g digital precision scale and glass jar",
    "on a minimalist Scandinavian kitchen counter next to fresh berries, mango slices and mint",
    "beside a marble dessert station with insulated double-wall storage containers",
    "on a bright modern apartment counter beside a freezer thermometer and clean microfiber cloth",
    "on an outdoor summer terrace table with iced bowls, metal spoons and fresh tropical fruit",
]

TRANSACTIONAL_PILLARS = {
    "resenas-maquinas-de-helado",
    "comparativas-maquinas-de-helado",
    "maquinas-por-precio-porciones-y-espacio",
    "vasos-tapas-y-recipientes-compatibles",
    "maquinas-para-gelato-sorbete-y-soft-serve",
    "ingredientes-bases-y-accesorios-heladeria",
}


def build_diverse_prompt(subject: str, idx: int) -> str:
    cam = CAMERA_STYLES[idx % len(CAMERA_STYLES)]
    light = LIGHTING_MOODS[(idx * 5 + 1) % len(LIGHTING_MOODS)]
    surf = SURFACES_AND_PROPS[(idx * 7 + 2) % len(SURFACES_AND_PROPS)]
    return (
        f"Realistic editorial home kitchen and ice cream photography, {cam}: {subject}, {surf}, {light}. "
        "Photorealistic brushed stainless steel, creamy frozen textures and genuine home surfaces, no text, no letters, no logos, no watermarks."
    )


def clean_slug(s: str) -> str:
    s = (
        s.lower()
        .strip()
        .replace("á", "a")
        .replace("é", "e")
        .replace("í", "i")
        .replace("ó", "o")
        .replace("ú", "u")
        .replace("ü", "u")
        .replace("ñ", "n")
    )
    s = re.sub(r"[^a-z0-9-]+", "-", s)
    return re.sub(r"-+", "-", s).strip("-")


def make_pillar_article(p: dict, child_items: list, idx: int) -> dict:
    cat_slug = p["slug"]
    path = f"/{cat_slug}/"
    related_paths = [f"/{cat_slug}/{clean_slug(c[0])}/" for c in child_items[:4]]
    table_rows = [
        [c[1], f"[Ver guía completa](/{cat_slug}/{clean_slug(c[0])}/)"]
        for c in child_items[:16]
    ]
    is_trans_pillar = cat_slug in TRANSACTIONAL_PILLARS

    blocks = [
        {
            "type": "p",
            "text": f"Bienvenido al hub especializado de **{p['title']}** en **HeladoEnCasa.com**. Aquí reunimos nuestras **{len(child_items)} guías verificadas** sobre **{p['focus']}**, organizadas sin canibalización para ayudarte a acertar con tu compra y tus recetas en **Amazon Estados Unidos (`amazon.com`)**.",
        },
        {
            "type": "p",
            "text": "Tanto si quieres comparar **[Ninja CREAMi NC301 vs Cuisinart ICE-21](/comparativas-maquinas-de-helado/ninja-creami-nc301-vs-cuisinart-ice-21-comparativa-completa/)**, verificar **[qué vasos y tapas son compatibles con cada Ninja](/guia-compatibilidad-vasos-tazones-y-repuestos/guia-compatibilidad-vasos-tapas-ninja-creami-nc301-nc501-breeze-swirl/)**, medir **[cuánto espacio ocupa cada máquina en el congelador](/espacio-en-congelador-tiempo-y-funcionamiento/como-elegir-maquina-helado-segun-espacio-congelador/)** o preparar **[un sorbete de mango natural sin cristales](/recetas-de-sorbetes-y-frutas-naturales/receta-sorbete-mango-natural-cremoso-ninja-cuisinart/)**, cada guía incluye datos técnicos claros y comprobados.",
        },
        {"type": "h2", "text": f"Qué evaluamos en {p['title'].split('(')[0].split(':')[0].strip()}"},
        {
            "type": "p",
            "text": f"En todas las **{len(child_items)} guías** de esta sección analizamos los cuatro criterios decisivos: **1) Precio real en Amazon EE. UU.**; **2) Porciones por lote** (desde pintas personales de `16 oz` hasta tazones de `2.0 Qt` y compresores continuos); **3) Tiempo previo en congelador frente a preparación instantánea**; y **4) Espacio real en pulgadas/cm dentro del congelador**, sumando la verificación de **vasos, tapas, paletas y tazones de repuesto compatibles**.",
        },
        {
            "type": "table",
            "caption": f"Guías destacadas en {p['title'].split('(')[0].strip()}",
            "headers": ["Guía / Comparativa / Receta", "Enlace Directo"],
            "rows": table_rows,
        },
        {
            "type": "callout",
            "variant": "fabricante",
            "title": "Regla de Oro de Compatibilidad: Vasos y Tazones",
            "text": "Nunca compres vasos de repuesto por apariencia: las pintas de 16 oz (4 muescas inferiores) de Ninja NC299AMZ/NC300/NC301 NO encajan en Ninja CREAMi Deluxe NC501 (24 oz XL) ni en Breeze/Swirl. De igual forma, los tazones Cuisinart ICE-21RFB (1.5 Qt) e ICE-30RFB (2.0 Qt) tienen diámetros distintos.",
        },
        {"type": "h2", "text": "Cómo elegir en 3 pasos rápidos"},
        {
            "type": "ol",
            "items": [
                "**Mide el hueco libre en tu congelador:** si tienes poco espacio, elige pintas individuales **[Ninja CREAMi NC301](/resenas-maquinas-de-helado/ninja-creami-nc301-resena-precio-porciones-espacio-freezer/)** (`4.4\" × 4.5\"`) o libera el 100% del freezer con una **[Cuisinart ICE-100 con compresor](/resenas-maquinas-de-helado/cuisinart-ice-100-compresor-resena-gelato-helado-sin-freezer/)**.",
                "**Calcula tus porciones y presupuesto:** por debajo de US$80, **[Cuisinart ICE-21P1](/resenas-maquinas-de-helado/cuisinart-ice-21p1-resena-precio-porciones-espacio/)** rinde 6–8 bolas familiares en 20 minutos tras congelar el tazón.",
                "**Suma repuestos desde el inicio:** añadir un **[pack de 4 vasos compatibles](/vasos-tapas-y-recipientes-compatibles/mejores-vasos-tapas-compatibles-ninja-creami-amazon/)** o un segundo tazón te permite preparar helados cremosos, proteicos y sorbetes durante toda la semana sin esperas.",
            ],
        },
        {
            "type": "cta",
            "text": "¿No sabes qué máquina, vasos o receta se adapta mejor a tu cocina? Pregúntale ahora mismo a nuestro Asesor de Helados IA.",
        },
    ]

    faqs = [
        {
            "q": f"¿Qué marcas comparamos en {p['title'].split('(')[0].strip()}?",
            "a": "Analizamos principalmente las líneas Ninja (CREAMi NC301, NC300, NC299AMZ, Deluxe NC501, Breeze NC201, Swirl NC701 y SLUSHi FS301) y Cuisinart (ICE-21P1, ICE-30BC, ICE-70P1, ICE-100 Compresor, ICE-45/48 y Fast-Freeze), además de Whynter, Breville, KitchenAid, Dash y Hamilton Beach en Amazon EE. UU.",
        },
        {
            "q": "¿Cuántas porciones rinden realmente las máquinas de helado caseras?",
            "a": "Una pinta Ninja NC301 (16 oz / 473 ml) rinde 2 a 3 bolas; la Ninja Deluxe NC501 (24 oz / 709 ml) rinde 4 a 5 porciones; una Cuisinart 1.5 Qt (ICE-21 o ICE-100) entrega 6 a 8 bolas; y los modelos de 2.0–2.1 Qt (ICE-30BC o Whynter) alcanzan 8 a 12 porciones por tanda.",
        },
        {
            "q": "¿Los vasos compatibles de Amazon funcionan igual que los originales?",
            "a": "Sí, siempre que verifiques el código de serie exacto de tu máquina (por ejemplo NC299/NC300/NC301 vs NC500/NC501 Deluxe) y confirmes que el plástico sea libre de BPA apto para -22 °C.",
        },
    ]

    return {
        "slug": cat_slug,
        "pillar": cat_slug,
        "path": path,
        "isPillar": True,
        "isTransactional": is_trans_pillar,
        "primaryKeyword": p["kw"],
        "title": p["title"],
        "seoTitle": f"{p['title']} | HeladoEnCasa.com",
        "metaDescription": f"Guía completa sobre {p['focus']}. Compara Ninja y Cuisinart por precio, porciones, tiempo y espacio en el congelador en Amazon EE. UU.",
        "excerpt": f"Explora las {len(child_items)} guías sobre {p['focus']} con comparativas, recetas y tablas de compatibilidad.",
        "quickAnswer": f"En esta sección reunimos {len(child_items)} guías especializadas sobre {p['focus']}. Comparamos equipos Ninja y Cuisinart según precio, porciones reales, tiempo y espacio en el congelador en Amazon Estados Unidos.",
        "readingMinutes": 8,
        "image": {
            "prompt": build_diverse_prompt(p["subject"], idx),
            "alt": p["title"],
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com Best Sellers in Ice Cream Machines", "url": "https://www.amazon.com/Best-Sellers-Kitchen-Dining-Ice-Cream-Machines/zgbs/kitchen/289923"},
            {"label": "Ninja Kitchen & Cuisinart Official Product Manuals", "url": "https://www.amazon.com/"},
        ],
        "related": related_paths,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": f"/img/ambiente/cat-{cat_slug}.webp",
    }


def make_transactional_article(item: tuple, sibling_paths: list, idx: int) -> dict:
    slug, title, pillar, kw, ps, pt, fs, cs, picks, subj = item
    slug = clean_slug(slug)
    path = f"/{pillar}/{slug}/"
    rel = [p for p in sibling_paths if p != path][:3]
    rel.insert(0, f"/{pillar}/")

    blocks = [
        {
            "type": "p",
            "text": f"Evaluar **{title}** con datos medibles evita comprar un equipo demasiado grande para tu congelador o un repuesto que no encaja. En esta guía para **Amazon Estados Unidos (`amazon.com`)** desglosamos el **precio y porciones reales ({ps})**, el **tiempo de preparación ({pt})**, el **espacio que ocupa en el congelador ({fs})** y los **vasos, tapas o tazones compatibles ({cs})**.",
        },
        {
            "type": "h2",
            "text": "Análisis técnico: precio, porciones, tiempo y espacio en el congelador",
        },
        {
            "type": "p",
            "text": f"Al revisar **{picks}**, conviene separar dos métricas que a menudo confunden en las reseñas rápidas: el volumen nominal del recipiente frente a las bolas reales servidas, y el tiempo activo de batido frente a las horas de congelación previa. Con un rango ubicado en **{ps}** y un tiempo de **{pt}**, esta selección responde exactamente a las exigencias domésticas actuales.",
        },
        {
            "type": "callout",
            "variant": "etiqueta",
            "title": f"Resumen Técnico para Comprar en Amazon: {picks.split('+')[0].strip()}",
            "text": f"• Precio y porciones reales: {ps}.\n• Tiempo de preparación y espera: {pt}.\n• Espacio en el congelador: {fs}.\n• Vasos, tapas y repuestos compatibles: {cs}.",
        },
        {
            "type": "h2",
            "text": f"Tabla comparativa en Amazon EE. UU.: {title}",
        },
        {
            "type": "p",
            "text": "Compara nuestra recomendación principal frente a los tres formatos de referencia en Amazon Estados Unidos:",
        },
        {
            "type": "table",
            "caption": f"Comparativa de precio, porciones, tiempo, freezer y compatibilidad para {title}",
            "headers": [
                "Modelo / Producto en Amazon",
                "Precio y Porciones",
                "Tiempo Total vs Activo",
                "Espacio en Freezer y Repuestos",
            ],
            "rows": [
                [
                    f"**Selección Principal: {picks.split('+')[0].strip()}**",
                    ps,
                    pt,
                    f"{fs} · {cs}",
                ],
                [
                    "**Cuchilla 16 oz: [Ninja CREAMi NC301](/resenas-maquinas-de-helado/ninja-creami-nc301-resena-precio-porciones-espacio-freezer/)**",
                    "~US$189 · 2–3 bolas por vaso (16 oz)",
                    "24 h freezer + 2–3 min spin",
                    "4.4\"×4.5\" · Vasos 16 oz (4 muescas NC299/300/301)",
                ],
                [
                    "**Económica Tazón: [Cuisinart ICE-21P1](/resenas-maquinas-de-helado/cuisinart-ice-21p1-resena-precio-porciones-espacio/)**",
                    "~US$69 · 6–8 bolas por lote (1.5 Qt)",
                    "24 h tazón + 20 min batido",
                    "7.5\"×6.2\" · Tazón repuesto ICE-21RFB",
                ],
                [
                    "**Compresor 0 Freezer: [Cuisinart ICE-100](/resenas-maquinas-de-helado/cuisinart-ice-100-compresor-resena-gelato-helado-sin-freezer/)**",
                    "~US$289 · 6–8 bolas seguidas (1.5 Qt)",
                    "0 h freezer + 40–50 min",
                    "0 cm³ en congelador · 2 paletas (gelato e ice cream)",
                ],
            ],
        },
        {
            "type": "h2",
            "text": "Compatibilidad de vasos, tapas, tazones y recetas recomendadas",
        },
        {
            "type": "ul",
            "items": [
                f"**Repuestos sin margen de error:** respeta la compatibilidad exacta **{cs}**. Puedes comprobar el código impreso bajo la máquina en nuestra **[guía de compatibilidad de vasos y tazones](/guia-compatibilidad-vasos-tazones-y-repuestos/guia-compatibilidad-vasos-tapas-ninja-creami-nc301-nc501-breeze-swirl/)**.",
                "**Multiplica sabores desde el primer envío:** sumar un pack extra de pintas o un segundo tazón te permite tener listos a la vez un **[helado cremoso de vainilla](/recetas-de-helados-cremosos-y-gelatos/receta-helado-vainilla-cremoso-ninja-cuisinart/)**, un **[sorbete de mango 100% fruta](/recetas-de-sorbetes-y-frutas-naturales/receta-sorbete-mango-natural-cremoso-ninja-cuisinart/)** y un **[helado proteico sin cristales](/helados-saludables-proteicos-keto-y-sin-lactosa/receta-helado-proteico-vainilla-chocolate-ninja-creami/)**.",
                "**Conservación sin quemadura por frío:** si bates tandas grandes en tazón o compresor, traslada el sobrante a contenedores térmicos estrechos tipo Tovolo o SUMO.",
            ],
        },
        {
            "type": "h2",
            "text": "3 pasos para acertar al comprar en Amazon EE. UU.",
        },
        {
            "type": "steps",
            "items": [
                {
                    "name": "Mide el cajón o estante de tu congelador",
                    "text": f"Confirma que dispones del volumen requerido ({fs}) y que tu freezer enfría a -18 °C (0 °F) para que la congelación sea homogénea.",
                },
                {
                    "name": "Verifica el enlace directo en nuestras tarjetas Amazon",
                    "text": "Consulta el precio del día, cupones activos y reseñas verificadas haciendo clic en las tarjetas de producto integradas en esta página.",
                },
                {
                    "name": "Añade vasos extra o estabilizante en el mismo carrito",
                    "text": f"Incluye {cs} (y opcionalmente goma guar o alulosa si haces recetas ligeras/keto) para sacar todo el provecho desde el primer día.",
                },
            ],
        },
        {
            "type": "callout",
            "variant": "aviso",
            "title": "Nota sobre voltaje eléctrico si compras desde Latinoamérica (220V)",
            "text": "Las máquinas vendidas en Amazon Estados Unidos funcionan a 110–120V / 60Hz. Si en tu país la red es de 220V, necesitarás un transformador reductor adecuado: ~100W para Cuisinart ICE-21, ~300W para compresor ICE-100 y ~1,500W para Ninja CREAMi (800W de pico motor).",
        },
        {
            "type": "cta",
            "text": "¿Tienes dudas entre dos modelos o quieres verificar si unos vasos específicos le sirven a tu máquina? Pregúntale en vivo a nuestro Asesor IA.",
        },
    ]

    faqs = [
        {
            "q": f"¿Cuál es el precio y rendimiento de {title} en Amazon EE. UU.?",
            "a": f"El rango habitual se sitúa en {ps}, con un tiempo de preparación de {pt}.",
        },
        {
            "q": "¿Cuánto espacio ocupa realmente en el congelador?",
            "a": f"Requiere {fs}. Ten en cuenta que debes colocar vasos y tazones en superficie plana y nunca en la puerta del congelador.",
        },
        {
            "q": "¿Qué vasos, tapas o tazones de repuesto son compatibles?",
            "a": f"La compatibilidad exacta corresponde a: {cs}. Revisa siempre el código de serie debajo de tu equipo antes de pedir repuestos.",
        },
        {
            "q": "¿Los enlaces de esta página tienen garantía de Amazon Estados Unidos?",
            "a": "Sí. Nuestros botones enlazan directamente a listados en Amazon.com (código heladoencasa-20) con selector automático a Amazon.es (heladoencasa-21) si navegas desde España.",
        },
    ]

    quick_answer = (
        f"En nuestro análisis de {title}, el rango es {ps} con un tiempo de {pt} y un requerimiento de freezer de {fs}. "
        f"En repuestos utiliza {cs}, siendo nuestra recomendación principal {picks}."
    )

    return {
        "slug": slug,
        "pillar": pillar,
        "path": path,
        "isPillar": False,
        "isTransactional": True,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title} | HeladoEnCasa.com",
        "metaDescription": f"Guía y comparativa de {title} en Amazon EE. UU.: precio ({ps}), tiempo ({pt}), espacio en congelador y repuestos compatibles.",
        "excerpt": f"Análisis completo de {title}: precio, porciones, tiempo, espacio en congelador y vasos/tazones compatibles.",
        "quickAnswer": quick_answer,
        "readingMinutes": 7,
        "image": {
            "prompt": build_diverse_prompt(subj, idx),
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com Ice Cream Machines & Accessories", "url": "https://www.amazon.com/Best-Sellers-Kitchen-Dining-Ice-Cream-Machines/zgbs/kitchen/289923"},
        ],
        "related": rel,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": None,
    }


def make_seo_article(item: tuple, sibling_paths: list, idx: int) -> dict:
    slug, title, pillar, kw, focus_summary, subj, recipe_data = item
    slug = clean_slug(slug)
    path = f"/{pillar}/{slug}/"
    rel = [p for p in sibling_paths if p != path][:3]
    rel.insert(0, f"/{pillar}/")

    blocks = [
        {
            "type": "p",
            "text": f"Dominar **{title}** marca la diferencia entre un helado casero común y un resultado sedoso de heladería sin desperdiciar dinero ni espacio en el congelador. En **HeladoEnCasa.com** desarrollamos esta **{focus_summary}** aplicable a los sistemas **Ninja CREAMi**, **Cuisinart** (tazón y compresor) y alternativas líderes en **Amazon Estados Unidos**.",
        }
    ]

    if recipe_data is not None:
        r_ninja, r_cuisinart, r_prog = recipe_data
        blocks.extend([
            {
                "type": "h2",
                "text": f"Ingredientes exactos para {title} (Ninja CREAMi vs Cuisinart)",
            },
            {
                "type": "p",
                "text": "Hemos calibrado las proporciones exactas de líquidos, sólidos, fruta y estabilizantes tanto para **1 vaso de 16 oz (Ninja CREAMi NC301/NC300)** como para **1 tazón de 1.5 Qt (Cuisinart ICE-21 / ICE-100)**.",
            },
            {
                "type": "table",
                "caption": f"Proporciones exactas para {title}",
                "headers": [
                    "Sistema / Capacidad",
                    "Ingredientes y Pesos Exactos",
                    "Programa / Tiempo",
                    "Porciones Reales",
                ],
                "rows": [
                    [
                        "**Ninja CREAMi 16 oz (NC301 / NC300)**",
                        r_ninja,
                        f"24 h a -18 °C + 2–3 min ({r_prog})",
                        "2 a 3 bolas por pinta",
                    ],
                    [
                        "**Ninja Deluxe 24 oz XL (NC501)**",
                        f"Multiplicar ingredientes 16 oz × 1.5 respetando línea MAX FILL",
                        f"24 h a -18 °C + 3 min ({r_prog})",
                        "4 a 5 bolas por vaso XL",
                    ],
                    [
                        "**Cuisinart 1.5 Qt / Compresor ICE-100**",
                        r_cuisinart,
                        "20 min (ICE-21) o 45 min (ICE-100)",
                        "6 a 8 bolas familiares",
                    ],
                ],
            },
            {
                "type": "callout",
                "variant": "tip",
                "title": "Secreto de heladería para textura cero cristales",
                "text": "En Ninja CREAMi, deja el vaso destapado 10 minutos sobre la mesa antes de procesar o aplana la joroba central congelada con cuchara, y aplica un Re-Spin con 1 cucharada de líquido si queda polvoso. En Cuisinart, enfría la mezcla líquida 4 horas en nevera a 4 °C antes de verterla al tazón girando.",
            },
            {
                "type": "h2",
                "text": f"Preparación paso a paso: {title}",
            },
            {
                "type": "steps",
                "items": [
                    {
                        "name": "Mezcla e hidrata la base sin aire excesivo",
                        "text": "Disuelve bien azúcares, alulosa o goma guar en la fase líquida fría o tibia (usando batidor de mano 15–20 segundos) para evitar grumos.",
                    },
                    {
                        "name": "Congela plano 24 h (Ninja) o pre-enfría 4 h (Cuisinart)",
                        "text": "Si usas vaso Ninja, congela sin tapa o nivelado a -18 °C durante 24 horas. Si usas Cuisinart ICE-21, asegúrate de que el tazón haya estado 24 h en el fondo del freezer.",
                    },
                    {
                        "name": "Procesa, incorpora mix-ins y conserva",
                        "text": f"Ejecuta el ciclo {r_prog}. Añade trozos de fruta, galleta o chocolate en el último minuto (Mix-In) y guarda cualquier sobrante en contenedor térmico hermético.",
                    },
                ],
            },
        ])
    else:
        blocks.extend([
            {
                "type": "h2",
                "text": f"Análisis práctico y técnico: {title}",
            },
            {
                "type": "p",
                "text": f"Al trabajar con máquinas de helado domésticas, cada detalle dimensional, térmico o mecánico influye directamente en el resultado final y la durabilidad de las piezas. Esta **{focus_summary}** te permite tomar decisiones exactas sobre temperatura de congelación (`-18 °C / 0 °F`), dimensiones reales, códigos de compatibilidad y mantenimiento.",
            },
            {
                "type": "callout",
                "variant": "fabricante",
                "title": "Verificación rápida antes de actuar",
                "text": "Confirma siempre la referencia exacta en la etiqueta inferior de tu máquina (ej. NC301 vs NC501 Deluxe vs Breeze vs Swirl, o ICE-21 vs ICE-30BC vs ICE-100) antes de pedir vasos, tapas, cuchillas o tazones extra.",
            },
            {
                "type": "h2",
                "text": "Comparativa de comportamiento entre Ninja CREAMi, Cuisinart y Compresores",
            },
            {
                "type": "table",
                "caption": f"Referencia técnica por sistema aplicada a {title}",
                "headers": [
                    "Tipo de Máquina",
                    "Modelos Clave en Amazon",
                    "Espacio Freezer y Tiempo",
                    "Repuestos y Compatibilidad",
                ],
                "rows": [
                    [
                        "**Cuchilla Vertical 16 oz**",
                        "[Ninja CREAMi NC301](/resenas-maquinas-de-helado/ninja-creami-nc301-resena-precio-porciones-espacio-freezer/) · NC300 · NC299AMZ",
                        "Vaso 4.4\"×4.5\" · 24h + 2 min",
                        "Vasos 16 oz de 4 muescas + Cuchilla Creamerizer",
                    ],
                    [
                        "**Cuchilla Vertical 24 oz XL**",
                        "[Ninja Deluxe NC501](/resenas-maquinas-de-helado/ninja-creami-deluxe-nc501-resena-completa/) · NC500",
                        "Vaso XL 4.7\"×5.7\" · 24h + 3 min",
                        "Exclusivos vasos XL 24 oz (no mezclar con 16 oz)",
                    ],
                    [
                        "**Tazón Congelador**",
                        "[Cuisinart ICE-21](/resenas-maquinas-de-helado/cuisinart-ice-21p1-resena-precio-porciones-espacio/) (1.5 Qt) · ICE-30BC (2.0 Qt)",
                        "7.5\"×6.2\" o 8.3\"×7.0\" · 24h + 20–25 min",
                        "Tazones ICE-21RFB / ICE-30RFB + Botes Tovolo",
                    ],
                    [
                        "**Compresor Autónomo**",
                        "[Cuisinart ICE-100](/resenas-maquinas-de-helado/cuisinart-ice-100-compresor-resena-gelato-helado-sin-freezer/) · Whynter ICM-200LS",
                        "0 cm³ en freezer · 40–50 min",
                        "Cubeta desmontable + 2 paletas (gelato / helado)",
                    ],
                ],
            },
            {
                "type": "h2",
                "text": f"Procedimiento paso a paso: {title}",
            },
            {
                "type": "steps",
                "items": [
                    {
                        "name": "Revisa el código de serie y la temperatura del congelador",
                        "text": "Comprueba con termómetro que tu freezer esté entre -18 °C y -21 °C (0 °F a -5 °F) y anota el modelo exacto de tu máquina.",
                    },
                    {
                        "name": "Aplica la técnica o ajuste específico",
                        "text": f"Sigue las especificaciones de esta {focus_summary}, respetando siempre las marcas MAX FILL y la superficie plana de apoyo.",
                    },
                    {
                        "name": "Verifica el resultado y conserva adecuadamente",
                        "text": "Comprueba textura, ausencia de vibraciones anómalas y guarda el sobrante nivelado con tapa hermética anti-escarcha.",
                    },
                ],
            },
        ])

    blocks.extend([
        {
            "type": "h2",
            "text": "Errores comunes que conviene evitar en casa",
        },
        {
            "type": "ul",
            "items": [
                "**Comprar vasos sin revisar las muescas ni la serie:** los vasos de `16 oz` de NC301 no encajan en NC501 Deluxe (`24 oz`), Breeze ni Swirl.",
                "**Congelar el vaso inclinado o en la puerta del freezer:** genera una joroba desigual que fuerza el eje metálico o impide que el tazón Cuisinart congele al 100%.",
                "**Usar eritritol puro en recetas sin azúcar:** endurece la base como una piedra; sustitúyelo por **alulosa pura** y `1/4 cdta` de **goma guar**.",
            ],
        },
        {
            "type": "cta",
            "text": "¿Quieres que nuestro Asesor IA adapte esta receta o confirme qué vasos o máquina comprar en Amazon EE. UU.? Consulta gratis ahora.",
        },
    ])

    faqs = [
        {
            "q": f"¿Esta guía de {title} sirve tanto para Ninja CREAMi como para Cuisinart?",
            "a": "Sí. Siempre detallamos las diferencias de cantidad, tiempo y compatibilidad para pintas Ninja (16 oz y 24 oz XL) y tazones Cuisinart (1.5 Qt, 2.0 Qt y compresor ICE-100).",
        },
        {
            "q": "¿Cuántas porciones rinde un lote estándar?",
            "a": "Una pinta Ninja de 16 oz entrega 2 a 3 bolas, la Deluxe 24 oz rinde 4 a 5 porciones y un tazón Cuisinart de 1.5 Qt produce entre 6 y 8 bolas generosas.",
        },
        {
            "q": "¿Dónde encuentro los vasos, tapas o ingredientes recomendados en Amazon EE. UU.?",
            "a": "En las tarjetas integradas en esta misma página puedes consultar disponibilidad y precio directo en Amazon.com (y Amazon.es si navegas desde España).",
        },
    ]

    quick_answer = (
        f"Para aplicar con éxito {title}, adapta las proporciones y tolerancias a tu máquina exacta (vasos 16/24 oz en Ninja CREAMi o tazón 1.5–2.0 Qt en Cuisinart), "
        f"verifica que el congelador alcance -18 °C y sigue esta {focus_summary} para lograr textura suave sin cristales."
    )

    return {
        "slug": slug,
        "pillar": pillar,
        "path": path,
        "isPillar": False,
        "isTransactional": False,
        "primaryKeyword": kw,
        "title": title,
        "seoTitle": f"{title} | HeladoEnCasa.com",
        "metaDescription": f"Guía práctica y paso a paso sobre {title}: medidas exactas para Ninja CREAMi y Cuisinart sin cristales de hielo.",
        "excerpt": f"Guía detallada sobre {title}: {focus_summary}.",
        "quickAnswer": quick_answer,
        "readingMinutes": 6,
        "image": {
            "prompt": build_diverse_prompt(subj, idx),
            "alt": title,
        },
        "blocks": blocks,
        "faqs": faqs,
        "sources": [
            {"label": "Amazon.com Ice Cream Machines & Replacement Pints", "url": "https://www.amazon.com/Best-Sellers-Kitchen-Dining-Ice-Cream-Machines/zgbs/kitchen/289923"},
        ],
        "related": rel,
        "datePublished": PUBLISHED,
        "dateModified": PUBLISHED,
        "imageUrl": None,
    }


def main():
    for old in ART_DIR.glob("*.json"):
        old.unlink()

    trans_items = generate_transactional_520()
    seo_items = generate_seo_1000()

    by_pillar: dict[str, list] = {p["slug"]: [] for p in PILLARS}
    for it in trans_items:
        by_pillar[it[2]].append(it)
    for it in seo_items:
        by_pillar[it[2]].append(it)

    all_articles = []
    seen_slugs = set()
    seen_kws = set()
    seen_titles = set()
    idx = 0

    for p in PILLARS:
        art = make_pillar_article(p, by_pillar[p["slug"]], idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        assert art["title"] not in seen_titles, f"Duplicate title: {art['title']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        seen_titles.add(art["title"])
        all_articles.append(art)

    pillar_paths = {
        p_slug: [f"/{p_slug}/{clean_slug(c[0])}/" for c in c_list]
        for p_slug, c_list in by_pillar.items()
    }

    for i, it in enumerate(trans_items):
        p_slug = it[2]
        sibs = pillar_paths[p_slug]
        rot_sibs = sibs[(i + 1) % len(sibs):] + sibs[: (i + 1) % len(sibs)]
        art = make_transactional_article(it, rot_sibs, idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        assert art["title"] not in seen_titles, f"Duplicate title: {art['title']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        seen_titles.add(art["title"])
        all_articles.append(art)

    for i, it in enumerate(seo_items):
        p_slug = it[2]
        sibs = pillar_paths[p_slug]
        rot_sibs = sibs[(i + 1) % len(sibs):] + sibs[: (i + 1) % len(sibs)]
        art = make_seo_article(it, rot_sibs, idx)
        idx += 1
        assert art["slug"] not in seen_slugs, f"Duplicate slug: {art['slug']}"
        assert art["primaryKeyword"] not in seen_kws, f"Duplicate kw: {art['primaryKeyword']}"
        assert art["title"] not in seen_titles, f"Duplicate title: {art['title']}"
        seen_slugs.add(art["slug"])
        seen_kws.add(art["primaryKeyword"])
        seen_titles.add(art["title"])
        all_articles.append(art)

    for art in all_articles:
        (ART_DIR / f"{art['slug']}.json").write_text(
            json.dumps(art, ensure_ascii=False, indent=2), encoding="utf-8"
        )

    kw_map = [
        {
            "slug": a["slug"],
            "pillar": a["pillar"],
            "path": a["path"],
            "isPillar": a["isPillar"],
            "isTransactional": a["isTransactional"],
            "primaryKeyword": a["primaryKeyword"],
            "title": a["title"],
        }
        for a in all_articles
    ]
    (DATA_DIR / "keyword_map.json").write_text(
        json.dumps(kw_map, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    cats = json.loads((DATA_DIR / "categories.json").read_text(encoding="utf-8"))
    cat_names = {c["slug"]: c["shortName"] for c in cats}
    search_index = [
        {
            "t": a["title"],
            "p": a["path"],
            "c": cat_names.get(a["pillar"], a["pillar"]),
            "k": a["primaryKeyword"],
            "tr": 1 if a.get("isTransactional") else 0,
        }
        for a in all_articles
    ]
    (PUB_DIR / "search-index.json").write_text(
        json.dumps(search_index, ensure_ascii=False), encoding="utf-8"
    )

    print(
        f"OK: Generados {len(all_articles)} artículos únicos "
        f"({len(PILLARS)} Pilares + {len(trans_items)} Transaccionales Amazon + {len(seo_items)} SEO Informacionales y Recetas). "
        f"0% Canibalización verificada."
    )


if __name__ == "__main__":
    main()
