import { AxiosResponse } from 'axios'
import { SpotifyApi } from './BaseInstance'
import { PrivateUserObject, PublicUserObject } from './spotify'

export class UsersSpotifyApi extends SpotifyApi {
  static async getCurrentUser(): Promise<AxiosResponse<PrivateUserObject>> {
    return this.getInstance().get('/me')
  }

  static async getUser(
    user_id: string
  ): Promise<AxiosResponse<PublicUserObject>> {
    return this.getInstance().get(`/users/${user_id}`)
  }
}
