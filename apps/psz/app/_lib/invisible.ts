/**
 * Caracteres invisibles forenses — Capa 4.C.
 *
 * Inserta caracteres Unicode invisibles (zero-width space U+200B y
 * zero-width non-joiner U+200C) en posiciones específicas del texto.
 * Si un copión hace copy-paste literal del texto, copia también los
 * caracteres invisibles — y eso es prueba forense directa de copia.
 *
 * Visualmente: imperceptible.
 * En el código fuente HTML: presente y detectable.
 * Para screen readers: la inmensa mayoría los ignora silenciosamente
 *   (U+200B y U+200C están en la categoría "Cf" Format - no
 *   pronunciable, sin efectos para usabilidad/accesibilidad si usado
 *   con moderación).
 *
 * IMPORTANTE para accesibilidad:
 *  - Densidad razonable: 1 carácter invisible cada ~30-40 palabras.
 *  - NO usar en URLs, números, código técnico ni elementos de
 *    formulario.
 *  - Solo en prose narrativo de las páginas críticas (calculadoras,
 *    pillars con copy diferencial).
 *
 * Detección posterior (si encontramos texto sospechoso copiado):
 *   - Pegar el texto sospechoso en un editor que muestre caracteres
 *     Unicode invisibles (VS Code con extensión, regex tester online).
 *   - Si aparecen ​ o ‌ → prueba directa de copy-paste.
 */

/** Zero-width space — el más universal y bien soportado */
const ZWS = '​'

/** Zero-width non-joiner — alternativo para mezclar densidades distintas */
const ZWNJ = '‌'

/**
 * Inserta caracteres invisibles entre palabras a intervalos fijos.
 * Default: cada 8 palabras, con un patrón intercalado ZWS/ZWNJ que
 * crea una "firma" detectable forensemente sin alterar la lectura.
 */
export function withInvisibleWatermark(text: string, intervalWords = 8): string {
  if (!text) return text
  const words = text.split(' ')
  return words
    .map((word, i) => {
      if (i === 0) return word
      if (i % (intervalWords * 2) === 0) return ZWNJ + word
      if (i % intervalWords === 0) return ZWS + word
      return word
    })
    .join(' ')
}

/**
 * Detector inverso — para usar en investigación de copias.
 * Devuelve el número de marcadores invisibles encontrados en un texto
 * (>0 = casi seguro que es copia de un texto nuestro).
 */
export function countInvisibleWatermarks(text: string): {
  zws: number
  zwnj: number
  total: number
} {
  const zws = (text.match(new RegExp(ZWS, 'g')) ?? []).length
  const zwnj = (text.match(new RegExp(ZWNJ, 'g')) ?? []).length
  return { zws, zwnj, total: zws + zwnj }
}
