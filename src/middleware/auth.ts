import { Response, Request, NextFunction } from 'express'
import { logger } from '../winston'

export const loggedIn = (redirect: string) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    logger.error('Error: you are not logged in!', {
      'x-request-id': req['x-request-id']
    })
    res.redirect(redirect)
  } else {
    next()
  }
}

export const notLoggedIn = (redirect: string) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user) {
    logger.error('Error: you are already logged in!', {
      'x-request-id': req['x-request-id'],
      user: req.user.id
    })
    res.redirect(redirect)
  } else {
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
  res.redirect(redirect)
}
