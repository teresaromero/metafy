import express, { Application, NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import passport from '../passport'
import { authRouter, rootRouter, profileRouter, searchRouter } from '../router'
import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'
import config from '../config'
const MongoStore = MongoDBStore(session)

export const setupServer = (): Application => {
  const app: Application = express()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  return app
}

export const setRoutes = (app: Application): void => {
  app.use('/', rootRouter)
  app.use('/auth', authRouter)
  app.use('/profile', profileRouter)
  app.use('/search', searchRouter)
}

export const enableAuth = (app: Application): void => {
  app.use(
    session({
      secret: config.MONGO_SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({
        uri: config.MONGO_URI,
        collection: config.MONGO_SESSION_NAME
      })
    })
  )

  passport(app)
}

export const traceRequestId = (app: Application): void => {
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const requestId = uuidv4()
    req['x-request-id'] = requestId
    res.setHeader('x-request-id', requestId)
    next()
  })
}
