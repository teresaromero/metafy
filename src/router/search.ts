import { Router } from 'express'
import { getSearchQuery, getNewReleasesForCountry } from '../controllers/search'
import { loggedIn } from '../middleware/auth'

const searchRouter = Router()

searchRouter.get('/', loggedIn(), getSearchQuery())

searchRouter.get('/new-releases', loggedIn(), getNewReleasesForCountry())

export { searchRouter }
