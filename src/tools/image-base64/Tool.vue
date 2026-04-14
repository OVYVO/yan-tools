<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const dataUrl = ref('')
const error = ref<string | null>(null)

function onFile(e: Event) {
  error.value = null
  dataUrl.value = ''
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    dataUrl.value = String(reader.result ?? '')
  }
  reader.onerror = () => {
    error.value = '读取失败'
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <p class="text-sm text-slate-600 dark:text-slate-400">图片仅在浏览器本地读取为 Data URL，不会上传。</p>
    <input type="file" accept="image/*" class="block text-sm" @change="onFile" />
    <div v-if="dataUrl" class="mt-4 space-y-3">
      <img :src="dataUrl" alt="preview" class="max-h-64 rounded-lg border border-slate-200 object-contain dark:border-slate-700" />
      <UiTextarea v-model="dataUrl" label="Data URL" :readonly="true" :rows="4" />
      <UiCopyButton :text="dataUrl" />
    </div>
  </ToolPageTemplate>
</template>
