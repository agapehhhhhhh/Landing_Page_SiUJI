<template>
  <section class="testimonials-section">
    <div class="container">
      <h2 class="section-title">Apa Kata Klien Kami</h2>
      <div class="testimonials-grid">
        <div v-for="testimonial in data.testimonials" :key="testimonial.name" class="testimonial-card">
          <div class="stars">
            <span v-for="star in testimonial.rating" :key="star">⭐</span>
          </div>
          <p class="testimonial-message">"{{ testimonial.message }}"</p>
          <div class="testimonial-author">
            <strong>{{ testimonial.name }}</strong>
            <span>{{ testimonial.company }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ data: Object })
</script>
