import { Request, Response, Router } from 'express'
import { loggedIn } from '../middleware/auth'

const rootRouter = Router()

rootRouter.get('/', (req, res) => {
  res.send('index')
})

rootRouter.get('/home', loggedIn(), (req: Request, res: Response) => {
  res.send('home')
})

export { rootRouter }
