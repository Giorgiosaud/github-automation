import CreateEnvironment from '../../src/commands/create-environment'
describe('create-environment command', () => {
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
      await CreateEnvironment.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The repository string must only contain numbers leters and dash')
      }
    }
  })

  test('create-environment works', async () => {
    try {
      // const argv = ['-o', 'ORG', '-r', 'REPO', '-e', 'DEVELOP']
      const argv = ['-o', 'modyo', '-r', 'modyo-widgets-template-vue', '-e', 'DEVELOP']
      await CreateEnvironment.run(argv)
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toContain('The repository string must only contain numbers leters and dash')
      }
    }
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
