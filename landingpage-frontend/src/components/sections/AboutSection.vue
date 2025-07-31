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
                  @click="moveImageToCenter(index)"
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
        <button @click="prevSlide" class="arrow">
          Prev
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
          Next
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
  // Disable hover pause on mobile devices
  if (window.innerWidth <= 768) return
  
  if (aboutData.value.carouselConfig.pauseOnHover) {
    clearInterval(rotateIntervalId)
  }
}

function resumeSlide() {
  // Disable hover resume on mobile devices
  if (window.innerWidth <= 768) return
  
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

function moveImageToCenter(clickedIndex: number) {
  if (clickedIndex === 1) return // Jika gambar tengah diklik, tidak perlu swap
  
  // Swap gambar yang diklik dengan gambar tengah
  const temp = rotatingImages.value[1]
  rotatingImages.value[1] = rotatingImages.value[clickedIndex]
  rotatingImages.value[clickedIndex] = temp
}
</script>

<style scoped>
.about-section {
  font-family: 'Inter';
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: calc(100vh - 80px); /* 80px sesuai tinggi navbar */
  padding: clamp(8px, 1.5vh, 18px) clamp(8px, 2vw, 20px); /* dari 24px~48px jadi 8px~18px */
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
  padding: clamp(20px, 1.5vw, 40px);
  text-align: center;
  max-width: clamp(350px, 95vw, 1200px); /* Lebih lebar */
  margin: 0 auto 20px; /* dari clamp(18px, 2vh, 28px) -> 12px saja, atau bisa 8px kalau mau lebih dekat */
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2;
}

.section-title h2 {
  font-size: clamp(1.5rem, 4vw + 1vh, 2.6rem);
  font-weight: 700;
  margin-bottom: 20px;
}

.section-title p {
  font-size: clamp(1rem, 2.5vw + 0.5vh, 1.3rem);
  line-height: 1.6;
  color: #555;
}

.section-title .subtitle {
  font-size: clamp(1rem, 2.5vw + 0.5vh, 1.3rem);
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
  display: grid;
  grid-template-columns: 1fr 1fr;    /* Dua kolom, sama lebar */
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: clamp(48px, 7vw, 120px);
  width: 100%;
  max-width: 1640px; /* >1440px biar benar-benar megar di layar 2K */
  margin: 0 auto;
  padding: 0 clamp(24px, 4vw, 72px);
  min-height: unset; /* atau min-height: 0; */
  margin-top: 30px;
  box-sizing: border-box;
}

/* Card kiri */
.left-card {
  flex: 1 1 0;
  min-width: clamp(340px, 31vw, 700px);  /* Lebarkan batas bawah & atas */
  max-width: 100%;                       /* Biar ngikut parent */
  display: flex;
  align-items: stretch;
  height: 100%;
  margin-left: clamp(-30px, -3vw, -50px);
}

/* Stack gambar kanan */
.right-images {
  flex: 1 1 0;
  min-width: clamp(300px, 29vw, 700px);  /* Ikuti parent, gambar tetap proporsional */
  max-width: 100%;
  display: flex;
  align-items: stretch;
  height: 100%;
  justify-content: flex-start;
}


.card {
  background: white;
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.11);
  padding: clamp(32px, 3vw, 56px) clamp(28px, 3vw, 64px); /* Perbesar padding */
  transition: transform 0.3s;
  width: 100%;
  max-width: unset;
  min-width: 0;
  height: clamp(240px, 28vw, 340px); /* Perbesar tinggi card */
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: clamp(1rem, 2vw + 0.5vh, 1.4rem); /* Font responsif terhadap kotak */
  box-sizing: border-box;
}
.card:hover {
  transform: translateY(-6px);
}
.card h3 {
  font-size: clamp(1.2rem, 3vw + 0.5vh, 1.8rem);
  font-weight: 600;
  margin-bottom: 0px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0px;
  text-align: center;
}
.card p {
  font-size: clamp(0.95rem, 1.8vw + 0.3vh, 1.3rem);
  line-height: 1.6;
  color: #444;
}

.right-images,
.image-stack-wrapper {
  min-width: 340px; /* atau set ke 360px sesuai kebutuhan */
  height: 100%;
  align-items: stretch;
  display: flex;
}


.image-stack {
  position: relative;
  min-width: 380px;
  max-width: 520px;
  width: 100%;
  height: clamp(240px, 28vw, 340px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: clamp(200px, 5vw, 250px);
}

/* Image Stack dengan efek layering sederhana */
.stack-image {
  position: absolute;
  transition: transform 0.35s ease, z-index 0.3s ease;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Semua gambar dengan style yang sama, hanya beda posisi dan z-index */
.stack-image:first-child {
  z-index: 1;
  left: -190px;
  transform: scale(0.8);
  cursor: pointer;
}

.stack-image:nth-child(2) {
  z-index: 3;
  transform: scale(1.1);
  cursor: default;
}

.stack-image:nth-child(3) {
  z-index: 2;
  right: -190px;
  transform: scale(0.8);
  cursor: pointer;
}

/* Hover effects - hanya untuk gambar tengah */
.stack-image:nth-child(2):hover {
  transform: scale(1.25);
  z-index: 10;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.25);
}

.stack-image img {
  width: clamp(320px, 29vw, 420px);
  height: clamp(240px, 21.75vw, 315px);
  aspect-ratio: 4/3;
  object-fit: cover;
  border-radius: 20px;
  display: block;
}

/* === Carousel === */
.carousel-navigation {
  margin-top: clamp(32px, 6vh, 64px);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 32px;
  box-shadow: none;
}

.arrow {
  background: #fff;
  border: 2px solid #19d3c5;
  border-radius: 10px;
  width: 90px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #7bbfc3;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
  box-shadow: none;
  padding: 0;
}

.arrow span,
.arrow .material-icons {
  font-size: 1rem;
  color: #7bbfc3;
}

.arrow:hover {
  background: #e6faf8;
  color: #19d3c5;
  border-color: #19d3c5;
}

.carousel-dots {
  display: flex;
  align-items: center;
  gap: 12px;
}

.carousel-dots span {
  width: 8px;
  height: 8px;
  background: #d2f3f1;
  border-radius: 4px;
  display: inline-block;
  transition: background 0.2s, width 0.2s;
}

.carousel-dots span.active {
  background: #ffffff;
  width: 24px;
  border-radius: 4px;
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
  top: 20px;
  left: 60px;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 0 16px;
    margin-top: 24px;
    grid-template-columns: none;
    width: 100%;
  }

  .left-card {
    width: 100%;
    padding: 0;
    max-width: 100vw;
    order: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0; /* Hapus margin kiri negatif */
    margin-right: 0;
  }
  
  .card {
    width: 90%; /* Lebarkan sedikit dari 100% */
    max-width: 340px;
    margin: 0 auto; /* Ini yang membuat card berada di tengah */
    padding: 24px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    order: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: auto;
    min-height: 200px;
  }

  .right-images {
    justify-content: center;
    max-width: 100%;
    order: 2; /* Gambar muncul kedua */
  }

  .image-stack {
    display: none !important;
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
    max-width: 320px;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .single-img {
    width: 100%;
    height: 240px;
    border-radius: 16px;
    object-fit: cover;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    /* Disable hover effects on mobile */
    pointer-events: none;
  }

  /* Placeholder styles */
  .placeholder-image,
  .placeholder-stack {
    width: 100%;
    max-width: 320px;
    height: 240px;
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
    height: 240px;
  }

  /* Mobile carousel navigation */
  .carousel-navigation {
    margin-top: 32px;
    order: 3; /* Navigation muncul terakhir */
    position: relative;
    z-index: 10; /* Pastikan di atas hiasan */
  }

  /* Hide decorations on mobile */
  .pulse-circle,
  .rounded-block {
    display: none !important;
  }
}
</style>