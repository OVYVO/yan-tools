<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const info = ref('')
const previewUrl = ref<string | null>(null)
const error = ref<string | null>(null)

function onFile(e: Event) {
  error.value = null
  info.value = ''
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const dataUrl = String(reader.result ?? '')
    previewUrl.value = dataUrl
    const img = new Image()
    img.onload = () => {
      info.value = [
        `文件名: ${file.name}`,
        `大小: ${file.size} bytes`,
        `MIME: ${file.type || '未知'}`,
        `尺寸: ${img.naturalWidth} × ${img.naturalHeight}`,
      ].join('\n')
    }
    img.onerror = () => {
      error.value = '无法解码图片'
    }
    img.src = dataUrl
  }
  reader.onerror = () => {
    error.value = '读取失败'
  }
  reader.readAsDataURL(file)
}

onUnmounted(() => {
  if (previewUrl.value?.startsWith('blob:')) URL.revokeObjectURL(previewUrl.value)
})
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <p class="text-sm text-slate-600 dark:text-slate-400">仅在本地读取图片元数据，不上传。</p>
    <input type="file" accept="image/*" class="block text-sm" @change="onFile" />
    <img v-if="previewUrl" :src="previewUrl" alt="" class="mt-4 max-h-64 rounded-lg border object-contain" />
    <UiTextarea v-model="info" label="信息" :readonly="true" :rows="6" />
  </ToolPageTemplate>
</template>
