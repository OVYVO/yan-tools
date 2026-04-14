<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { watchDebounced } from '@vueuse/core'
import { computed } from 'vue'
import ToolCard from '@/components/ui/ToolCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { useSearch } from '@/composables/useSearch'

usePageMeta({
  title: '搜索',
  description: '在本地索引中搜索工具。',
})

const { query, results } = useSearch()
const route = useRoute()
const router = useRouter()

if (typeof route.query.q === 'string') query.value = route.query.q

watchDebounced(
  query,
  (q) => {
    router.replace({ query: q.trim() ? { q: q.trim() } : {} })
  },
  { debounce: 200 },
)

const hasQuery = computed(() => query.value.trim().length > 0)
</script>

<template>
  <div class="relative mx-auto max-w-7xl px-3 sm:px-5">
    <div class="bento-surface mb-10 p-5 sm:p-6">
      <label class="bento-label" for="tool-search">Search</label>
      <div class="relative mt-4">
        <span
          class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 i-carbon-search text-xl text-sky-500/70"
        />
        <input
          id="tool-search"
          v-model="query"
          type="search"
          placeholder="输入名称、标签或关键词…"
          class="w-full rounded-2xl border border-slate-200/90 bg-white/90 py-3.5 pl-12 pr-4 text-slate-800 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-sky-400/50 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)] dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100"
          autocomplete="off"
        />
      </div>
    </div>

    <div v-if="results.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      <ToolCard v-for="t in results" :key="t.slug" :tool="t" />
    </div>
    <EmptyState
      v-else-if="hasQuery"
      title="没有找到匹配的工具"
      hint="试试其它关键词，或从首页按分类浏览。"
    />
    <EmptyState v-else title="输入关键词开始搜索" hint="支持名称、标签与简介的模糊匹配。" />
  </div>
</template>
