<template>
  <section class="hero">
    <div class="hero-container">
      <!-- Text Kiri -->
      <div class="hero-text">
        <h1>{{ data.heroTitle || "Headline Utama Dari Aplikasi SIUJIII" }}</h1>
        <p>
          {{
            data.heroSubtitle ||
            "Subheadline dari aplikasi yang bertujuan untuk Menjelaskan lebih lanjut tentang how atau dengan apa manfaat tersebut dicapai."
          }}
        </p>
        <a class="hero-button" :href="data.ctaButtonLink || '#'">
          {{ data.ctaButtonText || "Get Started Now" }}
          <span>&rarr;</span>
        </a>
      </div>

      <!-- Ilustrasi Kanan -->
      <div class="hero-visual">
        <div class="shape-bg"></div>
        <img
          class="hero-image"
          :src="data.heroImage?.url || '/assets/hero-illustration.svg'"
          alt="Hero Illustration"
        />
        <img src="/assets/float-book.svg" class="floating book" alt="book" />
        <img src="/assets/float-file.svg" class="floating file" alt="file" />
        <img
          src="/assets/float-pencil.svg"
          class="floating pencil"
          alt="pencil"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  data: Object,
});
</script>

<style scoped>
.hero {
  min-height: 100dvh;
  width: 100vw;
  background: linear-gradient(120deg, #e3f6f5, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  width: 100%;
  padding: 2rem;
  position: relative;
  flex-wrap: wrap;
}

.hero-text {
  flex: 1 1 50%;
  max-width: 520px;
  z-index: 2;
}
/* Headline utama */
.hero-text h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #363636;
}
/* Subheadline */
.hero-text p {
  font-size: 1.1rem;
  color: #363636;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #24c3a7;
  color: white;
  padding: 14px 28px;
  font-weight: 600;
  border-radius: 32px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  text-decoration: none;
  transition: background 0.3s ease;
  gap: 10px;
  border: 2px solid #146657ff; /* stroke/outline */
}

.hero-button span {
  font-size: 1.2rem;
}

.hero-button:hover {
  background: #1fa38a;
}

.hero-visual {
  flex: 1 1 50%;
  position: relative;
  min-width: 200px;
  height: 800px;
  max-width: 800x;
}

.hero-image {
  position: relative;
  width: 100%;
  z-index: 3;
}

.shape-bg {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #24c3a7;
  clip-path: ellipse(75% 100% at 100% 50%);
  z-index: 1;
  border-top-left-radius: 200px;
  border-bottom-left-radius: 100px;
}

.floating {
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 4;
}

.book {
  top: 30px;
  right: 100px;
  animation: float 4s ease-in-out infinite;
}

.file {
  bottom: 40px;
  right: 60px;
  animation: float 5s ease-in-out infinite;
}

.pencil {
  top: 120px;
  right: 160px;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 900px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
  }

  .hero-visual {
    margin-top: 3rem;
    height: auto;
  }

  .hero-text h1 {
    font-size: 2.5rem;
  }

  .hero-text p {
    font-size: 1rem;
  }
}
</style>
