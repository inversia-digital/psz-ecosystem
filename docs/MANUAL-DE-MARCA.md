# Manual de marca — Toño Palacios

> Versión 1.0 · documento interno · © Inversia Global Digital S.L.U.
> Manual vivo e interactivo: `/preview/marca` (no indexable).
> Fuente única de verdad en código: `apps/psz/app/_components/BrandMark.tsx`.

---

## 1. Arquitectura de marca — modelo endosado

Una sola identidad maestra. La autoridad de la marca es **personal y
verificable**: registro **E242** en Banco de España y **presidencia de ANICI**.
Por eso todo —web, papelería, herramientas y PDF— se firma con el **mismo
símbolo**. Fragmentar la marca diluiría la autoridad y confundiría a buscadores
y motores de IA.

| Elemento | Qué es | Uso |
|---|---|---|
| **Marca maestra (P6)** | Monograma serif T·P + filete + Nº E242 | Personal, web, papelería, herramientas |
| **El Sello Palacios** | **Descriptor** de la garantía (cálculo firmado, trazable, inalterable). **No es una marca aparte** | Microcopy junto al mismo símbolo en herramientas/PDF |

> Excepción única y futura: si "El Sello Palacios" llega a licenciarse como
> certificación a terceros (marca blanca B2B), entonces —y sólo entonces—
> podría adquirir identidad propia. Hoy no la tiene.

---

## 2. El símbolo

Monograma serif **T·P** partido por un filete vertical, limpio y centrado.
Se renderiza desde un único componente (`BrandMark`), idéntico en pantalla,
favicon, redes, impresión y PDF. Letras en serif clásica; en rasterizado
(OG/favicon) puede caer a una serif de sistema, manteniendo dibujo y centrado.

- Filete inferior + **"Nº E242"** = firma registral.
- Por debajo de **40 px** se omite "Nº E242" (legibilidad): queda sólo el
  monograma. Automático; forzable con la prop `registry`.
- Área de respeto: ≥ **25 %** del lado del símbolo, libre de otros elementos.

---

## 3. Color sobre fondo (regla única)

**La letra cuyo color choca con el fondo pasa a blanco**, de modo que
**siempre hay dos tonos legibles**. Nunca una letra invisible.

| Fondo | T | P | Filete |
|---|---|---|---|
| Claro (base) | navy | oro | oro |
| Navy | **blanca** | oro | oro |
| Oro | navy | **blanca** | navy |
| Monocromo | navy (o blanco si `inverse`) | navy | navy |

---

## 4. Sistema de color

| Color | HEX | Token design-system | Uso |
|---|---|---|---|
| Navy | `#0F1B3D` | `navy.800` / `ink` | Base, autoridad, texto |
| Oro | `#C9A961` | `gold.400` | Acento, distinción |
| Papel | `#FAFAF7` | `paper` | Fondo modo claro |
| Blanco | `#FFFFFF` | — | Letra que choca con fondo |

---

## 5. Tipografía

- **Logotipo:** monograma serif T·P (Hoefler / Cormorant / Georgia). Se usa
  siempre el componente `BrandMark`; nunca se recompone a mano.
- **Sistema (UI, textos, "Nº E242"):** **Inter**. Pesos 400 / 600 / 700 / 800.
  - Nombre "Toño Palacios" junto al símbolo: Inter 700–800, tracking ajustado.
  - Firma "Nº E242": Inter 600, tracking 4.

El emparejamiento *símbolo serif + texto Inter* es intencional: el carácter
clásico lo aporta el monograma; la UI respira con un sans neutro.

---

## 6. Aplicaciones implementadas

| Soporte | Fichero | Variante |
|---|---|---|
| Cabecera del sitio | `_components/SiteHeader.tsx` | `bg="dark"`, sin firma + nombre |
| Sello en herramientas | `_components/SelloPalacios.tsx` | `bg="light"` + microcopy "El Sello Palacios" |
| Favicon | `app/icon.tsx` | navy, `bg="dark"`, sin firma, 64 px |
| Apple touch icon | `app/apple-icon.tsx` | navy, `bg="dark"`, 180 px |
| Open Graph (×5) | `*/opengraph-image.tsx` | data-URI, `bg="dark"`, sin firma |
| PDF rentabilidad | `calculadora-rentabilidad-inmobiliaria/pdf/RoiPdfDocument.tsx` | trazados @react-pdf, `bg="light"` |
| Manual vivo | `app/preview/marca/page.tsx` | todas |

---

## 7. Usos

**Siempre**

- Usar `BrandMark` o los SVG generados (`brandMarkSvg` / `brandMarkDataUri`).
- Respetar la regla de color sobre fondo.
- Mantener el área de respeto.
- El mismo símbolo para marca personal y para "El Sello Palacios".

**Nunca**

- Recomponer la T·P a mano en vez de usar el componente.
- Deformar, rotar, descentrar, añadir sombras o degradados.
- Recolorear fuera de la paleta (navy / oro / blanco).
- Crear identidad visual separada para "El Sello Palacios".
- Dejar una letra del mismo color que el fondo.

---

## 8. API del componente

```tsx
import { BrandMark, brandMarkSvg, brandMarkDataUri } from '@/app/_components/BrandMark'

<BrandMark
  size={80}            // lado en px
  bg="light"           // 'light' | 'dark' | 'gold'
  mono={false}         // monocromo
  inverse={false}      // monocromo en blanco (sobre oscuro)
  registry             // mostrar filete + "Nº E242" (auto ≥ 40px)
  title="Toño Palacios" // accesible; null = decorativo (aria-hidden)
/>

// Raster (OG, favicon, PDF):
brandMarkDataUri({ size: 56, bg: 'dark', registry: false })
```

Tokens canónicos: `BRAND.navy` `#0F1B3D` · `BRAND.gold` `#C9A961` ·
`BRAND.white` `#FFFFFF`.
