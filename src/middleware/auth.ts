import { Response, Request, NextFunction } from 'express'

export const loggedIn = (redirect: string) => (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    console.log('Error: you are not logged in!')
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
    console.log('Error: you are logged in!')
    res.redirect(redirect)
  } else {
    next()
  }
}

export const logout = (redirect = '/') => (
  req: Request,
  res: Response
): void => {
  req.logout()
  console.log('Info: you are logout!')
  res.redirect(redirect)
}
