import SetSecrets from '../../../src/commands/set-secrets'
import * as octokitClient from '../../../src/repositories/clients/octokit-client'
import * as encryptSecret from '../../../src/set-secret-helpers/encrypt-secret'
const spyOctokitClient = jest.spyOn(octokitClient, 'default')

const reqFn = jest.fn()
spyOctokitClient.mockResolvedValue({
  request: reqFn,
} as any)
const encryptSecretSpy = jest.spyOn(encryptSecret, 'default')
encryptSecretSpy.mockResolvedValue('ASD')
describe('set-secrets command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('set-secrets fails if no flags are set', async () => {
    await expect(SetSecrets.run([])).rejects.toThrow()
  })
  test('set-secrets fails if org flags are set', async () => {
    await expect(SetSecrets.run(['-o', 'org'])).rejects.toThrow()
  })
  test('set-secrets fails if org,repo flags are set', async () => {
    await expect(SetSecrets.run(['-o', 'org', '-r', 'repo'])).rejects.toThrow()
  })
  test('set-secrets fails if org,repo,secret flags are set', async () => {
    const envRes = {
      data: {
        key_id: '012345678912345678',
        key: '2Sg8iYjAxxmI2LvUXpJjkYrMxURPc8r+dB7TJyvv1234',
      }} as any
    reqFn.mockImplementation(path => {
      if (path.includes('GET'))
        return Promise.resolve(envRes)
    })
    await SetSecrets.run(['-o', 'org', '-r', 'repo', '-s', 'secrt->123'])
    expect(reqFn).toHaveBeenCalledTimes(2)
    expect(reqFn).toHaveBeenNthCalledWith(1,  'GET /repos/{owner}/{repo}/actions/secrets/public-key', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', secret_name: 'secrt', encrypted_value: 'ASD', key_id: '012345678912345678'})
  })
  test('set-secrets fails if org,repo,secret,env flags are set', async () => {
    const publicKey = {
      data: {
        key_id: '012345678912345678',
        key: '2Sg8iYjAxxmI2LvUXpJjkYrMxURPc8r+dB7TJyvv1234',
      }} as any
    const envsData = {
      data: {
        environments: [
          {
            name: 'env',
          },
        ],
      }} as any
    reqFn.mockImplementation(path => {
      console.log('::::path::::', path)
      switch (path) {
      case 'GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/public-key': {
        return Promise.resolve(publicKey)
      }

      case 'GET /repos/{owner}/{repo}/environments': {
        return Promise.resolve(envsData)
      }

      default: {
        return Promise.resolve('')
      }
      }
    })
    await SetSecrets.run(['-o', 'org', '-r', 'repo', '-s', 'secrt->123', '-e', 'env'])
    expect(reqFn).toHaveBeenCalledTimes(3)
    expect(reqFn).toHaveBeenNthCalledWith(1,  'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
    expect(reqFn).toHaveBeenNthCalledWith(2, 'GET /repos/{owner}/{repo}/environments/{environment_name}/secrets/public-key', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, repo: 'repo', owner:'org', environment_name: 'env'})
    expect(reqFn).toHaveBeenNthCalledWith(3,  'PUT /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, repo: 'repo', owner:'org',environment_name: 'env', secret_name: 'secrt', encrypted_value: 'ASD', key_id: '012345678912345678'})
  })
})
