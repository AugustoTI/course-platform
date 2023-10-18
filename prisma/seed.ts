import { PrismaClient } from '@prisma/client'

const database = new PrismaClient()

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: 'Computer Science' },
        { name: 'Music' },
        { name: 'Fitness' },
        { name: 'Filming' },
        { name: 'Engineering' },
        { name: 'Accounting' },
        { name: 'Photography' },
        { name: 'Software Engineering' },
        { name: 'Languages' },
        { name: 'Art and drawing' },
      ],
    })

    console.log('Success')
  } catch (error) {
    console.log('Error seeding the database categories', error)
  } finally {
    await database.$disconnect()
  }
}

main()
