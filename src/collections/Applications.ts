import type { CollectionConfig } from 'payload'

// Applications submitted from the form on each /jobs/<slug> page.
// The site writes these from the server, so the public has no API access.
export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'job', 'email', 'createdAt'],
    description: 'Applications submitted from the job pages on the website.',
  },
  access: {
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  defaultSort: '-createdAt',
  fields: [
    { name: 'job', type: 'relationship', relationTo: 'jobs', required: true },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'linkedin', label: 'LinkedIn', type: 'text' },
    { name: 'message', type: 'textarea' },
  ],
}
