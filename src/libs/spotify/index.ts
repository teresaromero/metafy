import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { PrivateUserObject, PublicUserObject } from './spotify'
import config from '../../config'

// Note: If Web API returns status code 429, it means that you have sent too many requests.
// When this happens, check the Retry-After header, where you will see a number displayed.
// This is the number of seconds that you need to wait, before you try your request again.

export class SpotifyApi {
  private static instance: AxiosInstance

  private static getInstance(): AxiosInstance {
    if (!SpotifyApi.instance) {
      SpotifyApi.instance = axios.create({ baseURL: config.SP_API_BASEURL })
    }

    SpotifyApi.instance.defaults.headers.get['Content-Type'] =
      'application/json'

    SpotifyApi.instance.interceptors.request.use((sent) => {
      console.log(sent)
      return sent
    })
    SpotifyApi.instance.interceptors.response.use((recieved) => {
      console.log(recieved)
      return recieved
    })
    return SpotifyApi.instance
  }

  static setAuthorization(accessToken: string): void {
    SpotifyApi.getInstance().defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`
  }

  static async getCurrentUser(): Promise<PrivateUserObject | string> {
    try {
      const response: AxiosResponse<PrivateUserObject> = await SpotifyApi.getInstance().get(
        '/me'
      )
      return response.data
    } catch (error) {
      return error.message
    }
  }

  static async getUser(user_id: string): Promise<PublicUserObject | string> {
    try {
      const response: AxiosResponse<PrivateUserObject> = await SpotifyApi.getInstance().get(
        `/users/${user_id}`
      )
      return response.data
    } catch (error) {
      console.log(error.message)
      return error.message
    }
  }
}
