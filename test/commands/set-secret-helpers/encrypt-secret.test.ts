import encryptSecrets from '../../../src/set-secret-helpers/encrypt-secret'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import * as libsodium from 'libsodium-wrappers'

jest.spyOn(global.console, 'error').mockImplementation()
const mock = new MockAdapter(axios)

describe.skip('encryptSecrets function', () => {
  const data = {

    key_id: 'test',
    key: 'test',
  }
  beforeEach(() => {
    mock.resetHandlers()
    mock.onGet('https://api.github.com/repos/org/REPO/actions/secrets/public-key', '', {Accept: 'application/json, text/plain, */*', Authorization: 'Bearer 123'})
    .reply(200, {
      ...data,
    })
  })
  test('encryptSecrets work', async () => {
    await libsodium.ready
    const libsodiumSpy = jest.spyOn(libsodium, 'crypto_box_seal')
    libsodiumSpy.mockReturnValue('criptoVal')
    const value = 'VALUE'
    const repo = 'REPO'
    const token = '123'
    const name = 'name'
    const org = 'org'
    const result = await encryptSecrets({token, value, org, repo, name})
    expect(result).toEqual({encryptedValue: 'Y3JpcHRvVmFs', keyId: 'test', name, org, repo, value})
    libsodiumSpy.mockReset()
  })
  test('if encryptSecrets fails remove rcpath content', async () => {
    await libsodium.ready
    const libsodiumSpy = jest.spyOn(libsodium, 'crypto_box_seal')
    libsodiumSpy.mockReturnValue('criptoVal')
    const value = 'VALUE'
    const repo = 'REPO'
    const token = '123'
    const name = 'name'
    const org = 'org'
    const result = await encryptSecrets({token, value, org, repo, name})
    expect(result).toEqual({encryptedValue: 'Y3JpcHRvVmFs', keyId: 'test', name, org, repo, value})
    expect(libsodiumSpy).toBeCalledTimes(1)
    libsodiumSpy.mockReset()
  })
})
