import ReplaceInFiles from '../../src/commands/replace-in-files'
import * as octokitClient from '../../src/repositories/clients/octokit-client'
const spyOctokitClient = jest.spyOn(octokitClient, 'default')

const reqFn = jest.fn()
spyOctokitClient.mockResolvedValue({
  request: reqFn,
} as any)
describe('replace-in-files command', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('replace-in-files fails if no flags are set', async () => {
    await expect(ReplaceInFiles.run([])).rejects.toThrow()
  })
  test('replace-in-files fails if only from is set', async () => {
    await expect(ReplaceInFiles.run(['-f', 'develop'])).rejects.toThrow()
  })
  test('replace-in-files fails if from, org is set', async () => {
    await expect(ReplaceInFiles.run(['-f', 'develop', '-o', 'org'])).rejects.toThrow()
  })
  test('replace-in-files fails if from, org, paths is set', async () => {
    await expect(ReplaceInFiles.run(['-f', 'develop', '-o', 'org', '-p', 'path'])).rejects.toThrow()
  })
  test('replace-in-files fails if from, org, paths, repositories is set', async () => {
    await expect(ReplaceInFiles.run(['-f', 'develop', '-o', 'org', '-p', 'path', '-r', 'repo'])).rejects.toThrow()
  })
  test('replace-in-files fails if from, org, paths, repositories,to is set', async () => {
    const response = {
      data: {
        content: btoa('prueba develop develop'),
        sha: 'sha',
      },
    }
    reqFn.mockImplementation(path => {
      if (path.includes('GET'))
        return Promise.resolve(response)
    })
    await ReplaceInFiles.run(['-f', 'develop', '-o', 'org', '-p', 'path', '-r', 'repo', '-t', 'mast'])
    expect(reqFn).toHaveBeenCalledTimes(2)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/contents/{path}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', path: 'path', repo: 'repo'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'PUT /repos/{owner}/{repo}/contents/{path}', {branch: 'main', committer: {email: 'jsaud@modyo.com', name: 'Jorge Saud'}, content: btoa('prueba mast mast'), headers: {'X-GitHub-Api-Version': '2022-11-28'}, message: 'Replace in file', owner: 'org', path: 'path', repo: 'repo', sha: 'sha'})
  })
  test('replace-in-files fails if from, org, paths, repositories,to,message is set', async () => {
    const response = {
      data: {
        content: btoa('prueba develop develop'),
        sha: 'sha',
      },
    }
    reqFn.mockImplementation(path => {
      if (path.includes('GET'))
        return Promise.resolve(response)
    })
    await ReplaceInFiles.run(['-f', 'develop', '-o', 'org', '-p', 'path', '-r', 'repo', '-t', 'mast', '-m', 'fix: branch name'])
    expect(reqFn).toHaveBeenCalledTimes(2)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/contents/{path}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', path: 'path', repo: 'repo'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'PUT /repos/{owner}/{repo}/contents/{path}', {branch: 'main', committer: {email: 'jsaud@modyo.com', name: 'Jorge Saud'}, content: btoa('prueba mast mast'), headers: {'X-GitHub-Api-Version': '2022-11-28'}, message: 'fix: branch name', owner: 'org', path: 'path', repo: 'repo', sha: 'sha'})
  })
  test('replace-in-files fails if from, org, paths, repositories,to,message,email is set', async () => {
    const response = {
      data: {
        content: btoa('prueba develop develop'),
        sha: 'sha',
      },
    }
    reqFn.mockImplementation(path => {
      if (path.includes('GET'))
        return Promise.resolve(response)
    })
    await ReplaceInFiles.run(['-f', 'develop', '-o', 'org', '-p', 'path', '-r', 'repo', '-t', 'mast', '-m', 'fix: branch name', '-e', 'pepe@paco.com'])
    expect(reqFn).toHaveBeenCalledTimes(2)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/contents/{path}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', path: 'path', repo: 'repo'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'PUT /repos/{owner}/{repo}/contents/{path}', {branch: 'main', committer: {email: 'pepe@paco.com', name: 'Jorge Saud'}, content: btoa('prueba mast mast'), headers: {'X-GitHub-Api-Version': '2022-11-28'}, message: 'fix: branch name', owner: 'org', path: 'path', repo: 'repo', sha: 'sha'})
  })
  test('replace-in-files fails if from, org, paths, repositories,to,message,email,name is set', async () => {
    const response = {
      data: {
        content: btoa('prueba develop develop'),
        sha: 'sha',
      },
    }
    reqFn.mockImplementation(path => {
      if (path.includes('GET'))
        return Promise.resolve(response)
    })
    await ReplaceInFiles.run(['-f', 'develop', '-o', 'org', '-p', 'path', '-r', 'repo', '-t', 'mast', '-m', 'fix: branch name', '-e', 'pepe@paco.com', '-n', 'paco'])
    expect(reqFn).toHaveBeenCalledTimes(2)
    expect(reqFn).toHaveBeenNthCalledWith(1, 'GET /repos/{owner}/{repo}/contents/{path}', {headers: {'X-GitHub-Api-Version': '2022-11-28'}, owner: 'org', path: 'path', repo: 'repo'})
    expect(reqFn).toHaveBeenNthCalledWith(2,  'PUT /repos/{owner}/{repo}/contents/{path}', {branch: 'main', committer: {email: 'pepe@paco.com', name: 'paco'}, content: btoa('prueba mast mast'), headers: {'X-GitHub-Api-Version': '2022-11-28'}, message: 'fix: branch name', owner: 'org', path: 'path', repo: 'repo', sha: 'sha'})
  })
})
