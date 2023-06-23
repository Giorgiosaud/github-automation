import type {Config} from '@jest/types'
import {defaults} from 'jest-config'

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  moduleDirectories: [...defaults.moduleDirectories, 'node_modules'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: [
    'html',
    'json',
    'text',
    'text-summary',
    'lcov',
  ],
  setupFiles: ['<rootDir>/jest-setup.ts'],
  // testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
}
export default config
