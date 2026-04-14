<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('<root><item id="1">hi</item></root>')
const output = ref('')
const error = ref<string | null>(null)

const parser = new XMLParser({
  ignoreAttributes: false,
  parseAttributeValue: true,
  trimValues: true,
})

function run(pretty: boolean) {
  error.value = null
  try {
    const obj = parser.parse(input.value)
    const builder = new XMLBuilder({
      format: pretty,
      indentBy: '  ',
      ignoreAttributes: false,
      suppressEmptyNode: false,
    })
    output.value = builder.build(obj)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'XML 处理失败'
    output.value = ''
  }
}
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <div class="tool-io-grid">
      <UiTextarea v-model="input" label="XML" />
      <UiTextarea v-model="output" label="输出" />
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="button" class="bento-btn-primary" @click="run(true)">
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
