
import {Octokit} from 'octokit'

export const updateRepoEnvSecrets = async ({token, organization, repository, name, encryptedValue, keyId, environment}: { token: string; organization: string; repository: string; name: string; encryptedValue: string; keyId: string; environment: string }):Promise<boolean> => {
  try {
    console.log('updateRepoEnvSecrets')

    const octokit = new Octokit({
      auth: token,
    })
    const repoResponse = await octokit.request('GET /repos/{owner}/{repo}', {
      owner: organization,
      repo: repository,
    })
    const repoId = repoResponse.data.id

    const resp = await octokit.request('PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}', {
      repository_id: repoId,
      environment_name: environment,
      secret_name: name,
      encrypted_value: encryptedValue,
      key_id: keyId,
    })
    console.log(resp)
    return true
  } catch {
    return false
  }
}

