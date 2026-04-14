<script setup lang="ts">
import CryptoJS from 'crypto-js'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ToolPageTemplate from '@/components/tool/ToolPageTemplate.vue'
import UiCopyButton from '@/components/ui/UiCopyButton.vue'
import UiTextarea from '@/components/ui/UiTextarea.vue'
import { getToolBySlug } from '@/data/tools-registry'

const route = useRoute()
const meta = computed(() => getToolBySlug(route.params.slug as string)!)

const input = ref('hello')
const md5 = ref('')
const sha1 = ref('')
const sha256 = ref('')

function run() {
  const t = input.value
  md5.value = CryptoJS.MD5(t).toString()
  sha1.value = CryptoJS.SHA1(t).toString()
  sha256.value = CryptoJS.SHA256(t).toString()
}

watch(input, run, { immediate: true })
</script>

<template>
  <ToolPageTemplate :meta="meta">
    <UiTextarea v-model="input" label="输入文本" />
    <div class="space-y-3">
      <div>
        <p class="text-sm font-medium text-slate-600 dark:text-slate-300">MD5</p>
        <code class="mt-1 block break-all rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-900">{{ md5 }}</code>
        <UiCopyButton class="mt-2" :text="md5" />
      </div>
      <div>
        <p class="text-sm font-medium text-slate-600 dark:text-slate-300">SHA1</p>
        <code class="mt-1 block break-all rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-900">{{ sha1 }}</code>
        <UiCopyButton class="mt-2" :text="sha1" />
      </div>
      <div>
        <p class="text-sm font-medium text-slate-600 dark:text-slate-300">SHA256</p>
        <code class="mt-1 block break-all rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-900">{{ sha256 }}</code>
        <UiCopyButton class="mt-2" :text="sha256" />
      </div>
    </div>
    <button type="button" class="bento-btn-primary" @click="run">
      重新计算
    </button>
  </ToolPageTemplate>
</template>
