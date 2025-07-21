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
            <address>
              Jl. Sunda No.85, RT 12/RW 06, Kb. Pisang, Kec. Sumur Bandung,<br />
              Kota Bandung, Jawa Barat 40112
            </address>
            <p>info@somerah.id</p>
            <p>+62 851 1724 2221</p>
          </div>
        </div>

        <div class="footer-actions">
          <div class="footer-buttons">
            <button>🌐 Web Browser</button>
            <button> App Store</button>
            <button>▶ Google Play</button>
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
import logo from '@/assets/someah-logo.svg'

const icons = [
  { src: "/icons/telegram.svg", alt: "Telegram", link: "#" },
  { src: "/icons/twitter.svg", alt: "Twitter", link: "#" },
  { src: "/icons/facebook.svg", alt: "Facebook", link: "#" },
  { src: "/icons/instagram.svg", alt: "Instagram", link: "#" },
  { src: "/icons/youtube.svg", alt: "YouTube", link: "#" },
  { src: "/icons/tiktok.svg", alt: "TikTok", link: "#" },
  { src: "/icons/linkedin.svg", alt: "LinkedIn", link: "#" },
]
</script>

<style scoped>
.footer {
  background-color: #0f172a;
  color: white;
  padding: 40px 20px;
  font-family: sans-serif;
  font-size: 14px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.footer-column {
  min-width: 140px;
  flex: 1;
}

.footer-column h4 {
  margin-bottom: 8px;
  font-weight: bold;
}

.footer-separator {
  height: 1px;
  background-color: #374151;
  margin: 20px 0;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-info .logo {
  height: 32px;
  margin-bottom: 8px;
}

.footer-info address,
.footer-info p {
  margin: 4px 0;
  color: #cbd5e1;
}

.footer-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.footer-buttons button {
  background-color: white;
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
}

.footer-icons {
  margin-top: 10px;
}

.footer-icons img {
  height: 24px;
  width: 24px;
  margin-right: 10px;
  vertical-align: middle;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-brand .logo {
  height: 32px;
  margin-bottom: 8px;
}

.footer-contact {
  color: #cbd5e1;
  font-size: 14px;
}

.footer-contact address,
.footer-contact p {
  margin: 4px 0;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }

  .footer-actions {
    align-items: flex-end;
  }
}
@media (min-width: 768px) {
  .footer-info {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 40px;
  }
}
</style>
