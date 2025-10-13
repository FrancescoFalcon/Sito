<template>
  <div class="card bg-gradient border-0 text-light h-100 shadow-sm">
    <div class="card-body">
      <h5 class="card-title">
        {{ deity.name }}
      </h5>
      <p class="fst-italic">
        {{ deity.epithet }}
      </p>
      <p class="small text-warning mb-2">
        Symbol: {{ deity.symbol }}
      </p>
      <ul class="list-unstyled mb-0">
        <li
          v-for="domain in deity.domains"
          :key="domain"
        >
          • {{ domain }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  deity: {
    type: Object,
    required: true
  }
})
</script>
