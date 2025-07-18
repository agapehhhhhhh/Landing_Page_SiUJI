// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import HeroSection from './collections/HeroSection'
import Features from './collections/Features'
import WhyChoose from './collections/WhyChoose'
import Product from './collections/Product'
import Testimonials from './collections/Testimonials'
import FAQ from './collections/FAQ'
import { LandingPage } from './collections/LandingPage'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Header from './collections/Header'
import Footer from './collections/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- SiUJI CMS',
    },
  },
  collections: [Users, Media, Header, Footer, HeroSection, Features, WhyChoose, Product, Testimonials, FAQ, LandingPage],
  cors: ['http://localhost:5173'],
  csrf: ['http://localhost:5173'],
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
