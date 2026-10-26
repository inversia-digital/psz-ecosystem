'use client'

import { useSearchParams } from 'next/navigation'
import { MortgageFunnel } from './MortgageFunnel'

/**
 * Lee el prefill (?tipo&precio&financiacion&ingresos&plazo&tin&origen) en el
 * cliente. Antes se leía con `searchParams` en el servidor, lo que convertía
 * /solicitar-hipoteca en una página dinámica sin caché (≈1 s por petición en
 * frío frente a 100-400 ms del resto del sitio). Así la página se prerenderiza
 * y se sirve desde la caché de Vercel; el prefill se aplica al hidratar.
 */
export function MortgageFunnelFromParams() {
  const sp = useSearchParams()
  const pick = (k: string) => sp.get(k) ?? ''
  const initial = {
    tipo_operacion: pick('tipo'),
    precio: pick('precio'),
    financiacion: pick('financiacion'),
    ingresos: pick('ingresos'),
    plazo: pick('plazo'),
    tin: pick('tin'),
    origen: pick('origen'),
  }
  // key: si cambia el prefill (navegación interna), se re-siembra el formulario.
  return <MortgageFunnel key={sp.toString()} initial={initial} />
}
