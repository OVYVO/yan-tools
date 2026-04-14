<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const hex = ref('#3b82f6')
const rgb = ref('')
const hsl = ref('')
const error = ref<string | null>(null)

function parseHex(h: string) {
  const m = h.trim().match(/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/)
  if (!m) throw new Error('HEX 格式不正确')
  let s = m[1]
  if (s.length === 3) s = s.split('').map((c) => c + c).join('')
  const n = Number.parseInt(s, 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return { r, g, b }
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2
  const d = max - min
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      default:
        h = (r - g) / d + 4
    }
    h /= 6
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function sync() {
  error.value = null
  try {
    const { r, g, b } = parseHex(hex.value)
    rgb.value = `rgb(${r}, ${g}, ${b})`
    const { h, s, l } = rgbToHsl(r, g, b)
    hsl.value = `hsl(${h}, ${s}%, ${l}%)`
  } catch (e) {
    error.value = e instanceof Error ? e.message : '解析失败'
  }
}

watch(hex, sync, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <div class="flex flex-wrap items-center gap-4">
      <input v-model="hex" type="text" class="rounded-lg border px-3 py-2 font-mono dark:border-slate-600 dark:bg-slate-900" />
      <div class="h-12 w-12 rounded-lg border" :style="{ backgroundColor: hex }" />
    </div>
    <div class="tool-io-grid">
      <UiTextarea v-model="rgb" label="RGB" :readonly="true" :rows="2" />
      <UiTextarea v-model="hsl" label="HSL" :readonly="true" :rows="2" />
    </div>
    <UiCopyButton v-if="rgb" :text="`${hex}\n${rgb}\n${hsl}`" label="复制全部" />
  </ToolPageTemplate>
</template>
