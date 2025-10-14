<template>
  <article
    class="character-card"
    :class="{ 'character-card--compact': compact }"
  >
    <div
      v-if="imageUrl && !compact"
      class="character-card__ambient"
      :style="ambientStyle"
      aria-hidden="true"
    />

    <div
      class="character-card__vignette"
      aria-hidden="true"
    />

    <template v-if="compact">
      <div
        class="character-card__compact"
        :class="{ 'character-card__compact--empty': !imageUrl }"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          :alt="`Illustration of ${character.name}`"
          loading="lazy"
        >
        <div
          v-else
          class="character-card__placeholder"
        >
          <span class="character-card__placeholder-initials">
            {{ initials }}
          </span>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="character-card__body">
        <figure
          class="character-card__media"
          :class="{ 'character-card__media--empty': !imageUrl }"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            :alt="`Illustration of ${character.name}`"
            loading="lazy"
          >
          <div
            v-else
            class="character-card__placeholder"
          >
            <span class="character-card__placeholder-initials">
              {{ initials }}
            </span>
          </div>
        </figure>

        <div class="character-card__panel">
          <header class="character-card__header">
            <h3
              class="character-card__name"
              :class="nameSizeClass"
            >
              {{ character.name }}
            </h3>
            <p
              v-if="aliasesLabel !== '—'"
              class="character-card__aliases"
            >
              <span class="character-card__aliases-label">Aliases</span>
              <span class="character-card__aliases-value">{{ aliasesLabel }}</span>
            </p>
          </header>

          <div class="character-card__details">
            <ul class="character-card__stats">
              <li v-if="character.age">
                <span class="stat-label">Age</span>
                <span class="stat-value">{{ character.age }}</span>
              </li>
              <li v-if="character.height">
                <span class="stat-label">Height</span>
                <span class="stat-value">{{ character.height }}</span>
              </li>
              <li>
                <span class="stat-label">Pathway</span>
                <span class="stat-value">{{ character.pathway || '—' }}</span>
              </li>
              <li>
                <span class="stat-label">Sequence</span>
                <span class="stat-value">{{ character.sequence || '—' }}</span>
              </li>
            </ul>
          </div>

          <button
            v-if="!compact && canToggleDescription"
            type="button"
            class="character-card__toggle"
            :aria-expanded="isDescriptionActive"
            @click="toggleDescription"
          >
            {{ isDescriptionActive ? 'Mostra meno' : 'Leggi tutto' }}
          </button>
        </div>
      </div>
    </template>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  character: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  },
  isDescriptionActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-description'])

const imageUrl = computed(() => {
  const filename = props.character.image
  if (!filename) {
    return null
  }
  try {
    return new URL(`../../assets/characters/${filename}`, import.meta.url).href
  } catch (error) {
    console.warn(`Character portrait not found: ${filename}`)
    return null
  }
})

const ambientStyle = computed(() => {
  if (!imageUrl.value) {
    return {}
  }
  return {
    backgroundImage: `url(${imageUrl.value})`
  }
})

const initials = computed(() => {
  const parts = props.character.name.split(' ').filter(Boolean)
  return parts.slice(0, 2).map(part => part[0]).join('').toUpperCase()
})

const nameSizeClass = computed(() => {
  const name = props.character.name || ''
  const compactLength = name.replace(/\s+/g, '').length

  if (compactLength > 30) {
    return 'character-card__name--xlong'
  }

  if (compactLength > 22) {
    return 'character-card__name--long'
  }

  return null
})

const aliasesLabel = computed(() => {
  const aliases = props.character.aliases || []
  return aliases.length ? aliases.join(', ') : '—'
})

const hasDescription = computed(() => (props.character.description || '').trim().length > 0)
const canToggleDescription = computed(() => hasDescription.value)

function toggleDescription () {
  if (!canToggleDescription.value) {
    return
  }
  emit('toggle-description', props.character)
}
</script>

<style scoped>
.character-card {
  position: relative;
  width: 100%;
  min-height: clamp(520px, 62vw, 760px);
  padding: clamp(1.7rem, 4vw, 2.6rem);
  border-radius: 32px;
  overflow: hidden;
  color: rgba(248, 249, 252, 0.96);
  background: radial-gradient(circle at 30% 10%, rgba(42, 65, 142, 0.5), rgba(9, 13, 28, 0.95));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 26px 65px rgba(5, 8, 18, 0.55);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.character-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 36px 80px rgba(5, 8, 18, 0.66);
}

.character-card__ambient {
  position: absolute;
  inset: 0;
  background-position: center;
  background-size: cover;
  filter: blur(32px) saturate(1.04) brightness(0.88);
  transform: scale(1.05);
  opacity: 0.72;
}

.character-card__vignette {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(5, 7, 15, 0.05) 12%, rgba(5, 7, 15, 0.46) 68%, rgba(5, 7, 15, 0.72) 96%),
    linear-gradient(125deg, rgba(87, 105, 204, 0.24), transparent 55%);
  pointer-events: none;
}

.character-card__body {
  position: relative;
  width: 100%;
  display: flex;
  align-items: stretch;
  gap: clamp(1.55rem, 3.2vw, 2.35rem);
  z-index: 1;
}

.character-card__media {
  flex: 0 0 clamp(260px, 30vw, 380px);
  position: relative;
  border-radius: 28px;
  padding: clamp(0.7rem, 1.7vw, 1.1rem);
  background: linear-gradient(160deg, rgba(11, 16, 34, 0.9), rgba(17, 22, 46, 0.65));
  box-shadow: 0 18px 40px rgba(5, 8, 18, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  aspect-ratio: 3 / 4;
}

.character-card__media::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 28px;
  border: 1px solid rgba(252, 191, 73, 0.18);
  pointer-events: none;
}

.character-card__media img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: 22px;
  filter: saturate(1.06) contrast(1.05);
}

.character-card__media--empty {
  background: radial-gradient(circle at top, rgba(252, 191, 73, 0.28), rgba(12, 18, 38, 0.92));
}

.character-card__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: rgba(252, 191, 73, 0.85);
  letter-spacing: 0.2em;
  backdrop-filter: blur(2px);
  border-radius: 22px;
}

.character-card__placeholder-initials {
  font-size: clamp(2.4rem, 4.8vw, 3.4rem);
  font-weight: 700;
}

.character-card__panel {
  flex: 1 1 auto;
  min-width: 0;
  padding: clamp(2rem, 4.5vw, 3.1rem) clamp(1.85rem, 4.1vw, 2.7rem);
  border-radius: 26px;
  background: linear-gradient(135deg, rgba(12, 18, 38, 0.56), rgba(12, 18, 38, 0.24));
  border: 1px solid rgba(252, 191, 73, 0.14);
  box-shadow: 0 16px 42px rgba(3, 5, 12, 0.35);
  backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  gap: clamp(1.35rem, 2.7vw, 2.05rem);
}

.character-card__header {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: center;
  text-align: center;
}

.character-card__name {
  margin: 0;
  font-size: clamp(1.15rem, 2.25vw, 1.52rem);
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-shadow: 0 0 24px rgba(252, 191, 73, 0.25);
  line-height: 1.14;
  word-break: keep-all;
  overflow-wrap: normal;
  hyphens: manual;
  display: block;
}

.character-card__name--long {
  font-size: clamp(1.04rem, 2.05vw, 1.38rem);
  letter-spacing: 0.048em;
}

.character-card__name--xlong {
  font-size: clamp(0.94rem, 1.6vw, 1.22rem);
  letter-spacing: 0.032em;
}

.character-card__aliases {
  margin: 0;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  align-items: baseline;
  font-size: 0.95rem;
  color: rgba(248, 249, 252, 0.72);
  justify-content: center;
  text-align: center;
}

.character-card__aliases-label {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(252, 191, 73, 0.6);
}

.character-card__aliases-value {
  color: rgba(248, 249, 252, 0.86);
}

.character-card__details {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: clamp(1.2rem, 2.4vw, 1.9rem);
}

.character-card__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 220px));
  gap: 1rem 1.2rem;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: center;
}

.character-card__stats li {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.95rem 1.15rem;
  border-radius: 18px;
  min-height: 110px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.06), rgba(14, 16, 32, 0.7));
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 22px 45px rgba(5, 8, 18, 0.4);
  align-items: center;
  justify-content: center;
  text-align: center;
}

.stat-label {
  font-size: 0.75rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(252, 191, 73, 0.75);
}

.stat-value {
  font-size: 1.02rem;
  font-weight: 600;
  color: rgba(248, 249, 252, 0.94);
}


.character-card__toggle {
  align-self: flex-start;
  padding: 0.5rem 1.15rem;
  border-radius: 999px;
  border: 1px solid rgba(252, 191, 73, 0.42);
  background: rgba(12, 18, 38, 0.8);
  color: rgba(252, 191, 73, 0.92);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
}

.character-card__toggle:hover {
  background: rgba(252, 191, 73, 0.2);
  border-color: rgba(252, 191, 73, 0.68);
  transform: translateY(-1px);
}

.character-card__toggle:focus-visible {
  outline: 2px solid rgba(252, 191, 73, 0.82);
  outline-offset: 2px;
}

.character-card--compact {
  min-height: 0;
  padding: 0;
  border-radius: 26px;
  background: transparent;
  box-shadow: none;
  transition: none;
}

.character-card--compact:hover {
  transform: none;
  box-shadow: none;
}

.character-card--compact .character-card__vignette,
.character-card--compact .character-card__ambient,
.character-card--compact .character-card__body {
  display: none;
}

.character-card__compact {
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 26px;
  overflow: hidden;
  background: linear-gradient(160deg, rgba(11, 16, 34, 0.92), rgba(17, 22, 46, 0.7));
  box-shadow: 0 16px 36px rgba(5, 8, 18, 0.42);
}

.character-card__compact--empty {
  display: flex;
  align-items: center;
  justify-content: center;
}

.character-card__compact img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.02) contrast(1.05);
  transition: filter 0.35s ease;
}

.character-card--compact:hover .character-card__compact img {
  filter: saturate(1.06) contrast(1.08);
}

@media (max-width: 991.98px) {
  .character-card__body {
    flex-direction: column;
    align-items: center;
    gap: 1.75rem;
  }

  .character-card__media {
    flex: none;
    width: min(300px, 72%);
  }

  .character-card__panel {
    width: 100%;
    padding: 1.8rem 1.6rem 2.1rem;
  }

  .character-card__name {
    font-size: clamp(1.04rem, 2.7vw, 1.38rem);
  }

  .character-card__name--long {
    font-size: clamp(0.96rem, 2.4vw, 1.26rem);
  }

  .character-card__name--xlong {
    font-size: clamp(0.9rem, 2.1vw, 1.14rem);
  }

  .character-card__stats {
    gap: 0.9rem 1rem;
  }

  .character-card__details {
    gap: 1.35rem;
  }
}

@media (max-width: 767.98px) {
  .character-card {
    border-radius: 26px;
    min-height: clamp(480px, 125vw, 640px);
    padding: 1.4rem 1.2rem 1.6rem;
  }

  .character-card__name {
    font-size: clamp(0.9rem, 3.4vw, 1.16rem);
  }

  .character-card__name--long {
    font-size: clamp(0.84rem, 3.2vw, 1.06rem);
  }

  .character-card__name--xlong {
    font-size: clamp(0.78rem, 2.9vw, 0.98rem);
  }

  .character-card__panel {
    padding: 1.5rem 1.3rem 1.95rem;
    gap: 1.3rem;
  }

  .character-card__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem 0.9rem;
  }

  .character-card__stats li {
    min-height: 100px;
    padding: 0.85rem 1rem;
  }
}
</style>
