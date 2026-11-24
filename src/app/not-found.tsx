import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { getContextualAmazonProducts } from "@/lib/amazon";

export default function NotFound() {
  const amz = getContextualAmazonProducts("404", "home", "Máquinas de Helado");
  return (
    <>
      <Header />
      <main className="pt-[68px]">
        <div className="wrap py-20 text-center">
          <span className="eyebrow">Página no encontrada</span>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Este helado se derritió, pero tenemos más recetas y guías listas
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
            Explora nuestras 1,534 guías sobre máquinas de helado Ninja y
            Cuisinart, compatibilidad de vasos y tapas, y recetas de helados y
            sorbetes en Amazon EE. UU.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-buy shine">
              Volver al inicio
            </Link>
            <Link href="/resenas-maquinas-de-helado/" className="btn btn-ghost">
              Ver Reseñas Ninja y Cuisinart
            </Link>
          </div>
        </div>
        <div className="wrap pb-10">
          <AmazonAffiliateBox
            variant="showcase"
            sectionTitle={amz.sectionTitle}
            sectionSubtitle={amz.sectionSubtitle}
            products={amz.products}
            source="404"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
