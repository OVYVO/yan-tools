<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getCategoryById } from '@/data/categories'
import { getRelatedTools } from '@/data/tools-registry'
import type { ToolMeta } from '@/types/tool'
import ToolCard from '@/components/ui/ToolCard.vue'

const props = withDefaults(
  defineProps<{
    meta: ToolMeta
    error?: string | null
    showRelated?: boolean
  }>(),
  { showRelated: true, error: null },
)

const category = computed(() => getCategoryById(props.meta.category))
const related = computed(() => (props.showRelated ? getRelatedTools(props.meta.slug) : []))
</script>

<template>
  <article class="relative mx-auto max-w-5xl px-3 py-6 sm:px-5 sm:py-8">
    <header class="bento-surface overflow-hidden p-6 sm:p-8">
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
      <h1 class="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {{ meta.name }}
      </h1>
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

    <div class="mt-8 space-y-8">
      <slot />
    </div>

    <section v-if="related.length" class="mt-12">
      <div class="bento-section-head mb-5">
        <span class="bento-section-head__line" />
        <span class="bento-section-head__text">相关工具</span>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
        <ToolCard v-for="t in related" :key="t.slug" :tool="t" />
      </div>
    </section>
  </article>
</template>
