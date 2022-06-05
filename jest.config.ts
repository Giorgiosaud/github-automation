import type {Config} from '@jest/types'
import {defaults} from 'jest-config'

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions],
  moduleDirectories: [...defaults.moduleDirectories, 'node_modules/.pnpm'],
  preset: 'ts-jest',
  testEnvironment: 'node',
}
export default config
