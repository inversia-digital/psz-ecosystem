/**
 * BarChart — gráfico de barras horizontales en SVG puro (server-side, sin JS).
 * Para estadísticas dentro de artículos: precios máximos por comunidad, porcentajes
 * de financiación, comparativas antes/después. Accesible: título, descripción y
 * tabla de datos oculta para lectores de pantalla y para las IAs.
 */
export interface BarDatum {
  label: string
  value: number
  /** Texto a mostrar al final de la barra (por defecto, el valor formateado). */
  display?: string
  /** Resalta la barra (dorado) frente al resto (navy). */
  highlight?: boolean
}

function fmt(n: number, unit: string) {
  const s = n % 1 === 0 ? n.toLocaleString('es-ES') : n.toLocaleString('es-ES', { maximumFractionDigits: 1 })
  return unit === '%' ? `${s} %` : unit === '€' ? `${s} €` : `${s} ${unit}`.trim()
}

export function BarChart({
  title,
  data,
  unit = '',
  note,
  max,
}: {
  title: string
  data: BarDatum[]
  unit?: '%' | '€' | string
  note?: string
  /** Escala máxima (por defecto, el mayor valor). */
  max?: number
}) {
  const W = 720
  const rowH = 34
  const labelW = 250
  const barMaxW = W - labelW - 110
  const top = 8
  const H = top + data.length * rowH + 8
  const scale = max ?? Math.max(...data.map((d) => d.value))
  return (
    <figure className="not-prose my-8 rounded-xl border border-navy-100 bg-paper-card p-4 md:p-6 shadow-soft">
      <figcaption className="text-base font-semibold text-navy-800 mb-3">{title}</figcaption>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          role="img"
          aria-label={`${title}. ${data.map((d) => `${d.label}: ${d.display ?? fmt(d.value, unit)}`).join('. ')}`}
          style={{ minWidth: 520 }}
        >
          {data.map((d, i) => {
            const y = top + i * rowH
            const w = Math.max(2, (d.value / scale) * barMaxW)
            return (
              <g key={d.label}>
                <text
                  x={labelW - 10}
                  y={y + rowH / 2 + 5}
                  textAnchor="end"
                  fontSize="13"
                  fontFamily="Segoe UI, Arial, sans-serif"
                  fill="#1c2433"
                >
                  {d.label}
                </text>
                <rect
                  x={labelW}
                  y={y + 6}
                  width={w}
                  height={rowH - 12}
                  rx="4"
                  fill={d.highlight ? '#C8A852' : '#1B2C45'}
                />
                <text
                  x={labelW + w + 8}
                  y={y + rowH / 2 + 5}
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="Segoe UI, Arial, sans-serif"
                  fill="#0F1B2D"
                >
                  {d.display ?? fmt(d.value, unit)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <table className="sr-only">
        <caption>{title}</caption>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}>
              <th scope="row">{d.label}</th>
              <td>{d.display ?? fmt(d.value, unit)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {note && <p className="mt-3 text-sm text-ink-muted">{note}</p>}
    </figure>
  )
}
