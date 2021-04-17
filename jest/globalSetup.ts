import { connect, clearDatabase, closeDatabase } from './mongoose'

beforeAll(async () => await connect())
afterEach(async () => await clearDatabase())
afterAll(async () => await closeDatabase())
