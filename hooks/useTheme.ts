'use client'

import { useTheme as useThemeHook } from 'next-themes'

export function useTheme() {
  const { theme, setTheme, themes } = useThemeHook()

  return {
    theme,
    setTheme,
    themes,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  }
}
