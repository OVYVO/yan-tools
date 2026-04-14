import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { getToolBySlug } from '@/data/tools-registry'

export function useToolMeta(slug: MaybeRefOrGetter<string | undefined>) {
  return computed(() => {
    const s = toValue(slug)
    if (!s) return undefined
    return getToolBySlug(s)
  })
}
