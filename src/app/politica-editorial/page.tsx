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
  title: "Política Editorial y Metodología",
  description: `Cómo comparamos máquinas de helado Ninja y Cuisinart, vasos compatibles y recetas en ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/politica-editorial/` },
};

export default function PoliticaEditorialPage() {
  return (
    <SimplePage
      title="Política Editorial y Metodología"
      crumb="Política editorial"
      href="/politica-editorial/"
      intro="Criterios técnicos que aplicamos en cada reseña, comparativa, tabla de compatibilidad y receta."
    >
      <h2>Los 4 ejes reales que evaluamos en cada máquina</h2>
      <ul>
        <li>
          <strong>Precio orientativo en Amazon EE. UU.:</strong> distinguimos
          gamas reales desde tazones económicos (&lt; US$80) hasta sistemas
          CREAMi (US$160–$320) y heladeras con compresor autónomo (US$270–$499).
        </li>
        <li>
          <strong>Porciones reales servidas:</strong> traducimos cuartos (Qt) y
          onzas (oz) a bolas reales de helado para saber si un lote alcanza para
          una persona, una pareja o una familia.
        </li>
        <li>
          <strong>Tiempo total frente a tiempo activo:</strong> aclaramos
          siempre las horas previas de congelación frente a los minutos reales de
          batido o centrifugado.
        </li>
        <li>
          <strong>Espacio real en el congelador:</strong> medimos el diámetro y
          altura de cada tazón Cuisinart y cada vaso Ninja frente a las opciones
          con compresor que ocupan 0 cm³ en el freezer.
        </li>
      </ul>

      <h2>Verificación de vasos, tapas y recetas</h2>
      <p>
        Cada guía de repuestos verifica el código de serie exacto en la base de
        la máquina (como <code>NC299/NC300/NC301</code> frente a{" "}
        <code>NC500/NC501</code>, <code>Breeze</code> o <code>Swirl</code>, y
        tazones <code>ICE-21RFB</code> frente a <code>ICE-30RFB</code>). Nuestras
        recetas se expresan en gramos y tazas tanto para pintas Ninja como para
        tazones Cuisinart.
      </p>

      <h2>Contacto editorial</h2>
      <p>
        Dirección editorial: <strong>{LEGAL_OWNER}</strong> ({LEGAL_LOCATION}) ·{" "}
        <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
      </p>
    </SimplePage>
  );
}
