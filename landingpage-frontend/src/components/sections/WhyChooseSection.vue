<template>
  <section class="why-choose-section">
    <svg class="why-bg-svg" width="2502" height="1162" viewBox="0 0 2502 1162" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1441.66 61.4982C1636.96 82.5764 2459.48 83.6147 2501.99 2.73816L394.711 2.73826L388.232 1096.14C317.721 1121.22 216.855 1143.16 79.0007 1161.34L388.075 1122.76L388.232 1096.14C538.164 1042.81 550.844 975.286 490.027 899.61C437.884 821.575 480.385 664.46 521.493 537.401C572.877 378.576 1197.52 35.1505 1441.66 61.4982Z" fill="#4CC5BD" fill-opacity="0.24"/>
      <path d="M1129.32 97.3943C1324.63 118.472 1746.47 86.0099 1788.99 5.1333L315.709 0.336593L309.231 1093.74C238.72 1118.82 137.853 1140.76 -0.000886972 1158.94L309.073 1120.36L309.231 1093.74C459.162 1040.41 471.842 972.885 411.025 897.208C358.882 819.173 802.054 695.559 843.162 568.5C894.547 409.675 885.187 71.0466 1129.32 97.3943Z" fill="#4CC5BD" fill-opacity="0.24"/>
    </svg>
    <div class="container">

      <h2 class="section-title">{{ whyChooseData.title }}</h2>
      <div>
        <div class="content-wrapper" v-if="isDesktop">
          <!-- Gambar Kiri -->
          <div class="visual">
            <transition name="fade" mode="out-in">
              <img
                :key="whyChooseData.points[hoveredFeatureIndex]?.sideImage?.url || whyChooseData.points[hoveredFeatureIndex]?.icon?.url"
                :src="whyChooseData.points[hoveredFeatureIndex]?.sideImage?.url || whyChooseData.points[hoveredFeatureIndex]?.icon?.url || fallbackImage"
                :alt="whyChooseData.points[hoveredFeatureIndex]?.sideImage?.alt || whyChooseData.points[hoveredFeatureIndex]?.title || 'Feature Visual'"
              />
            </transition>
          </div>

          <!-- Garis Pemisah -->
          <div class="vertical-divider"></div>

          <!-- Fitur -->
          <div class="features">
            <FeatureItem
              v-for="(point, index) in whyChooseData.points"
              :key="point.title + index"
              :emoji="point.icon?.url ? '' : '📡'"
              :iconUrl="point.icon?.url"
              :title="point.title"
              :description="point.description"
              :active="index === activeFeatureIndex"
              @mouseenter="isDesktop && setActive(index)"
              @click="!isDesktop && setActive(index)"
            />
          </div>
        </div>
        <div class="mobile-carousel" v-else-if="whyChooseData.points.length > 0">
          <transition name="mobile-slide" mode="out-in">
            <div class="visual" :key="activeFeatureIndex">
              <img
                :src="whyChooseData.points[activeFeatureIndex]?.sideImage?.url || whyChooseData.points[activeFeatureIndex]?.icon?.url || fallbackImage"
                :alt="whyChooseData.points[activeFeatureIndex]?.sideImage?.alt || whyChooseData.points[activeFeatureIndex]?.title || 'Feature Visual'"
              />
            </div>
          </transition>
          <transition name="mobile-slide" mode="out-in">
            <FeatureItem
              :key="activeFeatureIndex"
              :emoji="whyChooseData.points[activeFeatureIndex]?.icon?.url ? '' : '📡'"
              :iconUrl="whyChooseData.points[activeFeatureIndex]?.icon?.url"
              :title="whyChooseData.points[activeFeatureIndex]?.title"
              :description="whyChooseData.points[activeFeatureIndex]?.description"
              :active="true"
            />
          </transition>
          <div class="carousel-nav">
            <button @click="prevFeature">←</button>
            <div class="nav-dots">
              <span
                v-for="(_, index) in whyChooseData.points"
                :key="index"
                :class="['nav-dot', { active: index === activeFeatureIndex }]"
                @click="setActive(index)"
              ></span>
            </div>
            <button @click="nextFeature">→</button>
          </div>
        </div>
        <!-- Empty State -->
        <div v-else class="empty-state">
          <p>No features available at the moment.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FeatureItem from '@/components/sections/WhyChooseItem.vue'
import { fetchWhyChooseSectionData } from '@/services/payloadService'
// reactive state untuk index fitur yang di-hover (default: 0)
const hoveredFeatureIndex = ref(0)
const activeFeatureIndex = ref(0)

// CMS Data
const whyChooseData = ref({
  title: "Why Choose SIUJI?",
  points: []
})

// Fallback image
const fallbackImage = '/src/assets/someah-logo.svg'

// Load CMS data
onMounted(async () => {
  try {
    const data = await fetchWhyChooseSectionData()
    whyChooseData.value = data
  } catch (error) {
    console.error('Error loading why choose section data:', error)
  }
})

const setActive = (index: number) => {
  hoveredFeatureIndex.value = index
  activeFeatureIndex.value = index
}

const isDesktop = ref(window.innerWidth > 640);
window.addEventListener('resize', () => {
  isDesktop.value = window.innerWidth > 640
})

function nextFeature() {
  const maxIndex = whyChooseData.value.points.length - 1
  activeFeatureIndex.value = activeFeatureIndex.value >= maxIndex ? 0 : activeFeatureIndex.value + 1
}

function prevFeature() {
  const maxIndex = whyChooseData.value.points.length - 1
  activeFeatureIndex.value = activeFeatureIndex.value <= 0 ? maxIndex : activeFeatureIndex.value - 1
}

// Removed redundant onMounted block that called undefined loadWhyChooseData()
</script>

<style scoped>
.why-choose-section {
  font-family: 'Inter';
  position: relative;
  padding: clamp(2rem, 5vh, 4rem) 1rem;
  background: linear-gradient(to right, #ffffff 50%, #4CC5BD 200%);
  overflow: hidden;
  /* ⬇️ Tambahan penting */
  min-height: calc(100vh - 80px); /* <--- UBAH dari min-height */
  display: flex;
  align-items: center;
  box-sizing: border-box; /* penting supaya padding dihitung ke height */
}
.why-bg-svg {
  position: absolute;
  top: -5px;
  left: -400px;
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
  width: 100%;
  max-width: clamp(800px, 90vw, 1550px);
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 3rem);
  text-align: center;
}
.section-title {
  font-size: clamp(2rem, 3.5vw + 1rem, 3.5rem);
  font-weight: 700;
  margin-bottom: 3rem;
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(2rem, 5vw, 4rem);
  justify-content: center;
  align-items: stretch; /* ⬅️ ini penting */
}
.visual {
  flex: 1 1 0;
  max-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.visual img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: contain;
  max-width: clamp(350px, 80vw, 800px);
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
}
.features {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 2.5vw, 2.5rem);
  text-align: left;
  max-width: 50%;
}
.vertical-divider {
  width: 2px;
  background-color: #000000;
  margin: 0 2rem;
  border-radius: 2px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Mobile slide animation */
.mobile-slide-enter-active, .mobile-slide-leave-active {
  transition: all 0.4s ease;
}
.mobile-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.mobile-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (min-width: 641px) {
  .mobile-carousel { display: none; }
}
@media (max-width: 640px) {
  .content-wrapper { display: none; }
  .mobile-carousel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 0.5rem; /* Tambahkan padding di container utama */
    box-sizing: border-box;
  }
  .why-choose-section {
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
  }
  .container {
    max-width: 100vw;
    padding: 0 0.5rem;
    text-align: center;
  }
  .section-title {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  .content-wrapper {
    flex-direction: column;
    gap: 0.7rem;
    align-items: center;
  }
  .visual {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    padding: 0; /* Hapus padding di visual karena sudah ada di parent */
  }
  .visual img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    min-width: 320px;
    max-width: 320px;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem; /* Samakan dengan .FeatureItem */
    border-radius: 12px; /* Samakan dengan .FeatureItem */
    box-shadow: 0 2px 10px rgba(0,0,0,0.06); /* Samakan dengan .FeatureItem */
    background: #fff; /* Jika ingin sama persis, tambahkan background */
    margin-bottom: 0.5rem;
    height: auto;
    aspect-ratio: unset;
    object-fit: contain;
  }
  .features {
    flex: unset;
    width: 100%;
    gap: 0.7rem;
    text-align: left;
  }
  .FeatureItem {
    max-width: 320px;
    width: 100%;
    margin: 0 auto 1rem auto;
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
    background: #19c9b3;
  }
  .carousel-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 0.5rem;
  }
  .carousel-nav button {
    background: #4CC5BD;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 6px 14px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  .carousel-nav button:active {
    background: #319e8c;
  }
  .nav-dots {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 48px;
    justify-content: center;
  }
  .nav-dot {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background: #c2c2c2;
    transition: all 0.3s ease;
    cursor: pointer;
    flex-shrink: 0;
    transform: scale(1);
  }
  .nav-dot:hover {
    transform: scale(1.1);
  }
  .nav-dot.active {
    background: #4CC5BD;
    width: 10px;
    height: 10px;
    transform: scale(1.2);
  }
  .carousel-nav span {
    font-size: 1rem;
    color: #333;
    min-width: 48px;
    text-align: center;
  }
  .vertical-divider {
    display: none;
  }
}

</style>
