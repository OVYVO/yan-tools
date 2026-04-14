<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const angle = ref(135)
const c1 = ref('#3b82f6')
const c2 = ref('#a855f7')
const css = ref('')

function sync() {
  css.value = `linear-gradient(${angle.value}deg, ${c1.value}, ${c2.value})`
}

watch([angle, c1, c2], sync, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <div class="grid gap-4 sm:grid-cols-3">
      <label class="text-sm">角度<input v-model.number="angle" type="range" min="0" max="360" class="block w-full" /></label>
      <label class="text-sm">颜色 A<input v-model="c1" type="color" class="mt-1 h-10 w-full" /></label>
      <label class="text-sm">颜色 B<input v-model="c2" type="color" class="mt-1 h-10 w-full" /></label>
    </div>
    <div class="h-40 w-full rounded-2xl border border-slate-200 shadow-inner" :style="{ background: css }" />
    <UiTextarea v-model="css" label="CSS" :readonly="true" :rows="2" />
    <UiCopyButton :text="`background: ${css};`" />
  </ToolPageTemplate>
</template>
