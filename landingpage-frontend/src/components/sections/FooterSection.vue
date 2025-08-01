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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="5" fill="white"/>
            <path d="M16 4H13.5455C12.4605 4 11.4199 4.42143 10.6527 5.17157C9.88555 5.92172 9.45455 6.93913 9.45455 8V10.4H7V13.6H9.45455V20H12.7273V13.6H15.1818L16 10.4H12.7273V8C12.7273 7.78783 12.8135 7.58434 12.9669 7.43431C13.1204 7.28429 13.3285 7.2 13.5455 7.2H16V4Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="5" fill="white"/>
            <path d="M15.7529 4C18.1004 4.00024 20.0029 5.90346 20.0029 8.25098V15.7529C20.0027 18.1002 18.1002 20.0027 15.7529 20.0029H8.25098C5.90346 20.0029 4.00024 18.1004 4 15.7529V8.25098C4 5.90331 5.90331 4 8.25098 4H15.7529ZM8.25098 5C6.45559 5 5 6.45559 5 8.25098V15.7529C5.00024 17.5481 6.45574 19.0029 8.25098 19.0029H15.7529C17.548 19.0027 19.0027 17.548 19.0029 15.7529V8.25098C19.0029 6.45574 17.5481 5.00024 15.7529 5H8.25098ZM10.4229 8.8623C11.0762 8.52341 11.8198 8.39897 12.5479 8.50684C13.2905 8.61708 13.9788 8.96328 14.5098 9.49414C15.0406 10.0252 15.3879 10.7133 15.498 11.4561C15.6059 12.1842 15.4816 12.9286 15.1426 13.582C14.8035 14.2355 14.2659 14.7657 13.6084 15.0967C12.9509 15.4275 12.2052 15.5426 11.4785 15.4258C10.7518 15.3088 10.0801 14.9647 9.55957 14.4443C9.03912 13.9238 8.69613 13.2521 8.5791 12.5254C8.46215 11.7985 8.57721 11.0532 8.9082 10.3955C9.23925 9.73787 9.76933 9.20141 10.4229 8.8623ZM12.4014 9.49609C11.8812 9.41902 11.3496 9.50788 10.8828 9.75C10.4162 9.99223 10.0372 10.3751 9.80078 10.8447C9.5644 11.3144 9.48296 11.8471 9.56641 12.3662C9.65002 12.8853 9.89488 13.3655 10.2666 13.7373C10.6385 14.109 11.1186 14.3549 11.6377 14.4385C12.1568 14.5219 12.6896 14.4395 13.1592 14.2031C13.6288 13.9667 14.0127 13.5878 14.2549 13.1211C14.497 12.6544 14.5858 12.1226 14.5088 11.6025C14.4301 11.072 14.1819 10.5805 13.8027 10.2012C13.4235 9.82202 12.9318 9.57487 12.4014 9.49609ZM16.2363 7.38574C16.4639 7.43256 16.6357 7.63453 16.6357 7.87598C16.6356 8.11735 16.4639 8.31945 16.2363 8.36621L16.1357 8.37598H16.1279C15.8519 8.37598 15.6281 8.15201 15.6279 7.87598C15.6279 7.59983 15.8518 7.37598 16.1279 7.37598H16.1357L16.2363 7.38574Z" fill="black"/>
            </svg>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.0253906" width="24" height="24" rx="5" fill="white"/>
            <path d="M7.52539 9.1582C7.8015 9.1582 8.02533 9.38211 8.02539 9.6582V18.502C8.02539 18.7781 7.80153 19.002 7.52539 19.002H4.52539C4.24925 19.002 4.02539 18.7781 4.02539 18.502V9.6582C4.02545 9.38211 4.24928 9.1582 4.52539 9.1582H7.52539ZM15.2734 8.42676C16.5067 8.487 17.679 8.99511 18.5586 9.85938C19.4972 10.7816 20.0262 12.0347 20.0264 13.3428V18.502C20.0263 18.7779 19.8023 19.0017 19.5264 19.002H16.5264C16.2502 19.002 16.0264 18.7781 16.0264 18.502V13.3428C16.0262 13.0875 15.9228 12.8405 15.7363 12.6572C15.5496 12.4738 15.2941 12.3694 15.0264 12.3691C14.7585 12.3691 14.5023 12.4739 14.3154 12.6572C14.129 12.8405 14.0255 13.0875 14.0254 13.3428V18.502C14.0254 18.7779 13.8013 19.0017 13.5254 19.002H10.5254C10.2493 19.002 10.0254 18.7781 10.0254 18.502V13.3428C10.0255 12.0347 10.5546 10.7816 11.4932 9.85938C12.4315 8.93763 13.7032 8.4209 15.0264 8.4209L15.2734 8.42676ZM5.02539 18.002H7.02539V10.1582H5.02539V18.002ZM15.0264 9.4209C13.963 9.4209 12.9438 9.83628 12.1943 10.5723C11.4452 11.3084 11.0255 12.3057 11.0254 13.3428V18.002H13.0254V13.3428C13.0255 12.8168 13.2386 12.3137 13.6143 11.9443C13.99 11.5754 14.4989 11.3691 15.0264 11.3691C15.5537 11.3694 16.062 11.5754 16.4375 11.9443C16.8132 12.3137 17.0262 12.8168 17.0264 13.3428V18.002H19.0264V13.3428C19.0262 12.3057 18.6066 11.3084 17.8574 10.5723C17.1081 9.83623 16.0896 9.42115 15.0264 9.4209ZM6.02539 4C7.1216 4 8.02519 4.87534 8.02539 5.97363C8.02539 7.0721 7.12172 7.94824 6.02539 7.94824C4.92913 7.94815 4.02539 7.07205 4.02539 5.97363C4.02559 4.87539 4.92926 4.00009 6.02539 4ZM6.02539 5C5.46489 5.00009 5.02559 5.44418 5.02539 5.97363C5.02539 6.50325 5.46476 6.94815 6.02539 6.94824C6.5861 6.94824 7.02539 6.5033 7.02539 5.97363C7.02519 5.44413 6.58597 5 6.02539 5Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.svg'
import DownloadButton from '@/components/common/DownloadButton.vue'

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

.footer-icons svg {
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
