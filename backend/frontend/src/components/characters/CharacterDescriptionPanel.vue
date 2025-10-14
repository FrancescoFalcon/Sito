<template>
  <Teleport to="body">
    <Transition name="character-description-panel">
      <aside
        v-if="visible && character"
        class="character-description-panel"
        role="dialog"
        :aria-modal="true"
        :aria-labelledby="headingId"
      >
        <header class="character-description-panel__header">
          <div class="character-description-panel__meta">
            <h4 :id="headingId">
              Approfondimenti
            </h4>
            <span class="character-description-panel__name">{{ character.name }}</span>
          </div>
          <button
            type="button"
            class="character-description-panel__close"
            aria-label="Chiudi approfondimenti"
            @click="close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </header>

        <div class="character-description-panel__content">
          <p
            v-for="(paragraph, index) in descriptionParagraphs"
            :key="`desc-${index}`"
          >
            {{ paragraph }}
          </p>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  character: {
    type: Object,
    default: null
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const headingId = computed(() => {
  if (!props.character) {
    return 'character-description-panel-title'
  }

  const slugLike = props.character.slug || props.character._id || props.character.name || 'character'
  return `character-description-${String(slugLike)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}`
})

const descriptionParagraphs = computed(() => {
  if (!props.character || !props.character.description) {
    return []
  }
  return props.character.description.trim().split(/\n+/).filter(Boolean)
})

function close () {
  emit('close')
}

function handleKeydown (event) {
  if (event.key === 'Escape') {
    close()
  }
}

watch(
  () => props.visible,
  visible => {
    if (typeof window === 'undefined') {
      return
    }

    window[visible ? 'addEventListener' : 'removeEventListener']('keydown', handleKeydown)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
.character-description-panel-enter-active,
.character-description-panel-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.character-description-panel-enter-from,
.character-description-panel-leave-to {
  opacity: 0;
  transform: translate(16px, -50%);
}

.character-description-panel {
  position: fixed;
  top: 50%;
  right: clamp(1.2rem, 3.2vw, 2.8rem);
  transform: translateY(-50%);
  width: clamp(340px, 32vw, 440px);
  max-width: min(94vw, 440px);
  max-height: min(90vh, 720px);
  padding: clamp(1.75rem, 3.4vw, 2.45rem);
  border-radius: 24px;
  background: linear-gradient(138deg, rgba(10, 14, 32, 0.96), rgba(16, 22, 44, 0.7));
  border: 1px solid rgba(252, 191, 73, 0.22);
  box-shadow: 0 24px 52px rgba(3, 5, 12, 0.55);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 1.8vw, 1.6rem);
  color: rgba(248, 249, 252, 0.92);
  overflow: hidden;
  z-index: 1400;
}

.character-description-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.2rem;
}

.character-description-panel__meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.character-description-panel__meta h4 {
  margin: 0;
  font-size: 0.82rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(252, 191, 73, 0.78);
}

.character-description-panel__name {
  font-size: 1.12rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.character-description-panel__close {
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(252, 191, 73, 0.85);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 1.4rem;
  font-weight: 300;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}

.character-description-panel__close:hover {
  background: rgba(252, 191, 73, 0.22);
  transform: scale(1.05);
}

.character-description-panel__close:focus-visible {
  outline: 2px solid rgba(252, 191, 73, 0.75);
  outline-offset: 2px;
}

.character-description-panel__content {
  flex: 1 1 auto;
  overflow-y: auto;
  padding-right: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: clamp(0.8rem, 1.4vw, 1.15rem);
  font-size: 0.98rem;
  line-height: 1.75;
  color: rgba(248, 249, 252, 0.86);
}

.character-description-panel__content p {
  margin: 0;
}

@media (max-width: 991.98px) {
  .character-description-panel {
    top: auto;
    bottom: clamp(1.2rem, 4vw, 2rem);
    right: 50%;
    transform: translate(50%, 0);
    width: min(600px, 92vw);
    max-height: 78vh;
  }
}

@media (max-width: 575.98px) {
  .character-description-panel {
    width: min(520px, 95vw);
    padding: 1.55rem 1.25rem 1.9rem;
    border-radius: 22px;
  }
}
</style>
