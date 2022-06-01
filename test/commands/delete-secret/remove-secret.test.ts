/* eslint-disable node/no-missing-import */
import {fancy} from 'fancy-test'
import {expect} from 'chai'
import removeSecret from '../../../src/delete-secret/remove-secret'
import * as getGithubToken from '../../../src/helpers/get-github-token'
import * as sinon from 'sinon'
const getGithubTokenSpy = sinon.spy()
describe('removeSecret function', () => {
  fancy
  .stub(getGithubToken, 'default',  () => {
    getGithubTokenSpy()
  })
  .nock('https://api.github.com', api => api
  .delete('/repos/REPO/actions/secrets/SECRET')
  .reply(204, 'NO CONTENT'),
  )
  .it('everything pass id response is 204', async (ctx, done) => {
    await removeSecret('REPO', 'SECRET', 'RCPATH')
    expect(getGithubTokenSpy.calledOnce).to.be.equal(true)
    done()
  })
})
