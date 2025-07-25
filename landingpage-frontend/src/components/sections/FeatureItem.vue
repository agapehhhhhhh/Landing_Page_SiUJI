<template>
  <section class="feature-section">
    <div class="container">
      <!-- Header Section -->
      <div v-if="showHeader" class="feature-header">
        <h2 class="section-title">{{ title }}</h2>
        <p class="section-subtitle">{{ subtitle }}</p>
      </div>
      
      <!-- Feature Content -->
      <div class="feature-content" :class="{ 'reverse': layout === 'left', 'no-header': !showHeader }">
        <!-- Feature Text -->
        <div class="feature-text">
          <h3 class="feature-title">{{ featureTitle }}</h3>
          <p class="feature-description">{{ description }}</p>
        </div>
        
        <!-- Illustration -->
        <div class="feature-illustration">
          <div class="illustration-container">
            <div class="illustration-bg">
              <img 
                :src="imageSrc" 
                :alt="featureTitle"
                class="illustration-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Our Feature'
  },
  subtitle: {
    type: String,
    default: 'This very extraordinary feature, can make learning activities more efficient'
  },
  featureTitle: {
    type: String,
    default: 'Lorem Ipsum dolor sit amet'
  },
  description: {
    type: String,
    default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
  },
  imageSrc: {
    type: String,
    default: '/assets/ilustrasi-hero.png'
  },
  layout: {
    type: String,
    default: 'right', // 'right' or 'left'
    validator: (value) => ['right', 'left'].includes(value)
  },
  showHeader: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.feature-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #ffffff 0%, rgba(76, 197, 189, 0.02) 50%, #ffffff 100%);
  position: relative;
  overflow: hidden;
}

.feature-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(76, 197, 189, 0.05) 0%, transparent 70%);
  filter: blur(20px);
  z-index: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* Header */
.feature-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Content Layout */
.feature-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.feature-content.reverse {
  direction: rtl;
}

.feature-content.reverse > * {
  direction: ltr;
}

.feature-content.no-header {
  margin-top: 0;
}

/* Feature Text */
.feature-text {
  max-width: 500px;
}

.feature-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1f2937;
  line-height: 1.3;
}

.feature-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #6b7280;
  margin: 0;
}

/* Illustration */
.feature-illustration {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.illustration-container {
  position: relative;
  width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration-bg {
  position: relative;
  width: 400px;
  height: 350px;
  background: linear-gradient(135deg, #4CC5BD 0%, #3BB3AB 100%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  box-shadow: 0 20px 40px -12px rgba(76, 197, 189, 0.3);
}

.illustration-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .feature-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .feature-content.reverse {
    direction: ltr;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .feature-title {
    font-size: 1.5rem;
  }
  
  .illustration-container {
    width: 350px;
    height: 350px;
  }
  
  .illustration-bg {
    width: 320px;
    height: 280px;
    padding: 12px;
  }
  
  .feature-illustration {
    order: -1;
  }
}
</style>
