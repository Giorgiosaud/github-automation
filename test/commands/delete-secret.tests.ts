import removeSecret from '../../src/helpers/delete-secrets'
import logger from '../../src/helpers/logger'

jest.mock('../../src/helpers/delete-secrets',
  () => jest.fn()
  .mockImplementation(() => 'You have called a mocked method 1!')
  .mockReturnValue(true))
jest.mock('../../src/helpers/logger',
  () => ({
    info: jest.fn(),
  }))

describe('delete-secret command', () => {
  test.only('delete-secret fails if no flags are set asking for repo', async () => {
    try {
      await removeSecret.run([])
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Missing required flag:')
        expect(error.message).toContain('-o, --organization ORGANIZATION')
        expect(error.message).toContain('a single sting with the name of org')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('delete-secret fails if only org is set', async () => {
    try {
      await DeleteSecret.run(['-o', 'org'])
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Missing required flag:')
        expect(error.message).toContain('-r, --repositories REPOSITORIES')
        expect(error.message).toContain('Can be multiples repositories with shape REPO')
        expect(error.message).toContain('separated by space')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test('delete-secret fails if only repo is set', async () => {
    try {
      await DeleteSecret.run(['-o', 'org', '-r', 'REPO'])
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('Missing required flag:')
        expect(error.message).toContain('-n, --secret-name SECRET-NAME')
        expect(error.message).toContain('Can be multiples secret names separated by space')
        expect(error.message).toContain('See more help with --help')
      }
    }
  })
  test(
    'delete-secret fails if  Repo name not match with repo structure name',
    async () => {
      try {
        await DeleteSecret.run(['-o', 'org', '-r', 'BadRepo%%', '--secret-name', 'SECRET', 'SECRE2'])
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toContain('The repository string must only contain numbers leters and dash')
        }
      }
    },
  )
  test('delete-secret works', async () => {
    await DeleteSecret.run(['-o', 'org', '-r', 'repo', '--secret-name', 'SECRET', 'SECRE2'])
    expect(removeSecret).toBeCalledTimes(2)
    expect(logger.info).toHaveBeenNthCalledWith(1,  'Removed secret SECRET from repo: repo in org')
    expect(logger.info).toHaveBeenNthCalledWith(2, 'Removed secret SECRE2 from repo: repo in org')
  })
})
