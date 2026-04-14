<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ToolCard from '@/components/ui/ToolCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { usePageMeta } from '@/composables/usePageMeta'
import { getCategoryById } from '@/data/categories'
import { getToolsByCategory } from '@/data/tools-registry'

const route = useRoute()
const categoryId = computed(() => route.params.category as string)
const category = computed(() => getCategoryById(categoryId.value))

const sortBy = ref<'default' | 'name'>('default')
const tagFilter = ref<string | null>(null)

const rawTools = computed(() => getToolsByCategory(categoryId.value))

const allTags = computed(() => {
  const s = new Set<string>()
  for (const t of rawTools.value) t.tags.forEach((x) => s.add(x))
  return [...s].sort()
})

const tools = computed(() => {
  let list = rawTools.value
  if (tagFilter.value) list = list.filter((t) => t.tags.includes(tagFilter.value!))
  if (sortBy.value === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans'))
  return list
})

usePageMeta(
  computed(() => ({
    title: category.value ? `分类：${category.value.name}` : '分类',
    description: category.value?.description ?? '',
  })),
)
</script>

<template>
  <div class="bento-container">
    <template v-if="category">
      <header class="bento-surface mb-8 box-border min-w-0 w-full max-w-full overflow-x-clip p-6 sm:p-8">
        <div class="flex items-start gap-4">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-ui-lg bg-gradient-to-br from-sky-500/20 to-indigo-500/10 text-sky-600 ring-1 ring-sky-500/25 dark:text-sky-300"
          >
            <span class="i-tabler-layout-grid text-2xl" />
          </div>
          <div>
            <p class="bento-label">Category</p>
            <h1 class="mt-2 text-2xl font-bold tracking-tight text-[var(--ui-text-primary)] sm:text-3xl">
              {{ category.name }}
            </h1>
            <p class="text-body mt-2 max-w-2xl">
              {{ category.description }}
            </p>
          </div>
        </div>
      </header>

      <div
        class="bento-surface mb-8 flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5"
      >
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">排序</span>
          <select
            v-model="sortBy"
            class="h-10 rounded-ui-md border-0 bg-slate-100/90 px-3 text-sm font-medium text-slate-800 shadow-inner ring-1 ring-slate-200/80 dark:bg-slate-800/80 dark:text-slate-100 dark:ring-white/10"
          >
            <option value="default">默认</option>
            <option value="name">名称</option>
          </select>
        </div>
        <div v-if="allTags.length" class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">标签</span>
          <button
            type="button"
            class="rounded-full px-3.5 py-1.5 text-xs font-semibold transition"
            :class="
              !tagFilter
                ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/25'
                : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            "
            @click="tagFilter = null"
          >
            全部
          </button>
          <button
            v-for="tg in allTags"
            :key="tg"
            type="button"
            class="rounded-full px-3.5 py-1.5 text-xs font-semibold transition"
            :class="
              tagFilter === tg
                ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/25'
                : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            "
            @click="tagFilter = tg"
          >
            {{ tg }}
          </button>
        </div>
      </div>

      <div v-if="tools.length" class="bento-tool-grid">
        <ToolCard v-for="t in tools" :key="t.slug" :tool="t" />
      </div>
      <EmptyState v-else title="该标签下暂无工具" hint="请更换标签筛选" />
    </template>
    <EmptyState v-else title="分类不存在" hint="请从首页选择分类">
      <RouterLink to="/" class="mt-6 font-medium text-sky-600 hover:underline dark:text-sky-400">返回首页</RouterLink>
    </EmptyState>
  </div>
</template>
