import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts}'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
  testEnvironment: 'node'
}
export default config
