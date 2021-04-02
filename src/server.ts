import express, { Application, Router } from 'express'
import path from 'path'
import getRoutes from "./router"


export const setupServer = (): Application => {
    const app: Application = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')

    return app
}

export const setRoutes = (app: Application): void => {
    const routes = getRoutes(Router())
    app.use(routes)
}