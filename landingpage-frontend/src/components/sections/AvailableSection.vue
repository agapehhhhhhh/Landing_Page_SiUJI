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
        <span v-if="selectedPlatform === 'Android'" class="icon">
          <!-- SVG Google Play -->
          <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.793 13.2978L16.874 15.5158L13.359 12.0228L16.902 8.50178L20.793 10.7038C21.0226 10.8336 21.2137 11.0221 21.3466 11.25C21.4795 11.4779 21.5496 11.737 21.5496 12.0008C21.5496 12.2646 21.4795 12.5237 21.3466 12.7515C21.2137 12.9794 21.0226 13.1679 20.793 13.2978ZM0.112 0.923776C0.0381369 1.10404 9.51139e-05 1.29697 0 1.49178V22.5088C0 22.7258 0.0449999 22.9278 0.124 23.1088L11.279 12.0218L0.112 0.923776ZM12.319 10.9888L15.577 7.75078L2.225 0.194776C1.9387 0.0306085 1.60549 -0.0324416 1.279 0.0157761L12.319 10.9888ZM12.319 13.0558L1.319 23.9888C1.617 24.0248 1.931 23.9728 2.225 23.8058L15.549 16.2658L12.319 13.0558Z" fill="black"/>
          </svg>
        </span>
        <span v-else-if="selectedPlatform === 'IOS'" class="icon">
          <!-- SVG App Store -->
          <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6638 23.7034C15.3716 25.0065 13.9606 24.8007 12.6024 24.1835C11.1651 23.5525 9.84643 23.525 8.32999 24.1835C6.43114 25.0339 5.42897 24.787 4.29493 23.7034C-2.14006 16.8036 -1.19063 6.29621 6.11466 5.91212C7.89483 6.00814 9.13436 6.9272 10.1761 7.0095C11.7321 6.68029 13.2222 5.7338 14.8837 5.85725C16.8748 6.02186 18.3781 6.84489 19.3671 8.32635C15.2529 10.8915 16.2287 16.5293 20 18.1067C19.2484 20.1643 18.2726 22.2082 16.6506 23.7171L16.6638 23.7034ZM10.0442 5.82982C9.84643 2.77088 12.2332 0.24691 14.976 0C15.3584 3.53904 11.8903 6.17275 10.0442 5.82982Z" fill="black"/>
          </svg>
        </span>
        <span v-else class="icon">
          <!-- SVG Web Browser -->
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.8594 19.5532C20.8643 19.5459 20.8716 19.5386 20.8765 19.5312C22.4756 17.6294 23.4375 15.1782 23.4375 12.5C23.4375 9.82178 22.4756 7.37061 20.8789 5.46875C20.874 5.46143 20.8667 5.45654 20.8618 5.44922C20.835 5.41748 20.8105 5.38818 20.7837 5.35889C20.7739 5.34668 20.7642 5.33691 20.7544 5.32471L20.6543 5.20996L20.6519 5.20752C20.6152 5.16602 20.5762 5.12451 20.5396 5.08301L20.5371 5.08057C20.459 4.99756 20.3809 4.91455 20.3003 4.83398L20.2979 4.83154L20.1807 4.71436L20.1733 4.70703C20.1367 4.67041 20.1001 4.63623 20.0635 4.60205C20.0513 4.58984 20.0391 4.57764 20.0244 4.56543C20 4.54102 19.9756 4.51904 19.9512 4.49707C19.9438 4.48975 19.9341 4.48242 19.9268 4.47266C17.9785 2.66602 15.3687 1.5625 12.5 1.5625C9.63135 1.5625 7.02148 2.66602 5.0708 4.47266C5.06348 4.47998 5.05371 4.4873 5.04639 4.49707C5.02197 4.51904 4.99756 4.54346 4.97314 4.56787C4.96094 4.58008 4.94873 4.59229 4.93408 4.60449C4.89746 4.63867 4.86084 4.67529 4.82422 4.70947L4.81689 4.7168L4.69971 4.83398L4.69727 4.83643C4.6167 4.91699 4.53857 5 4.46045 5.08301L4.45801 5.08545C4.41895 5.12695 4.38232 5.16846 4.3457 5.20996L4.34326 5.2124C4.30908 5.24902 4.2749 5.28809 4.24316 5.32715C4.2334 5.33936 4.22363 5.34912 4.21387 5.36133C4.18701 5.39063 4.1626 5.42236 4.13574 5.45166C4.13086 5.45898 4.12354 5.46387 4.11865 5.47119C2.52441 7.37061 1.5625 9.82178 1.5625 12.5C1.5625 15.1782 2.52441 17.6294 4.12109 19.5312C4.12598 19.5386 4.1333 19.5459 4.13818 19.5532L4.21387 19.6436C4.22363 19.6558 4.2334 19.6655 4.24316 19.6777L4.34326 19.7925C4.34326 19.7949 4.3457 19.7949 4.3457 19.7974C4.38232 19.8389 4.41895 19.8804 4.45801 19.9194L4.46045 19.9219C4.53857 20.0049 4.6167 20.0879 4.69482 20.1685L4.69727 20.1709C4.73633 20.21 4.77295 20.249 4.81201 20.2856L4.81934 20.293C4.8999 20.3735 4.98291 20.4517 5.06592 20.5273C7.02148 22.334 9.63135 23.4375 12.5 23.4375C15.3687 23.4375 17.9785 22.334 19.9292 20.5273C20.0124 20.4511 20.0938 20.373 20.1733 20.293L20.1807 20.2856C20.2197 20.2466 20.2588 20.21 20.2954 20.1709L20.2979 20.1685C20.3784 20.0879 20.4565 20.0049 20.5322 19.9219L20.5347 19.9194C20.5713 19.8779 20.6104 19.8389 20.647 19.7974C20.647 19.7949 20.6494 19.7949 20.6494 19.7925C20.6836 19.7559 20.7178 19.7168 20.7495 19.6777C20.7593 19.6655 20.769 19.6558 20.7788 19.6436C20.8064 19.6141 20.8333 19.584 20.8594 19.5532ZM20.9595 16.0718C20.6226 16.8677 20.1782 17.605 19.6362 18.2739C19.0258 17.7464 18.3585 17.2886 17.6465 16.9092C17.9297 15.7642 18.1055 14.5068 18.1519 13.1836H21.6553C21.582 14.1821 21.3477 15.1514 20.9595 16.0718ZM21.6553 11.8164H18.1519C18.1055 10.4932 17.9297 9.23584 17.6465 8.09082C18.3618 7.70996 19.0283 7.25098 19.6362 6.72607C20.8144 8.17621 21.5191 9.95297 21.6553 11.8164ZM16.0718 4.04053C17.041 4.45068 17.9224 5.01709 18.6987 5.72998C18.2477 6.114 17.7623 6.45561 17.2485 6.75049C16.8652 5.65186 16.3745 4.69727 15.8032 3.93311C15.8936 3.96729 15.9839 4.00391 16.0718 4.04053ZM13.8599 21.145C13.6353 21.3208 13.4106 21.4551 13.1836 21.5454V17.0166C14.1523 17.0842 15.105 17.2999 16.0083 17.6562C15.8057 18.2568 15.5713 18.811 15.3003 19.3115C14.8755 20.1025 14.3774 20.7349 13.8599 21.145ZM15.3003 5.68848C15.5688 6.19141 15.8057 6.7456 16.0083 7.34375C15.105 7.70009 14.1523 7.91581 13.1836 7.9834V3.45703C13.4082 3.54736 13.6353 3.6792 13.8599 3.85742C14.3774 4.26514 14.8755 4.89746 15.3003 5.68848ZM13.1836 15.647V13.1836H16.7847C16.7456 14.2627 16.6113 15.3101 16.3867 16.3037L16.3794 16.333C15.3548 15.9445 14.2774 15.7132 13.1836 15.647ZM13.1836 11.8164V9.35303C14.3018 9.28467 15.376 9.04785 16.3794 8.66699L16.3867 8.69629C16.6113 9.68994 16.7456 10.7349 16.7847 11.8164H13.1836ZM11.8164 13.1836V15.647C10.6982 15.7153 9.62402 15.9521 8.62061 16.333L8.61328 16.3037C8.38867 15.3101 8.25439 14.2651 8.21533 13.1836H11.8164ZM8.21533 11.8164C8.25439 10.7373 8.38867 9.68994 8.61328 8.69629L8.62061 8.66699C9.62402 9.04785 10.6958 9.28467 11.8164 9.35303V11.8164H8.21533ZM11.8164 17.0166V21.543C11.5918 21.4526 11.3647 21.3208 11.1401 21.1426C10.6226 20.7349 10.1221 20.1001 9.69727 19.3091C9.42871 18.8062 9.1919 18.252 8.98926 17.6538C9.89746 17.2974 10.8423 17.085 11.8164 17.0166ZM11.8164 7.9834C10.8477 7.91581 9.89504 7.70009 8.9917 7.34375C9.19434 6.74316 9.42871 6.18896 9.69971 5.68848C10.1245 4.89746 10.6226 4.2627 11.1426 3.85498C11.3672 3.6792 11.5918 3.54492 11.8188 3.45459V7.9834H11.8164ZM8.92822 4.04053C9.01856 4.00391 9.10645 3.96729 9.19678 3.93311C8.62549 4.69727 8.13477 5.65186 7.75146 6.75049C7.23877 6.45752 6.75293 6.11572 6.30127 5.72998C7.07764 5.01709 7.95898 4.45068 8.92822 4.04053ZM4.04053 8.92822C4.37744 8.13232 4.82178 7.39502 5.36377 6.72607C5.97168 7.25098 6.63818 7.70996 7.35352 8.09082C7.07031 9.23584 6.89453 10.4932 6.84814 11.8164H3.34473C3.41797 10.8179 3.65234 9.84863 4.04053 8.92822ZM3.34473 13.1836H6.84814C6.89453 14.5068 7.07031 15.7642 7.35352 16.9092C6.64155 17.2886 5.97416 17.7464 5.36377 18.2739C4.18562 16.8238 3.48088 15.047 3.34473 13.1836ZM8.92822 20.9595C7.95898 20.5493 7.07764 19.9829 6.30127 19.27C6.75293 18.8843 7.23877 18.5449 7.75146 18.2495C8.13477 19.3481 8.62549 20.3027 9.19678 21.0669C9.10645 21.0327 9.01611 20.9961 8.92822 20.9595ZM16.0718 20.9595C15.9814 20.9961 15.8936 21.0327 15.8032 21.0669C16.3745 20.3027 16.8652 19.3481 17.2485 18.2495C17.7612 18.5425 18.2471 18.8843 18.6987 19.27C17.9267 19.9799 17.038 20.5515 16.0718 20.9595Z" fill="black"/>
          </svg>
        </span>
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
  align-items: center;
  min-height: 400px; /* ✨ jaga jarak atas-bawah tetap */
  margin-bottom: 2rem;
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease;
  vertical-align: middle;
  margin-right: 8px;
  height: 22px;
}
.info-button svg {
  display: block;
  height: 22px;
  width: auto;
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
  .info-button {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    justify-content: center;
    font-size: 0.9rem;
    padding: 0.6rem 0.5rem;
    margin: 0;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  .info-button .icon svg {
    height: 18px;
    width: auto;
    min-width: 16px;
    max-width: 22px;
  }
  .info-button .icon {
    margin-right: 6px;
    height: 18px;
  }
}
</style>
