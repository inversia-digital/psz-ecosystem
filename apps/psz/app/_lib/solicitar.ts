/**
 * Helper del embudo: construye el enlace a /solicitar-hipoteca con los datos
 * ya rellenos (prefill) desde cualquier herramienta. Ruta RELATIVA a propósito,
 * para que también funcione en las previsualizaciones de Vercel.
 *
 * Sin JSX ni dependencias de UI → se puede importar tanto desde componentes de
 * servidor como de cliente (la calculadora).
 */
export type SolicitarPrefill = {
  /** tipo_operacion del funnel: vivienda_habitual | segunda_residencia | inversion |
   *  subrogacion | reunificacion_deudas | eliminar_avalistas | extincion_condominio | local | empresas */
  tipo?: string
  precio?: number | string
  financiacion?: number | string
  ingresos?: number | string
  plazo?: number | string
  tin?: number | string
  /** de qué herramienta viene el lead (tracking) */
  origen?: string
}

export function solicitarHref(p: SolicitarPrefill = {}): string {
  const q = new URLSearchParams()
  const add = (k: string, v: unknown) => {
    if (v !== undefined && v !== null && v !== '') q.set(k, String(v))
  }
  add('tipo', p.tipo)
  add('precio', p.precio)
  add('financiacion', p.financiacion)
  add('ingresos', p.ingresos)
  add('plazo', p.plazo)
  add('tin', p.tin)
  add('origen', p.origen)
  const qs = q.toString()
  return qs ? `/solicitar-hipoteca?${qs}` : '/solicitar-hipoteca'
}
