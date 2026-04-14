<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const length = ref(16)
const useUpper = ref(true)
const useLower = ref(true)
const useNum = ref(true)
const useSym = ref(true)
const output = ref('')

const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lower = 'abcdefghijklmnopqrstuvwxyz'
const num = '0123456789'
const sym = '!@#$%^&*()-_=+[]{}'

function charset() {
  let s = ''
  if (useUpper.value) s += upper
  if (useLower.value) s += lower
  if (useNum.value) s += num
  if (useSym.value) s += sym
  return s
}

function run() {
  const cs = charset()
  if (!cs) {
    output.value = ''
    return
  }
  const len = Math.min(128, Math.max(4, length.value))
  const arr = new Uint32Array(len)
  crypto.getRandomValues(arr)
  let pwd = ''
  for (let i = 0; i < len; i++) pwd += cs[arr[i] % cs.length]
  output.value = pwd
}

run()
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <div class="tool-field-grid">
      <label class="flex items-center gap-2 text-sm"><input v-model="useUpper" type="checkbox" /> 大写 A-Z</label>
      <label class="flex items-center gap-2 text-sm"><input v-model="useLower" type="checkbox" /> 小写 a-z</label>
      <label class="flex items-center gap-2 text-sm"><input v-model="useNum" type="checkbox" /> 数字</label>
      <label class="flex items-center gap-2 text-sm"><input v-model="useSym" type="checkbox" /> 符号</label>
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <label class="text-sm">长度</label>
      <input
        v-model.number="length"
        type="number"
        min="4"
        max="128"
        class="w-24 rounded-lg border border-slate-200 px-2 py-1 dark:border-slate-600 dark:bg-slate-900"
      />
      <button type="button" class="bento-btn-primary" @click="run">
        生成
      </button>
    </div>
    <UiTextarea v-model="output" label="密码" :readonly="true" :rows="2" />
    <UiCopyButton v-if="output" :text="output" />
  </ToolPageTemplate>
</template>
