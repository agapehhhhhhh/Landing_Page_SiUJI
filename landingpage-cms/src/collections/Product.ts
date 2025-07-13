import type { CollectionConfig } from 'payload'

const Product: CollectionConfig = {
  slug: 'how-it-works',
  admin: {
    useAsTitle: 'step',
    group: 'Landing Page Sections',
    defaultColumns: ['isActive'],
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
      name: 'isActive',
      label: 'Aktif',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default Product