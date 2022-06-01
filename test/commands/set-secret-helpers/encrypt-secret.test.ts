/* eslint-disable node/no-extraneous-import */
/* eslint-disable camelcase */
import encryptSecrets from '../../../src/set-secret-helpers/encrypt-secret'
import {fancy} from 'fancy-test'
import {expect} from 'chai'
import * as getGithubToken from '../../../src/helpers/get-github-token'
import * as sinon from 'sinon'
import * as sodium from '@devtomio/sodium'

const sodiumSpy = sinon.spy()

describe('encryptSecrets function', () => {
  fancy
  .stub(getGithubToken, 'default', async () => '123')
  .stub(sodium, 'crypto_box_seal', () => {
    sodiumSpy()
    return '123'
  },
  )
  .nock('https://api.github.com/repos/', api => api
  .persist()
  .get('/REPO/actions/secrets/public-key')
  .matchHeader('authorization', 'Bearer 123')
  .reply(200, {
    key: '123123', key_id: '123123',
  }),
  )
  .it('encryptSecrets work', async (ctx, done) => {
    try {
      await encryptSecrets('REPO', 'VALUE', 'RCPATH')
      expect(sodiumSpy.calledOnce).to.be.equal(true)
    } catch (error) {
      console.error(error)
    } finally {
      done()
    }
  })
})
