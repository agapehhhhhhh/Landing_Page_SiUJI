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
          <input type="text" v-model="form.name" placeholder="What is your name (or institution)? *" required />
          <input type="tel" v-model="form.phone" placeholder="What is your phone number? *" required />
          <input type="text" v-model="form.email" placeholder="Email address *" required />
          <textarea v-model="form.message" placeholder="Your message... *" required></textarea>
          <button type="submit" class="send-button" :disabled="sending">
            {{ sending ? 'Sending...' : 'Send Message >' }}
          </button>
          <div v-if="success" class="success-message" style="color: #fff; margin-top: 10px; font-weight: bold;">Pesan berhasil dikirim!</div>
          <div v-if="error" class="error-message" style="color: #ffdddd; margin-top: 10px; font-weight: bold;">{{ error }}</div>
        </form>
      </div>

      <!-- Right Column: Map -->
      <div class="map-column">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7744774219545!2d107.61524227414148!3d-6.917543767703492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9ccfaa20b87%3A0x737853f7eedf64a9!2sSomeah%20Kreatif%20Nusantara!5e0!3m2!1sid!2sid!4v1753412975191!5m2!1sid!2sid" width="800" height="600" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { sendContactMessage } from '@/services/payloadService'

const form = ref({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
})
const sending = ref(false)
const success = ref(false)
const error = ref('')

async function handleSubmit() {
  sending.value = true
  success.value = false
  error.value = ''
  try {
    await sendContactMessage(form.value)
    success.value = true
    form.value = { name: '', phone: '', email: '', subject: '', message: '' }
  } catch (err: any) {
    error.value = err.message || 'Network error'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.contact-section {
  background-color: white;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px); /* Jaga jarak atas-bawah tetap */
  box-sizing: border-box;
  font-family: 'Inter';
}

.contact-container {
  background-color: #38b2ac;
  padding: clamp(20px, 3vw, 40px);
  border-radius: 12px;
  width: clamp(300px, 90vw, 1550px);
  max-height: 85vh;
  min-height: clamp(500px, 70vh, 800px);
  display: flex;
  gap: clamp(20px, 4vw, 60px);
  align-items: stretch;
  background-image: url('@/assets/Isolation Mode.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right bottom;
  box-sizing: border-box;
  overflow: hidden;
}

.form-column {
  flex: 1;
  min-width: 280px;
  max-width: 50%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: visible;
  height: 100%;
}

.map-column {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Menyusun peta dari atas */
  padding-left: 0;
}

.map-column iframe {
  width: 100%;
  height: 100%;
  min-height: clamp(300px, 40vh, 400px);
  border-radius: 10px;
  display: block;
  margin-top: clamp(40px, 8vh, 90px);
}

.section-title {
  font-size: clamp(1.2rem, 3.5vw, 3rem);
  font-weight: bold;
  margin-bottom: clamp(8px, 1.5vw, 25px);
  margin-top: 0;
  line-height: 1.2;
}

.section-description {
  font-size: clamp(0.8rem, 1.1vw, 1.1rem);
  margin-bottom: clamp(12px, 2vw, 35px);
  line-height: 1.5;
  margin-top: 0;
}

.contact-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  padding: 0;
  overflow-y: auto;
  min-height: 0;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: clamp(8px, 1.2vw, 16px);
  margin-bottom: clamp(8px, 1.5vw, 20px);
  border-radius: 8px;
  border: 1px solid #555555;
  outline: none;
  font-size: clamp(0.8rem, 1vw, 1.1rem);
  box-sizing: border-box;
  margin-left: 0;
  margin-right: 0;
  flex-shrink: 0;
}

.contact-form textarea {
  resize: vertical;
  min-height: clamp(60px, 8vh, 120px);
  height: clamp(60px, 12vh, 150px);
  flex-grow: 1;
  max-height: clamp(120px, 20vh, 200px);
}

.send-button {
  background-color: white;
  color: #38b2ac;
  padding: clamp(8px, 1.2vw, 16px);
  font-weight: bold;
  border: 1px solid #555555;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: auto;
  width: 100%;
  box-sizing: border-box;
  display: block;
  margin-left: 0;
  margin-right: 0;
  font-size: clamp(0.8rem, 1vw, 1.1rem);
  flex-shrink: 0;
}


.send-button:hover {
  background-color: #f0f0f0;
}

@media (max-width: 700px) {
  .contact-section {
    min-height: 100vh;
    padding: 10px;
  }
  
  .contact-container {
    flex-direction: column;
    padding: clamp(16px, 3vw, 24px);
    gap: clamp(15px, 3vw, 25px);
    border-radius: 8px;
    align-items: stretch;
    width: 100%;
    height: auto;
    min-height: auto;
    max-height: none;
    overflow: visible;
  }
  
  .form-column,
  .map-column {
    min-width: 0;
    width: 100%;
    max-width: 100%;
    flex: none;
  }
  
  .map-column iframe {
    height: clamp(200px, 30vh, 280px);
    min-height: auto;
    margin-top: clamp(10px, 2vh, 20px) !important;
  }
  
  .section-title {
    font-size: clamp(1.4rem, 5vw, 1.8rem);
    margin-bottom: clamp(12px, 2vw, 18px);
    text-align: center;
  }
  
  .section-description {
    font-size: clamp(0.85rem, 3vw, 1rem);
    margin-bottom: clamp(16px, 3vw, 22px);
  }
  
  .contact-form input,
  .contact-form textarea {
    font-size: clamp(0.85rem, 3vw, 1rem);
    padding: clamp(8px, 2vw, 12px);
    margin-bottom: clamp(10px, 2vw, 16px);
  }
  
  .contact-form textarea {
    min-height: clamp(80px, 15vh, 120px);
    height: clamp(80px, 15vh, 120px);
  }
  
  .send-button {
    width: 100%;
    padding: clamp(10px, 2vw, 14px);
    font-size: clamp(0.9rem, 3vw, 1.1rem);
    margin-bottom: 0 !important;
    margin-top: clamp(6px, 1vh, 12px);
  }
  
  .contact-form {
    justify-content: flex-start;
    min-height: auto;
    overflow: visible;
  }
}

@media (max-width: 480px) {
  .contact-section {
    padding: 5px;
    min-height: 100vh;
  }
  
  .contact-container {
    padding: clamp(12px, 4vw, 20px);
    gap: clamp(12px, 3vw, 20px);
    margin: 0;
    border-radius: 6px;
  }
  
  .section-title {
    font-size: clamp(1.2rem, 6vw, 1.6rem);
    margin-bottom: clamp(8px, 2vw, 15px);
  }
  
  .section-description {
    font-size: clamp(0.8rem, 4vw, 0.95rem);
    margin-bottom: clamp(12px, 3vw, 18px);
  }
  
  .contact-form input,
  .contact-form textarea {
    font-size: clamp(0.8rem, 4vw, 0.95rem);
    padding: clamp(6px, 3vw, 10px);
    margin-bottom: clamp(8px, 2vw, 12px);
  }
}
</style>
