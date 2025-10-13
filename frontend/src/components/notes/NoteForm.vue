<template>
  <form
    class="card bg-dark border-secondary"
    @submit.prevent="onSubmit"
  >
    <div class="card-body">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input
          v-model="form.title"
          class="form-control"
          required
        >
      </div>
      <div class="mb-3">
        <label class="form-label">Content</label>
        <textarea
          v-model="form.content"
          rows="4"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Tags (comma separated)</label>
        <input
          v-model="tagsInput"
          class="form-control"
          placeholder="investigation, vision, ritual"
        >
      </div>
      <div class="d-flex justify-content-between align-items-center">
        <small
          v-if="feedback"
          class="text-success"
        >
          {{ feedback }}
        </small>
        <button
          type="submit"
          class="btn btn-warning text-dark"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Saving…' : 'Save note' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { createNote } from '../../services/api'

const emit = defineEmits(['success'])

const form = reactive({
  title: '',
  content: ''
})

const tagsInput = ref('')
const isSubmitting = ref(false)
const feedback = ref('')

async function onSubmit () {
  try {
    isSubmitting.value = true
    feedback.value = ''

    const payload = {
      title: form.title,
      content: form.content,
      tags: tagsInput.value
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean)
    }

    await createNote(payload)
    feedback.value = 'Note saved successfully.'
    emit('success')
    form.title = ''
    form.content = ''
    tagsInput.value = ''
  } catch (error) {
    feedback.value = 'Error while saving the note.'
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
