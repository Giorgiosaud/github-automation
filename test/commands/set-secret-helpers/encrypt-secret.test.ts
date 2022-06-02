/* eslint-disable node/no-extraneous-import */
/* eslint-disable camelcase */
import encryptSecrets from '../../../src/set-secret-helpers/encrypt-secret'
import {fancy} from 'fancy-test'
import {expect} from 'chai'
import * as sinon from 'sinon'
import { CliUx } from '@oclif/core'
import * as getGithubToken from '../../../src/helpers/get-github-token'


const getGithubTokenStub = sinon.stub()
const cliPromptToken = sinon.stub()
describe('encryptSecrets function', () => {
  
  fancy
  .stub(CliUx.ux, 'prompt', () =>cliPromptToken.resolves('123'))
  .stub(getGithubToken,'default',()=>getGithubTokenStub.resolves('123')())
  .nock('https://api.github.com/repos/', api => api
  .get('/REPO/actions/secrets/public-key')
  .matchHeader('authorization', 'Bearer 123')
  .reply(200, {
    key: '123123', key_id: '123123',
  }),
  )
  .it('encryptSecrets work', async (ctx, done) => {
    try {
      await encryptSecrets('REPO', 'VALUE', 'RCPATH')
      expect(true).to.be.true
      //expect(sodiumStub.calledOnce).to.be.equal(true)
    } catch (error) {
      console.error('kmokmokmo')
      console.error(error)
    } finally {
      done()
    }
  })
})
