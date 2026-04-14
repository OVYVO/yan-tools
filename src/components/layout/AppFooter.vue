<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { SITE_NAME } from '@/data/constants'
</script>

<template>
  <footer
    class="border-t border-[var(--ui-border-subtle)] bg-[var(--ui-bg-base)]/60 pb-8 pt-10 sm:pb-10"
  >
    <div
      class="site-content-width flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p class="font-semibold tracking-tight text-slate-800 dark:text-slate-100">{{ SITE_NAME }}</p>
        <p class="mt-1.5 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          纯前端运行，收藏与主题等偏好保存在本机浏览器。
        </p>
      </div>
      <nav class="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-600 dark:text-slate-400">
        <RouterLink to="/changelog" class="transition hover:text-sky-600 dark:hover:text-sky-400"> 更新日志 </RouterLink>
        <RouterLink to="/privacy" class="transition hover:text-sky-600 dark:hover:text-sky-400"> 隐私说明 </RouterLink>
        <RouterLink to="/about" class="transition hover:text-sky-600 dark:hover:text-sky-400"> 关于 </RouterLink>
      </nav>
    </div>
  </footer>
</template>
