<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'

usePageMeta({
  title: '隐私说明',
  description: '本地数据处理与隐私说明。',
})
</script>

<template>
  <div class="relative mx-auto max-w-3xl px-3 pb-20 sm:px-5">
    <div class="bento-surface p-8 sm:p-10">
      <p class="bento-label">Privacy</p>
      <h1 class="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">隐私说明</h1>
      <ul class="mt-8 space-y-4 text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300">
        <li class="flex gap-3">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
          <span>本站为纯静态前端，不默认连接自有后端；工具逻辑在您的浏览器中执行。</span>
        </li>
        <li class="flex gap-3">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
          <span
            >收藏、最近使用与主题等偏好保存在本机
            <code
              class="rounded-lg bg-slate-100 px-2 py-0.5 font-mono text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-200"
              >localStorage</code
            >。</span
          >
        </li>
        <li class="flex gap-3">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
          <span>若使用第三方 CDN 加载图标或依赖，请遵循相应服务商的隐私政策。</span>
        </li>
        <li class="flex gap-3">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500/80" />
          <span>请勿在公共设备上处理高度敏感数据；离开前可清理浏览器站点数据。</span>
        </li>
      </ul>
    </div>
  </div>
</template>
