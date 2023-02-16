import {ux} from '@oclif/core'
import {Octokit} from 'octokit'

export async function promptToken({organization}: { organization: string; }): Promise<string> {
  const token = await ux.prompt('Please add your repository token')
  const octokit = new Octokit({
    auth: token,
  })
  try {
    await octokit.request(`GET /orgs/${organization}/repos`, {
      org: 'ORG',
      type: 'private',
    })
    return token
  } catch {
    return promptToken({organization})
  }
}
