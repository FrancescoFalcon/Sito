<template>
  <div
    class="card path-card h-100 border-0 shadow-sm"
    :style="{ borderTopColor: path.associatedColor }"
  >
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">
        {{ path.name }}
      </h5>
      <p class="text-warning small text-uppercase letter-spacing-1 mb-2">
        Domains
      </p>
      <ul class="list-unstyled flex-grow-1">
        <li
          v-for="domain in path.domains"
          :key="domain"
        >
          • {{ domain }}
        </li>
      </ul>
      <RouterLink
        class="btn btn-sm btn-outline-light mt-auto"
        :to="`/paths/${path.slug}`"
      >
        View sequences
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  path: {
    type: Object,
    required: true
  }
})
</script>
