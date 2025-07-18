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
        <transition-group
          name="fade-slide"
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
    </div>

    <!-- Dot carousel + Arrow -->
    <div class="carousel-navigation">
      <button @click="prevSlide" class="arrow">
        <span class="material-icons">arrow_back</span>
      </button>

      <div class="carousel-dots">
        <span
          v-for="(_, index) in slides"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="currentIndex = index"
        ></span>
      </div>

      <button @click="nextSlide" class="arrow">
        <span class="material-icons">arrow_forward</span>
      </button>
    </div>
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
  rotatingImages.value = [...slides[currentIndex.value].images] // reset gambar
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % slides.length
  rotatingImages.value = [...slides[currentIndex.value].images] // reset gambar
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
  padding: 60px 20px;
  background: linear-gradient(to bottom right, #1de9b6, #00bcd4);
  color: #333;
  width: 100vw;
  transform: translateX(-50%);
  left: 50%;
  background: url('@/assets/blob-haikei.svg') center/cover no-repeat;
}

.section-title {
  background: white;
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  max-width: 900px;
  margin: 0 auto 40px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.section-title h2 {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 16px;
}

.section-title p {
  font-size: 15px;
  line-height: 1.6;
}

.section-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 100px;
  padding-left: 100px; /* tambahkan padding di container */

}

.left-card {
  flex: 1 1 40%;
  max-width: 420px;
}

.card {
  background: white;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
  text-align: center;
}

.card p {
  font-size: 14px;
  line-height: 1.5;
}

/* === Overlapping Image Stack === */
.right-images {
  flex: 1 1 55%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-stack {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}

.stack-image {
  position: relative;
  margin-left: -160px;
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
  transform: scale(1.8);
  z-index: 10;
}

.stack-image img {
  border-radius: 16px;
  width: 260px;
  height: 170px;
  object-fit: cover;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

/* === Carousel Nav === */
.carousel-navigation {
  margin-top: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
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

/* === Responsive === */
@media (max-width: 768px) {
  .section-content {
    flex-direction: column;
    align-items: stretch;
  }

  .right-images {
    align-items: center;
  }

  .image-stack {
    flex-wrap: nowrap;
    overflow-x: auto;
  }

  .stack-image {
    margin-left: -60px;
  }
}
</style>
