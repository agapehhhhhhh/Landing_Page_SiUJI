<template>
  <section class="why-choose-section">
    <svg class="why-bg-svg" width="2502" height="1162" viewBox="0 0 2502 1162" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1441.66 61.4982C1636.96 82.5764 2459.48 83.6147 2501.99 2.73816L394.711 2.73826L388.232 1096.14C317.721 1121.22 216.855 1143.16 79.0007 1161.34L388.075 1122.76L388.232 1096.14C538.164 1042.81 550.844 975.286 490.027 899.61C437.884 821.575 480.385 664.46 521.493 537.401C572.877 378.576 1197.52 35.1505 1441.66 61.4982Z" fill="#4CC5BD" fill-opacity="0.24"/>
      <path d="M1129.32 97.3943C1324.63 118.472 1746.47 86.0099 1788.99 5.1333L315.709 0.336593L309.231 1093.74C238.72 1118.82 137.853 1140.76 -0.000886972 1158.94L309.073 1120.36L309.231 1093.74C459.162 1040.41 471.842 972.885 411.025 897.208C358.882 819.173 802.054 695.559 843.162 568.5C894.547 409.675 885.187 71.0466 1129.32 97.3943Z" fill="#4CC5BD" fill-opacity="0.24"/>
    </svg>
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
import FeatureItem from '@/components/sections/WhyChooseItem.vue'
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
  padding: 4rem 1rem 6rem 1rem;
  background: linear-gradient(to right, #ffffff 50%, #4CC5BD 200%);
  overflow: hidden;
}
.why-bg-svg {
  position: absolute;
  top: -5px;
  left: -235px;
  width: 100%;
  height: auto;
  min-height: 400px;
  z-index: 0; /* Di atas background, di bawah konten */
  pointer-events: none;
  user-select: none;
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
  max-width: 540px;
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
    padding: 2rem 0.5rem 2rem 0.5rem;
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
    max-width: 98vw;
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
