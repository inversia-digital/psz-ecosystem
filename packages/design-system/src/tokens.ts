/**
 * Design tokens del ecosistema PSZ.
 *
 * Heredan el ADN visual de bio.psz.es: profesional, sobrio, "premium broker",
 * con paleta navy + oro/cobre como marca de confianza institucional.
 *
 * Variantes por dominio:
 * - PSZ:         navy + gold (default — esta paleta)
 * - INARPA:      navy + verde (ver project_inarpa.md)
 * - ANICI:       navy + oro institucional (similar pero más sobrio)
 * - Hipobrokers: navy + rojo (acción/urgencia)
 */

// Tipos mutables explícitos para que Tailwind pueda consumirlos.
// `tokens` al final es const a nivel agregado para uso fuera de Tailwind.

type FontFamilyValue = string[]
type FontSizeValue = [string, { lineHeight: string }]

export const colors = {
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
  paper: {
    DEFAULT: '#FAFAF7',
    soft: '#F4F3EE',
    card: '#FFFFFF',
  },
  ink: {
    DEFAULT: '#0F1B3D',
    soft: '#1E3057',
    muted: '#6674A6',
    inverted: '#FAFAF7',
  },
  accent: {
    success: '#1D9E75',
    warning: '#D9BD63',
    danger: '#C41E3A',
    info: '#2C4271',
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
