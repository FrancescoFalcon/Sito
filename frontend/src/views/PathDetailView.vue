<template>
  <section
    v-if="path"
    class="container py-5"
  >
    <RouterLink
      class="btn btn-sm btn-outline-light mb-4"
      to="/paths"
    >
      ← Back to paths
    </RouterLink>
    <header class="mb-4">
      <h2 class="fw-bold">
        {{ path.name }}
      </h2>
      <p class="text-muted">
        {{ path.description }}
      </p>
      <div class="d-flex flex-wrap gap-2 mt-3">
        <span
          v-for="domain in path.domains"
          :key="domain"
          class="badge bg-warning text-dark"
        >
          {{ domain }}
        </span>
      </div>
    </header>
    <h3 class="h4 mb-3">
      Sequence pyramid
    </h3>
    <SequencePyramid
      :sequences="path.sequences"
    />
  </section>
  <section
    v-else
    class="container py-5"
  >
    <LoreLoader v-if="loading" />
    <LoreError v-else />
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { fetchPath } from '../services/api'
import SequencePyramid from '../components/paths/SequencePyramid.vue'
import LoreLoader from '../components/shared/LoreLoader.vue'
import LoreError from '../components/shared/LoreError.vue'

const route = useRoute()
const path = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    path.value = await fetchPath(route.params.slug)
  } catch (e) {
    path.value = null
  } finally {
    loading.value = false
  }
})
</script>
