<template>
  <section class="available-section">
    <h2 class="headline">Kini SIUJI sudah tersedia di 3 platform</h2>

    <div class="platform-toggle">
      <PlatformButton
        v-for="platform in platforms"
        :key="platform"
        :label="platform"
        :is-active="selectedPlatform === platform"
        @click="selectPlatform(platform)"
      />
    </div>

    <div class="mockup-container">
      <img
        :src="mockupImage"
        :alt="`Mockup ${selectedPlatform}`"
        class="mockup-image"
      />
    </div>

    <div class="info-banner">
      <p>
        Akses SIUJI sesuai kebutuhan Anda: melalui web browser untuk akses cepat,
        atau unduh aplikasi di Android dan iOS.
      </p>
      <div class="web-icon">🌐 Web Browser</div>
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
</script>

<style scoped>
.available-section {
  padding: 2rem 1rem;
  text-align: center;
}
.headline {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  font-weight: 600;
}
.platform-toggle {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.mockup-container {
  display: flex;
  justify-content: center;
}
.mockup-image {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
.info-banner {
  margin-top: 2rem;
  padding: 1rem;
  background-color: #d9fdd3;
  border-radius: 12px;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.web-icon {
  font-weight: bold;
  background-color: white;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>
