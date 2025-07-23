<template>
  <section class="hero">
    <!-- Background SVG -->
    <div class="shape-svg">
      <svg
        id="visual"
        viewBox="0 0 900 600"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        preserveAspectRatio="none"
      >
        <path
          d="M595 600L571 566.7C547 533.3 499 466.7 505.2 400C511.3 333.3 571.7 266.7 580.5 200C589.3 133.3 546.7 66.7 525.3 33.3L504 0L900 0L900 33.3C900 66.7 900 133.3 900 200C900 266.7 900 333.3 900 400C900 466.7 900 533.3 900 566.7L900 600Z"
          fill="#4CC5BD"
          stroke-linecap="round"
          stroke-linejoin="miter"
        />
      </svg>
    </div>

    <!-- Konten Utama -->
    <div class="hero-container">
      <div class="hero-text">
        <h1>{{ data.heroTitle }}</h1>
        <p>{{ data.heroSubtitle }}</p>

        <!-- Gambar untuk mobile (akan ditampilkan hanya pada mobile) -->
        <div class="hero-visual-mobile">
          <img
            class="hero-image-mobile"
            :src="data.heroImage?.url"
            alt="Hero Illustration"
          />
          <!-- Floating elements untuk mobile -->
          <img
            src="/assets/float-book.svg"
            class="floating-mobile book-mobile"
            alt="book"
          />
          <img
            src="/assets/float-file.svg"
            class="floating-mobile file-mobile"
            alt="file"
          />
          <img
            src="/assets/float-pencil.svg"
            class="floating-mobile pencil-mobile"
            alt="pencil"
          />
          <img
            src="/assets/float-pencil.svg"
            class="floating-mobile pen-mobile"
            alt="pen"
          />
        </div>

        <a class="hero-button" :href="data.ctaButtonLink">
          {{ data.ctaButtonText }}
          <span>&rarr;</span>
        </a>
      </div>

      <!-- Gambar untuk desktop (akan disembunyikan pada mobile) -->
      <div class="hero-visual">
        <img
          class="hero-image"
          :src="data.heroImage?.url"
          alt="Hero Illustration"
        />
        <img src="/assets/float-book.svg" class="floating book" alt="book" />
        <img src="/assets/float-file.svg" class="floating file" alt="file" />
        <img
          src="/assets/float-pencil.svg"
          class="floating pencil"
          alt="pencil"
        />
        <img src="/assets/float-pencil.svg" class="floating pen" alt="pen" />
        <img
          src="/assets/float-pencil.svg"
          class="floating monitor"
          alt="monitor"
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
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(120deg, #e3f6f5, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  border-bottom: none;
}

.shape-svg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh; /* Selalu full viewport height */
  z-index: 0;
}

.shape-svg svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 100vh; /* Memastikan minimal setinggi viewport */
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
  margin-top: -50px;
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

.hero-visual-mobile {
  display: none; /* Tersembunyi pada desktop */
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

/* Floating elements untuk mobile */
.floating-mobile {
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 3;
  animation: float 4s ease-in-out infinite;
}

.book-mobile {
  top: 35%;
  right: 0%;
  animation-delay: 0s;
}

.pencil-mobile {
  top: 25%;
  left: 0%;
  animation-delay: 0.5s;
}

.file-mobile {
  bottom: 10%;
  right: 3%;
  animation-delay: 1s;
}

.pen-mobile {
  bottom: 5%;
  left: 3%;
  animation-delay: 1.5s;
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
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Tablet styles */
@media (max-width: 1024px) and (min-width: 901px) {
  .hero {
    padding-top: 100px;
    height: calc(100vh - 68px);
    margin-bottom: 0;
    border-bottom: none;
  }

  .shape-svg {
    height: 100vh;
    bottom: -68px;
  }

  .shape-svg svg {
    min-height: calc(100vh + 68px);
  }

  .hero-container {
    flex-direction: row;
    padding: 0 1.5rem;
  }

  .hero-text {
    margin-left: 1rem;
    margin-top: -20px;
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

/* Small tablet styles */
@media (max-width: 768px) and (min-width: 481px) {
  .hero {
    padding-top: 80px;
    height: calc(100vh - 68px); /* Tambah 1px lagi dari sebelumnya */
    margin-bottom: 0;
    border-bottom: none;
  }

  .shape-svg {
    height: 100vh; /* Background tetap full height */
    bottom: -68px; /* Extend ke bawah untuk menutupi gap */
  }

  .shape-svg svg {
    min-height: calc(100vh + 68px); /* Pastikan SVG menutupi area extend */
  }

  .hero-container {
    flex-direction: column;
    text-align: center;
    padding: 1rem 1.5rem;
    gap: 1.5rem;
    height: 100%;
    justify-content: center;
  }

  .hero-text {
    margin: 75px 0 0 0;
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

  .hero-visual-mobile {
    display: block;
    margin: 1.5rem 0;
    position: relative;
  }

  .hero-image-mobile {
    max-width: 350px;
  }

  .floating-mobile {
    width: 32px;
    height: 32px;
  }

  .hero-button {
    margin: 1.5rem 0 0 0;
  }

  .hero-visual {
    display: none; /* Sembunyikan gambar desktop */
  }

  .floating {
    display: none;
  }

  /* Tampilkan background SVG untuk mobile */
  .shape-svg {
    display: block;
  }
}

/* Mobile landscape styles */
@media (max-width: 900px) and (min-width: 769px) {
  .hero {
    padding-top: 90px;
    height: calc(100vh - 68px);
    margin-bottom: 0;
    border-bottom: none;
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
    padding: 1rem 1rem;
    gap: 1.5rem;
    height: 100%;
    justify-content: center;
  }

  .hero-text {
    padding: 0;
    margin: 75px 0 0 0;
    max-width: 100%;
  }

  .hero-text h1 {
    font-size: 2.5rem;
    margin: 0 0 1rem 0;
  }

  .hero-text p {
    font-size: 1rem;
    margin: 55px 0 1.5rem 0;
  }

  .hero-visual-mobile {
    display: block;
    margin: 1.5rem 0;
    position: relative;
  }

  .hero-image-mobile {
    max-width: 320px;
  }

  .floating-mobile {
    width: 30px;
    height: 30px;
  }

  .hero-button {
    margin: 1.5rem 0 0 0;
  }

  .hero-visual {
    display: none;
  }

  .floating {
    display: none;
  }

  .shape-svg {
    display: block;
  }
}

/* Mobile portrait styles */
@media (max-width: 768px) {
  .hero {
    padding-top: 80px;
    height: calc(100vh - 68px); /* Tambah 1px lagi dari sebelumnya */
    margin-bottom: 0;
    border-bottom: none;
  }

  .shape-svg {
    height: 100vh; /* Background tetap full height */
    bottom: -68px; /* Extend ke bawah untuk menutupi gap */
  }

  .shape-svg svg {
    min-height: calc(100vh + 68px); /* Pastikan SVG menutupi area extend */
  }

  .hero-container {
    flex-direction: column;
    text-align: center;
    padding: 1rem 1rem;
    gap: 1.5rem;
    height: 100%;
    justify-content: center;
  }

  .hero-text {
    padding: 0;
    margin: 75px 0 0 0;
    max-width: 100%;
  }

  .hero-text h1 {
    font-size: 2.2rem;
    line-height: 1.2;
    margin: 0 0 1rem 0;
  }

  .hero-text p {
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 55px 0 1.5rem 0;
  }

  .hero-visual-mobile {
    display: block;
    margin: 1.5rem 0;
    position: relative;
  }

  .hero-image-mobile {
    max-width: 300px;
  }

  .floating-mobile {
    width: 28px;
    height: 28px;
  }

  .hero-button {
    padding: 12px 24px;
    font-size: 0.95rem;
    margin: 1.5rem 0 0 0;
  }

  .hero-visual {
    display: none; /* Sembunyikan gambar desktop */
  }

  .floating {
    display: none;
  }

  /* Tampilkan background SVG untuk mobile */
  .shape-svg {
    display: block;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  .hero {
    padding-top: 70px;
    height: calc(100vh - 68px); /* Tambah 1px lagi dari sebelumnya */
    margin-bottom: 0;
    border-bottom: none;
  }

  .shape-svg {
    height: 100vh; /* Background tetap full height */
    bottom: -68px; /* Extend ke bawah untuk menutupi gap */
  }

  .shape-svg svg {
    min-height: calc(100vh + 68px); /* Pastikan SVG menutupi area extend */
  }

  .hero-container {
    padding: 1rem 0.5rem;
    gap: 1.2rem;
    height: 100%;
    justify-content: center;
  }

  .hero-text {
    margin: 75px 0 0 0;
  }

  .hero-text h1 {
    font-size: 1.8rem;
    margin: 0 0 1rem 0;
  }

  .hero-text p {
    font-size: 0.9rem;
    margin: 55px 0 1.2rem 0;
  }

  .hero-visual-mobile {
    display: block;
    margin: 1.2rem 0;
    position: relative;
  }

  .hero-image-mobile {
    max-width: 260px;
  }

  .floating-mobile {
    width: 26px;
    height: 26px;
  }

  .hero-button {
    padding: 10px 20px;
    font-size: 0.9rem;
    margin: 1.2rem 0 0 0;
  }

  .hero-visual {
    display: none;
  }

  /* Tampilkan background SVG untuk mobile */
  .shape-svg {
    display: block;
  }
}

/* Small screens in landscape mode */
@media (max-height: 600px) and (orientation: landscape) {
  .hero {
    padding-top: 60px;
    height: calc(100vh - 68px); /* Tambah 1px lagi dari sebelumnya */
    margin-bottom: 0;
    border-bottom: none;
  }

  .shape-svg {
    height: 100vh; /* Background tetap full height */
    bottom: -68px; /* Extend ke bawah untuk menutupi gap */
  }

  .shape-svg svg {
    min-height: calc(100vh + 68px); /* Pastikan SVG menutupi area extend */
  }

  .hero-container {
    padding: 0.5rem;
    gap: 0.8rem;
    height: 100%;
    justify-content: center;
  }

  .hero-text {
    margin: 25px 0 0 0; /* Margin lebih kecil untuk landscape */
  }

  .hero-text h1 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
  }

  .hero-text p {
    font-size: 0.85rem;
    margin: 45px 0 0.8rem 0;
  }

  .hero-visual-mobile {
    display: block;
    margin: 0.8rem 0;
    position: relative;
  }

  .hero-image-mobile {
    max-width: 200px;
  }

  .floating-mobile {
    width: 22px;
    height: 22px;
  }

  .hero-button {
    padding: 8px 16px;
    font-size: 0.85rem;
    margin: 0.8rem 0 0 0;
  }

  .hero-visual {
    display: none;
  }

  .floating {
    display: none;
  }

  /* Tampilkan background SVG untuk mobile landscape */
  .shape-svg {
    display: block;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .hero {
    padding-top: 70px;
    height: calc(100vh - 68px); /* Tambah 1px lagi dari sebelumnya */
    margin-bottom: 0;
    border-bottom: none;
  }

  .shape-svg {
    height: 100vh; /* Background tetap full height */
    bottom: -68px; /* Extend ke bawah untuk menutupi gap */
  }

  .shape-svg svg {
    min-height: calc(100vh + 68px); /* Pastikan SVG menutupi area extend */
  }

  .hero-container {
    padding: 1rem 0.5rem;
    gap: 1rem;
    height: 100%;
    justify-content: center;
  }

  .hero-text {
    margin: 75px 0 0 0;
  }

  .hero-text h1 {
    font-size: 1.6rem;
    line-height: 1.2;
    margin: 0 0 1rem 0;
  }

  .hero-text p {
    font-size: 0.85rem;
    line-height: 1.4;
    margin: 55px 0 1.2rem 0;
  }

  .hero-visual-mobile {
    display: block;
    margin: 1.2rem 0;
    position: relative;
  }

  .hero-image-mobile {
    max-width: 240px;
  }

  .floating-mobile {
    width: 24px;
    height: 24px;
  }

  .hero-button {
    padding: 8px 16px;
    font-size: 0.85rem;
    margin: 1.2rem 0 0 0;
  }

  .hero-visual {
    display: none;
  }

  /* Tampilkan background SVG untuk mobile */
  .shape-svg {
    display: block;
  }
}
</style>
