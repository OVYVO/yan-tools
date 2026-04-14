<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { usePageMeta } from '@/composables/usePageMeta'
import { useRecentTools } from '@/composables/useRecentTools'
import { getToolBySlug, toolLoaders } from '@/data/tools-registry'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const meta = computed(() => getToolBySlug(slug.value))

const ToolView = shallowRef()
const loadFailed = shallowRef(false)

const { record } = useRecentTools()

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
  <div class="min-w-0 w-full max-w-full">
    <component :is="ToolView" v-if="meta && ToolView && !loadFailed" />
    <div
      v-else-if="!meta || loadFailed"
      class="site-content-width py-24 text-center"
    >
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
