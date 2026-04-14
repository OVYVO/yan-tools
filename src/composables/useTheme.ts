import { usePreferredColorScheme, useStorage } from '@vueuse/core'
import { watch } from 'vue'

export type ThemePreference = 'light' | 'dark' | 'system'

export function useTheme() {
  const preference = useStorage<ThemePreference>('yt-theme', 'system')
  const systemScheme = usePreferredColorScheme()

  watch(
    [preference, systemScheme],
    () => {
      const dark =
        preference.value === 'dark' ||
        (preference.value === 'system' && systemScheme.value === 'dark')
      document.documentElement.classList.toggle('dark', dark)
    },
    { immediate: true },
  )

  function setPreference(v: ThemePreference) {
    preference.value = v
  }

  return { preference, setPreference }
}
