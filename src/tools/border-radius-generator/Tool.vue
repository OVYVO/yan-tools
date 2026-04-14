<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const r = ref(16)
const css = ref('')

function sync() {
  css.value = `${r.value}px`
}

watch(r, sync, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <label class="block max-w-md text-sm">圆角半径 {{ r }}px<input v-model.number="r" type="range" min="0" max="64" class="mt-2 w-full" /></label>
    <div class="flex justify-center rounded-2xl bg-slate-100 py-12 dark:bg-slate-900/60">
      <div class="h-32 w-48 bg-gradient-to-br from-sky-400 to-sky-600" :style="{ borderRadius: css }" />
    </div>
    <UiTextarea v-model="css" label="border-radius" :readonly="true" :rows="2" />
    <UiCopyButton :text="`border-radius: ${css};`" />
  </ToolPageTemplate>
</template>
