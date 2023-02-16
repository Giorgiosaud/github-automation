/* eslint-disable camelcase */
import {Octokit} from 'octokit'

// eslint-disable-next-line camelcase
export const getPublicEnvKey = async (token:string, organization:string, repository:string, environment:string):Promise<{key: string, key_id:string}> => {
  const octokit = new Octokit({
    auth: token,
  })
  const repoResponse = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: organization,
    repo: repository,
  })
  const repoId = repoResponse.data.id
  const response = await octokit.request('GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key', {
    repository_id: repoId,
    environment_name: environment,
  })

  return response.data
}

