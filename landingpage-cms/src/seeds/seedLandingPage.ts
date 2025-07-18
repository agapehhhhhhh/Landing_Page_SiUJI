import { getPayload } from 'payload'
import config from '../payload.config'
import { seedLandingPageCollections } from './seedLandingPageCollections'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function seed() {
  const payload = await getPayload({ config })

  try {
    console.log('🌱 Starting to seed all landing page collections...')

    // Run the comprehensive seeding function
    await seedLandingPageCollections(payload)

    console.log('🎉 All landing page collections seeded successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding landing page collections:', error)
  } finally {
    process.exit(0)
  }
}

seed().catch(console.error)
