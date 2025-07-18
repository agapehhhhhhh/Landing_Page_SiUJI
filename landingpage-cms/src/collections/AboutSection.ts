import type { CollectionConfig } from 'payload'

export const AboutSection: CollectionConfig = {
  slug: 'about-section',
  admin: {
    useAsTitle: 'title',
    description: 'About us section content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'What is SIUJI?',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Main Description',
    },
    {
      name: 'targetUsers',
      type: 'array',
      label: 'Target User Cards',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Card Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Card Description',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Icon',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Image',
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default AboutSection
