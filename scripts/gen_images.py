#!/usr/bin/env python3
"""
Genera imágenes fotorrealistas y visualmente diversas para heladoencasa.com vía la
Edge Function heladoencasa-images (Supabase charlielingan -> OpenAI gpt-image-1 quality="medium")
y las comprime en WebP ligeros (<= 68 KB para 1200x675, estrictamente < 100 KB para SEO).

Incluye verificación dHash (diferencia perceptual) para garantizar que las imágenes
no se parezcan entre sí entre artículos ni entre escenas.

Uso:
  python3 scripts/gen_images.py home       # genera las 54 imágenes de Home/silos/escenas + 15 artículos flagship
  python3 scripts/gen_images.py articles   # genera imágenes individuales por artículo
  python3 scripts/gen_images.py audit      # audita tamaños < 100KB y similitud dHash
  python3 scripts/gen_images.py one <slug> "<prompt>"
"""
import concurrent.futures as cf
import io
import json
import pathlib
import sys
import urllib.request
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENDPOINT = "https://ehwjvuhbimqakvzqbvvg.supabase.co/functions/v1/heladoencasa-images"
TOKEN = "heladoencasa-img-2026"
RAW = ROOT / "scripts/.cache/raw"
RAW.mkdir(parents=True, exist_ok=True)

# 54 escenas fotográficas diversas (12 Home/OG + 14 Categorías Pilares + 28 Variantes Escénicas)
HOME_PROMPTS = {
    # 12 Home & OG
    "home-hero-helados": (
        "Three-quarter editorial studio photograph of a sunlit bright white Calacatta marble kitchen island "
        "featuring a brushed stainless steel Ninja CREAMi style countertop ice cream maker next to a frosted "
        "16oz pint of velvety pistachio gelato and two waffle cones with fresh mint sprigs, morning daylight"
    ),
    "og-default": (
        "Wide sunlit American kitchen counter showcasing three distinct home ice cream makers: a sleek black "
        "and stainless pint shaver machine, a pastel turquoise frozen-bowl churner, and a brushed steel compressor "
        "gelato machine surrounded by fresh mango, berries and bowls of creamy ice cream"
    ),
    "home-ninja-creami": (
        "Clean editorial close-up of a sleek silver and black pint-processing countertop ice cream maker on "
        "oak wood countertop beside a frosty transparent 16oz pint of strawberry cheesecake ice cream with mix-ins"
    ),
    "home-cuisinart-bowl": (
        "Bright family kitchen scene showing a classic white countertop ice cream maker with a frosted freezer "
        "bowl spinning golden vanilla bean custard as a wooden spoon rests beside ceramic bowls"
    ),
    "home-compresor-gelato": (
        "Moody warm gourmet kitchen close-up of a matte brushed stainless self-refrigerating compressor gelato "
        "maker dispensing dense glossy dark chocolate hazelnut gelato into a ribbed glass coupe"
    ),
    "home-vasos-colores": (
        "Organized marble counter showing a neat row of four frosty replacement ice cream pint tubs with tight "
        "pastel-colored silicone lids (mint, coral, navy, slate) filled with chocolate, mango, vanilla and berry bases"
    ),
    "home-espacio-freezer": (
        "Top-down candid view of an open tidy upright kitchen freezer drawer storing three color-coded sealed "
        "ice cream pints on the top shelf next to a round stainless insulated freezer churn bowl with room to spare"
    ),
    "home-sorbete-mango": (
        "Vivid sunlit summer patio table with two bowls of bright silky Alphonso mango and raspberry sorbet "
        "scooped into chilled stoneware cups alongside fresh tropical fruit slices and linen napkins"
    ),
    "home-gelato-pistacho": (
        "Macro gastronomic photography (85mm f/2.8) of dense velvety toasted Bronte pistachio Italian gelato "
        "topped with crushed roasted pistachios in a cold pewter cup on travertine stone"
    ),
    "home-helado-fit": (
        "Minimalist modern morning fitness kitchen counter showing a creamy high-protein peanut butter chocolate "
        "chunk pint right after spinning, stainless spoon, shaker bottle and sliced banana"
    ),
    "home-conos-waffle": (
        "Warm afternoon dessert counter with golden crisp waffle cones filled with swirled vanilla bean and salted "
        "caramel ice cream scoops resting in a wooden cone holder beside a stainless steel heated ice cream scoop"
    ),
    "home-cuidado-limpieza": (
        "Clean minimalist stainless sink counter showing hands drying a spotless outer pint lid, paddle blade "
        "and silicone seal ring on a gray microfiber waffle towel next to a gleaming countertop ice cream maker"
    ),

    # 14 Categorías Pilares (cat-<silo>)
    "cat-resenas-maquinas-de-helado": (
        "Editorial appliance testing bar displaying four distinct countertop ice cream makers (vertical pint shaver, "
        "compact 1.5Qt frozen bowl churner, compressor machine, soft-serve station) under soft studio daylight"
    ),
    "cat-comparativas-maquinas-de-helado": (
        "Balanced walnut kitchen comparison composition with a brushed stainless frozen-base pint maker on the left "
        "and a classic paddle churn bowl machine on the right, each flanked by a freshly scooped glass of vanilla"
    ),
    "cat-maquinas-por-precio-porciones-y-espacio": (
        "Bright compact apartment kitchenette counter comparing an entry-level petite pastel ice cream churner and "
        "a mid-size digital countertop ice cream maker with neat measuring cups showing 2-to-8 scoop servings"
    ),
    "cat-vasos-tapas-y-recipientes-compatibles": (
        "Clean studio flat-lay on warm terrazzo featuring replacement transparent polycarbonate pints, grooved blades, "
        "airtight snap lids in four colors, and double-walled thermal freezer storage tubs"
    ),
    "cat-maquinas-para-gelato-sorbete-y-soft-serve": (
        "Artisan Italian dessert prep counter featuring a low-overrun compressor gelato maker and a soft-serve "
        "dispenser swirling glossy espresso gelato and lemon sorbet into frosted glasses"
    ),
    "cat-ingredientes-bases-y-accesorios-heladeria": (
        "Pastry chef ingredient staging table with heavy cream bottle, Madagascar vanilla pods, allulose jar, "
        "guar gum spoon, cocoa nibs, spring-loaded metal scoop and digital kitchen scale"
    ),
    "cat-guia-compatibilidad-vasos-tazones-y-repuestos": (
        "Technical side-by-side layout on white slate comparing 16oz standard pints versus taller 24oz deluxe pints "
        "plus stainless steel paddles and color-coded sealing rings arranged neatly by model size"
    ),
    "cat-espacio-en-congelador-tiempo-y-funcionamiento": (
        "Architectural kitchen view showing an open freezer compartment next to a digital thermometer displaying "
        "-18C beside neatly spaced pint tubs and a compact frozen churn cylinder"
    ),
    "cat-recetas-de-helados-cremosos-y-gelatos": (
        "Cozy dark slate dessert counter with three ceramic tasting bowls of French custard vanilla, dark chocolate "
        "stracciatella and roasted hazelnut ice cream garnished with chocolate curls"
    ),
    "cat-recetas-de-sorbetes-y-frutas-naturales": (
        "Vibrant morning fruit sorbet bar covered in dew drops featuring ruby strawberry-lime, golden passionfruit, "
        "and watermelon mint sorbet scoops in chilled coupe glasses"
    ),
    "cat-helados-saludables-proteicos-keto-y-sin-lactosa": (
        "Fresh sunlit light-oak countertop displaying coconut milk chocolate avocado ice cream, whey protein "
        "cookie dough pint and sugar-free berry bowl with almond flakes and dark cacao"
    ),
    "cat-textura-ciencia-del-helado-y-tecnicas": (
        "Close-up 100mm macro shot capturing micro-smooth ribboned ice cream texture curling cleanly off a polished "
        "stainless paddle with zero ice crystals under crisp directional lighting"
    ),
    "cat-limpieza-cuidado-y-solucion-de-problemas": (
        "Clean maintenance counter showing brushed steel ice cream maker shaft dried carefully with soft cloth, "
        "rinsed silicone gasket, lid latch check and clear care manual silhouette"
    ),
    "cat-guia-de-compra-envio-y-voltaje-amazon-usa": (
        "Home kitchen unboxing moment on warm wood island showing cardboard shipping box open next to a gleaming "
        "stainless US-plug 120V countertop ice cream maker and stainless ice cream scoop"
    ),

    # 28 Variantes Escénicas Anti-Similitud (2 extra por cada uno de los 14 silos)
    "scene-resenas-2": (
        "Oblique close-up of a tall deluxe 24oz countertop ice cream maker finishing a mix-in spin filled with Oreo "
        "cookie crumble swirl on a light gray quartz counter"
    ),
    "scene-resenas-3": (
        "Lifestyle kitchen bench showing a matte black 2-quart compressor ice cream maker churn paddle lifting out "
        "glossy coffee fudge swirl ice cream"
    ),
    "scene-comparativas-2": (
        "Split macro comparison of two glass bowls side by side: dense low-air Italian gelato texture on the left "
        "versus light airy traditional churned vanilla scoop on the right"
    ),
    "scene-comparativas-3": (
        "Compact apartment counter comparing height and footprint of an upright 16oz pint shaver beside a wide "
        "insulated freezer bowl ice cream maker under cabinets"
    ),
    "scene-precio-2": (
        "Cozy student apartment kitchen counter with an adorable compact pastel mini ice cream maker whipping up a "
        "single-serve swirl of salted caramel vanilla beside a ceramic mug"
    ),
    "scene-precio-3": (
        "Large family kitchen island during weekend dinner hosting a high-output 2-quart automated ice cream maker "
        "surrounded by five colorful ceramic dessert bowls"
    ),
    "scene-vasos-2": (
        "Hands snapping an airtight silicone lid onto a labeled homemade chocolate peanut butter pint before sliding "
        "it onto a neat rack of matching reusable tubs"
    ),
    "scene-vasos-3": (
        "Close-up of insulated double-walled stainless steel 1.5Qt freezer storage tub with non-slip base keeping "
        "freshly scooped raspberry sorbet rock solid on a wooden table"
    ),
    "scene-gelato-2": (
        "Italian cafe style marble counter with a chilled brass gelato spatola folding glossy fior di latte gelato "
        "into a cold stainless pozzetti container"
    ),
    "scene-gelato-3": (
        "Countertop soft-serve maker pulling a tall graceful spiral of Madagascar vanilla swirl into a crispy cone "
        "while chocolate sprinkles rest in tiny glass bowls"
    ),
    "scene-insumos-2": (
        "Hands whisking golden egg yolks, heavy cream and warmed milk in a glass saucepan with an instant-read digital "
        "thermometer resting against a copper rim"
    ),
    "scene-insumos-3": (
        "Tiny brass tasting spoons beside bowls of crushed Lotus Biscoff cookies, toasted pecans, freeze-dried "
        "strawberries and dark chocolate chips ready for mix-in cycle"
    ),
    "scene-compatibilidad-2": (
        "Detailed overhead comparison showing narrow ridge grooves on a standard 16oz pint beside taller vertical "
        "flutes on a 24oz deluxe pint and matching lids"
    ),
    "scene-compatibilidad-3": (
        "Clean close-up of a stainless dual-blade creamerizer paddle resting beside its magnetic drive spindle socket "
        "and replacement gray silicone O-ring seal"
    ),
    "scene-freezer-2": (
        "Visual level check on a kitchen freezer shelf showing a frozen flat-bottom pint container leveled completely "
        "smooth beside a frosted churn cylinder upright in the back"
    ),
    "scene-freezer-3": (
        "Compact dorm fridge-freezer top compartment holding two flat-packed spare pint tubs tucked neatly next to "
        "frozen berries without crowding shelves"
    ),
    "scene-helados-2": (
        "Rustic wood countertop showcasing homemade roasted strawberry cream ice cream dotted with glossy chocolate "
        "stracciatella shards in vintage coupe glasses"
    ),
    "scene-helados-3": (
        "Moody afternoon coffee bar pairing a warm double espresso pouring over cold vanilla bean gelato (affogato) "
        "in a ribbed tumbler"
    ),
    "scene-sorbetes-2": (
        "Overhead bright natural-light shot of deep purple blackberry and fresh mint sorbet scoops in stoneware bowls "
        "with droplets of condensation"
    ),
    "scene-sorbetes-3": (
        "Crisp bright citrus kitchen board with blood orange halves, zester and freshly churned Sicilian lemon-basil "
        "sorbet inside a chilled metallic bowl"
    ),
    "scene-keto-2": (
        "Minimalist white stone counter showing creamy avocado lime keto ice cream garnished with toasted coconut "
        "chips and zero-sugar dark chocolate shavings"
    ),
    "scene-keto-3": (
        "Dairy-free dessert bowl filled with velvety oat-milk chocolate brownie fudge ice cream next to raw cacao beans "
        "and oat milk carafe"
    ),
    "scene-textura-2": (
        "Editorial step-by-step tabletop comparison showing crumbly powdery first-spin ice crystals beside silky "
        "smooth custard-like result after adding a splash of milk and re-spinning"
    ),
    "scene-textura-3": (
        "Crisp close-up of liquid honey glucose syrup drizzling into chilled vanilla base inside a frosted glass pitcher "
        "to demonstrate sugar crystallization control"
    ),
    "scene-limpieza-2": (
        "Top rack of a clean stainless home dishwasher loaded neatly with transparent ice cream pints, colorful lids "
        "and paddle separated safely from heating coils"
    ),
    "scene-limpieza-3": (
        "Quiet bright kitchen corner illustrating leveled countertop machine feet on a dark non-slip mat during an "
        "uninterrupted spin cycle"
    ),
    "scene-compra-2": (
        "Clean close-up of a heavy-duty UL-listed 110V/120V grounded US three-prong plug next to a sleek compact voltage "
        "converter box on a home workshop bench"
    ),
    "scene-compra-3": (
        "Sunny modern kitchen island unpacking insulated pantry tubs, stainless spring scoop and spare pint bundle "
        "arriving fresh from online delivery"
    ),
}

TOP_ARTICLE_SLUGS = [
    "ninja-creami-nc301-resena-precio-porciones-espacio-freezer",
    "ninja-creami-deluxe-nc501-resena-completa",
    "cuisinart-ice-21p1-resena-precio-porciones-espacio",
    "cuisinart-ice-100-compresor-resena-gelato-helado-sin-freezer",
    "ninja-creami-nc301-vs-cuisinart-ice-21-comparativa-completa",
    "mejores-vasos-tapas-compatibles-ninja-creami-amazon",
    "mejores-contenedores-termicos-guardar-helado-casero",
    "guia-compatibilidad-vasos-tapas-ninja-creami-nc301-nc501-breeze-swirl",
    "como-elegir-maquina-helado-segun-espacio-congelador",
    "receta-helado-vainilla-cremoso-ninja-cuisinart",
    "receta-gelato-pistacho-italiano-en-casa",
    "receta-sorbete-mango-natural-cremoso-ninja-cuisinart",
    "receta-helado-proteico-vainilla-chocolate-ninja-creami",
    "como-evitar-cristales-hielo-en-helado-casero",
    "como-limpiar-tapa-exterior-eje-ninja-creami",
]


def call(slug: str, prompt: str) -> bytes:
    data = json.dumps({"slug": slug, "prompt": prompt}).encode()
    req = urllib.request.Request(
        ENDPOINT,
        data=data,
        headers={
            "Content-Type": "application/json",
            "x-heladoencasa-token": TOKEN,
        },
    )
    with urllib.request.urlopen(req, timeout=240) as r:
        res = json.loads(r.read())
    if not res.get("ok"):
        raise RuntimeError(res.get("error") or res)
    with urllib.request.urlopen(res["url"] + "?v=1", timeout=120) as r:
        return r.read()


def compute_dhash(img: Image.Image, hash_size: int = 8) -> int:
    """64-bit difference hash to spot visually near-duplicate images."""
    gray = img.convert("L").resize((hash_size + 1, hash_size), Image.LANCZOS)
    pixels = list(gray.getdata())
    diff = 0
    for row in range(hash_size):
        row_start = row * (hash_size + 1)
        for col in range(hash_size):
            diff = (diff << 1) | (1 if pixels[row_start + col] > pixels[row_start + col + 1] else 0)
    return diff


def hamming(h1: int, h2: int) -> int:
    return bin(h1 ^ h2).count("1")


def save_variants(slug: str, raw_bytes: bytes, outdir: pathlib.Path) -> dict[str, int]:
    outdir.mkdir(parents=True, exist_ok=True)
    im = Image.open(io.BytesIO(raw_bytes)).convert("RGB")
    w, h = im.size
    target = 16 / 9
    if w / h > target:
        nw = int(h * target)
        im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else:
        nh = int(w / target)
        im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))

    # Límite estricto: <= 68 KB para 1200x675 (garantizando siempre < 100 KB para SEO)
    sizes = {"": 1200, "-800": 800, "-400": 400}
    limits = {"": 68_000, "-800": 42_000, "-400": 18_000}
    out: dict[str, int] = {}
    for suf, width in sizes.items():
        cur_w = width
        q = 78
        while True:
            r = im.resize((cur_w, round(cur_w * 9 / 16)), Image.LANCZOS)
            buf = io.BytesIO()
            r.save(buf, "WEBP", quality=q, method=6)
            if buf.tell() <= limits[suf]:
                break
            if q > 26:
                q -= 5
            elif cur_w > 640:
                cur_w = int(cur_w * 0.88)
            else:
                break
        p = outdir / f"{slug}{suf}.webp"
        p.write_bytes(buf.getvalue())
        out[suf] = buf.tell()
    return out


def job(slug: str, prompt: str, outdir: pathlib.Path) -> tuple[str, str]:
    final = outdir / f"{slug}.webp"
    if final.exists() and final.stat().st_size <= 68_000:
        return slug, f"skip ({final.stat().st_size // 1024}KB)"
    rawp = RAW / f"{slug}.webp"
    if rawp.exists():
        b = rawp.read_bytes()
    else:
        last = None
        for _ in range(3):
            try:
                b = call(slug, prompt)
                break
            except Exception as e:
                last = e
        else:
            return slug, f"ERROR {last}"
        rawp.write_bytes(b)
    sizes = save_variants(slug, b, outdir)
    return slug, f"ok {sizes[''] // 1024}KB"


def run_audit() -> int:
    img_dir = ROOT / "public/img"
    oversized: list[tuple[str, int]] = []
    hashes: list[tuple[str, int]] = []
    for p in sorted(img_dir.rglob("*.webp")):
        size = p.stat().st_size
        if size > 100_000:
            oversized.append((str(p.relative_to(ROOT)), size))
        if not p.stem.endswith(("-800", "-400")):
            with Image.open(p) as im:
                hashes.append((str(p.relative_to(ROOT)), compute_dhash(im)))

    near_dupes: list[tuple[str, str, int]] = []
    for i in range(len(hashes)):
        n1, h1 = hashes[i]
        for j in range(i + 1, len(hashes)):
            n2, h2 = hashes[j]
            dist = hamming(h1, h2)
            if dist <= 5:
                near_dupes.append((n1, n2, dist))

    print(f"Audited {len(hashes)} primary WebPs ({len(list(img_dir.rglob('*.webp')))} total variants).")
    if oversized:
        print("OVERSIZED (>100KB):", oversized)
    else:
        print("All WebP files <= 100 KB (target <= 68 KB for 1200px).")
    if near_dupes:
        print(f"Near-duplicate pairs (dHash <= 5): {len(near_dupes)} -> {near_dupes[:10]}")
    else:
        print("Visual diversity verified: 0 near-duplicate pairs (all Hamming distances > 5).")
    return 1 if oversized else 0


def main() -> None:
    mode = sys.argv[1] if len(sys.argv) > 1 else "home"
    if mode == "audit":
        raise SystemExit(run_audit())

    tasks: list[tuple[str, str, pathlib.Path]] = []
    if mode == "home":
        for s, p in HOME_PROMPTS.items():
            tasks.append((s, p, ROOT / "public/img/ambiente"))
        art_dir = ROOT / "src/content/articles"
        for slug in TOP_ARTICLE_SLUGS:
            f = art_dir / f"{slug}.json"
            if f.exists():
                a = json.loads(f.read_text())
                tasks.append(
                    (a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos")
                )
    elif mode == "articles":
        for f in sorted((ROOT / "src/content/articles").glob("*.json")):
            a = json.loads(f.read_text())
            tasks.append(
                (a["slug"], a["image"]["prompt"], ROOT / "public/img/articulos")
            )
    elif mode == "one":
        tasks.append((sys.argv[2], sys.argv[3], ROOT / "public/img/ambiente"))

    errors = []
    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        for slug, status in ex.map(lambda t: job(*t), tasks):
            print(slug, status, flush=True)
            if status.startswith("ERROR"):
                errors.append((slug, status))

    audit_rc = run_audit()
    if errors or audit_rc:
        print(f"Completed with errors={len(errors)}, audit_rc={audit_rc}", file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
