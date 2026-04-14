import { useClipboard as useVueUseClipboard } from '@vueuse/core'
import { ref } from 'vue'

export function useClipboard() {
  const { copy, copied, isSupported } = useVueUseClipboard({ legacy: true })
  const error = ref<string | null>(null)

  async function copyText(text: string) {
    error.value = null
    try {
      await copy(text)
    } catch (e) {
      error.value = e instanceof Error ? e.message : '复制失败'
    }
  }

  return { copyText, copied, isSupported, error }
}
