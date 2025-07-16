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
    // Enable file watching for hot reload in Docker
    webpackConfig.watchOptions = {
      poll: 1000,        // Check for changes every second
      aggregateTimeout: 300,  // Delay before rebuilding
      ignored: /node_modules/
    }
    return webpackConfig
  },
  // Use correct Next.js 15 configuration
  serverExternalPackages: ['@payloadcms/next'],
  
  // Enable experimental features for better dev experience
  experimental: {
    // Add any experimental features if needed
  }
}

export default withPayload(nextConfig, { devBundleServerPackages: false })