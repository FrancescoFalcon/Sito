<template>
  <article class="thread-card">
    <div class="thread-ribbon" />
    <div class="thread-inner">
      <div class="spoiler-wrapper">
        <div
          v-if="isSpoilerHidden"
          class="spoiler-overlay"
        >
          <div class="spoiler-overlay-inner text-center">
            <p class="mb-3">
              This thread is marked as a <strong>spoiler</strong>. Click to reveal its content.
            </p>
            <button
              type="button"
              class="btn btn-warning text-dark"
              @click="revealSpoiler"
            >
              Reveal spoiler
            </button>
          </div>
        </div>
        <div :class="['spoiler-content', { 'is-blurred': isSpoilerHidden }]">
          <header class="thread-header">
            <div class="thread-header-main">
              <span class="thread-icon">☽</span>
              <div>
                <div class="thread-title-row">
                  <h4 class="thread-title">
                    {{ thread.title }}
                  </h4>
                  <span
                    v-if="thread.isSpoiler"
                    class="badge badge-spoiler"
                  >
                    Spoiler
                  </span>
                </div>
                <p class="thread-meta">
                  Posted by <strong>{{ thread.author || 'Anonymous Seer' }}</strong>
                  · {{ formattedCreatedAt }}
                </p>
              </div>
            </div>
            <div class="thread-actions btn-group">
              <button
                type="button"
                :class="['btn btn-sm', hasThreadReaction('like') ? 'btn-success' : 'btn-outline-success']"
                :disabled="isReacting('thread-like')"
                @click="onReactThread('like')"
              >
                👍 {{ thread.likes ?? 0 }}
              </button>
              <button
                type="button"
                :class="['btn btn-sm', hasThreadReaction('dislike') ? 'btn-danger' : 'btn-outline-danger']"
                :disabled="isReacting('thread-dislike')"
                @click="onReactThread('dislike')"
              >
                👎 {{ thread.dislikes ?? 0 }}
              </button>
            </div>
          </header>
          <p class="thread-body-text">
            {{ thread.content }}
          </p>
          <button
            v-if="hasReplies"
            type="button"
            class="thread-toggle"
            @click="toggleReplies"
          >
            {{ showReplies ? 'Hide replies' : 'Show replies' }} ({{ thread.replies.length }})
          </button>
          <transition name="fade">
            <div
              v-if="showReplies"
              class="thread-responses"
            >
              <div
                v-if="thread.replies?.length"
                class="thread-replies"
              >
                <article
                  v-for="reply in thread.replies"
                  :key="reply._id"
                  class="thread-reply"
                >
                  <div class="thread-reply-header">
                    <div>
                      <strong>{{ reply.author || 'Anonymous Seer' }}</strong>
                      <span class="thread-reply-meta">
                        {{ formatDate(reply.createdAt) }}
                      </span>
                    </div>
                    <div class="btn-group btn-group-sm">
                      <button
                        type="button"
                        :class="['btn', hasReplyReaction(reply, 'like') ? 'btn-success' : 'btn-outline-success']"
                        :disabled="isReacting(`reply-${reply._id}-like`)"
                        @click="onReactReply(reply, 'like')"
                      >
                        👍 {{ reply.likes ?? 0 }}
                      </button>
                      <button
                        type="button"
                        :class="['btn', hasReplyReaction(reply, 'dislike') ? 'btn-danger' : 'btn-outline-danger']"
                        :disabled="isReacting(`reply-${reply._id}-dislike`)"
                        @click="onReactReply(reply, 'dislike')"
                      >
                        👎 {{ reply.dislikes ?? 0 }}
                      </button>
                    </div>
                  </div>
                  <p class="thread-reply-body">
                    {{ reply.content }}
                  </p>
                </article>
              </div>
              <p
                v-else
                class="thread-replies-empty"
              >
                No replies yet. Be the first to share a clue.
              </p>
            </div>
          </transition>
          <form
            class="thread-reply-form card bg-dark border-secondary mt-4"
            @submit.prevent="onSubmitReply"
          >
            <div class="card-body">
              <h5 class="card-title card-subheading mb-3">
                Reply to this discussion
              </h5>
              <p class="section-subtitle small mb-2">
                You will reply as <strong>{{ currentUser?.username || 'Explorer' }}</strong>
              </p>
              <div class="row g-3 align-items-end">
                <div class="col-12">
                  <label class="form-label">Content</label>
                  <textarea
                    v-model="replyForm.content"
                    class="form-control"
                    rows="3"
                    required
                  />
                  <small class="form-text">
                    Add new insights or comment on the theory. Keep the conversation respectful.
                  </small>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <small
                  v-if="replyFeedback"
                  :class="replyFeedbackClass"
                >
                  {{ replyFeedback }}
                </small>
                <button
                  type="submit"
                  class="btn btn-warning text-dark"
                  :disabled="isReplying"
                >
                  {{ isReplying ? 'Sending…' : 'Post reply' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useAuth } from '../../stores/auth'
import { reactToThread, reactToThreadReply, replyToThread } from '../../services/api'

const props = defineProps({
  thread: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['updated'])

const showReplies = ref(true)
const replyForm = reactive({
  content: ''
})
const isReplying = ref(false)
const replyFeedback = ref('')
const replyIsError = ref(false)
const activeReactionKey = ref('')
const isSpoilerHidden = ref(Boolean(props.thread.isSpoiler))
const hasReplies = computed(() => Array.isArray(props.thread.replies) && props.thread.replies.length > 0)
const { user } = useAuth()
const currentUser = computed(() => user.value)
const currentUserId = computed(() => currentUser.value?._id || currentUser.value?.id || null)

const formattedCreatedAt = computed(() => formatDate(props.thread.createdAt))

function formatDate (value) {
  if (!value) {
    return 'Just now'
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

function toggleReplies () {
  showReplies.value = !showReplies.value
}

const replyFeedbackClass = computed(() => (replyIsError.value ? 'text-danger' : 'text-success'))

function revealSpoiler () {
  isSpoilerHidden.value = false
}

watch(() => props.thread.slug, () => {
  isSpoilerHidden.value = Boolean(props.thread.isSpoiler)
})

function setReactionKey (key) {
  activeReactionKey.value = key
}

function isReacting (key) {
  return activeReactionKey.value === key
}

function hasThreadReaction (sentiment) {
  if (!currentUserId.value) {
    return false
  }
  const list = sentiment === 'like' ? props.thread.likedBy : props.thread.dislikedBy
  return Array.isArray(list) && list.includes(currentUserId.value)
}

function hasReplyReaction (reply, sentiment) {
  if (!currentUserId.value) {
    return false
  }
  const list = sentiment === 'like' ? reply.likedBy : reply.dislikedBy
  return Array.isArray(list) && list.includes(currentUserId.value)
}

async function onSubmitReply () {
  const content = replyForm.content.trim()

  if (!content) {
    replyIsError.value = true
    replyFeedback.value = 'Please enter a reply before submitting.'
    return
  }

  try {
    isReplying.value = true
    replyFeedback.value = ''
    replyIsError.value = false

    const updated = await replyToThread(props.thread.slug, {
      content
    })

    emit('updated', updated)
    replyFeedback.value = 'Reply posted.'
    replyForm.content = ''
  } catch (error) {
    console.error(error)
    replyIsError.value = true
    replyFeedback.value = 'Error while submitting the reply.'
  } finally {
    isReplying.value = false
  }
}

async function onReactThread (sentiment) {
  const key = `thread-${sentiment}`
  try {
    setReactionKey(key)
    const updated = await reactToThread(props.thread.slug, { sentiment })
    emit('updated', updated)
  } catch (error) {
    console.error(error)
  } finally {
    setReactionKey('')
  }
}

async function onReactReply (reply, sentiment) {
  const key = `reply-${reply._id}-${sentiment}`
  try {
    setReactionKey(key)
    const updated = await reactToThreadReply(props.thread.slug, reply._id, { sentiment })
    emit('updated', updated)
  } catch (error) {
    console.error(error)
  } finally {
    setReactionKey('')
  }
}
</script>

<style scoped>
.thread-card {
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  background: linear-gradient(150deg, rgba(6, 8, 20, 0.97), rgba(16, 11, 30, 0.93));
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 28px 54px rgba(6, 10, 24, 0.45);
  color: #f1f5f9;
  backdrop-filter: blur(14px);
}

.thread-ribbon {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 12% 20%, rgba(169, 120, 12, 0.08), transparent 55%),
    radial-gradient(circle at 78% 12%, rgba(59, 130, 246, 0.14), transparent 60%),
    radial-gradient(circle at 85% 85%, rgba(129, 49, 214, 0.08), transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.thread-inner {
  position: relative;
  z-index: 1;
  padding: clamp(1.6rem, 4vw, 2.4rem);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.thread-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.thread-header-main {
  display: flex;
  align-items: center;
  gap: 1.1rem;
}

.thread-icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1.1rem;
  background: rgba(250, 204, 21, 0.16);
  border: 1px solid rgba(250, 204, 21, 0.3);
  color: #facc15;
  font-size: 1.35rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.thread-title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.thread-title {
  margin: 0;
  font-size: clamp(1.15rem, 2vw, 1.55rem);
  letter-spacing: 0.06em;
  color: rgba(248, 250, 252, 0.95);
}

.thread-meta {
  margin: 0.35rem 0 0;
  font-size: 0.95rem;
  color: rgba(203, 213, 225, 0.82);
}

.thread-actions .btn {
  min-width: 4.2rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.thread-actions .btn-outline-success,
.thread-actions .btn-outline-danger {
  background: rgba(15, 23, 42, 0.45);
  border-color: rgba(148, 163, 184, 0.28);
  color: rgba(226, 232, 240, 0.85);
}

.thread-actions .btn-outline-success:hover,
.thread-actions .btn-outline-danger:hover {
  border-color: rgba(250, 204, 21, 0.55);
  color: #facc15;
}

.thread-body-text {
  margin: 0.9rem 0 0;
  font-size: 1.05rem;
  line-height: 1.75;
  color: rgba(226, 232, 240, 0.9);
}

.thread-toggle {
  align-self: flex-start;
  margin-top: 0.5rem;
  padding: 0.35rem 0.45rem;
  border: none;
  background: none;
  color: #facc15;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.thread-toggle:hover {
  color: #fde68a;
}

.thread-responses {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.thread-replies {
  display: grid;
  gap: 1.1rem;
}

.thread-reply {
  padding: 1.1rem 1.25rem;
  border-radius: 1rem;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.thread-reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.thread-reply-meta {
  display: inline-block;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.8);
}

.thread-reply-body {
  margin: 0.75rem 0 0;
  color: rgba(226, 232, 240, 0.88);
  line-height: 1.6;
}

.thread-replies-empty {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(203, 213, 225, 0.82);
  font-style: italic;
}

.thread-reply-form {
  background: rgba(15, 23, 42, 0.7);
  border-radius: 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.thread-reply-form .card-body {
  padding: 1.75rem;
}

.thread-reply-form .form-label {
  color: rgba(248, 250, 252, 0.8);
}

.thread-reply-form .form-control {
  background: rgba(10, 17, 30, 0.75);
  border-color: rgba(94, 106, 124, 0.35);
  color: rgba(248, 250, 252, 0.92);
}

.thread-reply-form .form-control:focus {
  border-color: rgba(250, 204, 21, 0.55);
  box-shadow: 0 0 0 0.2rem rgba(250, 204, 21, 0.16);
}

.thread-reply-form .form-text {
  color: rgba(203, 213, 225, 0.78);
}

.spoiler-wrapper {
  position: relative;
}

.spoiler-content {
  transition: filter 0.25s ease;
}

.spoiler-content.is-blurred {
  filter: blur(12px);
  pointer-events: none;
  user-select: none;
}

.spoiler-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.25rem;
  text-align: center;
  background: rgba(9, 11, 24, 0.92);
  border-radius: 1.25rem;
  z-index: 2;
}

.spoiler-overlay-inner p {
  color: rgba(226, 232, 240, 0.92);
}

.badge-spoiler {
  background: rgba(250, 204, 21, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(250, 204, 21, 0.4);
  letter-spacing: 0.08em;
  font-size: 0.65rem;
  padding: 0.3rem 0.55rem;
  border-radius: 0.75rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .thread-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .thread-actions {
    width: 100%;
    display: flex;
    gap: 0.75rem;
  }

  .thread-actions .btn {
    flex: 1;
  }
}
</style>
