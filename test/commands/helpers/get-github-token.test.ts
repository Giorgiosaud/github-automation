import {fancy} from 'fancy-test'
import {expect} from 'chai'
import getGithubToken from '../../../src/helpers/get-github-token'
import * as path from 'path'
import * as fsExtra from 'fs-extra'
import cli from 'cli-ux'
import * as dotenv from 'cli-ux'
import * as fileSystem from '../../../src/helpers/file-system'
import * as sinon from 'sinon'
const existsSyncSpy = sinon.spy()
const writeFileSpy = sinon.spy()
const readFileSpy = sinon.spy()
const dotEnvParseSpy = sinon.spy()

describe('getGithubToken function', () => {
  fancy
  .stdout()
  .stub(path, 'resolve', () => 'REALPATH')
  .stub(fsExtra, 'existsSync', (...args) => {
    existsSyncSpy(...args)
  })
  .stub(cli, 'prompt', () => async () => '123')
  .stub(fsExtra, 'writeFile', (...args) => {
    writeFileSpy(...args)
    return true
  })
  .stub(fsExtra, 'readFile', (...args) => {
    readFileSpy(...args)
    return ''
  })
  .stub(dotenv, 'parse', (...args) => {
    dotEnvParseSpy(...args)
  })
  .nock('https://api.github.com', api => api
  .get('/repos/REPO')
  .reply(200, 'OK')
  )
  .it('REALPATH called in exist if response is 200', async (ctx, done) => {
    await getGithubToken('RCPATH', 'REPO')
    expect(existsSyncSpy.calledWith('REALPATH'))
    done()
  })
  fancy
  .stdout()
  .stub(path, 'resolve', () => 'REALPATH')
  .stub(fsExtra, 'existsSync', (...args) => {
    existsSyncSpy(...args)
  })
  .stub(cli, 'prompt', () => async () => '123')
  .stub(fsExtra, 'writeFile', (...args) => {
    writeFileSpy(...args)
    return true
  })
  .stub(fsExtra, 'readFile', (...args) => {
    readFileSpy(...args)
    return ''
  })
  .stub(dotenv, 'parse', (...args) => {
    dotEnvParseSpy(...args)
  })
  .nock('https://api.github.com', api => api
  .get('/repos/REPO')
  .reply(401, 'UNAUTHORIZED')
  )
  .it('error is thrown if unauthorized', async (ctx, done) => {
    try {
      await getGithubToken('RCPATH', 'REPO')
      expect(existsSyncSpy.calledWith('REALPATH'))
      done()
    } catch (error) {
      expect(error.message).to.contain('Invalid Modyo Token')
      done()
    }
  })
  fancy
  .stdout()
  .stub(path, 'resolve', () => 'REALPATH')
  .stub(fsExtra, 'existsSync', (...args) => {
    existsSyncSpy(...args)
    return true
  })
  .stub(fileSystem, 'readEnv', async () => ({GITHUB_TOKEN: '123'}))
  .it('RETURN token if exist', async (ctx, done) => {
    const token = await getGithubToken('RCPATH', 'REPO')
    expect(token).to.be.equal('123')
    done()
  })
})
