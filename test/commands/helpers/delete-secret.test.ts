import deleteSecrets from '../../../src/helpers/delete-secrets'
import * as getGithubToken from '../../../src/helpers/get-github-token'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)
const repo = 'repo'
const secret = 'secret'
const rcPath = 'RCPATH'

const getGithubTokenSpy = jest.spyOn(getGithubToken, 'default')

jest.mock('@oclif/core',
  () => ({
    CliUx: {ux: {
      prompt: jest.fn()
      .mockImplementation(() => 'You have called a mocked method 1!')
      .mockResolvedValue('123'),
    }},
  }))
describe('getGithubToken function', () => {
  beforeEach(() => {
    mock.resetHandlers()
    mock.onDelete(`https://api.github.com/repos/${repo}/actions/secrets/${secret}`, undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'Bearer 123',
    })
    .reply(201)
    getGithubTokenSpy.mockReset()
  })
  test('deleteSecrets works and return true if is successfully called the removed', async () => {
    getGithubTokenSpy.mockResolvedValue('123')
    const deleted = await deleteSecrets(repo, secret, rcPath)
    expect(deleted).toBeTruthy()
    expect(getGithubTokenSpy).toHaveBeenCalledTimes(1)
  })
  test('deleteSecrets works and return fañse if is called the removed and fails', async () => {
    getGithubTokenSpy.mockResolvedValue('321')
    const repo = 'repo'
    const secret = 'secret'

    const rcPath = 'RCPATH'

    const deleted = await deleteSecrets(repo, secret, rcPath)
    expect(deleted).toBeFalsy()
    expect(getGithubTokenSpy).toBeCalledTimes(1)
  })
})
