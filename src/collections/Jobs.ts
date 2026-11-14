import { APIError, type CollectionConfig } from 'payload'

import { geocode } from '../lib/geocode'
import { INDUSTRIES, JOB_TYPES, WORKPLACES, slugify } from '../lib/job-options'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'industry', 'status', 'postedAt'],
    description:
      'Roles shown on the public /jobs page and map. Only jobs with status "Open" are shown.',
  },
  access: {
    // The public can only read open jobs; signed-in editors see everything.
    read: ({ req }) => (req.user ? true : { status: { equals: 'open' } }),
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  defaultSort: '-postedAt',
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, operation }) => {
        if (!data.slug && data.title) data.slug = slugify(data.title)

        // Place the job on the map whenever its location text is new or changed.
        const locationChanged =
          operation === 'create' || data.location !== originalDoc?.location || !data.coordinates
        if (locationChanged && data.location) {
          const place = await geocode(data.location)
          if (!place) {
            throw new APIError(
              `Couldn't find "${data.location}" on the map. Try a format like "Grand Rapids, MI" or a ZIP code.`,
              400,
              undefined,
              true,
            )
          }
          data.coordinates = [place.lng, place.lat]
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'company',
      type: 'text',
      admin: {
        description: 'Hiring company. Leave blank to show "Confidential client".',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: {
        description:
          'City and state (e.g. "Grand Rapids, MI"), a ZIP code, or a full address. The map pin is placed from this automatically when you save.',
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'jobType', label: 'Job type', type: 'select', required: true, defaultValue: 'full-time', options: [...JOB_TYPES] },
        { name: 'industry', type: 'select', required: true, options: [...INDUSTRIES] },
        { name: 'workplace', type: 'select', defaultValue: 'on-site', options: [...WORKPLACES] },
      ],
    },
    {
      name: 'salary',
      type: 'text',
      admin: { description: 'Optional, shown as written, e.g. "$140k – $170k + bonus".' },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 280,
      admin: { description: 'One or two sentences shown on the job card and in search results.' },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: { description: 'Full job description: the role, responsibilities, and qualifications.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'open',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'postedAt',
      label: 'Date posted',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Web address: /jobs/<slug>. Filled in from the title if left blank.',
      },
    },
    {
      name: 'coordinates',
      label: 'Map position',
      type: 'point',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Set automatically from the location when you save.',
      },
    },
  ],
}
