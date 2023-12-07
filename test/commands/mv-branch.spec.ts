import {expect, test} from '@oclif/test'
import { assert, stub } from 'sinon';

import * as getGithubToken from '../../src/helpers/get-github-token'
import * as octokitClient from '../../src/repositories/clients/octokit-client'

const octokitClientStub={
  request:stub()
}

describe('Testing mv-branch command', () => {
  beforeEach(() => {
    octokitClientStub.request.reset()
  })
  test
  .stderr()
  .stdout()
  .command(['mv-branch'])
  // .exit(0)
  .catch(error => {
    expect(error.message).to.contain('The following errors occurred:')
    expect(error.message).to.contain('branchNaming')
    expect(error.message).to.contain('organization')
    expect(error.message).to.contain('repositories')
  })
  .it('mk-mv fails if no flags are set')
  test
  .stderr()
  .stdout()
  .command(['mv-branch','-b', 'prueba:r'])
  // .exit(0)
  .catch(error => {
    console.log(error.message)
    expect(error.message).to.contain('The following errors occurred:')
    expect(error.message).to.contain('organization')
    expect(error.message).to.contain('repositories')
  })
  .it('mk-mv fails only branch is set')
  
  test
  .stderr()
  .stdout()
  .command(['mv-branch','-b', 'prueba:r','-o', 'organization'])
  // .exit(0)
  .catch(error => {
    console.log(error.message)
    expect(error.message).to.contain('The following error occurred:')
    expect(error.message).to.contain('repositories')
  })
  .it('mk-mv fails only branch is set')

  test
  .stderr()
  .stdout()
  .stub(getGithubToken,'default',stub=>stub.returns('token'))
  .stub(octokitClient,'default',stub=>stub.returns(octokitClientStub))
  .command(['mv-branch','-b', 'prueba:r','-o', 'organization','-r', 'repo-1'])
  // .exit(0)

  .it('mv-branch works if branchNaming is set and org and repo',()=>{
    expect(octokitClientStub.request.calledTwice).to.be.true
     assert.calledWithExactly(octokitClientStub.request.firstCall,'GET /repos/{owner}/{repo}/branches/{branch}', {branch: 'prueba', headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'organization', repo: 'repo-1'})
     assert.calledWithExactly(octokitClientStub.request.secondCall,'POST /repos/{owner}/{repo}/branches/{branch}/rename', {branch: 'prueba', headers: {'X-GitHub-Api-Version': '2022-11-28'}, new_name: 'r', owner: 'organization', repo: 'repo-1'})
  
  })
  
  // test.stdout()
  // .command(['mk-env','-e', 'env'])
  // // .exit(0)
  // .catch(error => {
  //   expect(error.message).to.contain('The following errors occurred:')
  //   expect(error.message).to.contain('organization')
  //   expect(error.message).to.contain('repositories')
  // })
  // .it('mk-env fails if only env flag is set')
  
  // test.stdout()
  // .command(['mk-env','-e', 'env','-o', 'organization'])
  // // .exit(0)
  // .catch(error => {
  //   expect(error.message).to.contain('The following error occurred:')
  //   expect(error.message).to.contain('repositories')
  // })
  // .it('mk-env fails if only env and org flags are set')
  
  
  // test.stdout()
  // .stub(getGithubToken,'default',stub=>stub.returns('token'))
  // .command(['mk-env','-e', 'env','-o', 'organization','-r', 'rep sso'])
  // .catch(error => {
  //   expect(error.message).to.contain('The repository string must only contain numbers leters and dash')
  // })
  // .it('mk-env fails if repo is not well formatted')
  
  // test
  // .stdout()
  // .do(()=>{
  //   octokitClientStub.request.onFirstCall().returns(Promise.resolve(envRes))
  // })
  // .stub(octokitClient,'default',stub=>stub.returns(octokitClientStub))
  // .stub(getGithubToken,'default',stub=>stub.returns('token'))
  // .command(['mk-env','-e', 'env','-o', 'organization','-r', 'repo-1'])
  // .it('mk-env works if repo name match',()=>{
  //   expect(octokitClientStub.request.calledTwice).to.be.true
  //   assert.calledWithExactly(octokitClientStub.request.firstCall,'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'organization' , repo: 'repo-1'})
  //   assert.calledWithExactly(octokitClientStub.request.secondCall,'PUT /repos/{owner}/{repo}/environments/{environment_name}', {environment_name: 'env', headers: {'X-GitHub-Api-Version': '2022-11-28'},owner: 'organization' , repo: 'repo-1'})
  // })

  // test
  // .stdout()
  // .do(()=>{
  //   octokitClientStub.request.returns(Promise.resolve(envRes))
  // })
  // .stub(octokitClient,'default',stub=>stub.returns(octokitClientStub))
  // .stub(getGithubToken,'default',stub=>stub.returns('token'))
  // .command(['mk-env','-e', 'env','-o', 'organization','-r', 'repo-1','repo-2'])
  // .it('mk-env works if multi repositories set',()=>{
  //   expect(octokitClientStub.request.callCount).to.be.eq(4)
  //   assert.calledWithExactly(octokitClientStub.request.getCall(0), 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'organization', repo: 'repo-1'})
  //   assert.calledWithExactly(octokitClientStub.request.getCall(1), 'PUT /repos/{owner}/{repo}/environments/{environment_name}', {environment_name: 'env', headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'organization', repo: 'repo-1'})
  //   assert.calledWithExactly(octokitClientStub.request.getCall(2), 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'organization', repo: 'repo-2'})
  //   assert.calledWithExactly(octokitClientStub.request.getCall(3), 'PUT /repos/{owner}/{repo}/environments/{environment_name}', {environment_name: 'env', headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'organization', repo: 'repo-2'})
  // })
  // test
  // .stdout()
  // .do(()=>{
  //   octokitClientStub.request.returns(Promise.resolve(envRes))
  // })
  // .stub(octokitClient,'default',stub=>stub.returns(octokitClientStub))
  // .stub(getGithubToken,'default',stub=>stub.returns('token'))
  // .command(['mk-env','-e', 'env-1','env-2','-o', 'organization','-r','repo-2'])
  // .it('mk-env works if multi environments set',()=>{
  //   expect(octokitClientStub.request.callCount).to.be.eq(3)
  //   // assert.calledWithExactly(octokitClientStub.request.getCall(0), 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'owner', repo: 'repo-1'})
  //   // assert.calledWithExactly(octokitClientStub.request.getCall(1), 'PUT /repos/{owner}/{repo}/environments/{environment_name}', {environment_name: 'env-1', headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'owner', repo: 'repo-1'})
  //   // assert.calledWithExactly(octokitClientStub.request.getCall(2), 'PUT /repos/{owner}/{repo}/environments/{environment_name}', {environment_name: 'env-2', headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'owner', repo: 'repo-1'})
  // })

  // test
  // .stdout()
  // .do(()=>{
  //   octokitClientStub.request.returns(Promise.resolve({data: {
  //     environments: [{
  //       id: 1,
  //       name: 'env-1',
  //     }]}
  //   }))
  // })
  // .stub(octokitClient,'default',stub=>stub.returns(octokitClientStub))
  // .stub(getGithubToken,'default',stub=>stub.returns('token'))
  // .command(['mk-env','-e', 'env-1', 'env-2', '-o', 'organization', '-r', 'repo-1'])
  // .it('mk-env works if multi environments set but not call repeated one',()=>{
  //   expect(octokitClientStub.request.callCount).to.be.eq(2)
  //   assert.calledWithExactly(octokitClientStub.request.getCall(0), 'GET /repos/{owner}/{repo}/environments', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'organization', repo: 'repo-1'})
  //   assert.calledWithExactly(octokitClientStub.request.getCall(1), 'PUT /repos/{owner}/{repo}/environments/{environment_name}', {environment_name: 'env-2', headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'organization', repo: 'repo-1'})
  // })

  
})
