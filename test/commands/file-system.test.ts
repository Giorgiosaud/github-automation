import {expect} from '@oclif/test'
import {readEnv} from '../../src/helpers/file-system'
import {fancy} from 'fancy-test'
import * as fsExtra from 'fs-extra'
import * as sinon from 'sinon'

const readFileSpy = sinon.spy()

describe('function readEnv', () => {
  fancy
  .stub(fsExtra, 'readFile', (...args) => {
    readFileSpy(...args)
    const str = 'GITHUB_TOKEN=token'
    const buff = Buffer.from(str, 'utf-8')
    return buff
  })
  .it('reads env file', async (ctx, done) => {
    const env = await readEnv('path')
    expect(env).to.contains({GITHUB_TOKEN: 'token'})
    done()
  })
})
