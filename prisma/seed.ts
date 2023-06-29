import { PrismaClient } from '@prisma/client'

import { application, platform, postClassification } from './seeders'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  console.log('Start seeding...');

  await prisma.aplication.createMany({
    data: application,
    skipDuplicates: true
  })
  console.log('Created application');

  await prisma.platform.createMany({
    data: platform,
    skipDuplicates: true
  })
  console.log('Created platform');

  await prisma.postClassification.createMany({
    data: postClassification,
    skipDuplicates: true
  })
  console.log('Created post classification');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
