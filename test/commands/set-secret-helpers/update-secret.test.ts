/* eslint-disable camelcase */
import updateSecrets from '../../../src/set-secret-helpers/update-secret'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
const mock = new MockAdapter(axios)

jest.mock('../../../src/helpers/get-github-token',
  () => jest.fn()
  .mockImplementation(() => 'You have called a mocked method 1!')
  .mockReturnValue('123'))

describe('updateSecrets function', () => {
  test('updateSecrets works', async () => {
    const encryptedValue = 'CRYPTO_VAL'
    const keyId = 'KEY_ID'
    const name = 'NAME'
    const repo = 'REPO'
    const  rcPath = ' rcPath'
    const putBody = {encrypted_value: encryptedValue, key_id: keyId}
    mock.onPut('https://api.github.com/repos/REPO/actions/secrets/NAME', putBody, {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer 123',
    })
    .reply(201)
    const response = await updateSecrets({encryptedValue, keyId, name, repo,  rcPath})
    expect(response).toBeTruthy()
  })
  test('updateSecrets fail well', async () => {
    const encryptedValue = 'CRYPTO_VAL'
    const keyId = 'KEY_ID'
    const name = 'NAME'
    const repo = 'REPO'
    const  rcPath = ' rcPath'
    const putBody = {encrypted_value: encryptedValue, key_id: keyId}
    mock.onPut('https://api.github.com/repos/REPO/actions/secrets/NAME', putBody, {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer 123',
    })
    .reply(404)
    await expect(updateSecrets({encryptedValue, keyId, name, repo,  rcPath}))
    .rejects
    .toThrowError('error en put a github Error: Request failed with status code 404')
  })
})
