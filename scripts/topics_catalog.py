#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Catálogo Maestro Ortogonal Sin Canibalización para HeladoEnCasa.com:
- 14 Hubs Pilares de Categoría (PILLARS)
- 520 Artículos Transaccionales de Afiliados Amazon (6 Silos: 115 + 110 + 95 + 90 + 55 + 55 = 520)
- 1,000 Artículos SEO Informacionales y Recetas (8 Silos: 135 + 130 + 140 + 125 + 125 + 120 + 115 + 110 = 1,000)
Total = 1,534 páginas editoriales únicas 100% evergreen y 0% canibalización.
"""
import re

PILLARS = [
    {
        "slug": "resenas-maquinas-de-helado",
        "title": "Reseñas de Máquinas de Helado Caseras en Amazon EE. UU. (Ninja, Cuisinart, Whynter y Más)",
        "kw": "resenas de maquinas de helado caseras ninja y cuisinart amazon",
        "focus": "análisis individuales de cada modelo de máquina de helado en Amazon Estados Unidos evaluando precio, porciones reales, tiempo de preparación, espacio en el congelador y vasos/tazones compatibles",
        "subject": "an editorial quartz kitchen counter featuring a matte black vertical pint ice cream maker and a brushed stainless steel freezer-bowl ice cream churner side by side",
    },
    {
        "slug": "comparativas-maquinas-de-helado",
        "title": "Comparativas de Máquinas de Helado: Ninja CREAMi vs Cuisinart vs Compresor",
        "kw": "comparativas maquinas de helado ninja creami vs cuisinart amazon",
        "focus": "duelos cara a cara Modelo A vs Modelo B y Marca A vs Marca B comparando precio en dólares, porciones por tanda, horas en el freezer y compatibilidad de repuestos",
        "subject": "side-by-side studio comparison on warm oak wood between a vertical Ninja-style pint processor and a cylindrical Cuisinart-style ice cream maker with creamy scoops",
    },
    {
        "slug": "maquinas-por-precio-porciones-y-espacio",
        "title": "Mejores Máquinas de Helado por Precio, Porciones y Espacio en Congelador",
        "kw": "mejores maquinas de helado por precio porciones y espacio en congelador",
        "focus": "rankings de compra en Amazon Estados Unidos segmentados por presupuesto exacto, cantidad de porciones por lote, rapidez y tamaño en el congelador",
        "subject": "graduated kitchen display of a compact personal ice cream maker, a medium 16oz pint spin maker and a large stainless compressor gelato unit",
    },
    {
        "slug": "vasos-tapas-y-recipientes-compatibles",
        "title": "Vasos, Tapas, Tazones y Recipientes Compatibles en Amazon EE. UU.",
        "kw": "vasos tapas y recipientes compatibles maquinas de helado ninja y cuisinart",
        "focus": "guías de compra de packs de pintas 16 oz y 24 oz XL Ninja, tazones extra Cuisinart 1.5 y 2.0 Qt, cuchillas de repuesto y contenedores térmicos de conservación",
        "subject": "four translucent BPA-free ice cream pint tubs with vibrant pastel snap-on lids next to a brushed aluminum double-walled freezer bowl on marble",
    },
    {
        "slug": "maquinas-para-gelato-sorbete-y-soft-serve",
        "title": "Máquinas Especializadas para Gelato, Sorbete de Fruta y Soft Serve en Casa",
        "kw": "mejores maquinas para gelato sorbete y soft serve en casa amazon",
        "focus": "selecciones comerciales en Amazon Estados Unidos según el postre frío: gelato italiano denso, sorbetes 100% fruta, conos soft serve, yogur helado y granizados",
        "subject": "artisanal gelato scoops, vivid mango fruit sorbet and soft serve cones arranged beside a modern brushed steel home ice cream machine",
    },
    {
        "slug": "ingredientes-bases-y-accesorios-heladeria",
        "title": "Ingredientes Base, Endulzantes y Accesorios para Heladería Casera en Amazon",
        "kw": "ingredientes endulzantes y accesorios para hacer helado en casa amazon",
        "focus": "guías de compra de alulosa pura para helado suave sin azúcar, goma guar, pasta pura de pistacho, planchas de barquillos waffle, básculas de 0.1 g y cucharas térmicas",
        "subject": "flat-lay kitchen photography of granulated allulose, guar gum jar, roasted pistachio paste, waffle cone maker, thermal aluminum scoop and digital precision scale",
    },
    {
        "slug": "guia-compatibilidad-vasos-tazones-y-repuestos",
        "title": "Guía Técnica de Compatibilidad de Vasos, Tapas, Muescas y Repuestos",
        "kw": "guia tecnica compatibilidad vasos tapas y tazones ninja y cuisinart",
        "focus": "reglas exactas para identificar códigos bajo la base, muescas de bloqueo de pintas 16 oz vs 24 oz vs Breeze vs Swirl, y diámetros de tazones Cuisinart y KitchenAid",
        "subject": "macro kitchen close-up showing the four base locking notches on a 16oz ice cream pint beside a tall 24oz XL deluxe pint and silicone snap lids",
    },
    {
        "slug": "espacio-en-congelador-tiempo-y-funcionamiento",
        "title": "Espacio en el Congelador, Tiempos de Congelación y Consumo Eléctrico",
        "kw": "espacio en congelador tiempo de preparacion y funcionamiento maquinas de helado",
        "focus": "dimensiones reales en pulgadas y centímetros para congeladores pequeños o mini-fridge, temperaturas de -18 °C, tiempos de espera vs compresor y consumo en watts",
        "subject": "organized modern home freezer drawer showing compact 16oz ice cream pint jars resting flat beside a stainless freezer bowl and digital freezer thermometer",
    },
    {
        "slug": "recetas-de-helados-cremosos-y-gelatos",
        "title": "Recetas de Helados Cremosos y Gelatos Artesanales (Ninja CREAMi y Cuisinart)",
        "kw": "recetas de helados cremosos y gelatos caseros ninja creami y cuisinart",
        "focus": "recetas detalladas paso a paso con gramos y tazas exactos para vaso Ninja de 16 oz y tazón Cuisinart de 1.5 Qt: vainilla, chocolate, pistacho, dulce de leche y más",
        "subject": "creamy homemade vanilla bean and roasted pistachio gelato served in chilled ceramic bowls beside open pint tubs on a sunlit walnut counter",
    },
    {
        "slug": "recetas-de-sorbetes-y-frutas-naturales",
        "title": "Recetas de Sorbetes de Fruta Natural y Nieves Refrescantes en Casa",
        "kw": "recetas de sorbetes y nieves de fruta natural en maquina de helado",
        "focus": "fórmulas refrescantes sin lácteos de mango, limón, maracuyá, fresa, frambuesa y piña con la proporción exacta de fruta y endulzante para textura sedosa",
        "subject": "bright golden mango sorbet and ruby raspberry sorbet scoops glistening on chilled glass bowls surrounded by fresh tropical fruit slices",
    },
    {
        "slug": "helados-saludables-proteicos-keto-y-sin-lactosa",
        "title": "Helados Saludables: Proteicos, Keto Sin Azúcar y Veganos Sin Lactosa",
        "kw": "recetas helados saludables proteicos keto y sin lactosa en casa",
        "focus": "recetas altas en proteína, bajas en carbohidratos con alulosa sin dureza de bloque y versiones cremosas veganas con leche de coco, avena o anacardos",
        "subject": "fitness high-protein chocolate ice cream pint tub with a spoon beside fresh berries and almond milk on a bright modern kitchen counter",
    },
    {
        "slug": "textura-ciencia-del-helado-y-tecnicas",
        "title": "Textura, Ciencia del Helado Casero, Re-Spin y Técnicas Anti-Cristales",
        "kw": "como evitar cristales y mejorar textura en maquinas de helado caseras",
        "focus": "técnicas para eliminar textura arenosa o polvosa, cuándo usar Re-Spin, cómo nivelar el montículo antes de procesar, incorporación de mix-ins y control de aire (overrun)",
        "subject": "overhead macro shot of velvety smooth freshly spun chocolate ice cream in a pint container showing zero ice crystals and rich chocolate chunks",
    },
    {
        "slug": "limpieza-cuidado-y-solucion-de-problemas",
        "title": "Limpieza, Desarmado de Tapas, Cuidado y Solución de Fallas Comunes",
        "kw": "limpieza cuidado y solucion de problemas maquinas de helado ninja y cuisinart",
        "focus": "mantenimiento paso a paso de juntas de goma, eje metálico y cuchillas; solución a luces parpadeantes, tazones que no endurecen y conservación sin escarcha",
        "subject": "clean stainless steel sink counter with disassembled ice cream maker paddle, outer lid gasket, microfiber towel and warm soapy water brush",
    },
    {
        "slug": "guia-de-compra-envio-y-voltaje-amazon-usa",
        "title": "Guía de Compra Inteligente, Voltaje 110V/220V y Envío desde Amazon EE. UU.",
        "kw": "guia de compra voltaje 110v 220v y envio maquinas de helado amazon usa",
        "focus": "orientación práctica para compradores hispanohablantes sobre voltaje 110–120V/60Hz, consumo de watts para transformadores en países de 220V, garantía y ahorro por porción",
        "subject": "clean modern kitchen unboxing scene of a countertop ice cream maker beside stainless steel bowls, measuring cups and ice cream scoops",
    },
]


def _slug(s: str) -> str:
    s = (
        s.lower()
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


def generate_transactional_520():
    """
    Exactamente 520 artículos transaccionales sin canibalización:
    Silo 1: 115 | Silo 2: 110 | Silo 3: 95 | Silo 4: 90 | Silo 5: 55 | Silo 6: 55 => Total = 520.
    Tupla: (slug, title, pillar, kw, price_servings, prep_time, freezer_space, compat_spares, top_picks, visual_subject)
    """
    items = []

    # -------------------------------------------------------------------------
    # SILO 1: resenas-maquinas-de-helado (115)
    # -------------------------------------------------------------------------
    s1_flagships = [
        (
            "ninja-creami-nc301-resena-precio-porciones-espacio-freezer",
            "Ninja CREAMi NC301: Reseña Completa, Precio, Porciones, Tiempo y Vasos Compatibles",
            "US$179 – US$199 · 2–3 bolas por pinta (16 oz / 473 ml)",
            "24 h de congelación previa + 2–3 min de centrifugado",
            "Mínimo en freezer: vasos de 4.4\" diámetro × 4.5\" alto (11.2 × 11.4 cm)",
            "Vasos 16 oz de 4 muescas compatibles NC299AMZ / NC300 / NC301",
            "Ninja CREAMi NC301 + Pack 4 Vasos 16 oz + Fundas de Neopreno",
            "matte black vertical Ninja CREAMi-style countertop ice cream maker with a frozen 16oz pint cup of creamy vanilla swirl beside colorful pint lids",
        ),
        (
            "ninja-creami-deluxe-nc501-resena-completa",
            "Ninja CREAMi Deluxe NC501 (11 en 1 XL): Reseña, Porciones 24 oz, Precio y Repuestos",
            "US$219 – US$249 · 4–5 bolas por vaso XL (24 oz / 709 ml)",
            "24 h de congelación previa + 2–4 min (procesa mitad superior o completa)",
            "Bajo en freezer: vasos XL de 4.7\" diámetro × 5.7\" alto (11.9 × 14.5 cm)",
            "Exclusivo vasos XL 24 oz serie NC500 / NC501 / CN501CO",
            "Ninja CREAMi Deluxe NC501 + Pack 4 Vasos XL 24 oz + Cuchara Zeroll",
            "stainless silver and black deluxe XL countertop ice cream machine next to two tall 24oz translucent frozen tubs of strawberry gelato and slushi",
        ),
        (
            "cuisinart-ice-21p1-resena-precio-porciones-espacio",
            "Cuisinart ICE-21P1 (1.5 Qt): Reseña Económica, Porciones, Tiempo y Tazón Compatible",
            "US$69 – US$79 · 6–8 bolas por lote (1.5 Quart / 1.4 litros)",
            "16–24 h tazón en congelador + 20 min de batido automático",
            "Medio en freezer: tazón cilíndrico de 7.5\" diámetro × 6.2\" alto (19 × 15.7 cm)",
            "Tazón extra oficial Cuisinart ICE-21RFB (1.5 Qt) + Contenedor Tovolo",
            "Cuisinart ICE-21P1 1.5 Qt + Tazón Extra ICE-21RFB + Contenedor Tovolo",
            "classic white cylindrical freezer-bowl ice cream maker churning smooth strawberry ice cream through a clear top spout on a bright kitchen counter",
        ),
        (
            "cuisinart-ice-100-compresor-resena-gelato-helado-sin-freezer",
            "Cuisinart ICE-100 con Compresor: Reseña para Hacer Helado y Gelato Sin Ocupar Congelador",
            "US$269 – US$299 · 6–8 bolas continuas (1.5 Quart / 1.4 litros)",
            "0 h espera en congelador + 40–50 min directo desde líquido frío",
            "0 cm³ en tu congelador (el compresor interno congela mientras bate)",
            "Cubeta desmontable ICE-100 + 2 paletas (gelato e ice cream) + Botes Tovolo",
            "Cuisinart ICE-100 Compressor + Tovolo Glide-A-Scoop + Pasta de Pistacho",
            "brushed stainless steel countertop compressor gelato maker with two mixing paddles and fresh rich pistachio gelato on quartz",
        ),
    ]
    for sl, ti, ps, pt, fs, cs, pk, sj in s1_flagships:
        items.append((sl, ti, "resenas-maquinas-de-helado", sl.replace("-", " "), ps, pt, fs, cs, pk, sj))

    s1_models = [
        ("ninja-creami-nc300", "Ninja CREAMi NC300 (5 en 1 · 16 oz)", "US$159–$189 · 2–3 bolas (16 oz)", "24h congelación + 2 min", "4.4\"×4.5\" por pinta", "Vasos 16 oz NC299/NC300/NC301", "Ninja CREAMi NC300 + Pack 4 Pintas 16 oz"),
        ("ninja-creami-nc299amz", "Ninja CREAMi NC299AMZ Edición Amazon", "US$149–$179 · 2–3 bolas (16 oz)", "24h congelación + 2 min", "4.4\"×4.5\" por pinta", "Vasos 16 oz NC299/NC300/NC301", "Ninja NC299AMZ + Pack 4 Pintas 16 oz"),
        ("ninja-creami-breeze-nc201", "Ninja CREAMi Breeze NC201 Compacta", "US$169–$199 · 2–3 bolas (16 oz)", "24h congelación + 2 min", "4.5\"×4.6\" por vaso", "Vasos exclusivos Breeze NC100/NC200", "Ninja Breeze NC201 + Pack Pintas Breeze"),
        ("ninja-creami-breeze-nc101", "Ninja CREAMi Breeze NC101 (5 en 1)", "US$149–$179 · 2–3 bolas (16 oz)", "24h congelación + 2 min", "4.5\"×4.6\" por vaso", "Vasos exclusivos Breeze NC100/NC200", "Ninja Breeze NC101 + Pack Pintas Breeze"),
        ("ninja-swirl-nc701", "Ninja Swirl by CREAMi NC701 Soft Serve", "US$299–$349 · 3–4 conos/bolas (16 oz)", "24h congelación + 3 min extrusión", "4.5\"×5.8\" vaso con boquilla", "Vasos exclusivos Swirl NC700/NC701", "Ninja Swirl NC701 + Plancha Conos Waffle"),
        ("ninja-slushi-fs301", "Ninja SLUSHi FS301 Granizados y Frappés", "US$299–$349 · 6–8 vasos (88 oz)", "0h freezer + 15–45 min compresor", "0 cm³ en el congelador", "Vasos térmicos y accesorios barra", "Ninja SLUSHi FS301 + Ninja Deluxe NC501"),
        ("cuisinart-ice-30bc", "Cuisinart ICE-30BC Pure Indulgence 2.0 Qt", "US$89–$109 · 8–10 bolas (2.0 Qt)", "24h tazón + 25 min batido", "Grande: 8.3\"×7.0\" en freezer", "Tazón extra ICE-30RFB 2.0 Qt", "Cuisinart ICE-30BC + Tazón Extra ICE-30RFB"),
        ("cuisinart-ice-70p1", "Cuisinart ICE-70P1 Digital LCD 3 Velocidades", "US$119–$139 · 8–10 bolas (2.0 Qt)", "24h tazón + 20–30 min LCD", "Grande: 8.3\"×7.0\" en freezer", "Tazón extra ICE-70RFB / ICE-30RFB", "Cuisinart ICE-70P1 + Botes SUMO 1.5 Qt"),
        ("cuisinart-ice-45p1", "Cuisinart ICE-45P1 Mix It In Soft Serve", "US$99–$129 · 6–8 conos (1.5 Qt)", "24h tazón + 20–25 min", "Medio: 7.5\"×6.2\" en freezer", "Tazón extra 1.5 Qt + Porta-conos", "Cuisinart ICE-45P1 + Plancha de Barquillos"),
        ("cuisinart-ice-48", "Cuisinart ICE-48 Soft Serve con Calentador", "US$129–$149 · 6–8 conos (1.5 Qt)", "24h tazón + 20–25 min", "Medio: 7.5\"×6.2\" en freezer", "Tazón 1.5 Qt + Conos Waffle", "Cuisinart ICE-48 + Salsa Fudge + Conos"),
        ("cuisinart-ice-60w", "Cuisinart ICE-60W Cool Creations 2.0 Qt", "US$99–$119 · 8–10 bolas (2.0 Qt)", "24h tazón + 20 min", "Grande: 8.3\"×7.0\" en freezer", "Tazón extra ICE-30RFB 2.0 Qt", "Cuisinart ICE-60W + Contenedor Tovolo"),
        ("cuisinart-ice-31", "Cuisinart ICE-31 Fruit Scoop Sorbetes", "US$79–$99 · 6–8 bolas (1.5 Qt)", "24h tazón + 18–25 min", "Medio: 7.5\"×6.2\" en freezer", "Paleta trituradora fruta + Tazón 1.5 Qt", "Cuisinart ICE-31 + Contenedores SUMO"),
        ("cuisinart-fast-freeze-ice-m10", "Cuisinart Fast-Freeze Individual 16 oz", "US$49–$65 · 2–3 bolas (16 oz)", "12–16h taza + 18 min", "Pequeño: 1 pinta en freezer", "Cuchara Zeroll + Tapa hermética", "Cuisinart Fast-Freeze + Cuchara Zeroll"),
        ("whynter-icm-200ls", "Whynter ICM-200LS Compresor 2.1 Qt", "US$289–$329 · 8–12 bolas (2.1 Qt)", "0h espera + 45–55 min", "0 cm³ en congelador", "Cubeta extra acero inoxidable 2.1 Qt", "Whynter ICM-200LS + Contenedor Tovolo"),
        ("whynter-icm-201sb", "Whynter ICM-201SB Compresor Vertical 2.1 Qt", "US$299–$339 · 8–12 bolas (2.1 Qt)", "0h espera + 45–55 min", "0 cm³ en congelador", "Cubeta vertical 2.1 Qt + Botes SUMO", "Whynter ICM-201SB + Termómetro Digital"),
        ("whynter-icm-15ls", "Whynter ICM-15LS Compresor Compacto 1.6 Qt", "US$239–$269 · 6–8 bolas (1.6 Qt)", "0h espera + 40–50 min", "0 cm³ en congelador", "Cubeta aluminio anodizado 1.6 Qt", "Whynter ICM-15LS + Cuchara Zeroll"),
        ("breville-bci600xl-smart-scoop", "Breville BCI600XL Smart Scoop 12 Durezas", "US$449–$499 · 6 bolas gourmet (1.5 Qt)", "0h freezer + 40 min (-30 °C)", "0 cm³ en congelador", "Cubeta Breville 1.5 Qt + Paleta", "Breville Smart Scoop + Pasta Pistacho"),
        ("kitchenaid-ksmicm", "KitchenAid KSMICM Accesorio Batidora 2.0 Qt", "US$79–$99 · 8–10 bolas (2.0 Qt)", "16–24h tazón + 25 min", "Grande: 8.5\"×7.0\" en freezer", "Adaptador impulsor KitchenAid 4.5–6 Qt", "KitchenAid KSMICM + Botes Tovolo"),
        ("dash-my-pint", "Dash My Pint Eléctrica Individual 1.6 Tazas", "US$24–$29 · 1–2 porciones", "12–24h taza + 20–25 min", "Mínimo: 5.5\"×5.0\" en freezer", "Cuchara incluida + Botes pequeños", "Dash My Pint + Goma Guar + Cuchara"),
        ("dash-my-mug", "Dash My Mug Máquina Helado en Taza Térmica", "US$26–$34 · 1–2 porciones", "12–24h taza + 20 min", "Mínimo: entra en puerta freezer", "Tapas de silicona para taza", "Dash My Mug + Alulosa Pura"),
        ("hamilton-beach-68330n-4qt", "Hamilton Beach 68330N 4.0 Qt Hielo y Sal", "US$45–$59 · 16–20 bolas (4.0 Qt)", "0h freezer + 35 min con hielo/sal", "0 cm³ previos en congelador", "Sal gruesa heladera + Botes SUMO", "Hamilton Beach 4 Qt + Botes SUMO"),
        ("nostalgia-4qt-cubo-madera", "Nostalgia 4.0 Qt Cubo Madera Retro Eléctrica", "US$59–$79 · 16–20 bolas (4.0 Qt)", "0h freezer + 35–45 min hielo/sal", "0 cm³ previos en congelador", "Tapa hermética cubo + Sal roca", "Nostalgia 4 Qt + Plancha Conos"),
    ]
    s1_angles = [
        ("resena-precio-porciones-y-tiempo", "Reseña en Amazon: Precio, Porciones, Tiempo y Espacio en Freezer", "editorial review showing machine, frozen dessert bowls and tape measure"),
        ("opiniones-espacio-congelador-y-uso-diario", "Opiniones Reales para Uso Diario y Congeladores Domésticos", "realistic apartment kitchen setup testing homemade ice cream scoop consistency"),
        ("compatibilidad-vasos-tazones-y-repuestos", "Compatibilidad de Vasos, Tapas, Paletas y Repuestos Oficiales", "close-up showing compatible replacement pints, lids and freezer bowls beside machine"),
        ("recetas-y-rendimiento-en-helados-y-sorbetes", "Rendimiento en Helados Cremosos, Gelatos y Sorbetes Caseros", "vibrant creamy gelato and fruit sorbet bowls plated next to the maker"),
        ("vale-la-pena-comprar-en-amazon-usa", "¿Vale la Pena Comprar en Amazon EE. UU.? Ventajas y Desventajas", "clean Amazon kitchen delivery setup with ice cream scoop and freezer tubs"),
    ]
    # 22 models * 5 angles = 110; + 4 flagships = 114; add 1 extra = 115!
    for m_slug, m_name, ps, pt, fs, cs, pk in s1_models:
        for a_suf, a_label, a_vis in s1_angles:
            sl = f"{m_slug}-{a_suf}"
            ti = f"{m_name}: {a_label}"
            items.append((sl, ti, "resenas-maquinas-de-helado", f"{m_name} {a_suf}".replace("-", " "), ps, pt, fs, cs, pk, f"{m_name} {a_vis}"))
    items.append((
        "cuisinart-ice-21-vs-modelos-retro-nostalgia-y-hamilton-beach",
        "Cuisinart ICE-21 vs Heladeras de Hielo y Sal de 4 Qt: Qué Conviene Más en Amazon",
        "resenas-maquinas-de-helado",
        "cuisinart ice 21 vs heladeras cubo hielo y sal 4 qt",
        "US$49 – US$79 · 6–8 bolas (1.5 Qt) vs 16–20 bolas (4.0 Qt)",
        "24h tazón (20 min batido) vs 0h espera (35 min hielo + sal)",
        "7.5\"×6.2\" en freezer vs 0 cm³ previos en congelador",
        "Tazón ICE-21RFB vs Sal gruesa y botes herméticos",
        "Cuisinart ICE-21P1 + Hamilton Beach 4 Qt + Botes SUMO",
        "comparison between a compact white Cuisinart freezer-bowl maker and a 4-quart bucket ice cream maker on wood",
    ))

    # -------------------------------------------------------------------------
    # SILO 2: comparativas-maquinas-de-helado (110)
    # -------------------------------------------------------------------------
    s2_flagships = [
        (
            "ninja-creami-nc301-vs-cuisinart-ice-21-comparativa-completa",
            "Ninja CREAMi NC301 vs Cuisinart ICE-21: Comparativa Completa de Precio, Porciones y Freezer",
            "US$179–$199 (Ninja) vs US$69–$79 (Cuisinart)",
            "24h + 2 min (Ninja) vs 24h + 20 min (Cuisinart)",
            "Vasos 4.4\"×4.5\" (Ninja) vs Tazón 7.5\"×6.2\" (Cuisinart)",
            "Vasos 16 oz NC299/300/301 vs Tazón ICE-21RFB",
            "Ninja CREAMi NC301 + Cuisinart ICE-21P1 + Vasos 16 oz",
            "side-by-side comparison of Ninja pint maker and Cuisinart 1.5-quart bowl maker with two scoops of vanilla ice cream",
        ),
    ]
    for sl, ti, ps, pt, fs, cs, pk, sj in s2_flagships:
        items.append((sl, ti, "comparativas-maquinas-de-helado", sl.replace("-", " "), ps, pt, fs, cs, pk, sj))

    vs_pairs = [
        ("ninja-creami-nc301", "Ninja CREAMi NC301", "ninja-creami-deluxe-nc501", "Ninja CREAMi Deluxe NC501", "US$179 vs US$229 · 16 oz (2–3 bolas) vs 24 oz (4–5 bolas)", "24h + 2 min vs 24h + 3 min dual", "4.4\"×4.5\" vs 4.7\"×5.7\" en freezer", "Vasos 16 oz NO sirven en 24 oz Deluxe"),
        ("ninja-creami-nc301", "Ninja CREAMi NC301", "ninja-creami-nc300", "Ninja CREAMi NC300", "US$189 vs US$169 · Ambas 16 oz (2–3 bolas)", "24h + 2 min (7 vs 5 programas)", "Idéntico: 4.4\"×4.5\" en freezer", "Comparten exactamente mismos vasos 16 oz"),
        ("ninja-creami-nc301", "Ninja CREAMi NC301", "ninja-creami-nc299amz", "Ninja CREAMi NC299AMZ", "US$189 vs US$159 · 2 pintas vs 1 pinta en caja", "Idéntico 24h + 2 min (7 programas)", "Idéntico: 4.4\"×4.5\" en freezer", "100% compatibles mismos vasos 16 oz"),
        ("ninja-creami-nc301", "Ninja CREAMi NC301", "ninja-creami-breeze-nc201", "Ninja CREAMi Breeze NC201", "US$189 vs US$179 · Ambas 16 oz", "24h + 2 min (tapa exterior vs sin tapa)", "4.4\"×4.5\" vs 4.5\"×4.6\" en freezer", "Vasos incompatibles: Breeze usa pintas propias"),
        ("ninja-creami-deluxe-nc501", "Ninja Deluxe NC501", "ninja-swirl-nc701", "Ninja Swirl NC701", "US$229 (24 oz XL) vs US$329 (16 oz Soft Serve)", "24h + 3 min vs extrusión en cono", "4.7\"×5.7\" vs 4.5\"×5.8\" con boquilla", "Vasos incompatibles entre NC501 y NC701"),
        ("ninja-creami-deluxe-nc501", "Ninja Deluxe NC501", "cuisinart-ice-30bc", "Cuisinart ICE-30BC", "US$229 (4–5 bolas) vs US$99 (8–10 bolas)", "24h + 3 min vs 24h + 25 min batido", "Vasos 4.7\"×5.7\" vs Tazón 8.3\"×7.0\"", "Vasos 24 oz XL vs Tazón ICE-30RFB"),
        ("ninja-creami-deluxe-nc501", "Ninja Deluxe NC501", "cuisinart-ice-100", "Cuisinart ICE-100 Compresor", "US$229 vs US$289 · 4–5 bolas vs 6–8 continuas", "24h freezer vs 0h espera (45 min)", "4.7\"×5.7\" vs 0 cm³ en congelador", "Vasos XL 24 oz vs Cubeta compresor"),
        ("ninja-creami-nc301", "Ninja CREAMi NC301", "cuisinart-ice-100", "Cuisinart ICE-100 Compresor", "US$189 vs US$289 · Fit/Keto vs Gelato al instante", "24h + 2 min vs 0h + 45 min", "4.4\"×4.5\" vs 0 cm³ en congelador", "Pintas 16 oz vs Contenedores Tovolo"),
        ("cuisinart-ice-21", "Cuisinart ICE-21", "cuisinart-ice-30bc", "Cuisinart ICE-30BC", "US$69 (1.5 Qt / 6–8 bolas) vs US$99 (2.0 Qt / 8–10 bolas)", "24h + 20 min vs 24h + 25 min", "7.5\"×6.2\" vs 8.3\"×7.0\" en freezer", "Tazón ICE-21RFB vs Tazón ICE-30RFB"),
        ("cuisinart-ice-21", "Cuisinart ICE-21", "cuisinart-ice-70p1", "Cuisinart ICE-70P1 LCD", "US$69 vs US$129 · Manual 1 botón vs 3 velocidades LCD", "24h + 20 min vs 24h + 20–30 min", "7.5\"×6.2\" vs 8.3\"×7.0\" en freezer", "ICE-21RFB vs ICE-70RFB / ICE-30RFB"),
        ("cuisinart-ice-30bc", "Cuisinart ICE-30BC", "cuisinart-ice-70p1", "Cuisinart ICE-70P1 LCD", "US$99 vs US$129 · Ambas 2.0 Qt (8–10 bolas)", "24h + 25 min vs temporizador digital", "Idéntico: 8.3\"×7.0\" en freezer", "Ambas compatibles con tazón ICE-30RFB"),
        ("cuisinart-ice-30bc", "Cuisinart ICE-30BC", "cuisinart-ice-60w", "Cuisinart ICE-60W", "US$99 vs US$109 · Ambas 2.0 Qt", "1 botón vs 3 botones gelato/sorbet", "8.3\"×7.0\" en congelador", "Tazón ICE-30RFB / ICE-60RFB"),
        ("cuisinart-ice-21", "Cuisinart ICE-21", "cuisinart-ice-100", "Cuisinart ICE-100 Compresor", "US$69 vs US$289 · Tazón congelador vs Compresor", "24h espera + 20m vs 0h + 45m", "7.5\"×6.2\" en freezer vs 0 cm³", "Tazón ICE-21RFB vs Cubeta ICE-100"),
        ("cuisinart-ice-100", "Cuisinart ICE-100", "whynter-icm-200ls", "Whynter ICM-200LS", "US$289 (1.5 Qt) vs US$309 (2.1 Qt)", "0h + 45 min vs 0h + 50 min", "Ambas 0 cm³ en congelador", "Cubeta ICE-100 vs Cubeta Whynter 2.1 Qt"),
        ("cuisinart-ice-100", "Cuisinart ICE-100", "breville-bci600xl", "Breville Smart Scoop", "US$289 vs US$479 · 2 paletas vs 12 durezas", "0h + 45 min vs pre-cool -30 °C", "Ambas 0 cm³ en congelador", "Cubeta Cuisinart vs Cubeta Breville"),
        ("whynter-icm-200ls", "Whynter ICM-200LS", "whynter-icm-201sb", "Whynter ICM-201SB Vertical", "US$309 vs US$319 · Ambas 2.1 Qt", "0h + 45–55 min", "Ambas 0 cm³ (vertical ahorra encimera)", "Cubetas Whynter 2.1 Qt"),
        ("cuisinart-ice-30bc", "Cuisinart ICE-30BC", "kitchenaid-ksmicm", "KitchenAid KSMICM 2.0 Qt", "US$99 máquina completa vs US$89 accesorio", "24h + 25 min", "8.3\"×7.0\" vs 8.5\"×7.0\" en freezer", "ICE-30RFB vs Adaptador KitchenAid"),
        ("ninja-creami-nc301", "Ninja CREAMi NC301", "kitchenaid-ksmicm", "KitchenAid KSMICM", "US$189 vs US$89 (si ya tienes batidora)", "24h + 2 min vs 24h + 25 min", "Vaso 4.4\"×4.5\" vs Tazón 8.5\"×7.0\"", "Pintas 16 oz vs Tazón KitchenAid 2 Qt"),
        ("ninja-creami-nc301", "Ninja CREAMi NC301", "dash-my-pint", "Dash My Pint Individual", "US$189 vs US$27 · Potencia 800W vs básica", "24h + 2 min vs 24h + 22 min", "4.4\"×4.5\" vs 5.5\"×5.0\" en freezer", "Pintas 16 oz vs Taza individual Dash"),
        ("cuisinart-ice-21", "Cuisinart ICE-21", "dash-my-pint", "Dash My Pint", "US$69 (1.5 Qt) vs US$27 (1.6 tazas)", "24h + 20 min vs 16h + 22 min", "7.5\"×6.2\" vs 5.5\"×5.0\" en freezer", "ICE-21RFB vs Taza Dash"),
        ("ninja-swirl-nc701", "Ninja Swirl NC701", "cuisinart-ice-45p1", "Cuisinart ICE-45P1 Soft Serve", "US$329 vs US$109 · Conos CREAMi vs Soft Serve", "24h + 3m vs 24h + 22m", "4.5\"×5.8\" vs 7.5\"×6.2\" en freezer", "Vasos Swirl NC701 vs Tazón 1.5 Qt"),
        ("ninja-creami-deluxe-nc501", "Ninja Deluxe NC501", "ninja-slushi-fs301", "Ninja SLUSHi FS301", "US$229 (helado + slushi) vs US$329 (granizados)", "24h freezer vs 0h compresor", "4.7\"×5.7\" vs 0 cm³ en freezer", "Vasos 24 oz vs Jarra 88 oz"),
        ("cuisinart-ice-21", "Cuisinart ICE-21", "whynter-icm-15ls", "Whynter ICM-15LS Compresor", "US$69 vs US$249 · Tazón vs Compresor 1.6 Qt", "24h espera vs 0h espera", "7.5\"×6.2\" vs 0 cm³ en freezer", "ICE-21RFB vs Cubeta 1.6 Qt"),
        ("ninja-creami-nc301", "Ninja CREAMi NC301", "whynter-icm-200ls", "Whynter ICM-200LS", "US$189 (2–3 bolas) vs US$309 (8–12 bolas)", "24h + 2m vs 0h + 50m", "4.4\"×4.5\" vs 0 cm³ en freezer", "Pintas 16 oz vs Cubeta acero 2.1 Qt"),
        ("cuisinart-ice-21", "Cuisinart ICE-21", "cuisinart-ice-31", "Cuisinart ICE-31 Fruit Scoop", "US$69 vs US$89 · Paleta estándar vs fruta", "24h + 20 min", "7.5\"×6.2\" en congelador", "Tazones 1.5 Qt compatibles entre sí"),
        ("ninja-creami-nc300", "Ninja CREAMi NC300", "cuisinart-ice-30bc", "Cuisinart ICE-30BC", "US$169 (16 oz) vs US$99 (2.0 Qt)", "24h + 2m vs 24h + 25m", "4.4\"×4.5\" vs 8.3\"×7.0\"", "Pintas 16 oz vs Tazón ICE-30RFB"),
        ("cuisinart-ice-70p1", "Cuisinart ICE-70P1", "cuisinart-ice-100", "Cuisinart ICE-100", "US$129 (tazón 2 Qt) vs US$289 (compresor 1.5 Qt)", "24h espera vs 0h espera", "8.3\"×7.0\" vs 0 cm³ en freezer", "ICE-70RFB vs Cubeta ICE-100"),
    ]
    vs_focuses = [
        ("precio-porciones-y-espacio", "Precio, Porciones y Espacio en Congelador"),
        ("gelato-sorbetes-y-helado-fit", "Textura en Gelatos, Sorbetes y Helado Fit"),
        ("tiempo-de-preparacion-y-ruido", "Tiempo Total de Preparación y Ruido"),
        ("vasos-tazones-y-repuestos-compatibles", "Vasos, Tazones y Repuestos Compatibles"),
    ]
    # 27 pairs * 4 = 108; + 1 flagship = 109; add 1 brand roundup = 110!
    for a_sl, a_nm, b_sl, b_nm, ps, pt, fs, cs in vs_pairs:
        for f_suf, f_lbl in vs_focuses:
            sl = f"{a_sl}-vs-{b_sl}-{f_suf}"
            ti = f"{a_nm} vs {b_nm}: {f_lbl}"
            items.append((
                sl, ti, "comparativas-maquinas-de-helado",
                f"{a_nm} vs {b_nm} {f_lbl}".lower(),
                ps, pt, fs, cs, f"{a_nm} vs {b_nm}",
                f"split kitchen counter comparison between {a_nm} and {b_nm} beside frozen ice cream bowls and measuring spoons",
            ))
    items.append((
        "ninja-vs-cuisinart-vs-whynter-vs-breville-que-marca-elegir",
        "Ninja vs Cuisinart vs Whynter vs Breville: Qué Marca de Heladera Elegir en Amazon",
        "comparativas-maquinas-de-helado",
        "ninja vs cuisinart vs whynter vs breville cual elegir",
        "Desde US$69 (Cuisinart) hasta US$479 (Breville)",
        "2 min spin (Ninja) · 20 min tazón (Cuisinart) · 45 min compresor",
        "4.4\" pintas · 7.5\" tazones · 0 cm³ compresores",
        "Pintas 16/24 oz Ninja · Tazones ICE-21/30RFB · Cubetas acero",
        "Ninja NC301 + Cuisinart ICE-21P1 + Cuisinart ICE-100",
        "four different style home ice cream makers lined up across a modern marble island with scoops of vanilla, mango and pistachio",
    ))

    # -------------------------------------------------------------------------
    # SILO 3: maquinas-por-precio-porciones-y-espacio (95)
    # -------------------------------------------------------------------------
    s3_criteria = [
        ("menos-de-40-dolares", "por Menos de US$40", "US$24 – US$39 · 1–2 porciones", "16h + 20 min", "Mínimo (5.5\"×5.0\")", "Tazas Dash + Cuchara Zeroll", "Dash My Pint + Dash My Mug"),
        ("menos-de-80-dolares", "por Menos de US$80", "US$49 – US$79 · 6–8 porciones", "24h + 20 min", "Medio (7.5\"×6.2\")", "Tazón extra ICE-21RFB", "Cuisinart ICE-21P1 + Hamilton Beach 4 Qt"),
        ("entre-100-y-200-dolares", "entre US$100 y US$200", "US$99 – US$199 · 2–10 porciones", "24h + 2–25 min", "4.4\" pinta a 8.3\" tazón", "Vasos 16 oz o Tazón ICE-30RFB", "Ninja NC301 + Cuisinart ICE-30BC"),
        ("entre-200-y-350-dolares", "entre US$200 y US$350", "US$219 – US$349 · XL o Compresor", "24h + 3m o 0h + 45m", "4.7\" XL o 0 cm³ freezer", "Vasos XL 24 oz o Cubeta ICE-100", "Ninja Deluxe NC501 + Cuisinart ICE-100"),
        ("gama-alta-compresor", "de Gama Alta con Compresor", "US$289 – US$499 · 6–12 porciones", "0h espera + 40–50 min", "0 cm³ en congelador", "Cubetas acero extra + Botes Tovolo", "Cuisinart ICE-100 + Whynter ICM-200LS + Breville"),
        ("congelador-pequeno-apartamento", "para Congelador Pequeño o Mini-Fridge", "US$27 – US$199 · 1–3 porciones", "16–24h + 2–22 min", "Solo 4.4\"×4.5\" o 5.5\"×5.0\"", "Vasos 16 oz individuales o Dash", "Ninja NC301 + Dash My Pint"),
        ("sin-espacio-en-congelador", "Sin Espacio en el Congelador (0 cm³)", "US$49 – US$339 · 6–20 porciones", "0h pre-congelado (35–50 min)", "0 cm³ dentro del congelador", "Contenedores Tovolo para guardar sobrante", "Cuisinart ICE-100 + Whynter ICM-201SB"),
        ("una-persona-o-parejas", "para 1 Persona o Parejas (1–3 Bolas)", "US$27 – US$199 · 16 oz exactos", "24h + 2 min", "4.4\"×4.5\" en cualquier hueco", "Pack 4 Vasos 16 oz NC301 + Fundas", "Ninja NC301 + Cuisinart Fast-Freeze"),
        ("familias-4-a-6-personas", "para Familias de 4 a 6 Personas", "US$69 – US$249 · 4–10 porciones", "24h + 3–25 min", "4.7\"×5.7\" XL o 8.3\"×7.0\" tazón", "Vasos XL 24 oz o Tazón ICE-30RFB", "Ninja Deluxe NC501 + Cuisinart ICE-30BC"),
        ("fiestas-y-reuniones-grandes", "para Fiestas y Reuniones (10+ Invitados)", "US$49 – US$329 · 8–20 bolas/lote", "0h espera o tazón doble", "0 cm³ (compresor) o cubo 4 Qt", "Tazón extra + Botes SUMO 1.5 Qt", "Whynter ICM-200LS + Hamilton Beach 4 Qt"),
        ("helado-rapido-sin-esperar-24h", "Rápidas Sin Esperar 24 Horas de Pre-Congelado", "US$269 – US$479 · Lotes seguidos", "0h espera + 40–50 min", "0 cm³ en freezer", "Cubetas de acero + Contenedores Tovolo", "Cuisinart ICE-100 + Whynter ICM-200LS"),
        ("silenciosas-cocina-abierta", "Silenciosas para Cocinas de Departamento", "US$69 – US$299 · Bajo ruido", "20–45 min continuos", "Tazón 7.5\" o Compresor", "Alfombrilla silicona + Tazón ICE-21RFB", "Cuisinart ICE-21P1 + Cuisinart ICE-70P1"),
        ("faciles-de-limpiar-lavavajillas", "Más Fáciles de Limpiar (Aptas Lavavajillas)", "US$69 – US$249 · Piezas desmontables", "Limpieza en 2 min", "Vasos apilables o tazón liso", "Vasos BPA-Free + Cepillo suave", "Cuisinart ICE-21P1 + Ninja NC301"),
        ("con-batidora-kitchenaid-en-casa", "Para Quienes Ya Tienen Batidora KitchenAid", "US$79 – US$99 · 8–10 porciones", "16–24h tazón + 25 min", "8.5\"×7.0\" en congelador", "Accesorio KSMICM 2 Qt + Tovolo", "KitchenAid KSMICM + Tovolo Glide-A-Scoop"),
        ("ahorrar-dinero-frente-a-heladeria", "Para Ahorrar Dinero Frente a Pintas de Supermercado", "US$69 – US$189 · <US$1.50 por pinta", "24h + 2–20 min", "4.4\" a 7.5\" en freezer", "Pack 4 Vasos 16 oz + Goma Guar", "Cuisinart ICE-21P1 + Ninja NC301"),
        ("principiantes-primer-equipo", "Para Principiantes: Tu Primera Máquina de Helado", "US$69 – US$189 · 1 botón", "24h + 2–20 min", "7.5\" tazón o 4.4\" vaso", "Recetario base + Cuchara térmica", "Cuisinart ICE-21P1 + Ninja NC299AMZ"),
        ("regalo-cocina-amazon", "Para Regalo Original de Cocina en Amazon", "US$69 – US$249 · Diseño atractivo", "Fácil uso desde el día 1", "Compacto encimera y freezer", "Pack vasos extra + Plancha barquillos", "Ninja NC301 + Ninja Deluxe NC501"),
        ("cocinas-con-poca-encimera", "Para Encimeras Pequeñas (Ancho Estrecho)", "US$27 – US$319 · Base compacta", "2–45 min", "Vaso 4.4\" o vertical estrecho", "Vasos apilables + Whynter vertical", "Ninja NC301 + Whynter ICM-201SB"),
        ("segunda-residencia-rv-verano", "Portátiles para Casa de Playa o Verano", "US$45 – US$99 · Ligeras", "16h o hielo + sal 35m", "Mínimo o sin freezer", "Contenedores herméticos SUMO", "Cuisinart ICE-21P1 + Hamilton Beach 4 Qt"),
    ]
    s3_variants = [
        ("mejores-maquinas-helado", "Mejores Máquinas de Helado"),
        ("ranking-calidad-precio", "Ranking Calidad-Precio en Amazon"),
        ("modelos-ninja-vs-cuisinart", "Comparativa Ninja vs Cuisinart"),
        ("guia-compra-medidas-y-porciones", "Guía de Compra, Medidas y Porciones"),
        ("errores-y-recomendacion-amazon", "Qué Modelo Elegir en Amazon EE. UU."),
    ]
    # 19 * 5 = 95!
    for c_sl, c_lbl, ps, pt, fs, cs, pk in s3_criteria:
        for v_sl, v_lbl in s3_variants:
            sl = f"{v_sl}-{c_sl}"
            ti = f"{v_lbl} {c_lbl} en Amazon"
            items.append((
                sl, ti, "maquinas-por-precio-porciones-y-espacio",
                f"{v_lbl} {c_lbl}".lower(),
                ps, pt, fs, cs, pk,
                f"curated kitchen selection showing ice cream makers suited {c_lbl} with frozen dessert bowls and scoop",
            ))

    # -------------------------------------------------------------------------
    # SILO 4: vasos-tapas-y-recipientes-compatibles (90)
    # -------------------------------------------------------------------------
    s4_flagships = [
        (
            "mejores-vasos-tapas-compatibles-ninja-creami-amazon",
            "Mejores Vasos y Tapas Compatibles para Ninja CREAMi en Amazon (16 oz vs 24 oz)",
            "US$19 – US$32 por pack de 4 vasos + tapas",
            "Congela 4 sabores a la vez (rotación semanal sin esperas)",
            "4.4\"×4.5\" (16 oz NC301) · 4.7\"×5.7\" (24 oz NC501)",
            "Verifica 4 muescas base (NC299/300/301) vs XL Deluxe (NC500/501)",
            "Pack 4 Vasos 16 oz NC301 + Pack 4 Vasos XL 24 oz + Fundas Neopreno",
            "four colorful snap-lid BPA-free pint ice cream containers lined up on quartz counter ready for freezing",
        ),
    ]
    for sl, ti, ps, pt, fs, cs, pk, sj in s4_flagships:
        items.append((sl, ti, "vasos-tapas-y-recipientes-compatibles", sl.replace("-", " "), ps, pt, fs, cs, pk, sj))

    s4_items = [
        ("vasos-16-oz-ninja-nc301-nc300-nc299", "Vasos y Tapas 16 oz para Ninja NC301 / NC300 / NC299AMZ", "US$19–$26 (Pack 4) · 2–3 bolas c/u", "4 sabores listos en freezer", "4.4\"×4.5\" por vaso", "Solo serie NC299 / NC300 / NC301 / CN301CO"),
        ("vasos-xl-24-oz-ninja-deluxe-nc501", "Vasos XL 24 oz para Ninja CREAMi Deluxe NC501 / NC500", "US$24–$32 (Pack 4) · 4–5 bolas c/u", "Rotación semanal familiar", "4.7\"×5.7\" por vaso XL", "Exclusivo NC500 / NC501 / CN501CO"),
        ("vasos-ninja-breeze-nc201-nc101", "Vasos y Tapas para Ninja CREAMi Breeze NC201 / NC101", "US$21–$28 (Pack 4) · 16 oz", "Acoplamiento directo sin tapa ext.", "4.5\"×4.6\" por vaso Breeze", "Exclusivo Breeze NC100 / NC101 / NC200 / NC201"),
        ("vasos-boquilla-ninja-swirl-nc701", "Vasos con Boquilla para Ninja Swirl NC701 Soft Serve", "US$26–$34 · 16 oz extrusión", "Servicio directo en cono", "4.5\"×5.8\" estante vertical", "Exclusivo Ninja Swirl NC700 / NC701"),
        ("cuchilla-creamerizer-ninja-nc301-nc501", "Cuchilla Creamerizer de Repuesto Ninja (NC301 vs NC501)", "US$16–$25 · Acero inoxidable", "Reemplazo en 5 segundos", "0 cm³ en freezer", "Elegir variante exacta NC301 vs NC501"),
        ("tapa-exterior-outer-bowl-ninja-creami", "Tapa Exterior y Bowl Sujetador para Ninja CREAMi", "US$24–$38 · Conjunto completo", "Soluciona atascos de eje y sellado", "0 cm³ en freezer", "Verificar código NC301 vs NC501"),
        ("juntas-sellos-silicona-ninja-creami", "Juntas de Silicona y Anillos de Repuesto para Tapa Ninja", "US$8–$13 (Pack repuesto)", "Previene fugas y mal olor", "0 cm³ en freezer", "Juntas compatibles tapa exterior"),
        ("fundas-neopreno-pintas-16-24-oz", "Fundas Térmicas de Neopreno para Vasos 16 oz y 24 oz", "US$12–$16 (Pack 4)", "Aíslan la mano y reducen goteo", "0 cm³ (se guardan fuera)", "Talla 16 oz (NC301) y 24 oz (NC501)"),
        ("tazon-congelador-cuisinart-ice-21rfb", "Tazón Congelador Repuesto Cuisinart ICE-21RFB (1.5 Qt)", "US$29–$35 · 6–8 bolas extra", "2 lotes seguidos en 40 min", "7.5\"×6.2\" en congelador", "Compatible ICE-21, ICE-21P1, ICE-20"),
        ("tazon-congelador-cuisinart-ice-30rfb", "Tazón Congelador Repuesto Cuisinart ICE-30RFB (2.0 Qt)", "US$34–$42 · 8–10 bolas extra", "Duplica tandas familiares", "8.3\"×7.0\" en congelador", "Compatible ICE-30BC, ICE-60W, ICE-70P1"),
        ("paletas-mezcladoras-cuisinart-repuesto", "Paletas Mezcladoras de Repuesto Cuisinart (1.5 y 2.0 Qt)", "US$12–$19 · Raspado óptimo", "Recupera velocidad de congelación", "0 cm³", "Elegir ICE-21 vs ICE-30BC vs ICE-100"),
        ("tapa-transparente-cuisinart-repuesto", "Tapa Transparente con Boquilla para Cuisinart ICE-21 / ICE-30", "US$14–$22 · Encaje de giro", "Sustituye tapas agrietadas", "0 cm³", "Elegir diámetro 1.5 Qt vs 2.0 Qt"),
        ("cubeta-extra-cuisinart-ice-100", "Cubeta Extra Aluminio Anodizado para Cuisinart ICE-100", "US$35–$45 · 1.5 Qt", "Cambia de sabor al instante sin lavar", "0 cm³ en freezer", "Exclusiva Cuisinart ICE-100 Compresor"),
        ("cubeta-acero-whynter-icm-200ls", "Cubeta y Paleta Acero Inoxidable Whynter 2.1 Qt", "US$38–$49 · 2.1 Qt", "Tandas continuas en reuniones", "0 cm³ en freezer", "Exclusiva Whynter ICM-200LS / 201SB"),
        ("tazon-repuesto-kitchenaid-ksmicm", "Tazón Congelador Extra KitchenAid KSMICM (2.0 Qt)", "US$65–$85 · 8–10 bolas", "Lotes dobles en batidora de pie", "8.5\"×7.0\" en congelador", "Batidoras KitchenAid 4.5 Qt o mayores"),
        ("contenedores-termicos-tovolo-1-5-qt", "Contenedores Térmicos Tovolo Glide-A-Scoop (1.5 Qt)", "US$21–$25 · Perfil estrecho", "Evita cristales tras batir en Cuisinart", "4.5\"×11\"×3.8\" en freezer", "Ideal post-batido Cuisinart / Compresor"),
        ("botes-termicos-sumo-pack-2", "Botes Doble Pared SUMO 1.0 y 1.5 Qt (Pack 2)", "US$19–$26 · Apilables", "Guarda 2 sabores por lote de 2 Qt", "Apilables en estante", "Universales para cualquier heladera"),
        ("pintas-acero-inoxidable-ninja", "Vasos de Acero Inoxidable Compatibles vs Plástico Tritan", "US$29–$39 · Durabilidad extrema", "Congelación más rápida", "4.4\"×4.5\" (solo modelos válidos)", "Verificar compatibilidad antes de girar"),
    ]
    # 18 * 5 = 90? Wait: 1 flagship + 89 = 90! So 18 * 5 = 90 -> if we use 4 angles for the 18th item or 17*5 + 4 = 89 -> 1+89=90!
    s4_angles = [
        ("guia-compra-amazon", "Guía de Compra y Verificación en Amazon"),
        ("pack-ahorro-original-vs-compatible", "Original vs Compatible en Amazon EE. UU."),
        ("medidas-muescas-y-modelos-compatibles", "Medidas, Muescas y Modelos Compatibles"),
        ("cuantos-vasos-extra-necesitas-en-casa", "Cuántos Vasos o Tazones Extra Conviene Tener"),
        ("cuidados-lavavajillas-y-reemplazo", "Cuidados en Lavavajillas y Cuándo Reemplazar"),
    ]
    added_s4 = 0
    for it_sl, it_nm, ps, pt, fs, cs in s4_items:
        for a_sl, a_nm in s4_angles:
            if added_s4 >= 89:
                break
            sl = f"{it_sl}-{a_sl}"
            ti = f"{it_nm}: {a_nm}"
            items.append((
                sl, ti, "vasos-tapas-y-recipientes-compatibles",
                f"{it_nm} {a_nm}".lower(),
                ps, pt, fs, cs, it_nm,
                f"close-up studio product shot of {it_nm} with frozen lids and stainless steel ice cream scoop on marble",
            ))
            added_s4 += 1

    # -------------------------------------------------------------------------
    # SILO 5: maquinas-para-gelato-sorbete-y-soft-serve (55)
    # -------------------------------------------------------------------------
    s5_types = [
        ("gelato-italiano-denso", "Gelato Italiano Denso y Cremoso", "US$189–$479 · 2–8 porciones", "2 min (Ninja) o 45m (Compresor)", "4.4\" pinta o 0 cm³ compresor", "Paleta baja aireación ICE-100 / Pintas", "Cuisinart ICE-100 + Breville Smart Scoop"),
        ("sorbete-100-fruta-natural", "Sorbete 100% Fruta Natural Sin Lácteos", "US$69–$229 · 2–8 porciones", "24h + 2–20 min", "4.4\"–7.5\" en freezer", "Pintas 16 oz + Tazón ICE-21RFB", "Ninja CREAMi NC301 + Cuisinart ICE-21P1"),
        ("soft-serve-cono-en-casa", "Helado Suave Estilo Soft Serve en Cono", "US$109–$329 · 3–8 conos", "24h + 3–25 min", "4.5\"–7.5\" en freezer", "Vasos Swirl NC701 + Plancha Conos", "Ninja Swirl NC701 + Cuisinart ICE-45P1"),
        ("helado-proteico-y-fitness", "Helado Proteico Fit Bajo en Calorías", "US$179–$229 · 2–4 pintas", "24h + 2 min Re-Spin", "4.4\"×4.5\" mínimo freezer", "Pack 4 Pintas 16 oz + Goma Guar", "Ninja CREAMi NC301 + Ninja Deluxe NC501"),
        ("helado-keto-sin-azucar", "Helado Keto Sin Azúcar Añadida", "US$179–$289 · 2–8 bolas", "24h + 2–45 min", "4.4\" pinta o 0 cm³ compresor", "Alulosa Pura + Pintas 16 oz", "Ninja CREAMi NC301 + Alulosa Pura"),
        ("frozen-yogurt-casero", "Frozen Yogurt Griego Cremoso", "US$69–$229 · 2–8 porciones", "24h + 2–20 min", "4.4\"–7.5\" en freezer", "Pintas 16 oz / 24 oz + Tazón ICE-21", "Ninja Deluxe NC501 + Cuisinart ICE-21P1"),
        ("acai-bowls-y-smoothie-bowls", "Açaí Bowls y Smoothie Bowls Espesos", "US$179–$229 · 1–2 bowls/vaso", "24h + 2 min programa Bowl", "4.4\"×4.5\" en congelador", "Pack 4 Vasos 16 oz + Cucharas", "Ninja CREAMi NC301 + Ninja NC299AMZ"),
        ("granizados-slushi-y-cocteles", "Granizados Slushi, Frappés y Cócteles Helados", "US$219–$329 · 4–8 vasos", "0h (SLUSHi) o 24h (Deluxe)", "0 cm³ (FS301) o 4.7\" (NC501)", "Vasos XL 24 oz o Jarra 88 oz", "Ninja SLUSHi FS301 + Ninja Deluxe NC501"),
        ("helado-vegano-sin-lactosa", "Helado Vegano de Coco, Avena y Anacardos", "US$69–$289 · 2–8 bolas", "24h + 2–45 min", "4.4\" pinta a 0 cm³ compresor", "Goma Guar + Pintas 16 oz", "Ninja CREAMi NC301 + Cuisinart ICE-100"),
        ("nieves-de-garrafa-tradicionales", "Nieves Tradicionales y Helado de Leche Entera", "US$45–$109 · 6–20 bolas", "20–40 min batido tradicional", "7.5\" tazón o 0 cm³ cubo hielo", "Tazón ICE-30RFB + Contenedor Tovolo", "Cuisinart ICE-30BC + Hamilton Beach 4 Qt"),
        ("helado-artesanal-gourmet-con-trozos", "Helados Gourmet con Trozos Mix-Ins y Stracciatella", "US$69–$479 · 3–10 porciones", "2–45 min + ciclo Mix-In", "4.4\"–8.3\" o 0 cm³ compresor", "Pintas 16/24 oz + Contenedor Tovolo", "Ninja Deluxe NC501 + Breville Smart Scoop"),
    ]
    s5_angles = [
        ("mejores-maquinas-amazon", "Mejores Máquinas en Amazon EE. UU."),
        ("ninja-creami-vs-cuisinart", "Ninja CREAMi vs Cuisinart: Cuál Logra Mejor Textura"),
        ("con-compresor-vs-tazon", "Con Compresor vs Tazón Pre-Congelado"),
        ("cuantas-porciones-y-tiempo-toma", "Porciones Reales y Tiempo de Preparación"),
        ("kit-completo-vasos-e-ingredientes", "Kit Recomendado con Vasos y Estabilizantes"),
    ]
    # 11 * 5 = 55!
    for t_sl, t_nm, ps, pt, fs, cs, pk in s5_types:
        for a_sl, a_nm in s5_angles:
            sl = f"{t_sl}-{a_sl}"
            ti = f"{t_nm}: {a_nm}"
            items.append((
                sl, ti, "maquinas-para-gelato-sorbete-y-soft-serve",
                f"{t_nm} {a_nm}".lower(),
                ps, pt, fs, cs, pk,
                f"fresh homemade {t_nm} plated in chilled bowls next to a modern countertop ice cream maker",
            ))

    # -------------------------------------------------------------------------
    # SILO 6: ingredientes-bases-y-accesorios-heladeria (55)
    # -------------------------------------------------------------------------
    s6_flagships = [
        (
            "mejores-contenedores-termicos-guardar-helado-casero",
            "Mejores Contenedores Térmicos para Guardar Helado Casero Sin Cristales en Amazon",
            "US$19 – US$28 · Capacidad 1.0 a 1.5 Quart",
            "Transfiere al terminar el batido y conserva semanas",
            "Perfil estrecho 4.5\"×11\" (cabe en puerta o cajón)",
            "Tovolo Glide-A-Scoop 1.5 Qt · Botes SUMO · Tapas silicona",
            "Tovolo Glide-A-Scoop 1.5 Qt + Pack 2 Botes SUMO + Cuchara Zeroll",
            "sleek insulated slim ice cream storage tubs with silicone lids next to a polished thermal ice cream scoop",
        ),
    ]
    for sl, ti, ps, pt, fs, cs, pk, sj in s6_flagships:
        items.append((sl, ti, "ingredientes-bases-y-accesorios-heladeria", sl.replace("-", " "), ps, pt, fs, cs, pk, sj))

    s6_items = [
        ("alulosa-pura-granulada-helado-keto", "Alulosa Pura Granulada para Helados Suaves Sin Azúcar", "US$16–$24 (1–2 lb) · +25 pintas", "Mezcla en frío o caliente al instante", "0 cm³ (despensa seca)", "Compatible Ninja, Cuisinart y compresor"),
        ("goma-guar-alimentaria-estabilizante", "Goma Guar Alimentaria Pura Anti-Cristales para Helados", "US$9–$14 · Rinde +200 pintas", "Batir 15 s antes de congelar", "0 cm³ (despensa seca)", "Universal Ninja CREAMi y Cuisinart"),
        ("goma-xantana-vs-goma-guar-helados", "Goma Xantana vs Goma Guar para Helados Proteicos y Sorbetes", "US$9–$15 · Dosis 0.5 g por pinta", "Soluble en frío en batidora", "0 cm³ (despensa seca)", "Universal todo tipo de máquina"),
        ("leche-descremada-en-polvo-cuerpo", "Leche Descremada en Polvo (Solids) para Gelato Cremoso", "US$11–$18 · Aumenta cremosidad", "Disolver 1–2 cdas por base", "0 cm³ (despensa seca)", "Compatible Ninja, Cuisinart y Whynter"),
        ("pasta-pura-pistacho-siciliano-gelato", "Pasta Pura de Pistacho 100% para Gelato Artesanal", "US$18–$28 · 6–10 tandas", "Integrar en base tibia", "0 cm³", "Ideal Cuisinart ICE-100 y Ninja Gelato"),
        ("pasta-extracto-vainilla-madagascar", "Pasta de Vainilla Bourbon con Semillas Naturales", "US$16–$26 · +30 pintas", "Dosificar 1 cdta por lote", "0 cm³", "Universal para bases de vainilla"),
        ("cacao-holandes-alcalino-helado-chocolate", "Cacao Holandés Oscuro para Helado de Chocolate Intenso", "US$12–$19 · Color y sabor profundo", "Disolver en leche tibia", "0 cm³", "Ninja CREAMi, Cuisinart y compresor"),
        ("plancha-electrica-conos-barquillos-waffle", "Planchas para Conos y Barquillos Waffle Caseros", "US$39–$55 · 90 s por cono", "Hornea y enrolla en cono moldeador", "Almacenaje vertical en alacena", "Combinar con Cuisinart ICE-45 / Ninja Swirl"),
        ("cucharas-termicas-aluminio-zeroll", "Cucharas Térmicas de Aluminio Anticongelante (Zeroll)", "US$22–$26 · Bolas de 2 oz", "Sirve helado firme sin esfuerzo", "0 cm³ (cajón cubiertos)", "Ideal helado congelado a -18 °C"),
        ("bascula-precision-01g-estabilizantes", "Básculas de Precisión 0.1 g para Recetas y Estabilizantes", "US$12–$19 · Exactitud 0.1 g", "Pesa goma guar, sal y alulosa", "0 cm³", "Universal cocina y heladería"),
        ("termometro-digital-congelador-y-base", "Termómetros de Congelador y Sonda para Cremas Inglesas", "US$11–$18 · Rango -30 a 200 °C", "Verifica -18 °C y cocción a 82 °C", "Gancho compacto de estante", "Imprescindible Ninja / Cuisinart"),
        ("moldes-silicona-paletas-y-sandwiches", "Moldes de Silicona para Paletas y Sándwiches de Helado", "US$12–$18 · Con palitos", "Aprovecha mezcla sobrante", "Planos en cajón freezer", "Ideal post-batido Cuisinart 2 Qt"),
        ("tapas-silicona-organizador-mix-ins", "Frascos y Dispensadores para Toppings y Mix-Ins", "US$14–$22 · Chispas y frutos secos", "Mantienen trozos crujientes", "0 cm³", "Complemento bar de helados en casa"),
        ("jarabe-glucosa-dextrosa-gelato", "Dextrosa y Jarabe de Glucosa en Polvo para Gelato Suave", "US$13–$21 · Control punto congelación", "Reemplaza parte del azúcar común", "0 cm³ (despensa seca)", "Ideal compresores Cuisinart / Breville"),
        ("proteina-aislada-caseina-helado-fit", "Proteína Whey/Caseína Recomendada para Helados Cremosos", "US$29–$48 · Sin textura arenosa", "Batir con goma guar antes de congelar", "0 cm³", "Ideal Ninja CREAMi 16 oz / 24 oz"),
        ("chocolate-cobertura-stracciatella-chips", "Gotas de Chocolate Amargo para Stracciatella y Mix-Ins", "US$11–$19 · Fundido rápido", "Añadir en el último minuto de batido", "0 cm³", "Compatible Ninja Mix-In y Cuisinart"),
        ("alfombrilla-silicona-antideslizante-encimera", "Alfombrillas de Silicona Antivibración y Antigoteo", "US$12–$18 · Reduce ruido y charcos", "Colocar bajo base de máquina", "0 cm³", "Universal Ninja NC301/501 y Cuisinart"),
        ("recipiente-vidrio-vs-termo-almacenar", "Recipientes de Acero Doble Pared vs Silicona para Freezer", "US$20–$32 · Conservación larga", "Cero transferencia de olores", "Apilables en estante", "Lotes de 1.5 Qt y 2.0 Qt"),
    ]
    s6_angles = [
        ("mejores-amazon-estados-unidos", "Mejores Opciones en Amazon EE. UU."),
        ("como-usar-y-dosis-exacta", "Cómo Usar y Dosis Exactas por Pinta/Tazón"),
        ("comparativa-calidad-precio-y-marcas", "Comparativa de Marcas y Rendimiento"),
    ]
    # 18 * 3 = 54; + 1 flagship = 55!
    for it_sl, it_nm, ps, pt, fs, cs in s6_items:
        for a_sl, a_nm in s6_angles:
            sl = f"{it_sl}-{a_sl}"
            ti = f"{it_nm}: {a_nm}"
            items.append((
                sl, ti, "ingredientes-bases-y-accesorios-heladeria",
                f"{it_nm} {a_nm}".lower(),
                ps, pt, fs, cs, it_nm,
                f"artisanal ice cream making studio flat-lay highlighting {it_nm} beside frozen scoops and kitchen tools",
            ))

    assert len(items) == 520, f"Expected 520 transactional, got {len(items)}"
    return items


def generate_seo_1000():
    """
    Exactamente 1,000 artículos SEO informacionales y recetas sin canibalización:
    Silo 7 (135) + Silo 8 (130) + Silo 9 (140) + Silo 10 (125) + Silo 11 (125) + Silo 12 (120) + Silo 13 (115) + Silo 14 (110) = 1,000.
    Tupla: (slug, title, pillar, kw, focus_summary, visual_subject, recipe_data_or_None)
    """
    items = []

    # -------------------------------------------------------------------------
    # SILO 7: guia-compatibilidad-vasos-tazones-y-repuestos (135)
    # -------------------------------------------------------------------------
    s7_flagships = [(
        "guia-compatibilidad-vasos-tapas-ninja-creami-nc301-nc501-breeze-swirl",
        "Guía Exacta de Compatibilidad de Vasos y Tapas Ninja CREAMi (NC301 vs NC501 vs Breeze vs Swirl)",
        "guía de verificación técnica para identificar por código, volumen y muescas qué vasos y tapas encajan en cada serie Ninja CREAMi",
        "close-up overhead view of 16oz 4-notch Ninja CREAMi pints next to taller 24oz Deluxe pints and color-coded lids on marble",
    )]
    for sl, ti, fs, sj in s7_flagships:
        items.append((sl, ti, "guia-compatibilidad-vasos-tazones-y-repuestos", sl.replace("-", " "), fs, sj, None))

    s7_parts = [
        ("vasos-16-oz-serie-nc300-nc301-nc299amz", "Vasos de 16 oz (Serie NC299 / NC300 / NC301)"),
        ("vasos-xl-24-oz-serie-nc500-nc501-deluxe", "Vasos XL de 24 oz (Serie NC500 / NC501 Deluxe)"),
        ("vasos-ninja-breeze-nc100-nc200-nc201", "Vasos Ninja Breeze (NC100 / NC200 / NC201)"),
        ("vasos-ninja-swirl-nc700-nc701-boquilla", "Vasos Ninja Swirl Soft Serve (NC700 / NC701)"),
        ("tapas-hermeticas-almacenamiento-pintas", "Tapas Herméticas de Almacenamiento de Pintas"),
        ("tapa-exterior-outer-bowl-lid-y-eje", "Tapa Exterior (Outer Bowl Lid) y Eje de Transmisión"),
        ("cuchilla-creamerizer-estandar-vs-deluxe", "Cuchilla Creamerizer Estándar vs Deluxe"),
        ("tazon-congelador-cuisinart-1-5-qt-ice-21", "Tazón Congelador Cuisinart 1.5 Qt (ICE-21 / ICE-20)"),
        ("tazon-congelador-cuisinart-2-0-qt-ice-30", "Tazón Congelador Cuisinart 2.0 Qt (ICE-30BC / ICE-70)"),
        ("paleta-gelato-vs-helado-cuisinart-ice-100", "Paleta de Gelato vs Helado en Cuisinart ICE-100"),
        ("tazon-accesorio-kitchenaid-ksmicm-modelos", "Tazón Accesorio KitchenAid KSMICM según Batidora"),
        ("cubetas-aluminio-vs-acero-compresor-whynter", "Cubetas Extraíbles de Aluminio vs Acero en Compresores"),
        ("tapas-transparentes-boquilla-cuisinart", "Tapas Transparentes con Boquilla Cuisinart"),
        ("juntas-sellos-de-goma-tapa-exterior", "Juntas y Sellos de Goma en Cabezal Heladero"),
    ]
    s7_topics = [
        ("como-identificar-codigo-debajo-de-la-maquina", "Cómo Identificar el Código Exacto Bajo la Base"),
        ("diferencias-de-muescas-y-encastre-fisico", "Diferencias de Muescas, Altura y Encastre Físico"),
        ("que-modelos-son-incompatibles-entre-si", "Qué Modelos Son Incompatibles Entre Sí y Por Qué"),
        ("original-vs-generico-tolerancias-seguridad", "Original vs Genérico: Tolerancias y Riesgo de Virutas"),
        ("lavavajillas-temperatura-y-deformacion-plastico", "Lavavajillas, Grietas y Deformación por Calor"),
        ("equivalencia-en-mililitros-onzas-y-cuartos", "Equivalencia Real en Onzas, Mililitros y Cuartos"),
        ("cuando-cambiar-por-desgaste-o-rayaduras", "Cuándo Reemplazar por Rayaduras, Holgura o Fugas"),
        ("lineas-max-fill-y-expansion-al-congelar", "Marcas MAX FILL y Expansión al Congelar Mezclas"),
        ("diferencias-entre-versiones-ee-uu-y-europa-eu", "Diferencias entre Versiones de EE. UU. y Europa (EU/UK)"),
        ("compatibilidad-de-fundas-termicas-y-almacenaje", "Compatibilidad con Fundas Térmicas y Botes de Freezer"),
    ]
    # 14 * 10 = 140 -> limit to 134 + 1 flagship = 135!
    c7 = 0
    for p_sl, p_nm in s7_parts:
        for t_sl, t_nm in s7_topics:
            if c7 >= 134:
                break
            sl = f"{p_sl}-{t_sl}"
            ti = f"{p_nm}: {t_nm}"
            items.append((
                sl, ti, "guia-compatibilidad-vasos-tazones-y-repuestos",
                f"{p_nm} {t_nm}".lower(),
                f"explicación técnica sobre {t_nm.lower()} aplicado a {p_nm}",
                f"technical inspection photo of {p_nm} illustrating {t_nm} on a clean granite kitchen counter",
                None,
            ))
            c7 += 1

    # -------------------------------------------------------------------------
    # SILO 8: espacio-en-congelador-tiempo-y-funcionamiento (130)
    # -------------------------------------------------------------------------
    s8_flagships = [(
        "como-elegir-maquina-helado-segun-espacio-congelador",
        "Cómo Elegir Máquina de Helado Según el Espacio Libre en tu Congelador (Medidas Reales)",
        "guía dimensional exacta para medir tu congelador antes de elegir entre vasos Ninja 16/24 oz, tazones Cuisinart 1.5/2.0 Qt o compresores autónomos",
        "open organized home freezer drawer showing exact footprint comparison between 16oz pints and a double-walled freezer bowl",
    )]
    for sl, ti, fs, sj in s8_flagships:
        items.append((sl, ti, "espacio-en-congelador-tiempo-y-funcionamiento", sl.replace("-", " "), fs, sj, None))

    s8_themes = [
        ("medidas-exactas-vaso-ninja-16-oz-vs-24-oz", "Medidas Exactas de Vasos Ninja 16 oz vs 24 oz XL en el Congelador"),
        ("medidas-tazon-cuisinart-ice-21-vs-ice-30bc", "Medidas del Tazón Cuisinart ICE-21 (7.5\"×6.2\") vs ICE-30BC (8.3\"×7\")"),
        ("altura-encimera-bajo-gabinete-cocina", "Altura Necesaria Bajo Gabinetes de Cocina (18 Pulgadas / 45.7 cm)"),
        ("temperatura-ideal-del-congelador-menos-18-grados", "Por Qué el Congelador Debe Estar a -18 °C (0 °F) y Qué Pasa a -12 °C"),
        ("por-que-no-poner-tazon-ni-pintas-en-puerta-freezer", "Por Qué Nunca Guardar Pintas ni Tazones en la Puerta del Congelador"),
        ("prueba-del-agitador-tazon-congelador-cuisinart", "La Prueba de Agitar el Tazón: Cómo Saber si el Gel Congeló al 100%"),
        ("tiempo-precongelado-16h-vs-24h-diferencias-reales", "Pre-Congelar 16 Horas vs 24 Horas: Diferencias Reales de Dureza"),
        ("cuanto-tiempo-toma-hacer-helado-con-compresor", "Cuánto Tarda en Enfriar y Batir una Máquina con Compresor Autónomo"),
        ("puedo-hacer-dos-sabores-seguidos-el-mismo-dia", "Cómo Hacer 2 o 3 Sabores Seguidos el Mismo Día Según tu Máquina"),
        ("consumo-electrico-en-watts-ninja-vs-cuisinart", "Consumo Eléctrico en Watts: 800W en Ninja vs 35W en Cuisinart vs 180W Compresor"),
        ("nivel-de-ruido-en-decibelios-ninja-creami-vs-cuisinart", "Nivel de Ruido Real en Decibelios: Cuchilla CREAMi vs Batido Cuisinart"),
        ("cuanto-espacio-ocupa-en-encimera-y-donde-guardarla", "Dimensiones en Encimera y Cómo Almacenar la Máquina en Cocinas Pequeñas"),
        ("congelacion-plana-vs-inclinada-en-vasos-ninja", "Por Qué Congelar Siempre en Superficie Plana y Nivelada Dentro del Freezer"),
    ]
    s8_contexts = [
        ("en-congelador-arriba-top-freezer", "en Congelador Superior (Top Freezer)"),
        ("en-congelador-cajon-inferior", "en Cajón Congelador Inferior"),
        ("en-refrigerador-side-by-side", "en Refrigerador Side-by-Side Estrecho"),
        ("en-mini-fridge-de-departamento", "en Mini-Fridge o Estudio Pequeño"),
        ("con-congelador-compartido-o-lleno", "cuando el Freezer Está Casi Lleno"),
        ("en-verano-y-cocina-calurosa", "en Cocinas Calurosas de Verano"),
        ("para-preparar-lotes-familiares", "al Preparar Lotes para Toda la Semana"),
        ("en-maquinas-ninja-creami", "en Modelos Ninja CREAMi 16/24 oz"),
        ("en-heladeras-cuisinart-de-tazon", "en Heladeras Cuisinart ICE-21 / ICE-30"),
        ("en-equipos-con-compresor-autonomo", "en Máquinas con Compresor Autónomo"),
    ]
    # 13 * 10 = 130 -> limit to 129 + 1 flagship = 130!
    c8 = 0
    for th_sl, th_nm in s8_themes:
        for cx_sl, cx_nm in s8_contexts:
            if c8 >= 129:
                break
            sl = f"{th_sl}-{cx_sl}"
            ti = f"{th_nm} {cx_nm}"
            items.append((
                sl, ti, "espacio-en-congelador-tiempo-y-funcionamiento",
                f"{th_nm} {cx_nm}".lower(),
                f"análisis práctico de dimensiones, tiempos de frío y funcionamiento sobre {th_nm.lower()} {cx_nm.lower()}",
                f"realistic kitchen counter and freezer measurement demonstration of {th_nm} {cx_nm}",
                None,
            ))
            c8 += 1

    # -------------------------------------------------------------------------
    # SILO 9: recetas-de-helados-cremosos-y-gelatos (140)
    # -------------------------------------------------------------------------
    s9_flagships = [
        (
            "receta-helado-vainilla-cremoso-ninja-cuisinart",
            "Receta de Helado de Vainilla Cremoso (Medidas Exactas para Ninja CREAMi y Cuisinart)",
            "receta base de helado de vainilla de heladería adaptada en gramos y tazas tanto para vaso Ninja 16 oz como para tazón Cuisinart 1.5 Qt",
            "two creamy scoops of vanilla bean ice cream with visible dark vanilla specks in a chilled bowl beside a pint tub",
            ("160 ml leche entera + 200 ml nata (crema para batir) + 65 g azúcar + 15 g queso crema o leche en polvo + 1 cdta extracto vainilla",
             "400 ml leche entera + 500 ml nata fría + 165 g azúcar + 2 cdtas vainilla Bourbon + pizca sal + 1/4 cdta goma guar",
             "Ice Cream (Ninja) / 20 min batido (Cuisinart)"),
        ),
        (
            "receta-gelato-pistacho-italiano-en-casa",
            "Receta de Gelato de Pistacho Italiano en Casa (Textura Densa para Ninja y Cuisinart ICE-100)",
            "receta auténtica de gelato italiano con pasta pura de pistacho y menor aireación para Cuisinart ICE-100 o programa Gelato en Ninja",
            "rich olive-green pistachio gelato topped with crushed roasted pistachios in an artisanal glass cup",
            ("240 ml leche entera + 120 ml nata + 55 g pasta pura pistacho + 55 g azúcar + 1 cda leche en polvo",
             "600 ml leche entera + 250 ml nata + 130 g pasta pura pistacho + 140 g azúcar + 25 g leche en polvo + 1/4 cdta goma guar",
             "Gelato (Ninja) / Paleta Gelato 40 min (ICE-100)"),
        ),
    ]
    for sl, ti, fs, sj, rdata in s9_flagships:
        items.append((sl, ti, "recetas-de-helados-cremosos-y-gelatos", sl.replace("-", " "), fs, sj, rdata))

    s9_flavors = [
        ("chocolate-belga-intenso", "Helado de Chocolate Belga Intenso", "240 ml leche + 140 ml nata + 35 g cacao holandés + 65 g azúcar + 30 g chocolate negro", "550 ml leche + 350 ml nata + 85 g cacao + 160 g azúcar + 90 g chocolate fundido", "Ice Cream / Gelato"),
        ("fresa-natural-cremosa", "Helado Cremoso de Fresa Natural", "180 g fresas maduras + 160 ml leche + 120 ml nata + 60 g azúcar + 1 cda jugo limón", "450 g fresas trituradas + 350 ml leche + 300 ml nata + 150 g azúcar", "Ice Cream + Mix-In"),
        ("dulce-de-leche-argentino", "Helado de Dulce de Leche Tradicional", "120 g dulce de leche repostero + 200 ml leche + 130 ml nata + 15 g azúcar + pizca sal", "300 g dulce de leche + 480 ml leche + 320 ml nata + 40 g azúcar", "Ice Cream / 20m"),
        ("cookies-and-cream-galletas", "Helado Cookies & Cream con Galletas", "220 ml leche + 150 ml nata + 55 g azúcar + vainilla + 4 galletas troceadas mix-in", "500 ml leche + 400 ml nata + 140 g azúcar + 10 galletas trituradas al final", "Ice Cream + Mix-In"),
        ("cafe-espresso-tiramisu", "Helado de Café Espresso y Mascarpone", "220 ml leche + 120 ml nata + 45 ml espresso + 60 g azúcar + 2 cdas queso crema", "500 ml leche + 350 ml nata + 110 ml espresso + 150 g azúcar + 80 g mascarpone", "Gelato"),
        ("menta-granizada-chips", "Helado de Menta Granizada con Chispas", "200 ml leche + 160 ml nata + 60 g azúcar + 1/2 cdta extracto menta + 30 g chocolate", "480 ml leche + 400 ml nata + 150 g azúcar + extracto menta + 80 g chocolate", "Ice Cream + Mix-In"),
        ("lucuma-peruana-cremosa", "Helado Artesanal de Lúcuma Cremosa", "120 g pulpa lúcuma + 180 ml leche evaporada/entera + 120 ml nata + 55 g azúcar", "320 g pulpa lúcuma + 420 ml leche + 300 ml nata + 140 g azúcar", "Gelato / 22m"),
        ("avellana-gianduja-choco", "Gelato de Avellana Gianduja", "220 ml leche + 120 ml nata + 60 g crema avellana + 45 g azúcar + cacao", "520 ml leche + 300 ml nata + 150 g pasta avellana + 110 g azúcar + 20 g cacao", "Gelato"),
        ("cheesecake-frutos-rojos", "Helado de Cheesecake con Frutos Rojos", "60 g queso crema + 200 ml leche + 120 ml nata + 60 g azúcar + mermelada mix-in", "160 g queso crema + 480 ml leche + 320 ml nata + 150 g azúcar + swirl frambuesa", "Ice Cream + Mix-In"),
        ("mantequilla-mani-chocolate", "Helado de Mantequilla de Maní y Chocolate", "55 g mantequilla maní + 220 ml leche + 130 ml nata + 55 g azúcar + chispas", "140 g crema maní + 500 ml leche + 320 ml nata + 140 g azúcar + trozos", "Ice Cream"),
        ("caramelo-salado-tostado", "Helado de Caramelo Salado (Salted Caramel)", "75 g azúcar caramelizado + 200 ml leche + 160 ml nata + 1/2 cdta sal marina", "180 g caramelo + 480 ml leche + 380 ml nata + 1 cdta sal marina", "Gelato / Ice Cream"),
        ("coco-tostado-cremoso", "Helado Cremoso de Coco Tostado", "240 ml leche coco entera + 120 ml leche + 55 g azúcar + 25 g coco rallado tostado", "600 ml leche coco + 300 ml nata + 140 g azúcar + 60 g coco tostado", "Ice Cream + Mix-In"),
        ("stracciatella-italiana", "Gelato Stracciatella con Hilos de Chocolate", "240 ml leche + 140 ml nata + 60 g azúcar + vainilla + 35 g chocolate fundido", "580 ml leche + 350 ml nata + 150 g azúcar + 95 g chocolate fundido en hilo", "Gelato"),
        ("fior-di-latte-puro", "Gelato Fior di Latte Clásico Italiano", "260 ml leche entera fresca + 120 ml nata + 65 g azúcar + 20 g leche en polvo", "650 ml leche entera + 300 ml nata + 160 g azúcar + 45 g leche en polvo", "Gelato"),
        ("matcha-te-verde-japones", "Gelado Cremoso de Té Verde Matcha", "220 ml leche + 140 ml nata + 8 g matcha ceremonial + 60 g azúcar + 15 g leche polvo", "520 ml leche + 340 ml nata + 20 g matcha + 150 g azúcar + 30 g leche polvo", "Gelato"),
        ("platano-caramelizado-nuez", "Helado de Plátano Maduro con Nueces", "140 g plátano maduro + 180 ml leche + 100 ml nata + 35 g azúcar morena + nueces", "350 g plátano + 420 ml leche + 260 ml nata + 90 g azúcar morena + 70 g nueces", "Ice Cream + Mix-In"),
        ("ron-con-pasas-tradicional", "Helado Clásico de Ron con Pasas", "220 ml leche + 140 ml nata + 60 g azúcar + 2 cdas ron oscuro + 40 g pasas", "520 ml leche + 350 ml nata + 150 g azúcar + 50 ml ron + 100 g pasas", "Ice Cream + Mix-In"),
        ("almendra-tostada-amaretto", "Gelato de Almendra Tostada", "230 ml leche + 120 ml nata + 50 g crema almendra + 55 g azúcar + vainilla", "550 ml leche + 300 ml nata + 120 g crema almendra + 135 g azúcar", "Gelato"),
        ("butter-pecan-mantequilla", "Helado Butter Pecan con Nueces Pecanas", "20 g mantequilla dorada + 220 ml leche + 150 ml nata + 60 g azúcar morena + pecanas", "50 g mantequilla tostada + 500 ml leche + 360 ml nata + 150 g azúcar + pecanas", "Ice Cream + Mix-In"),
        ("maracuya-cremoso-leche", "Helado Cremoso de Maracuyá (Mousse Helado)", "90 ml pulpa maracuyá + 160 ml leche condensada/entera + 140 ml nata + 25 g azúcar", "220 ml maracuyá + 380 ml leche + 340 ml nata + 100 g azúcar", "Ice Cream"),
        ("yogur-griego-miel-nueces", "Frozen Yogurt Griego con Miel y Nueces", "250 g yogur griego natural + 120 ml leche + 45 g miel + 20 g azúcar + nueces", "620 g yogur griego + 280 ml leche + 115 g miel + 50 g azúcar + nueces", "Lite Ice Cream / Frozen Yogurt"),
        ("chocolate-blanco-frambuesa", "Helado de Chocolate Blanco y Frambuesa", "50 g chocolate blanco fundido + 220 ml leche + 120 ml nata + 35 g azúcar + frambuesas", "130 g chocolate blanco + 520 ml leche + 300 ml nata + 90 g azúcar + frambuesas", "Ice Cream + Mix-In"),
        ("turron-almendra-cremoso", "Helado Cremoso de Turrón de Almendra", "90 g turrón blando triturado + 220 ml leche + 120 ml nata + 20 g azúcar", "220 g turrón blando + 520 ml leche + 300 ml nata + 50 g azúcar", "Gelato"),
    ]
    s9_methods = [
        ("paso-a-paso-ninja-creami-y-cuisinart", "Receta Paso a Paso para Ninja CREAMi y Cuisinart"),
        ("version-estilo-gelato-italiano-cremoso", "Versión Gelato Italiano Sin Cristales"),
        ("proporciones-para-vaso-16-oz-vs-24-oz-deluxe", "Proporciones Exactas para Vaso 16 oz vs Deluxe 24 oz"),
        ("en-heladera-con-compresor-y-tazon-1-5-qt", "Adaptación para Tazón 1.5 Qt y Compresor ICE-100"),
        ("con-toppings-y-salsas-mix-in", "Versión Con Toppings, Swirl y Mix-Ins Crujientes"),
        ("como-conservar-suave-en-congelador", "Cómo Preparar y Conservar Suave Durante Semanas"),
    ]
    # 23 * 6 = 138; + 2 flagships = 140!
    for f_sl, f_nm, r_n, r_c, r_p in s9_flavors:
        for m_sl, m_nm in s9_methods:
            sl = f"receta-{f_sl}-{m_sl}"
            ti = f"{f_nm}: {m_nm}"
            items.append((
                sl, ti, "recetas-de-helados-cremosos-y-gelatos",
                f"receta {f_nm} {m_nm}".lower(),
                f"receta casera paso a paso de {f_nm.lower()} ({m_nm.lower()}) con pesos exactos",
                f"rich artisan scoop of {f_nm} served in a chilled bowl with garnish",
                (r_n, r_c, r_p),
            ))

    # -------------------------------------------------------------------------
    # SILO 10: recetas-de-sorbetes-y-frutas-naturales (125)
    # -------------------------------------------------------------------------
    s10_flagships = [(
        "receta-sorbete-mango-natural-cremoso-ninja-cuisinart",
        "Receta de Sorbete de Mango Natural y Cremoso (100% Fruta para Ninja y Cuisinart)",
        "fórmula equilibrada de sorbete de mango sin lácteos ni cristales de hielo para pinta Ninja CREAMi y tazón Cuisinart",
        "vibrant golden fresh mango sorbet scoop in a frosted glass dish beside ripe mango slices and lime",
        ("350 g mango maduro triturado + 45 g azúcar o miel + 15 ml jugo limón + 40 ml agua",
         "750 g pulpa mango maduro + 140 g azúcar + 30 ml jugo limón + 120 ml agua + 1/4 cdta goma guar",
         "Sorbet (Ninja) / 20 min batido (Cuisinart)"),
    )]
    for sl, ti, fs, sj, rdata in s10_flagships:
        items.append((sl, ti, "recetas-de-sorbetes-y-frutas-naturales", sl.replace("-", " "), fs, sj, rdata))

    s10_fruits = [
        ("limon-cremoso-menta", "Sorbete de Limón Fresco con Menta", "90 ml jugo limón + 240 ml agua + 85 g azúcar + ralladura limón + hojas menta", "200 ml jugo limón + 550 ml agua + 210 g azúcar + ralladura + 1/4 cdta goma guar", "Sorbet"),
        ("maracuya-fruta-pasion", "Sorbete Tropical de Maracuyá", "160 ml pulpa maracuyá + 180 ml agua + 80 g azúcar + pizca sal", "380 ml pulpa maracuyá + 420 ml agua + 200 g azúcar + 1/4 cdta goma guar", "Sorbet"),
        ("fresa-natural-sin-lacteos", "Sorbete de Fresa 100% Natural", "360 g fresas maduras + 50 g azúcar + 15 ml limón + 40 ml agua", "800 g fresas trituradas + 150 g azúcar + 30 ml limón + 100 ml agua", "Sorbet"),
        ("frambuesa-sin-semillas", "Sorbete Sedoso de Frambuesa", "340 g frambuesas coladas + 60 g azúcar + 60 ml agua + 10 ml limón", "750 g frambuesas coladas + 160 g azúcar + 150 ml agua + 1/4 cdta goma guar", "Sorbet"),
        ("pina-colada-sin-alcohol", "Sorbete de Piña Natural en Almíbar", "360 g piña fresca o lata en su jugo + 30 g azúcar + 15 ml lima", "800 g piña triturada + 120 g azúcar + 120 ml agua + 30 ml lima", "Sorbet"),
        ("sandia-refrescante-lima", "Sorbete Ligero de Sandía y Lima", "380 g sandía sin pepitas + 45 g azúcar + 15 ml lima + menta", "850 g sandía triturada + 140 g azúcar + 35 ml lima + 1/4 cdta goma guar", "Sorbet"),
        ("durazno-melocoton-maduro", "Sorbete Cremoso de Durazno Maduro", "360 g durazno maduro + 45 g azúcar + 40 ml agua + 10 ml limón", "800 g durazno pelado + 140 g azúcar + 120 ml agua + 25 ml limón", "Sorbet"),
        ("frutos-del-bosque-mix", "Sorbete de Moras, Arándanos y Frutos Rojos", "350 g frutos rojos + 55 g azúcar + 50 ml agua + 10 ml limón", "780 g berries triturados + 155 g azúcar + 120 ml agua + goma guar", "Sorbet"),
        ("mandarina-naranja-fresca", "Sorbete Cítrico de Mandarina y Naranja", "300 ml jugo mandarina + 70 g azúcar + ralladura + 40 ml agua", "680 ml jugo mandarina + 175 g azúcar + ralladura + 1/4 cdta goma guar", "Sorbet"),
        ("guayaba-rosada-tropical", "Sorbete de Guayaba Rosada", "330 g pulpa guayaba colada + 60 g azúcar + 60 ml agua + 10 ml limón", "750 g pulpa guayaba + 160 g azúcar + 160 ml agua + 25 ml limón", "Sorbet"),
        ("kiwi-manzana-verde", "Sorbete Ácido de Kiwi y Manzana Verde", "320 g kiwi sin piel + manzana + 60 g azúcar + 45 ml agua + lima", "720 g kiwi/manzana + 155 g azúcar + 120 ml agua + 25 ml lima", "Sorbet"),
        ("cereza-negra-oscura", "Sorbete Intenso de Cereza Negra", "350 g cerezas deshuesadas + 50 g azúcar + 45 ml agua + limón", "780 g cerezas + 140 g azúcar + 120 ml agua + 25 ml limón", "Sorbet"),
        ("mango-maracuya-mix", "Sorbete Combinado Mango y Maracuyá", "260 g mango + 90 ml maracuyá + 55 g azúcar + 30 ml agua", "600 g mango + 200 ml maracuyá + 150 g azúcar + 100 ml agua", "Sorbet"),
        ("arandanos-azules-limon", "Sorbete Antioxidante de Arándanos y Limón", "340 g arándanos + 55 g azúcar + 55 ml agua + 15 ml limón", "750 g arándanos + 155 g azúcar + 140 ml agua + 30 ml limón", "Sorbet"),
        ("melon-cantalupo-jengibre", "Sorbete de Melón Cantalupo", "370 g melón maduro + 40 g azúcar + 15 ml limón + 30 ml agua", "820 g melón + 130 g azúcar + 30 ml limón + 1/4 cdta goma guar", "Sorbet"),
        ("pina-hierbabuena-limon", "Sorbete Refrescante de Piña y Hierbabuena", "350 g piña + 40 g azúcar + hojas hierbabuena + 15 ml limón", "780 g piña + 135 g azúcar + 120 ml agua + hierbabuena", "Sorbet"),
        ("naranja-sanguina-italiana", "Sorbete Estilo Granizado de Naranja Roja", "310 ml jugo naranja + 70 g azúcar + ralladura + 40 ml agua", "700 ml jugo naranja + 170 g azúcar + ralladura + goma guar", "Sorbet / Italian Ice"),
        ("papaya-naranja-suave", "Sorbete Cremoso de Papaya y Naranja", "330 g papaya + 60 ml jugo naranja + 40 g azúcar + 10 ml limón", "740 g papaya + 160 ml naranja + 120 g azúcar + 25 ml limón", "Sorbet"),
        ("uva-morada-natural", "Sorbete Dulce de Uva Negra sin Semillas", "360 g uvas trituradas coladas + 35 g azúcar + 15 ml limón", "800 g uvas coladas + 110 g azúcar + 30 ml limón + goma guar", "Sorbet"),
        ("granada-frambuesa-fresca", "Sorbete de Granada y Frambuesa", "200 ml jugo granada + 150 g frambuesas + 65 g azúcar + limón", "450 ml jugo granada + 320 g frambuesas + 165 g azúcar + goma guar", "Sorbet"),
    ]
    s10_variants = [
        ("solo-fruta-en-ninja-creami", "Versión Rápida en Pinta Ninja CREAMi"),
        ("con-almibar-en-cuisinart-y-compresor", "Versión con Almíbar para Tazón Cuisinart"),
        ("sin-azucar-con-alulosa", "Versión Sin Azúcar Añadida (Suave con Alulosa)"),
        ("truco-textura-sedosa-sin-cristales", "Proporción de Azúcar y Goma Guar Sin Cristales"),
        ("combinacion-gourmet-con-hierbas-o-citricos", "Toque Gourmet con Cítricos y Hierbas Frescas"),
        ("preparacion-conservacion-y-raciones", "Tiempo de Congelación, Raciones y Conservación"),
    ]
    # 20 * 6 = 120; + 1 flagship = 121 -> add 4 extra technical sorbet articles = 125!
    for fr_sl, fr_nm, rn, rc, rp in s10_fruits:
        for v_sl, v_nm in s10_variants:
            sl = f"sorbete-{fr_sl}-{v_sl}"
            ti = f"{fr_nm}: {v_nm}"
            items.append((
                sl, ti, "recetas-de-sorbetes-y-frutas-naturales",
                f"{fr_nm} {v_nm}".lower(),
                f"receta de {fr_nm.lower()} ({v_nm.lower()}) adaptada a vasos Ninja y tazón Cuisinart",
                f"bright fruit sorbet bowl of {fr_nm} garnished with fresh sliced fruit in sunlit kitchen",
                (rn, rc, rp),
            ))
    s10_extras = [
        ("tabla-proporcion-almibar-y-brix-en-sorbetes", "Tabla de Almíbar y Azúcares para Sorbetes Caseros Sin Cristales"),
        ("sorbete-de-fruta-enlatada-en-almibar-en-ninja-creami", "Cómo Hacer Sorbete con Fruta en Almíbar de 1 Ingrediente en Ninja CREAMi"),
        ("diferencia-entre-sorbete-nieve-y-italian-ice-en-casa", "Diferencia entre Sorbete, Nieve e Italian Ice en Máquinas Domésticas"),
        ("por-que-el-sorbete-se-endurece-y-como-arreglarlo-con-alulosa", "Por Qué el Sorbete Casero Queda Duro al Congelarse y Cómo Arreglarlo"),
    ]
    for sl, ti in s10_extras:
        items.append((
            sl, ti, "recetas-de-sorbetes-y-frutas-naturales",
            ti.lower(),
            "guía práctica de formulación de sorbetes caseros",
            "fresh tropical fruits beside a glass bowl of silky fruit sorbet and measuring jug",
            ("350 g fruta + 45 g azúcar/alulosa + 40 ml agua", "780 g fruta + 145 g azúcar/alulosa + 120 ml agua + goma guar", "Sorbet"),
        ))

    # -------------------------------------------------------------------------
    # SILO 11: helados-saludables-proteicos-keto-y-sin-lactosa (125)
    # -------------------------------------------------------------------------
    s11_flagships = [(
        "receta-helado-proteico-vainilla-chocolate-ninja-creami",
        "Receta de Helado Proteico Cremoso (35 g Proteína por Pinta Sin Textura Arenosa)",
        "fórmula probada con proteína whey/caseína y goma guar para lograr textura de heladería en Ninja CREAMi con menos de 300 kcal",
        "creamy high-protein chocolate and vanilla ice cream in a 16oz pint cup beside a protein scoop and berries",
        ("350 ml leche almendras o descremada + 35 g proteína whey/caseína + 10 g pudín sin azúcar o 1/4 cdta goma guar + 15 g alulosa",
         "800 ml leche + 80 g proteína + 25 g cacao/vainilla + 50 g alulosa + 1/2 cdta goma guar",
         "Lite Ice Cream + 1 Re-Spin (Ninja)"),
    )]
    for sl, ti, fs, sj, rdata in s11_flagships:
        items.append((sl, ti, "helados-saludables-proteicos-keto-y-sin-lactosa", sl.replace("-", " "), fs, sj, rdata))

    s11_types = [
        ("helado-proteico-fresa-yogur", "Helado Proteico de Fresa y Yogur Griego", "250 ml leche + 120 g yogur griego + 30 g proteína fresa/vainilla + 1/4 cdta goma guar", "600 ml leche + 280 g yogur + 70 g proteína + 45 g alulosa + goma guar", "Lite Ice Cream"),
        ("helado-proteico-mantequilla-mani", "Helado Proteico de Mantequilla de Maní", "320 ml leche + 30 g proteína + 20 g harina maní desgrasada + 1/4 cdta goma guar", "750 ml leche + 70 g proteína + 45 g polvo maní + 45 g alulosa + goma guar", "Lite Ice Cream"),
        ("helado-proteico-cafe-caramelo", "Helado Proteico de Café y Caramelo", "300 ml leche + 45 ml espresso + 32 g proteína caramelo/vainilla + goma guar", "720 ml leche + 110 ml café + 75 g proteína + 40 g alulosa + goma guar", "Lite Ice Cream"),
        ("helado-keto-vainilla-alulosa", "Helado Keto de Vainilla Sin Azúcar (<3 g Carbs)", "220 ml leche almendras + 150 ml nata para montar + 50 g alulosa + vainilla + goma guar", "500 ml crema espesa + 380 ml leche almendras + 120 g alulosa + vainilla + goma guar", "Ice Cream / Lite"),
        ("helado-keto-chocolate-oscuro", "Helado Keto de Chocolate Intenso Sin Azúcar", "220 ml leche coco/almendra + 140 ml nata + 25 g cacao + 55 g alulosa + goma guar", "480 ml leche almendras + 380 ml nata + 60 g cacao + 130 g alulosa + goma guar", "Ice Cream"),
        ("helado-keto-fresa-crema", "Helado Keto de Fresas con Nata", "120 g fresas + 150 ml nata + 140 ml leche almendras + 45 g alulosa + goma guar", "280 g fresas + 380 ml nata + 320 ml leche almendras + 110 g alulosa + goma guar", "Ice Cream"),
        ("helado-vegano-leche-coco-vainilla", "Helado Vegano Cremoso de Leche de Coco", "360 ml leche coco lata entera + 55 g azúcar/jarabe arce + vainilla + goma guar", "800 ml leche coco + 135 g azúcar + vainilla + 1/4 cdta goma guar", "Ice Cream"),
        ("helado-vegano-chocolate-avena", "Helado Vegano de Chocolate con Bebida de Avena", "350 ml bebida avena barista + 30 g cacao + 50 g azúcar coco/alulosa + goma guar", "820 ml bebida avena barista + 70 g cacao + 120 g azúcar + 40 g crema anacardo + goma guar", "Lite Ice Cream"),
        ("helado-vegano-anacardos-caramelo", "Helado Vegano Ultra Cremoso de Anacardos", "80 g anacardos remojados + 280 ml bebida vegetal + 50 g azúcar + vainilla", "200 g anacardos remojados + 650 ml bebida vegetal + 125 g azúcar + goma guar", "Gelato"),
        ("helado-sin-lactosa-vainilla-almendra", "Helado Sin Lactosa Cremoso de Leche Sin Lactosa", "240 ml leche sin lactosa + 130 ml crema vegetal + 55 g azúcar + vainilla + goma guar", "550 ml leche sin lactosa + 320 ml crema sin lactosa + 140 g azúcar + goma guar", "Ice Cream"),
        ("helado-para-diabeticos-bajo-ig", "Helado Bajo en Índice Glucémico con Alulosa y Fibra", "340 ml leche almendras/entera + 50 g alulosa + 10 g inulina/fibra + vainilla + goma guar", "780 ml leche + 120 g alulosa + 25 g inulina + 1/4 cdta goma guar", "Lite Ice Cream"),
        ("nice-cream-platano-sin-azucar-anadido", "Nice Cream de Plátano y Cacao Sin Azúcar Añadido", "2 plátanos muy maduros + 120 ml bebida vegetal + 20 g cacao puro + pizca canela", "5 plátanos maduros triturados + 280 ml bebida vegetal + 45 g cacao + goma guar", "Smoothie Bowl / Ice Cream"),
        ("helado-infantil-yogur-fresa-platano", "Helado Infantil Saludable de Yogur y Fruta", "180 g yogur natural + 140 g fruta madura + 20 g miel o dátil + 60 ml leche", "420 g yogur + 320 g fruta + 60 g miel + 150 ml leche", "Frozen Yogurt"),
        ("helado-proteico-cookies-and-cream", "Helado Proteico Cookies & Cream Ligero", "350 ml leche + 32 g proteína vainilla + 1/4 cdta goma guar + 2 galletas sin azúcar mix-in", "800 ml leche + 75 g proteína + 50 g alulosa + goma guar + 6 galletas", "Lite Ice Cream + Mix-In"),
        ("helado-vegano-mango-coco-cremoso", "Helado Vegano Cremoso de Mango y Coco", "220 g mango + 160 ml leche de coco + 25 g azúcar/alulosa + gotas lima", "500 g mango + 380 ml leche coco + 80 g azúcar + lima + goma guar", "Sorbet / Ice Cream"),
        ("helado-keto-matcha-pistacho", "Helado Keto de Té Matcha o Pistacho", "200 ml leche almendras + 150 ml nata + 50 g alulosa + 8 g matcha o 40 g pistacho", "450 ml leche almendras + 380 ml nata + 120 g alulosa + 18 g matcha + goma guar", "Ice Cream"),
        ("helado-proteico-platano-cacao", "Helado Proteico de Plátano y Cacao", "1 plátano maduro + 260 ml leche + 30 g proteína chocolate + 1/4 cdta goma guar", "2 plátanos + 600 ml leche + 70 g proteína chocolate + 35 g alulosa + goma guar", "Lite Ice Cream"),
        ("helado-vegano-fresa-leche-almendras", "Helado Vegano Ligero de Fresa y Almendras", "200 g fresas + 180 ml leche almendras + 35 g alulosa + 1/4 cdta goma guar", "450 g fresas + 400 ml leche almendras + 95 g alulosa + 40 g crema coco + goma guar", "Lite Ice Cream"),
        ("helado-sin-azucar-cafe-moka", "Helado Sin Azúcar de Café Moka", "300 ml leche + 45 ml café espresso + 15 g cacao + 50 g alulosa + goma guar", "700 ml leche + 110 ml café + 35 g cacao + 120 g alulosa + goma guar", "Lite Ice Cream"),
        ("helado-proteico-dulce-canela-horchata", "Helado Proteico de Canela y Vainilla (Churro Fit)", "340 ml leche + 32 g proteína vainilla + 1 cdta canela + 1/4 cdta goma guar + alulosa", "800 ml leche + 75 g proteína + 2 cdtas canela + 50 g alulosa + goma guar", "Lite Ice Cream"),
    ]
    s11_variants = [
        ("en-ninja-creami-sin-cristales", "Fórmula Cremosa para Ninja CREAMi"),
        ("adaptacion-para-tazon-cuisinart-y-compresor", "Adaptación para Cuisinart de Tazón y Compresor"),
        ("macros-calorias-y-porciones-exactas", "Calorías, Macros y Porciones Reales"),
        ("como-evitar-que-quede-duro-con-alulosa", "Cómo Evitar que Endurezca Usando Alulosa y Goma Guar"),
        ("truco-respin-y-leche-para-textura-perfecta", "Truco Re-Spin y Chorrito Líquido Para Textura Sedosa"),
        ("variaciones-con-proteina-whey-vs-vegetal", "Comparativa con Proteína Whey, Caseína o Vegetal"),
    ]
    # 20 * 6 = 120; + 1 flagship = 121 -> add 4 foundational keto/protein guides = 125!
    for tp_sl, tp_nm, rn, rc, rp in s11_types:
        for v_sl, v_nm in s11_variants:
            sl = f"{tp_sl}-{v_sl}"
            ti = f"{tp_nm}: {v_nm}"
            items.append((
                sl, ti, "helados-saludables-proteicos-keto-y-sin-lactosa",
                f"{tp_nm} {v_nm}".lower(),
                f"guía nutricional y receta práctica de {tp_nm.lower()} ({v_nm.lower()})",
                f"creamy healthy low-sugar homemade scoop of {tp_nm} on a minimalist bright kitchen table",
                (rn, rc, rp),
            ))
    s11_extras = [
        ("por-que-el-eritritol-endurece-el-helado-keto-y-alulosa-no", "Por Qué el Eritritol Endurece el Helado Keto como Piedra y la Alulosa lo Deja Suave"),
        ("cuanta-goma-guar-o-xantana-poner-por-pinta-de-helado-proteico", "Cuánta Goma Guar o Xantana Usar por Pinta de Helado Proteico Sin Quedar Gomoso"),
        ("proteina-whey-vs-caseina-vs-vegetal-en-ninja-creami", "Proteína Whey vs Caseína vs Vegetal: Cuál Da Mejor Textura en Ninja CREAMi"),
        ("leche-de-almendras-vs-coco-vs-avena-barista-en-helados-veganos", "Leche de Almendras vs Coco vs Avena Barista para Helados Veganos Cremosos"),
    ]
    for sl, ti in s11_extras:
        items.append((
            sl, ti, "helados-saludables-proteicos-keto-y-sin-lactosa",
            ti.lower(),
            "guía técnica de ingredientes para helados fit, keto y sin lactosa",
            "healthy ice cream ingredients including allulose, guar gum, almond milk and protein powder on quartz counter",
            ("350 ml base proteica/vegetal + 35 g proteína + 1/4 cdta goma guar + 15 g alulosa",
             "800 ml base + 80 g proteína + 55 g alulosa + 1/2 cdta goma guar",
             "Lite Ice Cream + Re-Spin"),
        ))

    # -------------------------------------------------------------------------
    # SILO 12: textura-ciencia-del-helado-y-tecnicas (120)
    # -------------------------------------------------------------------------
    s12_flagships = [(
        "como-evitar-cristales-hielo-en-helado-casero",
        "Cómo Evitar Cristales de Hielo en Helado Casero (Guía Definitiva Ninja y Cuisinart)",
        "guía técnica sobre el control de agua libre, temperatura de servicio, uso de estabilizantes y función Re-Spin para evitar cristales",
        "macro close-up of silky smooth freshly spun ice cream showing zero ice crystals on a stainless spoon",
    )]
    for sl, ti, fs, sj in s12_flagships:
        items.append((sl, ti, "textura-ciencia-del-helado-y-tecnicas", sl.replace("-", " "), fs, sj, None))

    s12_topics = [
        ("como-usar-funcion-re-spin-ninja-creami", "Cómo y Cuándo Usar la Función Re-Spin en Ninja CREAMi"),
        ("por-que-sale-textura-arenosa-o-en-polvo-en-ninja", "Por Qué Sale Textura Polvosa o Arenosa tras el Primer Ciclo y Cómo Corregirlo"),
        ("como-alisar-joroba-monticulo-vaso-congelado", "Cómo Alisar la Joroba o Montículo del Vaso Congelado Antes de Procesar"),
        ("anadir-chorrito-leche-antes-de-re-spin", "Cuánta Leche o Agua Añadir Antes del Re-Spin para Textura Perfecta"),
        ("cuando-incorporar-mix-ins-chocolate-y-nueces", "Cuándo y Cómo Añadir Trozos (Mix-Ins), Galletas y Chocolate sin Triturarlos"),
        ("que-es-el-overrun-aire-incorporado-gelato-vs-helado", "Qué Es el Overrun: Por Qué el Gelato Lleva Menos Aire que el Helado Americano"),
        ("reposo-maduracion-base-en-nevera-antes-de-batir", "Por Qué Reposar la Base en Nevera 4 Horas Antes de Batir en Cuisinart"),
        ("diferencia-programa-ice-cream-vs-lite-ice-cream-vs-gelato", "Diferencia Real de Velocidad entre Modos Ice Cream, Lite Ice Cream y Gelato"),
        ("punto-de-congelacion-azucar-miel-alcohol-y-alulosa", "Cómo Afectan el Azúcar, la Miel, el Alcohol y la Alulosa la Dureza del Helado"),
        ("uso-de-queso-crema-yemas-o-maicena-como-base", "Base con Yemas de Huevo vs Maicena vs Queso Crema para Mayor Cremidad"),
        ("por-que-se-forma-mantequilla-al-batir-demasiado", "Por Qué el Helado Queda Grasoso o Mantecoso al Sobrepasar el Tiempo de Batido"),
        ("enfriar-tazon-y-base-antes-de-encender-cuisinart", "Por Qué Enfriar la Mezcla a 4 °C Antes de Verterla en Tazón Cuisinart"),
        ("como-hacer-vetas-swirl-de-caramelo-o-mermelada", "Cómo Lograr Vetas de Caramelo, Nutella o Mermelada Sin que se Congelen Duras"),
        ("congelacion-en-tanda-con-ninja-deluxe-mitad-superior", "Cómo Procesar Solo la Mitad Superior en Ninja Deluxe y Volver a Congelar"),
        ("altura-de-llenado-max-fill-para-evitar-daños", "Por Qué Respetar la Línea MAX FILL para Proteger Cuchillas y Motor"),
    ]
    s12_contexts = [
        ("en-helados-cremosos-con-nata", "en Helados Cremosos Tradicionales"),
        ("en-sorbetes-de-fruta-pura", "en Sorbetes de Fruta sin Lácteos"),
        ("en-helados-proteicos-bajos-en-grasa", "en Helados Proteicos y Light"),
        ("en-helados-keto-sin-azucar", "en Helados Keto sin Azúcar"),
        ("en-ninja-creami-nc301-y-deluxe", "en Máquinas Ninja CREAMi"),
        ("en-cuisinart-ice-21-y-ice-30bc", "en Tazones Cuisinart de Pre-Congelado"),
        ("en-heladeras-con-compresor", "en Máquinas con Compresor Autónomo"),
        ("despues-de-volver-al-congelador", "al Volver a Guardar el Sobrante en Freezer"),
    ]
    # 15 * 8 = 120 -> 1 flagship + 119 = 120!
    c12 = 0
    for tp_sl, tp_nm in s12_topics:
        for cx_sl, cx_nm in s12_contexts:
            if c12 >= 119:
                break
            sl = f"{tp_sl}-{cx_sl}"
            ti = f"{tp_nm} {cx_nm}"
            items.append((
                sl, ti, "textura-ciencia-del-helado-y-tecnicas",
                f"{tp_nm} {cx_nm}".lower(),
                f"técnica gastronómica y física del frío aplicada a {tp_nm.lower()} {cx_nm.lower()}",
                f"culinary texture demonstration showing smooth ice cream consistency for {tp_nm}",
                None,
            ))
            c12 += 1

    # -------------------------------------------------------------------------
    # SILO 13: limpieza-cuidado-y-solucion-de-problemas (115)
    # -------------------------------------------------------------------------
    s13_flagships = [(
        "como-limpiar-tapa-exterior-eje-ninja-creami",
        "Cómo Limpiar la Tapa Exterior, la Junta y el Eje de Ninja CREAMi Paso a Paso",
        "manual detallado de higiene y desmontaje de la junta de goma, botón de liberación y eje motor para evitar olores y restos de lácteos",
        "disassembled Ninja-style outer bowl lid with silicone gasket and paddle being cleaned gently on a microfiber towel",
    )]
    for sl, ti, fs, sj in s13_flagships:
        items.append((sl, ti, "limpieza-cuidado-y-solucion-de-problemas", sl.replace("-", " "), fs, sj, None))

    s13_issues = [
        ("luz-install-parpadeando-en-ninja-creami", "Por Qué Parpadea la Luz Install en Ninja CREAMi y Cómo Encajar el Bowl"),
        ("cuchilla-se-cae-de-la-tapa-al-procesar", "Por Qué Se Cae o Se Suelta la Cuchilla Creamerizer al Procesar"),
        ("olor-a-quemado-o-vibracion-fuerte-en-motor", "Por Qué Huele a Quemado o Vibra Fuerte por Joroba Desnivelada"),
        ("virutas-de-plastico-en-el-vaso-como-prevenir", "Cómo Evitar Que la Cuchilla Raspe el Plástico del Vaso (Seguridad)"),
        ("tazon-cuisinart-no-congela-la-mezcla", "Por Qué el Tazón Cuisinart No Endurece la Mezcla (Temperatura y Mezcla Tibia)"),
        ("helado-se-congela-pegado-en-paredes-cuisinart", "Por Qué Se Pega Hielo en las Paredes del Tazón Cuisinart y Frena la Paleta"),
        ("sonido-clic-o-tapa-trabada-en-cuisinart", "Tapa Trabada o Sonido de Clic en Heladera Cuisinart: Cómo Solucionarlo"),
        ("mal-olor-leche-atrapada-en-tapa-exterior", "Cómo Quitar el Olor a Leche Atrapada en la Tapa Exterior de Ninja CREAMi"),
        ("limpieza-profunda-junta-silicona-y-resorte", "Desmontaje y Limpieza de la Junta de Silicona y Botón de Resorte"),
        ("como-lavar-tazon-cuisinart-sin-danar-aluminio", "Cómo Lavar el Tazón de Doble Pared Cuisinart Sin Dañar el Recubrimiento"),
        ("fuga-liquido-refrigerante-en-tazon-congelador", "Qué Hacer si Notas Fuga o Sonido Raro en el Tazón Congelador"),
        ("compresor-en-cuisinart-ice-100-o-whynter-no-enfria", "Qué Revisar si el Compresor Arranca Pero No Enfría la Cubeta"),
        ("quemadura-por-frio-y-escarcha-en-sobrantes", "Cómo Evitar la Quemadura por Frío y Escarcha al Guardar Helado Casero"),
        ("almacenaje-prolongado-de-la-maquina-en-invierno", "Cómo Secar y Guardar tu Máquina de Helados Durante Varios Meses"),
        ("mantenimiento-preventivo-eje-metalico-motor", "Cuidado del Eje Metálico y Engranaje Superior Después de Cada Uso"),
    ]
    s13_contexts = [
        ("diagnostico-rapido-en-casa", "Diagnóstico Paso a Paso en Casa"),
        ("prevencion-antes-de-usar", "Cómo Prevenirlo Antes de Cada Ciclo"),
        ("piezas-de-repuesto-necesarias", "Qué Repuesto Compatible Pedir si Falla"),
        ("cuidados-para-alargar-vida-util", "Cuidados para Alargar la Vida del Motor"),
        ("en-modelos-ninja-creami-16-y-24-oz", "en Series Ninja CREAMi 16 oz y Deluxe"),
        ("en-modelos-cuisinart-y-kitchenaid", "en Series Cuisinart ICE y KitchenAid"),
        ("en-heladeras-con-compresor", "en Equipos con Compresor ICE-100 / Whynter"),
        ("errores-frecuentes-de-uso", "Errores Comunes que Debes Evitar"),
    ]
    # 15 * 8 = 120 -> stop at 114 + 1 flagship = 115!
    c13 = 0
    for is_sl, is_nm in s13_issues:
        for cx_sl, cx_nm in s13_contexts:
            if c13 >= 114:
                break
            sl = f"{is_sl}-{cx_sl}"
            ti = f"{is_nm}: {cx_nm}"
            items.append((
                sl, ti, "limpieza-cuidado-y-solucion-de-problemas",
                f"{is_nm} {cx_nm}".lower(),
                f"guía técnica de mantenimiento y solución de fallas sobre {is_nm.lower()}",
                f"home kitchen maintenance photograph explaining {is_nm} with clean tools and ice cream machine",
                None,
            ))
            c13 += 1

    # -------------------------------------------------------------------------
    # SILO 14: guia-de-compra-envio-y-voltaje-amazon-usa (110)
    # -------------------------------------------------------------------------
    s14_topics = [
        ("voltaje-110v-ee-uu-vs-220v-latinoamerica", "Voltaje 110–120V de Amazon EE. UU. vs Redes Eléctricas de 220V"),
        ("potencia-en-watts-para-elegir-transformador", "Cuántos Watts Necesita el Transformador para Ninja (800W) vs Cuisinart (35–150W)"),
        ("peso-y-medidas-de-caja-para-envio-internacional", "Peso y Dimensiones de Caja para Envío Internacional desde Amazon USA"),
        ("comprar-amazon-global-vs-courier-casillero", "Envío Directo AmazonGlobal vs Courier a Perú, México, Colombia y Chile"),
        ("producto-nuevo-vs-amazon-renewed-reacondicionado", "Máquina Nueva vs Amazon Renewed: Qué Revisar en Garantía y Repuestos"),
        ("ahorro-real-por-porcion-vs-comprar-pintas", "Cálculo de Ahorro Real: Cuándo Se Amortiza una Máquina de Helado en Casa"),
        ("modelos-estados-unidos-nc301-vs-europa-nc300eu", "Diferencias Entre Códigos de Amazon EE. UU. (NC301 / NC501) y Europa (EU)"),
        ("garantia-devoluciones-y-repuestos-en-amazon", "Cómo Comprobar Repuestos Compatibles Antes de Cerrar el Carrito en Amazon"),
        ("mejores-fechas-ofertas-y-cupones-heladeras", "Cómo Detectar Buenas Ofertas y Packs con Vasos Extra en Amazon.com"),
        ("que-trae-exactamente-la-caja-original", "Qué Incluye Dentro de la Caja Original vs Qué Conviene Añadir Aparte"),
        ("enchufe-tipo-a-b-americano-y-frecuencia-60hz", "Enchufes Tipo A/B y Frecuencia 60Hz vs 50Hz en Motores de Heladería"),
    ]
    s14_angles = [
        ("para-ninja-creami-nc301-y-nc299amz", "para Ninja CREAMi NC301 / NC299AMZ"),
        ("para-ninja-creami-deluxe-nc501", "para Ninja CREAMi Deluxe NC501"),
        ("para-ninja-swirl-y-slushi", "para Ninja Swirl NC701 y SLUSHi FS301"),
        ("para-cuisinart-ice-21-y-ice-30bc", "para Cuisinart ICE-21 e ICE-30BC"),
        ("para-cuisinart-ice-100-y-whynter", "para Cuisinart ICE-100 y Whynter Compresor"),
        ("para-breville-smart-scoop", "para Breville Smart Scoop BCI600XL"),
        ("para-accesorio-kitchenaid-y-dash", "para KitchenAid KSMICM y Dash Compact"),
        ("para-compradores-en-estados-unidos", "para Compradores en Estados Unidos"),
        ("para-importar-a-peru-y-latinoamerica", "para Importar a Perú y Latinoamérica"),
        ("lista-de-verificacion-precompra", "Lista de Verificación Antes de Comprar"),
    ]
    # 11 * 10 = 110!
    for tp_sl, tp_nm in s14_topics:
        for an_sl, an_nm in s14_angles:
            sl = f"{tp_sl}-{an_sl}"
            ti = f"{tp_nm} {an_nm}"
            items.append((
                sl, ti, "guia-de-compra-envio-y-voltaje-amazon-usa",
                f"{tp_nm} {an_nm}".lower(),
                f"guía práctica de compra internacional y compatibilidad eléctrica sobre {tp_nm.lower()} {an_nm.lower()}",
                f"clean kitchen unboxing and appliance setup for {tp_nm} ({an_nm}) on a modern countertop",
                None,
            ))

    assert len(items) == 1000, f"Expected 1000 SEO articles, got {len(items)}"
    return items
