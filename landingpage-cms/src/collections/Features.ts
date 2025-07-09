import type { CollectionConfig } from 'payload'

const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'title',
    group: 'Landing Page Sections',
    defaultColumns: ['title', 'order', 'isActive'],
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Judul Fitur',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Deskripsi Fitur',
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon',
      label: 'Icon Fitur',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'order',
      label: 'Urutan Tampil',
      type: 'number',
      defaultValue: 0,
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

export default Features
