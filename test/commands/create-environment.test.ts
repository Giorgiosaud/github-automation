import CreateEnvironment from '../../src/commands/create-environment'
import * as getGithubToken from '../../src/helpers/get-github-token'
import * as createEnvironment from '../../src/helpers/environments/create-environment'
import * as getEnvironment from '../../src/helpers/environments/get-environment'

describe('create-environment command', () => {
  const spyGetGithubToken = jest.spyOn(getGithubToken, 'default')
  const createEnvironmentSpy = jest.spyOn(createEnvironment, 'default')
  const getEnvironmentSpy = jest.spyOn(getEnvironment, 'default')
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('create-environment fails if no flags are set asking for repo', async () => {
    try {
      await CreateEnvironment.run([])
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The following errors occurred:')
        expect(error.message).toContain('Missing required flag organization')
        expect(error.message).toContain('Missing required flag repositories')
        expect(error.message).toContain('Missing required flag environment')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('create-environment fails if only org is set', async () => {
    try {
      const argv = ['-o', 'ORG']
      await CreateEnvironment.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The following errors occurred:')
        expect(error.message).toContain('Missing required flag repositories')
        expect(error.message).toContain('Missing required flag environment')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('create-environment fails if only org and repo is set', async () => {
    try {
      const argv = ['-o', 'ORG', '-r', 'REPO']
      await CreateEnvironment.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The following error occurred:')
        expect(error.message).toContain('Missing required flag environment')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('create-environment fails repo is bad formed', async () => {
    try {
      const argv = ['-o', 'ORG', '-r', 'REPO A C 99', '-e', 'DEVELOP']
      spyGetGithubToken.mockResolvedValueOnce('TOKEN')
      await CreateEnvironment.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The repository string must only contain numbers leters and dash')
      }
    }
  })

  test('create-environment works', async () => {
    spyGetGithubToken.mockResolvedValueOnce('TOKEN')
    getEnvironmentSpy.mockResolvedValue([
      {
        id: 161_088_068,
        node_id: 'MDExOkVudmlyb25tZW50MTYxMDg4MDY4',
        name: 'staging',
        url: 'https://api.github.com/repos/github/hello-world/environments/staging',
        html_url: 'https://github.com/github/hello-world/deployments/activity_log?environments_filter=staging',
        created_at: '2020-11-23T22:00:40Z',
        updated_at: '2020-11-23T22:00:40Z',
        protection_rules: [
          {
            id: 3736,
            node_id: 'MDQ6R2F0ZTM3MzY=',
            type: 'wait_timer',
            wait_timer: 30,
          },
          {
            id: 3755,
            node_id: 'MDQ6R2F0ZTM3NTU=',
            type: 'required_reviewers',
            reviewers: [
              {
                type: 'User',
                reviewer: {
                  login: 'octocat',
                  id: 1,
                  node_id: 'MDQ6VXNlcjE=',
                  avatar_url: 'https://github.com/images/error/octocat_happy.gif',
                  gravatar_id: '',
                  url: 'https://api.github.com/users/octocat',
                  html_url: 'https://github.com/octocat',
                  followers_url: 'https://api.github.com/users/octocat/followers',
                  following_url: 'https://api.github.com/users/octocat/following{/other_user}',
                  gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
                  starred_url: 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
                  subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
                  organizations_url: 'https://api.github.com/users/octocat/orgs',
                  repos_url: 'https://api.github.com/users/octocat/repos',
                  events_url: 'https://api.github.com/users/octocat/events{/privacy}',
                  received_events_url: 'https://api.github.com/users/octocat/received_events',
                  type: 'User',
                  site_admin: false,
                },
              },
              {
                type: 'Team',
                reviewer: {
                  id: 1,
                  node_id: 'MDQ6VGVhbTE=',
                  url: 'https://api.github.com/teams/1',
                  html_url: 'https://github.com/orgs/github/teams/justice-league',
                  name: 'Justice League',
                  slug: 'justice-league',
                  description: 'A great team.',
                  privacy: 'closed',
                  permission: 'admin',
                  members_url: 'https://api.github.com/teams/1/members{/member}',
                  repositories_url: 'https://api.github.com/teams/1/repos',
                  parent: null,
                },
              },
            ],
          },
          {
            id: 3756,
            node_id: 'MDQ6R2F0ZTM3NTY=',
            type: 'branch_policy',
          },
        ],
        deployment_branch_policy: {
          protected_branches: false,
          custom_branch_policies: true,
        },
      },
    ])
    createEnvironmentSpy.mockResolvedValue({})
    // const argv = ['-o', 'ORG', '-r', 'REPO', '-e', 'DEVELOP']
    const argv = ['-o', 'modyo', '-r', 'modyo-widgets-template-vue', '-e', 'DEVELOP']
    await CreateEnvironment.run(argv)
    expect(createEnvironmentSpy).toHaveBeenCalledTimes(1)
  })
  // test('create-environment fails if only org and repo are set', async () => {
  //   try {
  //     const argv = ['-o', 'ORG', '-r', 'REPO']
  //     await CreateEnvironment.run(argv)
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       expect(error.message).toContain('The following errors occurred:')
  //       expect(error.message).toContain('Missing required flag secret-name')
  //       expect(error.message).toContain('Missing required flag secret-value')
  //       expect(error.message).toContain('See more help with --help')
  //     }
  //   }
  // })
  // test('create-environment fails if only org and repo and name are set', async () => {
  //   try {
  //     const argv = ['-o', 'ORG', '-r', 'REPO', '-n', 'SECRET', 'SECRE2']
  //     await CreateEnvironment.run(argv)
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       expect(error.message).toContain('The following error occurred:')
  //       expect(error.message).toContain('Missing required flag secret-value')
  //       expect(error.message).toContain('See more help with --help')
  //     }
  //   }
  // })

  // test('create-environment fails if names and secret count not match', async () => {
  //   try {
  //     const argv = ['-o', 'ORG', '-r', 'REPO', '-n', 'SECRET', 'SECRE2', '-x', 'VALUE ']
  //     await CreateEnvironment.run(argv)
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       expect(error.message).toContain('Secrets and values must be the same length')
  //     }
  //   }
  // })
  // test('create-environment works if everithing is set', async () => {
  //   const argv = ['-o', 'ORG', '-r', 'REPO', '-n', 'SECRET', 'SECRE2', '-x', 'VALUE', 'Value2']
  //   await CreateEnvironment.run(argv)
  //   expect(spyEncryptSectet).toBeCalledTimes(2)
  //   expect(spyUpdateSecret).toBeCalledTimes(2)
  //   expect(spyLogger).toBeCalledTimes(2)
  //   expect(spyLogger).toHaveBeenNthCalledWith(1, 'Updated secret SECRET with value VALUE in org: ORG in repo: REPO')
  //   expect(spyLogger).toHaveBeenNthCalledWith(2, 'Updated secret SECRE2 with value Value2 in org: ORG in repo: REPO')
  // })
  // test('create-environment works env is set', async () => {
  //   const argv = ['-o', 'ORG', '-r', 'REPO',  '-e', 'develop', '-n', 'SECRET', 'SECRE2', '-x', 'VALUE', 'Value2']
  //   await CreateEnvironment.run(argv)
  //   expect(spyEncryptSectet).toBeCalledTimes(2)
  //   expect(spyUpdateSecret).toBeCalledTimes(2)
  //   expect(spyLogger).toBeCalledTimes(2)
  //   expect(spyLogger).toHaveBeenNthCalledWith(1, 'Updated secret SECRET with value VALUE in org: ORG in repo: REPO')
  //   expect(spyLogger).toHaveBeenNthCalledWith(2, 'Updated secret SECRE2 with value Value2 in org: ORG in repo: REPO')
  // })
})
