/**
 * Design tokens del ecosistema Toño Palacios.
 *
 * Filosofía: misma identidad estructural (navy, paper, ink, tipografía Inter)
 * para todas las marcas del grupo. Cada marca diferencia por su accent:
 *
 *   PSZ          → navy + gold       (broker hipotecario premium · autoridad)
 *   INARPA       → navy + green      (instituto formación · crecimiento)
 *   ANICI        → navy + gold soft  (asociación · institucional)
 *   Hipobrokers  → navy + rojo       (acción · B2B brokers)
 *
 * Las escalas navy / paper / ink son COMPARTIDAS. Tocar aquí afecta a todo.
 *
 * NOTA: hasta que INARPA entre al monorepo (Fase 4 planificada), existe
 * un espejo en E:/29 INARPA/web/lib/brand/tokens.ts que debe sincronizarse
 * manualmente cada vez que se cambie este archivo.
 */

// Tipos mutables explícitos para que Tailwind pueda consumirlos.
// `tokens` al final es const a nivel agregado para uso fuera de Tailwind.

type FontFamilyValue = string[]
type FontSizeValue = [string, { lineHeight: string }]

export const colors = {
  /** Navy compartido — institucional, autoridad, base visual */
  navy: {
    50: '#F0F2F8',
    100: '#D9DDE9',
    200: '#B3BAD3',
    300: '#8C97BD',
    400: '#6674A6',
    500: '#3F5290',
    600: '#2C4271',
    700: '#1E3057',
    800: '#0F1B3D',
    900: '#070E24',
    950: '#030712',
  },

  /** Gold — accent PSZ + warning del sistema */
  gold: {
    50: '#FAF6EC',
    100: '#F2E9CB',
    200: '#E6D497',
    300: '#D9BD63',
    400: '#C9A961',
    500: '#B69247',
    600: '#967636',
    700: '#74592A',
    800: '#523E1E',
    900: '#332712',
  },

  /** Green — accent INARPA + success del sistema. Escala basada en
   *  #1D9E75 (anclaje brand INARPA = accent.success PSZ) */
  green: {
    50:  '#E1F5EE',
    100: '#C5EADD',
    200: '#9FE1CB', // INARPA logo light
    300: '#6DD2B0',
    400: '#5DCAA5', // INARPA mint
    500: '#1D9E75', // INARPA brand · PSZ success — ANCLA COMPARTIDA
    600: '#167358',
    700: '#0F5443',
    800: '#085041', // INARPA dark
    900: '#053429',
    950: '#021C16',
  },

  /** Paper — fondo modo claro */
  paper: {
    DEFAULT: '#FAFAF7',
    soft: '#F4F3EE',
    card: '#FFFFFF',
  },

  /** Ink — texto modo claro */
  ink: {
    DEFAULT: '#0F1B3D',
    soft: '#1E3057',
    muted: '#6674A6',
    inverted: '#FAFAF7',
  },

  /** Accents semánticos del sistema (no marca, sino estado) */
  accent: {
    success: '#1D9E75', // = green.500
    warning: '#D9BD63', // = gold.300
    danger: '#C41E3A',
    info: '#2C4271',    // = navy.600
  },

  /** Paleta específica INARPA — para el logo gradient (jade no encaja en
   *  la escala green porque tira más al azul/teal). Usar SOLO en INARPA. */
  inarpa: {
    mint: '#5DCAA5', // = green.400
    jade: '#4A9B8E', // exclusivo logo
    pale: '#E1F5EE', // = green.50
  },
}

export const fontFamilies: Record<string, FontFamilyValue> = {
  sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
  serif: ['Lora', 'ui-serif', 'Georgia', 'serif'],
  mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
}

export const fontSize: Record<string, FontSizeValue> = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  '5xl': ['3rem', { lineHeight: '1.1' }],
  '6xl': ['3.75rem', { lineHeight: '1.05' }],
  '7xl': ['4.5rem', { lineHeight: '1' }],
}

export const spacing: Record<string, string> = {
  /** Anchos máximos de contenido por contexto */
  containerSm: '40rem', // 640px — texto largo
  containerMd: '48rem', // 768px — artículos
  containerLg: '64rem', // 1024px — pillars
  containerXl: '80rem', // 1280px — home
}

export const radii: Record<string, string> = {
  none: '0',
  sm: '0.25rem',
  DEFAULT: '0.5rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
}

export const shadows: Record<string, string> = {
  soft: '0 1px 2px 0 rgb(15 27 61 / 0.04), 0 1px 3px 0 rgb(15 27 61 / 0.06)',
  card: '0 2px 8px -2px rgb(15 27 61 / 0.06), 0 4px 16px -4px rgb(15 27 61 / 0.08)',
  hover: '0 8px 24px -8px rgb(15 27 61 / 0.16), 0 16px 32px -16px rgb(15 27 61 / 0.12)',
  inset: 'inset 0 1px 0 0 rgb(255 255 255 / 0.08)',
}

export const tokens = {
  colors,
  fontFamilies,
  fontSize,
  spacing,
  radii,
  shadows,
} as const

export type Tokens = typeof tokens
