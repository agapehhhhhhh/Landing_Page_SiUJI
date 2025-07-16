// NavbarSection.vue
<template>
  <header :class="['navbar', { 'scrolled': isScrolled }]">
    <div class="container">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="SIUJI Logo" />
      </div>
      <nav class="nav-links">
        <a href="#">Product</a>
        <a href="#">About Us</a>
        <a href="#">Feature</a>
        <a href="#">Help</a>
      </nav>
      <div class="nav-action">
        <button class="login-button">Login</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
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

.navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(6px);
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo img {
  height: 40px;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #1c1c1c;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-links a:hover {
  color: #24c3a7;
  background: none;
}

.login-button {
  padding: 8px 20px;
  border: 2px solid #1c1c1c;
  border-radius: 20px;
  background: none;
  font-weight: 500;
  transition: all 0.3s;
}

.login-button:hover {
  background: #f3f3f3;
}
</style>
