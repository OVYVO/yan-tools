<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const min = ref('1rem')
const pref = ref('2vw + 1rem')
const max = ref('3rem')
const out = ref('')

function sync() {
  out.value = `clamp(${min.value}, ${pref.value}, ${max.value})`
}

watch([min, pref, max], sync, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <div class="grid max-w-xl gap-3 text-sm">
      <label>min <input v-model="min" class="ml-2 w-full rounded border px-2 py-1 font-mono dark:border-slate-600 dark:bg-slate-900" /></label>
      <label>首选（可含 vw） <input v-model="pref" class="ml-2 w-full rounded border px-2 py-1 font-mono dark:border-slate-600 dark:bg-slate-900" /></label>
      <label>max <input v-model="max" class="ml-2 w-full rounded border px-2 py-1 font-mono dark:border-slate-600 dark:bg-slate-900" /></label>
    </div>
    <UiTextarea v-model="out" label="clamp()" :readonly="true" :rows="2" />
    <UiCopyButton :text="`font-size: ${out};`" />
  </ToolPageTemplate>
</template>
