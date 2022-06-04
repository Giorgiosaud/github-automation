import encryptSecrets from '../../../src/set-secret-helpers/encrypt-secret'
import getGithubToken from '../../../src/helpers/get-github-token'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import libsodium from 'libsodium-wrappers'
jest.mock('../../../src/helpers/get-github-token',
  () => jest.fn()
  .mockImplementation(() => 'You have called a mocked method 1!')
  .mockReturnValue('123'))

const mock = new MockAdapter(axios)

// const cliPromptToken = sinon.stub()
describe('encryptSecrets function', () => {
  test.only('encryptSecrets work', async () => {
    await libsodium.ready
    const libsodiumSpy = jest.spyOn(libsodium, 'crypto_box_seal')
    const data = {
      // eslint-disable-next-line camelcase
      key_id: '568250167242549743',
      key: 'eQoZNKfaNklJeuuToaChm6VjyTS06yQBKQ28LfVpaDU=',
    }
    mock.onGet('https://api.github.com/repos/REPO/actions/secrets/public-key', '', {Accept: 'application/json, text/plain, */*', Authorization: 'Bearer 123'})
    .reply(200, {
      ...data,
    })
    const value = 'VALUE'
    const repo = 'REPO'
    const path = 'RCPATH'
    await encryptSecrets(repo, value, path)
    const messageBytes = Buffer.from(value)
    const keyBytes = Buffer.from(data.key, 'base64')
    expect(getGithubToken).toBeCalledWith(path, repo)
    expect(libsodiumSpy).toBeCalledWith(messageBytes, keyBytes)
  })
})
