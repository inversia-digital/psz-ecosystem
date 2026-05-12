import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'

export const metadata: Metadata = {
  title: 'Aviso legal — Estructuras societarias internacionales',
  description:
    'Alcance, limitaciones y advertencias específicas del servicio de asesoramiento en estructuras societarias internacionales (LLC, sociedades en jurisdicciones extranjeras).',
  alternates: { canonical: `${SITE_URLS.psz}/disclaimer-estructuras-internacionales` },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main>
      <Section tone="paper" padding="md" title="Aviso legal — Estructuras societarias internacionales">
        <Container size="md">
          <div className="prose-psz">
            <p>
              Este aviso complementa las{' '}
              <a href="/terminos">Condiciones generales de contratación</a> y la{' '}
              <a href="/politica-privacidad">Política de privacidad</a> del prestador, aplicándose
              específicamente a los servicios de asesoramiento en{' '}
              <strong>diseño de estructuras societarias internacionales</strong> (sociedades
              constituidas fuera del territorio español, especialmente LLC americanas y figuras
              equivalentes en otras jurisdicciones).
            </p>

            <h2>1. Alcance del servicio</h2>
            <p>
              INVERSIA GLOBAL DIGITAL, S.L.U. presta servicios de <strong>asesoramiento
              estratégico en el diseño de estructuras societarias internacionales</strong>: análisis
              de la situación patrimonial del cliente, recomendación de la jurisdicción más
              adecuada, diseño del organigrama societario, coordinación de los profesionales
              locales y acompañamiento durante la implementación y los primeros meses de
              operativa.
            </p>

            <h2>2. Lo que el servicio NO incluye</h2>
            <p>
              El prestador <strong>no presta servicios jurídicos en jurisdicciones extranjeras</strong>.
              En particular, declara expresamente lo siguiente:
            </p>
            <ul>
              <li>
                No es abogado autorizado en los Estados Unidos de América, Panamá, Reino Unido,
                Suiza, Países Bajos, Irlanda ni en ninguna otra jurisdicción no española.
              </li>
              <li>
                No constituye sociedades en jurisdicciones extranjeras por sí mismo: la
                constitución la realizan abogados y agentes registrados en la jurisdicción
                correspondiente, con quienes el prestador colabora habitualmente.
              </li>
              <li>
                No emite dictámenes fiscales que sustituyan al criterio de un asesor fiscal
                colegiado. Toda recomendación fiscal incluida en su asesoramiento es
                orientativa y debe ser validada por un asesor fiscal especializado antes de su
                implementación.
              </li>
              <li>
                No representa al cliente ante las autoridades fiscales extranjeras (IRS, SAT
                panameño, HMRC, etc.). Esa representación corresponde a profesionales locales
                autorizados.
              </li>
            </ul>

            <h2>3. Obligaciones de declaración en España</h2>
            <p>
              El cliente reconoce expresamente que la constitución de estructuras societarias en
              el extranjero genera obligaciones declarativas frente a las autoridades fiscales
              españolas, en particular:
            </p>
            <ul>
              <li>
                <strong>Modelo 720</strong> — declaración informativa sobre bienes y derechos
                situados en el extranjero, cuando superen los umbrales legales (50.000 € por
                categoría).
              </li>
              <li>
                <strong>Modelo 100</strong> (IRPF) — declaración de rendimientos imputables al
                contribuyente derivados de la estructura, incluyendo, en su caso, la imputación
                conforme al régimen de transparencia fiscal internacional (art. 91 LIRPF) si
                concurren los presupuestos legales.
              </li>
              <li>
                <strong>Modelo 232</strong> — declaración informativa de operaciones vinculadas y
                situaciones con países o territorios de no cooperación, cuando proceda.
              </li>
              <li>
                <strong>Modelo D-6</strong> — declaración de inversiones españolas en sociedades
                extranjeras (Registro de Inversiones del Ministerio de Industria, Comercio y
                Turismo).
              </li>
              <li>
                Cualquier otra obligación que surja en función de la jurisdicción concreta, la
                forma jurídica adoptada y la situación patrimonial específica del cliente.
              </li>
            </ul>
            <p>
              <strong>El cumplimiento de estas obligaciones es responsabilidad exclusiva del
              cliente.</strong> El prestador orienta sobre su existencia y recomienda a un asesor
              fiscal especializado para su correcta tramitación.
            </p>

            <h2>4. Cumplimiento normativo</h2>
            <p>
              El prestador no presta servicios de asesoramiento que impliquen:
            </p>
            <ul>
              <li>
                Constitución de estructuras en jurisdicciones consideradas no cooperativas por la
                OCDE o por la legislación española vigente (lista de paraísos fiscales publicada
                por el Ministerio de Hacienda).
              </li>
              <li>
                Opacidad u ocultación de la titularidad real frente a las autoridades fiscales
                españolas. Toda estructura diseñada por el prestador es plenamente declarable y
                trazable conforme a la normativa de transparencia fiscal internacional.
              </li>
              <li>
                Operaciones contrarias a la Ley 10/2010 de prevención del blanqueo de capitales y
                de la financiación del terrorismo.
              </li>
              <li>
                Esquemas que aprovechen, de forma planificada y artificial, asimetrías normativas
                entre jurisdicciones con el único propósito de obtener una ventaja fiscal
                indebida (planificación fiscal agresiva en el sentido del Real Decreto-ley
                4/2024).
              </li>
            </ul>

            <h2>5. Profesionales locales colaboradores</h2>
            <p>
              Para la implementación de estructuras en jurisdicciones extranjeras, el prestador
              colabora con profesionales (abogados, agentes residentes, gestorías, asesores
              fiscales) cualificados y autorizados en cada jurisdicción. La selección de estos
              profesionales se realiza con criterios de cualificación profesional, reputación y
              cumplimiento normativo.
            </p>
            <p>
              <strong>Los honorarios y servicios de estos profesionales locales son por cuenta
              del cliente</strong> y se acuerdan directamente entre el cliente y el profesional.
              El prestador puede coordinar la relación pero no es responsable de los servicios
              prestados por estos terceros.
            </p>

            <h2>6. Cambios normativos sobrevenidos</h2>
            <p>
              El asesoramiento se presta conforme a la normativa vigente en el momento de la
              recomendación. Los cambios normativos posteriores (en España o en la jurisdicción
              extranjera) pueden afectar a la eficacia o conveniencia de la estructura. El
              prestador ofrece servicios de acompañamiento posterior (revisión periódica) pero
              <strong>el cliente asume el riesgo de cambios normativos sobrevenidos</strong> a la
              fecha del asesoramiento.
            </p>

            <h2>7. Limitación de responsabilidad</h2>
            <p>
              La responsabilidad del prestador queda limitada al servicio efectivamente
              contratado y prestado conforme a los términos firmados. El prestador no responde de:
            </p>
            <ul>
              <li>Decisiones del cliente que se aparten de la recomendación profesional emitida.</li>
              <li>
                Errores de los profesionales locales en jurisdicciones extranjeras (cuya
                responsabilidad se rige por las normas de su propia jurisdicción).
              </li>
              <li>
                Incumplimiento del cliente de sus obligaciones declarativas o tributarias en
                España.
              </li>
              <li>Cambios normativos posteriores a la fecha del asesoramiento.</li>
            </ul>

            <h2>8. Aceptación expresa</h2>
            <p>
              Al contratar servicios de asesoramiento en estructuras societarias internacionales,
              el cliente reconoce haber leído y aceptado los términos de este aviso. La firma del
              contrato específico del servicio implica la aceptación plena de las limitaciones y
              advertencias aquí contenidas.
            </p>

            <p className="text-sm text-ink-muted mt-12">
              Última actualización: mayo de 2026.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
