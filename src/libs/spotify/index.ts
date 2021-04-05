import axios, { AxiosInstance, AxiosResponse } from 'axios'
import {
  NewReleasesQuery,
  NewReleasesResponse,
  PrivateUserObject,
  PublicUserObject,
  RegularErrorResponse,
  SearchQuery,
  SearchResponse
} from './spotify'
import config from '../../config'
import { handleError } from './utils'

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
      return handleError(error)
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
      return handleError(error)
    }
  }

  static async search(
    query: SearchQuery
  ): Promise<SearchResponse | RegularErrorResponse> {
    const { q, type, limit = 20, offset = 0 } = query
    try {
      const response: AxiosResponse<SearchResponse> = await SpotifyApi.getInstance().get(
        `/search?query=${q}&type=${type}&limit=${limit}&offset=${offset}`
      )
      return response.data
    } catch (error) {
      return handleError(error)
    }
  }

  static async newReleases(
    query: NewReleasesQuery
  ): Promise<NewReleasesResponse | RegularErrorResponse> {
    const { country = 'ES', limit = 20, offset = 0 } = query
    try {
      const response: AxiosResponse<NewReleasesResponse> = await SpotifyApi.getInstance().get(
        `/browse/new-releases?country=${country}&limit=${limit}&offset=${offset}`
      )
      return response.data
    } catch (error) {
      return handleError(error)
    }
  }
}
