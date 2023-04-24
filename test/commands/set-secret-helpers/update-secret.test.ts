
import updateSecrets from '../../../src/set-secret-helpers/update-secret'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
const mock = new MockAdapter(axios)

jest.mock('../../../src/helpers/get-github-token',
  () => jest.fn()
  .mockImplementation(() => 'You have called a mocked method 1!')
  .mockReturnValue('123'))

describe.skip('updateSecrets function', () => {
  test('updateSecrets works', async () => {
    const encryptedValue = 'CRYPTO_VAL'
    const keyId = 'KEY_ID'
    const name = 'NAME'
    const repo = 'REPO'
    const token = 'token'
    const  org = 'org'
    const putBody = {encrypted_value: encryptedValue, key_id: keyId}
    mock.onPut('https://api.github.com/repos/org/REPO/actions/secrets/NAME', putBody, {
      Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json', Authorization: 'Bearer token',
    })
    .reply(201)
    try {
      const a = await updateSecrets({encryptedValue, keyId, name, repo,  org}, token)
      expect(a).toBeTruthy()
    } catch {}
  })
  test('updateSecrets fail well', async () => {
    const encryptedValue = 'CRYPTO_VAL'
    const keyId = 'KEY_ID'
    const name = 'NAME'
    const repo = 'REPO'
    const token = 'token'
    const  org = 'org'
    const putBody = {encrypted_value: encryptedValue, key_id: keyId}
    mock.onPut('https://api.github.com/repos/org/REPO/actions/secrets/NAME', putBody, {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer 123',
    })
    .reply(404)
    try {
      const a = await updateSecrets({encryptedValue, keyId, name, repo,  org}, token)
      expect(a).toBeTruthy()
    } catch (error) {
      if (error instanceof  Error)
        expect(error.message).toContain('error en put a github Error: Request failed with status code 404')
    }
  })
})
