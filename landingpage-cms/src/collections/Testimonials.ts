import type { CollectionConfig } from 'payload'

const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    group: 'Landing Page Sections',
    defaultColumns: ['name', 'role', 'isActive'],
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
      label: 'Nama',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Peran',
      type: 'select',
      options: [
        { label: 'Parent', value: 'parent' },
        { label: 'School Admin', value: 'school_admin' },
        { label: 'Teacher', value: 'teacher' },
      ],
      required: true,
    },
    {
      name: 'schoolName',
      label: 'Nama Sekolah',
      type: 'text',
      required: false,
    },
    {
      name: 'testimonial',
      label: 'Testimonial',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      label: 'Rating (1-5)',
      type: 'number',
      min: 1,
      max: 5,
      defaultValue: 5,
      required: true,
    },
    {
      name: 'avatar',
      label: 'Foto Profil',
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

export default Testimonials
