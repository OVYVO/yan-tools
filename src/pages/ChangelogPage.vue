<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'

usePageMeta({
  title: '更新日志',
  description: '站点与工具的更新记录。',
})
</script>

<template>
  <div class="relative mx-auto max-w-3xl px-3 pb-20 sm:px-5">
    <div class="bento-surface p-8 sm:p-10">
      <p class="bento-label">Changelog</p>
      <h1 class="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">更新日志</h1>
      <ul class="mt-10 space-y-0 border-l-2 border-sky-200/80 pl-8 dark:border-sky-500/25">
        <li class="relative pb-10 last:pb-0">
          <span
            class="absolute -left-[25px] top-1.5 flex h-3 w-3 rounded-full border-2 border-white bg-gradient-to-br from-sky-400 to-sky-600 shadow-sm dark:border-slate-900"
          />
          <p class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">2026-04-14</p>
          <p class="mt-2 font-semibold text-slate-900 dark:text-white">初始版本</p>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            站点框架、分类与搜索上线；首批数据格式、编码、文本、CSS 等工具可用。
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
