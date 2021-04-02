import { Router } from "express"
import callbackRouter from "./callbackRouter"
import rootRouter from "./rootRouter"

export default ((router: Router): Router => {
    rootRouter(router)
    callbackRouter(router)
    return router
})