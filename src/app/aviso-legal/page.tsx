import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";
import {
  SITE_URL,
  SITE_NAME,
  LEGAL_OWNER,
  LEGAL_LOCATION,
  LEGAL_EMAIL,
  ICE_CREAM_DISCLAIMER,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Aviso Legal",
  description: `Aviso legal y titularidad de ${SITE_NAME}: ${LEGAL_OWNER}, ${LEGAL_LOCATION} (${LEGAL_EMAIL}).`,
  alternates: { canonical: `${SITE_URL}/aviso-legal/` },
};

export default function AvisoLegalPage() {
  return (
    <SimplePage
      title="Aviso Legal y Titularidad"
      crumb="Aviso legal"
      href="/aviso-legal/"
      intro="Información legal, titularidad del dominio y condiciones de uso de HeladoEnCasa.com."
    >
      <h2>1. Datos del titular del sitio web</h2>
      <ul>
        <li>
          <strong>Titular responsable:</strong> {LEGAL_OWNER}
        </li>
        <li>
          <strong>Domicilio:</strong> {LEGAL_LOCATION}
        </li>
        <li>
          <strong>Correo electrónico de contacto:</strong>{" "}
          <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
        </li>
        <li>
          <strong>Dominio oficial:</strong> {SITE_URL}
        </li>
      </ul>

      <h2>2. Objeto del portal</h2>
      <p>
        {SITE_NAME} es una guía informativa y comparativa en español dedicada a
        ayudar a elegir máquinas de helado caseras de marcas como Ninja y
        Cuisinart (junto a alternativas con compresor o tazón congelador)
        disponibles en Amazon Estados Unidos, evaluando precio, porciones,
        tiempo de preparación, espacio requerido en el congelador, recetas de
        helados y sorbetes, y compatibilidad de vasos, tapas y recipientes de
        repuesto.
      </p>

      <h2>3. Propiedad intelectual y marcas comerciales</h2>
      <p>
        Todos los textos originales, tablas comparativas, recetas adaptadas y el
        diseño editorial pertenecen a {LEGAL_OWNER}. Respecto a fabricantes y
        tiendas citadas: {ICE_CREAM_DISCLAIMER}.
      </p>

      <h2>4. Enlaces externos y exención de responsabilidad</h2>
      <p>
        Los precios orientativos en dólares (USD), tiempos de entrega y
        disponibilidad de stock mostrados en nuestras comparativas dependen de
        los vendedores y de Amazon en el momento de la consulta. Verifica siempre
        el precio final y las especificaciones del vendedor antes de confirmar tu
        pedido.
      </p>
    </SimplePage>
  );
}
