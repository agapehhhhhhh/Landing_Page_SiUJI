import type { CollectionConfig } from 'payload'

const LandingPage: CollectionConfig = {
  slug: 'landing-page',
  admin: {
    useAsTitle: 'siteTitle',
    group: 'Global Settings',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    // SEO & Meta Information
    {
      name: 'siteTitle',
      label: 'Judul Website',
      type: 'text',
      required: true,
      defaultValue: 'Feezy School - Bayar sekolah, cukup dari rumah',
    },
    {
      name: 'metaDescription',
      label: 'Meta Description',
      type: 'textarea',
      required: true,
      defaultValue: 'Feezy School - Platform pembayaran sekolah yang mudah dan aman. Bayar SPP, track kehadiran, dan kelola komunikasi sekolah dalam satu aplikasi.',
    },
    
    // Social Media
    {
      name: 'socialMedia',
      label: 'Social Media',
      type: 'group',
      fields: [
        {
          name: 'facebook',
          label: 'Facebook URL',
          type: 'text',
          required: false,
        },
        {
          name: 'instagram',
          label: 'Instagram URL',
          type: 'text',
          required: false,
        },
        {
          name: 'twitter',
          label: 'Twitter URL',
          type: 'text',
          required: false,
        },
        {
          name: 'linkedin',
          label: 'LinkedIn URL',
          type: 'text',
          required: false,
        },
      ],
    },

    // Contact Information
    {
      name: 'contactInfo',
      label: 'Contact Information',
      type: 'group',
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          required: false,
        },
        {
          name: 'phone',
          label: 'Phone',
          type: 'text',
          required: false,
        },
        {
          name: 'address',
          label: 'Address',
          type: 'textarea',
          required: false,
        },
      ],
    },

    // Footer Settings
    {
      name: 'footer',
      label: 'Footer',
      type: 'group',
      fields: [
        {
          name: 'copyrightText',
          label: 'Copyright Text',
          type: 'text',
          defaultValue: '© 2025 Feezy School. All rights reserved.',
        },
        {
          name: 'links',
          label: 'Footer Links',
          type: 'array',
          fields: [
            {
              name: 'text',
              label: 'Link Text',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              label: 'Link URL',
              type: 'text',
              required: true,
            },
          ],
          defaultValue: [
            { text: 'About Us', url: '/about' },
            { text: 'Privacy Policy', url: '/privacy' },
            { text: 'Contact Us', url: '/contact' },
          ],
        },
      ],
    },

    // CTA Section (Global)
    {
      name: 'globalCTA',
      label: 'Global Call to Action',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'CTA Title',
          type: 'text',
          defaultValue: 'Join hundreds of schools and parents using Feezy School',
        },
        {
          name: 'description',
          label: 'CTA Description',
          type: 'textarea',
          defaultValue: 'Simplify education payments and school management today.',
        },
        {
          name: 'primaryButtonText',
          label: 'Primary Button Text',
          type: 'text',
          defaultValue: 'Register Your School',
        },
        {
          name: 'primaryButtonLink',
          label: 'Primary Button Link',
          type: 'text',
          defaultValue: '#',
        },
        {
          name: 'secondaryButtonText',
          label: 'Secondary Button Text',
          type: 'text',
          defaultValue: 'Start Now',
        },
        {
          name: 'secondaryButtonLink',
          label: 'Secondary Button Link',
          type: 'text',
          defaultValue: '#',
        },
      ],
    },
  ],
}

export default LandingPage