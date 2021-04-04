import { Model, model, Schema, Document } from 'mongoose'

export interface UserDocument extends Document {
  id: string
  provider: string
  providerId: string
  username?: string
  accessToken?: string
  refreshToken?: string
  expires_in?: number
  toExpressUser(): Express.User
}

export interface UserModel extends Model<UserDocument> {
  updateOrCreate(
    query: UserQuery,
    updateFields: UserUpdateQuery
  ): Promise<UserDocument>
}

export interface UserQuery {
  providerId?: string
  username?: string
}

export interface UserUpdateQuery {
  accessToken?: string
  refreshToken?: string
  expires_in?: number
  provider: string
}

const UserSchema: Schema<UserDocument, Model<UserDocument>> = new Schema(
  {
    provider: { type: String, required: true, enum: ['spotify'] },
    providerId: { type: String, required: true },
    accessToken: { type: String, required: false },
    refreshToken: { type: String, required: false },
    expires_in: { type: Number, required: false }
  },
  { toJSON: { virtuals: true }, timestamps: true }
)

UserSchema.virtual('id').get(function (this: UserDocument) {
  return this._id
})

UserSchema.statics.updateOrCreate = async function (
  query: UserQuery,
  updateFields: UserUpdateQuery
): Promise<UserDocument> {
  const user = await this.findOneAndUpdate(query, updateFields, {
    new: true,
    upsert: true
  })
  return user
}

UserSchema.methods.toExpressUser = function (this: UserDocument): Express.User {
  return {
    id: this._id,
    providerId: this.providerId,
    accessToken: this.accessToken,
    refreshToken: this.refreshToken,
    expires_in: this.expires_in
  }
}

export const User: UserModel = model<UserDocument, UserModel>(
  'User',
  UserSchema
)
