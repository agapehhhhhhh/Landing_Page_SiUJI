<template>
  <div class="feature-item" :class="{ reverse: layout === 'left' }">
    <!-- Feature Text -->
    <div class="feature-text">
      <h3 class="feature-title">{{ featureTitle }}</h3>
      <p class="feature-description">{{ description }}</p>
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
        <div class="ellipse-decoration ellipse-3">
          <img src="@/assets/Ellipse-Hero3.svg" alt="Decoration" />
        </div>

        <!-- Rectangle Background Decoration -->
        <div class="rectangle-decoration rectangle-1">
          <img src="@/assets/Rectangle-hero.svg" alt="Background Decoration" />
        </div>
        <div class="rectangle-decoration rectangle-2">
          <img src="@/assets/Rectangle-hero.svg" alt="Background Decoration" />
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
    default: "Sistem Pembelajaran Digital Terdepan untuk Masa Depan Pendidikan",
  },
  description: {
    type: String,
    default:
      "SiUJI hadir sebagai solusi pembelajaran digital yang revolusioner, menggabungkan teknologi canggih dengan metode pengajaran inovatif. Platform kami menyediakan pengalaman belajar yang interaktif dan personal, memungkinkan siswa untuk mengakses materi pembelajaran berkualitas tinggi kapan saja dan di mana saja. Dengan fitur-fitur seperti ujian online yang adaptif, tracking progress real-time, dan sistem manajemen kelas yang terintegrasi, SiUJI membantu meningkatkan efektivitas pembelajaran sambil memberikan kemudahan bagi guru dan siswa dalam mencapai tujuan akademik mereka.",
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

/* Feature Title - Layout Right (gambar di kanan) */
.feature-item:not(.reverse) .feature-title {
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 28px;
  color: #1f2937;
  line-height: 1.2;
  text-align: left;
  letter-spacing: -0.02em;
  font-family: "Inter", sans-serif;
  margin-left: -150px;
}

/* Feature Title - Layout Left (gambar di kiri) */
.feature-item.reverse .feature-title {
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 28px;
  color: #1f2937;
  line-height: 1.2;
  text-align: left;
  letter-spacing: -0.02em;
  font-family: "Inter", sans-serif;
}

/* Feature Description - Layout Right (gambar di kanan) */
.feature-item:not(.reverse) .feature-description {
  font-size: 24px;
  line-height: 1.5;
  color: #6b7280;
  text-align: left;
  letter-spacing: 0.015em;
  word-spacing: 0.02em;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga", "kern";
  font-family: "Inter", sans-serif;
  flex: 1;
  display: block;
  margin-left: -150px;
}

/* Feature Description - Layout Left (gambar di kiri) */
.feature-item.reverse .feature-description {
  font-size: 24px;
  line-height: 1.5;
  color: #6b7280;
  text-align: left;
  letter-spacing: 0.015em;
  word-spacing: 0.02em;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga", "kern";
  font-family: "Inter", sans-serif;
  flex: 1;
  display: block;
  overflow: hidden;
  margin-right: -150px; /* Different margin for reverse layout */
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
  background: linear-gradient(135deg, #4cc5bd 0%, #3bb3ab 100%);
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
  top: 350px;
  left: 515px;
  width: 140px;
  height: 140px;
  opacity: 0.8;
  animation: float 6s ease-in-out infinite;
  z-index: 3;
}

.ellipse-1 img {
  filter: brightness(0) saturate(100%) invert(65%) sepia(45%) saturate(347%)
    hue-rotate(120deg) brightness(96%) contrast(89%);
}

/* Ellipse 2 - Top Right - Warna hijau sedang #4CC5BD */
/* Middle ellipse */
.ellipse-2 {
  top: -60px;
  right: 525px;
  width: 100px;
  height: 100px;
  opacity: 0.9;
  animation: float 4s ease-in-out infinite 1s;
  z-index: 2;
}

.ellipse-2 img {
  filter: brightness(0) saturate(100%) invert(70%) sepia(32%) saturate(849%)
    hue-rotate(136deg) brightness(91%) contrast(88%);
}

/* Ellipse 3 - Bottom Left - Warna hijau terang #6BC2A1 */
/* Lowest ellipse */
.ellipse-3 {
  bottom: 365px;
  left: -50px;
  width: 120px;
  height: 120px;
  opacity: 0.7;
  animation: float 5s ease-in-out infinite 2s;
  z-index: 1;
}

.ellipse-3 img {
  filter: brightness(0) saturate(100%) invert(65%) sepia(45%) saturate(347%)
    hue-rotate(120deg) brightness(96%) contrast(89%);
}

/* Rectangle Background Decorations */
.rectangle-decoration {
  position: absolute;
  z-index: 0;
  pointer-events: none;
  opacity: 0.4;
}

.rectangle-decoration img {
  width: 100%;
  height: 100%;
  filter: brightness(0) saturate(100%) invert(70%) sepia(32%) saturate(849%)
    hue-rotate(136deg) brightness(91%) contrast(88%);
}

/* Rectangle 1 - Behind and to the left */
.rectangle-1 {
  top: 60px;
  left: -120px;
  width: 180px;
  height: 120px;
  transform: rotate(-15deg);
  animation: floatSlow 8s ease-in-out infinite;
}

/* Rectangle 2 - Behind and to the right */
.rectangle-2 {
  bottom: 80px;
  right: -100px;
  width: 160px;
  height: 100px;
  transform: rotate(20deg);
  animation: floatSlowReverse 7s ease-in-out infinite 3s;
}

/* Floating animation for ellipses */
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

/* Slower floating animation for rectangles */
@keyframes floatSlow {
  0%,
  100% {
    transform: translateY(0) rotate(-15deg);
  }
  50% {
    transform: translateY(-10px) rotate(-10deg);
  }
}

@keyframes floatSlowReverse {
  0%,
  100% {
    transform: translateY(0) rotate(20deg);
  }
  50% {
    transform: translateY(-8px) rotate(25deg);
  }
}

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
    text-align: center;
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
    margin-bottom: 24px;
    text-align: center;
    letter-spacing: -0.01em;
    line-height: 1.25;
    margin-left: 0 !important; /* Override negative margin */
    margin-right: 0 !important; /* Override negative margin */
  }

  .feature-description {
    font-size: 18px; /* Responsive size for tablet */
    text-align: center;
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
    margin-bottom: 16px;
    letter-spacing: -0.005em;
    line-height: 1.3;
    margin-left: 0 !important; /* Override negative margin */
    margin-right: 0 !important; /* Override negative margin */
    padding: 0 15px; /* Add padding for better spacing */
  }

  .feature-description {
    font-size: 14px !important; /* Smaller size for mobile with important */
    line-height: 1.6;
    max-width: 100%;
    padding: 0 15px !important; /* Consistent padding with important */
    text-align: left; /* Left align for better mobile readability */
    text-justify: none; /* Remove justify for mobile */
    margin-left: 0 !important; /* Override negative margin */
    margin-right: 0 !important; /* Override negative margin */
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
    /* Remove generic scaling to fine-tune positions */
    transform: none;
  }

  /* Scaled desktop positions */
  .ellipse-1 {
    top: 210px;    /* ~350px * 0.6 */
    left: 310px;   /* ~515px * 0.6 */
    width: 84px;   /* 140px * 0.6 */
    height: 84px;  /* 140px * 0.6 */
  }

  .ellipse-2 {
    top: -36px;    /* -60px * 0.6 */
    right: 315px;  /* 525px * 0.6 */
    width: 60px;   /* 100px * 0.6 */
    height: 60px;  /* 100px * 0.6 */
  }

  .ellipse-3 {
    bottom: 35px;  /* 365px bottom -> 35px from bottom */
    left: -30px;   /* -50px * 0.6 */
    width: 72px;   /* 120px * 0.6 */
    height: 72px;  /* 120px * 0.6 */
  }

  /* Rectangle adjustments for tablet */
  .rectangle-decoration {
    transform: scale(0.7);
  }

  .rectangle-1 {
    left: -80px;
    width: 120px;
    height: 80px;
  }

  .rectangle-2 {
    right: -60px;
    width: 100px;
    height: 70px;
  }
}

@media (max-width: 480px) {
  .ellipse-decoration {
    transform: scale(0.4);
  }

  .ellipse-1 {
    top: -20px;
    left: -25px;
  }

  .ellipse-2 {
    top: -10px;
    right: -15px;
  }

  .ellipse-3 {
    bottom: -15px;
    left: -10px;
  }

  /* Rectangle adjustments for mobile */
  .rectangle-decoration {
    transform: scale(0.5);
    opacity: 0.2;
  }

  .rectangle-1 {
    left: -50px;
    top: 40px;
  }

  .rectangle-2 {
    right: -40px;
    bottom: 50px;
  }
}
</style>
