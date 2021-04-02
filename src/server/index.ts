import express, { Application, Router } from 'express'
import passport from "../passport"
import { authRouter, rootRouter } from "../router"
import session from "express-session"
import MongoDBStore from 'connect-mongodb-session'
import config from '../config'
const MongoStore = MongoDBStore(session);

export const setupServer = (): Application => {
    const app: Application = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    return app
}

export const setRoutes = (app: Application): void => {
    app.use('/', rootRouter)
    app.use('/auth', authRouter)
}

export const enableAuth = (app: Application): void => {
    app.use(session({
        secret: config.MONGO_SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ uri: config.MONGO_URI, collection: config.MONGO_SESSION_NAME })
    }))

    passport(app)
}