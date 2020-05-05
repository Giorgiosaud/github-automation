import updateSecrets from '../../../src/set-secret-helpers/update-secret'
import {fancy} from 'fancy-test'
import {expect} from 'chai'
import * as getGithubToken from '../../../src/helpers/get-github-token'
import * as sinon from 'sinon'
import * as tweetsodium from 'tweetsodium'

const tweetsodiumSpy = sinon.spy()

describe('updateSecrets function', () => {
  fancy
  .stdout()
  .stub(getGithubToken, 'default', async () => '123')
  .stub(tweetsodium, 'seal', () => {
    tweetsodiumSpy()
    return '123'
  }
  )
  .nock('https://api.github.com/repos', api => api
  .put('/REPO/actions/secrets/NAME')
  .reply(200, 'OK')
  )
  .it('Work', async (ctx, done) => {
    const response = await updateSecrets({encrypted_value: 'CRYPTO_VAL', key_id: 'KEY_ID', name: 'NAME', repo: 'REPO',  rcPath: ' rcPath'})
    expect(response).to.be.equal(true)
    done()
  })
})
