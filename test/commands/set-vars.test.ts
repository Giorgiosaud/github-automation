import * as encryptSecret from '../../src/set-secret-helpers/encrypt-secret'
import * as updateSecret from '../../src/set-secret-helpers/update-secret'
import SetVars from '../../src/commands/set-vars'
import * as logger from '../../src/helpers/logger'
import * as getGithubToken from '../../src/helpers/get-github-token'

const spyGetGithubToken = jest.spyOn(getGithubToken, 'default')
const spyEncryptSectet = jest.spyOn(encryptSecret, 'default')
const spyUpdateSecret = jest.spyOn(updateSecret, 'default')
const spyLogger = jest.spyOn(logger, 'info')
spyGetGithubToken.mockResolvedValue('MY_TOKEN')
spyEncryptSectet.mockImplementation(({value, org, repo, name}) => Promise.resolve({encryptedValue: 'sxxx', keyId: 'dssss', name, value, org, repo}))
spyUpdateSecret.mockResolvedValue(true)
describe('set-secret command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('set-secret fails if no flags are set asking for repo', async () => {
    try {
      await SetVars.run([])
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The following errors occurred:')
        expect(error.message).toContain('Missing required flag organization')
        expect(error.message).toContain('Missing required flag repositories')
        expect(error.message).toContain('Missing required flag secret-name')
        expect(error.message).toContain('Missing required flag secret-value')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('set-secret fails if only org is set', async () => {
    try {
      const argv = ['-o', 'ORG']
      await SetVars.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The following errors occurred:')
        expect(error.message).toContain('Missing required flag repositories')
        expect(error.message).toContain('Missing required flag secret-name')
        expect(error.message).toContain('Missing required flag secret-value')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('set-secret fails if only org and repo are set', async () => {
    try {
      const argv = ['-o', 'ORG', '-r', 'REPO']
      await SetVars.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The following errors occurred:')
        expect(error.message).toContain('Missing required flag secret-name')
        expect(error.message).toContain('Missing required flag secret-value')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('set-secret fails if only org and repo and name are set', async () => {
    try {
      const argv = ['-o', 'ORG', '-r', 'REPO', '-n', 'SECRET', 'SECRE2']
      await SetVars.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The following error occurred:')
        expect(error.message).toContain('Missing required flag secret-value')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })

  test('set-secret fails if names and secret count not match', async () => {
    try {
      const argv = ['-o', 'ORG', '-r', 'REPO', '-n', 'SECRET', 'SECRE2', '-x', 'VALUE ']
      await SetVars.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Secrets and values must be the same length')
      }
    }
  })
  test('set-secret works if everithing is set', async () => {
    const argv = ['-o', 'ORG', '-r', 'REPO', '-n', 'SECRET', 'SECRE2', '-x', 'VALUE', 'Value2']
    await SetVars.run(argv)
    expect(spyEncryptSectet).toBeCalledTimes(2)
    expect(spyUpdateSecret).toBeCalledTimes(2)
    expect(spyLogger).toBeCalledTimes(2)
    expect(spyLogger).toHaveBeenNthCalledWith(1, 'Updated secret SECRET with value VALUE in org: ORG in repo: REPO')
    expect(spyLogger).toHaveBeenNthCalledWith(2, 'Updated secret SECRE2 with value Value2 in org: ORG in repo: REPO')
  })
  test('set-secret works env is set', async () => {
    const argv = ['-o', 'ORG', '-r', 'REPO',  '-e', 'develop', '-n', 'SECRET', 'SECRE2', '-x', 'VALUE', 'Value2']
    await SetVars.run(argv)
    expect(spyEncryptSectet).toBeCalledTimes(2)
    expect(spyUpdateSecret).toBeCalledTimes(2)
    expect(spyLogger).toBeCalledTimes(2)
    expect(spyLogger).toHaveBeenNthCalledWith(1, 'Updated secret SECRET with value VALUE in org: ORG in repo: REPO')
    expect(spyLogger).toHaveBeenNthCalledWith(2, 'Updated secret SECRE2 with value Value2 in org: ORG in repo: REPO')
  })
})
