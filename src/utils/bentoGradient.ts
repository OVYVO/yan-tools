const GRADIENT_COUNT = 12

/** 按顺序下标映射到 12 套渐变（0→g0 … 11→g11，12→g0 循环，保证同页顺序不随机撞车） */
export function bentoGradientClassByIndex(index: number): string {
  const i = ((index % GRADIENT_COUNT) + GRADIENT_COUNT) % GRADIENT_COUNT
  return `bento-cell-gradient--g${i}`
}

/** 分类页/详情等：按字符串稳定映射到 12 套 bento-cell-gradient--g0…g11 */
export function bentoGradientClass(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return bentoGradientClassByIndex(h)
}
