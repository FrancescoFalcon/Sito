<template>
  <section class="container py-5">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
      <div>
        <h2 class="section-heading mb-1">
          Community Hub
        </h2>
        <p class="section-subtitle mb-0">
          Start threads, share clues, and support fellow Readers.
        </p>
      </div>
    </div>

    <ThreadComposer @created="onThreadCreated" />

    <LoreLoader
      v-if="loading"
      class="mt-5"
    />
    <LoreError
      v-else-if="error"
      class="mt-5"
    />
    <div
      v-else
      class="d-grid gap-4 mt-5"
    >
      <ThreadItem
        v-for="thread in threads"
        :key="thread._id || thread.slug"
        :thread="thread"
        @updated="onThreadUpdated"
      />
      <p
        v-if="!threads.length"
        class="section-subtitle text-center"
      >
        There are no discussions yet. Start the first thread and share your theory!
      </p>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ThreadComposer from '../components/community/ThreadComposer.vue'
import ThreadItem from '../components/community/ThreadItem.vue'
import LoreLoader from '../components/shared/LoreLoader.vue'
import LoreError from '../components/shared/LoreError.vue'
import { fetchThreads } from '../services/api'

const threads = ref([])
const loading = ref(true)
const error = ref(false)

async function loadThreads () {
  try {
    loading.value = true
    error.value = false
    threads.value = await fetchThreads()
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    loading.value = false
  }
}

function onThreadCreated (thread) {
  threads.value = [thread, ...threads.value]
}

function onThreadUpdated (updatedThread) {
  threads.value = threads.value.map(thread => (
    thread.slug === updatedThread.slug ? updatedThread : thread
  ))
}

onMounted(() => {
  loadThreads()
})
</script>
