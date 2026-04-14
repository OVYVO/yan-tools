<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { bentoGradientClass, bentoGradientClassByIndex } from '@/utils/bentoGradient'
import type { ToolMeta } from '@/types/tool'

const props = withDefaults(
  defineProps<{
    tool: ToolMeta
    /** 首页等：按列表顺序传入，与全页顺序渐变对齐；不传则按 slug 哈希 */
    gradientIndex?: number
  }>(),
  { gradientIndex: undefined },
)

const gradClass = computed(() =>
  props.gradientIndex !== undefined
    ? bentoGradientClassByIndex(props.gradientIndex)
    : bentoGradientClass(props.tool.slug),
)
</script>

<template>
  <RouterLink
    :to="`/tools/${tool.slug}`"
    class="group tool-card"
    :class="gradClass"
  >
    <div class="relative z-[2] flex items-start justify-between gap-3">
      <h3
        class="line-clamp-2 min-w-0 flex-1 text-base font-semibold leading-snug text-[var(--ui-text-primary)] transition-colors duration-200 group-hover:text-sky-700 dark:group-hover:text-sky-300"
      >
        {{ tool.name }}
      </h3>
      <span
        v-if="tool.featured"
        class="shrink-0 rounded-full bg-gradient-to-r from-amber-200/90 to-orange-200/80 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-amber-900 dark:from-amber-500/30 dark:to-orange-500/25 dark:text-amber-100"
      >
        精选
      </span>
    </div>
    <p class="text-caption relative z-[2] mt-2 line-clamp-2 text-[13px] leading-relaxed">
      {{ tool.summary }}
    </p>
    <div class="relative z-[2] mt-3 flex flex-wrap gap-2">
      <span
        v-for="tag in tool.tags"
        :key="tag"
        class="rounded-ui-sm bg-slate-100/90 px-1.5 py-0.5 text-[0.65rem] font-medium text-slate-600 ring-1 ring-slate-200/60 dark:bg-slate-800/80 dark:text-slate-300 dark:ring-white/5"
      >
        {{ tag }}
      </span>
    </div>
  </RouterLink>
</template>
