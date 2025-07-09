<!-- App.vue - Updated for new CMS structure -->
<template>
  <div id="app">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading Feezy School...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <p class="error-message">{{ error }}</p>
      <button @click="retryFetch" class="retry-button">Try Again</button>
    </div>

    <!-- Main Content -->
    <div v-else-if="pageData" class="landing-page">
      <!-- Hero Section -->
      <HeroSection 
        v-if="pageData.hero && pageData.hero.isActive" 
        :hero-data="pageData.hero" 
      />

      <!-- Features Section -->
      <FeaturesSection 
        v-if="pageData.features.length > 0" 
        :features="pageData.features" 
      />

      <!-- Why Choose Section -->
      <WhyChooseSection 
        v-if="pageData.whyChoose && pageData.whyChoose.isActive" 
        :why-choose-data="pageData.whyChoose" 
      />

      <!-- How It Works Section -->
      <HowItWorksSection 
        v-if="pageData.howItWorks.length > 0" 
        :steps="pageData.howItWorks" 
      />

      <!-- Testimonials Section -->
      <TestimonialsSection 
        v-if="pageData.testimonials.length > 0" 
        :testimonials="pageData.testimonials" 
      />

      <!-- FAQ Section -->
      <FAQSection 
        v-if="pageData.faq.length > 0" 
        :faq="pageData.faq" 
      />

      <!-- Global CTA Section -->
      <CTASection 
        v-if="pageData.global && pageData.global.globalCTA" 
        :cta-data="pageData.global.globalCTA" 
      />

      <!-- Footer -->
      <FooterSection 
        v-if="pageData.global" 
        :global-data="pageData.global" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PayloadService from './services/payloadService.js'

// Import components
import HeroSection from './components/sections/HeroSection.vue'
import FeaturesSection from './components/sections/FeaturesSection.vue'
// import WhyChooseSection from './components/sections/WhyChooseSection.vue'
// import HowItWorksSection from './components/sections/HowItWorksSection.vue'
// import TestimonialsSection from './components/sections/TestimonialsSection.vue'
// import FAQSection from './components/sections/FAQSection.vue'
// import CTASection from './components/sections/CTASection.vue'
// import FooterSection from './components/sections/FooterSection.vue'

// Reactive data
const pageData = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Fetch data function
async function fetchData() {
  try {
    isLoading.value = true
    error.value = null
    
    const data = await PayloadService.fetchLandingPageData()
    pageData.value = data
    
    // Set page title from CMS
    if (data.global && data.global.siteTitle) {
      document.title = data.global.siteTitle
    }
    
    // Set meta description
    if (data.global && data.global.metaDescription) {
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', data.global.metaDescription)
      }
    }
    
  } catch (err) {
    error.value = "Failed to load content. Please check if the CMS server is running."
    console.error('Error fetching data:', err)
  } finally {
    isLoading.value = false
  }
}

// Retry function
async function retryFetch() {
  await fetchData()
}

// Initialize on mount
onMounted(async () => {
  await fetchData()
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #ffd700;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
}

.error-message {
  color: #dc3545;
  font-size: 1.1rem;
  text-align: center;
}

.retry-button {
  padding: 0.5rem 1rem;
  background-color: #ffd700;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.retry-button:hover {
  background-color: #ffed4a;
}

.landing-page {
  min-height: 100vh;
}
</style>
