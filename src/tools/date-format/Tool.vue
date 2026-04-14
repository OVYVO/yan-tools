<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const iso = ref(new Date().toISOString())
const out = ref('')
const locale = ref(navigator.language || 'zh-CN')

function fmt() {
  const d = new Date(iso.value)
  if (Number.isNaN(d.getTime())) {
    out.value = '无效日期'
    return
  }
  const f = new Intl.DateTimeFormat(locale.value, {
    dateStyle: 'full',
    timeStyle: 'long',
  })
  out.value = f.format(d)
}

watch(iso, fmt, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <p class="text-sm text-slate-600 dark:text-slate-400">使用 ISO 8601 字符串解析，输出为 Intl 本地化长格式。</p>
    <div class="flex flex-wrap items-end gap-3">
      <div>
        <label class="text-sm text-slate-600 dark:text-slate-300">ISO 时间</label>
        <input
          v-model="iso"
          type="text"
          class="mt-1 block w-full min-w-[280px] rounded-lg border border-slate-200 px-3 py-2 font-mono dark:border-slate-600 dark:bg-slate-900"
        />
      </div>
      <div>
        <label class="text-sm text-slate-600 dark:text-slate-300">BCP 47 区域</label>
        <input
          v-model="locale"
          type="text"
          class="mt-1 block w-40 rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-600 dark:bg-slate-900"
          @change="fmt"
        />
      </div>
      <button type="button" class="bento-btn-primary" @click="fmt">
        应用
      </button>
    </div>
    <UiTextarea v-model="out" label="格式化结果" :readonly="true" :rows="4" />
    <UiCopyButton v-if="out && out !== '无效日期'" :text="out" />
  </ToolPageTemplate>
</template>
