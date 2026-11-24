import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Política de privacidad de ${SITE_NAME} administrado por ${LEGAL_OWNER} (${LEGAL_LOCATION}).`,
  alternates: { canonical: `${SITE_URL}/politica-de-privacidad/` },
};

export default function PrivacidadPage() {
  return (
    <SimplePage
      title="Política de Privacidad"
      crumb="Privacidad"
      href="/politica-de-privacidad/"
      intro="Tratamiento transparente de datos conforme a la Ley N.º 29733 (Perú), CCPA/CPRA y RGPD."
    >
      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de este sitio web es{" "}
        <strong>{LEGAL_OWNER}</strong>, con domicilio en{" "}
        <strong>{LEGAL_LOCATION}</strong> y correo electrónico de contacto{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>

      <h2>2. Qué datos recopilamos</h2>
      <ul>
        <li>
          <strong>Navegación general:</strong> puedes leer todas las guías,
          comparativas y recetas de {SITE_NAME} sin registrarte ni entregar
          datos personales.
        </li>
        <li>
          <strong>Asesor de Helados IA (Chat Online):</strong> cuando realizas
          una consulta voluntaria en el chat, guardamos el texto de la pregunta,
          un identificador anónimo aleatorio generado en tu navegador (
          <code>hlc_visitor</code>), la página de origen y los clics en
          enlaces recomendados para mejorar las recomendaciones de productos y
          recetas. No solicites ni envíes datos bancarios ni contraseñas en el
          chat.
        </li>
        <li>
          <strong>Correo electrónico:</strong> si nos escribes a{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>, trataremos tu
          dirección exclusivamente para responder tu consulta.
        </li>
      </ul>

      <h2>3. Derechos de acceso, rectificación y supresión</h2>
      <p>
        Puedes ejercer en cualquier momento tus derechos de acceso,
        rectificación, cancelación u oposición escribiendo a{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
