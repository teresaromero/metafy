import { Model, model, Schema } from 'mongoose'
import { UserModel, UserDocument } from './User.types'

const UserSchema: Schema<UserDocument, Model<UserDocument>> = new Schema(
  {
    provider: { type: String, required: true, enum: ['spotify'] },
    providerId: { type: String, required: true, unique: true },
    accessToken: { type: String, required: false },
    refreshToken: { type: String, required: false },
    expires_in: { type: Number, required: false }
  },
  { timestamps: true }
)

UserSchema.statics.logInWithSpotify = async function (
  providerId,
  accessToken,
  refreshToken,
  expires_in
): Promise<UserDocument> {
  return this.findOneAndUpdate(
    { providerId, provider: 'spotify' },
    { accessToken, refreshToken, expires_in },
    {
      new: true,
      upsert: true
    }
  ).exec()
}

UserSchema.methods.toExpressUser = function (this: UserDocument): Express.User {
  return {
    id: this.id,
    provider: this.provider,
    providerId: this.providerId,
    accessToken: this.accessToken,
    refreshToken: this.refreshToken
  }
}

export const User: UserModel = model<UserDocument, UserModel>(
  'User',
  UserSchema
)
