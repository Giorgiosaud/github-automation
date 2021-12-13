import {fancy} from 'fancy-test'
import {expect} from 'chai'
import getGithubToken from '../../../src/helpers/get-github-token'
import * as path from 'node:path'
import * as fsExtra from 'fs-extra'
import * as cli from 'cli-ux'
import * as fileSystem from '../../../src/helpers/file-system'
import * as sinon from 'sinon'
const existsSyncSpy = sinon.spy()
const writeFileSpy = sinon.spy()
const buildEnvContentSpy = sinon.spy()
const readEnvSpy = sinon.spy()
const cliPromptToken = sinon.spy()

describe('getGithubToken function', () => {
  beforeEach(() => {
    sinon.reset()
  })
  fancy
  .stub(fsExtra, 'existsSync', (...args) => {
    existsSyncSpy(...args)
    return Promise.resolve(true)
  })
  .stub(fileSystem, 'readEnv', async (...args) => {
    readEnvSpy(args)
    return {
      GITHUB_TOKEN: '123',
    }
  })

  .stub(fsExtra, 'writeFile', (...args) => {
    writeFileSpy(...args)
    return true
  })

  .it('REALPATH called in exist if response is 200', async (ctx, done) => {
    const token = await getGithubToken('RCPATH', 'organization')
    expect(token).equal('123')
    expect(existsSyncSpy.calledOnce).to.be.true
    expect(writeFileSpy.notCalled).to.be.true
    expect(readEnvSpy.calledOnce).to.be.true
    done()
  })
  fancy
  .stub(path, 'resolve', () => 'REALPATH')
  .stub(fsExtra, 'existsSync', (...args) => {
    existsSyncSpy(...args)
    return Promise.resolve(false)
  })
  .stub(fsExtra, 'writeFile', (...args) => {
    writeFileSpy(...args)
    return true
  })
  .stub(fileSystem, 'readEnv', async (...args) => {
    readEnvSpy(args)
    return {}
  })
  .stub(cli.ux, 'prompt', (...args) => {
    cliPromptToken(...args)
    return async () => '123'
  })
  .nock('https://api.github.com', api => api
  .get('/orgs/organization/repos?type=member')
  .reply(200, [{}]),
  )
  .it('prompts a token if not exist', async (ctx, done) => {
    const token = await getGithubToken('RCPATH', 'organization')
    expect(token).equal('123')
    expect(cliPromptToken.calledOnce).to.be.true
    done()
  })
  fancy
  .stub(path, 'resolve', () => 'REALPATH')
  .stub(fsExtra, 'existsSync', (...args) => {
    existsSyncSpy(...args)
    return Promise.resolve(false)
  })
  .stub(fsExtra, 'writeFile', (...args) => {
    writeFileSpy(...args)
    return true
  })
  .stub(fileSystem, 'readEnv', async (...args) => {
    readEnvSpy(args)
    return {}
  })
  .stub(cli.ux, 'prompt', (...args) => {
    cliPromptToken(...args)
    return async () => '123'
  })
  .nock('https://api.github.com', api => api
  .get('/orgs/organization/repos?type=member')
  .reply(200, []),
  )
  .it('throws an error if is not member of org', async (ctx, done) => {
    try {
      await getGithubToken('RCPATH', 'organization')
    } catch (error) {
      expect(error.message).to.contain('Invalid Modyo Token')
      done()
    }
  })
  fancy
  .stub(path, 'resolve', () => 'REALPATH')
  .stub(fsExtra, 'existsSync', (...args) => {
    existsSyncSpy(...args)
    return Promise.resolve(false)
  })
  .stub(fsExtra, 'writeFile', (...args) => {
    writeFileSpy(...args)
    return true
  })
  .stub(fileSystem, 'readEnv', async (...args) => {
    readEnvSpy(...args)
    return {}
  })
  .stub(cli.ux, 'prompt', (...args) => {
    cliPromptToken(...args)
    return async () => '123'
  })
  .stub(fileSystem, 'buildEnvContent', (...args) => {
    buildEnvContentSpy(...args)
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
    expect(buildEnvContentSpy.calledWith({GITHUB_TOKEN: '123'})).to.be.true
    expect(buildEnvContentSpy.calledOnce).to.be.true
    done()
  })
})
