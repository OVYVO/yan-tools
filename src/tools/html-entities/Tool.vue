<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('<div>你好</div>')
const output = ref('')

function encode() {
  const el = document.createElement('textarea')
  el.textContent = input.value
  output.value = el.innerHTML
}

function decode() {
  const el = document.createElement('textarea')
  el.innerHTML = input.value
  output.value = el.value
}
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <UiTextarea v-model="input" label="输入" />
    <UiTextarea v-model="output" label="输出" :readonly="true" />
    <div class="flex flex-wrap gap-2">
      <button type="button" class="bento-btn-primary" @click="encode">
        编码实体
      </button>
      <button
        type="button"
        class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        @click="decode"
      >
        解码实体
      </button>
      <UiCopyButton v-if="output" :text="output" />
    </div>
  </ToolPageTemplate>
</template>
