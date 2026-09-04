/**
 * Documento PDF de la calculadora de rentabilidad inmobiliaria.
 *
 * Server-only — usado desde /api/pdf/rentabilidad. NUNCA llega al bundle
 * del cliente (el cliente solo hace POST y descarga el blob resultante).
 *
 * Branding obligatorio (zonas no recortables por el lector PDF):
 *   - Header: TOÑO PALACIOS · BROKER HIPOTECARIO Nº E242 · PRESIDENTE ANICI
 *   - Footer: psz.es · © Inversia Global Digital S.L.U. · doc orientativo
 *   - Numeración de página: x / y
 *
 * Colores: navy + gold, alineados con la web.
 */

import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import type { RoiResult, ScenarioResult } from '../actions'

// ─────────────────────────────────────────────────────────────────────────
// Paleta y estilos
// ─────────────────────────────────────────────────────────────────────────

const COLORS = {
  navy900: '#070E24',
  navy800: '#0F1B3D',
  navy700: '#1E3057',
  navy400: '#6674A6',
  navy100: '#D9DDE9',
  paper:   '#FAFAF7',
  paperSoft: '#F4F3EE',
  ink:     '#0F1B3D',
  inkSoft: '#1E3057',
  inkMuted: '#6674A6',
  gold400: '#C9A961',
  gold500: '#B69247',
  gold600: '#967636',
  red:     '#C41E3A',
  amber:   '#D97706',
  emerald: '#059669',
  sky:     '#0EA5E9',
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 70,
    paddingBottom: 60,
    paddingHorizontal: 36,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: COLORS.ink,
    backgroundColor: '#FFFFFF',
  },

  // ── Header (no recortable) ──
  header: {
    position: 'absolute',
    top: 20,
    left: 36,
    right: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.gold400,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  brandName: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.navy800,
    letterSpacing: 0.5,
  },
  brandRole: {
    fontSize: 7,
    color: COLORS.inkMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginTop: 1,
  },
  headerRight: {
    fontSize: 8,
    color: COLORS.gold600,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // ── Footer (no recortable) ──
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 36,
    right: 36,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.navy100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 7,
    color: COLORS.inkMuted,
  },
  footerBrand: {
    fontFamily: 'Helvetica-Bold',
    color: COLORS.navy800,
    fontSize: 8,
  },
  pageNumber: {
    fontFamily: 'Helvetica-Bold',
    color: COLORS.navy800,
  },

  // ── Title block ──
  title: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.navy800,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 9,
    color: COLORS.inkSoft,
    marginBottom: 18,
    lineHeight: 1.5,
  },
  eyebrow: {
    fontSize: 7,
    color: COLORS.gold600,
    letterSpacing: 1.5,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 4,
  },

  // ── Cards y secciones ──
  card: {
    backgroundColor: COLORS.paperSoft,
    borderWidth: 0.5,
    borderColor: COLORS.navy100,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },
  navyCard: {
    backgroundColor: COLORS.navy800,
    borderRadius: 6,
    padding: 14,
    marginBottom: 14,
    color: COLORS.paper,
  },

  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: COLORS.navy800,
    marginBottom: 8,
    marginTop: 6,
  },

  // ── Filas / tablas ──
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.navy100,
  },
  rowLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  rowLabel: {
    color: COLORS.inkSoft,
  },
  rowValue: {
    fontFamily: 'Helvetica-Bold',
    color: COLORS.navy800,
  },

  // ── Escenarios (3 columnas) ──
  scenariosGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  scenarioCol: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 4,
    padding: 8,
  },
  scPesimista: { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
  scProbable:  { backgroundColor: '#FFFBEB', borderColor: '#FDE68A' },
  scOptimista: { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' },

  scLabel: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  scRenta: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  scKpi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
    fontSize: 7.5,
  },

  // ── Warnings ──
  warning: {
    borderLeftWidth: 2,
    paddingLeft: 6,
    paddingVertical: 3,
    paddingRight: 6,
    marginBottom: 4,
    fontSize: 7.5,
  },
  warningTitle: {
    fontFamily: 'Helvetica-Bold',
    marginBottom: 1,
  },
  wInfo:    { borderLeftColor: COLORS.navy400, backgroundColor: '#F3F4F6' },
  wWarning: { borderLeftColor: COLORS.amber,   backgroundColor: '#FFFBEB' },
  wDanger:  { borderLeftColor: COLORS.red,     backgroundColor: '#FEF2F2' },
  wSuccess: { borderLeftColor: COLORS.emerald, backgroundColor: '#ECFDF5' },

  // ── Disclaimer ──
  disclaimer: {
    fontSize: 7,
    color: COLORS.inkMuted,
    backgroundColor: COLORS.paperSoft,
    borderRadius: 4,
    padding: 8,
    marginTop: 6,
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
})

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)

const eurDec = (n: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(n)

const pct = (n: number) => `${n.toFixed(2).replace('.', ',')}%`

const SC_LABELS = {
  pesimista: 'Pesimista',
  realista: 'Realista',
  optimista: 'Optimista',
} as const

const SC_STYLES = {
  pesimista: styles.scPesimista,
  realista: styles.scProbable,
  optimista: styles.scOptimista,
}

const SC_COLORS = {
  pesimista: COLORS.red,
  realista: COLORS.amber,
  optimista: COLORS.emerald,
}

// ─────────────────────────────────────────────────────────────────────────
// Componentes
// ─────────────────────────────────────────────────────────────────────────

/**
 * Marca maestra P6 para el PDF — monograma serif T·P partido por filete
 * vertical, usando la serif nativa de PDF (Times-Roman, sin registrar
 * fuentes ni trazados). Sobre fondo claro: T navy · P oro · filete oro.
 */
function PdfBrandMark({ size = 30 }: { size?: number }) {
  const glyph = size * 0.66
  return (
    <View
      style={{
        width: size,
        height: size,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontFamily: 'Times-Roman', fontSize: glyph, color: COLORS.navy800 }}>
        T
      </Text>
      <Text style={{ fontFamily: 'Times-Roman', fontSize: glyph, color: COLORS.gold400 }}>
        P
      </Text>
      <View
        style={{
          position: 'absolute',
          left: size / 2 - 0.35,
          top: size * 0.1,
          bottom: size * 0.1,
          width: 0.7,
          backgroundColor: COLORS.gold400,
        }}
      />
    </View>
  )
}

function Header() {
  return (
    <View style={styles.header} fixed>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <PdfBrandMark size={30} />
        <View style={[styles.headerLeft, { marginLeft: 9 }]}>
          <Text style={styles.brandName}>Toño Palacios</Text>
          <Text style={styles.brandRole}>
            Broker hipotecario nº E242 · Presidente de ANICI
          </Text>
        </View>
      </View>
      <Text style={styles.headerRight}>Análisis de rentabilidad</Text>
    </View>
  )
}

function Footer() {
  return (
    <View style={styles.footer} fixed>
      <Text>
        <Text style={styles.footerBrand}>psz.es</Text>
        {' · © Inversia Global Digital, S.L.U. · CIF B75281394 · Documento orientativo'}
      </Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  )
}

function ScenarioColumn({ e }: { e: ScenarioResult }) {
  const colorAccent = SC_COLORS[e.name]
  return (
    <View style={[styles.scenarioCol, SC_STYLES[e.name]]}>
      <Text style={[styles.scLabel, { color: colorAccent }]}>
        Escenario {SC_LABELS[e.name]}
      </Text>
      <Text style={[styles.scRenta, { color: colorAccent }]}>
        {eurDec(e.rentaMensual)}/mes
      </Text>

      <View style={styles.scKpi}>
        <Text>Rentabilidad adquisición</Text>
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>{pct(e.rentabilidadAdquisicionPct)}</Text>
      </View>
      <View style={styles.scKpi}>
        <Text>Rentabilidad real</Text>
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>{pct(e.rentabilidadRealPct)}</Text>
      </View>
      <View style={styles.scKpi}>
        <Text>Prima sobre bono</Text>
        <Text
          style={{
            fontFamily: 'Helvetica-Bold',
            color:
              e.primaSobreBonoPp < 0
                ? COLORS.red
                : e.primaSobreBonoPp >= 3
                  ? COLORS.emerald
                  : COLORS.navy800,
          }}
        >
          {e.primaSobreBonoPp >= 0 ? '+' : ''}
          {e.primaSobreBonoPp.toFixed(2).replace('.', ',')}pp
        </Text>
      </View>
      <View style={styles.scKpi}>
        <Text>Flujo neto mensual</Text>
        <Text
          style={{
            fontFamily: 'Helvetica-Bold',
            color: e.flujoNetoMensual < 0 ? COLORS.red : COLORS.navy800,
          }}
        >
          {eurDec(e.flujoNetoMensual)}
        </Text>
      </View>
      <View style={styles.scKpi}>
        <Text>Flujo neto anual</Text>
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>{eur(e.flujoNetoAnual)}</Text>
      </View>
      <View style={styles.scKpi}>
        <Text>Amortización ITP</Text>
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>
          {e.amortizacionItpAnios === 0
            ? '—'
            : `${e.amortizacionItpAnios.toFixed(1).replace('.', ',')} años`}
        </Text>
      </View>
      <View style={styles.scKpi}>
        <Text>Payback total</Text>
        <Text style={{ fontFamily: 'Helvetica-Bold' }}>
          {e.paybackAnios === Infinity
            ? '∞'
            : `${e.paybackAnios.toFixed(1).replace('.', ',')} años`}
        </Text>
      </View>
    </View>
  )
}

function WarningsList({ escenario }: { escenario: ScenarioResult }) {
  if (escenario.warnings.length === 0) return null
  const wStyles = {
    info: styles.wInfo,
    warning: styles.wWarning,
    danger: styles.wDanger,
    success: styles.wSuccess,
  }
  return (
    <View>
      <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: COLORS.navy700, marginBottom: 4 }}>
        Escenario {SC_LABELS[escenario.name]}
      </Text>
      {escenario.warnings.map((w, i) => (
        <View key={i} style={[styles.warning, wStyles[w.severity]]}>
          <Text style={styles.warningTitle}>{w.title}</Text>
          <Text>{w.body}</Text>
        </View>
      ))}
    </View>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// Documento principal
// ─────────────────────────────────────────────────────────────────────────

export interface RoiPdfProps {
  result: RoiResult
  fechaIso: string
  /**
   * Canary token forense — Capa 4.A.
   * Identificador único de esta descarga concreta, embebido en metadata
   * del PDF. Si el documento aparece distribuido en otra web/foro/redes,
   * podemos asociar el token al beacon registrado en logs de Vercel
   * (ip + ua + timestamp) y atribuir el origen de la filtración.
   */
  canaryToken?: string
}

export function RoiPdfDocument({ result, fechaIso, canaryToken }: RoiPdfProps) {
  const fecha = new Date(fechaIso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const inputs = result.inputs

  // Embebemos el canary token en keywords + producer + un campo
  // identificable. Cada descarga lleva un token distinto.
  const keywordsBase =
    'rentabilidad inmobiliaria, rentabilidad de adquisición, rentabilidad real, ITP por CCAA, amortización ITP, prima sobre bono español, sensibilidad al precio, Toño Palacios, broker hipotecario E242, ANICI, INARPA, Inversia Global Digital'
  const keywords = canaryToken ? `${keywordsBase}, doc-id:${canaryToken}` : keywordsBase
  const producer = canaryToken
    ? `psz.es — calculadoras propietarias de Toño Palacios — https://psz.es/sobre-mi — ${canaryToken}`
    : 'psz.es — calculadoras propietarias de Toño Palacios — https://psz.es/sobre-mi'

  return (
    <Document
      title="Análisis de rentabilidad inmobiliaria · El Pulso Palacios"
      author="Antonio Palacios Cambero (Toño Palacios) — broker hipotecario nº E242 (Banco de España) — presidente ANICI"
      subject="Análisis propietario de rentabilidad de adquisición y rentabilidad real para inversión inmobiliaria. Calculadora de psz.es."
      keywords={keywords}
      creator="psz.es / Inversia Global Digital, S.L.U. (CIF B75281394)"
      producer={producer}
    >
      <Page size="A4" style={styles.page}>
        <Header />

        <Text style={styles.eyebrow}>Análisis de rentabilidad inmobiliaria</Text>
        <Text style={styles.title}>Operación analizada</Text>
        <Text style={styles.subtitle}>
          Generado el {fecha} con la calculadora propietaria de psz.es. Documento orientativo
          basado en los datos introducidos. Lee el aviso legal completo al final.
        </Text>

        {/* RESUMEN INVERSIÓN */}
        <View style={styles.navyCard}>
          <Text style={{ fontSize: 7, color: COLORS.gold400, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>
            Inversión total de adquisición
          </Text>
          <Text style={{ fontSize: 20, fontFamily: 'Helvetica-Bold', color: COLORS.paper, marginBottom: 6 }}>
            {eurDec(inputs.inversionTotalAdquisicion)}
          </Text>
          <Text style={{ fontSize: 8, color: COLORS.paper, opacity: 0.85, marginBottom: 3 }}>
            {eur(inputs.precioCompra)} precio
            {' + '}
            {eur(inputs.itpImporte)} ITP ({inputs.itpPct.toString().replace('.', ',')}%)
            {inputs.gastosCierre > 0 && ` + ${eur(inputs.gastosCierre)} cierre`}
            {inputs.reformas > 0 && ` + ${eur(inputs.reformas)} reformas`}
          </Text>
          <Text style={{ fontSize: 7, color: COLORS.paper, opacity: 0.65, marginTop: 4 }}>
            Inversión operativa (sin ITP): {eur(inputs.inversionOperativa)}
            {' · Benchmark bono 10y al '}
            {result.benchmark.bono10yPct.toFixed(2).replace('.', ',')}%
            {' (' + result.benchmark.bono10yAsOf + ')'}
            {inputs.vacanciaPct > 0 &&
              ` · Vacancia aplicada ${inputs.vacanciaPct.toString().replace('.', ',')}%`}
          </Text>
        </View>

        {/* DETALLE DE COSTES */}
        <Text style={styles.sectionTitle}>Costes recurrentes considerados</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>IBI anual</Text>
            <Text style={styles.rowValue}>{eur(inputs.ibiAnual)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Comunidad mensual</Text>
            <Text style={styles.rowValue}>{eur(inputs.comunidadMensual)} /mes</Text>
          </View>
          <View style={styles.rowLast}>
            <Text style={styles.rowLabel}>Tasa de residuos anual</Text>
            <Text style={styles.rowValue}>{eur(inputs.residuosAnual)}</Text>
          </View>
        </View>

        {/* 3 ESCENARIOS */}
        <Text style={styles.sectionTitle}>Tres escenarios de renta</Text>
        <View style={styles.scenariosGrid}>
          {result.escenarios.map((e) => (
            <ScenarioColumn key={e.name} e={e} />
          ))}
        </View>

        <Footer />
      </Page>

      {/* Página 2 — Warnings */}
      <Page size="A4" style={styles.page}>
        <Header />
        <Text style={styles.eyebrow}>Lectura del broker</Text>
        <Text style={styles.title}>Avisos sobre tu operación</Text>
        <Text style={styles.subtitle}>
          Cada escenario dispara los avisos que activan los rangos críticos detectados por la
          herramienta. Lee con cuidado los avisos en rojo y ámbar — son los que requieren atención
          antes de operar.
        </Text>

        {result.escenarios.map((e) => (
          <View key={e.name} style={{ marginBottom: 10 }}>
            <WarningsList escenario={e} />
          </View>
        ))}

        {/* DISCLAIMER */}
        <Text style={styles.disclaimer}>
          Aviso legal — Esta herramienta es una calculadora orientativa. NO constituye
          asesoramiento financiero, fiscal ni de inversión personalizado. Los resultados son
          aproximaciones basadas exclusivamente en los datos introducidos por el usuario. No se
          consideran: impacto fiscal en IRPF/IS, morosidad, vacancia salvo configurada
          expresamente, mantenimiento, derramas extraordinarias, revalorización o depreciación
          del activo. Antes de adoptar una decisión de inversión inmobiliaria, consulta con un
          asesor fiscal colegiado.
        </Text>

        <Footer />
      </Page>
    </Document>
  )
}
