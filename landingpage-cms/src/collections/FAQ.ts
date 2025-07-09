import type { CollectionConfig } from 'payload'

const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question',
    group: 'Landing Page Sections',
    defaultColumns: ['question', 'order', 'isActive'],
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'question',
      label: 'Pertanyaan',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      label: 'Jawaban',
      type: 'textarea',
      required: true,
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

export default FAQ
