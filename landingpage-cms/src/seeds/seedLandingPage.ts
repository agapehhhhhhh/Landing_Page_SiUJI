import { getPayload } from 'payload'
import config from '../payload.config'
import { landingPageSeeds } from './landingPageSeeds'

async function seed() {
  const payload = await getPayload({ config })

  try {
    console.log('🌱 Starting to seed landing page content...')

    // Clear existing landing page content
    await payload.delete({
      collection: 'landing-page-content',
      where: {}
    })

    console.log('🗑️  Cleared existing landing page content')

    // Insert seed data
    for (const seedData of landingPageSeeds) {
      await payload.create({
        collection: 'landing-page-content',
        data: seedData
      })
      console.log(`✅ Seeded: ${seedData.section} - ${seedData.title}`)
    }

    console.log('🎉 Landing page seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding landing page content:', error)
  } finally {
    process.exit(0)
  }
}

seed().catch(console.error)
