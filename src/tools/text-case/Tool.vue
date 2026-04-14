<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('Hello World')
const mode = ref<'lower' | 'upper' | 'title'>('lower')
const output = ref('')

function setMode(m: 'lower' | 'upper' | 'title') {
  mode.value = m
}

function apply() {
  const t = input.value
  if (mode.value === 'lower') output.value = t.toLowerCase()
  else if (mode.value === 'upper') output.value = t.toUpperCase()
  else
    output.value = t.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())
}

watch([input, mode], apply, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="m in [
          { id: 'lower', label: '小写' },
          { id: 'upper', label: '大写' },
          { id: 'title', label: '首字母大写' },
        ]"
        :key="m.id"
        type="button"
        class="rounded-lg px-3 py-1.5 text-sm"
        :class="
          mode === m.id
            ? 'border-0 bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/20'
            : 'border border-slate-200 bg-white/80 dark:border-slate-600 dark:bg-slate-800/60'
        "
        @click="setMode(m.id as 'lower' | 'upper' | 'title')"
      >
        {{ m.label }}
      </button>
    </div>
    <div class="grid gap-6 lg:grid-cols-2">
      <UiTextarea v-model="input" label="输入" />
      <UiTextarea v-model="output" label="输出" :readonly="true" />
    </div>
    <UiCopyButton v-if="output" :text="output" />
  </ToolPageTemplate>
</template>
