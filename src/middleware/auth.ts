import { Response, Request, NextFunction } from 'express'
import { SpotifyApi } from '../libs/spotify'
import { logger } from '../winston'

export const loggedIn = (redirect: string) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.isUnauthenticated()) {
    logger.error('Error: you are not logged in!', {
      'x-request-id': req['x-request-id']
    })
    res.redirect(redirect)
  } else {
    req.isAuthenticated()
    next()
  }
}

export const notLoggedIn = (redirect: string) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.isAuthenticated()) {
    logger.error('Error: you are already logged in!', {
      'x-request-id': req['x-request-id'],
      user: req.user.id
    })
    res.redirect(redirect)
  } else {
    req.isUnauthenticated()
    next()
  }
}

export const logout = (redirect = '/') => (
  req: Request,
  res: Response
): void => {
  logger.info('User logout', {
    'x-request-id': req['x-request-id'],
    user: req.user?.id
  })
  req.logout()

  SpotifyApi.setAuthorization('')

  res.redirect(redirect)
}
