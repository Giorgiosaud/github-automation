import encryptSecrets from '../../../src/set-secret-helpers/encrypt-secret'
import {fancy} from 'fancy-test'
import {expect} from 'chai'
import * as getGithubToken from '../../../src/helpers/get-github-token'
import * as sinon from 'sinon'
import * as tweetsodium from 'tweetsodium'
import * as fsExtra from 'fs-extra'

const tweetsodiumSpy = sinon.spy()
const fsExtraSpy = sinon.spy()
describe('encryptSecrets function', () => {
  fancy
  .stdout()
  .stub(getGithubToken, 'default', async () => '123')
  .stub(tweetsodium, 'seal', () => {
    tweetsodiumSpy()
    return '123'
  },
  )
  .nock('https://api.github.com/repos/', api => api
  .get('/REPO/actions/secrets/public-key')
  .reply(200, {
    key: '1', key_id: '2',
  }),
  )
  .it('encryptSecrets work', async (ctx, done) => {
    await encryptSecrets('REPO', 'VALUE', 'RCPATH')
    expect(tweetsodiumSpy.calledOnce).to.be.equal(true)
    done()
  })
  fancy
  .stub(getGithubToken, 'default', async () => '123')
  .stub(fsExtra, 'writeFile', async (...args) => {
    fsExtraSpy(...args)
    return async ()=>true
  })
  .nock('https://api.github.com/repos/', api => api
  .get('/REPO/actions/secrets/public-key')
  .reply(401, 'unauthorized'),
  )

  .it('clean githubtoken if fails', async (ctx, done) => {
    await encryptSecrets('REPO', 'VALUE', 'RCPATH')
    expect(tweetsodiumSpy.calledOnce).to.be.equal(true)
    done()
  })
})
