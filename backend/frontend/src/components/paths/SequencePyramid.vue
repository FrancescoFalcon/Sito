<template>
  <div class="sequence-pyramid">
    <div
      v-for="sequence in orderedSequences"
      :key="sequence.level"
      class="sequence-step"
    >
      <div class="badge bg-warning text-dark mb-2">
        Sequence {{ sequence.level }}
      </div>
      <h5 class="fw-semibold">
        {{ sequence.potionName }}
      </h5>
      <p class="small text-muted mb-1">
        {{ sequence.madnessPrinciple }}
      </p>
      <ul class="small list-unstyled">
        <li
          v-for="ability in sequence.mainAbilities"
          :key="ability"
        >
          • {{ ability }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  sequences: {
    type: Array,
    required: true
  }
})

const orderedSequences = computed(() =>
  [...(Array.isArray(props.sequences) ? props.sequences : [])].sort((a, b) => b.level - a.level)
)
</script>

<style scoped>
.sequence-pyramid {
  display: grid;
  gap: 1.25rem;
}

.sequence-step {
  background: rgba(19, 22, 30, 0.7);
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 190, 0, 0.2);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.35);
}
</style>
