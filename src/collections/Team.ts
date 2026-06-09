import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'order'],
    description:
      'Team members shown on the public /team page. Lower "order" values appear first.',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  defaultSort: 'order',
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Job title, e.g. "Founder and Principal"' },
    },
    {
      name: 'location',
      type: 'text',
      admin: { description: 'e.g. "Grand Rapids, Michigan"' },
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        description:
          'Contact email shown under the location. Rendered as a mailto link; hidden if blank.',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Profile photo (portrait). Falls back to the Wren mark if empty.' },
    },
    {
      name: 'body',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Paragraph', plural: 'Paragraphs' },
      admin: { description: 'Bio paragraphs, shown in order.' },
      fields: [{ name: 'paragraph', type: 'textarea', required: true }],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Display order on the team page (ascending).',
      },
    },
  ],
}
