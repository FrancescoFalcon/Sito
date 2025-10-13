<template>
  <div
    id="layout"
    class="layout-shell text-light min-vh-100 d-flex flex-column"
  >
    <SiteHeader />
    <main class="flex-grow-1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
</script>
