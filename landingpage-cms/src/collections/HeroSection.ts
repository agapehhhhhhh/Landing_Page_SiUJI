import type { CollectionConfig } from 'payload'

const HeroSection: CollectionConfig = {
  slug: 'hero-section',
  admin: {
    useAsTitle: 'slogan',
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
      name: 'slogan',
      label: 'Slogan Utama',
      type: 'text',
      required: true,
      defaultValue: 'Bayar sekolah, cukup dari rumah.',
    },
    {
      name: 'description',
      label: 'Deskripsi Pendukung',
      type: 'textarea',
      required: false,
    },
    {
      name: 'ctaButtonText',
      label: 'Teks Tombol CTA',
      type: 'text',
      defaultValue: 'Mulai Sekarang',
      required: true,
    },
    {
      name: 'ctaButtonLink',
      label: 'Link Tombol CTA',
      type: 'text',
      defaultValue: '#',
      required: true,
    },
    {
      name: 'backgroundImage',
      label: 'Gambar Background',
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

export default HeroSection
