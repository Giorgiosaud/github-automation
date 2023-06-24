import SetProtectionRules from '../../src/commands/set-protection-rules'
import * as octokitClient from '../../src/repositories/clients/octokit-client'
const spyOctokitClient = jest.spyOn(octokitClient, 'default')

const reqFn = jest.fn()
spyOctokitClient.mockResolvedValue({
  request: reqFn,
} as any)
describe('set-protection-rules command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('set-protection-rules fails if no flags are set', async () => {
    await expect(SetProtectionRules.run([])).rejects.toThrowErrorMatchingSnapshot()
  })
  test('set-protection-rules fails branches are set', async () => {
    await expect(SetProtectionRules.run(['-b', 'branch1'])).rejects.toThrowErrorMatchingSnapshot()
  })
  test('set-protection-rules fails branches,org are set', async () => {
    await expect(SetProtectionRules.run(['-b', 'branch1', '-o', 'org'])).rejects.toThrowErrorMatchingSnapshot()
  })

  test('set-protection-rules works branches,org,repo are set', async () => {
    await SetProtectionRules.run(['-b', 'branch1', '-o', 'org', '-r', 'repo'])
    expect(reqFn).toHaveBeenCalledTimes(1)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'PUT /repos/{owner}/{repo}/branches/{branch}/protection', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', branch: 'branch1', required_status_checks: {
      strict: false,
      contexts: [],
    },
    enforce_admins: false,
    required_pull_request_reviews: {
      dismissal_restrictions: {
        users: [],
        teams: [],
      },
      dismiss_stale_reviews: false,
      require_code_owner_reviews: true,
      required_approving_review_count: 2,
    },
    restrictions: {
      users: [],
      teams: [],
      apps: [],
    }})
  })
  test('set-protection-rules works branches,org,repo are set and likes adjusted', async () => {
    await SetProtectionRules.run(['-b', 'branch1', '-o', 'org', '-r', 'repo', '-l', '3'])
    expect(reqFn).toHaveBeenCalledTimes(1)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'PUT /repos/{owner}/{repo}/branches/{branch}/protection', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', branch: 'branch1', required_status_checks: {
      strict: false,
      contexts: [],
    },
    enforce_admins: false,
    required_pull_request_reviews: {
      dismissal_restrictions: {
        users: [],
        teams: [],
      },
      dismiss_stale_reviews: false,
      require_code_owner_reviews: true,
      required_approving_review_count: 3,
    },
    restrictions: {
      users: [],
      teams: [],
      apps: [],
    }})
  })

  // test('set-protection-rules works if org,repo,secrets are set', async () => {
  //   await SetProtectionRules.run(['-o', 'org', '-r', 'repo', '-s', 'alo'])
  //   expect(reqFn).toHaveBeenCalledTimes(1)
  //   expect(reqFn).toHaveBeenNthCalledWith(1, 'DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo', secret_name: 'alo'})
  // })
  // test('set-protection-rules works if org,repo,secrets,environment are set', async () => {
  //   const response = {
  //     data: {
  //       id: '123',
  //     },
  //   }
  //   reqFn.mockImplementation(path => {
  //     if (path.includes('GET'))
  //       return Promise.resolve(response)
  //   })
  //   await SetProtectionRules.run(['-o', 'org', '-r', 'repo', '-s', 'alo', '-e', 'env'])
  //   expect(reqFn).toHaveBeenCalledTimes(2)
  //   expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
  //   expect(reqFn).toHaveBeenNthCalledWith(2,  'DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}', {environment_name: 'env', headers: {'X-GitHub-Api-Version': '2022-11-28'}, repository_id: '123', secret_name: 'alo'})
  // })
  // test('set-protection-rules fails if env is set', async () => {
  //   await expect(SetProtectionRules.run(['-e', 'env'])).rejects.toThrowErrorMatchingSnapshot()
  // })
  // test('set-protection-rules fails if env,org is set', async () => {
  //   await expect(SetProtectionRules.run(['-e', 'env', '-o', 'org'])).rejects.toThrowErrorMatchingSnapshot()
  // })
  // test('set-protection-rules works if env,org,repo is set and env exist', async () => {
  //   const response = {
  //     data: {
  //       environments: [{
  //         name: 'env',
  //       }],
  //     },
  //   }
  //   reqFn.mockImplementation(path => {
  //     if (path.includes('GET'))
  //       return Promise.resolve(response)
  //   })

  //   await SetProtectionRules.run(['-e', 'env', '-o', 'org', '-r', 'repo'])
  //   expect(reqFn).toHaveBeenCalledTimes(2)
  //   expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
  //   expect(reqFn).toHaveBeenNthCalledWith(2,  'DELETE /repos/{owner}/{repo}/environments/{environment_name}', {environment_name: 'env', headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
  // })
  // test('set-protection-rules works if env,org,repo is set and env not exist', async () => {
  //   const response = {
  //     data: {
  //       environments: [{
  //         name: 'envi',
  //       }],
  //     },
  //   }
  //   reqFn.mockImplementation(path => {
  //     if (path.includes('GET'))
  //       return Promise.resolve(response)
  //   })

  //   await SetProtectionRules.run(['-e', 'env', '-o', 'org', '-r', 'repo'])
  //   expect(reqFn).toHaveBeenCalledTimes(1)
  //   expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', repo: 'repo'})
  // })
})
