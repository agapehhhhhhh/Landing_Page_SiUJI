<template>
  <div class="feature-item" :class="{ reverse: layout === 'left' }">
    <!-- Feature Text -->
    <div class="feature-text">
      <div class="title-container">
        <div class="title-ellipse">
          <img src="@/assets/Ellipse-Hero3.svg" alt="Decoration" />
        </div>
        <h3 class="feature-title">{{ featureTitle }}</h3>
      </div>
      <p class="feature-description">{{ description }}</p>

      <!-- Feature Points -->
      <div
        class="feature-points"
        v-if="featurePoints && featurePoints.length > 0"
      >
        <div
          v-for="(point, index) in featurePoints"
          :key="index"
          class="feature-point"
        >
          <div class="feature-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#4CC5BD"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="feature-point-text">{{ point }}</span>
        </div>
      </div>
    </div>

    <!-- Illustration -->
    <div class="feature-illustration">
      <div class="illustration-container">
        <!-- Decorative Ellipses -->
        <div class="ellipse-decoration ellipse-1">
          <img src="@/assets/Ellipse-Hero.svg" alt="Decoration" />
        </div>
        <div class="ellipse-decoration ellipse-2">
          <img src="@/assets/Ellipse-Hero2.svg" alt="Decoration" />
        </div>

        <div class="illustration-bg">
          <img :src="imageSrc" :alt="featureTitle" class="illustration-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  featureTitle: {
    type: String,
    default: "Manajemen Siswa & Kelas",
  },
  description: {
    type: String,
    default:
      "Mengelola data siswa dan kelas lebih mudah dan terpusat, tanpa pencatatan manual yang rawan tercecer.",
  },
  featurePoints: {
    type: Array,
    default: () => [
      "Manajemen data siswa dan kelas dalam satu sistem digital terpusat",
      "Pengaturan jadwal belajar dan wali kelas yang fleksibel dan efisien",
      "Akses cepat dan terstruktur ke informasi akademik",
    ],
  },
  imageSrc: {
    type: String,
    default: "/assets/ilustrasi-hero.png",
  },
  layout: {
    type: String,
    default: "right", // 'right' or 'left'
    validator: (value) => ["right", "left"].includes(value),
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

/* Content Layout */
.feature-item {
  display: grid;
  grid-template-columns: 1.5fr 0.5fr; /* Give much more space to text column */
  gap: 80px; /* Reduced gap since we're giving more space to text */
  align-items: flex-start; /* Changed from center to flex-start for consistent alignment */
  padding: 100px 0; /* Increased to 100px for spacing between features */
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
}

.feature-item.reverse {
  direction: rtl;
}

.feature-item.reverse > * {
  direction: ltr;
}

/* Feature Text */
.feature-text {
  max-width: 800px; /* Increased max-width for more text space */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Changed from center to flex-start */
  height: 390px; /* Fixed height to match image height exactly */
  padding-right: 20px; /* Reduced padding since we have more space */
}

/* Feature Text - Layout Right (default) */
.feature-item:not(.reverse) .feature-text {
  padding-left: 0; /* Remove left padding to use full width */
  padding-right: 40px; /* Add right padding for spacing */
}

/* Feature Text - Layout Left (reverse) */
.feature-item.reverse .feature-text {
  padding-right: 0; /* Remove right padding to use full width */
  padding-left: 40px; /* Add left padding for spacing */
}

/* Title Container with Ellipse */
.title-container {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 28px;
}

.title-ellipse {
  position: absolute;
  left: -180px; /* Move further to the left */
  top: 50px; /* Moved down by 15px more (35 + 15) */
  z-index: 1;
}

.title-ellipse img {
  width: 60px;
  height: 60px;
  filter: brightness(0) saturate(100%) invert(70%) sepia(32%) saturate(849%)
    hue-rotate(136deg) brightness(91%) contrast(88%);
}

.feature-item.reverse .title-ellipse {
  left: auto;
  right: 450px; /* Move further to the left for reverse layout */
  top: 50px; /* Moved down by 15px more (35 + 15) */
}

/* Feature Title - Layout Right (gambar di kanan) */
.feature-item:not(.reverse) .feature-title {
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 0; /* Remove margin since container handles it */
  color: #1f2937;
  line-height: 1.2;
  text-align: left;
  letter-spacing: -0.02em;
  font-family: "Inter", sans-serif;
  margin-left: -150px;
  position: relative;
  z-index: 2;
}

/* Feature Title - Layout Left (gambar di kiri) */
.feature-item.reverse .feature-title {
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 0; /* Remove margin since container handles it */
  color: #1f2937;
  line-height: 1.2;
  text-align: left;
  letter-spacing: -0.02em;
  font-family: "Inter", sans-serif;
  position: relative;
  z-index: 2;
}

/* Feature Description - Layout Right (gambar di kanan) */
.feature-item:not(.reverse) .feature-description {
  font-size: 18px;
  line-height: 1.6;
  color: #6b7280;
  text-align: left;
  letter-spacing: 0.015em;
  word-spacing: 0.02em;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga", "kern";
  font-family: "Inter", sans-serif;
  margin-bottom: 32px;
  display: block;
  margin-left: -150px;
}

/* Feature Description - Layout Left (gambar di kiri) */
.feature-item.reverse .feature-description {
  font-size: 18px;
  line-height: 1.6;
  color: #6b7280;
  text-align: left;
  letter-spacing: 0.015em;
  word-spacing: 0.02em;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga", "kern";
  font-family: "Inter", sans-serif;
  margin-bottom: 32px;
  display: block;
  overflow: hidden;
  margin-right: -150px; /* Different margin for reverse layout */
}

/* Feature Points */
.feature-points {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-left: -150px;
}

.feature-item.reverse .feature-points {
  margin-left: 0;
  margin-right: -150px;
}

.feature-point {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.feature-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-top: 2px;
}

.feature-point-text {
  font-size: 16px;
  line-height: 1.5;
  color: #4a5568;
  font-family: "Inter", sans-serif;
  flex: 1;
}

/* Illustration */
.feature-illustration {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* Illustration positioning for different layouts */
.feature-item:not(.reverse) .feature-illustration {
  transform: translateX(203px); /* Keep photo position unchanged */
}

.feature-item.reverse .feature-illustration {
  transform: translateX(-203px); /* Keep photo position unchanged */
}

.illustration-container {
  position: relative;
  width: 600px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illustration-bg {
  position: relative;
  z-index: 4; /* Bring background container above ellipses */
  width: 520px;
  height: 390px; /* 4:3 aspect ratio (520/390 = 1.33) */
  background: linear-gradient(135deg, #4cc5bd 0%, #4cc5bd 100%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-shadow: 0 25px 50px -12px rgba(76, 197, 189, 0.35);
}

.illustration-bg::before {
  content: "";
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: radial-gradient(
    circle,
    rgba(76, 197, 189, 0.15) 0%,
    rgba(76, 197, 189, 0.05) 40%,
    transparent 70%
  );
  border-radius: 44px;
  z-index: -1;
  filter: blur(20px);
}

.illustration-image {
  position: relative;
  z-index: 5; /* Ensure image is on top of ellipses */
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
}

/* Decorative Ellipses */
.ellipse-decoration {
  position: absolute;
  pointer-events: none;
}

.ellipse-decoration img {
  width: 100%;
  height: 100%;
}

/* Ellipse 1 - Top Left - Warna hijau terang #6BC2A1 */
/* Highest ellipse */
.ellipse-1 {
  top: 300px;
  left: 485px;
  width: 140px;
  height: 140px;
  opacity: 0.8;
  /* floating animation removed */
  z-index: 3;
}

.ellipse-1 img {
  filter: brightness(0) saturate(100%) invert(70%) sepia(32%) saturate(849%)
    hue-rotate(136deg) brightness(91%) contrast(88%);
}

/* Ellipse 2 - Top Right - Warna hijau sedang #4CC5BD */
/* Middle ellipse */
.ellipse-2 {
  top: -35px;
  right: 515px;
  width: 100px;
  height: 100px;
  opacity: 0.9;
  /* floating animation removed */
  z-index: 2;
}

.ellipse-2 img {
  filter: brightness(0) saturate(100%) invert(70%) sepia(32%) saturate(849%)
    hue-rotate(136deg) brightness(91%) contrast(88%);
}

/* Floating animation for ellipses */

/* Slower floating animation for rectangles */

/* Responsive */
@media (max-width: 768px) {
  .feature-item {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 60px 0; /* Increased from 40px to 60px for mobile spacing */
    align-items: center; /* Reset to center for mobile */
  }

  .feature-item.reverse {
    direction: ltr;
  }

  .feature-text {
    max-width: 100%;
    text-align: left;
    padding: 0 15px;
    height: auto; /* Remove fixed height on mobile */
    justify-content: center; /* Reset to center for mobile */
  }

  /* Reset positioning for mobile */
  .feature-item:not(.reverse) .feature-illustration,
  .feature-item.reverse .feature-illustration {
    transform: none; /* Remove transform on mobile */
  }

  /* Reset padding for mobile - both layouts */
  .feature-item:not(.reverse) .feature-text,
  .feature-item.reverse .feature-text {
    padding-left: 15px;
    padding-right: 15px;
    margin-left: 0 !important; /* Override any negative margins */
    margin-right: 0 !important; /* Override any negative margins */
  }

  .feature-title {
    font-size: 40px; /* Responsive size for tablet */
    margin-bottom: 0; /* Container handles margin */
    text-align: left;
    letter-spacing: -0.01em;
    line-height: 1.25;
    margin-left: 0 !important; /* Override negative margin */
    margin-right: 0 !important; /* Override negative margin */
  }

  .title-container {
    margin-bottom: 24px;
  }

  .title-ellipse img {
    width: 48px; /* Proportional to tablet font size */
    height: 48px;
  }

  .title-ellipse {
    left: -90px; /* Move further to the left for tablet */
    top: 47px; /* Moved down by 15px more (32 + 15) */
  }

  .feature-item.reverse .title-ellipse {
    right: -90px; /* Move further to the left for reverse layout on tablet */
    top: 47px; /* Moved down by 15px more (32 + 15) */
  }

  .feature-description {
    font-size: 18px; /* Responsive size for tablet */
    text-align: left;
    line-height: 1.6;
    letter-spacing: 0.01em;
    word-spacing: 0.01em;
    margin: 0 auto;
    max-width: 100%;
    flex: none; /* Reset flex for mobile */
    display: block; /* Keep block display for mobile */
    overflow: visible; /* Allow normal text flow on mobile */
    padding: 0 20px; /* Add horizontal padding */
    margin-left: 0 !important; /* Override negative margin */
    margin-right: 0 !important; /* Override negative margin */
  }

  .illustration-container {
    width: 100%;
    max-width: 400px;
    height: auto;
    margin: 0 auto;
  }

  .illustration-bg {
    width: 100%;
    max-width: 360px;
    height: 270px; /* 4:3 ratio (360/270 = 1.33) */
    padding: 12px;
    margin: 0 auto;
  }

  .feature-illustration {
    order: -1;
  }
}

@media (max-width: 480px) {
  .feature-title {
    font-size: 28px !important; /* Smaller size for mobile with important */
    margin-bottom: 0; /* Container handles margin */
    letter-spacing: -0.005em;
    line-height: 1.3;
    margin-left: 0 !important; /* Override negative margin */
    margin-right: 0 !important; /* Override negative margin */
    padding: 0 10px; /* Reduced padding for better left alignment */
  }

  .title-container {
    margin-bottom: 16px;
    padding: 0 5px; /* Reduced padding to match title */
  }

  .title-ellipse img {
    width: 36px; /* Proportional to mobile font size */
    height: 36px;
  }

  .title-ellipse {
    left: -2px; /* Position for mobile */
    top: 28px; /* Raised position for mobile */
  }

  .feature-item.reverse .title-ellipse {
    left: -2px; /* Same position as regular layout on mobile */
    right: auto; /* Reset right positioning */
    top: 28px; /* Same position as regular layout on mobile */
  }

  .feature-description {
    font-size: 16px !important; /* Smaller size for mobile with important */
    line-height: 1.6;
    max-width: 100%;
    padding: 0 15px !important; /* Consistent padding with important */
    text-align: left; /* Left align for better mobile readability */
    text-justify: none; /* Remove justify for mobile */
    margin-left: 0 !important; /* Override negative margin */
    margin-right: 0 !important; /* Override negative margin */
    margin-bottom: 24px !important;
  }

  .feature-points {
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding: 0 15px;
  }

  .feature-point {
    gap: 12px;
  }

  .feature-point-text {
    font-size: 14px;
  }

  .feature-text {
    padding: 0 10px !important; /* Consistent padding for text container */
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .illustration-bg {
    max-width: 300px;
    height: 225px; /* 4:3 ratio (300/225 = 1.33) */
    padding: 10px;
  }
}

/* Mobile adjustments for ellipses */
@media (max-width: 768px) {
  .ellipse-decoration {
    /* Keep ellipses at full size for mobile like desktop */
    transform: none;
  }

  /* Keep similar proportions to desktop */
  .ellipse-1 {
    top: 200px;
    left: 280px;
    width: 120px; /* Larger size, closer to desktop */
    height: 120px;
  }

  .ellipse-2 {
    top: -25px;
    right: 290px;
    width: 80px; /* Larger size, closer to desktop */
    height: 80px;
  }
}

@media (max-width: 480px) {
  .ellipse-decoration {
    /* Remove the scale reduction to keep ellipses visible */
    transform: none;
  }

  .ellipse-1 {
    top: 170px;
    left: 285px;
    width: 100px; /* Still substantial size for mobile */
    height: 100px;
  }

  .ellipse-2 {
    top: -15px;
    right: 300px;
    width: 70px; /* Still substantial size for mobile */
    height: 70px;
  }
}
</style>
