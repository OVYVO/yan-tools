<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'
import { jsonToTypeScriptTypes } from '@/utils/jsonToTs'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('{\n  "name": "demo",\n  "count": 1\n}')
const output = ref('')
const error = ref<string | null>(null)

function run() {
  const r = jsonToTypeScriptTypes(input.value, 'Root')
  if (r.ok) {
    error.value = null
    output.value = r.code
  } else {
    error.value = r.error
    output.value = ''
  }
}
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <div class="tool-io-grid">
      <UiTextarea v-model="input" label="JSON 样本" />
      <UiTextarea v-model="output" label="TypeScript" />
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="bento-btn-primary"
        @click="run"
      >
        生成类型
      </button>
      <UiCopyButton v-if="output" :text="output" />
    </div>
  </ToolPageTemplate>
</template>
