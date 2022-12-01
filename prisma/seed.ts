import { Task } from '@prisma/client'
import { listData } from '../datasources/list'
import { prisma } from '../libs/prisma'

async function main() {
  for (const list of listData) {
    const tasks = list.tasks?.map(task => {id: task.id})
    await prisma.list.create({
      data: {
        id: list.id,
        title: list.title,
        tasks: {
          create: list.tasks ? (list.tasks as Task[]) : [],
        },
      },
    })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
