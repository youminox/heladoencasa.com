import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import OpenChatButton from "@/components/OpenChatButton";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description: `Quién dirige ${SITE_NAME} (${LEGAL_OWNER}, ${LEGAL_LOCATION}) y cómo te ayudamos a elegir tu máquina de helado ideal.`,
  alternates: { canonical: `${SITE_URL}/sobre-nosotros/` },
};

export default function SobreNosotrosPage() {
  return (
    <SimplePage
      title="Sobre HeladoEnCasa.com"
      crumb="Sobre nosotros"
      href="/sobre-nosotros/"
      intro="Guía independiente en español para acertar con tu máquina de helado Ninja, Cuisinart o de compresor en Amazon EE. UU."
    >
      <h2>Nuestra misión</h2>
      <p>
        Comprar una máquina de helados por internet suele generar tres dudas
        críticas que rara vez responden las fichas genéricas:{" "}
        <strong>¿cabe el tazón o los vasos en mi congelador?</strong>,{" "}
        <strong>¿qué porciones reales salen y cuánto tarda todo el proceso?</strong>{" "}
        y{" "}
        <strong>
          ¿qué vasos, tapas o paletas de repuesto son realmente compatibles?
        </strong>
      </p>
      <p>
        <strong>{SITE_NAME}</strong> nace para responder esas preguntas con
        tablas claras, más de 1,500 guías especializadas y recetas probadas de
        helados cremosos, gelatos y sorbetes de fruta natural.
      </p>

      <h2>Titular y dirección editorial</h2>
      <ul>
        <li>
          <strong>Titular y editor responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo de contacto:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <div className="my-6">
        <OpenChatButton
          label="Consultar ahora con el Asesor de Helados IA"
          className="btn btn-buy shine"
        />
      </div>
    </SimplePage>
  );
}
