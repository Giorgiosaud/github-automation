import { ux} from '@oclif/core'
import {expect, test} from '@oclif/test'
import {assert,stub} from 'sinon'

import * as getGithubToken from '../../src/helpers/get-github-token'
import * as octokitClient from '../../src/repositories/clients/octokit-client'
const lsRes={
  data: [
    {
      name: 'repo1',
    },
    {
      name: 'repo2',
    },
  ],
  headers: {
    link: 'link',
    },
}
const spyRequest = {
  ...octokitClient.default,
  request: stub().returns(Promise.resolve(lsRes)),
};
const spyStyledObject = stub(ux,'styledObject')
describe('Testing LS function', () => {

  test.stdout()
  .command(['ls'])
  // .exit(0)
  .catch(error => {
    expect(error.message).to.contain('Missing 1 required arg')
    expect(error.message).to.contain('owner')
  })
  .it('fails without arguments')
  
  test
  .stub(getGithubToken,'default',stub=>stub.returns('token'))
  .stub(octokitClient,'default',stub=>stub.returns(Promise.resolve(spyRequest)))
  .command(['ls', 'ORG'])
  .it('test is executed correctly',()=>{
    expect(spyRequest.request.calledOnce).to.be.true
    assert.calledWith(spyRequest.request,'GET /orgs/{org}/repos', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, org: 'ORG', page: 1, per_page: 100})
    assert.calledWith(spyStyledObject, {page: 'link', repositories: ['repo1', 'repo2']})

  })
})
