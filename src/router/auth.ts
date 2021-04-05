import { Router } from 'express'
import { logout, notLoggedIn } from '../middleware/auth'
import { authenticate } from '../passport'

const authRouter = Router()

authRouter.get('/logout', logout(), (req, res) => {
  res.sendStatus(205)
})

authRouter.get(
  '/spotify',
  notLoggedIn(),
  authenticate('spotify', { authInfo: true })
)

authRouter.get(
  '/spotify/callback',
  notLoggedIn(),
  authenticate('spotify', {
    successRedirect: '/home',
    failureRedirect: '/auth/login'
  })
)

export { authRouter }
