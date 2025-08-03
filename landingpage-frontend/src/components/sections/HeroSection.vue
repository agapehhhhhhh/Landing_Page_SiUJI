<template>
  <section class="hero">
    <!-- Background SVG -->
    <div class="shape-svg">
      <img src="@/assets/hero-section.svg" alt="Hero Background" />
    </div>

    <!-- Konten Utama -->
    <div class="hero-container">
      <div class="hero-text">
        <h1>{{ data?.title || "Default Title" }}</h1>
        <p>{{ data?.subtitle || "Default Subtitle" }}</p>

        <!-- Gambar untuk mobile (akan ditampilkan hanya pada mobile) -->
        <div class="hero-visual-mobile">
          <img
            class="hero-image-mobile"
            :src="data?.heroImage?.url || '/assets/ilustrasi-hero.png'"
            alt="Hero Illustration"
          />
          <!-- Floating elements untuk mobile -->
          <img
            src="/assets/float-book.png"
            class="floating-mobile book-mobile"
            alt="book"
          />
          <img
            src="/assets/float-file.png"
            class="floating-mobile file-mobile"
            alt="file"
          />
          <img
            src="/assets/float-pencil.png"
            class="floating-mobile pencil-mobile"
            alt="pencil"
          />
          <img
            src="/assets/float-score.png"
            class="floating-mobile pen-mobile"
            alt="pen"
          />
        </div>

        <a class="hero-button" :href="data?.ctaLink || '#'">
          {{ data?.ctaText || "Get Started" }}
          <span>&rarr;</span>
        </a>
      </div>

      <!-- Gambar untuk desktop (akan disembunyikan pada mobile) -->
      <div class="hero-visual">
        <img
          class="hero-image"
          :src="data?.heroImage?.url || '/assets/ilustrasi-hero.png'"
          alt="Hero Illustration"
        />
        <img src="/assets/float-book.png" class="floating book" alt="book" />
        <img src="/assets/float-file.png" class="floating file" alt="file" />
        <img
          src="/assets/float-pencil.png"
          class="floating pencil"
          alt="pencil"
        />
        <img src="/assets/float-pen.png" class="floating pen" alt="pen" />
        <img
          src="/assets/float-score.png"
          class="floating score"
          alt="score"
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
/* Base styles */
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(120deg, #e3f6f5, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -1px;
  border-bottom: none;
}

.shape-svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
}

.shape-svg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: right top;
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
  max-width: 650px;
  padding-left: 1rem;
  z-index: 3;
  margin-top: -60px;
  margin-left: 2rem;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  margin-left: 3.9rem;
  color: #1c1c1c;
  line-height: 1.3;
}

.hero-text p {
  font-size: 1.1rem;
  color: #363636;
  margin-bottom: 2rem;
  margin-left: 3.9rem;
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
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  text-decoration: none;
  transition: background 0.3s ease;
  gap: 10px;
  border: 2px solid #146657;
  margin-left: 3.9rem;
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

.hero-visual-mobile {
  display: none;
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
}

.hero-image-mobile {
  max-width: 280px;
  margin-top: 50px;
  margin-bottom: 25px;
  width: 100%;
  height: auto;
  position: relative;
  z-index: 2;
}

.hero-image {
  max-width: 460px;
  width: 100%;
  height: auto;
  z-index: 2;
  position: relative;
  left: 250px;
  top: 0px;
}

/* Floating animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.floating,
.floating-mobile {
  position: absolute;
  z-index: 3;
  animation: float 4s ease-in-out infinite;
}

.floating {
  width: 40px;
  height: 40px;
}

.floating-mobile {
  width: 30px;
  height: 30px;
}

/* Desktop floating positions */
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
.score {
  bottom: 15%;
  left: 50%;
  animation-delay: 2s;
}

/* Mobile floating positions */
.book-mobile {
  top: 25%;
  right: 7%;
  animation-delay: 0s;
}
.pencil-mobile {
  top: 25%;
  left: 5%;
  animation-delay: 0.5s;
}
.file-mobile {
  bottom: 10%;
  right: 7%;
  animation-delay: 1s;
}
.pen-mobile {
  bottom: 5%;
  left: 5%;
  animation-delay: 1.5s;
}

/* Tablet styles (1025px+) */
@media (min-width: 1025px) {
  .hero-visual-mobile {
    display: none;
  }
  .hero-visual {
    display: flex;
  }
}

/* Large tablet (901px - 1024px) */
@media (max-width: 1024px) and (min-width: 901px) {
  .hero {
    padding-top: 100px;
    height: calc(100vh - 68px);
    margin-bottom: 0;
  }

  .shape-svg {
    height: 100vh;
    bottom: -68px;
  }

  .shape-svg svg {
    min-height: calc(100vh + 68px);
  }

  .hero-container {
    padding: 0 1.5rem;
  }

  .hero-text {
    margin-left: 1rem;
    margin-top: -30px;
  }

  .hero-text h1 {
    font-size: 3rem;
    margin-left: 0.5rem;
  }

  .hero-text p {
    margin-left: 0.6rem;
  }

  .hero-button {
    margin-left: 0.5rem;
  }

  .hero-image {
    left: 150px;
    max-width: 400px;
  }

  .floating {
    width: 35px;
    height: 35px;
  }

  .hero-visual-mobile {
    display: none;
  }
  .hero-visual {
    display: flex;
  }
}

/* Mobile and small tablet (480px - 900px) */
@media (max-width: 900px) and (min-width: 481px) {
  .hero {
    padding-top: 80px;
    height: calc(100vh - 68px);
    margin-bottom: 0;
  }

  .shape-svg {
    height: 100vh;
    bottom: -68px;
  }

  .shape-svg svg {
    min-height: calc(100vh + 68px);
  }

  .hero-container {
    flex-direction: column;
    text-align: center;
    padding: 1rem 1.5rem;
    gap: 1.5rem;
    justify-content: center;
  }

  .hero-text {
    margin: 65px 0 0 0;
    padding: 0;
    max-width: 100%;
  }

  .hero-text h1 {
    font-size: 2.8rem;
    margin: 0 0 1rem 0;
  }

  .hero-text p {
    font-size: 1.05rem;
    margin: 55px 0 1.5rem 0;
  }

  .hero-button {
    margin: 1.5rem 0 0 0;
  }

  .hero-visual-mobile {
    display: block;
    margin: 1.5rem 0;
  }

  .hero-image-mobile {
    max-width: 350px;
  }

  .floating-mobile {
    width: 32px;
    height: 32px;
  }

  .hero-visual {
    display: none;
  }
  .floating:not(.floating-mobile) {
    display: none;
  }
}

/* Small mobile (max-width: 480px) */
@media (max-width: 480px) {
  .hero {
    padding-top: 70px;
    height: calc(100vh - 68px);
    margin-bottom: 0;
  }

  .shape-svg {
    height: 100vh;
    bottom: -68px;
  }

  .shape-svg svg {
    min-height: calc(100vh + 68px);
  }

  .hero-container {
    flex-direction: column;
    text-align: center;
    padding: 1rem 0.5rem;
    gap: 1.2rem;
    justify-content: center;
  }

  .hero-text {
    margin: 65px 0 0 0;
    padding: 0;
    max-width: 100%;
  }

  .hero-text h1 {
    font-size: 1.8rem;
    line-height: 1.2;
    margin: 0 0 1rem 0;
  }

  .hero-text p {
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 55px 0 1.2rem 0;
  }

  .hero-button {
    padding: 10px 20px;
    font-size: 0.9rem;
    margin: 1.2rem 0 0 0;
  }

  .hero-visual-mobile {
    display: block;
    margin: 1.2rem 0;
  }

  .hero-image-mobile {
    max-width: 260px;
  }

  .floating-mobile {
    width: 26px;
    height: 26px;
  }

  .hero-visual {
    display: none;
  }
}

/* Very small screens (max-width: 360px) */
@media (max-width: 360px) {
  .hero-text h1 {
    font-size: 1.6rem;
  }

  .hero-text p {
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .hero-button {
    padding: 8px 16px;
    font-size: 0.85rem;
  }

  .hero-image-mobile {
    max-width: 240px;
  }

  .floating-mobile {
    width: 24px;
    height: 24px;
  }
}

/* Landscape mode optimization */
@media (max-height: 600px) and (orientation: landscape) {
  .hero {
    padding-top: 60px;
    height: calc(100vh - 68px);
  }

  .shape-svg {
    height: 100vh;
    bottom: -68px;
  }

  .shape-svg svg {
    min-height: calc(100vh + 68px);
  }

  .hero-container {
    padding: 0.5rem;
    gap: 0.8rem;
    justify-content: center;
  }

  .hero-text {
    margin: 15px 0 0 0;
  }

  .hero-text h1 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
  }

  .hero-text p {
    font-size: 0.85rem;
    margin: 45px 0 0.8rem 0;
  }

  .hero-button {
    padding: 8px 16px;
    font-size: 0.85rem;
    margin: 0.8rem 0 0 0;
  }

  .hero-visual-mobile {
    display: block;
    margin: 0.8rem 0;
  }

  .hero-image-mobile {
    max-width: 200px;
  }

  .floating-mobile {
    width: 22px;
    height: 22px;
  }

  .hero-visual {
    display: none;
  }
  .floating:not(.floating-mobile) {
    display: none;
  }
}
</style>
