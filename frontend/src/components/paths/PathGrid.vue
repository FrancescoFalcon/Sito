<template>
  <div class="row g-4">
    <div
      v-for="path in paths"
      :key="path._id || path.slug"
      class="col-12 col-sm-6 col-lg-4"
    >
      <PathCard :path="path" />
    </div>
  </div>
</template>

<script setup>
import PathCard from './PathCard.vue'

defineProps({
  paths: {
    type: Array,
    required: true
  }
})
</script>
