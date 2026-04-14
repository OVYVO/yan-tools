<script setup lang="ts">
import { diffLines } from 'diff'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const a = ref('line1\nline2')
const b = ref('line1\nline2\nline3')
const html = ref('')

function run() {
  const parts = diffLines(a.value, b.value)
  const chunks: string[] = []
  for (const p of parts) {
    const cls = p.added ? 'bg-green-100 dark:bg-green-900/30' : p.removed ? 'bg-red-100 dark:bg-red-900/30' : ''
    const prefix = p.added ? '+' : p.removed ? '-' : ' '
    const lines = p.value.replace(/\n$/, '').split('\n')
    for (const line of lines) {
      chunks.push(`<div class="${cls} whitespace-pre-wrap font-mono text-sm">${prefix} ${escapeHtml(line)}</div>`)
    }
  }
  html.value = chunks.join('')
}

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

watch([a, b], run, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <div class="grid gap-6 lg:grid-cols-2">
      <UiTextarea v-model="a" label="文本 A" />
      <UiTextarea v-model="b" label="文本 B" />
    </div>
    <div class="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
      <p class="mb-2 text-sm text-slate-500">行级 diff（绿：新增，红：删除）</p>
      <div class="max-h-96 overflow-auto rounded-lg bg-slate-50 p-2 dark:bg-slate-900/60" v-html="html" />
    </div>
  </ToolPageTemplate>
</template>
