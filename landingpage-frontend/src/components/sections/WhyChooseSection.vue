<template>
  <section class="why-choose-section">
    <img src="@/assets/wavesOpacity.svg" alt="Wave Top" class="wave-top" />
    <div class="container">
      <h2 class="section-title">Why Choose Us?</h2>
      <div class="content-wrapper">
        <!-- Gambar Kiri -->
        <div class="visual">
          <transition name="fade" mode="out-in">
            <img
              :key="features[hoveredFeatureIndex].image"
              :src="features[hoveredFeatureIndex].image"
              alt="Feature Visual"
            />
          </transition>
        </div>

        <!-- Garis Pemisah -->
        <div class="vertical-divider"></div>

        
        <!-- Fitur -->
        <div class="features">
          <FeatureItem
            v-for="(feature, index) in features"
            :key="index"
            :emoji="feature.emoji"
            :title="feature.title"
            :description="feature.description"
            :active="index === activeFeatureIndex"
            @mouseenter="isDesktop && setActive(index)"
            @click="!isDesktop && setActive(index)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FeatureItem from '@/components/sections/FeatureItem.vue'
// reactive state untuk index fitur yang di-hover (default: 0)
const hoveredFeatureIndex = ref(0)

const features = [
  {
    emoji: '📡',
    title: 'Real-Time Monitoring',
    description: 'Embrace the power of real-time monitoring and take control of your learning journey with us.',
    image: new URL('@/assets/someah-logo.svg', import.meta.url).href
  },
  {
    emoji: '♾️',
    title: 'Lifetime Access',
    description: 'Your education is not bound by time; it\'s a lifelong pursuit, and we\'re here to support your journey every step of the way.',
    image: new URL('@/assets/blob-haikei.svg', import.meta.url).href
  },
  {
    emoji: '👥',
    title: 'Big Community',
    description: 'Connect, collaborate, and share with a diverse group of peers, making your learning journey enriching and interactive.',
    image: new URL('@/assets/wavesOpacity.svg', import.meta.url).href
  }
]

const activeFeatureIndex = ref(0)

const setActive = (index: number) => {
  hoveredFeatureIndex.value = index
  activeFeatureIndex.value = index
}
const isDesktop = ref(window.innerWidth > 640);
window.addEventListener('resize', () => {
  isDesktop.value = window.innerWidth > 640;
});
</script>

<style scoped>
.why-choose-section {
  position: relative;
  padding: 4rem 1rem 1rem 1rem;
  background: linear-gradient(to right, #ffffff 50%, #6BC2A1 200%);
  overflow: hidden;
}
.wave-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 1;
  pointer-events: none;
  opacity: 0.5; /* Atur transparansi di sini (0 = transparan, 1 = solid) */
}
.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: stretch; /* ⬅️ ini penting */
}
.visual {
  flex: 1 1 400px;
  display: flex;
  justify-content: center;
}
.visual img {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}
.features {
  flex: 1 1 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}
.vertical-divider {
  width: 1px;
  background-color: #000000;
  margin: 0 1.5rem;
  border-radius: 1px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .why-choose-section {
    padding: 2rem 0.5rem 1rem 0.5rem;
  }
  .container {
    max-width: 100vw;
    padding: 0;
  }
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
  }
  .content-wrapper {
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }
  .visual {
    flex: unset;
    width: 100%;
    margin-bottom: 1rem;
  }
  .visual img {
    max-width: 95vw;
    width: 100%;
    min-width: 0;
    border-radius: 10px;
  }
  .features {
    flex: unset;
    width: 100%;
    gap: 1rem;
    text-align: left;
  }
  .vertical-divider {
    display: none;
  }
}

</style>
