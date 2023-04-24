
import {Octokit} from 'octokit'

export const updateRepoVars = async ({token, owner, repo, name, value, environment_name}: { token: string; owner: string; repo: string; name: string; value: string;environment_name?: string }):Promise<boolean> => {
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
      try {
        await octokit.request('GET /repos/{owner}/{repo}/actions/variables/{name}', {
          repo,
          owner,
          name,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
        await octokit.request('PATCH /repos/{owner}/{repo}/actions/variables/{name}', {
          repo,
          name,
          owner,
          value,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
      } catch {
        await octokit.request('POST /repos/{owner}/{repo}/actions/variables', {
          repo,
          owner,
          name,
          value,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })
      }

      return true
    }

    try {
      await octokit.request('GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}', {
        repository_id,
        environment_name,
        name,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
      await octokit.request('PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}', {
        repository_id,
        name,
        environment_name,
        value,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
    } catch {
      await octokit.request('POST /repositories/{repository_id}/environments/{environment_name}/variables', {
        repository_id,
        environment_name,
        name,
        value,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      })
    }

    return true
  } catch {
    return false
  }
}

