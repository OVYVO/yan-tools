<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const tsInput = ref(String(Math.floor(Date.now() / 1000)))
const localStr = ref('')
const utcStr = ref('')
const error = ref<string | null>(null)

function applyFromTs() {
  error.value = null
  try {
    let n = Number(tsInput.value.trim())
    if (Number.isNaN(n)) throw new Error('请输入数字')
    if (String(tsInput.value).length >= 13) n = Math.floor(n / 1000)
    const d = new Date(n * 1000)
    localStr.value = d.toString()
    utcStr.value = d.toUTCString()
  } catch (e) {
    error.value = e instanceof Error ? e.message : '无效时间戳'
  }
}

function nowMs() {
  tsInput.value = String(Date.now())
  applyFromTs()
}

applyFromTs()
</script>

<template>
  <ToolPageTemplate :meta="meta" :error="error">
    <p class="text-sm text-slate-600 dark:text-slate-400">
      秒级时间戳为 10 位；若为 13 位毫秒会自动按秒处理。时间为浏览器本地时区与 UTC 展示。
    </p>
    <div class="flex flex-wrap gap-2">
      <input
        v-model="tsInput"
        type="text"
        class="rounded-lg border border-slate-200 px-3 py-2 font-mono dark:border-slate-600 dark:bg-slate-900"
        @keyup.enter="applyFromTs"
      />
      <button type="button" class="bento-btn-primary" @click="applyFromTs">
        转换
      </button>
      <button
        type="button"
        class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
        @click="nowMs"
      >
        当前时间
      </button>
    </div>
    <div class="grid gap-4 lg:grid-cols-2">
      <UiTextarea v-model="localStr" label="本地时间" :readonly="true" :rows="3" />
      <UiTextarea v-model="utcStr" label="UTC 字符串" :readonly="true" :rows="3" />
    </div>
    <UiCopyButton v-if="localStr" :text="`${tsInput}\n${localStr}\n${utcStr}`" label="复制全部" />
  </ToolPageTemplate>
</template>
