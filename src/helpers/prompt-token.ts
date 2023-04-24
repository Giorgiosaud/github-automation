import {ux} from '@oclif/core'
import {Octokit} from 'octokit'
export async function testToken({token, org}:{token:string, org:string}):Promise<boolean> {
  const octokit = new Octokit({
    auth: token,
  })
  try {
    await octokit.request('GET /orgs/{organization}/repos', {
      org,
      type: 'private',
    })
    return true
  } catch {
    return false
  }
}

export async function promptToken({org}: { org: string; }): Promise<string> {
  const token = await ux.prompt('Please add your repository token')
  const octokit = new Octokit({
    auth: token,
  })
  try {
    await octokit.request(`GET /orgs/${org}/repos`, {
      org: 'ORG',
      type: 'private',
    })
    return token
  } catch {
    return promptToken({org})
  }
}
