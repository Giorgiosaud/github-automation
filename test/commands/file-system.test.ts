import {readEnv} from '../../src/helpers/file-system'
import fsExtra from 'fs-extra'
import dotenv from 'dotenv'

const fileSystemReadEnvSpy = jest.spyOn(fsExtra, 'readFile')
const dotEnvParseSpy = jest.spyOn(dotenv, 'parse')
dotEnvParseSpy.mockImplementation(() => ({githubToken: 'token'}))

describe('function readEnv', () => {
  test('reads env file', async () => {
    const str = 'GITHUB_TOKEN=token'
    const buff = Buffer.from(str, 'utf-8')
    fileSystemReadEnvSpy.mockResolvedValue(buff)
    const env = await readEnv('path')
    expect(env).toEqual({githubToken: 'token'})
  })
})
