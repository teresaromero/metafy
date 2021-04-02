import { Request, Response, Router } from 'express'
import { protectedRoute } from '../middleware/auth'

const rootRouter = Router()

rootRouter.get('/', (req, res) => {
  res.send('index')
})

rootRouter.get('/home', protectedRoute('/'), (req: Request, res: Response) => {
  res.send('home')
})


export { rootRouter }
