<script setup lang="ts">
import { format } from 'sql-formatter'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('select a,b from t where id=1')
const output = ref('')
const error = ref<string | null>(null)

function run() {
  error.value = null
  try {
    output.value = format(input.value, { language: 'sql' })
  } catch (e) {
    error.value = e instanceof Error ? e.message : '格式化失败'
    output.value = ''
  }
}

run()
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <div class="tool-io-grid">
      <UiTextarea v-model="input" label="SQL" />
      <UiTextarea v-model="output" label="结果" :readonly="true" />
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="button" class="bento-btn-primary" @click="run">
        格式化
      </button>
      <UiCopyButton v-if="output" :text="output" />
    </div>
  </ToolPageTemplate>
</template>
