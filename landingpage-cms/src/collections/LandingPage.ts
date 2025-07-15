// File: landingpage-cms/src/collections/LandingPage.ts
import { CollectionConfig } from 'payload'

export const LandingPage: CollectionConfig = {
  slug: 'landing-page',
  admin: {
    useAsTitle: 'title',
  },
    access: {
        read: () => true, // Public read access
        create: () => true, // Allow creation by anyone
        update: () => true, // Allow updates by anyone
        delete: () => false, // No delete access
    },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // ... other fields
  ],
}