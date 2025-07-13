import type { CollectionConfig } from 'payload'

const Footer: CollectionConfig = {
  slug: 'footer',
  admin: {
    useAsTitle: 'name',
    group: 'Site Structure',
    defaultColumns: ['name', 'isActive', 'updatedAt'],
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Footer Name',
      type: 'text',
      required: true,
      defaultValue: 'Main Footer',
    },
    {
      name: 'companyInfo',
      label: 'Company Information',
      type: 'group',
      fields: [
        {
          name: 'name',
          label: 'Company Name',
          type: 'text',
          defaultValue: 'Feezy School',
        },
        {
          name: 'description',
          label: 'Company Description',
          type: 'textarea',
          defaultValue: 'Simplifying school fee payments and management.',
        },
        {
          name: 'logo',
          label: 'Company Logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'address',
          label: 'Address',
          type: 'textarea',
        },
        {
          name: 'phone',
          label: 'Phone Number',
          type: 'text',
        },
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
        },
      ],
    },
    {
      name: 'footerLinks',
      label: 'Footer Links',
      type: 'array',
      fields: [
        {
          name: 'sectionTitle',
          label: 'Section Title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          label: 'Links',
          type: 'array',
          fields: [
            {
              name: 'label',
              label: 'Link Label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
            },
            {
              name: 'openInNewTab',
              label: 'Open in New Tab',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
      defaultValue: [
        {
          sectionTitle: 'Product',
          links: [
            { label: 'Features', url: '#features' },
            { label: 'Pricing', url: '#pricing' },
            { label: 'Schools', url: '#schools' },
          ],
        },
        {
          sectionTitle: 'Support',
          links: [
            { label: 'Help Center', url: '#help' },
            { label: 'Contact Us', url: '#contact' },
            { label: 'FAQ', url: '#faq' },
          ],
        },
        {
          sectionTitle: 'Company',
          links: [
            { label: 'About Us', url: '#about' },
            { label: 'Privacy Policy', url: '#privacy' },
            { label: 'Terms of Service', url: '#terms' },
          ],
        },
      ],
    },
    {
      name: 'socialMediaLinks',
      label: 'Social Media Links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Twitter', value: 'twitter' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
          ],
          required: true,
        },
        {
          name: 'url',
          label: 'Profile URL',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          label: 'Custom Icon',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'copyrightText',
      label: 'Copyright Text',
      type: 'text',
      defaultValue: '© 2024 Feezy School. All rights reserved.',
    },
    {
      name: 'additionalInfo',
      label: 'Additional Information',
      type: 'richText',
      admin: {
        description: 'Any additional text or legal information',
      },
    },
    {
      name: 'newsletterSignup',
      label: 'Newsletter Signup',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          label: 'Enable Newsletter Signup',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'title',
          label: 'Newsletter Title',
          type: 'text',
          defaultValue: 'Stay Updated',
        },
        {
          name: 'description',
          label: 'Newsletter Description',
          type: 'text',
          defaultValue: 'Get the latest updates and news from Feezy School.',
        },
        {
          name: 'buttonText',
          label: 'Subscribe Button Text',
          type: 'text',
          defaultValue: 'Subscribe',
        },
      ],
    },
    {
      name: 'backgroundColor',
      label: 'Background Color',
      type: 'text',
      defaultValue: '#1a1a1a',
    },
    {
      name: 'textColor',
      label: 'Text Color',
      type: 'text',
      defaultValue: '#ffffff',
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'checkbox',
      defaultValue: true,
    },
    // Multi-language support
    {
      name: 'translations',
      label: 'Multi-language Content',
      type: 'group',
      fields: [
        {
          name: 'companyDescriptionEn',
          label: 'Company Description (English)',
          type: 'textarea',
        },
        {
          name: 'companyDescriptionMs',
          label: 'Company Description (Bahasa Malaysia)',
          type: 'textarea',
        },
        {
          name: 'copyrightTextEn',
          label: 'Copyright Text (English)',
          type: 'text',
        },
        {
          name: 'copyrightTextMs',
          label: 'Copyright Text (Bahasa Malaysia)',
          type: 'text',
        },
        {
          name: 'newsletterTitleEn',
          label: 'Newsletter Title (English)',
          type: 'text',
        },
        {
          name: 'newsletterTitleMs',
          label: 'Newsletter Title (Bahasa Malaysia)',
          type: 'text',
        },
      ],
    },
  ],
}

export default Footer
