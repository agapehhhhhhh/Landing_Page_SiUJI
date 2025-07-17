import type { CollectionConfig } from 'payload'

export const LandingPageContent: CollectionConfig = {
  slug: 'landing-page-content',
  admin: {
    useAsTitle: 'section',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'section',
      type: 'select',
      required: true,
      options: [
        { label: 'Hero Section', value: 'hero' },
        { label: 'About Us', value: 'about' },
        { label: 'Why Choose Us', value: 'why-choose' },
        { label: 'Platform Availability', value: 'platform' },
        { label: 'Social Proof', value: 'social-proof' },
        { label: 'Contact', value: 'contact' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Button Text',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Button Link',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
    // Dynamic content based on section type
    {
      name: 'dynamicContent',
      type: 'json',
      label: 'Section-specific Content',
    },
  ],
}
