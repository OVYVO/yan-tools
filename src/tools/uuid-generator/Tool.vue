<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const count = ref(5)
const output = ref('')

function run() {
  const n = Math.min(100, Math.max(1, count.value))
  const lines: string[] = []
  for (let i = 0; i < n; i++) lines.push(crypto.randomUUID())
  output.value = lines.join('\n')
}

run()
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <div class="flex flex-wrap items-center gap-3">
      <label class="text-sm text-slate-600 dark:text-slate-300">数量</label>
      <input
        v-model.number="count"
        type="number"
        min="1"
        max="100"
        class="w-24 rounded-lg border border-slate-200 px-2 py-1 dark:border-slate-600 dark:bg-slate-900"
      />
      <button type="button" class="bento-btn-primary" @click="run">
        生成
      </button>
    </div>
    <UiTextarea v-model="output" label="UUID（v4）" :readonly="true" />
    <UiCopyButton v-if="output" :text="output" />
  </ToolPageTemplate>
</template>
