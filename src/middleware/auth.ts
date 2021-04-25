import { Response, Request, NextFunction } from 'express'
import { AuthSpotifyApi } from '../libs/spotify'

export function isAuth(
  req: Request
): req is Request & Express.AuthenticatedRequest {
  return req.isAuthenticated()
}

function isNotAuth(
  req: Request
): req is Request & Express.UnauthenticatedRequest {
  return req.isUnauthenticated()
}

export const loggedIn = () => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (isAuth(req)) {
    AuthSpotifyApi.setAuthorization(req.user)
    next()
  } else {
    res.status(403).send({ message: 'Forbbiden', status: 403 })
  }
}

export const notLoggedIn = () => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (isNotAuth(req)) {
    next()
  } else {
    res.status(409).send({ message: 'Conflict', status: 409 })
  }
}

export const logout = () => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (isAuth(req)) {
    req.logout()
    AuthSpotifyApi.resetAuthorization()

    next()
  } else {
    res.status(409).send({ message: 'Conflict', status: 409 })
  }
}
