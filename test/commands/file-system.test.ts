/* eslint-disable node/no-extraneous-import */
import {readEnv} from '../../src/helpers/file-system'
import fsExtra from 'fs-extra'

const fileSystemReadEnvSpy = jest.spyOn(fsExtra, 'readFile')

describe('function readEnv', () => {
  test('reads env file', async () => {
    const str = 'GITHUB_TOKEN=token'
    const buff = Buffer.from(str, 'utf-8')
    fileSystemReadEnvSpy.mockResolvedValue(buff)
    const env = await readEnv('path')
    expect(env).toEqual({GITHUB_TOKEN: 'token'})
  })
})
