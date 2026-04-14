import Fuse from 'fuse.js'
import { computed, ref } from 'vue'
import { toolsMeta } from '@/data/tools-meta'
import type { ToolMeta } from '@/types/tool'

const fuse = new Fuse(toolsMeta, {
  keys: [
    { name: 'name', weight: 0.45 },
    { name: 'summary', weight: 0.2 },
    { name: 'tags', weight: 0.2 },
    { name: 'keywords', weight: 0.15 },
  ],
  threshold: 0.32,
  ignoreLocation: true,
})

export function useSearch() {
  const query = ref('')

  const results = computed<ToolMeta[]>(() => {
    const q = query.value.trim()
    if (!q) return toolsMeta.slice().sort((a, b) => b.order - a.order)
    return fuse.search(q).map((r) => r.item)
  })

  return { query, results }
}
