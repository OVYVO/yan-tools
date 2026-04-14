<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('')
const headerOut = ref('')
const payloadOut = ref('')
const error = ref<string | null>(null)

function b64UrlToJson(segment: string) {
  let s = segment.replace(/-/g, '+').replace(/_/g, '/')
  const pad = s.length % 4
  if (pad) s += '='.repeat(4 - pad)
  const json = decodeURIComponent(
    atob(s)
      .split('')
      .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
      .join(''),
  )
  return JSON.stringify(JSON.parse(json), null, 2)
}

function parse() {
  error.value = null
  headerOut.value = ''
  payloadOut.value = ''
  const parts = input.value.trim().split('.')
  if (parts.length < 2) {
    error.value = 'JWT 至少应包含 header 与 payload 两段'
    return
  }
  try {
    headerOut.value = b64UrlToJson(parts[0])
    payloadOut.value = b64UrlToJson(parts[1])
  } catch (e) {
    error.value = e instanceof Error ? e.message : '解析失败'
  }
}
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <p class="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
      本工具仅解码展示 Header / Payload，<strong>不验证签名</strong>，请勿用于安全决策。
    </p>
    <UiTextarea v-model="input" label="JWT 字符串" :rows="4" />
    <div class="tool-io-grid">
      <UiTextarea v-model="headerOut" label="Header" :readonly="true" />
      <UiTextarea v-model="payloadOut" label="Payload" :readonly="true" />
    </div>
    <div class="flex flex-wrap gap-2">
      <button type="button" class="bento-btn-primary" @click="parse">
        解析
      </button>
      <UiCopyButton v-if="payloadOut" label="复制 Payload" :text="payloadOut" />
    </div>
  </ToolPageTemplate>
</template>
