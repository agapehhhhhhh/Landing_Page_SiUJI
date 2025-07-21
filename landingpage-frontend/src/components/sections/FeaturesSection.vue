<template>
  <section id="features" class="features-section">
    <div class="container">
      <h2 class="section-title">Fitur Unggulan</h2>
      <div class="features-grid">
        <div v-for="feature in data.features" :key="feature.title" class="feature-card">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ data: Object })
</script>
