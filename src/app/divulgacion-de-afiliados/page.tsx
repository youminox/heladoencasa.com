import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";
import { AMAZON_TAG_US, AMAZON_TAG_ES } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Divulgación de Afiliados de Amazon",
  description: `Transparencia de enlaces de afiliado a Amazon EE. UU. y Amazon España en ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/divulgacion-de-afiliados/` },
};

export default function DivulgacionPage() {
  return (
    <SimplePage
      title="Divulgación de Afiliados"
      crumb="Divulgación de afiliados"
      href="/divulgacion-de-afiliados/"
      intro="Cómo se financia HeladoEnCasa.com sin afectar nuestra independencia editorial."
    >
      <h2>Participación en el Programa de Afiliados de Amazon</h2>
      <p>
        <strong>{SITE_NAME}</strong>, propiedad de{" "}
        <strong>{LEGAL_OWNER}</strong> (domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong> ·{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>), participa en el{" "}
        <strong>Programa de Afiliados de Amazon Services LLC</strong> (Amazon
        Estados Unidos, ID de seguimiento <code>{AMAZON_TAG_US}</code>) y en el
        Programa de Afiliados de Amazon EU (Amazon España, ID de seguimiento{" "}
        <code>{AMAZON_TAG_ES}</code>).
      </p>

      <h2>¿Cómo te afecta como comprador?</h2>
      <ul>
        <li>
          <strong>El precio es exactamente el mismo:</strong> comprar a través de
          nuestros enlaces en <code>amazon.com</code> o <code>amazon.es</code>{" "}
          no añade ningún recargo ni comisión sobre el precio que ves en Amazon.
        </li>
        <li>
          <strong>Advertimos incompatibilidades reales:</strong> señalamos de
          forma clara cuando unos vasos Ninja de <code>16 oz</code> (serie
          NC301) no entran en una Deluxe de <code>24 oz</code> (NC501) o
          cuando una Cuisinart requiere 24 h de congelador previo, para evitar
          devoluciones costosas.
        </li>
      </ul>
    </SimplePage>
  );
}
