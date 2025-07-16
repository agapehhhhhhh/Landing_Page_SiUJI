<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Buat variabel reaktif untuk menampung data landing page
const pageData = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Data dummy untuk template awal
const dummyData = {
  heroTitle: 'Selamat Datang di SIUJI',
  heroSubtitle: 'Platform inovatif untuk solusi digital terbaik bagi kebutuhan bisnis Anda',
  ctaButtonText: 'Mulai Sekarang',
  ctaButtonLink: '#features',
  heroImage: {
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  },
  features: [
    {
      title: 'Mudah Digunakan',
      description: 'Interface yang intuitif dan user-friendly untuk semua kalangan',
      icon: '🚀'
    },
    {
      title: 'Keamanan Terjamin',
      description: 'Sistem keamanan berlapis untuk melindungi data Anda',
      icon: '🔒'
    },
    {
      title: 'Support 24/7',
      description: 'Tim support yang selalu siap membantu Anda kapan saja',
      icon: '💬'
    }
  ],
  testimonials: [
    {
      name: 'Budi Santoso',
      company: 'PT. Teknologi Maju',
      message: 'SIUJI sangat membantu dalam meningkatkan efisiensi bisnis kami. Highly recommended!',
      rating: 5
    },
    {
      name: 'Sari Indah',
      company: 'CV. Digital Solutions',
      message: 'Platform yang sangat mudah digunakan dengan fitur-fitur yang lengkap.',
      rating: 5
    }
  ]
}

// Fungsi untuk mengambil data dari Payload API
async function fetchData() {
  try {
    // Payload mengembalikan data dalam sebuah objek dengan properti 'docs'
    const response = await axios.get('http://localhost:3000/api/landing-page')

    // Kita hanya mengambil data pertama karena ini untuk satu landing page
    if (response.data.docs && response.data.docs.length > 0) {
      pageData.value = response.data.docs[0]
    } else {
      // Gunakan dummy data jika tidak ada data dari CMS
      pageData.value = dummyData
    }
  } catch (err) {
    // Gunakan dummy data jika API error
    pageData.value = dummyData
    console.log('Menggunakan data dummy karena API belum tersedia')
  } finally {
    isLoading.value = false
  }
}

// Panggil fungsi fetchData() saat komponen pertama kali di-mount
onMounted(() => {
  fetchData()
})
</script>

<template>
  <main>
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-spinner"></div>
      <p>Memuat konten...</p>
    </div>

    <!-- Main Content -->
    <div v-else-if="pageData">
      <!-- Hero Section -->
      <section class="hero-section" :style="{ backgroundImage: `url(${pageData.heroImage.url})` }">
        <div class="hero-content">
          <h1 class="hero-title">{{ pageData.heroTitle }}</h1>
          <p class="hero-subtitle">{{ pageData.heroSubtitle }}</p>
          <a :href="pageData.ctaButtonLink" class="cta-button">
            {{ pageData.ctaButtonText }}
          </a>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="features-section">
        <div class="container">
          <h2 class="section-title">Fitur Unggulan</h2>
          <div class="features-grid">
            <div v-for="feature in pageData.features" :key="feature.title" class="feature-card">
              <div class="feature-icon">{{ feature.icon }}</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="testimonials-section">
        <div class="container">
          <h2 class="section-title">Apa Kata Klien Kami</h2>
          <div class="testimonials-grid">
            <div v-for="testimonial in pageData.testimonials" :key="testimonial.name" class="testimonial-card">
              <div class="stars">
                <span v-for="star in testimonial.rating" :key="star">⭐</span>
              </div>
              <p class="testimonial-message">"{{ testimonial.message }}"</p>
              <div class="testimonial-author">
                <strong>{{ testimonial.name }}</strong>
                <span>{{ testimonial.company }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <h2>Apakah Anda Siap Memulai dengan SIUJI?</h2>
          <p>Bergabunglah dengan ribuan pengguna yang sudah merasakan manfaatnya</p>
          <a href="#" class="cta-button-secondary">Daftar Sekarang Cuy</a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>SIUJI</h3>
              <p>Platform inovatif untuk solusi digital terbaik</p>
            </div>
            <div class="footer-section">
              <h4>Layanan</h4>
              <ul>
                <li><a href="#">Konsultasi</a></li>
                <li><a href="#">Pengembangan</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
            <div class="footer-section">
              <h4>Kontak</h4>
              <ul>
                <li>Email: info@siuji.com</li>
                <li>Phone: +62 123 456 789</li>
                <li>Address: Jakarta, Indonesia</li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 SIUJI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </main>
</template>

<style>
/* Global Styles - Remove scoped untuk global styling */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  height: 100%;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
}

#app {
  width: 100%;
  min-height: 100vh;
}

main {
  width: 100%;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
}

/* Loading Screen */
.loading-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Hero Section */
.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-align: center;
  position: relative;
  padding: 0;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-content {
  position: relative;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  z-index: 2;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 1rem;
  font-weight: 700;
  animation: fadeInUp 1s ease-out;
}

.hero-subtitle {
  font-size: clamp(1rem, 3vw, 1.5rem);
  margin-bottom: 2rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.cta-button {
  display: inline-block;
  padding: 15px 40px;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: white;
  background: linear-gradient(45deg, #007bff, #0056b3);
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  animation: fadeInUp 1s ease-out 0.6s both;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
}

/* Features Section */
.features-section {
  padding: 80px 0;
  background: #f8f9fa;
  width: 100%;
}

.section-title {
  text-align: center;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 3rem;
  color: #333;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(45deg, #007bff, #0056b3);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* Testimonials Section */
.testimonials-section {
  padding: 80px 0;
  background: white;
  width: 100%;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
}

.testimonial-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  border-left: 4px solid #007bff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.stars {
  margin-bottom: 1rem;
}

.testimonial-message {
  font-style: italic;
  margin-bottom: 1rem;
  color: #555;
  font-size: 1.1rem;
}

.testimonial-author strong {
  color: #333;
  display: block;
  margin-bottom: 0.5rem;
}

.testimonial-author span {
  color: #007bff;
  font-size: 0.9rem;
}

/* CTA Section */
.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  width: 100%;
}

.cta-section h2 {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: clamp(1rem, 2vw, 1.2rem);
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button-secondary {
  display: inline-block;
  padding: 15px 40px;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: #667eea;
  background: white;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

.cta-button-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
}

/* Footer */
.footer {
  background: #333;
  color: white;
  padding: 40px 0 20px;
  width: 100%;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 1rem;
  color: #007bff;
}

.footer-section ul {
  list-style: none;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #007bff;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #555;
  color: #ccc;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .testimonials-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
  
  .hero-content {
    padding: 1.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card,
  .testimonial-card {
    padding: 1.5rem;
    min-height: auto;
  }
  
  .features-section,
  .testimonials-section,
  .cta-section {
    padding: 60px 0;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 1rem;
  }
  
  .cta-button,
  .cta-button-secondary {
    padding: 12px 30px;
    font-size: 0.9rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-card,
  .testimonial-card {
    padding: 1.25rem;
  }
  
  .features-section,
  .testimonials-section,
  .cta-section {
    padding: 50px 0;
  }
}

/* Fix untuk viewport yang sangat kecil */
@media (max-width: 320px) {
  .container {
    padding: 0 10px;
  }
  
  .hero-content {
    padding: 1rem 0.5rem;
  }
  
  .feature-card,
  .testimonial-card {
    padding: 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>