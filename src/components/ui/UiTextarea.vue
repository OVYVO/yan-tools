<script setup lang="ts">
const model = defineModel<string>({ default: '' })

defineProps<{
  label?: string
  placeholder?: string
  rows?: number
  monospace?: boolean
  readonly?: boolean
}>()
</script>

<template>
  <div class="flex min-w-0 max-w-full flex-col gap-2.5">
    <label v-if="label" class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{
      label
    }}</label>
    <textarea
      v-model="model"
      :rows="rows ?? 10"
      :placeholder="placeholder"
      :readonly="readonly"
      class="box-border min-h-32 max-w-full min-w-0 w-full resize-y break-words rounded-ui-lg border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-elevated)] px-4 py-3.5 text-sm text-[var(--ui-text-primary)] shadow-inner outline-none ring-0 transition duration-200 placeholder:text-slate-400 focus:border-sky-400/50 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)] dark:border-white/10 dark:bg-slate-950/50 dark:placeholder:text-slate-500 dark:focus:border-sky-500/40"
      :class="[monospace !== false ? 'font-mono' : '', readonly ? 'bg-slate-50/90 dark:bg-slate-950/60' : '']"
    />
  </div>
</template>
