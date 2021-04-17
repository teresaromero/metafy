import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest/globalSetup.ts']
}
export default config
