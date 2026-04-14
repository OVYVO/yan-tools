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
  <div class="flex flex-col gap-2">
    <label v-if="label" class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{
      label
    }}</label>
    <textarea
      v-model="model"
      :rows="rows ?? 10"
      :placeholder="placeholder"
      :readonly="readonly"
      class="min-h-32 w-full resize-y rounded-2xl border border-slate-200/90 bg-white/90 px-4 py-3 text-sm text-slate-800 shadow-inner outline-none ring-0 transition placeholder:text-slate-400 focus:border-sky-400/50 focus:shadow-[0_0_0_3px_rgba(14,165,233,0.12)] dark:border-white/10 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500/40"
      :class="[monospace !== false ? 'font-mono' : '', readonly ? 'bg-slate-50/90 dark:bg-slate-950/60' : '']"
    />
  </div>
</template>
