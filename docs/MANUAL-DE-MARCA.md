# Manual de marca — Toño Palacios

> Versión 2.0 · documento interno · © Inversia Global Digital, S.L.U.
> Manual vivo e interactivo: `/preview/marca` (no indexable).
> Fuente única de verdad en código: `apps/psz/app/_components/BrandMark.tsx`.

---

## 1. Arquitectura de marca — modelo endosado

Una sola identidad maestra. La autoridad es **personal y verificable**:
registro **E242** (Banco de España) y **presidencia de ANICI**. Todo —web,
papelería, herramientas, PDF— se firma con el **mismo símbolo**.

| Elemento | Qué es | Uso |
|---|---|---|
| **Marca maestra (P6)** | Monograma serif T·P + filete + Nº E242 | Personal, web, papelería, herramientas |
| **El Sello Palacios** | **Descriptor** de la garantía (cálculo firmado, trazable). **No es marca aparte** | Microcopy junto al mismo símbolo |

Excepción futura: solo si “El Sello Palacios” se licencia a terceros.

---

## 2. El símbolo

Monograma serif **T·P** partido por filete vertical, con filete inferior y
firma **Nº E242**. Un único componente; idéntico en todos los soportes.

---

## 3. Especificaciones del símbolo

- **Área de respeto:** margen libre ≥ altura del filete vertical (≈ 25 % del
  lado) en los 4 lados. Nada dentro de esa zona.
- **Tamaño mínimo:** con firma, ≥ **72 px / 19 mm**. Sin firma, ≥ **24 px**.
- **Retícula (viewBox 100×100):** eje filete `x=50`; T/P línea base `y=67`,
  cuerpo 40; filete vertical `y 31→70`; filete horizontal `y=74` (x 26→74);
  firma `y=86`, cuerpo 7, tracking 4. Garantizado por `BrandMark`.
- **Lockups oficiales (únicos válidos):**
  - **A** · Símbolo solo
  - **B** · Símbolo + “Toño Palacios”
  - **C** · Símbolo + nombre + “Broker hipotecario · Nº E242”

---

## 4. Color sobre fondo (regla única)

La letra cuyo color choca con el fondo pasa a blanco → **siempre dos tonos
legibles**.

| Fondo | T | P | Filete |
|---|---|---|---|
| Claro (base) | navy | oro | oro |
| Navy | **blanca** | oro | oro |
| Oro | navy | **blanca** | navy |
| Monocromo | navy (o blanco si `inverse`) | navy | navy |

---

## 5. Sistema de color

| Color | HEX | Uso |
|---|---|---|
| Navy | `#0F1B2D` | Base, autoridad, texto |
| Oro | `#C8A852` | Acento, distinción |
| Papel | `#FAFAF7` | Fondo modo claro |
| Blanco | `#FFFFFF` | Letra que choca con fondo |

---

## 6. Accesibilidad y contraste (WCAG 2.1)

| Combinación | Ratio | WCAG | Uso |
|---|---|---|---|
| Navy / blanco | 17,3:1 | AAA | Texto, todo |
| Blanco / navy | 17,3:1 | AAA | Texto, todo |
| Navy / oro | 7,6:1 | AAA | Texto, botones |
| Oro / navy | 7,6:1 | AA (AAA grande) | Texto destacado |
| **Oro / blanco** | **2,3:1** | **✕ FALLA** | Solo filetes / decoración |

**El oro NUNCA es color de texto sobre blanco.** Para texto: navy o blanco.

---

## 7. Tipografía

- **Logotipo:** **Gelasio** (serif idéntica a Georgia, empaquetada con
  next/font → idéntica en todos los dispositivos). Cuerpo 40, peso 500. Solo
  vía componente `BrandMark`.
- **Sistema (UI, textos, “Nº E242”):** **Inter** 400/600/700/800.
- **Escala documentos:** H1 30/800 · H2 22/700 · H3 16/600 · cuerpo 15/400
  (interlineado 1,6) · etiqueta 12/600 mayúsculas tracking 2.

---

## 8. Identidad verbal — tono de voz

Autoridad **sin estridencia**. Profesional que sabe, no vendedor que promete.

**Principios**

- Claro antes que técnico.
- Autoridad, no estatus (credenciales, no lujo).
- Académico sin presumir (rigor implícito, títulos nunca por delante).
- Sin promesas de rentabilidad ni urgencias artificiales.
- Honesto con el riesgo.

**Sí:** “Broker hipotecario registrado en Banco de España (nº E242). Te
explico qué te conviene y por qué, con números.”
**No:** “El MEJOR broker. Hipotecas GARANTIZADAS al instante.”

---

## 9. Nombre y credenciales (crítico)

Protege la autoridad regulatoria y evita confusión con homónimos (existe un
chef **“Toño Palacio”** sin S — nunca mezclar).

| Contexto | Forma canónica EXACTA |
|---|---|
| Marca / coloquial | Toño Palacios |
| Legal / contratos / registros | Antonio Palacios Cambero |
| Credencial principal | Broker hipotecario nº E242 (Banco de España) |
| Cargo institucional | Presidente de ANICI |
| Sociedad operativa | Inversia Global Digital, S.L.U. |
| Firma completa | Antonio Palacios Cambero (Toño Palacios) — broker hipotecario nº E242 (Banco de España) y presidente de ANICI |

**Siempre**

- “nº E242” junto a “Banco de España” en la primera aparición.
- “Toño **Palacios**” con S.
- Redacción idéntica en web, JSON-LD, prensa y legal.
- Asociar el nombre a broker hipotecario / intermediario de crédito.

**Nunca**

- Confundir con el chef “Toño Palacio” (sin S).
- Variantes del registro (“E-242”, “licencia 242”…).
- Títulos académicos por delante del nombre.
- “El mejor”, “número 1” u otras afirmaciones no verificables.

---

## 10. Aplicaciones

| Soporte | Variante |
|---|---|
| Cabecera del sitio | `bg="dark"`, sin firma + nombre + cargo |
| Sello en herramientas | `bg="light"` + microcopy “El Sello Palacios” |
| Favicon / Apple icon | navy, `bg="dark"`, sin firma |
| Open Graph (×5) | data-URI, `bg="dark"`, sin firma |
| PDF rentabilidad | símbolo nativo, `bg="light"` |

---

## 11. Papelería y firma de email

- **Tarjeta (85×55 mm):** anverso claro (símbolo + nombre legal + cargo +
  sociedad); reverso navy con símbolo completo centrado.
- **Firma email:** símbolo sin firma + “Antonio Palacios Cambero · Toño
  Palacios” + cargo + “psz.es · Inversia Global Digital, S.L.U.”, filete oro
  a la izquierda.
- **Membrete A4:** cabecera con símbolo + nombre + cargo a la izquierda,
  sociedad/psz.es a la derecha, filete oro inferior.

---

## 12. Usos

**Siempre:** componente `BrandMark` o SVG de la sección 13; regla de color;
área de respeto; mismo símbolo para personal y “El Sello Palacios”.

**Nunca:** recomponer a mano; deformar/rotar/descentrar/sombras; recolorear
fuera de paleta; identidad separada para “El Sello Palacios”; letra del color
del fondo.

---

## 13. Assets descargables

En `/preview/marca` (sección 13): SVG generados por el componente, siempre
actualizados — color claro / navy / oro, monocromo navy / blanco, favicon.
Para imprentas y diseñadores externos.

---

## 14. Entrega técnica y gobernanza

- Fuente única: `BrandMark.tsx` (`brandMarkSvg` / `brandMarkDataUri`).
- Favicon: `app/icon.tsx` · `app/apple-icon.tsx`.
- OG: 5 `opengraph-image.tsx` vía data-URI.
- PDF: `RoiPdfDocument.tsx`.
- Tipografía: Gelasio en `app/layout.tsx` (next/font).

**Gobernanza:** todo cambio del logo se hace en `BrandMark.tsx` y se propaga
solo; no se editan copias. Los cambios de marca los aprueba Antonio Palacios
Cambero. Esta página/documento es la referencia viva.

### API del componente

```tsx
import { BrandMark, brandMarkSvg, brandMarkDataUri } from '@/app/_components/BrandMark'

<BrandMark size={80} bg="light" mono={false} inverse={false} registry title="Toño Palacios" />

brandMarkDataUri({ size: 512, bg: 'dark', registry: false }) // raster: OG/favicon/PDF
```

Tokens: `BRAND.navy` `#0F1B2D` · `BRAND.gold` `#C8A852` · `BRAND.white` `#FFFFFF`.
