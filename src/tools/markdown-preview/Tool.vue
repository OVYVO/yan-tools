<script setup lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('# 标题\n\n- 列表\n- **粗体**')
const html = ref('')

watch(
  input,
  () => {
    const raw = marked.parse(input.value, { async: false }) as string
    html.value = DOMPurify.sanitize(raw)
  },
  { immediate: true },
)
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <p class="text-sm text-slate-600 dark:text-slate-400">使用 marked 渲染并经 DOMPurify 消毒，请勿粘贴不信任内容。</p>
    <div class="tool-io-grid">
      <UiTextarea v-model="input" label="Markdown" />
      <div>
        <p class="mb-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">预览</p>
        <div
          class="prose-tool min-h-64 min-w-0 rounded-ui-lg border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-elevated)] p-4 text-slate-800 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100"
          v-html="html"
        />
      </div>
    </div>
  </ToolPageTemplate>
</template>
