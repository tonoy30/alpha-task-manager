import { startGateway } from './gateway'
import { startServer as startUserServer } from './services/user'

async function bootstrap() {
  await Promise.all([startUserServer()])

  await startGateway()
}

bootstrap()
