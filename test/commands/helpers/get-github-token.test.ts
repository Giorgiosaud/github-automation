import getGithubToken from '../../../src/helpers/get-github-token'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import path from 'node:path'
import fsExtra from 'fs-extra'
import * as fileSystem from '../../../src/helpers/file-system'
// fsExtra.read.mockReturnValue('prueba')
const mock = new MockAdapter(axios, {delayResponse: 2000})

// import * as sinon from 'sinon'
// const existsSyncStub = sinon.stub()
// const pathStub = sinon.stub()
// const writeFileStub = sinon.stub()
// const buildEnvContentStub = sinon.stub()
// const readEnvStub = sinon.stub()
// const cliPromptToken = sinon.stub()
const resolveSpy = jest.spyOn(path, 'resolve')
const fsExtraExistSpy = jest.spyOn(fsExtra, 'existsSync')
const fsExtraWriteFileSpy = jest.spyOn(fsExtra, 'writeFile').mockImplementation(jest.fn)
const fileSystemReadEnvSpy = jest.spyOn(fileSystem, 'readEnv')
jest.mock('@oclif/core',
  () => ({
    CliUx: {ux: {
      prompt: jest.fn()
      .mockImplementation(() => 'You have called a mocked method 1!')
      .mockResolvedValue('123'),
    }},
  }))
describe('getGithubToken function', () => {
  beforeEach(() => {
    fsExtraWriteFileSpy.mockReset()
    fileSystemReadEnvSpy.mockReset()
    mock.resetHandlers()
    mock.onGet('https://api.github.com/orgs/organization/repos?type=member', undefined, {Accept: 'application/json, text/plain, */*', Authorization: 'Bearer 123'})
    .reply(200, [{}])
  })
  test.only('REALPATH  200 setting file not exist and GITHUB_TOKEN not exist', async () => {
    const rcPath = 'RCPATH'
    const org = 'organization'
    resolveSpy.mockReturnValueOnce('/fakepath')
    fsExtraExistSpy.mockReturnValueOnce(false)
    fileSystemReadEnvSpy.mockResolvedValueOnce({})
    const token = await getGithubToken(rcPath, org)
    expect(fsExtraWriteFileSpy).toBeCalledTimes(2)
    expect(token).toBe('123')
  })
  test.only('REALPATH  200 setting file exist and GITHUB_TOKEN not exist', async () => {
    const rcPath = 'RCPATH'
    const org = 'organization'
    resolveSpy.mockReturnValueOnce('/fakepath')
    fsExtraExistSpy.mockReturnValueOnce(true)
    fileSystemReadEnvSpy.mockResolvedValueOnce({})
    const token = await getGithubToken(rcPath, org)
    expect(fsExtraWriteFileSpy).toBeCalledTimes(1)
    expect(token).toBe('123')
  })
  test.only('REALPATH  200 setting file exist and GITHUB_TOKEN exist', async () => {
    const rcPath = 'RCPATH'
    const org = 'organization'
    resolveSpy.mockReturnValueOnce('/fakepath')
    fsExtraExistSpy.mockReturnValueOnce(true)
    fileSystemReadEnvSpy.mockResolvedValueOnce({GITHUB_TOKEN: '123'})
    const token = await getGithubToken(rcPath, org)
    expect(fsExtraWriteFileSpy).toBeCalledTimes(0)
    expect(token).toBe('123')
  })
})
