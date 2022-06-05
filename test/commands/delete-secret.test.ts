import DeleteSecret from '../../src/commands/delete-secret'
import removeSecret from '../../src/delete-secret/remove-secret'
import logger from '../../src/helpers/logger'

jest.mock('../../src/delete-secret/remove-secret',
  () => jest.fn()
  .mockImplementation(() => 'You have called a mocked method 1!')
  .mockReturnValue(true))
jest.mock('../../src/helpers/logger',
  () => ({
    info: jest.fn()
    .mockImplementation(() => 'You have called a mocked method 1!')
    .mockReturnValue(true),
  }))

describe('delete-secret command', () => {
  test('delete-secret fails if no flags are set asking for repo', async () => {
    try {
      await DeleteSecret.run([])
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
  test('delete-secret fails if only repo is set', async () => {
    try {
      const argv = []
      argv.push('-r', 'REPO')
      await DeleteSecret.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Missing required flag:')
        expect(error.message).toContain('-n, --secret-name SECRET-NAME')
        expect(error.message).toContain('Can be multiples secret names separated by space')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('set-secret fails if  Repo name not match with repo structure name', async () => {
    try {
      const argv = []
      argv.push('-r', 'BadRepo', '-n', 'SECRET', 'SECRE2')
      await DeleteSecret.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The repository string must be of type OWNER/NAME')
      }
    }
  })
  test('delete-secret works well', async () => {
    const argv = []
    argv.push('-r', 'OWNER/REPO', 'OWNER/REPO2', '-n', 'SECRET')
    await DeleteSecret.run(argv)
    expect(removeSecret).toBeCalledTimes(2)
    expect(logger.info).toBeCalledWith('Removed secret SECRET from repo: OWNER/REPO')
    expect(logger.info).toBeCalledWith('Removed secret SECRET from repo: OWNER/REPO2')
  })
})
