import { Router, Request, Response } from 'express'
import { SpotifyApi } from '../libs/spotify'
import {
  isError,
  isSearchQuery,
  isNewReleasesQuery
} from '../libs/spotify/utils'
import { loggedIn } from '../middleware/auth'

const searchRouter = Router()

searchRouter.get('/', loggedIn(), async (req: Request, res: Response) => {
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

searchRouter.get(
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

export { searchRouter }
