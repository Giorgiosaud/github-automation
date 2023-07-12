import RmEnv from '../../src/commands/rm-env'
import * as octokitClient from '../../src/repositories/clients/octokit-client'
const spyOctokitClient = jest.spyOn(octokitClient, 'default')

const reqFn = jest.fn()
spyOctokitClient.mockResolvedValue({
  request: reqFn,
} as any)
describe('rm-env command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('rm-env fails if no flags are set', async () => {
    await expect(RmEnv.run([])).rejects.toThrow()
  })
  test('rm-env fails if env is set', async () => {
    await expect(RmEnv.run(['-e', 'env'])).rejects.toThrow()
  })
  test('rm-env fails if env,org is set', async () => {
    await expect(RmEnv.run(['-e', 'env', '-o', 'org'])).rejects.toThrow()
  })
  test('rm-env works if env,org,repo is set and env exist', async () => {
    const response = {
      data: {
        environments: [{
          name: 'env',
        }],
      },
    }
    reqFn.mockImplementation(path => {
      if (path.includes('GET'))
        return Promise.resolve(response)
    })

    await RmEnv.run(['-e', 'env', '-o', 'org', '-r', 'repo'])
    expect(reqFn).toHaveBeenCalledTimes(2)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'DELETE /repos/{owner}/{repo}/environments/{environment_name}', {environment_name: 'env', headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
  })
  test('rm-env works if env,org,repo is set and env not exist', async () => {
    const response = {
      data: {
        environments: [{
          name: 'envi',
        }],
      },
    }
    reqFn.mockImplementation(path => {
      if (path.includes('GET'))
        return Promise.resolve(response)
    })

    await RmEnv.run(['-e', 'env', '-o', 'org', '-r', 'repo'])
    expect(reqFn).toHaveBeenCalledTimes(1)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
  })
})
