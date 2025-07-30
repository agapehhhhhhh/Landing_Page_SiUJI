<template>
  <div class="features-list-section">
    <!-- Loading State -->
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <p>Loading features...</p>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <p>Failed to load features: {{ error }}</p>
      <button @click="fetchFeatures" class="retry-button">Try Again</button>
    </div>
    
    <!-- Features List -->
    <div v-else>
      <!-- Header Section (Only shown once at the top) -->
      <div v-if="showMainHeader" class="main-header">
        <h2 class="main-title">{{ mainTitle }}</h2>
        <p class="main-subtitle">{{ mainSubtitle }}</p>
      </div>
      
      <!-- Render Each Feature -->
      <FeatureItem
        v-for="(feature, index) in features"
        :key="feature.id"
        :feature-title="feature.title"
        :description="feature.description"
        :image-src="feature.image?.url || '/assets/ilustrasi-hero.png'"
        :layout="feature.layout"
        :show-header="false"
        :class="{ 'first-feature': index === 0 && !showMainHeader }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FeatureItem from './FeatureItem.vue'
import { fetchFeaturesData } from '@/services/payloadService'

const props = defineProps({
  mainTitle: {
    type: String,
    default: 'Our Amazing Features'
  },
  mainSubtitle: {
    type: String,
    default: 'Discover the powerful features that make SiUJI the best choice for your online examination needs'
  },
  showMainHeader: {
    type: Boolean,
    default: true
  },
  limit: {
    type: Number,
    default: null
  }
})

// Reactive state
const features = ref([])
const loading = ref(false)
const error = ref(null)

// Fetch features data
const fetchFeatures = async () => {
  try {
    loading.value = true
    error.value = null
    
    const featuresData = await fetchFeaturesData()
    
    // Apply limit if specified
    features.value = props.limit 
      ? featuresData.slice(0, props.limit)
      : featuresData
      
  } catch (err) {
    error.value = err.message || 'Failed to fetch features'
    console.error('[FeaturesListSection] Error:', err)
  } finally {
    loading.value = false
  }
}

// Fetch data on mount
onMounted(() => {
  fetchFeatures()
})
</script>

<style scoped>
.features-list-section {
  position: relative;
}

/* Main Header */
.main-header {
  text-align: center;
  padding: 80px 0 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.main-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  min-height: 200px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #4CC5BD;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #6b7280;
  font-size: 1rem;
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  min-height: 200px;
}

.error-state p {
  color: #ef4444;
  margin-bottom: 16px;
  text-align: center;
}

.retry-button {
  background: #4CC5BD;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background: #3BB3AB;
}

/* First Feature Spacing */
.first-feature {
  padding-top: 80px;
}

/* Responsive */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }
  
  .main-header {
    padding: 60px 0 20px;
  }
}
</style>
