import type { CollectionConfig } from 'payload'

const Header: CollectionConfig = {
  slug: 'header',
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
      label: 'Header Name',
      type: 'text',
      required: true,
      defaultValue: 'Main Header',
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'navigationItems',
      label: 'Navigation Menu',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Menu Label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          label: 'Link URL',
          type: 'text',
          required: true,
        },
        {
          name: 'isHighlighted',
          label: 'Highlight Menu Item',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
      defaultValue: [
        { label: 'Home', link: '#home' },
        { label: 'Features', link: '#features' },
        { label: 'About', link: '#about' },
        { label: 'Contact', link: '#contact' },
      ],
    },
    {
      name: 'ctaButton',
      label: 'CTA Button',
      type: 'group',
      fields: [
        {
          name: 'text',
          label: 'Button Text',
          type: 'text',
          defaultValue: 'Login',
        },
        {
          name: 'style',
          label: 'Button Style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
    {
      name: 'isSticky',
      label: 'Sticky Header',
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
          name: 'logoTextEn',
          label: 'Logo Text (English)',
          type: 'text',
        },
        {
          name: 'logoTextMs',
          label: 'Logo Text (Bahasa Malaysia)',
          type: 'text',
        },
        {
          name: 'ctaButtonTextEn',
          label: 'CTA Button Text (English)',
          type: 'text',
        },
        {
          name: 'ctaButtonTextMs',
          label: 'CTA Button Text (Bahasa Malaysia)',
          type: 'text',
        },
      ],
    },
  ],
}

export default Header
