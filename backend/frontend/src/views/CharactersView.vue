<template>
  <section class="characters-page py-5">
    <div class="container">
      <LoreLoader v-if="loading" />
      <LoreError v-else-if="error" />

      <div
        v-else-if="!groupedCharacters.length"
        class="empty-state"
      >
        <p>Nessun personaggio disponibile al momento.</p>
      </div>

      <div v-else>
        <nav
          class="category-nav"
          aria-label="Character groups"
        >
          <button
            v-for="group in groupedCharacters"
            :key="`nav-${group.name}`"
            type="button"
            class="category-chip"
            @click="scrollToCategory(group.name)"
          >
            <span>{{ group.name }}</span>
            <small>{{ group.items.length }}</small>
          </button>
        </nav>

        <section
          v-for="group in groupedCharacters"
          :id="sectionId(group.name)"
          :key="group.name"
          class="group-section"
        >
          <header class="group-header">
            <div class="category-indicator" />
            <div>
              <h2 class="group-title">
                {{ group.name }}
              </h2>
            </div>
          </header>

          <div class="carousel-wrapper">
            <button
              class="carousel-nav carousel-nav--prev"
              type="button"
              :disabled="!canNavigate(group)"
              :aria-label="`Personaggio precedente per ${group.name}`"
              @click="showPrevious(group.name)"
              @keyup.enter.prevent="showPrevious(group.name)"
              @keyup.space.prevent="showPrevious(group.name)"
            >
              <span aria-hidden="true">&#10094;</span>
            </button>

            <div class="carousel-stage">
              <div
                class="carousel-track"
                :class="[
                  `is-${transitionDirection}`,
                  { 'is-transitioning': isTransitioning }
                ]"
              >
                <div
                  v-if="leftCharacter(group)"
                  :key="`left-${characterKey(leftCharacter(group), group.name)}`"
                  class="carousel-card carousel-card--side carousel-card--left"
                  role="button"
                  tabindex="0"
                  @click="showPrevious(group.name)"
                  @keyup.enter.prevent="showPrevious(group.name)"
                  @keyup.space.prevent="showPrevious(group.name)"
                >
                  <CharacterCard
                    :character="leftCharacter(group)"
                    compact
                  />
                </div>

                <div
                  v-if="centerCharacter(group)"
                  :key="`center-${characterKey(centerCharacter(group), group.name)}`"
                  class="carousel-card carousel-card--center"
                >
                  <CharacterCard
                    :character="centerCharacter(group)"
                    :is-description-active="isCharacterSelected(centerCharacter(group))"
                    @toggle-description="handleDescriptionToggle"
                  />
                </div>

                <div
                  v-if="rightCharacter(group)"
                  :key="`right-${characterKey(rightCharacter(group), group.name)}`"
                  class="carousel-card carousel-card--side carousel-card--right"
                  role="button"
                  tabindex="0"
                  @click="showNext(group.name)"
                  @keyup.enter.prevent="showNext(group.name)"
                  @keyup.space.prevent="showNext(group.name)"
                >
                  <CharacterCard
                    :character="rightCharacter(group)"
                    compact
                  />
                </div>
              </div>
            </div>

            <button
              class="carousel-nav carousel-nav--next"
              type="button"
              :disabled="!canNavigate(group)"
              :aria-label="`Personaggio successivo per ${group.name}`"
              @click="showNext(group.name)"
              @keyup.enter.prevent="showNext(group.name)"
              @keyup.space.prevent="showNext(group.name)"
            >
              <span aria-hidden="true">&#10095;</span>
            </button>

            <footer class="carousel-meta">
              <span class="carousel-index">{{ indexDisplay(group) }}</span>
            </footer>
          </div>
        </section>
      </div>

      <CharacterDescriptionPanel
        :character="selectedCharacter"
        :visible="!!selectedCharacter"
        @close="closeDescriptionPanel"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import CharacterCard from '../components/characters/CharacterCard.vue'
import CharacterDescriptionPanel from '../components/characters/CharacterDescriptionPanel.vue'
import LoreLoader from '../components/shared/LoreLoader.vue'
import LoreError from '../components/shared/LoreError.vue'
import { fetchCharacters } from '../services/api'

const characters = ref([])
const loading = ref(true)
const error = ref(false)
const transitionDirection = ref('next')
const isTransitioning = ref(false)
const selectedCharacter = ref(null)
let transitionTimer = null

const LAYOUT_SKIN_CLASS = 'layout-shell--characters'

function setLayoutSkin (enabled) {
  const layoutEl = typeof document !== 'undefined' ? document.getElementById('layout') : null
  if (!layoutEl) {
    return
  }

  layoutEl.classList[enabled ? 'add' : 'remove'](LAYOUT_SKIN_CLASS)
}

const CATEGORY_ORDER = ['Tarot Club Members', 'Relevant Characters', 'Villains', 'Gods', 'Outer Gods']

const groupedCharacters = computed(() => {
  const primaryGroups = CATEGORY_ORDER
    .map(name => ({
      name,
      items: characters.value
        .filter(character => character.category === name)
        .slice()
        .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    }))
    .filter(group => group.items.length > 0)

  const remainingCategories = [...new Set(
    characters.value
      .map(character => character.category)
      .filter(category => category && !CATEGORY_ORDER.includes(category))
  )].sort()

  const fallbackGroups = remainingCategories.map(name => ({
    name,
    items: characters.value
      .filter(character => character.category === name)
      .slice()
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
  }))

  return [...primaryGroups, ...fallbackGroups]
})

const groupIndices = ref({})

watch(groupedCharacters, groups => {
  const current = groupIndices.value
  const next = {}

  groups.forEach(group => {
    const length = group.items.length
    if (!length) {
      return
    }

    const existing = current[group.name] ?? 0
    const normalized = ((existing % length) + length) % length
    next[group.name] = normalized
  })

  groupIndices.value = next
}, { immediate: true })

watch(characters, list => {
  if (!selectedCharacter.value) {
    return
  }

  const exists = list.some(item => characterKey(item, 'candidate') === characterKey(selectedCharacter.value, 'selected'))

  if (!exists) {
    closeDescriptionPanel()
  }
})

const sectionId = name => name
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-')

function characterKey (character, fallback) {
  if (!character) {
    return fallback
  }
  return character._id || character.slug || character.name || fallback
}

function isCharacterSelected (character) {
  if (!character || !selectedCharacter.value) {
    return false
  }

  return characterKey(character, 'candidate') === characterKey(selectedCharacter.value, 'selected')
}

function closeDescriptionPanel () {
  selectedCharacter.value = null
}

function handleDescriptionToggle (character) {
  if (!character) {
    closeDescriptionPanel()
    return
  }

  if (isCharacterSelected(character)) {
    closeDescriptionPanel()
  } else {
    selectedCharacter.value = character
  }
}

function scrollToCategory (name) {
  const id = sectionId(name)
  const el = typeof window !== 'undefined' ? document.getElementById(id) : null
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function getGroupItems (name) {
  const group = groupedCharacters.value.find(item => item.name === name)
  return group ? group.items : []
}

function setCurrentIndex (name, index, length = getGroupItems(name).length) {
  if (!length) {
    return
  }

  const normalized = ((index % length) + length) % length
  groupIndices.value = {
    ...groupIndices.value,
    [name]: normalized
  }
}

function getCurrentIndex (name) {
  if (!(name in groupIndices.value)) {
    const length = getGroupItems(name).length
    setCurrentIndex(name, 0, length || 1)
  }
  return groupIndices.value[name] ?? 0
}

function showPrevious (name) {
  const items = getGroupItems(name)
  if (items.length <= 1) {
    return
  }

  closeDescriptionPanel()

  transitionDirection.value = 'prev'
  const current = getCurrentIndex(name)
  setCurrentIndex(name, current - 1, items.length)
  triggerTransition()
}

function showNext (name) {
  const items = getGroupItems(name)
  if (items.length <= 1) {
    return
  }

  closeDescriptionPanel()

  transitionDirection.value = 'next'
  const current = getCurrentIndex(name)
  setCurrentIndex(name, current + 1, items.length)
  triggerTransition()
}

function centerCharacter (group) {
  const items = group.items
  if (!items.length) {
    return null
  }

  const index = getCurrentIndex(group.name) % items.length
  return items[index]
}

function leftCharacter (group) {
  const items = group.items
  if (items.length <= 1) {
    return null
  }

  const index = getCurrentIndex(group.name)
  return items[(index - 1 + items.length) % items.length]
}

function rightCharacter (group) {
  const items = group.items
  if (items.length <= 1) {
    return null
  }

  const index = getCurrentIndex(group.name)
  return items[(index + 1) % items.length]
}

function triggerTransition () {
  if (transitionTimer) {
    clearTimeout(transitionTimer)
    transitionTimer = null
  }

  const activate = () => {
    isTransitioning.value = true
    transitionTimer = setTimeout(() => {
      isTransitioning.value = false
      transitionTimer = null
    }, 550)
  }

  isTransitioning.value = false

  if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(activate)
    })
  } else {
    activate()
  }
}

function canNavigate (group) {
  return group.items.length > 1
}

function indexDisplay (group) {
  const total = group.items.length
  if (!total) {
    return '—'
  }

  const current = getCurrentIndex(group.name) % total
  return `${String(current + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
}

onMounted(async () => {
  setLayoutSkin(true)

  try {
    characters.value = await fetchCharacters()
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  setLayoutSkin(false)
  closeDescriptionPanel()

  if (transitionTimer) {
    clearTimeout(transitionTimer)
  }
})
</script>

<style scoped>
.characters-page {
  position: relative;
  min-height: 100vh;
  background: transparent;
  overflow: hidden;
}

.characters-page::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse at 20% 25%, rgba(122, 149, 255, 0.22), transparent 60%),
    radial-gradient(ellipse at 82% 30%, rgba(252, 191, 73, 0.18), transparent 62%),
    linear-gradient(180deg, rgba(6, 8, 18, 0.15) 0%, rgba(6, 8, 18, 0.88) 82%);
  mix-blend-mode: color-dodge;
  opacity: 0.85;
}

.characters-page .container {
  position: relative;
  z-index: 1;
}

.category-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-bottom: 3rem;
  justify-content: center;
}

.category-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(252, 191, 73, 0.35);
  background: rgba(12, 16, 30, 0.55);
  color: rgba(248, 249, 252, 0.9);
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
  backdrop-filter: blur(6px);
}

.category-chip small {
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: rgba(252, 191, 73, 0.2);
  color: rgba(252, 191, 73, 0.95);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
}

.category-chip:hover {
  transform: translateY(-2px);
  background: rgba(252, 191, 73, 0.18);
  border-color: rgba(252, 191, 73, 0.55);
}

.group-section {
  margin-bottom: 4.75rem;
  position: relative;
}

.group-section::before {
  content: '';
  position: absolute;
  inset: -4rem 5% -3rem 5%;
  background: radial-gradient(circle at 50% 0%, rgba(84, 110, 242, 0.16), transparent 70%);
  filter: blur(60px);
  opacity: 0.8;
  z-index: 0;
  pointer-events: none;
}


.group-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.85rem;
  margin-bottom: 2.25rem;
  position: relative;
  z-index: 1;
}

.group-title {
  font-size: 1.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(252, 191, 73, 0.92);
  margin: 0;
}

.category-indicator {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, #f7b733, #fc4a1a);
  flex-shrink: 0;
}

.empty-state {
  padding: 4rem 2rem;
  text-align: center;
  color: rgba(248, 249, 252, 0.7);
  background: rgba(12, 16, 30, 0.55);
  border-radius: 20px;
  border: 1px solid rgba(252, 191, 73, 0.14);
}

.carousel-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 1;
}

.carousel-stage {
  position: relative;
  width: min(100%, 1080px);
  min-height: clamp(460px, 54vw, 720px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.35rem 0;
  border-radius: 36px;
}

.carousel-card {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.45s ease, opacity 0.45s ease, filter 0.45s ease;
  --card-width: clamp(420px, 60vw, 720px);
  --card-min-height: clamp(520px, 72vw, 780px);
}

.carousel-card :deep(.character-card) {
  width: var(--card-width);
  min-height: var(--card-min-height);
  max-width: 780px;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  background: linear-gradient(180deg, rgba(14, 16, 34, 0.92), rgba(8, 10, 24, 0.96));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.carousel-card--center {
  z-index: 3;
  transform: scale(1);
}

.carousel-card--side {
  position: absolute;
  top: 50%;
  z-index: 2;
  opacity: 1;
  cursor: pointer;
  transform: translateY(-50%) scale(0.95);
  --card-width: clamp(340px, 48vw, 520px);
  --card-min-height: clamp(420px, 64vw, 600px);
}

.carousel-card--side :deep(.character-card) {
  filter: saturate(1.05) brightness(1.1);
  transform: translateZ(0);
}

.carousel-card--side :deep(.character-card--compact) {
  min-height: auto;
  background: linear-gradient(160deg, rgba(12, 16, 36, 0.78), rgba(24, 30, 68, 0.52));
  border: 1px solid rgba(252, 191, 73, 0.28);
  box-shadow: 0 26px 65px rgba(5, 6, 18, 0.5);
  overflow: hidden;
}

.carousel-card--side :deep(.character-card--compact img) {
  filter: saturate(1.12) contrast(1.08);
  transform: scale(1.02);
  transition: transform 0.35s ease, filter 0.35s ease;
}

.carousel-card--side:hover :deep(.character-card--compact img) {
  transform: scale(1.06);
  filter: saturate(1.18) contrast(1.12);
}

.carousel-card--left {
  transform: translateX(calc(-30% - clamp(28px, 4.2vw, 90px))) translateY(-50%) scale(0.95);
}

.carousel-card--right {
  transform: translateX(calc(30% + clamp(28px, 4.2vw, 90px))) translateY(-50%) scale(0.95);
}

.carousel-card--side:hover {
  opacity: 1;
}

.carousel-track {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
}

.carousel-track.is-transitioning.is-next {
  animation: carousel-track-next 0.55s ease forwards;
}

.carousel-track.is-transitioning.is-prev {
  animation: carousel-track-prev 0.55s ease forwards;
}

.carousel-track.is-transitioning.is-next .carousel-card--center :deep(.character-card),
.carousel-track.is-transitioning.is-prev .carousel-card--center :deep(.character-card) {
  animation-duration: 0.55s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
}

.carousel-track.is-transitioning.is-next .carousel-card--center :deep(.character-card) {
  animation-name: carousel-center-next;
}

.carousel-track.is-transitioning.is-prev .carousel-card--center :deep(.character-card) {
  animation-name: carousel-center-prev;
}

.carousel-track.is-transitioning .carousel-card--side :deep(.character-card) {
  animation: carousel-side-fade 0.55s ease forwards;
}
.carousel-track.is-transitioning .carousel-card--side :deep(.character-card) {
  animation: carousel-side-fade 0.55s ease forwards;
}

@keyframes carousel-track-next {
  0% {
    transform: translateX(38%);
  }
  60% {
    transform: translateX(-6%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes carousel-track-prev {
  0% {
    transform: translateX(-38%);
  }
  60% {
    transform: translateX(6%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes carousel-center-next {
  0% {
    opacity: 0.35;
    transform: translateX(36%) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes carousel-center-prev {
  0% {
    opacity: 0.35;
    transform: translateX(-36%) scale(0.92);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes carousel-side-fade {
  0% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.92;
  }
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 54px;
  height: 54px;
  border-radius: 999px;
  border: 1px solid rgba(252, 191, 73, 0.55);
  background: rgba(14, 18, 34, 0.7);
  color: rgba(252, 191, 73, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 18px 40px rgba(8, 10, 22, 0.4);
}

.carousel-nav:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.carousel-nav:not(:disabled):hover {
  background: rgba(252, 191, 73, 0.28);
  transform: translateY(-50%) scale(1.05);
}

.carousel-nav--prev {
  left: clamp(0.5rem, 4vw, 4rem);
}

.carousel-nav--next {
  right: clamp(0.5rem, 4vw, 4rem);
}

.carousel-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  background: rgba(12, 16, 28, 0.68);
  border: 1px solid rgba(252, 191, 73, 0.28);
  box-shadow: 0 20px 45px rgba(6, 8, 20, 0.45);
  backdrop-filter: blur(10px);
  letter-spacing: 0.08em;
  opacity: 0.9;
}

.carousel-index {
  font-weight: 700;
}

@media (max-width: 991.98px) {
  .carousel-stage {
    min-height: clamp(420px, 68vw, 640px);
    padding: 1.1rem 0;
  }

  .carousel-card--side {
    transform: translateY(-50%) scale(0.9);
  }

  .carousel-card--left {
    transform: translateX(calc(-24% - clamp(18px, 3.6vw, 58px))) translateY(-50%) scale(0.9);
  }

  .carousel-card--right {
    transform: translateX(calc(24% + clamp(18px, 3.6vw, 58px))) translateY(-50%) scale(0.9);
  }
}

@media (max-width: 575.98px) {
  .group-header {
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    gap: 0.6rem;
    margin-bottom: 1.5rem;
  }

  .category-indicator {
    flex-shrink: 0;
    width: 12px;
    height: 12px;
  }

  .carousel-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-areas:
      "stage stage"
      "prev next"
      "meta meta";
    gap: 1.25rem;
  }

  .carousel-stage {
    grid-area: stage;
    width: 100%;
    height: clamp(420px, 96vw, 580px);
  }

  .carousel-nav {
    position: static;
    transform: none;
    grid-row: 2;
    width: 48px;
    height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .carousel-nav--prev {
    grid-area: prev;
    justify-self: end;
  }

  .carousel-nav--next {
    grid-area: next;
    justify-self: start;
  }

  .carousel-card--side {
    display: none;
  }

  .carousel-card--center :deep(.character-card) {
    width: min(92vw, 500px);
  }

  .carousel-meta {
    grid-area: meta;
    width: 100%;
    justify-content: center;
    margin-top: 0.25rem;
  }
}
</style>
