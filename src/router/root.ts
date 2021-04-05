import { Request, Response, Router } from 'express'
import { SpotifyApi } from '../libs/spotify'
import {
  isError,
  isSearchQuery,
  isNewReleasesQuery
} from '../libs/spotify/utils'
import { loggedIn } from '../middleware/auth'

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

rootRouter.get('/search', loggedIn(), async (req: Request, res: Response) => {
  if (isSearchQuery(req.query)) {
    const data = await SpotifyApi.search(req.query)

    if (isError(data)) {
      res.status(data.error.status).send(data.error)
    } else {
      res.send(data)
    }
  } else {
    res
      .status(400)
      .send({ status: 400, message: 'Missing query params q or type' })
  }
})

rootRouter.get(
  '/new-releases',
  loggedIn(),
  async (req: Request, res: Response) => {
    if (isNewReleasesQuery(req.query)) {
      const data = await SpotifyApi.newReleases(req.query)

      if (isError(data)) {
        res.status(data.error.status).send(data.error)
      } else {
        res.send(data)
      }
    } else {
      res.status(400).send({ status: 400, message: 'Wrong query params' })
    }
  }
)

export { rootRouter }
