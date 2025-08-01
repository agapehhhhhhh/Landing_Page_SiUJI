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
          <!-- Success Message -->
          <div v-if="formState.isSuccess" class="success-message">
            <p>{{ formState.successMessage }}</p>
          </div>

          <!-- Error Message -->
          <div v-if="formState.isError" class="error-message">
            <p>{{ formState.errorMessage }}</p>
          </div>

          <input 
            type="text" 
            v-model="form.name" 
            placeholder="What is your name (or institution)? *" 
            required 
            :disabled="formState.isSubmitting"
          />
          <input 
            type="tel" 
            v-model="form.phone" 
            placeholder="What is your phone number? *" 
            required 
            :disabled="formState.isSubmitting"
          />
          <input 
            type="email" 
            v-model="form.email" 
            placeholder="Email address *" 
            required 
            :disabled="formState.isSubmitting"
          />
          <textarea 
            v-model="form.message" 
            placeholder="Your message... *" 
            required
            :disabled="formState.isSubmitting"
          ></textarea>
          <button 
            type="submit" 
            class="send-button" 
            :disabled="formState.isSubmitting"
          >
            <span v-if="formState.isSubmitting">Sending...</span>
            <span v-else>Send Message &gt;</span>
          </button>
        </form>
      </div>

      <!-- Right Column: Map -->
      <div class="map-column">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7744774219545!2d107.61524227414148!3d-6.917543767703492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9ccfaa20b87%3A0x737853f7eedf64a9!2sSomeah%20Kreatif%20Nusantara!5e0!3m2!1sid!2sid!4v1753412975191!5m2!1sid!2sid" 
          width="800" 
          height="600" 
          style="border:0;" 
          :allowfullscreen="true" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { submitContactForm } from '@/services/payloadService'

const form = ref({
  name: '',
  phone: '',
  email: '',
  message: '',
})

const formState = ref({
  isSubmitting: false,
  isSuccess: false,
  isError: false,
  successMessage: '',
  errorMessage: ''
})

const resetFormState = () => {
  formState.value.isSuccess = false
  formState.value.isError = false
  formState.value.successMessage = ''
  formState.value.errorMessage = ''
}

const resetForm = () => {
  form.value = {
    name: '',
    phone: '',
    email: '',
    message: '',
  }
}

async function handleSubmit() {
  // Reset previous states
  resetFormState()
  
  // Validate form
  if (!form.value.name.trim() || !form.value.phone.trim() || !form.value.email.trim() || !form.value.message.trim()) {
    formState.value.isError = true
    formState.value.errorMessage = 'Semua field harus diisi'
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    formState.value.isError = true
    formState.value.errorMessage = 'Format email tidak valid'
    return
  }

  formState.value.isSubmitting = true

  try {
    const result = await submitContactForm({
      name: form.value.name.trim(),
      phone: form.value.phone.trim(),
      email: form.value.email.trim(),
      message: form.value.message.trim(),
      source: 'website'
    })

    if (result.success) {
      formState.value.isSuccess = true
      formState.value.successMessage = result.message || 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.'
      resetForm()
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formState.value.isSuccess = false
      }, 5000)
    } else {
      formState.value.isError = true
      formState.value.errorMessage = result.error || 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    formState.value.isError = true
    formState.value.errorMessage = 'Terjadi kesalahan jaringan. Silakan periksa koneksi internet Anda.'
  } finally {
    formState.value.isSubmitting = false
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
  width: clamp(300px, 90vw, 1400px);
  height: clamp(500px, 85vh, 800px);
  display: flex;
  gap: clamp(20px, 4vw, 60px);
  align-items: stretch;
  background-image: url('@/assets/Isolation Mode.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right bottom;
  box-sizing: border-box;
}

.form-column {
  flex: 1;
  min-width: 300px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Menyusun konten dari atas */
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
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: bold;
  margin-bottom: clamp(15px, 2vw, 25px);
  margin-top: 0;
  -webkit-text-stroke: 1px #000000;
}

.section-description {
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  margin-bottom: clamp(20px, 3vw, 35px);
  line-height: 1.6;
  margin-top: 0;
}

.contact-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Form akan mengisi sisa ruang */
  justify-content: flex-start; /* Tombol akan tetap berada di bawah */
  padding: 0; /* Pastikan tidak ada padding */
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: clamp(10px, 1.5vw, 16px);
  margin-bottom: clamp(12px, 2vw, 20px);
  border-radius: 8px;
  border: 1px solid #555555;
  outline: none;
  font-size: clamp(0.9rem, 1.1vw, 1.1rem);
  box-sizing: border-box;
  margin-left: 0;
  margin-right: 0;
}

.contact-form textarea {
  resize: vertical;
  min-height: clamp(80px, 12vh, 120px);
  height: clamp(80px, 15vh, 150px);
}

.send-button {
  background-color: white;
  color: #38b2ac;
  padding: clamp(10px, 1.5vw, 16px);
  font-weight: bold;
  border: 1px solid #555555;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 0;
  width: 100%;
  box-sizing: border-box;
  display: block;
  margin-left: 0;
  margin-right: 0;
  font-size: clamp(0.9rem, 1.1vw, 1.1rem);
}


.send-button:hover {
  background-color: #f0f0f0;
}

.send-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button:disabled:hover {
  background-color: white;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 0.9rem;
}

.success-message p {
  margin: 0;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 0.9rem;
}

.error-message p {
  margin: 0;
}

.contact-form input:disabled,
.contact-form textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
    min-height: 85vh;
  }
  
  .form-column,
  .map-column {
    min-width: 0;
    width: 100%;
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
  }
}
</style>
