/* eslint-disable camelcase */
import {Octokit} from 'octokit'

// eslint-disable-next-line camelcase
export const updateRepoVars = async ({token, owner, repo, name, value, environment_name}: { token: string; owner: string; repo: string; name: string; value: string;environment_name: string }):Promise<boolean> => {
  try {
    const octokit = new Octokit({
      auth: token,
    })
    const repoResponse = await octokit.request('GET /repos/{owner}/{repo}', {
      owner,
      repo,
    })
    const repository_id = repoResponse.data.id
    let resp
    try {
      await octokit.request('GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}', {
        repository_id,
        environment_name,
        name,
      })
      resp = await octokit.request('PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}', {
        repository_id,
        name,
        environment_name,
        value,
      })
    } catch {
      resp = await octokit.request('POST /repositories/{repository_id}/environments/{environment_name}/variables', {
        repository_id,
        environment_name,
        name,
        value,
      })
    }

    console.log(resp)

    // await (!varX ?  : octokit.request('PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}', {
    //   repository_id,
    //   name,
    //   environment_name,
    //   value,
    // }))

    // console.log(resp)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

