// NavbarSection.vue
<template>
  <header :class="['navbar', { scrolled: isScrolled }]">
    <div class="container">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="SIUJI Logo" />
      </div>

      <!-- Desktop Navigation -->
      <nav class="nav-links desktop-nav">
        <a href="#">Product</a>
        <a href="#">About Us</a>
        <a href="#">Feature</a>
        <a href="#">Help</a>
      </nav>

      <!-- Desktop Login Button -->
      <button class="login-button desktop-login">Login</button>

      <!-- Mobile Hamburger Button -->
      <button
        class="hamburger-button"
        @click="toggleMobileMenu"
        :class="{ active: showMobileMenu }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Mobile Menu Fullscreen -->
      <div class="mobile-menu-fullscreen" :class="{ active: showMobileMenu }">
        <div class="mobile-menu-content">
          <!-- Logo in Mobile Menu -->
          <div class="mobile-logo">
            <img src="@/assets/logo.svg" alt="SIUJI Logo" />
          </div>

          <!-- Navigation Links Section -->
          <div class="mobile-nav-section">
            <h3 class="section-title">Navigation</h3>
            <nav class="mobile-nav-links">
              <a href="#" @click="closeMobileMenu" class="nav-item">
                <div class="nav-item-content">
                  <span class="nav-text">Product</span>
                </div>
                <span class="nav-arrow">→</span>
              </a>
              <a href="#" @click="closeMobileMenu" class="nav-item">
                <div class="nav-item-content">
                  <span class="nav-text">About Us</span>
                </div>
                <span class="nav-arrow">→</span>
              </a>
              <a href="#" @click="closeMobileMenu" class="nav-item">
                <div class="nav-item-content">
                  <span class="nav-text">Feature</span>
                </div>
                <span class="nav-arrow">→</span>
              </a>
              <a href="#" @click="closeMobileMenu" class="nav-item">
                <div class="nav-item-content">
                  <span class="nav-text">Help</span>
                </div>
                <span class="nav-arrow">→</span>
              </a>
            </nav>
          </div>

          <!-- Login Section -->
          <div class="mobile-login-section">
            <button class="mobile-login-button" @click="closeMobileMenu">
              <span class="login-text">Sign In to Your Account</span>
            </button>
            <p class="login-subtitle">Access your dashboard and settings</p>
          </div>

          <!-- Footer in Mobile Menu -->
          <div class="mobile-footer">
            <p>&copy; 2024 SIUJI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isScrolled = ref(false);
const showMobileMenu = ref(false);
const isMobile = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80;
};

const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
  if (!isMobile.value) {
    showMobileMenu.value = false;
  }
};

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
  // Prevent body scroll when menu is open
  if (showMobileMenu.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

const closeMobileMenu = () => {
  showMobileMenu.value = false;
  document.body.style.overflow = "auto";
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleResize);
  handleResize(); // Check initial screen size
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
  // Restore body scroll when component unmounts
  document.body.style.overflow = "auto";
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 1rem 0;
  z-index: 50;
  transition: all 0.3s ease;
  background-color: transparent;
  backdrop-filter: none;
}

/* Desktop scroll effect */
.navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(6px);
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.logo {
  margin-left: 0px;
  transform: translateX(-180px);
}

.logo img {
  height: 50px;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  gap: 2rem;
  flex-grow: 1;
  justify-content: center;
}

.nav-links a {
  text-decoration: none;
  color: #1c1c1c;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #4cc5bd;
  background: none;
}

.desktop-login {
  flex-shrink: 0;
  padding: 8px 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  transition: all 0.3s;
  border: 2px solid #000;
  cursor: pointer;
  color: #1c1c1c;
  transform: translateX(180px);
}

.desktop-login:hover {
  background: #4cc5bd;
  color: white;
  border-color: #4cc5bd;
}

/* Hamburger Button */
.hamburger-button {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
  position: relative;
}

.hamburger-button span {
  display: block;
  height: 3px;
  width: 100%;
  background-color: #1c1c1c;
  border-radius: 1.5px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center;
}

.hamburger-button.active span {
  background-color: #1c1c1c;
}

.hamburger-button.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-button.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-button.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Menu Fullscreen */
.mobile-menu-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1000;
  overflow: hidden;
}

.mobile-menu-fullscreen.active {
  transform: translateX(0);
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 80px 24px 24px 24px;
  position: relative;
}

/* Mobile Logo */
.mobile-logo {
  text-align: center;
  margin-bottom: 48px;
}

.mobile-logo img {
  height: 60px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

/* Navigation Section */
.mobile-nav-section {
  margin-bottom: 80px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 24px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 8px;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: #1f2937;
  font-weight: 500;
  font-size: 18px;
  padding: 20px 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4cc5bd, #3ba8a1);
  transition: left 0.4s ease;
  z-index: -1;
}

.nav-item:hover::before {
  left: 0;
}

.nav-item:hover {
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(76, 197, 189, 0.3);
  border-color: rgba(76, 197, 189, 0.3);
}

.nav-item-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-icon {
  font-size: 22px;
  width: 28px;
  text-align: center;
}

.nav-text {
  font-size: 18px;
}

.nav-arrow {
  font-size: 20px;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.nav-item:hover .nav-arrow {
  transform: translateX(4px);
}

.mobile-login-button {
  width: 100%;
  padding: 24px 32px;
  border-radius: 20px;
  background: #4cc5bd;
  color: white;
  font-weight: 600;
  font-size: 18px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}

.mobile-login-button:hover {
  background: #3ba8a1;
}

.login-icon {
  font-size: 20px;
}

.login-text {
  font-size: 18px;
}

.login-subtitle {
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  margin: 0;
  font-weight: 400;
}

/* Mobile Footer */
.mobile-footer {
  text-align: center;
  padding: 16px 0;
  border-top: 1px solid rgba(203, 213, 225, 0.5);
  margin-top: 60px;
}

.mobile-footer p {
  color: #9ca3af;
  font-size: 14px;
  margin: 0;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .navbar {
    background-color: transparent;
    backdrop-filter: none;
  }

  .navbar.scrolled {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(6px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  .container {
    grid-template-columns: auto 1fr auto;
    padding: 0 16px;
  }

  .hamburger-button {
    display: flex;
    margin-left: auto;
  }

  .desktop-nav,
  .desktop-login {
    display: none;
  }

  .logo img {
    height: 40px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 12px;
  }

  .mobile-menu-content {
    padding: 70px 16px 16px 16px;
  }

  .nav-item {
    padding: 18px 20px;
    font-size: 16px;
  }

  .nav-text {
    font-size: 16px;
  }

  .nav-icon {
    font-size: 20px;
    width: 24px;
  }

  .mobile-login-button {
    padding: 20px 28px;
    font-size: 16px;
  }

  .login-text {
    font-size: 16px;
  }

  .close-button {
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
  }
}

/* Tablet specific adjustments */
@media (min-width: 769px) and (max-width: 1024px) {
  .desktop-nav {
    gap: 1.5rem;
  }

  .container {
    padding: 0 24px;
  }
}

/* Animation for smooth entrance */
@media (max-width: 768px) {
  .mobile-menu-fullscreen.active .nav-item {
    animation: slideInRight 0.6s ease forwards;
  }

  .mobile-menu-fullscreen.active .nav-item:nth-child(n) {
    animation-delay: calc(0.1s * var(--n));
  }

  .mobile-menu-fullscreen.active .mobile-login-button {
    animation: slideInRight 0.6s ease forwards;
    animation-delay: 0s;
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>