import {expect, test} from '@oclif/test'
import * as encryptSecret from '../../src/set-secret-helpers/encrypt-secret'
import * as updateSecret from '../../src/set-secret-helpers/update-secret'

describe('set-secret command', () => {
  test
  .stdout()
  .command(['set-secret'])
  .catch(error => {
    expect(error.message).to.contain('Missing required flag:')
    expect(error.message).to.contain('-r, --repositories REPOSITORIES')
    expect(error.message).to.contain('Can be multiples repositories with shape')
    expect(error.message).to.contain('OWNER/REPO separated by space')
    expect(error.message).to.contain('See more help with --help')
  })
  .it('set-secret fails if no flags are set asking for repo')
  test
  .stdout()
  .command(['set-secret', '-r', 'OWNER/REPO'])
  .catch(error => {
    expect(error.message).to.contain('Missing required flag:')
    expect(error.message).to.contain('-n, --secret-name SECRET-NAME')
    expect(error.message).to.contain('Can be multiples secret names separated by space')
    expect(error.message).to.contain('See more help with --help')
  })
  .it('set-secret fails if only repo is set')
  test
  .stdout()
  .command(['set-secret', '-r', 'OWNER/REPO', '-n', 'SECRET'])
  .catch(error => {
    expect(error.message).to.contain('Missing required flag:')
    expect(error.message).to.contain('-x, --secret-value SECRET-VALUE')
    expect(error.message).to.contain('Can be multiples secret values separated by')
    expect(error.message).to.contain('space')
    expect(error.message).to.contain('See more help with --help')
  })
  .it('set-secret fails if  repo and name are set without values')
  test
  .stdout()
  .command(['set-secret', '-r', 'OWNER/REPO', '-n', 'SECRET', 'SECRE2', '-x', ' VALUE '])
  .catch(error => {
    expect(error.message).to.contain('Secrets and values must be the same length')
  })
  .it('set-secret fails if  secret values length and names mismatch')
  test
  .stdout()
  .command(['set-secret', '-r', 'BadRepo', '-n', 'SECRET', 'SECRE2', '-x', ' VALUE1', 'Value2'])
  .catch(error => {
    expect(error.message).to.contain('The repository string must be of type OWNER/NAME')
  })
  .it('set-secret fails if  Repo name not match with repo structure name')
  test
  .stub(encryptSecret, 'default', async () => ({encryptedValue: 'value', keyId: 'id'}))
  .stub(updateSecret, 'default', async () => ({}))
  .stdout()
  .command(['set-secret', '-r', 'OWNER/REPO', '-n', 'SECRET', '-x', 'VALUE'])
  .it('set-secret success if all params are set', ctx => {
    expect(ctx.stdout).to.contain('Updated secret SECRET with value VALUE in OWNER/REPO')
  })
})
