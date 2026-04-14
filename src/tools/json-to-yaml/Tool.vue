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

const input = ref('{\n  "a": 1\n}')
const output = ref('')
const error = ref<string | null>(null)

function run() {
  error.value = null
  try {
    const obj = JSON.parse(input.value)
    output.value = yaml.dump(obj, { lineWidth: 120 })
  } catch (e) {
    error.value = e instanceof Error ? e.message : '转换失败'
    output.value = ''
  }
}
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <div class="grid gap-6 lg:grid-cols-2">
      <UiTextarea v-model="input" label="JSON" />
      <UiTextarea v-model="output" label="YAML" />
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="button" class="bento-btn-primary" @click="run">
        转换
      </button>
      <UiCopyButton v-if="output" :text="output" />
    </div>
  </ToolPageTemplate>
</template>
