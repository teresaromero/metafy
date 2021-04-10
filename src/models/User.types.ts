import { Document, Model } from 'mongoose'

export interface UserDocument extends Document {
  id: string
  provider: string
  providerId: string
  accessToken?: string
  refreshToken?: string
  expires_in?: number
  toExpressUser(): Express.User
}

export interface UserModel extends Model<UserDocument> {
  logInWithSpotify(
    providerId: string,
    accessToken: string,
    refreshToken: string,
    expires_in: number
  ): Promise<UserDocument>
}
