import encryptSecrets from '../../../src/set-secret-helpers/encrypt-secret'
import * as getGithubToken from '../../../src/helpers/get-github-token'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import libsodium from 'libsodium-wrappers'
import fsExtra from 'fs-extra'

const getGithubTokenSpy = jest.spyOn(getGithubToken, 'default')
const fsExtraWriteSpy = jest.spyOn(fsExtra, 'writeFile')
jest.spyOn(global.console, 'error').mockImplementation()
fsExtraWriteSpy.mockImplementation(() => jest.fn())

const mock = new MockAdapter(axios)

describe('encryptSecrets function', () => {
  const data = {
    // eslint-disable-next-line camelcase
    key_id: 'test',
    key: 'test',
  }
  beforeEach(() => {
    mock.resetHandlers()
    getGithubTokenSpy.mockReset()
    mock.onGet('https://api.github.com/repos/REPO/actions/secrets/public-key', '', {Accept: 'application/json, text/plain, */*', Authorization: 'Bearer 123'})
    .reply(200, {
      ...data,
    })
  })
  test('encryptSecrets work', async () => {
    getGithubTokenSpy.mockResolvedValueOnce('123')
    await libsodium.ready
    const libsodiumSpy = jest.spyOn(libsodium, 'crypto_box_seal')
    libsodiumSpy.mockReturnValue('criptoVal')
    const value = 'VALUE'
    const repo = 'REPO'
    const path = 'RCPATH'
    const result = await encryptSecrets(repo, value, path)
    expect(result).toEqual({encryptedValue: 'Y3JpcHRvVmFs', keyId: 'test'})
    expect(getGithubTokenSpy).toBeCalledWith(path, repo)
    libsodiumSpy.mockReset()
  })
  test('if encryptSecrets fails remove rcpath content', async () => {
    getGithubTokenSpy.mockResolvedValueOnce('124').mockResolvedValueOnce('123')
    await libsodium.ready
    const libsodiumSpy = jest.spyOn(libsodium, 'crypto_box_seal')
    libsodiumSpy.mockReturnValue('criptoVal')
    const value = 'VALUE'
    const repo = 'REPO'
    const path = 'RCPATH'
    const result = await encryptSecrets(repo, value, path)
    expect(result).toEqual({encryptedValue: 'Y3JpcHRvVmFs', keyId: 'test'})
    expect(fsExtraWriteSpy).toBeCalledTimes(1)
    expect(getGithubTokenSpy).toBeCalledTimes(2)
    expect(libsodiumSpy).toBeCalledTimes(1)
    libsodiumSpy.mockReset()
  })
})
