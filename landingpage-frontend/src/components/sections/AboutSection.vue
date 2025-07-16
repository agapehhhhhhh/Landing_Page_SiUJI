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
        <div class="image-stack">
          <div
            v-for="(img, index) in slides[currentIndex].images"
            :key="index"
            class="stack-image"
            :style="{ zIndex: hoveredIndex === index ? 10 : index }"
            @mouseover="hoveredIndex = index"
            @mouseleave="hoveredIndex = -1"
          >
            <img :src="img" alt="stacked" />
          </div>
        </div>
      </div>
    </div>

    <!-- Dot carousel + Arrow -->
    <div class="carousel-navigation">
      <button @click="prevSlide" class="arrow">&larr;</button>

      <div class="carousel-dots">
        <span
          v-for="(_, index) in slides"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="currentIndex = index"
        ></span>
      </div>

      <button @click="nextSlide" class="arrow">&rarr;</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

const currentIndex = ref(0)
const hoveredIndex = ref(-1)

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length
}
function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}
</script>

<style scoped>
.about-section {
  padding: 60px 20px;
  background: linear-gradient(to bottom right, #1de9b6, #00bcd4);
  color: #333;
  border-radius: 20px;
  max-width: 1200px;
  margin: auto;
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
}

.left-card {
  flex: 1 1 40%;
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
  margin-left: -80px;
  transition: transform 0.3s ease, z-index 0.3s ease;
  cursor: pointer;
}

.stack-image:first-child {
  margin-left: 0;
}

.stack-image:hover {
  transform: scale(1.15);
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
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.arrow {
  background: rgba(255, 255, 255, 0.8);
  border: none;
  font-size: 18px;
  padding: 6px 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.arrow:hover {
  background: white;
  font-weight: bold;
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
