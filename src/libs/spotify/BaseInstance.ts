import axios, { AxiosInstance } from 'axios'
import config from '../../config'

export class SpotifyApi {
  private static instance: AxiosInstance

  protected static getInstance(): AxiosInstance {
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
}
