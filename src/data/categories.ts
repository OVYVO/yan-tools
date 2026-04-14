import type { CategoryDef } from '../types/tool'

export const categories: CategoryDef[] = [
  { id: 'data', name: '数据格式', description: 'JSON、YAML、XML 与类型推导', order: 1 },
  { id: 'encode', name: '编码解码', description: 'Base64、URL、哈希、JWT 等', order: 2 },
  { id: 'time', name: '时间日期', description: '时间戳、格式化与 Cron', order: 3 },
  { id: 'text', name: '文本处理', description: '去重、排序、对比与 Markdown', order: 4 },
  { id: 'gen', name: '生成器', description: 'UUID、密码与二维码', order: 5 },
  { id: 'css', name: 'CSS 与颜色', description: '颜色、渐变与阴影工具', order: 6 },
  { id: 'media', name: '格式化与多媒体', description: 'SQL、HTML、CSS 与图片', order: 7 },
]

export function getCategoryById(id: string): CategoryDef | undefined {
  return categories.find((c) => c.id === id)
}
