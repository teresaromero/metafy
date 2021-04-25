import { SpotifyApi } from './BaseInstance'

export class AuthSpotifyApi extends SpotifyApi {
  static setAuthorization(user: Express.User): void {
    this.getInstance().defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.accessToken}`
  }

  static resetAuthorization(): void {
    this.getInstance().defaults.headers.common['Authorization'] = undefined
  }
}
