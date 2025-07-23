<template>
  <section class="hero">
    <!-- Background SVG -->
    <div class="shape-svg">
      <svg id="visual" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="none">
        <path d="M595 600L571 566.7C547 533.3 499 466.7 505.2 400C511.3 333.3 571.7 266.7 580.5 200C589.3 133.3 546.7 66.7 525.3 33.3L504 0L900 0L900 33.3C900 66.7 900 133.3 900 200C900 266.7 900 333.3 900 400C900 466.7 900 533.3 900 566.7L900 600Z"
              fill="#4CC5BD"
              stroke-linecap="round"
              stroke-linejoin="miter" />
      </svg>
    </div>

    <!-- Konten Utama -->
    <div class="hero-container">
      <div class="hero-text">
        <h1>{{ data.heroTitle }}</h1>
        <p>{{ data.heroSubtitle }}</p>
        <a class="hero-button" :href="data.ctaButtonLink">
          {{ data.ctaButtonText }}
          <span>&rarr;</span>
        </a>
      </div>

      <div class="hero-visual">
        <img
          class="hero-image"
          :src="data.heroImage?.url"
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
  object-fit: cover;
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
  right: 5%;
  animation-delay: 0s;
}

.pencil {
  top: 45%;
  right: 60%;
  animation-delay: 0.5s;
}

.file {
  bottom: 10%;
  right: 11%;
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
  0%, 100% {
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
}
</style>
