<template>
  <section
    class="hero-wrap"
    :style="{ '--hero-image': `url(${heroBackground})` }"
  >
    <div class="hero-overlay" />
    <ul class="hero-runes list-unstyled">
      <li
        v-for="(rune, index) in runes"
        :key="`rune-${index}`"
        :style="{ '--i': index }"
      >
        {{ rune }}
      </li>
    </ul>
    <div class="container hero-content">
      <div class="hero-copy">
        <p class="hero-kicker">
          Lord of the Mysteries
        </p>
        <h1 class="hero-title">
          Quando il destino viene riscritto nel grigio crepuscolo
        </h1>
        <p class="hero-lead">
          Vivi Backlund come un presagio: nebbia, rituali e giuramenti sussurrati nella Nebbia Grigia.
        </p>
      </div>
      <div class="hero-actions">
        <RouterLink
          to="/personaggi"
          class="btn btn-primary shadow-soft"
        >
          Inizia il viaggio
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const heroBackground = new URL(
  '../../assets/illustrations/lotm-im-looking-for-fanart-to-use-as-wallpaper-v0-kvvw2g4ue0nd1.webp',
  import.meta.url
).href

const runes = ['✶', '☽', '☀', '⌛', '♆', '☄', '☿', '☥']
</script>

<style scoped>
.hero-wrap {
  position: relative;
  margin-top: clamp(-5.6rem, -8vw, -6.2rem);
  margin-bottom: -8rem;
  padding-top: clamp(7.4rem, 10vw, 9.4rem);
  padding-bottom: clamp(5rem, 8vw, 7.2rem);
  overflow: hidden;
  background-image: linear-gradient(135deg, rgba(6, 7, 18, 0.45), rgba(24, 11, 36, 0.35)), var(--hero-image);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.hero-wrap::before {
  content: '';
  position: absolute;
  top: clamp(-8.5rem, -12vw, -6.5rem);
  left: 0;
  right: 0;
  height: clamp(11rem, 18vw, 14rem);
  background: linear-gradient(180deg, rgba(6, 7, 18, 0.68) 0%, rgba(6, 7, 18, 0.28) 72%, rgba(6, 7, 18, 0) 100%);
  pointer-events: none;
  z-index: 1;
}

.hero-wrap::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 12rem;
  background: linear-gradient(to bottom, transparent 0%, rgba(5, 7, 18, 0.4) 30%, rgba(5, 7, 18, 0.8) 60%, #050712 100%);
  pointer-events: none;
  z-index: 1;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 25% 20%, rgba(236, 196, 94, 0.08), transparent 55%),
    linear-gradient(160deg, rgba(8, 11, 22, 0.68) 10%, rgba(13, 15, 34, 0.55) 55%, rgba(36, 14, 66, 0.5) 100%);
  backdrop-filter: blur(1.5px);
  z-index: -1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  transform: translateY(-0.55rem);
  position: relative;
  padding: 0.4rem 0.75rem;
  isolation: isolate;
}

.hero-copy::before,
.hero-copy::after {
  content: '';
  position: absolute;
  inset: -34% -22%;
  pointer-events: none;
  z-index: -1;
  transition: opacity 0.4s ease;
}

.hero-copy::before {
  background: radial-gradient(circle at 50% 48%, rgba(5, 7, 17, 0.92) 0%, rgba(5, 7, 17, 0) 68%);
  filter: blur(20px);
  opacity: 0.9;
}

.hero-copy::after {
  inset: -52% -30%;
  background: radial-gradient(circle at 52% 60%, rgba(74, 47, 114, 0.55) 0%, rgba(16, 18, 40, 0) 74%);
  filter: blur(44px);
  opacity: 0.72;
}

.hero-kicker {
  letter-spacing: 0.55rem;
  text-transform: uppercase;
  font-size: 0.7rem;
  opacity: 0.92;
  text-shadow:
    0 0 4px rgba(3, 5, 14, 0.96),
    0 7px 24px rgba(3, 5, 14, 0.72);
}

.hero-title {
  font-size: clamp(2.4rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.08;
  margin-bottom: 0.4rem;
  text-shadow:
    0 0 8px rgba(3, 5, 14, 0.98),
    0 22px 52px rgba(3, 5, 14, 0.78),
    0 0 18px rgba(24, 32, 73, 0.56);
}

.hero-lead {
  font-size: clamp(1.05rem, 1.9vw, 1.25rem);
  color: rgba(247, 249, 252, 0.92);
  max-width: 34ch;
  text-shadow:
    0 0 6px rgba(3, 5, 14, 0.9),
    0 12px 32px rgba(3, 5, 14, 0.72);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.1rem;
}

.shadow-soft {
  box-shadow: 0 18px 35px rgba(236, 196, 94, 0.18);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.shadow-soft:hover,
.shadow-soft:focus-visible {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 24px 45px rgba(236, 196, 94, 0.28);
  color: #0f172a;
}

.hero-runes {
  position: absolute;
  inset: 0;
  margin: 0;
  pointer-events: none;
  z-index: 1;
}

.hero-runes li {
  position: absolute;
  top: calc(12% + var(--i) * 6%);
  left: calc(10% + var(--i) * 8%);
  font-size: clamp(1.5rem, 3vw, 3.25rem);
  color: rgba(226, 232, 240, 0.16);
  animation: drift calc(12s + var(--i) * 1.4s) linear infinite;
}

@keyframes drift {
  from {
    transform: translate3d(-20px, 0, 0) rotate(0deg);
    opacity: 0;
  }
  25% {
    opacity: 0.35;
  }
  60% {
    opacity: 0.65;
  }
  to {
    transform: translate3d(45px, -35px, 0) rotate(18deg);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .hero-wrap {
    margin-top: -3.6rem;
    padding-top: clamp(6.6rem, 22vw, 7.2rem);
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-copy {
    transform: translateY(-0.1rem);
  }

  .hero-copy::before,
  .hero-copy::after {
    inset: -42% -30%;
  }
}
</style>
