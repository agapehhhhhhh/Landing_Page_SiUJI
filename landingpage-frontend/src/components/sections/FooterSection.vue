<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-column">
          <h4>Privacy Policy</h4>
          <p>Lorem Ipsum</p>
        </div>
        <div class="footer-column">
          <h4>Terms of Condition</h4>
          <p>Lorem Ipsum</p>
        </div>
        <div class="footer-column">
          <h4>Help</h4>
          <p>About Us</p>
          <p>FAQs</p>
        </div>
        <div class="footer-column">
          <h4>Contact Us</h4>
          <p>Contact Us</p>
        </div>
      </div>

      <div class="footer-separator"></div>

      <div class="footer-bottom">
        <div class="footer-info">
          <div class="footer-brand">
            <img :src="logo" alt="SiUJI Logo" class="logo" />
            <p class="copyright">© 2021 All Rights Reserved</p>
          </div>
          <div class="footer-contact">
            <p style="font-weight: bold;">Office</p>
            <address><a href="https://maps.app.goo.gl/E9RGvBWK6qMgahpJ9" target="_blank" rel="noopener noreferrer">Jl. Sunda No.85, RT 12/RW 06, Kb. Pisang, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40112</a></address>
            <p style="font-weight: bold;">Workshop</p>
            <address><a href="https://maps.app.goo.gl/4KuJQPBfXt1nNANE6" target="_blank" rel="noopener noreferrer">Komp. Holis Regency D7, Babakan, Babakan Ciparay, Kota Bandung, Jawa Barat 40222</a></address>
            <p><a href="mailto:info@someah.id">info@someah.id</a></p>
            <p><a href="tel:+6285117242221">+62 851 1724 2221</a></p>
          </div>
        </div>

        <div class="footer-actions">
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
          <div class="footer-icons">
            <a v-for="icon in icons" :key="icon.alt" :href="icon.link" target="_blank">
              <img :src="icon.src" :alt="icon.alt" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg'
import DownloadButton from '@/components/common/DownloadButton.vue'
import facebookIcon from '@/assets/facebook.png'
import instagramIcon from '@/assets/instagram.png'
import linkedinIcon from '@/assets/linkedin.png'

const icons = [
  { src: facebookIcon, alt: "Facebook", link: "https://web.facebook.com/someah.id?_rdc=1&_rdr#" },
  { src: instagramIcon, alt: "Instagram", link: "https://www.instagram.com/someahkreatif/" },
  { src: linkedinIcon, alt: "LinkedIn", link: "https://www.linkedin.com/company/somearch-nusantara/" },
]

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
  padding: clamp(30px, 5vh, 60px) clamp(20px, 3vw, 40px);
  font-family: sans-serif;
  font-size: clamp(13px, 1.1vw, 16px);
}

.footer-container {
  max-width: clamp(1000px, 95vw, 1600px);
  margin: 0 auto;
  width: 100%;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(80px, 12vw, 160px);
  margin-bottom: clamp(20px, 3vh, 30px);
  max-width: clamp(800px, 85vw, 1200px);
  margin: 0 auto clamp(20px, 3vh, 30px);
  width: 100%;
  padding: 0 clamp(20px, 3vw, 40px);
}

.footer-column {
  text-align: left;
  white-space: nowrap;
}

.footer-column h4 {
  margin-bottom: clamp(6px, 1vh, 12px);
  font-weight: bold;
  font-size: clamp(14px, 1.2vw, 18px);
}

.footer-column p {
  font-size: clamp(12px, 1vw, 15px);
  line-height: 1.4;
  margin: clamp(2px, 0.5vh, 4px) 0;
}

.footer-separator {
  height: 1px;
  background-color: #374151;
  margin: clamp(20px, 3vh, 35px) auto;
  max-width: clamp(1100px, 95vw, 1400px);
  width: 100%;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: clamp(1100px, 95vw, 1400px);
  margin: 0 auto;
  width: 100%;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.footer-info .logo {
  height: clamp(28px, 3vw, 40px);
  margin-bottom: clamp(3px, 0.5vh, 6px);
}

.footer-info address,
.footer-info p {
  margin: clamp(1px, 0.2vh, 3px) 0;
  color: #cbd5e1;
  font-size: clamp(12px, 1vw, 15px);
  line-height: 1.5;
}

.footer-actions {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
}

.footer-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(6px, 1vw, 12px);
}

.footer-icons {
  margin-top: 2px;
  align-self: flex-start;
  margin-left: 0;
}

.footer-icons img {
  height: clamp(20px, 2.5vw, 32px);
  width: clamp(20px, 2.5vw, 32px);
  margin-right: clamp(8px, 1.5vw, 15px);
  vertical-align: middle;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-brand .logo {
  height: clamp(28px, 3vw, 40px);
  margin-bottom: clamp(3px, 0.5vh, 6px);
}

.footer-brand .copyright {
  font-size: clamp(11px, 0.9vw, 14px);
  margin: clamp(1px, 0.2vh, 2px) 0;
}

.footer-contact {
  color: #cbd5e1;
  font-size: clamp(12px, 1vw, 15px);
}


.footer-contact address,
.footer-contact p {
  margin: clamp(1px, 0.2vh, 3px) 0;
  font-style: normal;
  line-height: 1.5;
  display: block;
}

.footer-contact address a {
  display: inline;
  white-space: normal;
  vertical-align: baseline;
}

.footer-contact address {
  margin: clamp(1px, 0.2vh, 3px) 0;
  font-style: normal;
  line-height: 1.5;
  display: block;
  padding: 0;
  text-indent: 0;
}

.footer-contact a {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-contact a:hover {
  color: #ffffff;
  text-decoration: underline;
}

@media (min-width: 768px) {
  .footer {
    padding: clamp(40px, 6vh, 80px) clamp(30px, 4vw, 60px);
  }
  
  .footer-top {
    gap: clamp(100px, 14vw, 180px);
    margin-bottom: clamp(25px, 4vh, 40px);
    justify-content: center;
    flex-wrap: nowrap;
    padding: 0 clamp(30px, 4vw, 50px);
  }
  
  .footer-column {
    white-space: nowrap;
  }

  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    align-items: flex-start;
    max-width: clamp(1200px, 95vw, 1500px);
    margin: 0 auto;
    width: 100%;
  }

  .footer-actions {
    align-items: flex-start;
  }
  
  .footer-info {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 15px;
    flex: 1;
  }
  
  .footer-brand {
    min-width: clamp(150px, 20vw, 250px);
  }
  
  .footer-contact {
    flex: 1;
    max-width: clamp(300px, 40vw, 500px);
  }
}

@media (min-width: 1200px) {
  .footer {
    padding: clamp(50px, 7vh, 100px) clamp(40px, 5vw, 80px);
  }
  
  .footer-top {
    gap: clamp(120px, 16vw, 200px);
  }
  
  .footer-info {
    gap: 20px;
  }
  .footer-separator {
    max-width: 1200px;
  }
  .footer-bottom {
    max-width: 1200px;
  }
}

@media (max-width: 767px) {
  .footer-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(15px, 4vw, 30px);
    justify-items: center;
    align-items: start;
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
    margin-bottom: clamp(15px, 3vh, 25px);
  }
  
  .footer-column {
    text-align: center;
    white-space: normal;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 80px;
  }
  
  .footer-column h4 {
    font-size: clamp(13px, 3vw, 16px);
    margin-bottom: clamp(4px, 1vh, 8px);
    width: 100%;
    text-align: center;
  }
  
  .footer-column p {
    font-size: clamp(11px, 2.5vw, 13px);
    margin: clamp(1px, 0.3vh, 3px) 0;
    width: 100%;
    text-align: center;
  }
}
</style>
