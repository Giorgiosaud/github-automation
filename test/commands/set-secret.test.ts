import encryptSecret from '../../src/set-secret-helpers/encrypt-secret'
import updateSecret from '../../src/set-secret-helpers/update-secret'
import SetSecret from '../../src/commands/set-secret'
import logger from '../../src/helpers/logger'

jest.mock('../../src/set-secret-helpers/encrypt-secret', () => jest.fn().mockResolvedValue({encryptedValue: 's', keyId: 'd'}))
jest.mock('../../src/set-secret-helpers/update-secret', () => jest.fn().mockResolvedValue(true))
jest.mock('../../src/helpers/logger',
  () => ({
    info: jest.fn()
    .mockImplementation(() => 'You have called a mocked method 1!')
    .mockReturnValue(true),
  }))
describe('set-secret command', () => {
  test('set-secret fails if no flags are set asking for repo', async () => {
    try {
      await SetSecret.run([])
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Missing required flag:')
        expect(error.message).toContain('-r, --repositories REPOSITORIES')
        expect(error.message).toContain('Can be multiples repositories with shape')
        expect(error.message).toContain('OWNER/REPO separated by space')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('set-secret fails if only repo is set', async () => {
    try {
      const argv = []
      argv.push('-r', 'OWNER/REPO')
      await SetSecret.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Missing required flag:')
        expect(error.message).toContain('-n, --secret-name SECRET-NAME')
        expect(error.message).toContain('Can be multiples secret names separated by space')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('set-secret fails if  repo and name are set without values', async () => {
    try {
      const argv = []
      argv.push('-r', 'OWNER/REPO', '-n', 'SECRET', 'SECRE2', '-x', ' VALUE ')
      await SetSecret.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Secrets and values must be the same length')
      }
    }
  })
  test('set-secret fails if  Repo name not match with repo structure name', async () => {
    try {
      const argv = []
      argv.push('-r', 'BadRepo', '-n', 'SECRET', 'SECRE2', '-x', ' VALUE1', 'Value2')
      await SetSecret.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The repository string must be of type OWNER/NAME')
      }
    }
  })
  test('set-secret works if everithing is set', async () => {
    const argv = []
    argv.push('-r', 'OWNER/REPO', '-n', 'SECRET', 'SECRET2', '-x', 'VALUE', 'VALUE2')
    await SetSecret.run(argv)
    expect(encryptSecret).toBeCalledTimes(2)
    expect(updateSecret).toBeCalledTimes(2)
    expect(logger.info).toBeCalledWith('Updated secret SECRET with value VALUE in OWNER/REPO')
  })
})
