<!-- components/sections/HeroSection.vue -->
<template>
  <section class="hero-section" :style="heroStyles">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ heroData.slogan }}</h1>
          <p v-if="heroData.description" class="hero-subtitle">
            {{ heroData.description }}
          </p>
          
          <div class="hero-buttons">
            <a 
              :href="heroData.ctaButtonLink" 
              class="btn btn-primary"
            >
              {{ heroData.ctaButtonText }}
            </a>
            
            <a 
              v-if="heroData.secondaryButtonText"
              :href="heroData.secondaryButtonLink" 
              class="btn btn-secondary"
            >
              {{ heroData.secondaryButtonText }}
            </a>
          </div>
        </div>
        
        <div class="hero-image">
          <img 
            v-if="heroData.mockupImage" 
            :src="heroData.mockupImage.url" 
            :alt="heroData.mockupImage.alt"
            class="mockup-image"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  heroData: {
    type: Object,
    required: true
  }
})

const heroStyles = computed(() => {
  const styles = {}
  
  if (props.heroData.backgroundImage) {
    styles.backgroundImage = `url(${props.heroData.backgroundImage.url})`
    styles.backgroundSize = 'cover'
    styles.backgroundPosition = 'center'
  }
  
  return styles
})
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #ffd700; /* Feezy School yellow */
  position: relative;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 1rem 2rem;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #333;
  color: white;
}

.btn-secondary {
  background-color: transparent;
  color: #333;
  border: 2px solid #333;
}

.mockup-image {
  width: 100%;
  height: auto;
  max-width: 500px;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2rem;
  }
}
</style>
