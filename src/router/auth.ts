import { Router } from 'express'
import { logout, notLoggedIn, loggedIn } from '../middleware/auth'
import { authenticate } from '../passport'

const authRouter = Router()

authRouter.get('/logout', loggedIn('/'), logout())

authRouter.get(
  '/spotify',
  notLoggedIn('/home'),
  authenticate('spotify', { authInfo: true })
)

authRouter.get(
  '/spotify/callback',
  authenticate('spotify', {
    successRedirect: '/home',
    failureRedirect: '/auth/login'
  })
)

export { authRouter }
