<template>
  <section id="features" class="features-section">
    <div class="container">
      <!-- Header Section -->
      <div v-if="showHeader" class="features-header">
        <h2 class="section-title">{{ title }}</h2>
        <p class="section-subtitle">{{ subtitle }}</p>
      </div>

      <!-- Single Feature Item -->
      <FeatureItem
        v-if="!useAPI"
        :feature-title="featureTitle"
        :description="description"
        :image-src="imageSrc"
        :layout="layout"
      />

      <!-- Multiple Features from API -->
      <div v-else class="features-list">
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading features...</p>
        </div>

        <div v-else-if="error" class="error-state">
          <p>Error loading features: {{ error }}</p>
          <button @click="loadFeatures" class="retry-button">Try Again</button>
        </div>

        <div v-else class="features-grid">
          <FeatureItem
            v-for="(feature, index) in displayedFeatures"
            :key="feature.id || index"
            :feature-title="feature.title"
            :description="feature.description"
            :image-src="
              feature.image?.url ||
              feature.imageSrc ||
              '/assets/ilustrasi-hero.png'
            "
            :layout="index % 2 === 0 ? 'right' : 'left'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import FeatureItem from "./FeatureItem.vue";
import { fetchFeaturesData } from "../../services/payloadService";

const props = defineProps({
  // Header props
  title: {
    type: String,
    default: "Fitur-Fitur Unggulan SiUJI",
  },
  subtitle: {
    type: String,
    default:
      "Temukan berbagai fitur canggih yang dirancang khusus untuk meningkatkan kualitas pembelajaran digital. SiUJI menghadirkan solusi komprehensif yang memudahkan proses belajar mengajar dengan teknologi terdepan dan interface yang user-friendly.",
  },
  showHeader: {
    type: Boolean,
    default: true,
  },

  // Single feature props (when useAPI is false)
  featureTitle: {
    type: String,
    default: "Sistem Manajemen Pembelajaran Terintegrasi dan Mudah Digunakan",
  },
  description: {
    type: String,
    default:
      "SiUJI menyediakan platform pembelajaran digital yang komprehensif dengan berbagai fitur unggulan seperti manajemen kelas otomatis, sistem penilaian yang akurat, tracking progress siswa secara real-time, dan dashboard analitik yang memberikan insight mendalam tentang performa akademik. Platform kami dilengkapi dengan teknologi AI yang membantu personalisasi pembelajaran sesuai dengan kebutuhan individual setiap siswa, serta sistem notifikasi yang memastikan komunikasi efektif antara guru, siswa, dan orang tua. Dengan interface yang intuitif dan responsive design, SiUJI dapat diakses melalui berbagai perangkat untuk memberikan fleksibilitas maksimal dalam proses pembelajaran.",
  },
  imageSrc: {
    type: String,
    default: "/assets/ilustrasi-hero.png",
  },
  layout: {
    type: String,
    default: "right",
    validator: (value) => ["right", "left"].includes(value),
  },

  // API props
  useAPI: {
    type: Boolean,
    default: false,
  },
  maxFeatures: {
    type: Number,
    default: null,
  },
});

// Reactive data for API features
const features = ref([]);
const loading = ref(false);
const error = ref(null);

// Computed property for displayed features
const displayedFeatures = computed(() => {
  if (!props.maxFeatures) return features.value;
  return features.value.slice(0, props.maxFeatures);
});

// Fetch features when using API
const loadFeatures = async () => {
  if (!props.useAPI) return;

  loading.value = true;
  error.value = null;

  try {
    const data = await fetchFeaturesData();
    features.value = data;
  } catch (err) {
    error.value = err.message || "Failed to load features";
    console.error("Error loading features:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (props.useAPI) {
    loadFeatures();
  }
});
</script>

<style scoped>
.features-section {
  padding: 80px 0;
  position: relative;
  overflow: hidden;
  background-color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

/* Header */
.features-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 50px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: #718096;
  max-width: 6000px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Features List (for API mode) */
.features-list {
  position: relative;
}

.features-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
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
  border-top: 4px solid #4cc5bd;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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
  background: #4cc5bd;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.retry-button:hover {
  background: #3bb3ab;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .features-header {
    margin-bottom: 40px;
  }
}
</style>
