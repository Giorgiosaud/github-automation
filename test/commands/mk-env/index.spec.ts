import MkEnv from '../../../src/commands/mk-env'
import * as octokitClient from '../../../src/repositories/clients/octokit-client'
const spyOctokitClient = jest.spyOn(octokitClient, 'default')

const reqFn = jest.fn()
spyOctokitClient.mockResolvedValue({
  request: reqFn,
} as any)
describe('mk-env command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('mk-env fails if no flags are set asking for repo', async () => {
    await expect(MkEnv.run([])).rejects.toThrow()
  })
  test('mk-env fails if only env is set', async () => {
    await expect(MkEnv.run(['-e', 'env'])).rejects.toThrow()
  })
  test('mk-env fails if only env and org is set', async () => {
    await expect(MkEnv.run(['-e', 'env', '-o', 'owner'])).rejects.toThrow()
  })
  test('mk-env fails if repo name not match', async () => {
    await expect(MkEnv.run(['-e', 'env', '-o', 'owner', '-r', 'repo%1--*'])).rejects.toThrow()
  })
  test('mk-env works if repo name match', async () => {
    const envRes = {
      data: {
        environments: [{
          id: 1,
          name: 'pepe',
        }]}} as any
    reqFn.mockResolvedValueOnce(envRes)
    await MkEnv.run(['-e', 'env', '-o', 'owner', '-r', 'repo'])

    expect(reqFn).toHaveBeenCalledTimes(2)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'owner', repo: 'repo'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'PUT /repos/{owner}/{repo}/environments/{environment_name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, environment_name: 'env', owner: 'owner', repo: 'repo'})
  })
  test('mk-env works if multi repositories set', async () => {
    const envRes = {
      data: {
        environments: [{
          id: 1,
          name: 'pepe',
        }]}} as any
    reqFn.mockImplementation(path => {
      if (path.includes('GET'))
        return Promise.resolve(envRes)
    })
    await MkEnv.run(['-e', 'env', '-o', 'owner', '-r', 'repo1', 'repo2'])

    expect(reqFn).toHaveBeenCalledTimes(4)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'owner', repo: 'repo1'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'PUT /repos/{owner}/{repo}/environments/{environment_name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, environment_name: 'env', owner: 'owner', repo: 'repo1'})
    expect(reqFn).toHaveBeenNthCalledWith(3, 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'owner', repo: 'repo2'})
    expect(reqFn).toHaveBeenNthCalledWith(4,  'PUT /repos/{owner}/{repo}/environments/{environment_name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, environment_name: 'env', owner: 'owner', repo: 'repo2'})
  })
  test('mk-env works if multi environments set', async () => {
    const envRes = {
      data: {
        environments: [{
          id: 1,
          name: 'pepe',
        }]}} as any
    reqFn.mockImplementation(path => {
      if (path.includes('GET'))
        return Promise.resolve(envRes)
    })
    await MkEnv.run(['-e', 'env', 'env2', '-o', 'owner', '-r', 'repo1'])
    expect(reqFn).toHaveBeenCalledTimes(3)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'owner', repo: 'repo1'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'PUT /repos/{owner}/{repo}/environments/{environment_name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, environment_name: 'env', owner: 'owner', repo: 'repo1'})
    expect(reqFn).toHaveBeenNthCalledWith(3,  'PUT /repos/{owner}/{repo}/environments/{environment_name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, environment_name: 'env2', owner: 'owner', repo: 'repo1'})
  })
  test('mk-env works if multi environments set but not call repeated one', async () => {
    const envRes = {
      data: {
        environments: [{
          id: 1,
          name: 'env',
        }]}} as any
    reqFn.mockImplementation(path => {
      if (path.includes('GET'))
        return Promise.resolve(envRes)
    })
    await MkEnv.run(['-e', 'env', 'env2', '-o', 'owner', '-r', 'repo1'])
    expect(reqFn).toHaveBeenCalledTimes(2)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'owner', repo: 'repo1'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'PUT /repos/{owner}/{repo}/environments/{environment_name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, environment_name: 'env2', owner: 'owner', repo: 'repo1'})
  })
})
