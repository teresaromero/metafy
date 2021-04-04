import { Request, Response, Router } from 'express'
import { SpotifyApi } from '../libs/spotify'
import { loggedIn } from '../middleware/auth'

const rootRouter = Router()

rootRouter.get('/', (req, res) => {
  res.send('index')
})

rootRouter.get('/home', loggedIn('/'), (req: Request, res: Response) => {
  res.send('home')
})

rootRouter.get('/me', loggedIn('/'), async (req: Request, res: Response) => {
  const data = await SpotifyApi.getCurrentUser()
  res.send(data)
})

rootRouter.get(
  '/users/:user_id',
  loggedIn('/'),
  async (req: Request, res: Response) => {
    const data = await SpotifyApi.getUser(req.params.user_id)
    res.send(data)
  }
)

export { rootRouter }
