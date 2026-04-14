<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { SITE_NAME } from '@/data/constants'
</script>

<template>
  <footer class="px-3 pb-6 pt-2 sm:px-5 sm:pb-8">
    <div
      class="bento-surface mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8"
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
