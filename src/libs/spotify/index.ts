import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import {
  PrivateUserObject,
  PublicUserObject,
  RegularErrorResponse,
  SearchQuery
} from './spotify'
import config from '../../config'

// Note: If Web API returns status code 429, it means that you have sent too many requests.
// When this happens, check the Retry-After header, where you will see a number displayed.
// This is the number of seconds that you need to wait, before you try your request again.
function isAxiosError(
  error: AxiosError<RegularErrorResponse>
): error is AxiosError<RegularErrorResponse> {
  return error.isAxiosError
}

export class SpotifyApi {
  private static instance: AxiosInstance

  private static getInstance(): AxiosInstance {
    if (!SpotifyApi.instance) {
      SpotifyApi.instance = axios.create({ baseURL: config.SP_API_BASEURL })
    }

    SpotifyApi.instance.defaults.headers.get['Content-Type'] =
      'application/json'

    SpotifyApi.instance.interceptors.request.use((request) => {
      return request
    })
    SpotifyApi.instance.interceptors.response.use((response) => {
      return response
    })
    return SpotifyApi.instance
  }

  static setAuthorization(user: Express.User): void {
    SpotifyApi.getInstance().defaults.headers.common[
      'Authorization'
    ] = `Bearer ${user.accessToken}`
  }

  static resetAuthorization(): void {
    SpotifyApi.getInstance().defaults.headers.common[
      'Authorization'
    ] = undefined
  }

  static async getCurrentUser(): Promise<
    PrivateUserObject | RegularErrorResponse
  > {
    try {
      const response: AxiosResponse<PrivateUserObject> = await SpotifyApi.getInstance().get(
        '/me'
      )
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response!.data
        return data
      } else {
        return { error: { message: error.message, status: 500 } }
      }
    }
  }

  static async getUser(
    user_id: string
  ): Promise<PublicUserObject | RegularErrorResponse> {
    try {
      const response: AxiosResponse<PrivateUserObject> = await SpotifyApi.getInstance().get(
        `/users/${user_id}`
      )
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response!.data
        return data
      } else {
        return { error: { message: error.message, status: 500 } }
      }
    }
  }

  static async search(
    query: SearchQuery
  ): Promise<PublicUserObject | RegularErrorResponse> {
    const { q, type, limit = 20, offset = 0 } = query
    try {
      const response: AxiosResponse<PrivateUserObject> = await SpotifyApi.getInstance().get(
        `/search?query=${q}&type=${type}&limit=${limit}&offset=${offset}`
      )
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        const data = error.response!.data
        return data
      } else {
        return { error: { message: error.message, status: 500 } }
      }
    }
  }
}
