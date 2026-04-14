import { toolLoaders } from './tool-loaders'
import { toolsMeta } from './tools-meta'
import type { ToolMeta } from '@/types/tool'

export { toolLoaders, toolsMeta }

const bySlug = new Map<string, ToolMeta>(toolsMeta.map((t) => [t.slug, t]))

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return bySlug.get(slug)
}

export function getAllToolsSorted(): ToolMeta[] {
  return [...toolsMeta].sort((a, b) => b.order - a.order)
}

export function getToolsByCategory(categoryId: string): ToolMeta[] {
  return toolsMeta.filter((t) => t.category === categoryId).sort((a, b) => b.order - a.order)
}

export function getFeaturedTools(): ToolMeta[] {
  return toolsMeta.filter((t) => t.featured).sort((a, b) => b.order - a.order)
}

export function getLatestTools(limit = 8): ToolMeta[] {
  return getAllToolsSorted().slice(0, limit)
}

export function getRelatedTools(slug: string, limit = 4): ToolMeta[] {
  const self = getToolBySlug(slug)
  if (!self) return []
  return toolsMeta
    .filter((t) => t.slug !== slug && t.category === self.category)
    .sort((a, b) => b.order - a.order)
    .slice(0, limit)
}
