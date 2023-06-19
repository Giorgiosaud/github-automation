import {Octokit} from 'octokit'

const removeEnvironment = async (token:string, organization:string, repository:string, environment:string):Promise<unknown> => {
  const octokit = new Octokit({
    auth: token,
  })
  console.log('deleting env' + organization + repository + environment)
  const response = octokit.request<string>('DELETE /repos/{owner}/{repo}/environments/{environment_name}', {
    owner: organization,
    repo: repository,
    environment_name: environment,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  return response
}

export default removeEnvironment
