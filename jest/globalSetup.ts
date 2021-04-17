import { connect, clearDatabase, closeDatabase } from './dbMock'

beforeAll(async () => await connect())
afterEach(async () => await clearDatabase())
afterAll(async () => await closeDatabase())
