import { Application } from "express"
import passport, { AuthenticateOptions } from "passport"
import { UserDocument, User } from "../models/User";
import spotifyStrategy from "./strategies/spotify"

export default (app: Application): void => {

    passport.serializeUser((user: Express.User, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user: UserDocument | null = await User.findById(id)
            if (user) {
                done(null, user.toExpressUser())
            } else {
                done(null)
            }
        } catch (error) {
            done(error)
        }
    })

    spotifyStrategy(passport)

    app.use(passport.initialize());
    app.use(passport.session());
}

export const authenticate = (strategy: string, options: AuthenticateOptions) => passport.authenticate(strategy, options)