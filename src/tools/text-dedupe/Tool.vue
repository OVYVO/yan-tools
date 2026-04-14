<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('a\nb\na\n')
const skipEmpty = ref(true)
const output = ref('')

function run() {
  const lines = input.value.split(/\r?\n/)
  const seen = new Set<string>()
  const out: string[] = []
  for (const line of lines) {
    if (skipEmpty.value && line.trim() === '') continue
    if (seen.has(line)) continue
    seen.add(line)
    out.push(line)
  }
  output.value = out.join('\n')
}

watch([input, skipEmpty], run, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      <input v-model="skipEmpty" type="checkbox" />
      忽略空行参与去重
    </label>
    <div class="grid gap-6 lg:grid-cols-2">
      <UiTextarea v-model="input" label="输入" />
      <UiTextarea v-model="output" label="去重后" :readonly="true" />
    </div>
    <UiCopyButton v-if="output" :text="output" />
  </ToolPageTemplate>
</template>
