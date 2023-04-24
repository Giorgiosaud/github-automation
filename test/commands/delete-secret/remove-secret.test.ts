import removeSecret from '../../../src/helpers/delete-secrets'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios, {delayResponse: 2000})

describe.skip('removeSecret function', () => {
  beforeEach(() => {
    mock.resetHandlers()
    mock.onDelete('/repos/org/repo/actions/secrets/name', '', {Accept: 'application/json, text/plain, */*', Authorization: 'Bearer 123'})
    .reply(204, 'NO CONTENT')
  })
  test('everything pass id response is 204', async () => {
    const repo = 'repo'
    const name = 'name'
    const organization = 'org'
    const token = 'token'
    await removeSecret({repo, name, organization, token})
    expect(mock.history.delete[0].url).toBe('https://api.github.com/repos/org/repo/actions/secrets/name')
  })
})
