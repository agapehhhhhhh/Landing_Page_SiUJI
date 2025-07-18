import type { CollectionConfig } from 'payload'

export const ContactSection: CollectionConfig = {
  slug: 'contact-section',
  admin: {
    useAsTitle: 'title',
    description: 'Contact section content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Get In Touch With Us!',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Office Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
    },
    {
      name: 'workingHours',
      type: 'text',
      label: 'Working Hours',
    },
    {
      name: 'mapConfig',
      type: 'group',
      label: 'Map Configuration',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          label: 'Latitude',
          defaultValue: -6.9175,
        },
        {
          name: 'longitude',
          type: 'number',
          label: 'Longitude',
          defaultValue: 107.6191,
        },
        {
          name: 'zoom',
          type: 'number',
          label: 'Map Zoom Level',
          defaultValue: 15,
        },
        {
          name: 'marker',
          type: 'text',
          label: 'Marker Text',
          defaultValue: 'SiUJI Office',
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

export default ContactSection
