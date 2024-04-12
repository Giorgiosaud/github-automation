import SetVars from '../../src/commands/set-vars'
import * as octokitClient from '../../src/repositories/clients/octokit-client'
import * as encryptSecret from '../../src/set-secret-helpers/encrypt-secret'
const spyOctokitClient = jest.spyOn(octokitClient, 'default')

const reqFn = jest.fn()
spyOctokitClient.mockResolvedValue({
  request: reqFn,
} as any)
const encryptSecretSpy = jest.spyOn(encryptSecret, 'default')
encryptSecretSpy.mockResolvedValue('ASD')
describe('set-vars command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('set-vars fails if no flags are set', async () => {
    await expect(SetVars.run([])).rejects.toThrow()
  })
  test('set-vars fails if org flags are set', async () => {
    await expect(SetVars.run(['-o', 'org'])).rejects.toThrow()
  })
  test('set-vars fails if org,repo flags are set', async () => {
    await expect(SetVars.run(['-o', 'org', '-r', 'repo'])).rejects.toThrow()
  })
  test('set-vars wokrs if org,repo,secret flags are set and not exist', async () => {
    const getVars = {
      data: {
        name: 'pepe',
        value: 'string',
      }} as any
    reqFn.mockImplementation(path => {
      if (path.includes('GET /repos/{owner}/{repo}/actions/variables/{name}'))
        return Promise.resolve(getVars)
    })
    await SetVars.run(['-o', 'org', '-r', 'repo', '-v', 'variable->123'])
    expect(reqFn).toHaveBeenCalledTimes(2)
    expect(reqFn).toHaveBeenNthCalledWith(1,  'GET /repos/{owner}/{repo}/actions/variables/{name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', name: 'variable'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'PATCH /repos/{owner}/{repo}/actions/variables/{name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', name: 'variable', value: '123'})
  })
  test('set-vars works if org,repo,secret flags are set and var exist', async () => {
    const getVars = {
      data: {
        name: 'variable',
        value: 'string',
      }} as any
    reqFn.mockImplementation(path => {
      if (path.includes('GET /repos/{owner}/{repo}/actions/variables/{name}'))
        return Promise.resolve(getVars)
    })
    await SetVars.run(['-o', 'org', '-r', 'repo', '-v', 'variable->123'])
    expect(reqFn).toHaveBeenCalledTimes(2)
    expect(reqFn).toHaveBeenNthCalledWith(1,  'GET /repos/{owner}/{repo}/actions/variables/{name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', name: 'variable'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'PATCH /repos/{owner}/{repo}/actions/variables/{name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', name: 'variable', value: '123'})
  })
  test('set-vars works if org,repo,secret,env flags are set and var exist', async () => {
    const defaultD = {
      data: {},
    }
    const envsData = {
      data: {
        environments: [
          {
            name: 'env',
          },
        ],
      }} as any
    reqFn.mockImplementation(path => {
      switch (path) {
      case 'GET /repos/{owner}/{repo}/environments': {
        return Promise.resolve(envsData)
      }

      default: {
        return Promise.resolve(defaultD)
      }
      }
    })
    await SetVars.run(['-o', 'org', '-r', 'repo', '-v', 'variable->123', '-e', 'env'])
    expect(reqFn).toHaveBeenCalledTimes(3)
    expect(reqFn).toHaveBeenNthCalledWith(1,  'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'GET /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}', {environment_name: 'env', headers: {'X-GitHub-Api-Version': '2022-11-28'}, name: 'variable', owner: 'org',repo:'repo'})
    expect(reqFn).toHaveBeenNthCalledWith(3,  'PATCH /repos/{owner}/{repo}/environments/{environment_name}/variables/{name}', {environment_name: 'env', headers: {'X-GitHub-Api-Version': '2022-11-28'}, name: 'variable', owner: 'org',repo:'repo',value:'123'})
  })
})
