import { Router, Request, Response } from 'express'
import { getCurrentUserProfile, getUserProfile } from '../controllers/profile'
import { PrivateUserObject, PublicUserObject } from '../libs/spotify/spotify'
import { handleResponse } from '../middleware'
import { loggedIn } from '../middleware/auth'

const profileRouter = Router()

profileRouter.get('/me', loggedIn(), async (_req: Request, res: Response) => {
  const result = await getCurrentUserProfile()
  handleResponse<PrivateUserObject>(res, result)
})

profileRouter.get(
  '/users/:user_id',
  loggedIn(),
  async (req: Request, res: Response) => {
    const result = await getUserProfile(req.params.user_id)
    handleResponse<PublicUserObject>(res, result)
  }
)

export { profileRouter }
