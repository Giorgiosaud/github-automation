import inquirer from 'inquirer';
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
  // TODO: fix to ask
  const { token } = {token:''}
  const octokit = new Octokit({
    auth: token,
  })
  try {
    await octokit.request(`GET /orgs/${org}/repos`, {
      org: 'ORG',
      type: 'private',
    })
    return token
  } catch (error) {
    console.log(error)
    return promptToken({org})
  }
}
