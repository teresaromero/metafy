import { NextFunction, Request, Response } from 'express'
import { Result } from '../libs/response'
import { SpotifyApi } from '../libs/spotify'
import { PrivateUserObject, PublicUserObject } from '../libs/spotify/spotify'
import { handleError } from '../libs/spotify/utils'

export const getCurrentUserProfile = () => async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { data } = await SpotifyApi.getCurrentUser()
    const result = Result.ok(data)
    res.send(result.data)
  } catch (err) {
    const { error } = handleError<PublicUserObject>(err)
    next(error)
  }
}

export const getUserProfile = () => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { data } = await SpotifyApi.getUser(req.params.user_id)
    const result = Result.ok(data)
    res.send(result.data)
  } catch (err) {
    const { error } = handleError<PrivateUserObject>(err)
    next(error)
  }
}
