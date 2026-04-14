<script setup lang="ts">
defineProps<{
  title: string
  hint?: string
}>()
</script>

<template>
  <div
    class="bento-surface flex min-h-[120px] flex-col items-center justify-center rounded-ui-lg px-6 py-16 text-center sm:px-10 sm:py-20"
  >
    <span class="i-tabler-package mb-4 text-5xl text-sky-400/40 dark:text-sky-500/30" />
    <p class="text-base font-semibold tracking-tight text-slate-800 dark:text-slate-100">{{ title }}</p>
    <p v-if="hint" class="mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
      {{ hint }}
    </p>
    <slot />
  </div>
</template>
