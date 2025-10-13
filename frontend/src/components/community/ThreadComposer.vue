<template>
  <section class="composer-container">
    <form
      v-if="isExpanded"
      ref="composerCard"
      class="composer-card"
      @submit.prevent="onSubmit"
      @keydown.esc.prevent.stop="closeComposer"
    >
      <div class="composer-ribbon" />
      <button
        type="button"
        class="composer-close"
        :disabled="isSubmitting"
        aria-label="Close the thread composer"
        @click.stop.prevent="closeComposer"
      >
        <span aria-hidden="true">×</span>
      </button>
      <div class="composer-header">
        <div>
          <span class="composer-icon">✶</span>
          <div>
            <h3 class="composer-title">
              Start a new discussion
            </h3>
            <p class="composer-meta">
              You will post as <strong>{{ currentUser?.username || 'Explorer' }}</strong>
            </p>
          </div>
        </div>
        <div
          v-if="feedback"
          class="composer-status"
        >
          <small :class="feedbackClass">
            {{ feedback }}
          </small>
        </div>
      </div>
      <div class="composer-body">
        <div class="composer-form">
          <div class="row g-4 align-items-start">
            <div class="col-12">
              <label class="form-label">Title</label>
              <input
                v-model="form.title"
                class="form-control form-control-lg"
                required
                maxlength="120"
              >
              <small class="form-text">
                Summarize the topic in a sentence (max 120 characters).
              </small>
            </div>
            <div class="col-12">
              <label class="form-label">Content</label>
              <textarea
                v-model="form.content"
                class="form-control"
                rows="5"
                required
              />
              <small class="form-text">
                Share details, sources, or questions. Use spoiler tags if needed.
              </small>
            </div>
            <div class="col-12">
              <div class="spoiler-toggle">
                <div class="form-check form-switch">
                  <input
                    :id="spoilerSwitchId"
                    v-model="form.isSpoiler"
                    class="form-check-input"
                    type="checkbox"
                  >
                  <label
                    class="form-check-label"
                    :for="spoilerSwitchId"
                  >
                    Mark as spoiler
                  </label>
                </div>
                <small class="form-text d-block mt-1">
                  Spoiler threads stay blurred until readers choose to reveal them.
                </small>
              </div>
            </div>
          </div>
        </div>
        <aside class="composer-sidebar">
          <h4>Quick tips</h4>
          <ul>
            <li>
              Provide context for your theory or question.
            </li>
            <li>
              Reference sources or chapters when sharing spoilers.
            </li>
            <li>
              Keep a respectful tone toward other readers.
            </li>
            <li>
              Use the spoiler toggle to protect major reveals.
            </li>
          </ul>
          <button
            type="submit"
            class="btn btn-warning text-dark w-100 mt-auto"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Publishing…' : 'Publish thread' }}
          </button>
        </aside>
      </div>
    </form>

    <button
      v-else
      ref="composerToggleRef"
      type="button"
      class="composer-toggle-card"
      @click="openComposer"
    >
      <span class="composer-toggle-icon">✶</span>
      <div class="composer-toggle-copy">
        <span class="composer-toggle-title">Start a new discussion</span>
        <span class="composer-toggle-subtitle">Share a fresh thread with the community</span>
      </div>
      <span class="composer-toggle-action">Open</span>
    </button>
  </section>
</template>

<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { useAuth } from '../../stores/auth'
import { createThread } from '../../services/api'

const emit = defineEmits(['created'])

const form = reactive({
  title: '',
  content: '',
  isSpoiler: false
})

const isExpanded = ref(false)
const isSubmitting = ref(false)
const feedback = ref('')
const isError = ref(false)
const composerCard = ref(null)
const composerToggleRef = ref(null)

const { user } = useAuth()
const currentUser = computed(() => user.value)
const spoilerSwitchId = 'thread-spoiler-toggle'

const feedbackClass = computed(() => (isError.value ? 'text-danger' : 'text-success'))

function openComposer () {
  isExpanded.value = true
  feedback.value = ''
  isError.value = false
  nextTick(() => {
    if (composerCard.value) {
      composerCard.value.querySelector('input, textarea, button, select')?.focus()
    }
  })
}

function resetForm () {
  form.title = ''
  form.content = ''
  form.isSpoiler = false
}

function closeComposer () {
  if (isSubmitting.value) {
    return
  }
  isExpanded.value = false
  feedback.value = ''
  isError.value = false
  nextTick(() => {
    resetForm()
    composerToggleRef.value?.focus()
  })
}

async function onSubmit () {
  try {
    isSubmitting.value = true
    feedback.value = ''
    isError.value = false

    const payload = {
      title: form.title.trim(),
      content: form.content.trim(),
      isSpoiler: form.isSpoiler
    }

    const created = await createThread(payload)
    emit('created', created)

  feedback.value = 'Thread published.'
    resetForm()
  } catch (error) {
    console.error(error)
    isError.value = true
  feedback.value = 'An error occurred while publishing.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.composer-container {
  width: 100%;
  display: block;
}

.composer-toggle-card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: clamp(1.1rem, 4vw, 1.5rem) clamp(1.3rem, 5vw, 1.8rem);
  border-radius: 1.25rem;
  background: rgba(10, 15, 28, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 18px 40px rgba(4, 6, 16, 0.35);
  color: rgba(226, 232, 240, 0.88);
  text-align: left;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.composer-toggle-card:hover,
.composer-toggle-card:focus-visible {
  transform: translateY(-1px);
  border-color: rgba(250, 204, 21, 0.45);
  box-shadow: 0 22px 48px rgba(6, 9, 20, 0.4);
  outline: none;
}

.composer-toggle-icon {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.9rem;
  background: rgba(250, 204, 21, 0.16);
  border: 1px solid rgba(250, 204, 21, 0.28);
  color: #facc15;
  font-size: 1.25rem;
}

.composer-toggle-copy {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.composer-toggle-title {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 0.95rem;
}

.composer-toggle-subtitle {
  font-size: 0.85rem;
  color: rgba(203, 213, 225, 0.75);
}

.composer-toggle-action {
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #facc15;
  font-weight: 600;
}

.composer-card {
  position: relative;
  border-radius: 1.5rem;
  background: linear-gradient(150deg, rgba(6, 8, 20, 0.97), rgba(16, 11, 30, 0.93));
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 30px 60px rgba(6, 7, 18, 0.48);
  overflow: hidden;
  backdrop-filter: blur(14px);
}

.composer-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(13, 18, 32, 0.65);
  color: rgba(226, 232, 240, 0.85);
  font-size: 1.35rem;
  display: grid;
  place-items: center;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  cursor: pointer;
  z-index: 5;
  pointer-events: auto;
}

.composer-close:hover:not(:disabled),
.composer-close:focus-visible {
  border-color: rgba(250, 204, 21, 0.6);
  color: #facc15;
  transform: scale(1.05);
  outline: none;
}

.composer-close:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.composer-ribbon {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 12% 20%, rgba(169, 120, 12, 0.08), transparent 55%),
    radial-gradient(circle at 78% 12%, rgba(59, 130, 246, 0.14), transparent 60%),
    radial-gradient(circle at 85% 85%, rgba(129, 49, 214, 0.08), transparent 50%);
  pointer-events: none;
}

.composer-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 2.25rem 1.25rem;
  padding-right: 3.75rem;
}

.composer-header > div {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.composer-icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  background: rgba(250, 204, 21, 0.18);
  border: 1px solid rgba(250, 204, 21, 0.35);
  font-size: 1.35rem;
  color: #fbbf24;
}

.composer-title {
  font-size: clamp(1.4rem, 2vw, 1.8rem);
  letter-spacing: 0.06em;
  color: #fef3c7;
  margin-bottom: 0.35rem;
}

.composer-meta {
  margin-bottom: 0;
  color: rgba(226, 232, 240, 0.85);
  font-size: 0.95rem;
}

.composer-status small {
  font-weight: 600;
}

.composer-body {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 3fr) minmax(240px, 1.2fr);
  gap: 2.25rem;
  padding: 0 2.25rem 2.25rem;
}

@media (max-width: 992px) {
  .composer-body {
    grid-template-columns: 1fr;
  }

  .composer-sidebar {
    order: -1;
  }
}

.composer-form {
  position: relative;
  z-index: 1;
}

.composer-sidebar {
  position: relative;
  z-index: 1;
  padding: 1.75rem;
  border-radius: 1.25rem;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: rgba(226, 232, 240, 0.92);
}

.composer-sidebar h4 {
  font-size: 1.05rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #facc15;
  margin-bottom: 0.5rem;
}

.composer-sidebar ul {
  padding-left: 1rem;
  margin-bottom: 0;
  display: grid;
  gap: 0.65rem;
  font-size: 0.95rem;
  color: rgba(226, 232, 240, 0.88);
}

.composer-sidebar li::marker {
  color: #facc15;
}

.spoiler-toggle .form-check-label {
  font-weight: 600;
  color: rgba(248, 250, 252, 0.9);
}

.spoiler-toggle .form-check-input {
  cursor: pointer;
}

.form-control,
.form-control:focus,
.form-control-lg {
  background: rgba(15, 23, 42, 0.65);
  border-color: rgba(100, 116, 139, 0.35);
  color: rgba(241, 245, 249, 0.95);
}

.form-control:focus {
  border-color: rgba(250, 204, 21, 0.55);
  box-shadow: 0 0 0 0.2rem rgba(250, 204, 21, 0.12);
}

.form-label {
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: rgba(248, 250, 252, 0.75);
}

.form-text {
  color: rgba(203, 213, 225, 0.82);
}

.btn-warning {
  box-shadow: 0 12px 30px rgba(250, 204, 21, 0.25);
  font-weight: 600;
}

.btn-warning:disabled {
  opacity: 0.7;
  box-shadow: none;
}
</style>
