import { useStorage } from '@vueuse/core'

const KEY = 'yt-recent-tools'
const MAX = 20

export function useRecentTools() {
  const slugs = useStorage<string[]>(KEY, [])

  function record(slug: string) {
    const next = slugs.value.filter((s) => s !== slug)
    next.unshift(slug)
    slugs.value = next.slice(0, MAX)
  }

  function clear() {
    slugs.value = []
  }

  return { slugs, record, clear }
}
