import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

const KEY = 'yt-favorites'

export function useFavorites() {
  const slugs = useStorage<string[]>(KEY, [])

  const set = computed(() => new Set(slugs.value))

  function isFavorite(slug: string) {
    return set.value.has(slug)
  }

  function toggle(slug: string) {
    const i = slugs.value.indexOf(slug)
    if (i >= 0) slugs.value = slugs.value.filter((s) => s !== slug)
    else slugs.value = [...slugs.value, slug]
  }

  function add(slug: string) {
    if (!set.value.has(slug)) slugs.value = [...slugs.value, slug]
  }

  function remove(slug: string) {
    slugs.value = slugs.value.filter((s) => s !== slug)
  }

  return { slugs, isFavorite, toggle, add, remove }
}
