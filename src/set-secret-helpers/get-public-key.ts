import {Octokit} from 'octokit'

export const getPublicKey = async (token:string, organization:string, repository:string):Promise<{key: string, key_id:string}> => {
  const octokit = new Octokit({
    auth: token,
  })

  const response = await octokit.request('GET /repos/{owner}/{repo}/actions/secrets/public-key', {
    owner: organization,
    repo: repository,
  })

  return response.data
}

