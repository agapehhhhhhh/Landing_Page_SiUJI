<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Buat variabel reaktif untuk menampung data landing page
const pageData = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Fungsi untuk mengambil data dari Payload API
async function fetchData() {
  try {
    // Payload mengembalikan data dalam sebuah objek dengan properti 'docs'
    const response = await axios.get('http://localhost:3000/api/landing-page')

    // Kita hanya mengambil data pertama karena ini untuk satu landing page
    if (response.data.docs.length > 0) {
      pageData.value = response.data.docs[0]
    }
  } catch (err) {
    error.value = "Gagal mengambil data dari CMS. Pastikan server Payload berjalan."
    console.error(err)
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
  <main class="container">
    <div v-if="isLoading">
      <p>Memuat konten...</p>
    </div>

    <div v-else-if="error">
      <p style="color: red;">{{ error }}</p>
    </div>

    <div v-else-if="pageData" class="hero-section" :style="{ backgroundImage: `url(${pageData.heroImage.url})` }">
      <div class="hero-content">
        <h1>{{ pageData.heroTitle }}</h1>
        <p>{{ pageData.heroSubtitle }}</p>
        <a :href="pageData.ctaButtonLink" class="cta-button">
          {{ pageData.ctaButtonText }}
        </a>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  font-family: sans-serif;
}
.hero-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  position: relative;
}
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Overlay gelap agar teks terbaca */
}
.hero-content {
  position: relative; /* Agar konten di atas overlay */
  padding: 2rem;
}
h1 {
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
}
p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}
.cta-button:hover {
  background-color: #0056b3;
}
</style>