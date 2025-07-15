// File: landingpage-cms/next.config.mjs
import { withPayload } from '@payloadcms/next/withPayload'
import { config } from 'dotenv'
import path from 'path'

// Load .env dari parent directory
config({ path: path.resolve(process.cwd(), '../.env') })

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })