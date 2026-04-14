export type ToolStatus = 'stable' | 'beta'

export interface ToolMeta {
  slug: string
  name: string
  summary: string
  category: string
  tags: string[]
  keywords: string[]
  featured: boolean
  status: ToolStatus
  /** 列表排序，越大越靠前 */
  order: number
}

export interface CategoryDef {
  id: string
  name: string
  description: string
  order: number
}
