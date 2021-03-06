import path from 'path'

import config from './config'
import { connectDB } from './config/mongoose'
import { setRoutes, setupServer, enableAuth, traceRequestId } from './server'
import { logger, httpLogger, httpErrorLogger } from './winston'
;(async () => {
  await connectDB()

  const server = setupServer()

  traceRequestId(server)

  server.set('views', path.join(__dirname, 'views'))
  server.set('view engine', 'ejs')

  enableAuth(server)

  server.use(httpLogger)

  setRoutes(server)

  server.use(httpErrorLogger)

  server.listen(config.PORT, () => {
    logger.info(`server started at ${config.PORT}`, { label: 'server' })
  })
})()
