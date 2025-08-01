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
            <p><a href="#terms">Terms of Condition</a></p>
            <p><a href="#privacy">Privacy Policy</a></p>
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
  font-size: clamp(13px, 1.1vw, 16px);
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
  font-size: clamp(12px, 1vw, 15px);
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
  height: clamp(10px, 2.5vw, 20px);
  width: clamp(10px, 2.5vw, 20px);
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
  font-size: clamp(12px, 1vw, 15px);
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
  gap: 40px;
}
.copyright {
  font-size: clamp(11px, 0.9vw, 14px);
  color: #9ca3af;
  margin: 0;
  text-align: right;
}

.footer-terms {
  display: flex;
  gap: clamp(20px, 3vw, 30px);
  align-items: center;
}

.footer-terms p {
  font-size: clamp(12px, 1vw, 15px);
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

.footer-buttons {
  display: flex;
  gap: clamp(8px, 1vh, 12px);
  align-items: center;
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
    gap: clamp(30px, 5vh, 40px);
    text-align: center;
  }

  .footer-left {
    max-width: 100%;
  }

  .footer-left-content {
    flex-direction: column;
    align-items: center;
    gap: clamp(15px, 2vh, 20px);
  }

  .footer-center {
    align-items: center;
  }

  .footer-menu-group {
    flex-direction: column;
    gap: clamp(20px, 3vh, 30px);
    text-align: center;
  }

  .footer-column {
    align-items: center;
  }

  .footer-bottom-content {
    flex-direction: column;
    gap: clamp(15px, 3vw, 20px);
    text-align: center;
  }

  .footer-terms {
    flex-direction: column;
    gap: clamp(10px, 2vw, 15px);
  }

  .footer-buttons {
    flex-direction: row;
    justify-content: center;
    gap: clamp(10px, 2vw, 15px);
  }

  .footer-icons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: clamp(30px, 5vh, 40px) clamp(15px, 3vw, 20px);
  }

  .footer-menu-group {
    flex-direction: column;
    gap: clamp(15px, 2vh, 20px);
  }

  .footer-buttons {
    width: 100%;
  }
}
</style>
