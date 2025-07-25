<template>
  <section class="contact-section">
    <div class="contact-container">
      <!-- Left Column: Form Contact -->
      <div class="form-column">
        <h2 class="section-title">Get In Touch With us!</h2>
        <p class="section-description">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.
          Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus saut lioad sapati elit
          bumjerit mus.
        </p>
        
        <form class="contact-form" @submit.prevent="handleSubmit">
          <input type="text" v-model="form.name" placeholder="What is your name? *" required />
          <input type="tel" v-model="form.phone" placeholder="What is your phone number?" />
          <div class="input-group">
            <input type="text" v-model="form.email" placeholder="Email address" />
            <input type="text" v-model="form.subject" placeholder="Subject" />
          </div>
          <textarea v-model="form.message" placeholder="Your message..."></textarea>
          <button type="submit" class="send-button">Send Message &gt;</button>
        </form>
      </div>

      <!-- Right Column: Map -->
      <div class="map-column">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.774477421945!2d107.61524227414151!3d-6.91754376770348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9ccfaa20b87%3A0x737853f7eedf64a9!2sSomeah%20Kreatif%20Nusantara!5e0!3m2!1sid!2sid!4v1753319758283!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
})

function handleSubmit() {
  console.log('Form Submitted:', form.value)
  // TODO: Integrasi ke Payload CMS, Email API, dsb.
}
</script>

<style scoped>
.contact-section {
  background-color: white; /* Background putih */
  padding: 40px 0;
  display: flex;
  justify-content: center;
}

.contact-container {
  background-color: #38b2ac; /* Kotak hijau untuk background form */
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  gap: 40px;
}

.form-column {
  flex: 1;
  min-width: 300px;
  color: white;
}

.map-column {
  flex: 1;
  min-width: 300px;
  display: flex;
  align-items: center; /* Vertikal tengah */
}
.map-column iframe {
  display: block;
  max-width: 100%;
  height: 350px;
  border-radius: 10px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.section-description {
  font-size: 1rem;
  margin-bottom: 30px;
  line-height: 1.6;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 1rem;
}

.contact-form textarea {
  resize: vertical;
  min-height: 100px;
}

.input-group {
  display: flex;
  gap: 12px;
}

.input-group input {
  flex: 1;
}

.send-button {
  background-color: white;
  color: #38b2ac;
  padding: 12px 24px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.send-button:hover {
  background-color: #f0f0f0;
}

@media (max-width: 700px) {
  .contact-container {
    flex-direction: column;
    padding: 16px;
    gap: 24px;
    border-radius: 8px;
  }
  .form-column,
  .map-column {
    min-width: 0;
    width: 100%;
    padding: 0;
  }
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 14px;
  }
  .section-description {
    font-size: 0.95rem;
    margin-bottom: 18px;
  }
  .contact-form input,
  .contact-form textarea {
    font-size: 0.95rem;
    padding: 10px 12px;
    margin-bottom: 12px;
    width: 100%;
    box-sizing: border-box;
    max-width: 100%;
  }
  .input-group {
    flex-direction: column;
    gap: 8px;
  }
  .send-button {
    width: 100%;
    padding: 12px 0;
    font-size: 1rem;
  }
  .map-column {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
  }
  .map-column iframe {
    height: 220px;
    min-width: 0;
    max-width: 100%;
    border-radius: 8px;
  }
}
</style>