import type { Config } from 'tailwindcss'
import { colors, fontFamilies, fontSize, radii, shadows } from './tokens'

/**
 * Preset Tailwind compartido por todas las apps del ecosistema.
 * Cada app lo extiende vía `presets: [require('@psz/design-system/tailwind-preset')]`.
 */
const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        navy: colors.navy,
        gold: colors.gold,
        paper: colors.paper,
        ink: colors.ink,
        success: colors.accent.success,
        warning: colors.accent.warning,
        danger: colors.accent.danger,
        info: colors.accent.info,
      },
      fontFamily: fontFamilies,
      fontSize,
      borderRadius: radii,
      boxShadow: shadows,
      maxWidth: {
        prose: '70ch',
        container: '80rem',
      },
    },
  },
}

export default preset
