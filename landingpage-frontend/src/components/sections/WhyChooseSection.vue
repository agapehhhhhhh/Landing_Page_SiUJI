<template>
  <section class="why-choose-section">
    <svg class="why-bg-svg" width="2502" height="1162" viewBox="0 0 2502 1162" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1441.66 61.4982C1636.96 82.5764 2459.48 83.6147 2501.99 2.73816L394.711 2.73826L388.232 1096.14C317.721 1121.22 216.855 1143.16 79.0007 1161.34L388.075 1122.76L388.232 1096.14C538.164 1042.81 550.844 975.286 490.027 899.61C437.884 821.575 480.385 664.46 521.493 537.401C572.877 378.576 1197.52 35.1505 1441.66 61.4982Z" fill="#4CC5BD" fill-opacity="0.24"/>
      <path d="M1129.32 97.3943C1324.63 118.472 1746.47 86.0099 1788.99 5.1333L315.709 0.336593L309.231 1093.74C238.72 1118.82 137.853 1140.76 -0.000886972 1158.94L309.073 1120.36L309.231 1093.74C459.162 1040.41 471.842 972.885 411.025 897.208C358.882 819.173 802.054 695.559 843.162 568.5C894.547 409.675 885.187 71.0466 1129.32 97.3943Z" fill="#4CC5BD" fill-opacity="0.24"/>
    </svg>
    <div class="container">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading features...</p>
      </div>
      
      <!-- Content -->
      <div v-else-if="features.length > 0">
        <h2 class="section-title">{{ sectionData.title }}</h2>
        <p v-if="sectionData.subtitle" class="section-subtitle">{{ sectionData.subtitle }}</p>
        
        <div class="content-wrapper" v-if="isDesktop">
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
            :key="feature.id"
            :emoji="feature.emoji"
            :title="feature.title"
            :description="feature.description"
            :active="index === activeFeatureIndex"
            @mouseenter="isDesktop && setActive(index)"
            @click="!isDesktop && setActive(index)"
          />
        </div>
        </div>
        
        <div class="mobile-carousel" v-else-if="features.length > 0">
        <div class="visual">
          <img
            :src="features[activeFeatureIndex].image"
            :alt="features[activeFeatureIndex].title"
          />
        </div>
        <FeatureItem
          :emoji="features[activeFeatureIndex].emoji"
          :title="features[activeFeatureIndex].title"
          :description="features[activeFeatureIndex].description"
          :active="true"
        />
        <div class="carousel-nav">
          <button @click="prevFeature">←</button>
          <span>{{ activeFeatureIndex + 1 }} / {{ features.length }}</span>
          <button @click="nextFeature">→</button>
        </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-state">
        <p>No features available at the moment.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FeatureItem from '@/components/sections/WhyChooseItem.vue'
import { fetchWhyChooseSectionData } from '@/services/payloadService'

// Define interfaces
interface WhyChoosePoint {
  id: number | string
  title: string
  description: string
  emoji: string
  image: string | { url: string; alt: string }
  icon?: { url: string; alt: string }
  order: number
}

interface WhyChooseData {
  title: string
  subtitle: string
  points: WhyChoosePoint[]
}

// Reactive state
const loading = ref(true)
const sectionData = ref<WhyChooseData>({
  title: 'Why Choose Us?',
  subtitle: '',
  points: []
})

// reactive state untuk index fitur yang di-hover (default: 0)
const hoveredFeatureIndex = ref(0)
const activeFeatureIndex = ref(0)

// Load data from API
async function loadWhyChooseData() {
  try {
    loading.value = true
    const data = await fetchWhyChooseSectionData()
    sectionData.value = data
    
    // Reset active index if points length changed
    if (activeFeatureIndex.value >= data.points.length) {
      activeFeatureIndex.value = 0
      hoveredFeatureIndex.value = 0
    }
  } catch (error) {
    console.error('Error loading why choose data:', error)
  } finally {
    loading.value = false
  }
}

// Computed features for compatibility with existing template
const features = computed(() => 
  sectionData.value.points.map(point => ({
    id: point.id,
    title: point.title,
    description: point.description,
    emoji: point.emoji,
    image: typeof point.image === 'string' ? point.image : point.image?.url || '/assets/someah-logo.svg'
  }))
)

const setActive = (index: number) => {
  hoveredFeatureIndex.value = index
  activeFeatureIndex.value = index
}

const isDesktop = ref(window.innerWidth > 640)
window.addEventListener('resize', () => {
  isDesktop.value = window.innerWidth > 640
})

function nextFeature() {
  activeFeatureIndex.value = (activeFeatureIndex.value + 1) % features.value.length
}

function prevFeature() {
  activeFeatureIndex.value = (activeFeatureIndex.value - 1 + features.value.length) % features.value.length
}

onMounted(() => {
  loadWhyChooseData()
})
</script>

<style scoped>
.why-choose-section {
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
  max-width: clamp(960px, 90vw, 1300px);
  margin-inline: auto;
  padding-inline: clamp(1rem, 5vw, 3rem); /* otomatis menyesuaikan layar */
  text-align: center;
}
.section-title {
  font-size: clamp(1.5rem, 2.5vw + 1rem, 2.5rem);
  font-weight: 700;
  margin-bottom: 2rem;
}

.section-subtitle {
  font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #4CC5BD;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #666;
  font-size: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-state p {
  color: #666;
  font-size: 1.125rem;
}
.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1rem, 4vw, 3rem);
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
  aspect-ratio: 16 / 9; /* 💡 atur rasio tetap */
  object-fit: contain;
  max-width: clamp(600px, 80vw, 700px);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}
.features {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 2rem);
  text-align: left;
  max-width: 50%;
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
