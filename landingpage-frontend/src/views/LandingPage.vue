<script setup>
import NavbarSection from '@/components/sections/NavbarSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import WhyChooseSection from '@/components/sections/WhyChooseSection.vue'
import AvailableSection from '@/components/sections/AvailableSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import ContactUsSection from '@/components/sections/ContactUsSection.vue'
import FooterSection from '@/components/sections/FooterSection.vue'
import PortofolioSection from '@/components/sections/PortofolioSection.vue'
import FaqSection from '@/components/sections/FAQSection.vue'
import FeaturesSection from '@/components/sections/FeaturesSection.vue'
import FeatureItem from '@/components/sections/FeatureItem.vue'
import FeaturesListSection from '@/components/sections/FeaturesListSection.vue'
import PricingSection from '@/components/sections/PricingSection.vue'
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
      <AvailableSection />
      
      <!-- Dynamic Features from API -->
      <FeaturesListSection 
        main-title="Fitur Unggulan SiUJI"
        main-subtitle="Jelajahi fitur-fitur canggih yang membuat SiUJI menjadi pilihan terbaik untuk kebutuhan ujian online Anda"
        :show-main-header="true"
      />
      
      <PortofolioSection :logos="pageData.portofolio" />
      <TestimonialsSection />
      <PricingSection />
      <ContactUsSection />
      <FaqSection :faqs="pageData.faqs" />
      <FooterSection />
    </div>
  </main>
</template>