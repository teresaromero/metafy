import path from 'path'

import config from './config'
import { db, connectDB } from './mongoose'
import { setRoutes, setupServer, enableAuth } from './server'
;(async () => {
  if (db.readyState !== 1) {
    await connectDB()
  }

  const server = setupServer()

  server.set('views', path.join(__dirname, 'views'))
  server.set('view engine', 'ejs')

  enableAuth(server)

  setRoutes(server)

  server.listen(config.PORT, () => {
    console.log(`server started at ${config.PORT}`)
  })
})()
