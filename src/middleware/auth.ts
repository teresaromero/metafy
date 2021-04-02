import { Response, Request, NextFunction } from "express"

export const protectedRoute = (redirect: string) => (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.redirect(redirect)
    } else {
        next()
    }
}

export const logout = (redirect: string = "/home") => (req: Request, res: Response): void => {
    req.logout()
    res.redirect(redirect)
}