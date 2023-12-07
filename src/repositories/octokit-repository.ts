 
import {ux} from '@oclif/core'
import {Endpoints} from '@octokit/types'

import octokitClient from './clients/octokit-client'
export type listReposResponse = Endpoints['GET /orgs/{org}/repos']['response'];
export type getEnvironmentsResponse = Endpoints['GET /repos/{owner}/{repo}/environments']['response'];
export type setEnvironmentResponse = Endpoints['PUT /repos/{owner}/{repo}/environments/{environment_name}']['response'];
export type postVariableResponse = Endpoints['POST /repositories/{repository_id}/environments/{environment_name}/variables']['response'];
export type patchVariableResponse = Endpoints['PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}']['response'];
export type getVariableResponse = Endpoints['GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}']['response'];
export type postGlobalVariableResponse = Endpoints['POST /repos/{owner}/{repo}/actions/variables']['response'];
export type patchGlobalVariableResponse = Endpoints['PATCH /repos/{owner}/{repo}/actions/variables/{name}']['response'];
export type getGlobalVariableResponse = Endpoints['GET /repos/{owner}/{repo}/actions/variables/{name}']['response'];
export type getRepositoryId = Endpoints['GET /repos/{owner}/{repo}']['response'];
export type protectBranchResponse= Endpoints['PUT /repos/{owner}/{repo}/branches/{branch}/protection']['response'];
export type removeCollaboratorResponse=Endpoints['DELETE /repos/{owner}/{repo}/collaborators/{username}']['response'];
export type removeCollaboratorParams=Endpoints['DELETE /repos/{owner}/{repo}/collaborators/{username}']['parameters'];
export type addCollaboratorResponse=Endpoints['PUT /repos/{owner}/{repo}/collaborators/{username}']['response'];
export type addCollaboratorParams=Endpoints['PUT /repos/{owner}/{repo}/collaborators/{username}']['parameters'];
export type addTeamParams=Endpoints['PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}']['parameters'];
export type addTeamResponse=Endpoints['PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}']['response'];
export type delTeamParams=Endpoints['DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}']['parameters'];
export type delTeamResponse=Endpoints['DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}']['response'];
export type removeEnvironmentResponse=Endpoints['DELETE /repos/{owner}/{repo}/environments/{environment_name}']['response'];
export type getPublicKeyResponse=Endpoints['GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key']['response'];
export type updateSecretResponse=Endpoints['PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}']['response']|Endpoints['PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}']['response'];
export type removeSecretResponse=Endpoints['DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}']['response']|Endpoints['DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}']['response'];
export type renameBranchResponse=Endpoints['POST /repos/{owner}/{repo}/branches/{branch}/rename']['response'];
export type getBranchResponse=Endpoints['GET /repos/{owner}/{repo}/branches/{branch}']['response'];
export type readFile=Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response'];
export type writeFile=Endpoints['PUT /repos/{owner}/{repo}/contents/{path}']['response'];
export type createRepoResponse=Endpoints['POST /orgs/{org}/repos']['response'];
export type createRepoFromTemplateResponse=Endpoints['POST /repos/{template_owner}/{template_repo}/generate']['response'];
export type DeleteRepoResponse=Endpoints['DELETE /repos/{owner}/{repo}']['response'];
export type UpdateReposResponse=Endpoints['PATCH /repos/{owner}/{repo}']['response'];
export interface UpdateReposBody{
  description?: string,
  homepage?: string,
  name?: string,
  private?: boolean,
  security_and_analysis?: {
    advanced_security?: {
      secret_scanning?: {
        status?: 'disabled' | 'enabled',
      },
      secret_scanning_push_protection:{
        status?: 'disabled' | 'enabled',
      }
      status?: 'disabled' | 'enabled',
  },
  allow_auto_merge?: boolean,
  allow_forking?: boolean,
  allow_merge_commit?: boolean,
  allow_rebase_merge?: boolean,
  allow_squash_merge?: boolean,
  allow_update_branch?: boolean,
  archived?: boolean,
  default_branch?: string,
  delete_branch_on_merge?: boolean,
  has_issues?: boolean,
  has_projects?: boolean,
  has_wiki?: boolean,
  is_template?: boolean,
  merge_commit_message?: string,
  merge_commit_title?: string,
  squash_merge_commit_title?: string,
  use_squash_pr_title_as_default?: boolean,
  web_commit_signoff_required?: boolean,

}
  visibility?: 'private' | 'public',}
export default {
  async addCollaborator({owner, permission, repo, username}:addCollaboratorParams):Promise<addCollaboratorResponse> {
    const octokit = await octokitClient({org: owner})

    return octokit.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner,
      permission,
      repo,
      username,
    })
  },
  async addTeam({org, owner, permission, repo, team_slug}:addTeamParams):Promise<addTeamResponse> {
    const octokit = await octokitClient({org})
    console.log('asasd:::',octokit)
    return octokit.request('PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      org,
      owner,
      permission,
      repo,
      team_slug,
    })
  },
  async createRepo({organization, repo}:{organization: string, repo: string}):Promise<createRepoResponse> {
    const octokit = await octokitClient({org: organization})
    return octokit.request('POST /orgs/{org}/repos', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      name: repo,
      org: organization,
      private: true,
    })
  },
  async createRepoFromTemplate({allBranches, organization, repo, template}:{allBranches?:boolean, organization: string, repo: string, template:string}):Promise<createRepoResponse> {
    const octokit = await octokitClient({org: organization})
    return octokit.request('POST /repos/{template_owner}/{template_repo}/generate', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      include_all_branches: allBranches,
      name: repo,
      owner: organization,
      private: true,
      template_owner: organization,
      template_repo: template,
    })
  },
  async defineEnvironment({environment_name, owner, repo}:{environment_name:string, owner:string, repo:string}):Promise<setEnvironmentResponse> {
    const octokit = await octokitClient({org: owner})
    console.log('envs:::',owner, repo)
    return octokit.request('PUT /repos/{owner}/{repo}/environments/{environment_name}', {
      environment_name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner,
      repo,
    })
  },
  async delTeam({org, owner, repo, team_slug}:delTeamParams):Promise<delTeamResponse> {
    const octokit = await octokitClient({org})

    return octokit.request('DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      org,
      owner,
      repo,
      team_slug,
    })
  },
  async deleteRepo({organization, repo}:{organization: string, repo: string}):Promise<DeleteRepoResponse> {
    const octokit = await octokitClient({org: organization})
    return octokit.request('DELETE /repos/{owner}/{repo}', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner: organization,
      repo,
    })
  },
  async getBranch({branch, owner, repo}:{branch:string, owner:string, repo:string}):Promise<getBranchResponse> {
    const octokit = await octokitClient({org: owner})
    return octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
      branch,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner,
      repo,
    })
  },
  async getEnvironmentVariable({environment_name, name, owner, repo}:{environment_name:string, name:string, owner:string, repo:string}):Promise<getVariableResponse> {
    const octokit = await octokitClient({org: owner})
    const repository_id = await this.getRepositoryId({owner, repo})
    return octokit.request('GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}', {
      environment_name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      name,
      repository_id,
    })
  },
  async getEnvironments({organization, repository}:{organization: string, repository: string}):Promise<getEnvironmentsResponse> {
    const octokit = await octokitClient({org: organization})
    console.log('envs:::',organization, repository)
    return octokit.request('GET /repos/{owner}/{repo}/environments', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner: organization,
      repo: repository,
    })
  },
  async getGlobalVariable({name, owner, repo}:{name:string, owner:string, repo:string}):Promise<getGlobalVariableResponse> {
    const octokit = await octokitClient({org: owner})
    return octokit.request('GET /repos/{owner}/{repo}/actions/variables/{name}', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      name,
      owner,
      repo,
    })
  },
  async getPublicKey({environment, forced, owner, repo}:{environment?:string, forced?:boolean, owner:string, repo:string}):Promise<getPublicKeyResponse> {
    const octokit = await octokitClient({org: owner})
    if (environment) {
      const {data: {environments}} = await this.getEnvironments({organization: owner, repository: repo})
      if (!environments?.find(env => env.name === environment)) {
        const confirm = forced || await ux.confirm('The environment does not exist. Would you like to create it? (yes/no)')
        if (confirm) {
          await this.defineEnvironment({environment_name: environment, owner, repo})
        } else {
          throw new Error(`Environment ${environment} does not exist`)
        }
      }

      const repoId = await this.getRepositoryId({owner, repo})
      return octokit.request('GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key', {
        environment_name: environment,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        repository_id: repoId,
      })
    }

    return octokit.request('GET /repos/{owner}/{repo}/actions/secrets/public-key', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner,
      repo,
    })
  },
  async getRepositoryId({owner, repo}:{owner:string, repo:string}):Promise<number> {
    const octokit = await octokitClient({org: owner})
    const repoResponse = await octokit.request('GET /repos/{owner}/{repo}', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner,
      repo,
    }) as getRepositoryId
    return repoResponse.data.id
  },
  async listRepositories({org, page}:{org:string, page:number}):Promise<listReposResponse> {
    const octokit = await octokitClient({org})
    return octokit.request('GET /orgs/{org}/repos', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      org,
      page,
      per_page: 100,
    })
  },
  async patchEnvironmentVariable({environment_name, name, owner, repo, value}:{environment_name:string, name:string, owner:string, repo:string, value: string}):Promise<patchVariableResponse> {
    const octokit = await octokitClient({org: owner})
    const repository_id = await this.getRepositoryId({owner, repo})
    return octokit.request('PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}', {
      environment_name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      name,
      repository_id,
      value,
    })
  },
  async patchGlobalVariable({name, owner, repo, value}:{name:string, owner:string, repo:string, value:string}):Promise<patchGlobalVariableResponse> {
    const octokit = await octokitClient({org: owner})
    return octokit.request('PATCH /repos/{owner}/{repo}/actions/variables/{name}', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      name,
      owner,
      repo,
      value,
    })
  },
  async protectBranch({branch, countReviewers, owner, passingChecks, repo}:{branch:string, countReviewers:number, owner:string, passingChecks?:string[], repo:string},
  ):Promise<protectBranchResponse> {
    const octokit = await octokitClient({org: owner})
    const required_status_checks = passingChecks ? {contexts: passingChecks, strict: true} : null
    return octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
      branch,
      enforce_admins: false,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner,
      repo,
      required_pull_request_reviews: {
        dismiss_stale_reviews: false,
        require_code_owner_reviews: false,
        required_approving_review_count: countReviewers,
      },
      required_status_checks,
      restrictions: null,
    })
  },
  async readFile({branch: ref, owner, path, repo}:{branch?: string, owner:string, path:string, repo:string}):Promise<readFile> {
    const octokit = await octokitClient({org: owner})
    if (ref) {
      return octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        owner,
        path,
        ref,
        repo,
      })
    }

    return octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner,
      path,
      repo,
    })
  },
  async removeCollaborator({owner, repo, username}:removeCollaboratorParams):Promise<removeCollaboratorResponse> {
    const octokit = await octokitClient({org: owner})

    return octokit.request('DELETE /repos/{owner}/{repo}/collaborators/{username}', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner,
      repo,
      username,
    })
  },
  async removeEnvironment({environment_name, owner, repo}:{environment_name:string, owner:string, repo:string}):Promise<removeEnvironmentResponse> {
    const octokit = await octokitClient({org: owner})
    return octokit.request('DELETE /repos/{owner}/{repo}/environments/{environment_name}', {
      environment_name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner,
      repo,
    })
  },
  async removeSecret({environment, owner, repo, secret_name}:{environment?:string, owner:string, repo:string, secret_name:string}):Promise<removeSecretResponse> {
    const octokit = await octokitClient({org: owner})
    let params
    if (environment) {
      const repoId = await this.getRepositoryId({owner, repo})
      params = {
        environment_name: environment,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        repository_id: repoId,
        secret_name,
      }
      return octokit.request('DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}',
        params)
    }

    params = {

      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner,
      repo,
      secret_name,
    }
    return octokit.request('DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}', params)
  },
  async renameBranch({branch, new_name, owner, repo}:{branch:string, new_name:string, owner:string, repo:string}):Promise<renameBranchResponse> {
    const octokit = await octokitClient({org: owner})

    return octokit.request('POST /repos/{owner}/{repo}/branches/{branch}/rename', {
      branch,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      new_name,
      owner,
      repo,
    })
  },
  async setEnvironmentVariable({environment_name, name, owner, repo, value}:{environment_name:string, name:string, owner:string, repo:string, value: string}):Promise<postVariableResponse> {
    const octokit = await octokitClient({org: owner})
    const repository_id = await this.getRepositoryId({owner, repo})
    return octokit.request('POST /repositories/{repository_id}/environments/{environment_name}/variables', {
      environment_name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      name,
      repository_id,
      value,
    })
  },
  async setGlobalVariable({name, owner, repo, value}:{name:string, owner:string, repo:string, value:string}):Promise<postGlobalVariableResponse> {
    const octokit = await octokitClient({org: owner})
    return octokit.request('POST /repos/{owner}/{repo}/actions/variables', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      name,
      owner,
      repo,
      value,
    })
  },
  async updateRepo({data, organization, repo}:{data:UpdateReposBody, organization: string, repo: string}):Promise<UpdateReposResponse> {
    const octokit = await octokitClient({org: organization})
    return octokit.request('PATCH /repos/{owner}/{repo}', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      owner: organization,
      repo,
      ...data,
    })
  },
  async updateSecret({encrypted_value, environment, key_id, owner, repo, secret_name}:{encrypted_value:string, environment?:string, key_id:string, owner:string, repo:string, secret_name:string}):Promise<updateSecretResponse> {
    const octokit = await octokitClient({org: owner})
    let params
    if (environment) {
      const repoId = await this.getRepositoryId({owner, repo})
      params = {
        encrypted_value,
        environment_name: environment,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
        key_id,
        repository_id: repoId,
        secret_name,
      }
      return octokit.request('PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}', params)
    }

    params = {
      encrypted_value,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      key_id,
      owner,
      repo,
      secret_name,
    }
    return octokit.request('PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}', params)
  },
  async updateVariables({environment, forced, name, owner, repo, value}:{environment?:string, forced?: boolean, name:string, owner:string, repo:string, value:string}):Promise<patchVariableResponse|postVariableResponse> {
    if (environment) {
      const {data: {environments}} = await this.getEnvironments({organization: owner, repository: repo})
      if (!environments?.find(env => env.name === environment)) {
        const confirm = forced || await ux.confirm('The environment does not exist. Would you like to create it? (yes/no)')
        if (confirm) {
          await this.defineEnvironment({environment_name: environment, owner, repo})
        } else {
          throw new Error(`Environment ${environment} does not exist`)
        }
      }

      try {
        await this.getEnvironmentVariable({environment_name: environment, name, owner, repo})
        return this.patchEnvironmentVariable({environment_name: environment, name, owner, repo, value})
      } catch  {
        return this.setEnvironmentVariable({environment_name: environment, name, owner, repo, value})
      }
    }

    try {
      await this.getGlobalVariable({name, owner, repo})
      return this.patchGlobalVariable({name, owner, repo, value})
    } catch  {
      return this.setGlobalVariable({name, owner, repo, value})
    }
  },
  async writeFile({branch, content, email, message, name, owner, path, repo, sha}:{branch?: string; content:string; email: string; message: string, name: string, owner:string, path:string, repo:string, sha:string}):Promise<writeFile> {
    const octokit = await octokitClient({org: owner})

    return octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      branch,
      committer: {
        email,
        name,
      },
      content,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
      message,
      owner,
      path,
      repo,
      sha,
    })
  },
}
