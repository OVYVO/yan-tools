<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import ParticleBackdrop from '@/components/layout/ParticleBackdrop.vue'
</script>

<template>
  <div class="bento-page-bg relative">
    <div class="bento-backdrop" aria-hidden="true" />
    <ParticleBackdrop />
    <div class="bento-shell flex min-h-screen min-w-0 flex-col">
      <AppHeader />
      <main class="min-w-0 w-full max-w-full flex-1 pb-12 pt-2 sm:pb-16 sm:pt-4">
        <RouterView />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
