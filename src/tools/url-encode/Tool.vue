<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('hello 世界')
const output = ref('')
const error = ref<string | null>(null)

function encode() {
  error.value = null
  try {
    output.value = encodeURIComponent(input.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : '编码失败'
  }
}

function decode() {
  error.value = null
  try {
    output.value = decodeURIComponent(input.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : '解码失败'
  }
}
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <div class="tool-io-grid">
      <UiTextarea v-model="input" label="文本" />
      <UiTextarea v-model="output" label="结果" :readonly="true" />
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="button" class="bento-btn-primary" @click="encode">
        编码
      </button>
      <button
        type="button"
        class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        @click="decode"
      >
        解码
      </button>
      <UiCopyButton v-if="output" :text="output" />
    </div>
  </ToolPageTemplate>
</template>
