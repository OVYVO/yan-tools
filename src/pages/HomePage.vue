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
import { bentoGradientClassByIndex } from '@/utils/bentoGradient'

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

const homeFeaturedCount = featured.length
const homeCategoryCount = sortedCategories.length

/** 首页自上而下：推荐→分类→收藏→最近→最新，渐变序号连续，12 色一轮循环、顺序不重复打乱 */
function homeGradientFeatured(i: number): number {
  return i
}
function homeGradientCategory(i: number): number {
  return homeFeaturedCount + i
}
function homeGradientFavorite(i: number): number {
  return homeFeaturedCount + homeCategoryCount + i
}
function homeGradientRecent(i: number): number {
  let b = homeFeaturedCount + homeCategoryCount
  if (favoriteTools.value.length) b += favoriteTools.value.length
  return b + i
}
function homeGradientLatest(i: number): number {
  let b = homeFeaturedCount + homeCategoryCount
  if (favoriteTools.value.length) b += favoriteTools.value.length
  if (recentTools.value.length) b += recentTools.value.length
  return b + i
}
</script>

<template>
  <div class="bento-container bento-section-y">
    <!-- 1. Hero + 搜索入口：桌面 8 + 4 列 Bento -->
    <div class="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-12 md:gap-5">
      <section
        class="bento-surface relative overflow-hidden p-6 sm:p-8 md:col-span-8 md:flex md:min-h-[220px] md:flex-col md:justify-center lg:min-h-[240px]"
      >
        <div
          class="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-sky-400/25 to-indigo-500/10 blur-2xl dark:from-sky-500/20"
        />
        <p class="bento-label relative">Toolkit</p>
        <h1 class="text-page-title relative mt-3">
          {{ SITE_NAME }}
        </h1>
        <p class="text-body relative mt-3 max-w-xl">
          {{ SITE_TAGLINE }}
        </p>
      </section>

      <RouterLink
        to="/search"
        class="bento-surface bento-surface-hover group relative flex min-h-[120px] flex-col justify-between overflow-hidden p-5 md:col-span-4"
      >
        <div>
          <p class="bento-label">Search</p>
          <p class="text-section-title mt-3">查找工具</p>
          <p class="text-caption mt-1.5">名称、标签或关键词，本地即时筛选</p>
        </div>
        <div
          class="bento-inset mt-6 flex items-center gap-3 px-4 py-3 text-sm text-slate-500 transition motion-safe:duration-200 group-hover:text-sky-600 dark:text-slate-400 dark:group-hover:text-sky-400"
        >
          <span class="i-tabler-search icon-md text-sky-500/80" />
          <span class="truncate">点击开始搜索…</span>
          <span class="i-tabler-arrow-right icon-md ml-auto opacity-40 transition motion-safe:duration-200 group-hover:translate-x-0.5 group-hover:opacity-80 motion-reduce:group-hover:translate-x-0" />
        </div>
      </RouterLink>
    </div>

    <!-- 2. 推荐工具 -->
    <section aria-labelledby="home-featured-heading">
      <div class="bento-section-head">
        <span class="bento-section-head__line" />
        <h2 id="home-featured-heading" class="bento-section-head__text">
          推荐工具
        </h2>
      </div>
      <div class="bento-tool-grid">
        <ToolCard
          v-for="(t, i) in featured"
          :key="t.slug"
          :tool="t"
          :gradient-index="homeGradientFeatured(i)"
        />
      </div>
    </section>

    <!-- 3. 分类入口 -->
    <section aria-labelledby="home-categories-heading">
      <div class="bento-section-head">
        <span class="bento-section-head__line" />
        <h2 id="home-categories-heading" class="bento-section-head__text">
          分类
        </h2>
      </div>
      <div class="bento-tool-grid">
        <RouterLink
          v-for="(c, i) in sortedCategories"
          :key="c.id"
          :to="`/category/${c.id}`"
          class="bento-surface bento-surface-hover group relative isolate flex flex-col gap-2.5 overflow-hidden p-5 md:col-span-6 lg:col-span-3"
          :class="bentoGradientClassByIndex(homeGradientCategory(i))"
        >
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-ui-md bg-white/50 text-sky-700 ring-1 ring-slate-900/[0.08] backdrop-blur-sm dark:bg-slate-950/45 dark:text-sky-300 dark:ring-white/15"
          >
            <span class="i-tabler-folder icon-md" />
          </div>
          <div>
            <h3 class="text-base font-bold tracking-tight text-[var(--ui-text-primary)]">
              {{ c.name }}
            </h3>
            <p class="text-caption mt-1.5 leading-relaxed">
              {{ c.description }}
            </p>
          </div>
          <span
            class="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-sky-600 opacity-0 transition motion-safe:duration-200 group-hover:opacity-100 dark:text-sky-400"
          >
            进入分类
            <span class="i-tabler-arrow-right icon-sm" />
          </span>
        </RouterLink>
      </div>
    </section>

    <!-- 4. 收藏 -->
    <section
      v-if="favoriteTools.length"
      id="favorites"
      aria-labelledby="home-favorites-heading"
      class="scroll-mt-28"
    >
      <div class="bento-section-head">
        <span class="bento-section-head__line" />
        <h2 id="home-favorites-heading" class="bento-section-head__text">
          收藏
        </h2>
      </div>
      <div class="bento-tool-grid">
        <ToolCard
          v-for="(t, i) in favoriteTools"
          :key="t.slug"
          :tool="t"
          :gradient-index="homeGradientFavorite(i)"
        />
      </div>
    </section>

    <!-- 5. 最近使用 -->
    <section v-if="recentTools.length" aria-labelledby="home-recent-heading">
      <div class="bento-section-head">
        <span class="bento-section-head__line" />
        <h2 id="home-recent-heading" class="bento-section-head__text">
          最近使用
        </h2>
      </div>
      <div class="bento-tool-grid">
        <ToolCard
          v-for="(t, i) in recentTools"
          :key="t.slug"
          :tool="t"
          :gradient-index="homeGradientRecent(i)"
        />
      </div>
    </section>

    <!-- 6. 最新上线（小卡 span 3，与分类列表一致） -->
    <section aria-labelledby="home-latest-heading">
      <div class="bento-section-head">
        <span class="bento-section-head__line" />
        <h2 id="home-latest-heading" class="bento-section-head__text">
          最新上线
        </h2>
      </div>
      <div class="bento-tool-grid">
        <ToolCard
          v-for="(t, i) in latest"
          :key="t.slug"
          :tool="t"
          :gradient-index="homeGradientLatest(i)"
        />
      </div>
    </section>
  </div>
</template>
