import { startGateway } from './gateway'
import { startServer as startTaskManagerServer } from './services/tasks'
import { startServer as startUserServer } from './services/user'

async function bootstrap() {
  await Promise.all([startUserServer(), startTaskManagerServer()])

  await startGateway()
}

bootstrap()
