<template>
  <section class="portfolio">
    <h2 class="portfolio-title">Trusted by 1.234 Companies Worldwide</h2>
    <div class="portfolio-slider">
      <div ref="track" class="portfolio-track">
        <div
          v-for="(logo, index) in duplicatedLogos"
          :key="index"
          class="portfolio-logo"
        >
          <img :src="logo.url" :alt="logo.name || 'Logo'" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  logos: {
    type: Array,
    required: true,
    default: () => [],
  },
})

// Gandakan sekali saja untuk loop (tidak berlebihan)
const duplicatedLogos = computed(() => {
  const minCount = 12
  const repeated = []
  while (repeated.length < minCount) repeated.push(...props.logos)
  return [...repeated, ...repeated]
})

const track = ref(null)

onMounted(() => {
  let pos = 0
  const animate = () => {
    if (!track.value) return

    pos -= 1
    // Reset posisi saat melewati setengah track
    if (Math.abs(pos) >= track.value.scrollWidth / 2) {
      pos = 0
    }
    track.value.style.transform = `translateX(${pos}px)`
    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
})
</script>

<style scoped>
.portfolio {
  text-align: center;
  padding: 4rem 2rem;
  background: #f6fdfc;
}

.portfolio-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #222;
}

.portfolio-slider {
  overflow: hidden;
  width: 100%;
  position: relative;
  height: 172px;
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
}

.portfolio-track {
  display: flex;
  width: max-content;
  will-change: transform;
}

.portfolio-logo {
  flex: 0 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.portfolio-logo img {
  height: 72px;
  width: auto;
  object-fit: contain;
  opacity: 0.8;
  transition: transform 0.3s ease, opacity 0.3s ease;
  margin-top: 50px;
  margin-bottom: 50px;
}

.portfolio-logo img:hover {
  transform: scale(1.1);
  filter: grayscale(0%);
  opacity: 1;
}
</style>
