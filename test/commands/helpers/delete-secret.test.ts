import deleteSecrets from '../../../src/helpers/delete-secrets'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)
const repo = 'repo'
const organization = 'organization'
const name = 'name'
let token = '123'

jest.mock('@oclif/core',
  () => ({
    ux: {
      prompt: jest.fn()
      .mockImplementation(() => 'You have called a mocked method 1!')
      .mockResolvedValue('123'),
    },
  }))
describe.skip('getGithubToken function', () => {
  beforeEach(() => {
    mock.resetHandlers()
    mock.onDelete(`https://api.github.com/repos/${organization}/${repo}/actions/secrets/${name}`, undefined, {
      Accept: 'application/json, text/plain, */*',
      Authorization: 'Bearer 123',
    })
    .reply(201)
  })
  test(
    'deleteSecrets works and return true if is successfully called the removed',
    async () => {
      const deleted = await deleteSecrets({repo, organization, name, token})
      expect(deleted).toBeTruthy()
    },
  )
  test(
    'deleteSecrets works and return false if is called the removed and fails',
    async () => {
      const repo = 'repo'
      token = 'failToken'
      const deleted = await deleteSecrets({repo, organization, name, token})
      expect(deleted).toBeFalsy()
    },
  )
})
