<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import ToolCard from '@/components/ui/ToolCard.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useFavorites } from '@/composables/useFavorites'
import { useRecentTools } from '@/composables/useRecentTools'
import { categories } from '@/data/categories'
import { SITE_NAME, SITE_TAGLINE } from '@/data/constants'
import { getFeaturedTools, getLatestTools, getToolBySlug } from '@/data/tools-registry'

usePageMeta({
  title: '首页',
  description: `${SITE_NAME}：${SITE_TAGLINE}`,
})

const featured = getFeaturedTools()
const latest = getLatestTools(8)
const { slugs: favSlugs } = useFavorites()
const { slugs: recentSlugs } = useRecentTools()

const favoriteTools = computed(() =>
  favSlugs.value.map(getToolBySlug).filter((t): t is NonNullable<typeof t> => !!t),
)
const recentTools = computed(() =>
  recentSlugs.value.map(getToolBySlug).filter((t): t is NonNullable<typeof t> => !!t),
)

const sortedCategories = [...categories].sort((a, b) => a.order - b.order)
</script>

<template>
  <div class="relative mx-auto max-w-7xl px-3 pb-16 sm:px-5">
    <!-- 顶部 Bento：主视觉 + 搜索入口 -->
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
      <section
        class="bento-surface relative overflow-hidden p-8 sm:p-10 lg:col-span-7 lg:flex lg:min-h-[220px] lg:flex-col lg:justify-center"
      >
        <div
          class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-sky-400/25 to-indigo-500/10 blur-2xl dark:from-sky-500/20"
        />
        <p class="bento-label relative">Toolkit</p>
        <h1 class="relative mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {{ SITE_NAME }}
        </h1>
        <p class="relative mt-3 max-w-xl text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300">
          {{ SITE_TAGLINE }}
        </p>
      </section>

      <RouterLink
        to="/search"
        class="bento-surface bento-surface-hover group relative flex min-h-[160px] flex-col justify-between overflow-hidden p-6 sm:min-h-[180px] lg:col-span-5"
      >
        <div>
          <p class="bento-label">Search</p>
          <p class="mt-3 text-lg font-semibold text-slate-900 dark:text-white">查找工具</p>
          <p class="mt-1.5 text-sm text-slate-500 dark:text-slate-400">名称、标签或关键词，本地即时筛选</p>
        </div>
        <div
          class="mt-6 flex items-center gap-3 rounded-2xl bento-inset px-4 py-3 text-sm text-slate-500 transition group-hover:text-sky-600 dark:text-slate-400 dark:group-hover:text-sky-400"
        >
          <span class="i-carbon-search text-xl text-sky-500/80" />
          <span class="truncate">点击开始搜索…</span>
          <span class="i-carbon-arrow-right ml-auto text-lg opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-80" />
        </div>
      </RouterLink>
    </div>

    <!-- 收藏 -->
    <section v-if="favoriteTools.length" id="favorites" class="mt-12 scroll-mt-28">
      <div class="bento-section-head">
        <span class="bento-section-head__line" />
        <span class="bento-section-head__text">收藏</span>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <ToolCard v-for="t in favoriteTools" :key="t.slug" :tool="t" />
      </div>
    </section>

    <!-- 最近使用 -->
    <section v-if="recentTools.length" class="mt-12">
      <div class="bento-section-head">
        <span class="bento-section-head__line" />
        <span class="bento-section-head__text">最近使用</span>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <ToolCard v-for="t in recentTools" :key="t.slug" :tool="t" />
      </div>
    </section>

    <!-- 推荐 -->
    <section class="mt-12">
      <div class="bento-section-head">
        <span class="bento-section-head__line" />
        <span class="bento-section-head__text">推荐工具</span>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <ToolCard v-for="t in featured" :key="t.slug" :tool="t" />
      </div>
    </section>

    <!-- 分类 Bento -->
    <section class="mt-12">
      <div class="bento-section-head">
        <span class="bento-section-head__line" />
        <span class="bento-section-head__text">分类</span>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <RouterLink
          v-for="c in sortedCategories"
          :key="c.id"
          :to="`/category/${c.id}`"
          class="bento-surface bento-surface-hover group flex flex-col gap-3 p-6"
        >
          <div
            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/15 to-indigo-500/10 text-sky-600 ring-1 ring-sky-500/20 dark:from-sky-400/20 dark:to-indigo-500/10 dark:text-sky-300 dark:ring-sky-400/25"
          >
            <span class="i-carbon-folder text-xl" />
          </div>
          <div>
            <h3 class="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
              {{ c.name }}
            </h3>
            <p class="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {{ c.description }}
            </p>
          </div>
          <span
            class="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-sky-600 opacity-0 transition group-hover:opacity-100 dark:text-sky-400"
          >
            进入分类
            <span class="i-carbon-arrow-right text-sm" />
          </span>
        </RouterLink>
      </div>
    </section>

    <!-- 最新 -->
    <section class="mt-12">
      <div class="bento-section-head">
        <span class="bento-section-head__line" />
        <span class="bento-section-head__text">最新上线</span>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        <ToolCard v-for="t in latest" :key="t.slug" :tool="t" />
      </div>
    </section>
  </div>
</template>
