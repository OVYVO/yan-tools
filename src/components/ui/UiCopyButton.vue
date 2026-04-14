<script setup lang="ts">
import { useClipboard } from '@/composables/useClipboard'

const props = defineProps<{
  text: string
  label?: string
}>()

const { copyText, copied } = useClipboard()
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-300/60 hover:bg-sky-50/80 hover:text-sky-800 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:border-sky-400/30 dark:hover:bg-sky-950/40"
    @click="copyText(props.text)"
  >
    <span class="i-carbon-copy text-base opacity-70" />
    {{ copied ? '已复制' : (label ?? '复制') }}
  </button>
</template>
