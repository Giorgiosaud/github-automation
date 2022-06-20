import encryptSecret from '../../src/set-secret-helpers/encrypt-secret'
import updateSecret from '../../src/set-secret-helpers/update-secret'
import SetSecret from '../../src/commands/set-secret'
import logger from '../../src/helpers/logger'

jest.mock('../../src/set-secret-helpers/encrypt-secret', () => jest.fn().mockResolvedValue({encryptedValue: 's', keyId: 'd'}))
jest.mock('../../src/set-secret-helpers/update-secret', () => jest.fn().mockResolvedValue(true))
jest.mock('../../src/helpers/logger',
  () => ({
    info: jest.fn(),
  }))
describe('set-secret command', () => {
  test('set-secret fails if no flags are set asking for repo', async () => {
    try {
      await SetSecret.run([])
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Missing required flag:')
        expect(error.message).toContain('-o, --organization ORGANIZATION')
        expect(error.message).toContain('A single string containing the organization')
        expect(error.message).toContain('name')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('set-secret fails if only org is set', async () => {
    try {
      const argv = ['-o', 'ORG']
      await SetSecret.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Missing required flag:')
        expect(error.message).toContain('-r, --repositories REPOSITORIES')
        expect(error.message).toContain('Can be multiples repositories names')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('set-secret fails if org and repo is set', async () => {
    try {
      const argv = ['-o', 'ORG', '-r', 'REPO']
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

  test('set-secret fails if names and secret count not match', async () => {
    try {
      const argv = ['-o', 'ORG', '-r', 'REPO', '-n', 'SECRET', 'SECRE2', '-x', 'VALUE ']
      await SetSecret.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Secrets and values must be the same length')
      }
    }
  })
  test.skip('set-secret works if everithing is set', async () => {
    const argv = ['-o', 'ORG', '-r', 'REPO', '-n', 'SECRET', 'SECRE2', '-x', ' VALUE ', 'Value2']
    await SetSecret.run(argv)
    expect(encryptSecret).toBeCalledTimes(2)
    expect(updateSecret).toBeCalledTimes(2)
    expect(logger.info).toHaveBeenNthCalledWith(1, 'Updated secret SECRET with value  VALUE  in org: ORG in repo: REPO')
    expect(logger.info).toHaveBeenNthCalledWith(2, 'Updated secret SECRE2 with value Value2 in org: ORG in repo: REPO')
  })
})
