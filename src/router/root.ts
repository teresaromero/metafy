import { Request, Response, Router } from 'express'
import { SpotifyApi } from '../libs/spotify'
import { RegularErrorResponse } from '../libs/spotify/spotify'
import { loggedIn } from '../middleware/auth'

function isError(
  data: RegularErrorResponse | unknown
): data is RegularErrorResponse {
  return (data as RegularErrorResponse).error !== undefined
}

const rootRouter = Router()

rootRouter.get('/', (req, res) => {
  res.send('index')
})

rootRouter.get('/home', loggedIn(), (req: Request, res: Response) => {
  res.send('home')
})

rootRouter.get('/me', loggedIn(), async (req: Request, res: Response) => {
  const data = await SpotifyApi.getCurrentUser()

  if (isError(data)) {
    res.status(data.error.status).send(data.error)
  } else {
    res.send(data)
  }
})

rootRouter.get(
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

export { rootRouter }
