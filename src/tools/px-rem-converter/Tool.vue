<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const rootPx = ref(16)
const px = ref(16)
const remInput = ref('')

const rem = computed(() => (px.value / rootPx.value).toFixed(4).replace(/\.?0+$/, ''))

const summary = ref('')

watch(
  [px, rootPx],
  () => {
    summary.value = `${px.value}px ≈ ${rem.value}rem（根 ${rootPx.value}px）`
    remInput.value = rem.value
  },
  { immediate: true },
)

function applyRem() {
  const n = Number(remInput.value)
  if (!Number.isNaN(n)) px.value = Math.round(n * rootPx.value)
}
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <p class="text-sm text-slate-600 dark:text-slate-400">按根元素字号换算 rem。</p>
    <div class="grid max-w-md gap-4">
      <label class="text-sm">根字号 (px)<input v-model.number="rootPx" type="number" min="1" class="ml-2 rounded border px-2 py-1 dark:border-slate-600 dark:bg-slate-900" /></label>
      <label class="text-sm">px<input v-model.number="px" type="number" min="0" class="ml-2 rounded border px-2 py-1 dark:border-slate-600 dark:bg-slate-900" /></label>
      <label class="text-sm">rem<input v-model="remInput" type="text" class="ml-2 rounded border px-2 py-1 font-mono dark:border-slate-600 dark:bg-slate-900" @change="applyRem" /></label>
    </div>
    <UiTextarea v-model="summary" label="结果" :readonly="true" :rows="2" />
  </ToolPageTemplate>
</template>
