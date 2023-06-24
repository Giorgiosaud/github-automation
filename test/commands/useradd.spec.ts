import Useradd from '../../src/commands/useradd'
import * as octokitClient from '../../src/repositories/clients/octokit-client'
import * as encryptSecret from '../../src/set-secret-helpers/encrypt-secret'
const spyOctokitClient = jest.spyOn(octokitClient, 'default')

const reqFn = jest.fn()
spyOctokitClient.mockResolvedValue({
  request: reqFn,
} as any)
const encryptSecretSpy = jest.spyOn(encryptSecret, 'default')
encryptSecretSpy.mockResolvedValue('ASD')
describe('useradd command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('useradd fails if no flags are set', async () => {
    await expect(Useradd.run([])).rejects.toThrowErrorMatchingSnapshot()
  })
  test('useradd fails if only repo flags are set', async () => {
    await expect(Useradd.run(['-r', 'repo'])).rejects.toThrowErrorMatchingSnapshot()
  })
  test('useradd fails if only repo,org flags are set', async () => {
    await expect(Useradd.run(['-r', 'repo', '-o', 'org'])).rejects.toThrowErrorMatchingSnapshot()
  })
  test('useradd fails if only repo,org,user flags are set', async () => {
    await Useradd.run(['-r', 'repo', '-o', 'org', '-u', 'user'])
    expect(reqFn).toHaveBeenCalledTimes(1)
    expect(reqFn).toHaveBeenNthCalledWith(1,  'PUT /repos/{owner}/{repo}/collaborators/{username}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', username: 'user', permission: 'push'})
  })
  test('useradd fails if only repo,org,user,permission flags are set', async () => {
    await Useradd.run(['-r', 'repo', '-o', 'org', '-u', 'user', '-p', 'pull'])
    expect(reqFn).toHaveBeenCalledTimes(1)
    expect(reqFn).toHaveBeenNthCalledWith(1,  'PUT /repos/{owner}/{repo}/collaborators/{username}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', username: 'user', permission: 'pull'})
  })
  // test('useradd fails if org,repo flags are set', async () => {
  //   await expect(Useradd.run(['-o', 'org', '-r', 'repo'])).rejects.toThrowErrorMatchingSnapshot()
  // })
  // test('useradd wokrs if org,repo,secret flags are set and not exist', async () => {
  //   const getVars = {
  //     data: {
  //       name: 'pepe',
  //       value: 'string',
  //     }} as any
  //   reqFn.mockImplementation(path => {
  //     if (path.includes('GET /repos/{owner}/{repo}/actions/variables/{name}'))
  //       return Promise.resolve(getVars)
  //   })
  //   await Useradd.run(['-o', 'org', '-r', 'repo', '-s', 'secrt:123'])
  //   expect(reqFn).toHaveBeenCalledTimes(2)
  //   expect(reqFn).toHaveBeenNthCalledWith(1,  'GET /repos/{owner}/{repo}/actions/variables/{name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', name: 'secrt'})
  //   expect(reqFn).toHaveBeenNthCalledWith(2,  'PATCH /repos/{owner}/{repo}/actions/variables/{name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', name: 'secrt', value: '123'})
  // })
  // test('useradd works if org,repo,secret flags are set and var exist', async () => {
  //   const getVars = {
  //     data: {
  //       name: 'secrt',
  //       value: 'string',
  //     }} as any
  //   reqFn.mockImplementation(path => {
  //     if (path.includes('GET /repos/{owner}/{repo}/actions/variables/{name}'))
  //       return Promise.resolve(getVars)
  //   })
  //   await Useradd.run(['-o', 'org', '-r', 'repo', '-s', 'secrt:123'])
  //   expect(reqFn).toHaveBeenCalledTimes(2)
  //   expect(reqFn).toHaveBeenNthCalledWith(1,  'GET /repos/{owner}/{repo}/actions/variables/{name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', name: 'secrt'})
  //   expect(reqFn).toHaveBeenNthCalledWith(2,  'PATCH /repos/{owner}/{repo}/actions/variables/{name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', name: 'secrt', value: '123'})
  // })
  // test('useradd works if org,repo,secret,env flags are set and var exist', async () => {
  //   const defaultD = {
  //     data: {},
  //   }
  //   const envsData = {
  //     data: {
  //       environments: [
  //         {
  //           name: 'env',
  //         },
  //       ],
  //     }} as any
  //   const repoData = {data: {default_branch: 'master', id: 1}} as any
  //   reqFn.mockImplementation(path => {
  //     switch (path) {
  //     case 'GET /repos/{owner}/{repo}/environments': {
  //       return Promise.resolve(envsData)
  //     }

  //     case 'GET /repos/{owner}/{repo}': {
  //       return Promise.resolve(repoData)
  //     }

  //     default: {
  //       return Promise.resolve(defaultD)
  //     }
  //     }
  //   })
  //   await Useradd.run(['-o', 'org', '-r', 'repo', '-s', 'secrt:123', '-e', 'env'])
  //   expect(reqFn).toHaveBeenCalledTimes(5)
  //   expect(reqFn).toHaveBeenNthCalledWith(1,  'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
  //   expect(reqFn).toHaveBeenNthCalledWith(2,  'GET /repos/{owner}/{repo}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
  //   expect(reqFn).toHaveBeenNthCalledWith(3,  'GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, environment_name: 'env', name: 'secrt', repository_id: repoData.data.id})
  //   expect(reqFn).toHaveBeenNthCalledWith(4,  'GET /repos/{owner}/{repo}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
  //   expect(reqFn).toHaveBeenNthCalledWith(5,  'PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}', {environment_name: 'env', headers: {'X-GitHub-Api-Version': '2022-11-28'}, name: 'secrt', repository_id: repoData.data.id, value: '123'})
  // })
})
