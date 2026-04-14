<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'
import { usePageMeta } from '@/composables/usePageMeta'
import { useRecentTools } from '@/composables/useRecentTools'
import { getToolBySlug, toolLoaders } from '@/data/tools-registry'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const meta = computed(() => getToolBySlug(slug.value))

const ToolView = shallowRef()
const loadFailed = shallowRef(false)

const { record } = useRecentTools()
const { isFavorite, toggle } = useFavorites()

watch(
  slug,
  async (s) => {
    loadFailed.value = false
    const loader = toolLoaders[s]
    if (!loader) {
      ToolView.value = null
      loadFailed.value = true
      return
    }
    try {
      const m = await loader()
      ToolView.value = m.default
    } catch {
      loadFailed.value = true
      ToolView.value = null
    }
    if (getToolBySlug(s)) record(s)
  },
  { immediate: true },
)

usePageMeta(
  computed(() => ({
    title: meta.value?.name,
    description: meta.value?.summary,
  })),
)
</script>

<template>
  <div>
    <div
      v-if="meta"
      id="tool-actions"
      class="mx-auto flex max-w-5xl flex-wrap items-center justify-end gap-2 px-3 pt-2 sm:px-5"
    >
      <button
        type="button"
        class="bento-surface inline-flex items-center gap-2 rounded-2xl border-0 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-sky-300/50 dark:text-slate-100 dark:ring-white/10 dark:hover:ring-sky-400/30"
        @click="toggle(meta.slug)"
      >
        <span
          :class="isFavorite(meta.slug) ? 'i-carbon-star-filled text-amber-500' : 'i-carbon-star text-slate-400'"
        />
        {{ isFavorite(meta.slug) ? '已收藏' : '收藏' }}
      </button>
    </div>

    <component :is="ToolView" v-if="meta && ToolView && !loadFailed" />
    <div v-else-if="!meta || loadFailed" class="mx-auto max-w-lg px-4 py-24 text-center">
      <div class="bento-surface p-10">
        <h1 class="text-xl font-semibold text-slate-900 dark:text-white">未找到工具</h1>
        <p class="mt-2 text-slate-600 dark:text-slate-400">请从搜索或首页重新选择。</p>
        <RouterLink
          to="/"
          class="mt-6 inline-flex font-medium text-sky-600 hover:underline dark:text-sky-400"
        >
          返回首页
        </RouterLink>
      </div>
    </div>
  </div>
</template>
