// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import HeroSection from './collections/HeroSection'
import AboutSection from './collections/AboutSection'
import WhyChooseSection from './collections/WhyChooseSection'
import ContactSection from './collections/ContactSection'
import { Features  } from './collections/Features'
import { Testimonials } from './collections/Testimonials'
import { PricingPlans } from './collections/PricingPlans'
import { FAQ } from './collections/FrequentlyAskedQuestion'
import { Partners } from './collections/Partners'
import { PlatformAvailability} from './collections/PlatformAvailability'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users, 
    Media,
    // Landing Page Sections
    HeroSection,
    AboutSection,
    WhyChooseSection,
    ContactSection,
    // Feature Collections
    Features, 
    Testimonials, 
    PricingPlans, 
    FAQ, 
    Partners, 
    PlatformAvailability
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
