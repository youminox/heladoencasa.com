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
  title: "Política de Cookies",
  description: `Uso de almacenamiento técnico y cookies de afiliados en ${SITE_NAME} (${LEGAL_OWNER}, ${LEGAL_LOCATION}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-cookies/` },
};

export default function CookiesPage() {
  return (
    <SimplePage
      title="Política de Cookies"
      crumb="Cookies"
      href="/politica-de-cookies/"
      intro="Uso de almacenamiento local técnico y cookies de atribución de Amazon Associates."
    >
      <h2>1. Responsable</h2>
      <p>
        Sitio web operado por <strong>{LEGAL_OWNER}</strong>, domiciliado en{" "}
        <strong>{LEGAL_LOCATION}</strong> · Contacto:{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2>2. Almacenamiento técnico propio</h2>
      <ul>
        <li>
          <code>hlc_amazon_region</code>: recuerda si elegiste ver los enlaces
          en <strong>Amazon Estados Unidos</strong> (<code>{AMAZON_TAG_US}</code>)
          o <strong>Amazon España</strong> (<code>{AMAZON_TAG_ES}</code>).
        </li>
        <li>
          <code>hlc_visitor</code>, <code>hlc_chat_session</code> y{" "}
          <code>hlc_chat_messages</code>: conservan tu historial reciente con el
          Asesor de Helados IA dentro de tu propio dispositivo.
        </li>
      </ul>

      <h2>3. Cookies de terceros (Amazon Afiliados y analítica)</h2>
      <p>
        Cuando haces clic en un botón de producto hacia Amazon, Amazon utiliza
        cookies de atribución propias durante el periodo reglamentario del
        programa (habitualmente 24 horas) para registrar si la compra procede de
        nuestra recomendación, sin modificar en ningún caso el precio que pagas.
      </p>
    </SimplePage>
  );
}
