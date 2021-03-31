import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { PORT } from './config'
import rootRouter from './router/rootRouter'
import callbackRouter from './router/callbackRouter'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', rootRouter)
app.use('/auth', callbackRouter)

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`)
})
