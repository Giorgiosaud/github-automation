import removeSecret from '../../../src/helpers/delete-secrets'
import * as getGithubToken from '../../../src/helpers/get-github-token'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

jest.mock('../../../src/helpers/get-github-token',
  () => jest.fn()
  .mockImplementation(() => 'You have called a mocked method 1!')
  .mockReturnValue('123'))

const mock = new MockAdapter(axios, {delayResponse: 2000})

describe('removeSecret function', () => {
  beforeEach(() => {
    mock.resetHandlers()
    mock.onDelete('/repos/REPO/actions/secrets/SECRET', '', {Accept: 'application/json, text/plain, */*', Authorization: 'Bearer 123'})
    .reply(204, 'NO CONTENT')
  })
  test('everything pass id response is 204', async () => {
    await removeSecret('REPO', 'SECRET', 'RCPATH')
    expect(getGithubToken).toHaveBeenCalled()
    expect(mock.history.delete[0].url).toBe('https://api.github.com/repos/REPO/actions/secrets/SECRET')
  })
})
