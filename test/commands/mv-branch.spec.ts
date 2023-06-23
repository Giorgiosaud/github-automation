import MvBranch from '../../src/commands/mv-branch'
import * as octokitClient from '../../src/repositories/clients/octokit-client'
const spyOctokitClient = jest.spyOn(octokitClient, 'default')

const reqFn = jest.fn()
spyOctokitClient.mockResolvedValue({
  request: reqFn,
} as any)
describe('mv-branch command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('mv-branch fails if no flags are set', async () => {
    await expect(MvBranch.run([])).rejects.toThrowErrorMatchingSnapshot()
  })
  test('mv-branch fails if only branchNaming is set', async () => {
    await expect(MvBranch.run(['-b', 'prueba:r'])).rejects.toThrowErrorMatchingSnapshot()
  })
  test('mv-branch fails if branchNaming is set and org', async () => {
    await expect(MvBranch.run(['-b', 'prueba:r', '-o', 'org'])).rejects.toThrowErrorMatchingSnapshot()
  })
  test('mv-branch works if branchNaming is set and org and repo', async () => {
    await MvBranch.run(['-b', 'prueba:r', '-o', 'org', '-r', 'repo'])
    expect(reqFn).toHaveBeenCalledTimes(2)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/branches/{branch}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', branch: 'prueba'})
    expect(reqFn).toHaveBeenNthCalledWith(2, 'POST /repos/{owner}/{repo}/branches/{branch}/rename', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', branch: 'prueba', new_name: 'r', repo: 'repo'})
  })
})
