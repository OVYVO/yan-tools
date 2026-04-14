<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('hello')
const output = ref('')
const error = ref<string | null>(null)

function toBase64() {
  error.value = null
  try {
    output.value = btoa(unescape(encodeURIComponent(input.value)))
  } catch (e) {
    error.value = e instanceof Error ? e.message : '编码失败'
  }
}

function fromBase64() {
  error.value = null
  try {
    output.value = decodeURIComponent(escape(atob(input.value.trim())))
  } catch (e) {
    error.value = e instanceof Error ? e.message : '解码失败（需合法 Base64）'
  }
}
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <UiTextarea v-model="input" label="输入" />
    <UiTextarea v-model="output" label="输出" :readonly="true" />
    <div class="flex flex-wrap gap-2">
      <button type="button" class="bento-btn-primary" @click="toBase64">
        编码为 Base64
      </button>
      <button
        type="button"
        class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        @click="fromBase64"
      >
        从 Base64 解码
      </button>
      <UiCopyButton v-if="output" :text="output" />
    </div>
  </ToolPageTemplate>
</template>
