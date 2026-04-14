<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('<div><span>hi</span></div>')
const output = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

async function run() {
  error.value = null
  loading.value = true
  try {
    const prettier = await import('prettier')
    output.value = await prettier.format(input.value, { parser: 'html', filepath: 'x.html' })
  } catch (e) {
    error.value = e instanceof Error ? e.message : '格式化失败'
    output.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <div class="tool-io-grid">
      <UiTextarea v-model="input" label="HTML" />
      <UiTextarea v-model="output" label="结果" :readonly="true" />
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="bento-btn-primary"
        :disabled="loading"
        @click="run"
      >
        {{ loading ? '处理中…' : '格式化' }}
      </button>
      <UiCopyButton v-if="output" :text="output" />
    </div>
  </ToolPageTemplate>
</template>
