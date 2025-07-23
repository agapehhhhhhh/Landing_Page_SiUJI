<script setup>
import NavbarSection from '@/components/sections/NavbarSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import WhyChooseSection from '@/components/sections/WhyChooseSection.vue'
import AvailableSection from '@/components/sections/AvailableSection.vue'
import FooterSection from '@/components/sections/FooterSection.vue'
import { useLandingPageData } from '@/composables/useLandingPageData'


const { pageData, isLoading, error } = useLandingPageData()

// Debug log to see what we're getting
console.log('[LandingPage] pageData:', pageData)
console.log('[LandingPage] isLoading:', isLoading)
console.log('[LandingPage] error:', error)
</script>

<template>
  <main>
    <NavbarSection />
    
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Memuat halaman...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <h2>Terjadi Kesalahan</h2>
      <p>{{ error }}</p>
      <button @click="$reload" class="retry-button">Coba Lagi</button>
    </div>
    
    <!-- Content -->
    <div v-else>
      <HeroSection :data="pageData.hero" />
      <AboutSection />
      <WhyChooseSection />
      <AvailableSection />
      <FooterSection />
    </div>
  </main>
</template>

<style scoped>
.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  padding: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e3f6f5;
  border-top: 4px solid #4cc5bd;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-button {
  background: #4cc5bd;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
}

.retry-button:hover {
  background: #3ab5ab;
}
</style>
