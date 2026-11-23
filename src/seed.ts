import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const teamDir = path.resolve(dirname, '..', 'public', 'team')

type Member = {
  name: string
  title: string
  location: string
  email: string
  file: string
  body: string[]
}

const members: Member[] = [
  {
    name: 'Chaz Amidon',
    title: 'Founder and Principal',
    location: 'Grand Rapids, Michigan',
    email: 'Chaz@wrensearch.com',
    file: 'Chaz1.webp',
    body: [
      'Chaz has been in corporate recruiting and executive search for a combined 15 years. He founded Wren with a vision to create more value for clients in the furnishings industries, where he has worked for the past decade.',
      'Chaz led executive search at The Mav Group (formerly Palladian West) for eight years prior to founding Wren. He graduated with his MBA from Loyola University Chicago, with an undergraduate degree from Calvin University. He lives in Byron Center, MI, with his wife, Allie; three children, Cooper, Isla and Evangeline; and his bernedoodle Rocky.',
    ],
  },
  {
    name: 'Ashley Myers',
    title: 'Vice President of Recruiting',
    location: 'Grand Rapids, Michigan',
    email: 'Ashley@wrensearch.com',
    file: 'Ashley1.webp',
    body: [
      'Ashley is a former HR executive with a track record of high-caliber placements in the industry. With a strong passion for the industry, Ashley is known for her insightful, collaborative approach. She leads searches, client engagements, and the team Wren is building.',
      'Ashley was an Executive Recruiter at The Mav Group (2022-2026) and served in a variety of prior HR leadership roles, including at Member First Mortgage and Meijer Credit Union. She is a licensed Predictive Index consultant and is SHRM-certified. A graduate of Ferris State University, Ashley lives in Wyoming, MI, with her husband, Matt, her two children, Frankie and Marlowe, and her dogs, Loki and Sylvie.',
    ],
  },
  {
    name: 'Hannah Staal',
    title: 'Executive Recruiter',
    location: 'Grand Rapids, Michigan',
    email: 'Hannah@wrensearch.com',
    file: 'Hannah1.webp',
    body: [
      'Hannah Staal, a talent acquisition leader with 13+ years of experience in executive search, technical recruiting, and building scalable hiring functions, joins Wren as an Executive Recruiter. Known for her strategic, relationship-driven approach, Hannah is particularly passionate about coaching recruitment teams and hiring managers alike to build true partners in the process.',
      'Hannah most recently served as a Talent Acquisition Consultant at Steelcase and previously held progressive leadership roles at Vervint. She is a DDI Targeted Selection Certified Trainer and a graduate of Grand Valley State University. Hannah lives in Grand Rapids, and enjoys spending time outdoors playing sports or hiking with her family.',
    ],
  },
  {
    name: 'Molly Boeve',
    title: 'Sourcing Manager',
    location: 'Grand Rapids, Michigan',
    email: 'Molly@wrensearch.com',
    file: 'Molly1.webp',
    body: [
      'Molly is an experienced recruiting professional with a passion for connecting talented individuals with opportunities that help them thrive. Her passion for connecting people with opportunities, combined with a strategic and relationship-driven approach, has enabled her to contribute to successful hiring outcomes for both growing organizations and established companies.',
      'Outside of work, sports have always been a big part of her life. She loves the energy, competition, and lifelong lessons that sports provide, which translate into her recruiting approach.',
    ],
  },
]

const seed = async () => {
  const payload = await getPayload({ config })

  // Idempotent re-seed: clear existing team members and their media (the media
  // delete also removes the objects from S3) so this can be run repeatedly.
  const existingTeam = await payload.find({ collection: 'team', limit: 1000 })
  for (const doc of existingTeam.docs) {
    await payload.delete({ collection: 'team', id: doc.id })
  }
  const existingMedia = await payload.find({ collection: 'media', limit: 1000 })
  for (const doc of existingMedia.docs) {
    await payload.delete({ collection: 'media', id: doc.id })
  }
  if (existingTeam.docs.length || existingMedia.docs.length) {
    payload.logger.info(
      `Cleared ${existingTeam.docs.length} team and ${existingMedia.docs.length} media docs before re-seeding.`,
    )
  }

  let order = 1
  for (const m of members) {
    payload.logger.info(`Seeding ${m.name}...`)

    const media = await payload.create({
      collection: 'media',
      // Focal point biased toward the top so the focal-cropped portrait size
      // keeps each person's head in frame. Fine-tune per photo in /admin.
      data: { alt: m.name, focalX: 50, focalY: 30 },
      filePath: path.join(teamDir, m.file),
    })

    await payload.create({
      collection: 'team',
      data: {
        name: m.name,
        title: m.title,
        location: m.location,
        email: m.email,
        photo: media.id,
        body: m.body.map((paragraph) => ({ paragraph })),
        order: order++,
      },
    })
  }

  payload.logger.info(`Seeded ${members.length} team members.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
