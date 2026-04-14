<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useTheme, type ThemePreference } from '@/composables/useTheme'
import { SITE_NAME } from '@/data/constants'

const route = useRoute()
const { preference, setPreference } = useTheme()

const onToolPage = computed(() => route.name === 'tool')

const themeOptions: { value: ThemePreference; label: string }[] = [
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
  { value: 'system', label: '跟随系统' },
]
</script>

<template>
  <header class="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
    <div
      class="bento-surface mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-3 py-2.5 sm:gap-4 sm:px-5 sm:py-3"
    >
      <RouterLink
        to="/"
        class="group flex min-w-0 items-center gap-2.5 font-semibold tracking-tight text-slate-900 dark:text-white"
      >
        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-inner ring-1 ring-white/20"
        >
          <span class="i-carbon-tools text-lg" />
        </span>
        <span class="truncate text-sm sm:text-base">{{ SITE_NAME }}</span>
      </RouterLink>

      <nav class="hidden items-center gap-0.5 md:flex">
        <RouterLink
          to="/search"
          class="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100/90 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
          active-class="bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300"
        >
          搜索
        </RouterLink>
        <RouterLink
          to="/about"
          class="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100/90 dark:text-slate-300 dark:hover:bg-white/5"
        >
          关于
        </RouterLink>
      </nav>

      <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <RouterLink
          to="/search"
          class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-slate-100/90 dark:text-slate-300 dark:hover:bg-white/5 md:hidden"
          aria-label="搜索"
        >
          <span class="i-carbon-search block text-xl" />
        </RouterLink>

        <a
          v-if="onToolPage"
          href="#tool-actions"
          class="hidden rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100/90 dark:text-slate-300 dark:hover:bg-white/5 sm:inline"
        >
          快捷操作
        </a>

        <div class="relative">
          <select
            :value="preference"
            class="h-10 cursor-pointer appearance-none rounded-xl border-0 bg-slate-100/90 py-0 pl-3 pr-9 text-sm font-medium text-slate-700 shadow-inner ring-1 ring-slate-200/80 transition hover:ring-sky-300/50 dark:bg-slate-800/80 dark:text-slate-200 dark:ring-white/10"
            aria-label="主题"
            @change="setPreference(($event.target as HTMLSelectElement).value as ThemePreference)"
          >
            <option v-for="o in themeOptions" :key="o.value" :value="o.value">
              {{ o.label }}
            </option>
          </select>
          <span
            class="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 i-carbon-chevron-down text-slate-400"
          />
        </div>
      </div>
    </div>
  </header>
</template>
