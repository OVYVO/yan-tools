<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('  a \n\n b ')
const trimLines = ref(true)
const dropEmpty = ref(true)
const numberLines = ref(false)
const output = ref('')

function run() {
  let lines = input.value.split(/\r?\n/)
  if (trimLines.value) lines = lines.map((l) => l.trim())
  if (dropEmpty.value) lines = lines.filter((l) => l.length > 0)
  if (numberLines.value) lines = lines.map((l, i) => `${i + 1}. ${l}`)
  output.value = lines.join('\n')
}

watch([input, trimLines, dropEmpty, numberLines], run, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <div class="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
      <label class="flex items-center gap-2"><input v-model="trimLines" type="checkbox" /> 每行 trim</label>
      <label class="flex items-center gap-2"><input v-model="dropEmpty" type="checkbox" /> 删除空行</label>
      <label class="flex items-center gap-2"><input v-model="numberLines" type="checkbox" /> 行号</label>
    </div>
    <div class="tool-io-grid">
      <UiTextarea v-model="input" label="输入" />
      <UiTextarea v-model="output" label="结果" :readonly="true" />
    </div>
    <UiCopyButton v-if="output" :text="output" />
  </ToolPageTemplate>
</template>
