<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePageMeta } from '@/composables/usePageMeta'

usePageMeta({ title: '页面不存在', description: '未找到请求的页面。' })
</script>

<template>
  <div class="flex min-h-[55vh] flex-col items-center justify-center px-4 py-16">
    <div class="bento-surface w-full max-w-md p-10 text-center">
      <div
        class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200/80 to-slate-300/50 text-2xl font-bold text-slate-500 dark:from-slate-700 dark:to-slate-800 dark:text-slate-400"
      >
        404
      </div>
      <h1 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">页面不存在</h1>
      <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">链接可能过期，或地址输入有误。</p>
      <RouterLink
        to="/"
        class="bento-btn-primary mt-8 inline-flex items-center justify-center gap-2 no-underline hover:!text-white"
      >
        <span class="i-carbon-home" />
        返回首页
      </RouterLink>
    </div>
  </div>
</template>
