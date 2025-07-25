<template>
  <section class="about-section">
    <!-- Judul -->
    <div class="section-title">
      <h2>What is SIUJI?</h2>
      <p>
        SIUJI is a platform that allows educators to create online classes whereby they can store
        the course materials online; manage assignments, quizzes and exams; monitor due dates;
        grade results and provide students with feedback all in one place.
      </p>
    </div>

    <!-- Konten Bawah: Card + Gambar -->
    <div class="section-content">
      <div class="left-card">
        <div class="card">
          <h3>{{ slides[currentIndex].title }}</h3>
          <p>{{ slides[currentIndex].description }}</p>
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
                :key="img"
                class="stack-image"
                :style="{ zIndex: getZIndex(index) }"
                @mouseover="hoveredIndex = index"
                @mouseleave="hoveredIndex = -1"
              >
                <img :src="img" alt="stacked" />
              </div>
            </transition-group>
          </div>
        </transition>

        <!-- Mobile: single image only -->
        <div class="mobile-only single-image">
          <transition name="fade-slide" mode="out-in">
            <img
              :key="rotatingImages[0]"
              :src="rotatingImages[0]"
              alt="carousel image"
              class="single-img"
            />
          </transition>
        </div>
      </div>
    </div>

    <!-- Dot carousel + Arrow -->
    <div class="carousel-navigation">
      <button @click="prevSlide" class="arrow" aria-label="Previous Slide">
        <span class="material-icons">arrow_back</span>
      </button>

      <div class="carousel-dots">
        <span
          v-for="(_, index) in slides"
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
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Slide {
  title: string
  description: string
  images: string[]
}

const slides: Slide[] = [
  {
    title: 'For Teacher',
    description:
      'SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exam.',
    images: [
      'https://picsum.photos/id/1005/260/170',
      'https://picsum.photos/id/1015/260/170',
      'https://picsum.photos/id/1011/260/170',
    ],
  },
  {
    title: 'For Student',
    description:
      'SIUJI is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exam.',
    images: [
      'https://picsum.photos/id/1025/260/170',
      'https://picsum.photos/id/1035/260/170',
      'https://picsum.photos/id/1041/260/170',
    ],
  },
]

const currentIndex = ref(0) // Untuk mengganti antar For Teacher / For Student
const hoveredIndex = ref(-1)

// Gambar yang akan berputar otomatis
const rotatingImages = ref<string[]>([...slides[currentIndex.value].images])

function rotateImages() {
  const first = rotatingImages.value.shift()
  if (first) rotatingImages.value.push(first)
}

let rotateIntervalId: number

onMounted(() => {
  // Sync awal dengan slide aktif
  rotatingImages.value = [...slides[currentIndex.value].images]

  rotateIntervalId = window.setInterval(() => {
    rotateImages()
  }, 3000)
})

onUnmounted(() => {
  clearInterval(rotateIntervalId)
})

function pauseSlide() {
  clearInterval(rotateIntervalId)
}

function resumeSlide() {
  rotateIntervalId = window.setInterval(() => {
    rotateImages()
  }, 3000)
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
  rotatingImages.value = [...slides[currentIndex.value].images]
  resetSlideTimer()
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % slides.length
  rotatingImages.value = [...slides[currentIndex.value].images]
  resetSlideTimer()
}

function resetSlideTimer() {
  clearInterval(rotateIntervalId)
  rotateIntervalId = window.setInterval(() => {
    rotateImages()
  }, 3000)
}
function onDotClick(index: number) {
  currentIndex.value = index
  rotatingImages.value = [...slides[currentIndex.value].images]
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
  padding: 100px 20px 60px;
  background: linear-gradient(to bottom right, #1de9b6, #00bcd4);
  color: #333;
  width: 100%; /* sebelumnya 100vw */
  background: url('@/assets/blob-haikei.svg') center/cover no-repeat;
  box-sizing: border-box;
  margin-top: -1px;
  border-top: none;
}

.section-title {
  background: white;
  border-radius: 20px;
  padding: 28px 32px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px; /* ↓ jarak bawah dari 80px */
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.section-title h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
}

.section-title p {
  font-size: 16px;
  line-height: 1.6;
  color: #555;
}

.section-content {
  display: flex;
  flex-direction: row; /* pastikan baris horizontal */
  flex-wrap: nowrap;   /* paksa satu baris */
  justify-content: center;
  align-items: flex-start;
  max-width: 1200px;
  margin: 100px auto 0;
  padding: 0 20px;
  gap: 60px;
}


.left-card {
  flex: 1;
  max-width: 480px;
  display: flex;
  justify-content: flex-end;
}

.card {
  background: white;
  padding: 32px 36px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  max-width: 480px;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-6px);
}
.card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 6px;
  text-align: center;
}
.card p {
  font-size: 16px;
  line-height: 1.6;
  color: #444;
}

/* === Overlapping Image Stack === */

.right-images {
  flex: 1;
  max-width: 560px;
  display: flex;
  justify-content: flex-start;
}

.image-stack {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding-left: 55px;
}

.stack-image {
  position: relative;
  margin-left: -240px;
  transition: transform 0.3s ease, z-index 0.3s ease;
  cursor: pointer;
}

.stack-image:nth-child(2) {
  transform: scale(1.3); /* buat tengah sedikit lebih besar */
  z-index: 3;
}

.stack-image:first-child {
  margin-left: 0;
}

.stack-image:hover {
  transform: scale(1.7);
  z-index: 10;
}

.stack-image:hover img {
  transition: transform 0.4s ease 0.1s, box-shadow 0.4s ease 0.1s;
}

.stack-image img {
  border-radius: 24px;
  width: 320px;
  height: 200px;
  object-fit: cover;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

/* === Carousel Nav === */
.carousel-navigation {
  margin-top: 24px; /* atau 32px untuk lebih dekat */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.arrow {
  background: none;
  border: none;
  font-size: 28px;
  color: white;
  cursor: pointer;
  padding: 8px;
  transition: transform 0.2s ease;
}

.arrow:hover {
  transform: scale(1.2);
}

.material-icons {
  font-size: 32px;
  color: white;
  transition: transform 0.2s ease;
}

.arrow:hover .material-icons {
  transform: scale(1.2);
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

/* Fade + geser halus antar gambar */
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

/* Antar SLIDE: Teacher ⇄ Student */
.fade-slide-stack-enter-active,
.fade-slide-stack-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-slide-stack-enter-from,
.fade-slide-stack-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Rotasi GAMBAR di dalam stack */
.fade-image-enter-active,
.fade-image-leave-active {
  transition: all 0.4s ease;
}
.fade-image-enter-from,
.fade-image-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

.pulse-circle {
  position: absolute;
  bottom: 40px;
  right: 60px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #a1f0e8; /* Lingkaran inti */

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
  background-color: rgba(0, 128, 128, 0.3); /* teal transparan */
  backdrop-filter: blur(2px); /* opsional efek kabut */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* opsional bayangan halus */
  z-index: -1; /* pastikan di belakang konten */
}

.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

/* === Responsive === */
@media (max-width: 768px) {
  .about-section {
    margin-top: -1px;
    padding-top: 80px;
    border-top: none;
  }

  .section-content {
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 0 16px;
  }

  .left-card,
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

  .carousel-navigation {
    margin-top: 32px;
    flex-wrap: wrap;
    gap: 16px;
  }

  .stack-image img {
    width: 280px;
    max-width: 85vw;
    height: auto;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: 16px;
  }


  .stack-image:hover {
    transform: none !important;
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
}
</style>
