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
      
      <!-- Features Section with Image on Right (dengan header) -->
      <FeaturesSection 
        title="Our Feature"
        subtitle="This very extraordinary feature, can make learning activities more efficient"
        feature-title="Lorem Ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        image-src="/assets/ilustrasi-hero.png"
        layout="right"
        :show-header="true"
      />
      
      <!-- Features Section with Image on Left (tanpa header) -->
      <FeatureItem 
        feature-title="Fast Performance"
        description="Lightning-fast loading times and optimized performance to ensure the best user experience for your customers."
        image-src="/assets/ilustrasi-hero.png"
        layout="left"
        :show-header="false"
      />
      
      <!-- Another Feature Section (tanpa header) -->
      <FeatureItem 
        feature-title="Beautiful Design"
        description="Modern and elegant designs that are visually appealing and enhance your brand image and user engagement."
        image-src="/assets/ilustrasi-hero.png"
        layout="right"
        :show-header="false"
      />
      
      <PortofolioSection 
        :title="pageData.portfolioTitle" 
        :logos="pageData.portofolio" 
      />
      <FaqSection :faqs="pageData.faqs" />
      <AvailableSection />
      <TestimonialsSection />
      <ContactUsSection />
      <FooterSection />
    </div>
  </main>
</template>
