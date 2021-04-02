import { Request } from "express"
import { PassportStatic } from "passport"
import { Profile, Strategy as SpotifyStategy, VerifyCallback, VerifyFunctionWithRequest } from "passport-spotify"
import config from "../../config"
import { User } from "../../models/User"

const verifyFunction: VerifyFunctionWithRequest = async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
        const user = await User.findOneAndUpdate({ spotifyId: profile.id }, { accessToken, refreshToken, username: profile.username }, { new: true, useFindAndModify: false })

        if (!user) {
            const newUser = await User.create({ spotifyId: profile.id, accessToken, refreshToken, username: profile.username })
            return done(null, newUser.toJSON<Express.User>())
        } else {
            return done(null, user.toJSON<Express.User>())
        }
    } catch (error) {
        console.log(error)
        done(error)
    }
}

export default ((passport: PassportStatic): void => {
    try {
        passport.use(new SpotifyStategy({
            clientID: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            callbackURL: config.CALLBACK_URL,
            passReqToCallback: true
        }, verifyFunction))

    } catch (error) {
        console.log("Passport Connexion " + error.message)
        process.exit(1)
    }
})
