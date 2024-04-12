import RmSecrets from '../../../src/commands/rm-secrets'
import * as octokitClient from '../../../src/repositories/clients/octokit-client'
const spyOctokitClient = jest.spyOn(octokitClient, 'default')

const reqFn = jest.fn()
spyOctokitClient.mockResolvedValue({
  request: reqFn,
} as any)
describe('rm-secrets command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('rm-secrets fails if no flags are set', async () => {
    await expect(RmSecrets.run([])).rejects.toThrow()
  })
  test('rm-secrets fails org are set', async () => {
    await expect(RmSecrets.run(['-o', 'org'])).rejects.toThrow()
  })

  test('rm-secrets fails org,repo are set', async () => {
    await expect(RmSecrets.run(['-o', 'org', '-r', 'repo'])).rejects.toThrow()
  })
  test('rm-secrets works if org,repo,secrets are set', async () => {
    await RmSecrets.run(['-o', 'org', '-r', 'repo', '-s', 'alo'])
    expect(reqFn).toHaveBeenCalledTimes(1)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', secret_name: 'alo'})
  })
  test('rm-secrets works if org,repo,secrets,environment are set', async () => {
    await RmSecrets.run(['-o', 'org', '-r', 'repo', '-s', 'alo', '-e', 'env'])
    expect(reqFn).toHaveBeenCalledTimes(1)
    expect(reqFn).toHaveBeenNthCalledWith(1,  'DELETE /repos/{owner}/{repo}/environments/{environment_name}/secrets/{secret_name}', {environment_name: 'env', headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', secret_name: 'alo'})
  })
})
