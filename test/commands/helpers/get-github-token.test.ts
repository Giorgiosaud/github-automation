import {fancy} from 'fancy-test'
import {expect} from 'chai'
import getGithubToken from '../../../src/helpers/get-github-token'
import path from 'node:path'
import fsExtra, { read } from 'fs-extra'
import {CliUx} from '@oclif/core'
import * as fileSystem from '../../../src/helpers/file-system'
import * as sinon from 'sinon'
const existsSyncStub = sinon.stub()
const pathStub = sinon.stub()
const writeFileStub = sinon.stub()
const buildEnvContentStub = sinon.stub()
const readEnvStub = sinon.stub()
const cliPromptToken = sinon.stub()

describe('getGithubToken function', () => {
  beforeEach(() => {
    sinon.reset()
  })
  fancy
  .stub(fsExtra, 'existsSync', (...args) => {
    existsSyncStub(...args)
    return Promise.resolve(true)
  })
  .stub(fileSystem, 'readEnv', async (...args) => {
    readEnvStub(args)
    return {
      GITHUB_TOKEN: '123',
    }
  })

  .stub(fsExtra, 'writeFile', (...args) => {
    writeFileStub(...args)
    return true
  })

  .it('REALPATH called in exist if response is 200', async (ctx, done) => {
    const token = await getGithubToken('RCPATH', 'organization')
    expect(token).equal('123')
    expect(existsSyncStub.calledOnce).to.be.true
    expect(writeFileStub.notCalled).to.be.true
    expect(readEnvStub.calledOnce).to.be.true
    done()
  })
  fancy
  .stub(fsExtra, 'existsSync', ()=>existsSyncStub.resolves(false)())
  .stub(fsExtra, 'writeFile', ()=>writeFileStub.resolves(true)())
  .stub(path, 'resolve', ()=>pathStub.returns('REALPATH')())
  .stub(fileSystem, 'readEnv', ()=>readEnvStub.returns({})())
  .stub(CliUx.ux, 'prompt', () =>cliPromptToken.resolves('123'))
  .nock('https://api.github.com', api => api
  .get('/orgs/organization/repos?type=member')
  .reply(200, [{}]),
  )
  .it('prompts a token if not exist', async (ctx, done) => {
    try{
      const token = await getGithubToken('RCPATH', 'organization')
    expect(token).equal('123')
    expect(cliPromptToken.calledOnce).to.be.true
    }finally{
      done()
    }
  })
  fancy
  .stub(path, 'resolve', ()=>pathStub.returns('REALPATH')())
  .stub(fsExtra, 'existsSync', ()=>existsSyncStub.resolves(false)())
  .stub(fsExtra, 'writeFile', ()=>writeFileStub.resolves(true)())
  .stub(fileSystem, 'readEnv', ()=>readEnvStub.returns({})())
  .stub(CliUx.ux, 'prompt', () =>cliPromptToken.resolves('123'))
  .nock('https://api.github.com', api => api
  .get('/orgs/organization/repos?type=member')
  .reply(200, []),
  )
  .it('throws an error if is not member of org', async (ctx, done) => {
    try {
      await getGithubToken('RCPATH', 'organization')
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).to.contain('Invalid Modyo Token')
      }
    }finally{
      done();
    }
  })
  fancy
  .stub(path, 'resolve', () => 'REALPATH')
  .stub(fsExtra, 'existsSync', (...args) => {
    existsSyncStub(...args)
    return Promise.resolve(false)
  })
  .stub(fsExtra, 'writeFile', (...args) => {
    writeFileStub(...args)
    return true
  })
  .stub(fileSystem, 'readEnv', async (...args) => {
    readEnvStub(...args)
    return {}
  })
  .stub(CliUx.ux, 'prompt', (...args) => {
    cliPromptToken(...args)
    return async () => '123'
  })
  .stub(fileSystem, 'buildEnvContent', (...args) => {
    buildEnvContentStub(...args)
    return {
      GITHUB_TOKEN: '123',
    }
  })

  .nock('https://api.github.com', api => api
  .get('/orgs/organization/repos?type=member')
  .reply(200, [{}]),
  )
  .it('return the token and write GITHUB_TOKEN in rcpath if not exist', async (ctx, done) => {
    const token = await getGithubToken('RCPATH', 'organization')
    expect(token).equal('123')
    expect(cliPromptToken.calledOnce).to.be.true
    expect(buildEnvContentStub.calledWith({GITHUB_TOKEN: '123'})).to.be.true
    expect(buildEnvContentStub.calledOnce).to.be.true
    done()
  })
})
