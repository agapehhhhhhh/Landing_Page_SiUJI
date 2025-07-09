import type { CollectionConfig } from 'payload'

const WhyChoose: CollectionConfig = {
  slug: 'why-choose',
  admin: {
    useAsTitle: 'sectionTitle',
    group: 'Landing Page Sections',
  },
  access: {
    read: () => true,
    update: () => true,
    create: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'sectionTitle',
      label: 'Judul Section',
      type: 'text',
      defaultValue: 'Why Choose Feezy School',
      required: true,
    },
    {
      name: 'sectionDescription',
      label: 'Deskripsi Section',
      type: 'textarea',
      required: false,
    },
    {
      name: 'forParentsTitle',
      label: 'Judul untuk Orang Tua',
      type: 'text',
      defaultValue: 'For Parents',
      required: true,
    },
    {
      name: 'forParentsPoints',
      label: 'Poin-poin untuk Orang Tua',
      type: 'array',
      fields: [
        {
          name: 'point',
          label: 'Poin',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { point: 'No more queues, pay fees from anywhere.' },
        { point: 'Track attendance in real-time.' },
      ],
    },
    {
      name: 'forSchoolsTitle',
      label: 'Judul untuk Sekolah',
      type: 'text',
      defaultValue: 'For Schools',
      required: true,
    },
    {
      name: 'forSchoolsPoints',
      label: 'Poin-poin untuk Sekolah',
      type: 'array',
      fields: [
        {
          name: 'point',
          label: 'Poin',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { point: 'Simplified payment management with detailed records.' },
        { point: 'Improved communication with parents.' },
      ],
    },
    {
      name: 'illustration',
      label: 'Ilustrasi',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'isActive',
      label: 'Aktif',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default WhyChoose
