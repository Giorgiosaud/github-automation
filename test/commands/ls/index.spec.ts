import {ux} from '@oclif/core'
import Ls from '../../../src/commands/ls'
import * as octokitClient from '../../../src/repositories/clients/octokit-client'

const spyOctokitClient = jest.spyOn(octokitClient, 'default')
const reqFn = jest.fn()
spyOctokitClient.mockResolvedValue({
  request: reqFn,
} as any)
const spyUx = jest.spyOn(ux, 'styledObject')
spyUx.mockImplementation(() => jest.fn())
describe('ls command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('ls fails if no flags are set asking for repo', async () => {
    await expect(Ls.run([])).rejects.toThrow()
  })
  test('ls works if only org is set', async () => {
    const response = {
      data: [

        {
          name: 'repo1',
        },
        {
          name: 'repo2',
        },
      ],
      headers: {
        link: 'link',
      },
    }
    // spyOctokitRepository.mockResolvedValue(response as listReposResponse)
    const argv = ['ORG']

    reqFn.mockResolvedValueOnce(response)
    await expect(Ls.run(argv)).resolves.not.toThrow()
    expect(spyUx).lastCalledWith({
      repositories: response.data.map(repo => repo.name),
      page: response.headers.link,
    })
    expect(reqFn).toHaveBeenCalledTimes(1)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /orgs/{org}/repos', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, org: 'ORG', page: 1, per_page: 100})
  })
})
