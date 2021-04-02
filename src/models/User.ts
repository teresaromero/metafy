import { Model, model, Schema, Document } from "mongoose"

export interface IUser extends Document {
    id: string
    spotifyId: string
    username?: string
    accessToken?: string
    refreshToken?: string
    expires_in?: number
}

const UserSchema: Schema = new Schema({
    spotifyId: { type: String, required: true },
    username: String,
    accessToken: String,
    refreshToken: String,
    expires_in: Number
}, { toJSON: { virtuals: true } })

UserSchema.virtual('id').get(function (this: IUser) {
    return this._id
})

export const User: Model<IUser> = model("User", UserSchema)