<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import yaml from 'js-yaml'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('a: 1\nb: hello')
const output = ref('')
const error = ref<string | null>(null)

function run() {
  error.value = null
  try {
    const obj = yaml.load(input.value)
    output.value = JSON.stringify(obj, null, 2)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'YAML 解析失败'
    output.value = ''
  }
}
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <div class="tool-io-grid">
      <UiTextarea v-model="input" label="YAML" />
      <UiTextarea v-model="output" label="JSON" />
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="button" class="bento-btn-primary" @click="run">
        转换
      </button>
      <UiCopyButton v-if="output" :text="output" />
    </div>
  </ToolPageTemplate>
</template>
