<template>
  <section class="privacy-policy-section">
    <div class="container">
      <button @click="goBack" class="back-button">
        ← Kembali
      </button>
      <h1>Kebijakan Privasi</h1>
      <p class="update-date">Terakhir diperbarui: 13 Agustus 2025</p>
      <div class="policy-content">
        <h2>1. Pendahuluan</h2>
        <p>
          Selamat datang di SIUJI! Kami berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi Anda saat menggunakan layanan kami.
        </p>
        <h2>2. Informasi yang Kami Kumpulkan</h2>
        <ul>
          <li><strong>Informasi Akun:</strong> Nama, email, nomor telepon, dan data lain yang Anda berikan saat mendaftar.</li>
          <li><strong>Data Penggunaan:</strong> Informasi tentang bagaimana Anda menggunakan aplikasi/website kami.</li>
          <li><strong>Informasi Teknis:</strong> Alamat IP, perangkat, browser, dan data log lainnya.</li>
        </ul>
        <h2>3. Penggunaan Informasi</h2>
        <ul>
          <li>Menyediakan, mengelola, dan meningkatkan layanan SIUJI.</li>
          <li>Berkomunikasi dengan Anda terkait layanan, pembaruan, atau promosi.</li>
          <li>Menjaga keamanan dan mencegah penyalahgunaan layanan.</li>
        </ul>
        <h2>4. Penyimpanan & Keamanan Data</h2>
        <p>
          Kami menyimpan data Anda dengan aman dan hanya selama diperlukan untuk tujuan layanan. Kami menggunakan langkah-langkah teknis dan organisasi untuk melindungi data Anda dari akses tidak sah.
        </p>
        <h2>5. Berbagi Informasi</h2>
        <p>
          Kami tidak akan membagikan data pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali diwajibkan oleh hukum atau untuk keperluan operasional layanan (misal: penyedia hosting).
        </p>
        <h2>6. Hak Anda</h2>
        <ul>
          <li>Anda dapat mengakses, memperbarui, atau menghapus data pribadi Anda kapan saja.</li>
          <li>Anda dapat meminta penjelasan terkait pengelolaan data pribadi Anda.</li>
        </ul>
        <h2>7. Perubahan Kebijakan</h2>
        <p>
          Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diinformasikan melalui aplikasi/website kami.
        </p>
        <h2>8. Kontak</h2>
        <p>
          Jika Anda memiliki pertanyaan atau permintaan terkait privasi, silakan hubungi kami di <a href="mailto:info@someah.id">info@someah.id</a>.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  // Cek apakah ada history, jika tidak kembali ke home
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.privacy-policy-section {
  background: #f8fafc;
  min-height: 100vh;
  padding: 40px 0 60px 0;
  font-family: 'Inter', Arial, sans-serif;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  padding: 32px 20px 40px 20px;
}

.back-button {
  background: #19c9b3;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  font-family: 'Inter', Arial, sans-serif;
}

.back-button:hover {
  background: #16a085;
  transform: translateX(-2px);
}

h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #222;
}
.update-date {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 2rem;
}
.policy-content h2 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  color: #19c9b3;
}
.policy-content p, .policy-content ul {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.7;
}
.policy-content ul {
  padding-left: 1.2rem;
}
.policy-content li {
  margin-bottom: 0.5rem;
}
a {
  color: #19c9b3;
  text-decoration: underline;
}
@media (max-width: 600px) {
  .container {
    padding: 18px 6px 28px 6px;
    border-radius: 10px;
  }
  
  .back-button {
    padding: 8px 16px;
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
  
  h1 {
    font-size: 1.3rem;
  }
  .policy-content h2 {
    font-size: 1.05rem;
  }
  .policy-content p, .policy-content ul {
    font-size: 0.97rem;
  }
}
</style>
