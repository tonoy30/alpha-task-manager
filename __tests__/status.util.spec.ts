import { TaskStatus } from '@prisma/client'
import { getStatus } from '../utils/status.util'

describe('Testing Status Util', () => {
  it('should return the `Completed` status', () => {
    const got = getStatus('Completed')
    expect(got).toEqual(TaskStatus.Completed)
  })
  it('should return the `Uncompleted` status', () => {
    const got = getStatus('Uncompleted')
    expect(got).toEqual(TaskStatus.Uncompleted)
  })
  it('should return the default `Uncompleted` status', () => {
    const got = getStatus('')
    expect(got).toEqual(TaskStatus.Uncompleted)
  })
})
