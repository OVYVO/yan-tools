<script setup lang="ts">
import DOMPurify from 'dompurify'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><circle cx="60" cy="60" r="50" fill="#3b82f6"/></svg>',
)
const preview = ref('')
const minified = ref('')

function sync() {
  preview.value = DOMPurify.sanitize(input.value, { USE_PROFILES: { svg: true, svgFilters: true } })
  minified.value = input.value.replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').trim()
}

watch(input, sync, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <p class="text-sm text-slate-600 dark:text-slate-400">SVG 在本地解析预览；压缩仅去除多余空白，请自行检查语义。</p>
    <div class="grid gap-6 lg:grid-cols-2">
      <UiTextarea v-model="input" label="SVG 源码" :rows="12" />
      <div>
        <p class="mb-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">预览</p>
        <div
          class="flex min-h-48 items-center justify-center rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
          v-html="preview"
        />
      </div>
    </div>
    <UiTextarea v-model="minified" label="压缩（简易）" :readonly="true" :rows="4" />
    <UiCopyButton v-if="minified" :text="minified" label="复制压缩结果" />
  </ToolPageTemplate>
</template>
