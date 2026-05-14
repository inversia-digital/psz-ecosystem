/**
 * LegalDisclaimer — bloque de advertencia legal reutilizable.
 *
 * Tres variantes según el tipo de página:
 *  - "mortgage": páginas hipotecarias. Aclara que la concesión depende
 *    del banco, no del broker.
 *  - "investment": páginas de inversión inmobiliaria o calculadoras
 *    de rentabilidad. Aclara que estimaciones no son garantía de
 *    resultado.
 *  - "education": páginas de formación. Aclara que el contenido es
 *    educativo, no garantiza resultados económicos.
 *
 * Cumple las recomendaciones de la guía de transparencia para
 * intermediarios de crédito inmobiliario (Ley 5/2019) y la
 * normativa de consumidores (RDL 1/2007).
 */

export type DisclaimerVariant = 'mortgage' | 'investment' | 'education'

const COPY: Record<DisclaimerVariant, { title: string; body: string }> = {
  mortgage: {
    title: 'Advertencia — Intermediación de crédito inmobiliario',
    body:
      'La intervención de Inversia Global Digital, S.L.U. como intermediario de crédito inmobiliario nº E242 no garantiza la aprobación de la operación ni la obtención de unas condiciones concretas. La concesión de la financiación está sujeta al análisis de solvencia, estudio de riesgo y aprobación final de la entidad financiera correspondiente, conforme a sus propios criterios internos.',
  },
  investment: {
    title: 'Advertencia — Inversión inmobiliaria',
    body:
      'Toda inversión inmobiliaria implica riesgos. Las rentabilidades, escenarios o estimaciones mostradas tienen carácter meramente orientativo y no constituyen una garantía de resultado. Los resultados reales pueden variar en función del precio final de compra, financiación obtenida, gastos, impuestos, ocupación, estado del inmueble, evolución del mercado, fiscalidad personal y demás circunstancias de cada operación. Esta información no constituye asesoramiento financiero, fiscal o de inversión personalizado.',
  },
  education: {
    title: 'Advertencia — Formación',
    body:
      'Los contenidos formativos tienen finalidad educativa e informativa. La adquisición de una formación no garantiza resultados económicos, profesionales, financieros o de inversión concretos. Las decisiones que el alumno tome en virtud del contenido aprendido son responsabilidad exclusiva del alumno y, cuando la naturaleza de la decisión lo requiera, deberán ser validadas por profesionales colegiados autorizados.',
  },
}

export function LegalDisclaimer({ variant }: { variant: DisclaimerVariant }) {
  const { title, body } = COPY[variant]
  return (
    <aside
      role="note"
      aria-label={title}
      className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm leading-relaxed text-amber-900"
    >
      <p className="font-bold text-amber-950 mb-1.5">{title}</p>
      <p>{body}</p>
    </aside>
  )
}
