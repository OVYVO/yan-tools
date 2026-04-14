<script setup lang="ts">
import cronstrue from 'cronstrue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const expr = ref('0 9 * * 1-5')
const human = ref('')
const error = ref<string | null>(null)

function run() {
  error.value = null
  try {
    human.value = cronstrue.toString(expr.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : '无法解析'
    human.value = ''
  }
}

run()
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <p class="text-sm text-slate-600 dark:text-slate-400">使用 cronstrue 生成本地化描述（5 段标准 Cron）。</p>
    <div class="tool-io-grid">
      <UiTextarea v-model="expr" label="Cron 表达式" :rows="2" />
      <UiTextarea v-model="human" label="说明" :readonly="true" :rows="3" />
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="button" class="bento-btn-primary" @click="run">
        解析
      </button>
      <UiCopyButton v-if="human" :text="human" />
    </div>
  </ToolPageTemplate>
</template>
