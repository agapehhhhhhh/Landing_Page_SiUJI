import dotenv from 'dotenv'
import path from 'path'

// Load environment variables FIRST before any other imports
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import { getPayload } from 'payload'
import config from '../payload.config'
import { seedLandingPageCollections } from './seedLandingPageCollections'

// Debug environment variables
console.log('🔍 Environment check:')
console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? '✅ Found' : '❌ Missing')
console.log('DATABASE_URI:', process.env.DATABASE_URI ? '✅ Found' : '❌ Missing')
console.log('PAYLOAD_SECRET value:', process.env.PAYLOAD_SECRET)

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
