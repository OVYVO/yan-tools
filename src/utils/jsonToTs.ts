/** 由 JSON 样本生成 TypeScript 类型（嵌套对象使用内联类型） */
export function jsonToTypeScriptTypes(
  json: string,
  rootName = 'Root',
): { ok: true; code: string } | { ok: false; error: string } {
  let data: unknown
  try {
    data = JSON.parse(json)
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'JSON 解析失败' }
  }

  function typeOf(v: unknown, depth: number): string {
    if (v === null) return 'null'
    if (typeof v === 'string') return 'string'
    if (typeof v === 'number') return 'number'
    if (typeof v === 'boolean') return 'boolean'
    if (Array.isArray(v)) {
      if (v.length === 0) return 'unknown[]'
      return `${typeOf(v[0], depth + 1)}[]`
    }
    if (typeof v === 'object' && v) {
      const o = v as Record<string, unknown>
      const pad = '  '.repeat(depth + 1)
      const close = '  '.repeat(depth)
      const inner = Object.entries(o)
        .map(([k, val]) => {
          const key = /^[a-zA-Z_$][\w$]*$/.test(k) ? k : `'${k}'`
          return `${pad}${key}: ${typeOf(val, depth + 1)}`
        })
        .join('\n')
      return `{\n${inner}\n${close}}`
    }
    return 'unknown'
  }

  const body = typeOf(data, 0)
  const code =
    typeof data === 'object' && data !== null && !Array.isArray(data)
      ? `export interface ${rootName} ${body}`
      : `export type ${rootName} = ${body}`

  return { ok: true, code }
}
