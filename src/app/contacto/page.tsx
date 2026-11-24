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
  title: "Contacto",
  description: `Contacto directo con ${LEGAL_OWNER} (${LEGAL_LOCATION}) · ${LEGAL_EMAIL} y Asesor IA de ${SITE_NAME}.`,
  alternates: { canonical: `${SITE_URL}/contacto/` },
};

export default function ContactoPage() {
  return (
    <SimplePage
      title="Contacto"
      crumb="Contacto"
      href="/contacto/"
      intro="¿Tienes dudas sobre un modelo Ninja o Cuisinart, compatibilidad de vasos o quieres reportar un dato técnico?"
    >
      <h2>Datos de contacto oficial</h2>
      <ul>
        <li>
          <strong>Titular responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
      </ul>

      <h2>Asesoría inmediata sobre máquinas, vasos y recetas</h2>
      <p>
        Si buscas saber al instante si un pack de vasos sirve en tu modelo o qué
        máquina entra en tu congelador y presupuesto en Amazon EE. UU., nuestro
        asesor virtual responde en segundos:
      </p>
      <div className="my-6">
        <OpenChatButton
          label="Abrir Asesor de Helados IA en vivo"
          className="btn btn-buy shine"
        />
      </div>
    </SimplePage>
  );
}
