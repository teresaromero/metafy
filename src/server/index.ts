import express, { Application, NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import passport from '../passport'
import {
  authRouter,
  rootRouter,
  profileRouter,
  searchRouter,
  k8sRouter
} from '../router'
import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'
import config from '../config'
import { HttpError } from '../libs/response'
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
  app.use('/k8s', k8sRouter)
  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
      res.status(err.statusCode).send(err.toJSON)
    }
  )
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
