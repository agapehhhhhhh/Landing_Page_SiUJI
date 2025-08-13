import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import PrivacyPolicy from '@/components/sections/PrivacyPolicy.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/privacy-policy', component: PrivacyPolicy }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router