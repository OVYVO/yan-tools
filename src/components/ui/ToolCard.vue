<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ToolMeta } from '@/types/tool'

defineProps<{
  tool: ToolMeta
}>()
</script>

<template>
  <RouterLink
    :to="`/tools/${tool.slug}`"
    class="group relative flex h-full min-h-[7.5rem] flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_2px_20px_-8px_rgba(15,23,42,0.1)] backdrop-blur-md transition-all duration-300 ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-l-3xl before:bg-gradient-to-b before:from-sky-400 before:to-sky-600 before:opacity-0 before:transition-opacity hover:border-sky-400/35 hover:shadow-[0_14px_40px_-14px_rgba(14,165,233,0.28)] hover:before:opacity-100 dark:border-white/[0.08] dark:bg-slate-900/50 dark:shadow-[0_4px_32px_-12px_rgba(0,0,0,0.45)] dark:hover:border-sky-400/25"
  >
    <div class="flex items-start justify-between gap-3 pl-1">
      <h3
        class="line-clamp-2 text-[0.95rem] font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-300"
      >
        {{ tool.name }}
      </h3>
      <span
        v-if="tool.featured"
        class="shrink-0 rounded-full bg-gradient-to-r from-amber-200/90 to-orange-200/80 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-900 dark:from-amber-500/30 dark:to-orange-500/25 dark:text-amber-100"
      >
        精选
      </span>
    </div>
    <p class="mt-2 line-clamp-2 flex-1 pl-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
      {{ tool.summary }}
    </p>
    <div class="mt-4 flex flex-wrap gap-1.5 pl-1">
      <span
        v-for="tag in tool.tags"
        :key="tag"
        class="rounded-lg bg-slate-100/90 px-2 py-0.5 text-[0.7rem] font-medium text-slate-600 ring-1 ring-slate-200/60 dark:bg-slate-800/80 dark:text-slate-300 dark:ring-white/5"
      >
        {{ tag }}
      </span>
    </div>
  </RouterLink>
</template>
