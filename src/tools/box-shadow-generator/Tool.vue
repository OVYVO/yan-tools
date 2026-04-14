<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const x = ref(0)
const y = ref(8)
const blur = ref(16)
const spread = ref(0)
const color = ref('#00000040')
const css = ref('')

function sync() {
  css.value = `${x.value}px ${y.value}px ${blur.value}px ${spread.value}px ${color.value}`
}

watch([x, y, blur, spread, color], sync, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <div class="grid max-w-xl gap-3 text-sm">
      <label>X <input v-model.number="x" type="range" min="-40" max="40" class="w-full" /></label>
      <label>Y <input v-model.number="y" type="range" min="-40" max="40" class="w-full" /></label>
      <label>模糊 <input v-model.number="blur" type="range" min="0" max="80" class="w-full" /></label>
      <label>扩散 <input v-model.number="spread" type="range" min="-20" max="40" class="w-full" /></label>
      <label>颜色 <input v-model="color" type="color" class="h-10 w-full" /></label>
    </div>
    <div class="flex items-center justify-center rounded-2xl bg-slate-100 py-16 dark:bg-slate-900/60">
      <div class="h-32 w-48 rounded-xl bg-white dark:bg-slate-800" :style="{ boxShadow: css }" />
    </div>
    <UiTextarea v-model="css" label="box-shadow" :readonly="true" :rows="2" />
    <UiCopyButton :text="`box-shadow: ${css};`" />
  </ToolPageTemplate>
</template>
