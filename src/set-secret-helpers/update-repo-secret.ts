
import {Octokit} from 'octokit'

export const updateRepoSecrets = async ({token, organization, repository, name, encryptedValue, keyId}: { token: string; organization: string; repository: string; name: string; encryptedValue: string; keyId: string }):Promise<boolean> => {
  try {
    const octokit = new Octokit({
      auth: token,
    })

    await octokit.request('PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
      owner: organization,
      repo: repository,
      secret_name: name,
      encrypted_value: encryptedValue,
      key_id: keyId,
    })
    return true
  } catch {
    return false
  }
}

