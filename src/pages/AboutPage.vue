<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePageMeta } from '@/composables/usePageMeta'
import { SITE_NAME, SITE_TAGLINE } from '@/data/constants'

usePageMeta({
  title: '关于',
  description: `关于 ${SITE_NAME}`,
})
</script>

<template>
  <div class="relative mx-auto max-w-3xl px-3 pb-20 sm:px-5">
    <div class="bento-surface p-8 sm:p-10">
      <p class="bento-label">About</p>
      <h1 class="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">关于</h1>
      <div class="mt-6 space-y-4 leading-relaxed text-slate-600 dark:text-slate-300">
        <p>
          {{ SITE_NAME }} 是一套在浏览器中运行的前端小工具集合，{{ SITE_TAGLINE }}。所有数据处理均在本地完成，适合静态部署到
          GitHub Pages、Netlify、Vercel、Cloudflare Pages 等平台。
        </p>
        <p>
          工具按分类与标签组织，支持搜索、收藏与最近使用记录（使用浏览器 localStorage 持久化）。JWT
          解析、哈希等工具不会将数据上传到任何服务器。
        </p>
      </div>
      <p class="mt-8">
        <RouterLink to="/" class="bento-link">← 返回首页</RouterLink>
      </p>
    </div>
  </div>
</template>
