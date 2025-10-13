<template>
  <div class="paths-view">
    <!-- Hero Section with Background -->
    <div
      v-if="!selectedType"
      class="paths-hero"
    >
      <div class="hero-overlay" />
      <div class="hero-content">
        <h1 class="hero-title">
          Beyonder Paths
        </h1>
        <p class="hero-subtitle">
          Choose your journey toward godhood
        </p>
        <div class="path-type-buttons">
          <button 
            class="path-type-btn standard-btn"
            @click="selectPathType('standard')"
          >
            <div class="btn-icon">
              ⚔️
            </div>
            <div class="btn-text">
              <h3>
                Standard Paths
              </h3>
              <p>
                The 22 orthodox pathways to divinity
              </p>
            </div>
          </button>
          <button 
            class="path-type-btn boon-btn"
            @click="selectPathType('boon')"
          >
            <div class="btn-icon">
              ✨
            </div>
            <div class="btn-text">
              <h3>
                Boon Paths
              </h3>
              <p>
                Blessed pathways of the outer deities
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Paths Grid Section -->
    <section
      v-else
      class="paths-content"
    >
      <div class="paths-container">
        <div class="content-header">
          <button
            class="back-btn"
            @click="goBack"
          >
            ← Back to Selection
          </button>
          <h2 class="content-title">
            {{ selectedType === 'standard' ? 'Standard Paths' : 'Boon Paths' }}
          </h2>
          <p class="content-subtitle">
            {{ filteredPaths.length }} {{ selectedType === 'standard' ? 'orthodox pathways' : 'blessed pathways' }}
          </p>
        </div>

        <LoreLoader v-if="loading" />
        <LoreError v-else-if="error" />
        <div 
          v-else
          :class="['paths-grid', gridVariantClass]"
        >
          <div 
            v-for="path in filteredPaths" 
            :key="path.slug"
            :class="['path-card', { 'path-card--standard': selectedType === 'standard' }]"
          >
            <!-- Immagine e Nome (sempre visibili) -->
            <div class="path-card-front">
              <div class="path-image-container">
                <img 
                  v-if="path.image" 
                  :src="getPathImage(path.image)" 
                  :alt="path.name"
                  class="path-image"
                >
                <template v-else>
                  <div class="path-placeholder">
                    {{ path.name[0] }}
                  </div>
                </template>
              </div>
              <h3 class="path-title">
                {{ path.name }}
              </h3>
            </div>

            <!-- Informazioni aggiuntive (visibili solo al hover) -->
            <div 
              class="path-card-overlay"
              :class="{ 'path-card-overlay--standard': selectedType === 'standard' }"
            >
              <template v-if="selectedType === 'standard'">
                <button 
                  class="overlay-quick-action"
                  type="button"
                  :aria-label="`Open ${path.name} details`"
                  @click.stop="openPathDetails(path)"
                >
                  <span aria-hidden="true">+</span>
                </button>
              </template>
              <template v-else>
                <div class="overlay-content">
                  <h3 class="overlay-title">
                    {{ path.name }}
                  </h3>
                  
                  <!-- Sequenze complete -->
                  <div class="sequences-list">
                    <div 
                      v-for="seq in path.sequences" 
                      :key="seq.level"
                      class="sequence-item"
                      :class="{ 'sequence-god': seq.level === 0 }"
                    >
                      <span class="seq-level">Sequence {{ seq.level }}</span>
                      <span class="seq-name">{{ seq.name }}</span>
                    </div>
                  </div>

                  <!-- Descrizione -->
                  <template v-if="path.description">
                    <p class="overlay-description">
                      {{ path.description }}
                    </p>
                  </template>

                  <!-- Domini -->
                  <template v-if="path.domains && path.domains[0]">
                    <div class="overlay-domains">
                      <div class="domains-label">
                        Domains:
                      </div>
                      <div class="domains-tags">
                        <span 
                          v-for="(domain, idx) in path.domains" 
                          :key="idx"
                          class="domain-tag"
                        >
                          {{ domain }}
                        </span>
                      </div>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Teleport to="body">
      <div 
        v-if="selectedType === 'standard' && expandedPath"
        class="path-detail-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="`${expandedPath.name} details`"
      >
        <div
          class="path-detail-modal__backdrop"
          @click="closePathDetails"
        />
        <div class="path-detail-modal__dialog">
          <button 
            class="detail-close-btn"
            type="button"
            aria-label="Close details"
            @click="closePathDetails"
          >
            ×
          </button>
          <div class="detail-header">
            <div class="detail-image-container">
              <img
                v-if="expandedPath.image"
                :src="getPathImage(expandedPath.image)"
                :alt="expandedPath.name"
                class="detail-image"
              >
              <div
                v-else
                class="detail-image-placeholder"
              >
                {{ expandedPath.name[0] }}
              </div>
            </div>
            <div class="detail-heading">
              <h3 class="detail-title">
                {{ expandedPath.name }}
              </h3>
              <p 
                v-if="expandedPath.description"
                class="detail-description"
              >
                {{ expandedPath.description }}
              </p>
              <div 
                v-if="expandedPath.domains && expandedPath.domains.length"
                class="detail-domains"
              >
                <span class="detail-domains-label">Domains:</span>
                <div class="detail-domains-tags">
                  <span 
                    v-for="(domain, idx) in expandedPath.domains"
                    :key="idx"
                    class="detail-domain-tag"
                  >
                    {{ domain }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="detail-body">
            <h4 class="detail-section-title">
              Sequences
            </h4>
            <div class="detail-sequences">
              <div 
                v-for="seq in expandedPath.sequences"
                :key="seq.level"
                class="detail-sequence-item"
                :class="{ 'detail-sequence-item--god': seq.level === 0 }"
              >
                <span class="detail-seq-level">Sequence {{ seq.level }}</span>
                <span class="detail-seq-name">{{ seq.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import LoreLoader from '../components/shared/LoreLoader.vue'
import LoreError from '../components/shared/LoreError.vue'
import { fetchPaths } from '../services/api'

const paths = ref([])
const loading = ref(true)
const error = ref(false)
const selectedType = ref(null)

const expandedPath = ref(null)

const filteredPaths = computed(() => {
  if (!selectedType.value) return []
  return paths.value.filter(path => path.type === selectedType.value)
})

const gridVariantClass = computed(() => {
  if (!selectedType.value) return null
  return selectedType.value === 'standard' ? 'paths-grid--standard' : 'paths-grid--boon'
})

const selectPathType = (type) => {
  selectedType.value = type
  expandedPath.value = null
  toggleBodyScroll(false)
  removeEscapeListener()
  console.log('Selected type:', type)
  console.log('All paths:', paths.value.length)
  console.log('Filtered paths:', filteredPaths.value.length)
  console.log('Sample path:', paths.value[0])
}

const goBack = () => {
  selectedType.value = null
  expandedPath.value = null
  toggleBodyScroll(false)
  removeEscapeListener()
}

const getPathImage = (imageName) => {
  return new URL(`../assets/pathways/${imageName}`, import.meta.url).href
}

const openPathDetails = (path) => {
  expandedPath.value = path
  toggleBodyScroll(true)
  addEscapeListener()
}

const closePathDetails = () => {
  if (!expandedPath.value) return
  expandedPath.value = null
  toggleBodyScroll(false)
  removeEscapeListener()
}

const LAYOUT_SKIN_CLASS = 'layout-shell--paths'

const toggleBodyScroll = (locked) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = locked ? 'hidden' : ''
}

const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    closePathDetails()
  }
}

const addEscapeListener = () => {
  if (typeof window === 'undefined') return
  window.addEventListener('keydown', handleEscapeKey)
}

const removeEscapeListener = () => {
  if (typeof window === 'undefined') return
  window.removeEventListener('keydown', handleEscapeKey)
}

const setLayoutSkin = (enabled) => {
  if (typeof document === 'undefined') return
  const layoutEl = document.getElementById('layout')
  if (!layoutEl) return
  layoutEl.classList[enabled ? 'add' : 'remove'](LAYOUT_SKIN_CLASS)
}

onMounted(async () => {
  setLayoutSkin(true)

  try {
    paths.value = await fetchPaths()
    console.log('Paths loaded:', paths.value.length)
    console.log('First path:', paths.value[0])
  } catch (e) {
    console.error('Error loading paths:', e)
    error.value = true
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  setLayoutSkin(false)
  toggleBodyScroll(false)
  removeEscapeListener()
})
</script>

<style scoped lang="less">
.paths-view {
  position: relative;
  min-height: 100vh;
  z-index: 0;
}

// Hero Section
.paths-hero {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  overflow: hidden;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1200px;
  padding: 2rem;
}

.hero-title {
  font-size: 5rem;
  font-weight: 800;
  color: rgb(236, 196, 94);
  margin-bottom: 1rem;
  text-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.9),
    0 8px 16px rgba(0, 0, 0, 0.7),
    0 12px 24px rgba(0, 0, 0, 0.5),
    0 0 2px rgba(0, 0, 0, 1);
  letter-spacing: 2px;
}

@keyframes titleGlow {
  0%, 100% { text-shadow: 0 0 20px rgba(236, 196, 94, 0.4), 0 0 40px rgba(236, 196, 94, 0.2), 2px 2px 4px rgba(0, 0, 0, 0.8); }
  50% { text-shadow: 0 0 30px rgba(236, 196, 94, 0.6), 0 0 60px rgba(236, 196, 94, 0.3), 2px 2px 4px rgba(0, 0, 0, 0.8); }
}

.hero-subtitle {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 4rem;
  font-weight: 300;
  letter-spacing: 1px;
}

.path-type-buttons {
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.path-type-btn {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 3rem;
  background: rgba(20, 25, 45, 0.85);
  border: 2px solid rgba(236, 196, 94, 0.3);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  min-width: 400px;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(236, 196, 94, 0.8);
    background: rgba(30, 35, 55, 0.95);
    box-shadow: 
      0 10px 40px rgba(236, 196, 94, 0.3),
      0 0 60px rgba(236, 196, 94, 0.1);
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }
}

.btn-icon {
  font-size: 4rem;
  filter: drop-shadow(0 0 10px rgba(236, 196, 94, 0.5));
}

.btn-text {
  text-align: left;

  h3 {
    font-size: 2rem;
    font-weight: 700;
    color: rgb(236, 196, 94);
    margin: 0 0 0.5rem 0;
    text-shadow: 0 0 10px rgba(236, 196, 94, 0.3);
  }

  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
}

// Content Section
.paths-content {
  min-height: 100vh;
  padding: 1.6rem 0 3rem;
  position: relative;
  z-index: 1;
}

.paths-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
}

.content-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0.75rem 1.5rem;
  background: rgba(236, 196, 94, 0.1);
  border: 1px solid rgba(236, 196, 94, 0.3);
  border-radius: 8px;
  color: rgb(236, 196, 94);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(236, 196, 94, 0.2);
    border-color: rgba(236, 196, 94, 0.5);
    transform: translateX(-4px);
  }
}

.content-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: rgb(236, 196, 94);
  margin-bottom: 0.5rem;
  text-shadow: 
    0 0 20px rgba(236, 196, 94, 0.3),
    2px 2px 4px rgba(0, 0, 0, 0.5);
}

.content-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
}

// Paths Grid - Griglia compatta per mostrare tutti i paths
.paths-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.2rem;
  padding: 1rem 0;
  max-height: calc(100vh - 250px);
}

.paths-grid--standard {
  max-height: none;
  overflow: visible;
}

.paths-grid--standard .path-card {
  width: calc((100% - 10.4rem) / 8);
}

.paths-grid--boon .path-card {
  width: calc((100% - 6rem) / 5);
}

.path-card {
  position: relative;
  aspect-ratio: 0.85;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;

  &:hover {
    transform: scale(1.05);
    z-index: 10;

    .path-card-overlay {
      opacity: 1;
      visibility: visible;
    }

    .path-card-front {
      opacity: 0;
      visibility: hidden;
    }
  }
}

// Stato normale - Solo immagine e nome
.path-card-front {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgba(20, 25, 45, 0.8), rgba(15, 20, 40, 0.9));
  border: 1px solid rgba(236, 196, 94, 0.2);
  border-radius: 12px;
  transition: opacity 0.4s ease;
  z-index: 2;
  visibility: visible;
}

.path-image-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(15, 20, 40, 0.95), rgba(20, 25, 50, 0.98));
}

.path-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.path-placeholder {
  font-size: 3.5rem;
  font-weight: 800;
  color: rgba(236, 196, 94, 0.3);
}

.path-title {
  padding: 0.7rem 0.6rem;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 700;
  color: rgb(236, 196, 94);
  background: rgba(0, 0, 0, 0.5);
  margin: 0;
  text-shadow: 0 0 8px rgba(236, 196, 94, 0.3);
  border-top: 1px solid rgba(236, 196, 94, 0.2);
  line-height: 1.2;
  height: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
}

// Overlay con informazioni (visibile solo al hover)
.path-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(10, 15, 30, 0.98), rgba(20, 25, 45, 0.98));
  border: 2px solid rgba(236, 196, 94, 0.6);
  border-radius: 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  z-index: 3;
  overflow: hidden;
  box-shadow: 
    0 15px 50px rgba(0, 0, 0, 0.7),
    0 0 60px rgba(236, 196, 94, 0.2);
}

.path-card-overlay--standard {
  background: none;
  border-width: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 0.6rem;
  box-shadow: none;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.path-card--standard .overlay-quick-action {
  pointer-events: auto;
}

.path-card--standard:hover .path-card-overlay {
  opacity: 1;
  visibility: visible;
}

.path-card--standard:hover .path-card-front {
  opacity: 1;
  visibility: visible;
}

.overlay-content {
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
  
  // Custom scrollbar
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(236, 196, 94, 0.3);
    border-radius: 3px;

    &:hover {
      background: rgba(236, 196, 94, 0.5);
    }
  }
}

.overlay-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: rgb(236, 196, 94);
  margin: 0 0 0.75rem 0;
  text-align: center;
  text-shadow: 0 0 15px rgba(236, 196, 94, 0.4);
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(236, 196, 94, 0.3);
}

// Lista delle sequenze
.sequences-list {
  margin-bottom: 0.75rem;
}

.sequence-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0.6rem;
  margin-bottom: 0.3rem;
  background: rgba(236, 196, 94, 0.08);
  border: 1px solid rgba(236, 196, 94, 0.15);
  border-radius: 5px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(236, 196, 94, 0.15);
    border-color: rgba(236, 196, 94, 0.3);
    transform: translateX(4px);
  }

  &.sequence-god {
    background: rgba(236, 196, 94, 0.2);
    border-color: rgba(236, 196, 94, 0.4);
    box-shadow: 0 0 15px rgba(236, 196, 94, 0.2);

    .seq-level,
    .seq-name {
      color: rgb(236, 196, 94);
      font-weight: 800;
    }
  }
}

.seq-level {
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(236, 196, 94, 0.8);
  min-width: 70px;
}

.seq-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-align: right;
  flex: 1;
}

// Descrizione
.overlay-description {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.4;
  margin: 0.75rem 0;
  padding: 0.6rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  border-left: 2px solid rgba(236, 196, 94, 0.4);
}

// Domini
.overlay-domains {
  margin-top: 0.75rem;
}

.domains-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: rgba(236, 196, 94, 0.9);
  margin-bottom: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.domains-tags {
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
}

.domain-tag {
  padding: 0.25rem 0.6rem;
  background: rgba(100, 120, 200, 0.2);
  border: 1px solid rgba(100, 120, 200, 0.4);
  border-radius: 4px;
  font-size: 0.7rem;
  color: rgba(150, 170, 255, 0.95);
  font-weight: 600;
}

.overlay-quick-action {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1px solid rgba(236, 196, 94, 0.6);
  background: rgba(236, 196, 94, 0.15);
  color: rgb(236, 196, 94);
  font-size: 1.3rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(236, 196, 94, 0.3);
    box-shadow: 0 8px 20px rgba(236, 196, 94, 0.35);
    transform: translateY(-1px) scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}

.path-detail-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.path-detail-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(4, 6, 12, 0.75);
  backdrop-filter: blur(6px);
}

.path-detail-modal__dialog {
  position: relative;
  z-index: 1;
  width: min(960px, 90vw);
  max-height: min(90vh, 820px);
  background: linear-gradient(135deg, rgba(12, 16, 30, 0.97), rgba(16, 20, 36, 0.97));
  border: 1px solid rgba(236, 196, 94, 0.3);
  border-radius: 24px;
  padding: 2.2rem;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.65);
  overflow-y: auto;
}

.detail-close-btn {
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  background: transparent;
  color: rgba(236, 196, 94, 0.8);
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: rgb(236, 196, 94);
    transform: scale(1.05);
  }
}

.detail-header {
  display: flex;
  gap: 2rem;
  align-items: stretch;
  flex-wrap: wrap;
}

.detail-image-container {
  flex: 0 0 260px;
  height: 260px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(236, 196, 94, 0.25);
  background: linear-gradient(135deg, rgba(20, 25, 45, 0.9), rgba(15, 20, 40, 0.95));
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-image-placeholder {
  font-size: 6rem;
  font-weight: 800;
  color: rgba(236, 196, 94, 0.35);
}

.detail-heading {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.detail-title {
  font-size: 2.2rem;
  margin: 0;
  color: rgb(236, 196, 94);
  text-shadow: 0 0 30px rgba(236, 196, 94, 0.35);
}

.detail-description {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.detail-domains {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.detail-domains-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(236, 196, 94, 0.8);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.detail-domains-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.detail-domain-tag {
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  background: rgba(236, 196, 94, 0.14);
  border: 1px solid rgba(236, 196, 94, 0.25);
  font-size: 0.8rem;
  color: rgba(255, 240, 210, 0.95);
}

.detail-body {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(236, 196, 94, 0.15);
}

.detail-section-title {
  font-size: 1.2rem;
  color: rgb(236, 196, 94);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 1.2px;
}

.detail-sequences {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.9rem;
}

.detail-sequence-item {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  background: rgba(236, 196, 94, 0.08);
  border: 1px solid rgba(236, 196, 94, 0.16);
  border-radius: 10px;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(236, 196, 94, 0.3);
  }
}

.detail-sequence-item--god {
  background: rgba(236, 196, 94, 0.18);
  border-color: rgba(236, 196, 94, 0.35);
  grid-column: 1 / -1;
  justify-content: center;
  gap: 1rem;
}

.detail-seq-level {
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(236, 196, 94, 0.9);
  min-width: 110px;
}

.detail-seq-name {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.85);
  text-align: right;
}

.detail-sequence-item--god .detail-seq-level {
  min-width: auto;
}

.detail-sequence-item--god .detail-seq-name {
  text-align: left;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .path-type-buttons {
    gap: 1.5rem;
  }

  .path-type-btn {
    min-width: 320px;
    padding: 1.5rem 2rem;
    gap: 1rem;
  }

  .btn-icon {
    font-size: 3rem;
  }

  .btn-text h3 {
    font-size: 1.5rem;
  }

  .paths-grid {
    gap: 0.8rem;
  }

  .paths-grid--standard .path-card,
  .paths-grid--boon .path-card {
    width: calc((100% - 2.4rem) / 4);
  }

  .content-title {
    font-size: 2.5rem;
  }

  .back-btn {
    position: static;
    margin-bottom: 2rem;
  }

  .path-title {
    font-size: 0.75rem;
    padding: 0.5rem;
  }

  .overlay-title {
    font-size: 1rem;
  }

  .seq-level {
    font-size: 0.65rem;
    min-width: 65px;
  }

  .seq-name {
    font-size: 0.7rem;
  }

  .detail-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .detail-image-container {
    flex: none;
    width: 200px;
    height: 200px;
  }

  .detail-heading {
    align-items: center;
  }

  .detail-title {
    font-size: 1.8rem;
  }

  .detail-sequences {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }

  .path-detail-modal {
    padding: 1.5rem;
  }

  .path-detail-modal__dialog {
    width: 95vw;
    padding: 1.8rem;
  }
}

@media (max-width: 1400px) {
  .paths-grid--standard .path-card {
    width: calc((100% - 9.2rem) / 7);
  }

  .paths-grid--boon .path-card {
    width: calc((100% - 4.8rem) / 4);
  }
}

@media (max-width: 1200px) {
  .paths-grid--standard .path-card {
    width: calc((100% - 8rem) / 6);
  }
}

@media (max-width: 900px) {
  .paths-grid--standard .path-card {
    width: calc((100% - 6.8rem) / 5);
  }

  .paths-grid--boon .path-card {
    width: calc((100% - 3.6rem) / 3);
  }
}
</style>
