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
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
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
  }

  .feature-title {
    font-size: 40px; /* Responsive size for tablet */
    margin-bottom: 24px;
    text-align: center;
    letter-spacing: -0.01em;
    line-height: 1.25;
  }

  .feature-description {
    font-size: 20px; /* Responsive size for tablet */
    text-align: center;
    line-height: 1.7;
    letter-spacing: 0.01em;
    word-spacing: 0.01em;
    margin: 0 auto;
    max-width: 90%;
    flex: none; /* Reset flex for mobile */
    display: block; /* Keep block display for mobile */
    overflow: visible; /* Allow normal text flow on mobile */
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
    font-size: 32px; /* Responsive size for mobile */
    margin-bottom: 20px;
    letter-spacing: -0.005em;
    line-height: 1.3;
  }

  .feature-description {
    font-size: 18px; /* Responsive size for mobile */
    line-height: 1.65;
    max-width: 95%;
  }

  .illustration-bg {
    max-width: 300px;
    height: 225px; /* 4:3 ratio (300/225 = 1.33) */
    padding: 10px;
  }
}
</style>
