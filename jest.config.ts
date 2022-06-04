import type {Config} from '@jest/types';
const {defaults} = require('jest-config');

const config: Config.InitialOptions = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
export default config;