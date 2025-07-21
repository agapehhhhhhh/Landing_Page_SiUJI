<template>
  <section class="why-choose-section">
    <div class="container">
      <h2 class="section-title">Why Choose Us?</h2>
      <div class="content-wrapper">
        <!-- Gambar / Ilustrasi Kiri -->
        <div class="visual">
          <img src="@/assets/blob-haikei.svg" alt="Why Choose Visual" />
        </div>

        <!-- Fitur / Value Proposition Kanan -->
        <div class="features">
          <FeatureItem
            emoji="📡"
            title="Real-Time Monitoring"
            description="Embrace the power of real-time monitoring and take control of your learning journey with us."
          />
          <FeatureItem
            emoji="♾️"
            title="Lifetime Access"
            description="Your education is not bound by time; it's a lifelong pursuit, and we're here to support your journey every step of the way."
          />
          <FeatureItem
            emoji="👥"
            title="Big Community"
            description="Connect, collaborate, and share with a diverse group of peers, making your learning journey enriching and interactive."
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import FeatureItem from '@/components/sections/FeatureItem.vue'
</script>

<style scoped>
.why-choose-section {
  padding: 4rem 1rem;
  background: linear-gradient(to right, #f4fdfc, #e9f7f2);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
}
.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}
.visual {
  flex: 1 1 400px;
  display: flex;
  justify-content: center;
}
.visual img {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}
.features {
  flex: 1 1 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
}
</style>
