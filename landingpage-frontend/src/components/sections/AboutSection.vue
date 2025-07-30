<template>
  <section class="about-section">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner">Loading about section...</div>
    </div>

    <!-- Main Content -->
    <template v-else>
      <!-- Judul -->
      <div class="section-title">
        <h2>{{ aboutData.title }}</h2>
        <p v-if="aboutData.subtitle" class="subtitle">{{ aboutData.subtitle }}</p>
        <p>{{ aboutData.description }}</p>
      </div>

      <!-- Konten Bawah: Card + Gambar -->
      <div class="section-content">
        <div class="left-card">
          <div class="card">
            <h3>{{ aboutData.slides[currentIndex]?.title }}</h3>
            <p>{{ aboutData.slides[currentIndex]?.description }}</p>
          </div>
        </div>

        <div class="right-images">
          <!-- Desktop: stacked images -->
          <transition name="fade-slide-stack" mode="out-in">
            <div :key="currentIndex" class="image-stack-wrapper desktop-only">
              <transition-group
                name="fade-image"
                tag="div"
                class="image-stack"
                @mouseenter="pauseSlide"
                @mouseleave="resumeSlide"
              >
                <div
                  v-for="(img, index) in rotatingImages"
                  v-if="rotatingImages.length > 0"
                  :key="img"
                  class="stack-image"
                  :style="{ zIndex: getZIndex(index) }"
                  @mouseover="hoveredIndex = index"
                  @mouseleave="hoveredIndex = -1"
                >
                  <img :src="img" alt="stacked" />
                </div>
                <div v-if="rotatingImages.length === 0" class="placeholder-stack">
                  <span>No images available</span>
                </div>
              </transition-group>
            </div>
          </transition>

          <!-- Mobile: single image only -->
          <div class="mobile-only single-image">
            <transition name="fade-slide" mode="out-in">
              <img
                v-if="rotatingImages.length > 0"
                :key="rotatingImages[0]"
                :src="rotatingImages[0]"
                alt="carousel image"
                class="single-img"
              />
              <div v-else class="placeholder-image">
                <span>No image available</span>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Dot carousel + Arrow -->
      <div v-if="aboutData.slides.length > 0" class="carousel-navigation">
        <button @click="prevSlide" class="arrow" aria-label="Previous Slide">
          <span class="material-icons">arrow_back</span>
        </button>

        <div class="carousel-dots">
          <span
            v-for="(_, index) in aboutData.slides"
            :key="index"
            :class="{ active: currentIndex === index }"
            @click="onDotClick(index)"
          ></span>
        </div>

        <button @click="nextSlide" class="arrow">
          <span class="material-icons">arrow_forward</span>
        </button>
      </div>
      <div class="pulse-circle"></div>
      <div class="rounded-block"></div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { fetchAboutSectionData } from '@/services/payloadService'

interface Slide {
  id?: number | string
  title: string
  description: string
  images: string[]
  order?: number
}

interface AboutData {
  title: string
  subtitle: string
  description: string
  slides: Slide[]
  carouselConfig: {
    autoSlide: boolean
    slideInterval: number
    pauseOnHover: boolean
  }
}

// Reactive data
const loading = ref(true)
const aboutData = ref<AboutData>({
  title: '',
  subtitle: '',
  description: '',
  slides: [],
  carouselConfig: {
    autoSlide: true,
    slideInterval: 3000,
    pauseOnHover: true
  }
})

const currentIndex = ref(0) // Untuk mengganti antar For Teacher / For Student
const hoveredIndex = ref(-1)

// Gambar yang akan berputar otomatis
const rotatingImages = ref<string[]>([])

// Load data from API
async function loadAboutData() {
  try {
    loading.value = true
    const data = await fetchAboutSectionData()
    aboutData.value = data
    
    // Set rotating images from first slide
    if (data.slides && data.slides.length > 0) {
      rotatingImages.value = [...data.slides[currentIndex.value].images]
    }
  } catch (error) {
    console.error('Error loading about data:', error)
    // Fallback to default data
    aboutData.value = {
      title: 'What is SIUJI?',
      subtitle: 'Platform Ujian Digital untuk Pembelajaran Modern',
      description: 'SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.',
      slides: [
        {
          title: 'For Teacher',
          description: 'SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exam.',
          images: [
            'https://picsum.photos/id/1005/260/170',
            'https://picsum.photos/id/1015/260/170',
            'https://picsum.photos/id/1011/260/170',
          ],
        },
        {
          title: 'For Student',
          description: 'SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exam.',
          images: [
            'https://picsum.photos/id/1025/260/170',
            'https://picsum.photos/id/1035/260/170',
            'https://picsum.photos/id/1041/260/170',
          ],
        },
      ],
      carouselConfig: {
        autoSlide: true,
        slideInterval: 3000,
        pauseOnHover: true
      }
    }
    rotatingImages.value = [...aboutData.value.slides[0].images]
  } finally {
    loading.value = false
  }
}
function rotateImages() {
  const first = rotatingImages.value.shift()
  if (first) rotatingImages.value.push(first)
}

let rotateIntervalId: number

onMounted(async () => {
  // Load data from API first
  await loadAboutData()
  
  // Start image rotation with API data
  rotateIntervalId = window.setInterval(() => {
    rotateImages()
  }, aboutData.value.carouselConfig.slideInterval)
})

onUnmounted(() => {
  clearInterval(rotateIntervalId)
})

function pauseSlide() {
  if (aboutData.value.carouselConfig.pauseOnHover) {
    clearInterval(rotateIntervalId)
  }
}

function resumeSlide() {
  if (aboutData.value.carouselConfig.pauseOnHover) {
    rotateIntervalId = window.setInterval(() => {
      rotateImages()
    }, aboutData.value.carouselConfig.slideInterval)
  }
}

function prevSlide() {
  if (aboutData.value.slides.length === 0) return
  currentIndex.value = (currentIndex.value - 1 + aboutData.value.slides.length) % aboutData.value.slides.length
  rotatingImages.value = [...aboutData.value.slides[currentIndex.value].images]
  resetSlideTimer()
}

function nextSlide() {
  if (aboutData.value.slides.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % aboutData.value.slides.length
  rotatingImages.value = [...aboutData.value.slides[currentIndex.value].images]
  resetSlideTimer()
}

function resetSlideTimer() {
  clearInterval(rotateIntervalId)
  if (aboutData.value.carouselConfig.autoSlide) {
    rotateIntervalId = window.setInterval(() => {
      rotateImages()
    }, aboutData.value.carouselConfig.slideInterval)
  }
}

function onDotClick(index: number) {
  if (aboutData.value.slides.length === 0) return
  currentIndex.value = index
  rotatingImages.value = [...aboutData.value.slides[currentIndex.value].images]
  resetSlideTimer()
}

function getZIndex(index: number): number {
  if (hoveredIndex.value === index) return 10
  return index === 1 ? 3 : index === 0 ? 1 : 2
}
</script>

<style scoped>
.about-section {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: calc(100vh - 80px); /* 80px sesuai tinggi navbar */
  padding: clamp(40px, 6vh, 80px) clamp(16px, 4vw, 40px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #333;
  background: url('@/assets/blob-haikei.svg') center/cover no-repeat;
  box-sizing: border-box;
}

.section-title {
  background: white;
  border-radius: 20px;
  padding: clamp(24px, 3vw, 48px);
  text-align: center;
  max-width: clamp(320px, 60vw, 800px);
  margin: 0 auto clamp(32px, 5vh, 60px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2;
}

.section-title h2 {
  font-size: clamp(20px, 2.5vw, 32px);
  font-weight: 700;
  margin-bottom: 20px;
}

.section-title p {
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 1.6;
  color: #555;
}

.section-title .subtitle {
  font-size: 18px;
  font-weight: 500;
  color: #666;
  margin-bottom: 16px;
}

/* Loading State */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  margin: 0 auto;
  max-width: 800px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.loading-spinner {
  font-size: 18px;
  color: #4cc5bd;
  font-weight: 600;
}

.loading-spinner::after {
  content: '';
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #4cc5bd;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.section-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  max-width: 1600px;
  width: 100%;
  margin-top: clamp(32px, 5vh, 80px);
  gap: clamp(16px, 4vw, 60px);
}

.left-card,
.right-images {
  flex: 1 1 0;
  max-width: 50%;
  min-width: 0; /* 💡 penting agar isi shrink saat layar kecil */
  display: flex;
  align-items: stretch;
}

.card {
  background: white;
  padding: clamp(24px, 2.5vw, 36px);
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: clamp(260px, 36vw, 480px);
  transition: transform 0.3s ease;
  margin: 0 auto;
}
.card:hover {
  transform: translateY(-6px);
}
.card h3 {
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 600;
  margin-bottom: 16px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 6px;
  text-align: center;
}
.card p {
  font-size: clamp(14px, 1.6vw, 16px);
  line-height: 1.6;
  color: #444;
}

.right-images {
  display: flex;
  justify-content: flex-start;
}

.image-stack {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding-left: clamp(20px, 4vw, 55px);
}

.stack-image {
  position: relative;
  /* 💡 Perbaikan besar di sini ↓↓↓ */
  margin-left: max(-300px, -18vw);
  transition: transform 0.3s ease, z-index 0.3s ease;
  max-width: 100%;
  overflow: hidden;
  border-radius: 24px;
}
.stack-image:nth-child(2) {
  transform: scale(1.3);
  z-index: 3;
}
.stack-image:first-child {
  margin-left: 0;
}
.stack-image:hover {
  transform: scale(1.7);
  z-index: 10;
}

.stack-image img {
  border-radius: 24px;
  width: clamp(220px, 25vw, 460px); /* ✨ Ukuran adaptif realistik */
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

/* === Carousel === */
.carousel-navigation {
  margin-top: clamp(32px, 6vh, 64px); /* ← lebih rendah secara responsif */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}
.arrow {
  background: #fff;
  border: 1px solid #555555;
  border-radius: 25%;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.12);
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #4CC5BD;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
  padding: 0;
}
.arrow:hover {
  background: #6BC2A1;
  color: #fff;
  transform: scale(1.1);
}
.material-icons {
  font-size: 32px;
  color: #555555;
  transition: transform 0.2s ease;
}
.arrow:hover .material-icons {
  transform: scale(1.1);
  color: #ffffff;
}
.carousel-dots {
  display: flex;
  gap: 8px;
}
.carousel-dots span {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.carousel-dots span.active {
  background: white;
}

/* === Animasi === */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.fade-slide-stack-enter-active,
.fade-slide-stack-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-slide-stack-enter-from,
.fade-slide-stack-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-image-enter-active,
.fade-image-leave-active {
  transition: all 0.4s ease;
}
.fade-image-enter-from,
.fade-image-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

/* === Dekorasi === */
.pulse-circle {
  position: absolute;
  bottom: 40px;
  right: 60px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #a1f0e8;
  box-shadow:
    0 0 0 20px rgba(161, 240, 232, 0.2),
    0 0 0 40px rgba(161, 240, 232, 0.1);
}
.rounded-block {
  position: absolute;
  top: 60px;
  right: 60px;
  width: 60px;
  height: 90px;
  border-radius: 16px;
  background-color: rgba(0, 128, 128, 0.3);
  backdrop-filter: blur(2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.desktop-only {
  display: flex;
}
.mobile-only {
  display: none;
}

/* === Mobile Only === */
@media (max-width: 768px) {
  .section-content {
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 0;
    margin-top: 40px; /* Jarak atas lebih kecil */
  }

   .card {
    width: 100%;
    max-width: calc(100% - 32px); /* Sama persis dengan section-title */
    margin: 0 auto;
    padding: 24px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .left-card {
    width: 100%;
    padding: 0;
    max-width: 100%;
  }
  .section-title {
    padding: 24px; /* Sesuaikan dengan card */
    margin: 0 auto 0; /* Jarak bawah lebih kecil */
    max-width: calc(100% - 32px); /* Sama dengan card */
  }

  .right-images {
    justify-content: center;
    max-width: 100%;
  }

  .image-stack {
    display: none !important; /* force hide */
  }

  .stack-image {
    display: none !important;
  }

    .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .single-image {
    width: 100%;
    max-width: 300px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .single-img {
  width: 100%;
  max-width: 300px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  /* Placeholder styles */
  .placeholder-image,
  .placeholder-stack {
    width: 100%;
    max-width: 300px;
    height: 200px;
    border-radius: 16px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 14px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .placeholder-stack {
    width: 320px;
    height: 200px;
  }
}
</style>