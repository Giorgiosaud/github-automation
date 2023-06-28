// eslint-disable-next-line node/no-missing-import
import {Endpoints} from '@octokit/types'
import {ux} from '@oclif/core'

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
export type removeEnvironmentResponse=Endpoints['DELETE /repos/{owner}/{repo}/environments/{environment_name}']['response'];
export type getPublicKeyResponse=Endpoints['GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key']['response'];
export type updateSecretResponse=Endpoints['PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}']['response']|Endpoints['PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}']['response'];
export type removeSecretResponse=Endpoints['DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}']['response']|Endpoints['DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}']['response'];
export type renameBranchResponse=Endpoints['POST /repos/{owner}/{repo}/branches/{branch}/rename']['response'];
export type getBranchResponse=Endpoints['GET /repos/{owner}/{repo}/branches/{branch}']['response'];
export type readFile=Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response'];
export type writeFile=Endpoints['PUT /repos/{owner}/{repo}/contents/{path}']['response'];
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
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
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
  async getEnvironments({organization, repository}:{organization: string, repository: string}):Promise<getEnvironmentsResponse> {
    const octokit = await octokitClient({org: organization})

    return octokit.request('GET /repos/{owner}/{repo}/environments', {
      owner: organization,
      repo: repository,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async defineEnvironment({owner, repo, environment_name}:{owner:string, repo:string, environment_name:string}):Promise<setEnvironmentResponse> {
    const octokit = await octokitClient({org: owner})
    return octokit.request('PUT /repos/{owner}/{repo}/environments/{environment_name}', {
      owner,
      repo,
      environment_name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async removeEnvironment({owner, repo, environment_name}:{owner:string, repo:string, environment_name:string}):Promise<removeEnvironmentResponse> {
    const octokit = await octokitClient({org: owner})
    return octokit.request('DELETE /repos/{owner}/{repo}/environments/{environment_name}', {
      owner,
      repo,
      environment_name,
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
        strict: false,
        contexts: [],
      },
      enforce_admins: false,
      required_pull_request_reviews: {
        dismissal_restrictions: {
          users: [],
          teams: [],
        },
        dismiss_stale_reviews: false,
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
  async getPublicKey({owner, repo, environment, forced}:{owner:string, repo:string, environment?:string, forced?:boolean}):Promise<getPublicKeyResponse> {
    const octokit = await octokitClient({org: owner})
    if (environment) {
      const {data: {environments}} = await this.getEnvironments({organization: owner, repository: repo})
      if (!environments?.find(env => env.name === environment)) {
        const confirm = forced || await ux.confirm('The environment does not exist. Would you like to create it? (yes/no)')
        if (confirm) {
          await this.defineEnvironment({owner, repo, environment_name: environment})
        } else {
          throw new Error(`Environment ${environment} does not exist`)
        }
      }

      const repoId = await this.getRepositoryId({owner, repo})
      return octokit.request('GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key', {
        repository_id: repoId,
        environment_name: environment,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
    }

    return octokit.request('GET /repos/{owner}/{repo}/actions/secrets/public-key', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async updateSecret({owner, repo, secret_name, encrypted_value, key_id, environment}:{owner:string, repo:string, secret_name:string, encrypted_value:string, key_id:string, environment?:string}):Promise<updateSecretResponse> {
    const octokit = await octokitClient({org: owner})
    let params
    if (environment) {
      const repoId = await this.getRepositoryId({owner, repo})
      params = {
        repository_id: repoId,
        environment_name: environment,
        secret_name,
        encrypted_value,
        key_id,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
      return octokit.request('PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}', params)
    }

    params = {
      owner,
      repo,
      secret_name,
      encrypted_value,
      key_id,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
    return octokit.request('PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}', params)
  },
  async removeSecret({owner, repo, secret_name, environment}:{owner:string, repo:string, secret_name:string, environment?:string}):Promise<removeSecretResponse> {
    const octokit = await octokitClient({org: owner})
    let params
    if (environment) {
      const repoId = await this.getRepositoryId({owner, repo})
      params = {
        repository_id: repoId,
        environment_name: environment,
        secret_name,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      }
      return octokit.request('DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}',
        params)
    }

    params = {

      owner,
      repo,
      secret_name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
    return octokit.request('DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}', params)
  },
  async updateVariables({owner, repo, name, value, environment, forced}:{owner:string, repo:string, name:string, value:string, environment?:string, forced?: boolean}):Promise<postVariableResponse|patchVariableResponse> {
    if (environment) {
      const {data: {environments}} = await this.getEnvironments({organization: owner, repository: repo})
      if (!environments?.find(env => env.name === environment)) {
        const confirm = forced || await ux.confirm('The environment does not exist. Would you like to create it? (yes/no)')
        if (confirm) {
          await this.defineEnvironment({owner, repo, environment_name: environment})
        } else {
          throw new Error(`Environment ${environment} does not exist`)
        }
      }

      try {
        await this.getEnvironmentVariable({owner, repo, name, environment_name: environment})
        return this.patchEnvironmentVariable({owner, repo, name, value, environment_name: environment})
      } catch  {
        return this.setEnvironmentVariable({owner, repo, name, value, environment_name: environment})
      }
    }

    try {
      await this.getGlobalVariable({owner, repo, name})
      return this.patchGlobalVariable({owner, repo, name, value})
    } catch  {
      return this.setGlobalVariable({owner, repo, name, value})
    }
  },
  async getBranch({owner, repo, branch}:{owner:string, repo:string, branch:string}):Promise<getBranchResponse> {
    const octokit = await octokitClient({org: owner})
    return octokit.request('GET /repos/{owner}/{repo}/branches/{branch}', {
      owner,
      repo,
      branch,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async renameBranch({owner, repo, branch, new_name}:{owner:string, repo:string, branch:string, new_name:string}):Promise<renameBranchResponse> {
    const octokit = await octokitClient({org: owner})

    return octokit.request('POST /repos/{owner}/{repo}/branches/{branch}/rename', {
      owner,
      repo,
      branch,
      new_name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async readFile({owner, repo, path, branch: ref}:{owner:string, repo:string, path:string, branch?: string}):Promise<readFile> {
    const octokit = await octokitClient({org: owner})
    if (ref) {
      return octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner,
        repo,
        path,
        ref,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
    }

    return octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
  async writeFile({name, email, message, owner, repo, path, content, sha, branch}:{name: string; email: string; message: string; owner:string, repo:string, path:string, content:string, sha:string, branch?: string}):Promise<writeFile> {
    const octokit = await octokitClient({org: owner})

    return octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
      message,
      committer: {
        name,
        email,
      },
      sha,
      content,
      branch,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })
  },
}
