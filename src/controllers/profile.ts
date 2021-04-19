import { Result } from '../libs/response'
import { SpotifyApi } from '../libs/spotify'
import { PrivateUserObject, PublicUserObject } from '../libs/spotify/spotify'
import { handleError } from '../libs/spotify/utils'

export const getCurrentUserProfile = async (): Promise<
  Result<PrivateUserObject>
> => {
  try {
    const currentUser = await SpotifyApi.getCurrentUser()
    return Result.ok(currentUser.data)
  } catch (error) {
    return handleError<PrivateUserObject>(error)
  }
}

export const getUserProfile = async (
  id: string
): Promise<Result<PublicUserObject>> => {
  try {
    const userProfile = await SpotifyApi.getUser(id)
    return Result.ok(userProfile.data)
  } catch (error) {
    return handleError<PublicUserObject>(error)
  }
}
