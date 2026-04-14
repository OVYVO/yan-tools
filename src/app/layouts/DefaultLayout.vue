<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <div class="bento-page-bg relative">
    <div class="bento-backdrop" aria-hidden="true" />
    <div class="bento-shell flex min-h-screen flex-col">
      <AppHeader />
      <main class="flex-1 pb-12 pt-2 sm:pb-16 sm:pt-4">
        <RouterView />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
