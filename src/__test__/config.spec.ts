import dotenv from 'dotenv'
import config from '../config'

jest.mock('dotenv', () => ({
    config: jest.fn()
}))

describe('config.ts', () => {
    it('Should load process.env variables into app config', () => {
        const configObj = config
        expect(configObj.NODE_ENV).toBe('test')
        expect(dotenv.config).toHaveBeenCalledTimes(1)
    })

    it('Should get default values when no .env are present', () => {
        const configObj = config
        expect(configObj.MONGO_URI).toBe('mongodb://localhost:27017/metafy')
    })

})