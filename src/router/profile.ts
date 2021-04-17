import { Router, Request, Response } from 'express'
import { SpotifyApi } from '../libs/spotify'
import { isError } from '../libs/spotify/utils'
import { loggedIn } from '../middleware/auth'

const profileRouter = Router()

profileRouter.get('/me', loggedIn(), async (_req: Request, res: Response) => {
  const data = await SpotifyApi.getCurrentUser()

  if (isError(data)) {
    res.status(data.error.status).send(data.error)
  } else {
    res.send(data)
  }
})

profileRouter.get(
  '/users/:user_id',
  loggedIn(),
  async (req: Request, res: Response) => {
    const data = await SpotifyApi.getUser(req.params.user_id)

    if (isError(data)) {
      res.status(data.error.status).send(data.error)
    } else {
      res.send(data)
    }
  }
)

export { profileRouter }
