<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('banana\napple\n')
const dedupe = ref(false)
const output = ref('')

function run() {
  let lines = input.value.split(/\r?\n/)
  if (dedupe.value) lines = [...new Set(lines)]
  lines.sort((a, b) => a.localeCompare(b, 'zh-Hans'))
  output.value = lines.join('\n')
}

watch([input, dedupe], run, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      <input v-model="dedupe" type="checkbox" />
      排序前去重
    </label>
    <div class="grid gap-6 lg:grid-cols-2">
      <UiTextarea v-model="input" label="输入" />
      <UiTextarea v-model="output" label="排序后" :readonly="true" />
    </div>
    <UiCopyButton v-if="output" :text="output" />
  </ToolPageTemplate>
</template>
