<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-main">
        <!-- Left Section: Logo and Contact Info -->
        <div class="footer-left">
          <div class="footer-left-content">
            <div class="footer-logo-section">
              <img :src="logo" alt="SiUJI Logo" class="logo" />
            </div>
            <div class="footer-contact-section">
              <p class="footer-contact-text">
                <strong class="contact-label">Office</strong><br />
                <a href="https://maps.app.goo.gl/Z2P9NgFrWW9bKWvc6" target="_blank" rel="noopener">
                Jl. Sunda No.85, RT 12/RW 06, Kb. Pisang, Kec. Sumur Bandung, 
                Kota Bandung, Jawa Barat 40112
                </a>
              </p>
              <p class="footer-contact-text">
                <strong class="contact-label">Workshop</strong><br />
                <a href="https://maps.app.goo.gl/8wU85U4m9NDBr99U6" target="_blank" rel="noopener">
                  Komp. Holis Regency D7, Babakan, Babakan Ciparay, Kota Bandung, Jawa Barat 40222
                </a>
              </p>
              <p class="footer-contact-text">
                <a href="mailto:info@someah.id">info@someah.id</a>
              </p>
              <p class="footer-contact-text">
                <a href="tel:+6285117242221">+62 851 1724 2221</a>
              </p>
              <div class="footer-icons">
                <a href="https://www.facebook.com/someah.id" target="_blank" rel="noopener">
                  <img :src="FacebookIcon" alt="Facebook" class="footer-svg-icon" />
                </a>
                <a href="https://www.instagram.com/someahkreatif/" target="_blank" rel="noopener">
                  <img :src="InstagramIcon" alt="Instagram" class="footer-svg-icon" />
                </a>
                <a href="https://www.linkedin.com/company/someah-kreatif-nusantara/" target="_blank" rel="noopener">
                  <img :src="LinkedInIcon" alt="LinkedIn" class="footer-svg-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Section: Menu Links -->
        <div class="footer-center">
          <div class="footer-menu-group">
            <div class="footer-column">
              <h4>SIUJI</h4>
              <p><a href="#about">About Us</a></p>
              <p><a href="#why">Why Choose Us</a></p>
              <p><a href="#pricing">Pricing</a></p>
            </div>
            <div class="footer-column">
              <h4>Help</h4>
              <p><a href="#user-guide">User Guide</a></p>
              <p><a href="#faq">FAQs</a></p>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-separator"></div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="footer-terms">
            <p><a href="#terms">Syarat dan Ketentuan</a></p>
            <p><a href="#cookies"> | </a></p>
            <p><a href="#privacy">Kebijakan Privasi</a></p>
          </div>
          
          <div class="footer-buttons-copyright">
            <div class="footer-buttons">
              <DownloadButton 
                type="web"
                :url="downloadLinks.web" 
                @click="handleDownloadClick"
              />
              <DownloadButton 
                type="appstore"
                :url="downloadLinks.appStore" 
                @click="handleDownloadClick"
              />
              <DownloadButton 
                type="googleplay"
                :url="downloadLinks.googlePlay" 
                @click="handleDownloadClick"
              />
            </div>
            <p class="copyright">© 2023 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg'
import DownloadButton from '@/components/common/DownloadButton.vue'
import FacebookIcon from '@/assets/fb-vector.svg'
import InstagramIcon from '@/assets/ig-vector.svg'
import LinkedInIcon from '@/assets/in-vector.svg'

// Download links - can be easily configured
const downloadLinks = {
  web: 'https://siuji.someah.id',
  appStore: 'https://apps.apple.com/app/siuji',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.siuji'
}

// Handle download button clicks
const handleDownloadClick = (url: string) => {
  console.log('Download button clicked:', url)
  // Add analytics tracking here if needed
}
</script>

<style scoped>
.footer {
  background-color: #0f172a;
  color: white;
  padding: clamp(10px, 6vh, 40px) 0;
  font-family: 'Inter';
  font-size: clamp(14px, 1.1vw, 16px);
}

.footer-container {
  max-width: clamp(1200px, 95vw, 1550px);
  margin: 0 auto;
  width: 100%;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: clamp(80px, 6vw, 200px);
}

.footer-left {
  flex: 1.5;
  max-width: 1000px;
}

.footer-left-content {
  display: flex;
  gap: clamp(80px, 6vw, 200px);
  align-items: flex-start;
}

.footer-logo-section {
  flex-shrink: 0;
}

.footer-logo-section .logo {
  height: clamp(40px, 4vw, 60px);
}

.footer-contact-section {
  flex: 1;
  margin-top: 0;
}

.footer-contact-text {
  font-size: clamp(14px, 1vw, 15px);
  color: #cbd5e1;
  line-height: 1.5;
  margin-bottom: clamp(8px, 1vh, 12px);
  margin-top: 0;
}

.footer-contact-text:first-child {
  margin-top: 0;
}

.footer-contact-text a {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-contact-text a:hover {
  color: #ffffff;
  text-decoration: underline;
}

.contact-label {
  color: #ffffff;
  font-weight: bold;
}

.footer-icons {
  display: flex;
  gap: clamp(12px, 2vw, 16px);
}

.footer-icons img {
  height: clamp(20px, 2.5vw, 20px);
  width: clamp(20px, 2.5vw, 20px);
  transition: opacity 0.3s ease;
}

.footer-icons img:hover {
  opacity: 0.8;
}

.footer-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3vh, 30px);
}

.footer-menu-group {
  display: flex;
  gap: clamp(80px, 6vw, 200px);
}

.footer-column {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1vh, 12px);
}

.footer-column h4 {
  font-size: clamp(14px, 1.2vw, 18px);
  font-weight: bold;
  color: white;
  margin-bottom: clamp(8px, 1vh, 12px);
  margin-top: 0;
}

.footer-column p {
  font-size: clamp(14px, 1vw, 15px);
  line-height: 1.4;
  margin: 0;
}

.footer-column a {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-column a:hover {
  color: #ffffff;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: clamp(1200px, 95vw, 1550px);
  gap: clamp(20px, 4vw, 40px);
}
.footer-buttons-copyright {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: clamp(8px, 1vh, 12px);
}

.footer-buttons {
  display: flex;
  gap: clamp(8px, 1vh, 12px);
  align-items: center;
}

.footer-terms {
  display: flex;
  gap: clamp(20px, 3vw, 30px);
  align-items: center;
}

.footer-terms p {
  font-size: clamp(14px, 1vw, 15px);
  margin: 0;
}

.footer-terms a {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-terms a:hover {
  color: #ffffff;
}

.copyright {
  font-size: clamp(11px, 0.9vw, 14px);
  color: #9ca3af;
  margin: 0;
  text-align: right;
}

.footer-separator {
  height: 1px;
  background-color: #374151; /* Dark gray */
  margin: clamp(20px, 3vh, 30px) 0;
  width: 100%;
}

.copyright {
  font-size: clamp(11px, 0.9vw, 14px);
  color: #9ca3af;
  margin: 0;
  text-align: center;
}

@media (max-width: 768px) {
  .footer-main {
    flex-direction: column;
    gap: 30px; /* Jarak konsisten antar elemen utama */
    text-align: center;
  }

  .footer-left {
    max-width: 100%;
    text-align: left;
  }

  .footer-left-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px; /* Jarak konsisten antara logo dan contact */
  }

  .footer-icons {
    justify-content: flex-start;
    margin-top: 20px; /* Jarak konsisten dari contact ke icons */
  }

  .footer-center {
    align-items: center;
    width: 100%;
    display: flex;
    justify-content: center;
    /* margin-top: 20px; Jarak konsisten dari icons ke menu */
  }

  .footer-menu-group {
    flex-direction: row;
    gap: clamp(40px, 8vw, 80px);
    text-align: center; /* Ubah ke left alignment */
    justify-content: center;
    width: 100%;
  }

  .footer-column {
    align-items: flex-start; /* Ubah ke flex-start untuk align left */
    flex: 0 0 auto;
    width: auto;
    text-align: left; /* Ubah ke left alignment */
  }

  .footer-separator {
    margin: 30px 0; /* Jarak konsisten untuk separator */
  }

  .footer-bottom-content {
    flex-direction: column;
    gap: 20px; /* Jarak konsisten antar elemen bottom */
    text-align: center;
    align-items: center;
    justify-content: center;
    position: relative;
    padding-bottom: 60px; /* Space untuk copyright di bawah */
  }

  .footer-buttons-copyright {
    order: 1;
    align-items: center;
    gap: 20px; /* Jarak konsisten antara buttons dan copyright */
    justify-content: center;
  }

  .footer-buttons-copyright .footer-buttons {
    order: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: clamp(8px, 2vw, 12px);
  }

  .footer-buttons-copyright .copyright {
    order: 3;
    text-align: center;
    margin-top: 20px; /* Jarak konsisten ke copyright */
    background: transparent;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    width: 100%;
  }

  .footer-terms {
    order: 2;
    flex-direction: row;
    gap: clamp(20px, 4vw, 30px);
    justify-content: center;
    align-self: center;
    width: 100%;
    display: flex;
    margin-top: 20px; /* Jarak konsisten dari buttons ke terms */
  }

  .footer-buttons :deep(.download-btn) {
    width: clamp(110px, 18vw, 120px);
    height: clamp(25px, 5vw, 32px);
    font-size: 8px;
  }

  .footer-buttons :deep(.icon) {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: clamp(30px, 5vh, 40px) clamp(15px, 3vw, 20px);
  }

  .footer-menu-group {
    flex-direction: row;
    gap: clamp(30px, 6vw, 60px);
    justify-content: center;
    width: 100%;
    text-align: center; /* Tambahkan left alignment */
  }

  .footer-column {
    align-items: flex-start; /* Ubah ke flex-start untuk align left */
    flex: 0 0 auto;
    width: auto;
    text-align: left; /* Ubah ke left alignment */
  }

  .footer-buttons {
    width: 100%;
  }

  .footer-buttons :deep(.download-btn) {
    width: clamp(110px, 18vw, 120px);
    height: clamp(25px, 5vw, 32px);
    font-size: 9px;
  }

  .footer-buttons :deep(.icon) {
    width: 16px;
    height: 16px;
  }
}
</style>
