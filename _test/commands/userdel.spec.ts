import Userdel from '../../src/commands/userdel'
import * as octokitClient from '../../src/repositories/clients/octokit-client'
import * as encryptSecret from '../../src/set-secret-helpers/encrypt-secret'
const spyOctokitClient = jest.spyOn(octokitClient, 'default')

const reqFn = jest.fn()
spyOctokitClient.mockResolvedValue({
  request: reqFn,
} as any)
const encryptSecretSpy = jest.spyOn(encryptSecret, 'default')
encryptSecretSpy.mockResolvedValue('ASD')
describe('userdel command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('userdel fails if no flags are set', async () => {
    await expect(Userdel.run([])).rejects.toThrow()
  })
  test('userdel fails if only repo flags are set', async () => {
    await expect(Userdel.run(['-r', 'repo'])).rejects.toThrow()
  })
  test('userdel fails if only repo,org flags are set', async () => {
    await expect(Userdel.run(['-r', 'repo', '-o', 'org'])).rejects.toThrow()
  })
  test('userdel fails if only repo,org,user flags are set', async () => {
    await Userdel.run(['-r', 'repo', '-o', 'org', '-u', 'user'])
    expect(reqFn).toHaveBeenCalledTimes(1)
    expect(reqFn).toHaveBeenNthCalledWith(1,  'DELETE /repos/{owner}/{repo}/collaborators/{username}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', username: 'user'})
  })
})
