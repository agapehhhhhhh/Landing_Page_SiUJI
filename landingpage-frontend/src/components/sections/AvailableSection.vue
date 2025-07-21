<template>
  <section class="available-section">
    <h2 class="headline">Kini SIUJI Sudah Tersedia di 3 Platform Berbeda</h2>

    <div class="platform-toggle" role="tablist" aria-label="Platform Selector">
      <PlatformButton
        v-for="platform in platforms"
        :key="platform"
        :label="platform"
        :is-active="selectedPlatform === platform"
        @click="selectPlatform(platform)"
        role="tab"
        :aria-selected="selectedPlatform === platform"
      />
    </div>

    <transition name="fade" mode="out-in">
      <div class="mockup-container" :key="selectedPlatform">
        <img
          :src="mockupImage"
          :alt="`Mockup antarmuka SIUJI untuk ${selectedPlatform}`"
          class="mockup-image"
          loading="lazy"
        />
      </div>
    </transition>

    <div class="info-banner">
      <p class="info-text">
        {{ bannerText }}
      </p>
      <a :href="bannerButtonLink" target="_blank" rel="noopener" class="info-button">
        {{ bannerButtonLabel }}
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PlatformButton from '@/components/sections/PlatformButton.vue'

const platforms = ['Android', 'Website', 'IOS']
const selectedPlatform = ref('Website')

const selectPlatform = (platform: string) => {
  selectedPlatform.value = platform
}

const mockupImage = computed(() => {
  switch (selectedPlatform.value) {
    case 'Android':
      return new URL('@/assets/someah-logo.svg', import.meta.url).href
    case 'IOS':
      return new URL('@/assets/wavesOpacity.svg', import.meta.url).href
    default:
      return new URL('@/assets/blob-haikei.svg', import.meta.url).href
  }
})

const bannerText = computed(() => {
  switch (selectedPlatform.value) {
    case 'Android':
      return 'Akses SIUJI di Android: unduh melalui Google Play Store.'
    case 'IOS':
      return 'Akses SIUJI di perangkat iOS: unduh melalui App Store.'
    default:
      return 'Akses SIUJI melalui web browser untuk pengalaman cepat dan praktis.'
  }
})

const bannerButtonLabel = computed(() => {
  switch (selectedPlatform.value) {
    case 'Android':
      return '📱 Google Play'
    case 'IOS':
      return '🍎 App Store'
    default:
      return '🌐 Web Browser'
  }
})

const bannerButtonLink = computed(() => {
  switch (selectedPlatform.value) {
    case 'Android':
      return 'https://play.google.com/store/apps/details?id=com.siuji.app' // ganti dengan link asli
    case 'IOS':
      return 'https://apps.apple.com/app/siuji/id1234567890' // ganti dengan link asli
    default:
      return '#landing-section' // atau scroll ke element tertentu
  }
})

</script>

<style scoped>
.available-section {
  padding: 2rem 1rem;
  max-width: 960px;
  margin: auto;
  text-align: center;
}
.headline {
  font-size: 1.875rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
}
.platform-toggle {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}
.mockup-container {
  display: flex;
  justify-content: center;
}
.mockup-image {
  width: 100%;
  max-width: 680px;
  border-radius: 16px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}
.mockup-image:hover {
  transform: scale(1.01);
}
.info-banner {
  margin-top: 2.5rem;
  padding: 1.25rem 1.5rem;
  border-radius: 14px;
  border: 1px solid #000;
  background: linear-gradient(90deg, #1abc9c, #48c9b0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.info-text {
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.4;
  flex: 1 1 300px;
}
.info-button {
  background-color: white;
  color: black;
  border: 1px solid #000;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease;
}
.info-button:hover {
  background-color: #f2f2f2;
}
.web-icon {
  font-weight: 600;
  background-color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* Transition Fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
