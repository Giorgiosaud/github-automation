import {Endpoints} from '@octokit/types'
import octokitClient from './clients/octokit-client'
type listReposResponse = Endpoints['GET /orgs/{org}/repos']['response'];
type getEnvironmentsResponse = Endpoints['GET /repos/{owner}/{repo}/environments']['response'];
export default {
  async listRepositories({org, page}:{org:string, page:number}):Promise<listReposResponse> {
    const octokit = await octokitClient({org})
    return octokit.request('GET /orgs/{org}/repos', {
      org,
      per_page: 100,
      page,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async getEnvironment(organization:string, repository:string):Promise<getEnvironmentsResponse> {
    const octokit = await octokitClient({org: organization})

    return octokit.request('GET /repos/{owner}/{repo}/environments', {
      owner: organization,
      per_page: 100,
      page: 1,
      repo: repository,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
}
