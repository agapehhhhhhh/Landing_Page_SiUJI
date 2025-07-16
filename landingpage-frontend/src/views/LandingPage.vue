<script setup>
import NavbarSection from '@/components/sections/NavbarSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import { useLandingPageData } from '@/composables/useLandingPageData'

const { pageData, isLoading } = useLandingPageData()
</script>

<template>
  <main>
    <NavbarSection />
    <div v-if="!isLoading">
      <HeroSection :data="pageData.hero" />
    </div>
  </main>
</template>
