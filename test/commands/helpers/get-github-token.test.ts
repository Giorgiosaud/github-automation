import getGithubToken from '../../../src/helpers/get-github-token'
import * as path from 'node:path'
import * as nodeOS from 'node:os'
import * as fs from 'node:fs'
import * as fileSystem from '../../../src/helpers/file-system'
import * as promptToken from '../../../src/helpers/prompt-token'

const spyNodeOS = jest.spyOn(nodeOS, 'homedir')
const spyPromptToken = jest.spyOn(promptToken, 'promptToken')
const spyPath = jest.spyOn(path, 'resolve')
const SpyFsExtraExist = jest.spyOn(fs, 'existsSync')
const SpyFsWriteFile = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => jest.fn())
const SpyFileSystemReadEnv = jest.spyOn(fileSystem, 'readEnv')
const tokenSet = 'NEW_TOKEN'
spyPromptToken.mockResolvedValue(tokenSet)

describe('getGithubToken function', () => {
  const rcPath = 'RCPATH'
  const org = 'akamai'
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('ask for a token when "rcPath" has no files', async () => {
    spyPath.mockReturnValueOnce('test_path')
    spyNodeOS.mockReturnValue('my_mac')
    SpyFsExtraExist.mockReturnValueOnce(false)
    SpyFileSystemReadEnv.mockReturnValue({})
    const token = await getGithubToken(rcPath, org)
    expect(SpyFsWriteFile).toHaveBeenCalledTimes(2)
    expect(token).toBe(tokenSet)
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
