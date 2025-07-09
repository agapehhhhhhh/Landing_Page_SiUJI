// services/payloadService.js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api'

class PayloadService {
  
  // Fetch single collection
  async fetchCollection(collectionSlug, options = {}) {
    const { limit = 100, sort = 'createdAt', where = {} } = options
    
    const params = new URLSearchParams({
      limit: limit.toString(),
      sort,
      ...where
    })
    
    const response = await axios.get(`${API_BASE_URL}/${collectionSlug}?${params}`)
    return response.data
  }
  
  // Fetch all landing page data
  async fetchLandingPageData() {
    try {
      // Fetch semua collections secara parallel
      const [
        globalSettings,
        heroSection,
        features,
        whyChoose,
        howItWorks,
        testimonials,
        faq
      ] = await Promise.all([
        this.fetchCollection('landing-page', { limit: 1 }),
        this.fetchCollection('hero-section', { limit: 1 }),
        this.fetchCollection('features', { 
          where: { isActive: { equals: true } },
          sort: 'order'
        }),
        this.fetchCollection('why-choose', { limit: 1 }),
        this.fetchCollection('how-it-works', { 
          where: { isActive: { equals: true } },
          sort: 'order'
        }),
        this.fetchCollection('testimonials', { 
          where: { isActive: { equals: true } },
          limit: 10
        }),
        this.fetchCollection('faq', { 
          where: { isActive: { equals: true } },
          sort: 'order'
        })
      ])
      
      // Return structured data
      return {
        global: globalSettings.docs[0] || null,
        hero: heroSection.docs[0] || null,
        features: features.docs || [],
        whyChoose: whyChoose.docs[0] || null,
        howItWorks: howItWorks.docs || [],
        testimonials: testimonials.docs || [],
        faq: faq.docs || []
      }
      
    } catch (error) {
      console.error('Error fetching landing page data:', error)
      throw error
    }
  }
  
  // Fetch specific collection by ID
  async fetchById(collectionSlug, id) {
    const response = await axios.get(`${API_BASE_URL}/${collectionSlug}/${id}`)
    return response.data
  }
}

export default new PayloadService()
