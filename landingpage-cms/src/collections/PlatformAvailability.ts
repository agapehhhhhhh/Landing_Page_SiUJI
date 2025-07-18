import type { CollectionConfig } from 'payload'

export const PlatformAvailability: CollectionConfig = {
  slug: 'platform-availability',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isActive', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Platform Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Used for platform selection (e.g., "android", "web", "ios")',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Platform Icon',
    },
    {
      name: 'mockupImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Platform UI Mockup',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Platform Description',
    },
    {
      name: 'downloadLink',
      type: 'text',
      label: 'Download/Access Link',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Platform-specific Features',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'systemRequirements',
      type: 'array',
      label: 'System Requirements',
      fields: [
        {
          name: 'requirement',
          type: 'text',
          required: true,
        },
      ],
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
      admin: {
        description: 'Order of appearance in platform tabs',
      },
    },
    {
      name: 'isComingSoon',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark platform as "Coming Soon"',
      },
    },
  ],
  defaultSort: 'order',
}

export default PlatformAvailability
