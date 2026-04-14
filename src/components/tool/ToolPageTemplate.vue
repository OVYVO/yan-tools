<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getCategoryById } from '@/data/categories'
import { getRelatedTools } from '@/data/tools-registry'
import { useFavorites } from '@/composables/useFavorites'
import type { ToolMeta } from '@/types/tool'
import ToolCard from '@/components/ui/ToolCard.vue'

const props = withDefaults(
  defineProps<{
    meta: ToolMeta
    error?: string | null
    showRelated?: boolean
    /** 是否在介绍卡片内展示收藏（默认开启） */
    showFavorite?: boolean
  }>(),
  { showRelated: true, error: null, showFavorite: true },
)

const { isFavorite, toggle } = useFavorites()

const category = computed(() => getCategoryById(props.meta.category))
const related = computed(() => (props.showRelated ? getRelatedTools(props.meta.slug) : []))
</script>

<template>
  <article class="site-content-width relative py-6 sm:py-8">
    <header
      id="tool-intro"
      class="bento-surface box-border min-w-0 w-full max-w-full overflow-hidden p-6 sm:p-8"
    >
      <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
        <RouterLink to="/" class="transition hover:text-sky-600 dark:hover:text-sky-400">首页</RouterLink>
        <span class="mx-2 text-slate-300 dark:text-slate-600">/</span>
        <RouterLink
          v-if="category"
          :to="`/category/${category.id}`"
          class="transition hover:text-sky-600 dark:hover:text-sky-400"
        >
          {{ category.name }}
        </RouterLink>
        <span v-else class="text-slate-400">{{ meta.category }}</span>
        <span class="mx-2 text-slate-300 dark:text-slate-600">/</span>
        <span class="text-slate-700 dark:text-slate-200">{{ meta.name }}</span>
      </p>

      <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <h1 class="min-w-0 flex-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {{ meta.name }}
        </h1>
        <button
          v-if="showFavorite"
          type="button"
          class="inline-flex shrink-0 items-center gap-2 self-start rounded-ui-md border border-slate-200/80 bg-slate-50/90 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-0 transition motion-safe:duration-200 hover:border-sky-300/50 hover:bg-sky-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/55 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-100 dark:hover:border-sky-400/30 dark:focus-visible:ring-sky-400/45 sm:mt-1"
          :aria-pressed="isFavorite(meta.slug)"
          :aria-label="isFavorite(meta.slug) ? '取消收藏' : '收藏此工具'"
          @click="toggle(meta.slug)"
        >
          <span
            class="icon-md block"
            :class="
              isFavorite(meta.slug)
                ? 'i-tabler-star-filled text-amber-500'
                : 'i-tabler-star text-slate-400 dark:text-slate-500'
            "
          />
          <span class="hidden sm:inline">{{ isFavorite(meta.slug) ? '已收藏' : '收藏' }}</span>
        </button>
      </div>

      <p class="mt-3 max-w-3xl text-[0.95rem] leading-relaxed text-slate-600 dark:text-slate-300">
        {{ meta.summary }}
      </p>
      <div class="mt-5 flex flex-wrap gap-2">
        <span
          v-for="t in meta.tags"
          :key="t"
          class="rounded-full bg-slate-100/90 px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/70 dark:bg-slate-800/80 dark:text-slate-300 dark:ring-white/5"
        >
          {{ t }}
        </span>
      </div>
    </header>

    <div
      v-if="error"
      class="mt-6 rounded-2xl border border-red-200/90 bg-red-50/95 px-4 py-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/50 dark:text-red-200"
      role="alert"
    >
      {{ error }}
    </div>

    <div class="mt-8 w-full space-y-10">
      <slot />
    </div>

    <section v-if="related.length" class="mt-10 w-full">
      <div class="bento-section-head mb-5">
        <span class="bento-section-head__line" />
        <span class="bento-section-head__text">相关工具</span>
      </div>
      <div class="bento-tool-grid">
        <ToolCard v-for="t in related" :key="t.slug" :tool="t" />
      </div>
    </section>
  </article>
</template>
