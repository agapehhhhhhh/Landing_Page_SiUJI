import type { CollectionConfig } from 'payload'

const HowItWorks: CollectionConfig = {
  slug: 'how-it-works',
  admin: {
    useAsTitle: 'step',
    group: 'Landing Page Sections',
    defaultColumns: ['step', 'order', 'isActive'],
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'step',
      label: 'Langkah',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Deskripsi Langkah',
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon',
      label: 'Icon Langkah',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'order',
      label: 'Urutan Langkah',
      type: 'number',
      defaultValue: 1,
      required: true,
    },
    {
      name: 'isActive',
      label: 'Aktif',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default HowItWorks
