<template>
  <div class="home-root">
    <HeroSection />
    <section class="content-section plot-section">
      <div class="container-xxl shell">
        <div class="plot-grid">
          <article class="plot-card shadow-card">
            <header class="plot-header">
              <p class="kicker">
                Plot Overview
              </p>
              <h2>Navigate the world of Lord of the Mysteries</h2>
              <p class="lead">
                Klein Moretti becomes a Beyonder after finding a strange diary and accidentally ascends as “The Fool.” He forms the Tarot Club while investigating cults, secrets, and supernatural dangers that threaten his life and sanity.
              </p>
            </header>
            <div class="plot-body">
              <p>
                Traveling widely, Klein uncovers ancient truths, manipulates factions through the gray fog, strengthens the Tarot Club, and confronts powerful Beyonders while inching toward godhood.
              </p>
              <p>
                Facing Outer Gods and collapsing realities, Klein uses cunning, sacrifice, and alliances to protect the world, ultimately becoming a new deity to stabilize existence.
              </p>
            </div>
          </article>
          <ul class="plot-beats">
            <li
              v-for="beat in plotBeats"
              :key="beat.title"
              class="beat-card shadow-card"
            >
              <span class="beat-icon">{{ beat.icon }}</span>
              <div>
                <h3>{{ beat.title }}</h3>
                <p>{{ beat.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="content-section book-section">
      <div class="container-xxl shell">
        <div class="section-header centered">
          <p class="kicker">
            Book Structure
          </p>
          <h2>Four movements across the Sequence ladder</h2>
          <p class="lead">
            Lord of the Mysteries spans eight books and a sequel cycle, each advancing Klein&apos;s Sequence progression and widening the stage from mortal cities to mythic courts.
          </p>
        </div>
        <div class="book-timeline">
          <article
            v-for="cycle in bookCycles"
            :key="cycle.title"
            class="book-card shadow-card"
            :style="{ '--accent': cycle.accent }"
          >
            <p class="book-range">
              {{ cycle.range }}
            </p>
            <h3>{{ cycle.title }}</h3>
            <p>{{ cycle.focus }}</p>
            <p class="book-takeaway">
              {{ cycle.takeaway }}
            </p>
          </article>
        </div>
      </div>
    </section>
    <section class="content-section reasons-section">
      <div class="container-xxl shell">
        <div class="section-header centered">
          <p class="kicker">
            Why Read LOTM
          </p>
          <h2>What makes this saga unforgettable</h2>
          <p class="lead">
            A meticulous magic system, mystery plotting, and a cast of paradoxical heroes keep the tension climbing long after the first séance ends.
          </p>
        </div>
        <div class="reasons-grid">
          <article
            v-for="reason in reasonsToRead"
            :key="reason.title"
            class="reason-card shadow-card"
          >
            <span class="reason-icon">{{ reason.icon }}</span>
            <h3>{{ reason.title }}</h3>
            <p>{{ reason.description }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeroSection from '../components/home/HeroSection.vue'

const plotBeats = [
  {
    icon: '🂠',
    title: 'Tarot Club conspiracies',
    description: 'Weekly gatherings knit together spies, nobles, and Beyonders who bargain through aliases while following Klein’s subtle nudges.'
  },
  {
    icon: '🕯️',
    title: 'Urban horror investigations',
    description: 'Steam-era murders, cursed artifacts, and secret churches force Klein to improvise rituals and apply deductive reasoning under pressure.'
  },
  {
    icon: '⚙️',
    title: 'Political shadow plays',
    description: 'Shadow plays are the covert power struggles between governments, churches, and secret organizations. They involve hidden agendas, quiet deals, and manipulations that shape events behind the scenes, adding intrigue and tension without revealing specific plot developments.'
  },
  {
    icon: '🜂',
    title: 'Cosmic revelations',
    description: 'Cosmic revelations are the story’s big, mind-expanding moments that unveil the hidden laws, history, and forces shaping the universe. They deepen the mystery and widen the world’s scale without giving away specific events.'
  }
]

const bookCycles = [
  {
    range: 'Books 1 – 3',
    title: 'Awakening the Fool',
    focus: 'Klein becomes a Beyonder, creates the Tarot Club, and solves escalating mysteries in a city full of hidden dangers. The foundation of the world’s powers, lore, and factions is gradually revealed.',
    accent: 'rgba(236, 196, 94, 0.18)'
  },
  {
    range: 'Books 4 – 5',
    title: 'Expansion & Secrets',
    focus: 'The world broadens as Klein travels, encounters new cultures, and uncovers buried truths. Larger forces and cosmic hints begin shaping his path.',
    accent: 'rgba(56, 189, 248, 0.16)'
  },
  {
    range: 'Books 6 – 8',
    title: 'Rising Toward the Unseen',
    focus: 'Stakes grow global and metaphysical as conflicts between factions, gods, and ancient entities intensify. Klein’s influence and responsibilities rise sharply.',
    accent: 'rgba(129, 140, 248, 0.18)'
  },
  {
    range: 'Circle of Inevitability',
    title: 'Legacy of the Fool',
    focus: 'A new protagonist navigates a transformed world and its lingering enigmas. The series deepens its cosmic threads while forging a fresh narrative path.',
    accent: 'rgba(244, 114, 182, 0.15)'
  }
]

const reasonsToRead = [
  {
    icon: '🧭',
    title: 'Tightly engineered mystery',
    description: 'Every clue matters. Long-term setups deliver satisfying payoffs without undermining earlier logic.'
  },
  {
    icon: '🜃',
    title: 'Unique magic economy',
    description: 'Potion recipes, acting principles, and spiritual anchors make power growth feel earned and costly.'
  },
  {
    icon: '🎭',
    title: 'Chameleonic protagonists',
    description: 'Klein, the Tarot Club, and the Circle of Inevitability cast continuously reinvent themselves to survive.'
  },
  {
    icon: '🌌',
    title: 'Grand-scale worldbuilding',
    description: 'Industrial fantasy collides with cosmic horror, delivering settings that feel historical, dangerous, and wondrous.'
  }
]
</script>

<style scoped>
.home-root {
  position: relative;
  background: 
    radial-gradient(circle at 12% 8%, rgba(124, 58, 237, 0.18), transparent 65%),
    radial-gradient(circle at 88% 5%, rgba(14, 165, 233, 0.16), transparent 60%),
    radial-gradient(circle at 50% 50%, rgba(15, 118, 110, 0.1), transparent 70%),
    linear-gradient(180deg, rgba(3, 6, 23, 0.95) 0%, #050712 45%, rgba(4, 7, 18, 0.98) 100%);
  color: #e2e8f0;
  isolation: isolate;
  animation: subtleGlow 8s ease-in-out infinite alternate;
}

@keyframes subtleGlow {
  0% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(1.05);
  }
}

.home-root::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 25% 35%, rgba(124, 58, 237, 0.15), transparent 55%),
    radial-gradient(circle at 75% 65%, rgba(56, 189, 248, 0.12), transparent 60%);
  opacity: 0.6;
  pointer-events: none;
  z-index: 0;
  animation: floatingGradients 12s ease-in-out infinite alternate;
}

@keyframes floatingGradients {
  0% {
    transform: translate(0, 0);
    opacity: 0.6;
  }
  100% {
    transform: translate(10px, -10px);
    opacity: 0.75;
  }
}

.kicker {
  text-transform: uppercase;
  letter-spacing: 0.35rem;
  font-size: 0.75rem;
  color: rgba(248, 250, 252, 0.62);
  font-weight: 600;
}

.content-section {
  position: relative;
  padding-block: clamp(3.5rem, 6vw, 5rem);
  animation: fadeInUp 0.8s ease-out backwards;
}

.content-section:first-of-type {
  padding-top: clamp(10rem, 12vw, 12rem);
}

.content-section:nth-child(2) {
  animation-delay: 0.1s;
}

.content-section:nth-child(3) {
  animation-delay: 0.2s;
}

.content-section:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.shell {
  position: relative;
  z-index: 1;
}

.plot-grid {
  display: grid;
  gap: clamp(1.75rem, 3vw, 2.5rem);
  grid-template-columns: minmax(320px, 1.1fr) minmax(260px, 1fr);
  align-items: start;
}

.shadow-card {
  position: relative;
  border-radius: 24px;
  border: 1px solid rgba(148, 163, 184, 0.17);
  backdrop-filter: blur(12px);
  box-shadow: 0 28px 60px rgba(8, 12, 24, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.03);
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), 
              border-color 0.4s ease, 
              box-shadow 0.4s ease;
}

.shadow-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.05), transparent 60%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.shadow-card:hover::after {
  opacity: 1;
}

.plot-card {
  padding: clamp(2.5rem, 4vw, 3rem);
  background: linear-gradient(150deg, #0f172a, #1e293b);
  backdrop-filter: none;
  display: grid;
  gap: 1.6rem;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), 
              border-color 0.45s ease, 
              box-shadow 0.45s ease, 
              background 0.45s ease;
}

.plot-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(236, 196, 94, 0.05), transparent 50%);
  opacity: 0;
  transition: opacity 0.45s ease;
}

.plot-card:hover::before {
  opacity: 1;
}

.plot-card:hover,
.plot-card:focus-within {
  transform: translateY(-8px) scale(1.01);
  background: linear-gradient(160deg, rgba(17, 24, 39, 0.96), rgba(30, 41, 59, 0.9));
  border-color: rgba(236, 196, 94, 0.35);
  box-shadow: 0 35px 80px rgba(8, 12, 24, 0.5), 0 0 60px rgba(236, 196, 94, 0.08);
}

.plot-header {
  display: grid;
  gap: 0.75rem;
}

.plot-header h2 {
  font-size: clamp(2.1rem, 3.2vw, 2.9rem);
  font-weight: 700;
  color: rgb(236, 196, 94);
  text-shadow:
    0 0 8px rgba(3, 5, 14, 0.98),
    0 22px 52px rgba(3, 5, 14, 0.78),
    0 0 18px rgba(24, 32, 73, 0.56);
}

.lead {
  color: rgba(226, 232, 240, 0.82);
  max-width: 60ch;
  margin: 0;
}

.plot-body {
  display: grid;
  gap: 1rem;
}

.plot-body p {
  margin: 0;
  color: rgba(203, 213, 225, 0.86);
  line-height: 1.7;
}

.plot-beats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: clamp(1.1rem, 2.4vw, 1.8rem);
}

.beat-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  align-items: start;
  padding: clamp(1.4rem, 2.5vw, 1.8rem);
  background: linear-gradient(165deg, #111827, #0d121f);
  backdrop-filter: none;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), 
              border-color 0.45s ease,
              box-shadow 0.3s ease;
}

.beat-card:hover,
.beat-card:focus-visible {
  transform: translateY(-6px) translateX(4px);
  border-color: rgba(236, 196, 94, 0.38);
  box-shadow: 0 20px 40px rgba(8, 12, 24, 0.4), 0 0 30px rgba(236, 196, 94, 0.06);
}

.beat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-content: center;
  font-size: 1.25rem;
  background: rgba(236, 196, 94, 0.14);
  color: rgba(236, 196, 94, 0.9);
  box-shadow: inset 0 0 0 1px rgba(236, 196, 94, 0.2), 0 4px 12px rgba(236, 196, 94, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.beat-card:hover .beat-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: inset 0 0 0 1px rgba(236, 196, 94, 0.3), 0 6px 20px rgba(236, 196, 94, 0.25);
}

.beat-card h3 {
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
  color: rgb(236, 196, 94);
  text-shadow:
    0 0 6px rgba(3, 5, 14, 0.9),
    0 12px 32px rgba(3, 5, 14, 0.72);
}

.beat-card p {
  margin: 0;
  color: rgba(203, 213, 225, 0.82);
  line-height: 1.6;
}

.section-header {
  display: grid;
  gap: 0.75rem;
  margin-bottom: clamp(2.25rem, 4vw, 3rem);
}

.section-header h2 {
  font-size: clamp(2rem, 3.2vw, 3rem);
  margin: 0;
  color: rgb(236, 196, 94);
  text-shadow:
    0 0 8px rgba(3, 5, 14, 0.98),
    0 22px 52px rgba(3, 5, 14, 0.78),
    0 0 18px rgba(24, 32, 73, 0.56);
}

.section-header.centered {
  text-align: center;
  justify-items: center;
}

.book-timeline {
  display: grid;
  gap: clamp(1.5rem, 2.5vw, 2.2rem);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.book-card {
  padding: clamp(1.8rem, 3vw, 2.2rem);
  background: linear-gradient(155deg, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.62));
  border: 1px solid rgba(148, 163, 184, 0.2);
  transition: transform 0.5s ease, 
              border-color 0.5s ease, 
              box-shadow 0.5s ease;
}

.book-card::before {
  content: '';
  position: absolute;
  inset: -30% -40% auto;
  height: 140%;
  background: radial-gradient(circle, var(--accent), transparent 75%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.book-card:hover,
.book-card:focus-visible {
  transform: translateY(-4px);
  border-color: rgba(248, 250, 252, 0.25);
  box-shadow: 0 20px 40px rgba(8, 12, 24, 0.45);
}

.book-card:hover::before,
.book-card:focus-visible::before {
  opacity: 0.8;
}

.book-range {
  font-size: 0.85rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: rgba(203, 213, 225, 0.65);
  margin-bottom: 0.75rem;
}

.book-card h3 {
  margin: 0 0 0.6rem;
  font-size: 1.35rem;
  color: rgb(236, 196, 94);
  text-shadow:
    0 0 6px rgba(3, 5, 14, 0.9),
    0 12px 32px rgba(3, 5, 14, 0.72);
}

.book-card p {
  margin: 0;
  color: rgba(203, 213, 225, 0.82);
  line-height: 1.6;
}

.book-takeaway {
  margin-top: 0.75rem;
  font-style: italic;
  color: rgba(226, 232, 240, 0.82);
}

.reasons-grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.4rem);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.reason-card {
  padding: clamp(1.8rem, 3vw, 2.4rem);
  background: linear-gradient(165deg, rgba(17, 24, 39, 0.92), rgba(17, 24, 39, 0.68));
  display: grid;
  gap: 1rem;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), 
              border-color 0.45s ease,
              box-shadow 0.3s ease;
}

.reason-card:hover,
.reason-card:focus-visible {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(56, 189, 248, 0.42);
  box-shadow: 0 30px 60px rgba(8, 12, 24, 0.5), 0 0 40px rgba(56, 189, 248, 0.1);
}

.reason-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-content: center;
  font-size: 1.5rem;
  background: rgba(56, 189, 248, 0.18);
  color: rgba(125, 211, 252, 0.92);
  box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.25), 0 4px 12px rgba(56, 189, 248, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.reason-card:hover .reason-icon {
  transform: scale(1.1) rotate(-5deg);
  box-shadow: inset 0 0 0 1px rgba(56, 189, 248, 0.35), 0 6px 20px rgba(56, 189, 248, 0.25);
}

.reason-card h3 {
  margin: 0;
  font-size: 1.25rem;
  color: rgb(236, 196, 94);
  text-shadow:
    0 0 6px rgba(3, 5, 14, 0.9),
    0 12px 32px rgba(3, 5, 14, 0.72);
}

.reason-card p {
  margin: 0;
  color: rgba(203, 213, 225, 0.85);
  line-height: 1.6;
}

@media (max-width: 1099px) {
  .plot-grid {
    grid-template-columns: 1fr;
  }

  .plot-beats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .content-section {
    padding-block: clamp(3rem, 8vw, 3.5rem);
  }

  .plot-card {
    padding: 2.1rem;
  }

  .plot-beats {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shadow-card,
  .beat-card,
  .book-card,
  .reason-card,
  .home-root,
  .home-root::before,
  .content-section {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation: none !important;
  }
}
</style>
