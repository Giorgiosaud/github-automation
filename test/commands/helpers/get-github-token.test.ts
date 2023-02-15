import getGithubToken from '../../../src/helpers/get-github-token'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as path from 'node:path'
import * as nodeOS from 'node:os'
import * as fs from 'node:fs'
import * as fileSystem from '../../../src/helpers/file-system'

const spyNodeOS = jest.spyOn(nodeOS, 'homedir')
const spyPath = jest.spyOn(path, 'resolve')
const fsExtraExistSpy = jest.spyOn(fs, 'existsSync')
// const fsWriteFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => jest.fn())
const fileSystemReadEnvSpy = jest.spyOn(fileSystem, 'readEnv')
// const mock = new MockAdapter(axios, {delayResponse: 2000})

// const resolveSpy = jest.spyOn(path, 'resolve')
// jest.mock('@oclif/core',
//   () => ({
//     ux: {
//       prompt: jest.fn()
//       .mockImplementation(() => 'You have called a mocked method 1!')
//       .mockResolvedValue('123'),
//     },
//   }))
describe('getGithubToken function', () => {
  const rcPath = 'RCPATH'
  const org = 'organization'
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test.only('homeDir exist', async () => {
    spyPath.mockReturnValueOnce('test_path')
    spyNodeOS.mockReturnValue('my_mac')
    fsExtraExistSpy.mockReturnValueOnce(false)
    fileSystemReadEnvSpy.mockReturnValue({})
    const token = await getGithubToken(rcPath, org)
  })
  // test(
  //   'REALPATH  200 setting file not exist and GITHUB_TOKEN not exist',
  //   async () => {
  //     mock.onGet('https://api.github.com/orgs/organization/repos?type=member', undefined, {Accept: 'application/json, text/plain, */*', Authorization: 'Bearer 123'})
  //     .reply(200, [{}])
  //     const rcPath = 'RCPATH'
  //     const org = 'organization'
  //     resolveSpy.mockReturnValueOnce('/fakepath')
  //     fsExtraExistSpy.mockReturnValueOnce(false)
  //     fileSystemReadEnvSpy.mockResolvedValueOnce({})
  //     const token = await getGithubToken(rcPath, org)
  //     expect(fsWriteFileSpy).toBeCalledTimes(2)
  //     expect(token).toBe('123')
  //   },
  // )
  // test(
  //   'REALPATH  200 setting file exist and GITHUB_TOKEN not exist',
  //   async () => {
  //     mock.onGet('https://api.github.com/orgs/organization/repos?type=member', undefined, {Accept: 'application/json, text/plain, */*', Authorization: 'Bearer 123'})
  //     .reply(200, [{}])
  //     const rcPath = 'RCPATH'
  //     const org = 'organization'
  //     resolveSpy.mockReturnValueOnce('/fakepath')
  //     fsExtraExistSpy.mockReturnValueOnce(true)
  //     fileSystemReadEnvSpy.mockResolvedValueOnce({})
  //     const token = await getGithubToken(rcPath, org)
  //     expect(fsWriteFileSpy).toBeCalledTimes(1)
  //     expect(token).toBe('123')
  //   },
  // )
  // test('REALPATH  200 setting file exist and GITHUB_TOKEN exist', async () => {
  //   mock.onGet('https://api.github.com/orgs/organization/repos?type=member', undefined, {Accept: 'application/json, text/plain, */*', Authorization: 'Bearer 123'})
  //   .reply(200, [{}])
  //   const rcPath = 'RCPATH'
  //   const org = 'organization'
  //   resolveSpy.mockReturnValueOnce('/fakepath')
  //   fsExtraExistSpy.mockReturnValueOnce(true)
  //   fileSystemReadEnvSpy.mockResolvedValueOnce({GITHUB_TOKEN: '123'})
  //   const token = await getGithubToken(rcPath, org)
  //   expect(fsWriteFileSpy).toBeCalledTimes(0)
  //   expect(token).toBe('123')
  // })
})
