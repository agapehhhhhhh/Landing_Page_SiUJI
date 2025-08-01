<template>
  <section class="available-section">
    <div class="available-wrapper">
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
          <div class="mockup-wrapper">
            <img
              :src="mockupImage"
              :alt="`Mockup antarmuka SIUJI untuk ${selectedPlatform}`"
              class="mockup-image"
              loading="lazy"
            />
          </div>
        </div>
      </transition>

      <div class="info-banner">
        <p class="info-text">
          {{ bannerText }}
        </p>
        <div class="download-button">
          <DownloadButton 
            :type="buttonType"
            :url="bannerButtonLink"
            :label="bannerButtonLabel"
            @click="handleButtonClick"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PlatformButton from '@/components/sections/PlatformButton.vue'
import DownloadButton from '@/components/common/DownloadButton.vue'

const platforms = ['Android', 'Website', 'IOS']
const selectedPlatform = ref('Website')

const selectPlatform = (platform: string) => {
  selectedPlatform.value = platform
}

const mockupImage = computed(() => {
  switch (selectedPlatform.value) {
    case 'Android':
      return new URL('@/assets/Android_robot.svg.png', import.meta.url).href
    case 'IOS':
      return new URL('@/assets/iOS.jpg', import.meta.url).href
    default:
      return new URL('@/assets/dashboard.png', import.meta.url).href
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
      return 'Google Play'
    case 'IOS':
      return 'App Store'
    default:
      return 'Web Browser'
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

const buttonType = computed(() => {
  switch (selectedPlatform.value) {
    case 'Android':
      return 'googleplay' as const
    case 'IOS':
      return 'appstore' as const
    default:
      return 'web' as const
  }
})

const handleButtonClick = (url: string) => {
  console.log('Button clicked with URL:', url)
}

</script>

<style scoped>
.available-section {
  padding: 2rem 1rem;
  width: 100vw;
  min-height: calc(100vh - 80px); /* ✨ jaga jarak atas-bawah tetap */
  margin: auto;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  align-items: center; /* Vertikal center */
  justify-content: center;
  background-color: white;
  font-family: 'Inter';
}
.available-wrapper {
  max-width: clamp(1000px, 85vw, 1400px);
  width: 100%;
  margin: 0 auto;
}
.headline {
  font-size: clamp(1.6rem, 2.2vw + 0.8rem, 2.8rem);
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
  align-items: center;
  min-height: 350px; /* ✨ jaga jarak atas-bawah tetap */
  margin-bottom: 2rem;
}
.mockup-wrapper {
  width: 100%;
  max-width: clamp(350px, 65vw, 900px);
  aspect-ratio: 16 / 9; /* ⬅️ Rasio tetap */
  position: relative;
}
.mockup-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* ✅ Skala proporsional */
  border-radius: 16px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}
.mockup-image:hover {
  transform: scale(1.01);
}
.info-banner {
  margin-top: clamp(1.2rem, 2vw, 2.2rem);
  margin-left: auto;
  margin-right: auto;
  max-width: clamp(700px, 70vw, 1200px);
  padding: clamp(0.8rem, 1.5vw, 1.6rem) clamp(1.2rem, 2vw, 2rem);
  border-radius: 13px;
  border: 1px solid #555555;
  background: linear-gradient(90deg, #5ec7c0, #4CC5BD);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.info-text {
  color: white;
  font-weight: 600;
  font-size: clamp(0.9rem, 0.8vw + 0.4rem, 1.1rem);
  line-height: 1.5;
  flex: 1 1 300px;
}
.download-button {
  border-radius: 10px;
  border: 1px solid #555555;
}

/* Transition Fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .available-section {
    padding: 1rem 0.5rem;
    max-width: 100vw;
  }
  .headline {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
  .platform-toggle {
    gap: 0.5rem;
    margin-bottom: 1.2rem;
    flex-wrap: wrap;
  }
  .mockup-container {
    min-height: 180px;
    margin-bottom: 1.2rem;
  }
  .mockup-image {
    max-width: 95vw;
    border-radius: 10px;
  }
  .info-banner {
    flex-direction: column;
    align-items: stretch;
    gap: 0.7rem;
    padding: 1rem 0.7rem;
    margin-top: 1.2rem;
    font-size: 0.95rem;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }
  .info-text {
    font-size: 0.9rem;
    flex: unset;
    margin-bottom: 0.5rem;
  }
}
</style>
