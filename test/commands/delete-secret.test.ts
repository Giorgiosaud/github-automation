import {expect, test} from '@oclif/test'
import * as removeSecret from '../../src/delete-secret/remove-secret'
describe('delete-secret command', () => {
  test
  .stdout()
  .command(['delete-secret'])
  .catch(error => {
    expect(error.message).to.contain('Missing required flag:')
    expect(error.message).to.contain('-r, --repositories REPOSITORIES')
    expect(error.message).to.contain('Can be multiples repositories with shape')
    expect(error.message).to.contain('OWNER/REPO separated by space')
    expect(error.message).to.contain('See more help with --help')
  })
  .it('delete-secret fails if no flags are set asking for repo')
  test
  .stdout()
  .command(['delete-secret', '-r', 'OWNER/REPO'])
  .catch(error => {
    expect(error.message).to.contain('Missing required flag:')
    expect(error.message).to.contain('-n, --secret-name SECRET-NAME')
    expect(error.message).to.contain('Can be multiples secret names separated by space')
    expect(error.message).to.contain('See more help with --help')
  })
  .it('delete-secret fails if only repo is set')
  test
  .stdout()
  .command(['delete-secret', '-r', 'BadRepo', '-n', 'SECRET', 'SECRE2'])
  .catch(error => {
    expect(error.message).to.contain('The repository string must be of type OWNER/NAME')
  })
  .it('set-secret fails if  Repo name not match with repo structure name')
  test
  .stdout()
  .stub(removeSecret, 'default', async () => ({}))
  .command(['delete-secret', '-r', 'OWNER/REPO', '-n', 'SECRET'])
  .it('delete-secret run', ctx => {
    expect(ctx.stdout).to.contain('Removed secret SECRET from repo: OWNER/REPO')
  })
})
