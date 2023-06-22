import {Endpoints} from '@octokit/types'
import octokitClient from './clients/octokit-client'
type listReposResponse = Endpoints['GET /orgs/{org}/repos']['response'];
type getEnvironmentsResponse = Endpoints['GET /repos/{owner}/{repo}/environments']['response'];
type postVariableResponse = Endpoints['POST /repositories/{repository_id}/environments/{environment_name}/variables']['response'];
type patchVariableResponse = Endpoints['PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}']['response'];
type getVariableResponse = Endpoints['GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}']['response'];
type postGlobalVariableResponse = Endpoints['POST /repos/{owner}/{repo}/actions/variables']['response'];
type patchGlobalVariableResponse = Endpoints['PATCH /repos/{owner}/{repo}/actions/variables/{name}']['response'];
type getGlobalVariableResponse = Endpoints['GET /repos/{owner}/{repo}/actions/variables/{name}']['response'];
type getRepositoryId = Endpoints['GET /repos/{owner}/{repo}']['response'];
type protectBranchResponse= Endpoints['PUT /repos/{owner}/{repo}/branches/{branch}/protection']['response'];
type removeCollaboratorResponse=Endpoints['DELETE /repos/{owner}/{repo}/collaborators/{username}']['response'];
type removeCollaboratorParams=Endpoints['DELETE /repos/{owner}/{repo}/collaborators/{username}']['parameters'];
type addCollaboratorResponse=Endpoints['PUT /repos/{owner}/{repo}/collaborators/{username}']['response'];
type addCollaboratorParams=Endpoints['PUT /repos/{owner}/{repo}/collaborators/{username}']['parameters'];
export default {
  async setEnvironmentVariable({owner, repo, name, environment_name, value}:{owner:string, repo:string, name:string, environment_name:string, value: string}):Promise<postVariableResponse> {
    const octokit = await octokitClient({org: owner})
    const repository_id = await this.getRepositoryId({owner, repo})
    return octokit.request('POST /repositories/{repository_id}/environments/{environment_name}/variables', {
      repository_id,
      environment_name,
      name,
      value,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async patchEnvironmentVariable({owner, repo, name, environment_name, value}:{owner:string, repo:string, name:string, environment_name:string, value: string}):Promise<patchVariableResponse> {
    const octokit = await octokitClient({org: owner})
    const repository_id = await this.getRepositoryId({owner, repo})
    return octokit.request('PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}', {
      repository_id,
      name,
      environment_name,
      value,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async getEnvironmentVariable({owner, repo, name, environment_name}:{owner:string, repo:string, name:string, environment_name:string}):Promise<getVariableResponse> {
    const octokit = await octokitClient({org: owner})
    const repository_id = await this.getRepositoryId({owner, repo})
    return octokit.request('GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}', {
      repository_id,
      environment_name,
      name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async getGlobalVariable({owner, repo, name}:{owner:string, repo:string, name:string}):Promise<getGlobalVariableResponse> {
    const octokit = await octokitClient({org: owner})
    return octokit.request('GET /repos/{owner}/{repo}/actions/variables/{name}', {
      repo,
      owner,
      name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async patchGlobalVariable({owner, repo, name, value}:{owner:string, repo:string, name:string, value:string}):Promise<patchGlobalVariableResponse> {
    const octokit = await octokitClient({org: owner})
    return octokit.request('PATCH /repos/{owner}/{repo}/actions/variables/{name}', {
      repo,
      name,
      owner,
      value,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async setGlobalVariable({owner, repo, name, value}:{owner:string, repo:string, name:string, value:string}):Promise<postGlobalVariableResponse> {
    const octokit = await octokitClient({org: owner})
    return octokit.request('POST /repos/{owner}/{repo}/actions/variables', {
      repo,
      owner,
      name,
      value,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async getRepositoryId({owner, repo}:{owner:string, repo:string}):Promise<number> {
    const octokit = await octokitClient({org: owner})
    const repoResponse = await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
    }) as getRepositoryId
    return repoResponse.data.id
  },
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
  async protectBranch({owner, repo, branch, countReviewers}:{owner:string, repo:string, branch:string, countReviewers:number},
  ):Promise<protectBranchResponse> {
    const octokit = await octokitClient({org: owner})

    return octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
      owner,
      repo,
      branch,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      required_status_checks: {
        strict: true,
        contexts: [],
      },
      enforce_admins: false,
      required_pull_request_reviews: {
        dismissal_restrictions: {
          users: [],
          teams: [],
        },
        dismiss_stale_reviews: true,
        require_code_owner_reviews: true,
        required_approving_review_count: countReviewers,
      },
      restrictions: {
        users: [],
        teams: [],
        apps: [],
      },
    })
  },
  async removeCollaborator({owner, repo, username}:removeCollaboratorParams):Promise<removeCollaboratorResponse> {
    const octokit = await octokitClient({org: owner})

    return octokit.request('DELETE /repos/{owner}/{repo}/collaborators/{username}', {
      owner,
      repo,
      username,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async addCollaborator({owner, repo, username, permission}:addCollaboratorParams):Promise<addCollaboratorResponse> {
    const octokit = await octokitClient({org: owner})

    return octokit.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
      owner,
      repo,
      username,
      permission,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
}
