import { TaskStatus } from '@prisma/client'

export const getStatus = (status: string) => {
  switch (status) {
    case 'Completed':
      return TaskStatus.Completed
    default:
      return TaskStatus.Uncompleted
  }
}
