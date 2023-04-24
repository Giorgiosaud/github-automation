import getGithubToken from '../../../src/helpers/get-github-token'
import * as nodeOS from 'node:os'
import * as fs from 'node:fs'
import * as fileSystem from '../../../src/helpers/file-system'
import * as promptToken from '../../../src/helpers/prompt-token'
import {rcPath} from '../../../src/helpers/config'
import * as path from 'node:path'
import * as jsyaml from 'js-yaml'

const spyNodeOS = jest.spyOn(nodeOS, 'homedir')
const spyPromptToken = jest.spyOn(promptToken, 'promptToken')
const SpyFsExtraExist = jest.spyOn(fs, 'existsSync')
const SpyFsWriteFile = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => jest.fn())
const SpyFsReadFile = jest.spyOn(fs, 'readFileSync')
const SpyReadEnv = jest.spyOn(fileSystem, 'readEnv')
const SpyPathResolve = jest.spyOn(path, 'resolve')
const tokenSet = 'NEW_TOKEN'
const homedir = 'my_test_os'

describe('getGithubToken function', () => {
  const org = 'Prueba'
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test('if token is invalid prompt it', async () => {
    const fullPath = homedir + '/' + rcPath
    SpyPathResolve.mockReturnValueOnce(fullPath)
    SpyFsExtraExist.mockReturnValueOnce(true)
  })
  test('ask for a token when "rcPath" has no files', async () => {
    const fullPath = homedir + '/' + rcPath
    SpyPathResolve.mockReturnValueOnce(fullPath)
    SpyFsWriteFile.mockImplementation(() => jest.fn())
    SpyFsExtraExist.mockReturnValueOnce(false)
    spyNodeOS.mockReturnValueOnce(homedir)
    spyPromptToken.mockResolvedValueOnce(tokenSet)
    SpyFsReadFile.mockReturnValueOnce(jsyaml.dump({
      [org]: {
        GITHUB_TOKEN: tokenSet,
      }}))
    // SpyFileSystemReadEnv.mockReturnValue({})
    const token = await getGithubToken(org)
    expect(SpyPathResolve).toBeCalledWith(homedir, rcPath)
    expect(SpyFsExtraExist).toBeCalledWith(fullPath)
    expect(SpyFsWriteFile).toHaveBeenNthCalledWith(1, fullPath.replace('.rc', '.yml'), 'utf8')
    expect(SpyReadEnv).toHaveBeenCalledTimes(1)
    // expect(SpyFsWriteFile).toHaveBeenCalledTimes(2)
    // expect(SpyFsReadFile).toHaveBeenCalledTimes(1)
    expect(token).toBe(tokenSet)
  })
  test('migrate from old "rcPath"', async () => {
    const fullPath = homedir + '/' + rcPath
    SpyPathResolve.mockReturnValueOnce(fullPath)
    SpyFsWriteFile.mockImplementation(() => jest.fn())
    SpyFsExtraExist.mockReturnValueOnce(false)
    SpyFsExtraExist.mockReturnValueOnce(true)
    spyNodeOS.mockReturnValueOnce(homedir)
    spyPromptToken.mockResolvedValueOnce(tokenSet)
    SpyFsReadFile.mockImplementation(() => org + '=' + tokenSet)
    const token = await getGithubToken(org)
    expect(SpyPathResolve).toBeCalledWith(homedir, rcPath)
    expect(SpyFsExtraExist).toBeCalledWith(fullPath)
    expect(SpyFsWriteFile).toHaveBeenNthCalledWith(1, fullPath.replace('.rc', '.yml'), 'utf8')
    expect(SpyReadEnv).toHaveBeenCalledTimes(1)
    expect(token).toBe(tokenSet)
  })
})
