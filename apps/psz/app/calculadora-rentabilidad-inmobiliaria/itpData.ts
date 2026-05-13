/**
 * Tabla orientativa del Impuesto sobre Transmisiones Patrimoniales (ITP)
 * por Comunidad Autónoma — vigente a mayo de 2026.
 *
 * Estos datos son una guía rápida. El ITP real aplicable a una operación
 * concreta depende del valor de referencia catastral, tramo, bonificaciones
 * (vivienda habitual, edad, familia numerosa, discapacidad, zonas rurales),
 * tipo de inmueble (vivienda, local, plaza de garaje, suelo) y normativa
 * autonómica vigente en la fecha de la compraventa.
 *
 * ANTES de cerrar una operación, verificar la web de la Hacienda Autonómica
 * correspondiente o consultar con asesor fiscal.
 *
 * Última revisión: mayo 2026. Próxima revisión: agosto 2026.
 */

export interface ItpRate {
  /** ISO de la CA o equivalente */
  code: string
  name: string
  /** Tipo principal en %. Si hay tramos, el tipo más representativo. */
  rate: number
  /** Rango si tiene tramos (ej. "10-13%") o nota de pico */
  range?: string
  /** Notas relevantes: bonificaciones, cambios próximos, tramos progresivos */
  notes?: string
}

/**
 * Tabla principal. Ordenada alfabéticamente.
 *
 * Tipos generales (sin bonificaciones). Bonificaciones habituales en mucha
 * comunidad para: vivienda habitual, menores de 35-40 años, familias
 * numerosas, discapacidad, zonas rurales/despobladas, VPO.
 */
export const ITP_TABLE: ItpRate[] = [
  {
    code: 'AN',
    name: 'Andalucía',
    rate: 7,
    notes: 'Tarifa general unificada al 7% desde 2021. Bonificaciones específicas para vivienda habitual y compradores menores de 35 años en determinados supuestos.',
  },
  {
    code: 'AR',
    name: 'Aragón',
    rate: 8,
    range: '8-10%',
    notes: 'Tramos: 8% hasta 400.000 €, escalando a 10% en valores superiores. Bonificaciones por vivienda habitual y zonas rurales despobladas.',
  },
  {
    code: 'AS',
    name: 'Asturias',
    rate: 8,
    range: '8-10%',
    notes: 'Tramos progresivos según valor del inmueble. Bonificaciones para jóvenes y vivienda habitual.',
  },
  {
    code: 'IB',
    name: 'Islas Baleares',
    rate: 8,
    range: '8-13%',
    notes: 'Tramos progresivos: 8% hasta 400.000 €, 9% hasta 600.000 €, 10% hasta 1.000.000 €, 11,5% hasta 2.000.000 €, 13% por encima.',
  },
  {
    code: 'CN',
    name: 'Canarias',
    rate: 6.5,
    notes: 'Tarifa general 6,5%. Régimen específico fuera de IVA peninsular. Bonificaciones autonómicas adicionales aplicables.',
  },
  {
    code: 'CB',
    name: 'Cantabria',
    rate: 10,
    notes: 'Tarifa general 10%. 9% si es vivienda habitual del adquirente. Bonificaciones adicionales para familias numerosas y discapacidad.',
  },
  {
    code: 'CM',
    name: 'Castilla-La Mancha',
    rate: 9,
    notes: 'Tipo general 9%. 6% bonificado para vivienda habitual de menores de 36 años y otros supuestos.',
  },
  {
    code: 'CL',
    name: 'Castilla y León',
    rate: 8,
    range: '8-10%',
    notes: 'Tramos: 8% general, escalando hasta 10% en valores altos. Bonificaciones para jóvenes en municipios despoblados.',
  },
  {
    code: 'CT',
    name: 'Cataluña',
    rate: 10,
    range: '10-13%',
    notes: 'Escala progresiva desde junio 2025: 10% hasta 600.000 €, 11% hasta 900.000 €, 12% hasta 1.500.000 €, 13% por encima. Bonificaciones para vivienda habitual y jóvenes.',
  },
  {
    code: 'CE',
    name: 'Ceuta',
    rate: 6,
    notes: 'Régimen específico IPSI. Tipo del 6% aproximado equivalente al ITP peninsular.',
  },
  {
    code: 'MD',
    name: 'Comunidad de Madrid',
    rate: 6,
    notes: 'Tarifa general 6% (la más baja de territorio común peninsular). Bonificaciones adicionales para vivienda habitual de familias numerosas y menores de 35 años.',
  },
  {
    code: 'VC',
    name: 'Comunidad Valenciana',
    rate: 10,
    range: '10% → 9% (jun 2026)',
    notes: 'Cambio confirmado: desde el 1 de junio de 2026 el tipo general baja del 10% al 9% para inmuebles hasta 1.000.000 €. 11% para inmuebles por encima de 1.000.000 €. AJD baja del 1,5% al 1,4%. Operaciones cerradas antes del 1 jun 2026 mantienen el 10%.',
  },
  {
    code: 'EX',
    name: 'Extremadura',
    rate: 8,
    range: '8-11%',
    notes: 'Tramos progresivos. Bonificaciones para vivienda habitual, jóvenes y zonas despobladas.',
  },
  {
    code: 'GA',
    name: 'Galicia',
    rate: 9,
    notes: 'Tipo general 9%. Bonificaciones específicas para jóvenes, familias numerosas y municipios pequeños.',
  },
  {
    code: 'RI',
    name: 'La Rioja',
    rate: 7,
    notes: 'Tipo general 7%. Bonificaciones para vivienda habitual y jóvenes.',
  },
  {
    code: 'ME',
    name: 'Melilla',
    rate: 6,
    notes: 'Régimen IPSI específico. Tipo equivalente aproximado del 6%.',
  },
  {
    code: 'MC',
    name: 'Región de Murcia',
    rate: 8,
    notes: 'Tarifa general 8%. Bonificaciones para vivienda habitual y jóvenes en determinados municipios.',
  },
  {
    code: 'NC',
    name: 'Navarra',
    rate: 6,
    range: '5-6%',
    notes: 'Régimen foral específico. Tipo del 5% o 6% según valor y supuesto. Comprobar directamente con Hacienda Foral de Navarra.',
  },
  {
    code: 'PV',
    name: 'País Vasco',
    rate: 4,
    range: '4% (foral)',
    notes: 'Régimen foral en cada uno de los tres territorios históricos (Álava, Bizkaia, Gipuzkoa). Tipo general del 4% — el más bajo de España. Comprobar tarifa específica con la Diputación Foral correspondiente.',
  },
]

/** Encuentra una CA por código (no se usa actualmente pero útil para futura selección automática). */
export function findItpRate(code: string): ItpRate | undefined {
  return ITP_TABLE.find((c) => c.code === code)
}

export const ITP_LAST_REVIEW = 'mayo 2026'
export const ITP_NEXT_REVIEW = 'agosto 2026'
