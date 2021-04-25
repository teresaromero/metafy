import { Router } from 'express'
import { getCurrentUserProfile, getUserProfile } from '../controllers/profile'

import { loggedIn } from '../middleware/auth'

const profileRouter = Router()

profileRouter.get('/me', loggedIn(), getCurrentUserProfile())

profileRouter.get('/users/:user_id', loggedIn(), getUserProfile())

export { profileRouter }
