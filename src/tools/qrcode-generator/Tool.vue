<script setup lang="ts">
import QRCode from 'qrcode'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const text = ref('https://example.com')
const dataUrl = ref('')
const error = ref<string | null>(null)

async function render() {
  error.value = null
  try {
    dataUrl.value = await QRCode.toDataURL(text.value, { margin: 2, width: 280 })
  } catch (e) {
    error.value = e instanceof Error ? e.message : '生成失败'
    dataUrl.value = ''
  }
}

watch(text, render, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <UiTextarea v-model="text" label="内容" :rows="4" />
    <div class="flex flex-col items-start gap-4 sm:flex-row">
      <img v-if="dataUrl" :src="dataUrl" alt="QR" class="rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700" />
      <a v-if="dataUrl" :href="dataUrl" download="qrcode.png" class="bento-link text-sm">下载 PNG</a>
    </div>
  </ToolPageTemplate>
</template>
