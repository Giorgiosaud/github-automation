import {Octokit} from 'octokit'
const rmSecret = async ({token, owner, repo, name, environment_name}: { token: string; owner: string; repo: string; name: string; environment_name?: string }):Promise<boolean> => {
  try {
    const octokit = new Octokit({
      auth: token,
    })
    const repoResponse = await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
    })
    const repository_id = repoResponse.data.id
    if (!environment_name) {
      await octokit.request('DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}', {
        owner,
        repo,
        secret_name: name,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      return true
    }

    await octokit.request('DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}', {
      repository_id,
      environment_name,
      secret_name: name,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })

    return true
  } catch {
    return false
  }
}

interface EncryptSecretsArgs{
  token:string;
  owner: string;
  repo: string;
  name:string;
  environment_name?:string;
}
const updateVars = async ({token,  owner, repo, name, environment_name}:EncryptSecretsArgs): Promise<boolean> => {
  try {
    await rmSecret({token, owner, repo, name, environment_name})
    return true
  } catch {
    return false
  }
}

export default updateVars
