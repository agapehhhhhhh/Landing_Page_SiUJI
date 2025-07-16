<template>
  <section class="hero">
    <div class="shape-svg">
      <!-- SVG Background -->
      <svg viewBox="0 0 1440 800" preserveAspectRatio="none">
        <path
          d="M960,0 C1180,200 1220,600 1440,800 L1440,0 L0,0 Z"
          fill="#4CC5BD"
        />
      </svg>
    </div>

    <div class="hero-container">
      <!-- Kiri: Teks -->
      <div class="hero-text">
        <h1>{{ data.heroTitle || "Headline Utama Dari Aplikasi SIUJIII" }}</h1>
        <p>
          {{
            data.heroSubtitle ||
            "Subheadline dari aplikasi yang bertujuan untuk menjelaskan lebih lanjut tentang how atau manfaatnya."
          }}
        </p>
        <a class="hero-button" :href="data.ctaButtonLink || '#'">
          {{ data.ctaButtonText || "Get Started Now" }}
          <span>&rarr;</span>
        </a>
      </div>

      <!-- Kanan: Ilustrasi & Floating -->
      <div class="hero-visual">
        <img
          class="hero-image"
          :src="data.heroImage?.url || require('@/assets/ilustrasi-hero.png')"
          alt="Hero Illustration"
        />
        <img src="/assets/float-book.svg" class="floating book" alt="book" />
        <img src="/assets/float-file.svg" class="floating file" alt="file" />
        <img src="/assets/float-pencil.svg" class="floating pencil" alt="pencil" />
        <img src="/assets/float-pencil.svg" class="floating pen" alt="pen" />
        <img src="/assets/float-pencil.svg" class="floating monitor" alt="monitor" />
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
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(120deg, #e3f6f5, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
}

.shape-svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.shape-svg svg {
  width: 100%;
  height: 100%;
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0 4rem;
  position: relative;
  z-index: 2;
}

.hero-text {
  flex: 1 1 50%;
  max-width: 580px;
  padding-left: 1rem;
  padding-top: 0px;
  z-index: 3;
  margin-top: -100px;
  margin-left: 2rem;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  margin-left: 1rem;
  color: #1c1c1c;
  line-height: 1.3;
}

.hero-text p {
  font-size: 1.1rem;
  color: #363636;
  margin-bottom: 2rem;
  margin-left: 1.1rem;
  line-height: 1.6;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #4cc5bd;
  color: white;
  padding: 14px 28px;
  font-weight: 600;
  border-radius: 32px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  text-decoration: none;
  transition: background 0.3s ease;
  gap: 10px;
  border: 2px solid #146657;
  margin-left: 1rem;
}

.hero-button:hover {
  background: #3ab5ab;
}

.hero-visual {
  flex: 1 1 50%;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image {
  max-width: 460px;
  z-index: 2;
  position: relative;
  left: 250px;
  top: 0px;
}

.floating {
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 3;
  animation: float 4s ease-in-out infinite;
}

.book {
  top: 20%;
  right: 10%;
  animation-delay: 0s;
}

.pencil {
  top: 45%;
  right: 65%;
  animation-delay: 0.5s;
}

.file {
  bottom: 10%;
  right: 15%;
  animation-delay: 1s;
}

.pen {
  bottom: 80%;
  left: 50%;
  animation-delay: 1.5s;
}

.monitor {
  bottom: 15%;
  left: 50%;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 900px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
    padding-top: 120px;
  }

  .hero-text {
    padding: 0 1rem;
  }

  .hero-text h1 {
    font-size: 2.5rem;
  }

  .hero-text p {
    font-size: 1rem;
  }

  .hero-visual {
    margin-top: 2rem;
    height: auto;
  }

  .floating {
    display: none;
  }

  .shape-svg svg path {
    d: path("M720,0 C980,200 1020,600 1440,800 L1440,0 L0,0 Z");  
  }
}
</style>
