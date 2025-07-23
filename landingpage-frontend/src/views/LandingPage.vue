<script setup>
import NavbarSection from '@/components/sections/NavbarSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import WhyChooseSection from '@/components/sections/WhyChooseSection.vue'
import AvailableSection from '@/components/sections/AvailableSection.vue'
import FooterSection from '@/components/sections/FooterSection.vue'
import PortofolioSection from '@/components/sections/PortofolioSection.vue'
import { useLandingPageData } from '@/composables/useLandingPageData'


const { pageData, isLoading } = useLandingPageData()
</script>

<template>
  <main>
    <NavbarSection />
    <div v-if="!isLoading">
      <HeroSection :data="pageData.hero" />
      <AboutSection />
      <WhyChooseSection />
    </div>
  </main>
</template>
