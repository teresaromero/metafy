import { Router } from "express"
import { logout } from "../middleware/auth"
import { authenticate } from "../passport"

const authRouter = Router()

authRouter.get('/login', (req, res) => {
    res.send("ok")
})

authRouter.get('/logout', logout())

authRouter.get('/spotify', authenticate("spotify", { authInfo: true }))

authRouter.get('/spotify/callback', authenticate("spotify", {
    authInfo: true,
    successRedirect: "/home",
    failureRedirect: "/auth/login"
}))

export { authRouter }