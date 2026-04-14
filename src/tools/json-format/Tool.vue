<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('{\n  "hello": "world"\n}')
const output = ref('')
const error = ref<string | null>(null)

function run(pretty: boolean) {
  error.value = null
  try {
    const o = JSON.parse(input.value)
    output.value = pretty ? JSON.stringify(o, null, 2) : JSON.stringify(o)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'JSON 无效'
    output.value = ''
  }
}
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <div class="grid gap-6 lg:grid-cols-2">
      <UiTextarea v-model="input" label="输入 JSON" />
      <UiTextarea v-model="output" label="输出" :readonly="true" />
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="bento-btn-primary"
        @click="run(true)"
      >
        格式化
      </button>
      <button
        type="button"
        class="bento-btn-secondary"
        @click="run(false)"
      >
        压缩
      </button>
      <UiCopyButton v-if="output" :text="output" />
    </div>
  </ToolPageTemplate>
</template>
