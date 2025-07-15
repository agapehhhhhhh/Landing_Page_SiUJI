// File: landingpage-cms/vitest.setup.ts
import { config } from 'dotenv'
import path from 'path'

// Load .env dari parent directory
config({ path: path.resolve(__dirname, '../.env') })

// Any other setup scripts you might need go here